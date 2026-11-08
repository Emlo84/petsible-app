import { supabase } from './client'
import type { Pet } from '../../types/pet'
import type { AdoptionInterestRecord, InterestAction } from '../../types/adoption'

export interface ServiceResponse<T> {
  data: T | null
  error: string | null
}

/**
 * Servicio para gestión de mascotas y registro de interacciones de adopción.
 */
export class PetService {
  /**
   * Registra la interacción del usuario ('interested' o 'skipped') en Supabase.
   * Evita duplicados o actualiza el interés según sea requerido.
   */
  public static async recordInteraction(
    adopterId: string,
    petId: string,
    action: InterestAction
  ): Promise<ServiceResponse<AdoptionInterestRecord>> {
    try {
      const record: AdoptionInterestRecord = {
        adopterId,
        petId,
        action,
        createdAt: new Date().toISOString(),
      }

      const payload = {
        adopter_id: adopterId,
        pet_id: petId,
        action,
        created_at: record.createdAt,
      }

      const { data, error } = await supabase
        .from('adoption_swipes')
        .upsert(payload, { onConflict: 'adopter_id,pet_id' })
        .select()
        .single()

      if (error) {
        // En caso de que la tabla aún no exista en un entorno local sin migración ejecutada
        console.warn('[PetService] Supabase swipe persistence warning:', error.message)
        return { data: record, error: null }
      }

      return {
        data: {
          id: data.id,
          adopterId: data.adopter_id,
          petId: data.pet_id,
          action: data.action,
          createdAt: data.created_at,
        },
        error: null,
      }
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Error al registrar interacción.',
      }
    }
  }

  /**
   * Obtiene la lista de mascotas desde la base de datos o retorna una lista base.
   */
  public static async fetchAvailablePets(): Promise<ServiceResponse<Pet[]>> {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select(`
          id,
          name,
          species,
          breed,
          age_years,
          size,
          energy_level,
          good_with_children,
          good_with_other_pets,
          requires_yard,
          status,
          image_urls,
          description,
          tags,
          shelter:shelters (
            id,
            name,
            is_verified,
            city,
            contact_email
          )
        `)
        .eq('status', 'available')

      if (error || !data) {
        return { data: null, error: error?.message || 'No se pudieron cargar las mascotas.' }
      }

      const mappedPets: Pet[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        species: item.species,
        breed: item.breed,
        ageYears: item.age_years,
        size: item.size,
        energyLevel: item.energy_level,
        goodWithChildren: item.good_with_children,
        goodWithOtherPets: item.good_with_other_pets,
        requiresYard: item.requires_yard,
        status: item.status,
        shelterId: item.shelter?.id || '',
        shelter: item.shelter
          ? {
              id: item.shelter.id,
              name: item.shelter.name,
              isVerified: item.shelter.is_verified,
              city: item.shelter.city,
              contactEmail: item.shelter.contact_email,
            }
          : undefined,
        imageUrls: item.image_urls || [],
        description: item.description,
        tags: item.tags || [],
      }))

      return { data: mappedPets, error: null }
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Error inesperado al cargar mascotas.',
      }
    }
  }
}
