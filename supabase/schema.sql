-- ========================================================
-- PETSIBLE DATABASE SCHEMA - SUPABASE POSTGRESQL
-- Incluye tablas, Row Level Security (RLS) y restricciones
-- ========================================================

-- 1. Tabla de Refugios (4 refugios asociados)
CREATE TABLE IF NOT EXISTS public.shelters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT true,
  city TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabla de Mascotas
CREATE TABLE IF NOT EXISTS public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shelter_id UUID REFERENCES public.shelters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT CHECK (species IN ('dog', 'cat')),
  breed TEXT NOT NULL,
  age_years NUMERIC NOT NULL,
  size TEXT CHECK (size IN ('small', 'medium', 'large')),
  energy_level TEXT CHECK (energy_level IN ('low', 'moderate', 'high')),
  good_with_children BOOLEAN DEFAULT false,
  good_with_other_pets BOOLEAN DEFAULT false,
  requires_yard BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'in_process', 'adopted')),
  image_urls TEXT[] DEFAULT '{}',
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabla de Interacciones / Swipes (Me Interesa u Omitir)
CREATE TABLE IF NOT EXISTS public.adoption_swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adopter_id UUID NOT NULL,
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE,
  action TEXT CHECK (action IN ('interested', 'skipped')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(adopter_id, pet_id)
);

-- 4. Tabla de Citas de Adopción (Con soporte para evitar colisiones)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE,
  adopter_id UUID NOT NULL,
  shelter_id UUID REFERENCES public.shelters(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- Índices para optimizar consultas de solapamiento y filtrado
CREATE INDEX IF NOT EXISTS idx_appointments_pet_time ON public.appointments(pet_id, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_pets_status_species ON public.pets(status, species);
CREATE INDEX IF NOT EXISTS idx_swipes_adopter ON public.adoption_swipes(adopter_id);

-- RLS (Row Level Security)
ALTER TABLE public.shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adoption_swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para mascotas y refugios verificados
CREATE POLICY "Mascotas visibles para todos" ON public.pets
  FOR SELECT USING (true);

CREATE POLICY "Refugios visibles para todos" ON public.shelters
  FOR SELECT USING (true);

CREATE POLICY "Los usuarios pueden registrar y ver sus swipes" ON public.adoption_swipes
  FOR ALL USING (auth.uid() = adopter_id);

CREATE POLICY "Los usuarios pueden gestionar sus citas" ON public.appointments
  FOR ALL USING (auth.uid() = adopter_id);
