import React, { useState, useMemo, useEffect } from 'react'
import type { Pet } from '../../types/pet'
import type { UserProfile, HousingType, DailyTimeAvailable } from '../../types/user'
import { filterCompatiblePets } from '../../utils/affinityAlgorithm'
import { PetService } from '../../services/supabase/petService'
import { PetCard } from './PetCard'

// Diccionario de traducción para llaves internas de filtros a texto legible
const HOUSING_LABELS: Record<HousingType, string> = {
  apartment_small: 'Apartamento pequeño',
  apartment_large: 'Apartamento grande',
  house_no_yard: 'Casa sin patio',
  house_with_yard: 'Casa con patio',
}

const TIME_LABELS: Record<DailyTimeAvailable, string> = {
  under_2h: 'Menos de 2 horas',
  '2_to_4h': '2 a 4 horas',
  more_than_4h: 'Más de 4 horas',
}

const FILTER_LABELS: Record<string, string> = {
  ...HOUSING_LABELS,
  ...TIME_LABELS,
  first_time: 'Primerizo',
  intermediate: 'Intermedio',
  experienced: 'Con experiencia',
}

interface PetCatalogProps {
  userProfile: UserProfile
  initialPets: Pet[]
  onOpenScheduleModal?: (pet: Pet) => void
  selectedLocality?: string
}

export const PetCatalog: React.FC<PetCatalogProps> = ({
  userProfile,
  initialPets,
  onOpenScheduleModal,
  selectedLocality = 'todas',
}) => {
  // 1. Filtrado de afinidad estricto (Algoritmo de Compatibilidad)
  const compatiblePets = useMemo(() => {
    let list = filterCompatiblePets(userProfile, initialPets)
    // Opcional: Si se selecciona una localidad específica en Bogotá
    if (selectedLocality !== 'todas') {
      const filteredByLocality = list.filter((p) =>
        p.shelter?.city.toLowerCase().includes(selectedLocality.toLowerCase())
      )
      if (filteredByLocality.length > 0) {
        list = filteredByLocality
      }
    }
    return list
  }, [userProfile, initialPets, selectedLocality])

  // 2. Estado de la baraja activa
  const [deck, setDeck] = useState<Pet[]>(compatiblePets)
  const [interestedPets, setInterestedPets] = useState<Pet[]>([])
  const [skippedPets, setSkippedPets] = useState<Pet[]>([])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' } | null>(null)

  useEffect(() => {
    setDeck(compatiblePets)
  }, [compatiblePets])

  const currentPet = deck.length > 0 ? deck[0] : null

  /**
   * Manejador de 'Me interesa':
   * Guarda relación usuario-mascota en tabla adoption_swipes de Supabase
   */
  const handleInterest = async (pet: Pet) => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      const response = await PetService.recordInteraction(
        userProfile.id,
        pet.id,
        'interested'
      )

      if (response.error) {
        console.error('Error al registrar swipe:', response.error)
      }

      setInterestedPets((prev) => [pet, ...prev])
      setDeck((prev) => prev.slice(1))

      setFeedback({
        message: `¡Te ha interesado ${pet.name}! Guardado en tu lista de adopción.`,
        type: 'success',
      })

      setTimeout(() => setFeedback(null), 3000)
    } finally {
      setIsProcessing(false)
    }
  }

  /**
   * Manejador de 'Omitir':
   * Saca la mascota del estado actual y registra 'skipped'
   */
  const handleSkip = async (pet: Pet) => {
    if (isProcessing) return
    setIsProcessing(true)

    try {
      await PetService.recordInteraction(userProfile.id, pet.id, 'skipped')

      setSkippedPets((prev) => [pet, ...prev])
      setDeck((prev) => prev.slice(1))

      setFeedback({
        message: `Mascota omitida: ${pet.name}`,
        type: 'info',
      })

      setTimeout(() => setFeedback(null), 2500)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleResetDeck = () => {
    setDeck(compatiblePets)
    setInterestedPets([])
    setSkippedPets([])
  }

  return (
    <section className="py-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop bg-surface" id="catalogo-preview">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera del Catálogo */}
        <div className="text-center space-y-space-xs mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
            Catálogo Interactivo con Algoritmo de Match
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
            Encuentra a tu compañero ideal
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Desliza o presiona para indicar si te interesa o deseas omitir. Solo verás mascotas estrictamente compatibles con tu vivienda y disponibilidad de tiempo.
          </p>
        </div>

        {/* Barra de estado del perfil de búsqueda */}
        <div className="mb-8 p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">tune</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface">
                Filtros Activos{userProfile.fullName?.trim() ? `: ${userProfile.fullName}` : ''}
              </h3>
              <p className="text-xs text-on-surface-variant">
                Vivienda:{' '}
                <strong className="text-on-surface">
                  {FILTER_LABELS[userProfile.housingType] || userProfile.housingType}
                </strong>{' '}
                &bull; Tiempo:{' '}
                <strong className="text-on-surface">
                  {FILTER_LABELS[userProfile.timeAvailable] || userProfile.timeAvailable}
                </strong>{' '}
                &bull;{' '}
                {userProfile.hasChildren ? 'Con niños' : 'Sin niños'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-surface border border-surface-container text-on-surface font-medium">
              Disponibles: <strong className="text-primary font-bold">{deck.length}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-semibold">
              Me interesa: <strong>{interestedPets.length}</strong>
            </span>
            {skippedPets.length > 0 && (
              <span className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant">
                Omitidos: <strong>{skippedPets.length}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Notificación flotante de feedback */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-6 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 max-w-md mx-auto transition-all shadow-sm ${
              feedback.type === 'success'
                ? 'bg-secondary-container text-on-secondary-container border border-secondary'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {feedback.type === 'success' ? 'check_circle' : 'info'}
            </span>
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Área del Deck / Tarjeta Activa */}
        {currentPet ? (
          <div className="flex flex-col items-center">
            <PetCard
              pet={currentPet}
              onInterest={handleInterest}
              onSkip={handleSkip}
              isLoading={isProcessing}
            />
            <p className="text-xs text-on-surface-variant mt-4 text-center">
              Mascota 1 de {deck.length} que cumplen tus condiciones en Bogotá
            </p>
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-16 px-6 rounded-3xl bg-surface-container-low border border-surface-container max-w-md mx-auto shadow-sm">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary-fixed flex items-center justify-center mb-4 text-primary">
              <span className="material-symbols-outlined text-3xl">favorite</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface">¡Has revisado todas las opciones!</h3>
            <p className="text-sm text-on-surface-variant mt-2 max-w-xs mx-auto">
              Todas las mascotas compatibles con tu estilo de vida y vivienda han sido evaluadas.
            </p>

            <div className="mt-6">
              <button
                onClick={handleResetDeck}
                type="button"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                <span>Revisar de nuevo</span>
              </button>
            </div>
          </div>
        )}

        {/* Lista de Mascotas Guardadas (Me Interesa) */}
        {interestedPets.length > 0 && (
          <section className="mt-16 pt-8 border-t border-surface-container">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">favorite</span>
                <h3 className="text-lg font-bold text-on-surface">
                  Tus Mascotas Seleccionadas ({interestedPets.length})
                </h3>
              </div>
              <span className="text-xs text-secondary font-semibold">Listas para agendar visita</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {interestedPets.map((pet) => (
                <div
                  key={pet.id}
                  className="p-3 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={pet.imageUrls[0]}
                    alt={pet.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-on-surface truncate">{pet.name}</h4>
                    <p className="text-xs text-on-surface-variant truncate">{pet.shelter?.name}</p>
                    <button
                      onClick={() => onOpenScheduleModal?.(pet)}
                      type="button"
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-container cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">calendar_month</span>
                      Agendar cita
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  )
}
