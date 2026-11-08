import type { Pet } from '../types/pet'
import type { UserProfile } from '../types/user'

export interface CompatibilityResult {
  pet: Pet
  isCompatible: boolean
  affinityScore: number // 0 a 100
  reasons: string[]     // Justificaciones del match o descarte
}

export interface CompatibilityRule {
  name: string
  evaluate: (profile: UserProfile, pet: Pet) => { passed: boolean; reason?: string }
}

/**
 * Reglas de filtrado estricto (Hard Constraints).
 * Si cualquiera de estas reglas falla, la mascota queda descartada.
 */
export const MANDATORY_RULES: CompatibilityRule[] = [
  {
    name: 'Disponibilidad de la Mascota',
    evaluate: (_profile, pet) => ({
      passed: pet.status === 'available',
      reason: pet.status !== 'available' ? 'La mascota no está disponible para adopción.' : undefined,
    }),
  },
  {
    name: 'Refugio Verificado',
    evaluate: (_profile, pet) => {
      const isVerified = Boolean(pet.shelter?.isVerified)
      return {
        passed: isVerified,
        reason: !isVerified ? 'El refugio no cuenta con la verificación oficial requerida.' : undefined,
      }
    },
  },
  {
    name: 'Compatibilidad con Niños',
    evaluate: (profile, pet) => {
      if (!profile.hasChildren) {
        return { passed: true }
      }
      return {
        passed: pet.goodWithChildren,
        reason: !pet.goodWithChildren
          ? 'La mascota requiere un hogar sin niños pequeños.'
          : undefined,
      }
    },
  },
  {
    name: 'Convivencia con Otras Mascotas',
    evaluate: (profile, pet) => {
      if (!profile.hasOtherPets) {
        return { passed: true }
      }
      return {
        passed: pet.goodWithOtherPets,
        reason: !pet.goodWithOtherPets
          ? 'La mascota debe ser la única en el hogar.'
          : undefined,
      }
    },
  },
  {
    name: 'Espacio y Tipo de Vivienda',
    evaluate: (profile, pet) => {
      // Si la mascota requiere patio obligatoriamente
      if (pet.requiresYard && profile.housingType !== 'house_with_yard') {
        return {
          passed: false,
          reason: 'La mascota requiere una casa con patio cercado.',
        }
      }

      // Si vive en departamento pequeño y la mascota es grande con energía moderada/alta
      if (
        profile.housingType === 'apartment_small' &&
        pet.size === 'large' &&
        pet.energyLevel !== 'low'
      ) {
        return {
          passed: false,
          reason: 'Mascota de tamaño grande no apta para departamento pequeño.',
        }
      }

      return { passed: true }
    },
  },
  {
    name: 'Disponibilidad de Tiempo y Nivel de Energía',
    evaluate: (profile, pet) => {
      if (profile.timeAvailable === 'under_2h' && pet.energyLevel === 'high') {
        return {
          passed: false,
          reason: 'Mascota con alta demanda de ejercicio incompatible con menos de 2h diarias disponibles.',
        }
      }

      return { passed: true }
    },
  },
]

/**
 * Calcula el puntaje de afinidad complementario (0 a 100) para ordenar coincidencias.
 */
function calculateAffinityScore(profile: UserProfile, pet: Pet): number {
  let score = 50 // Base score para mascotas que pasan todos los filtros obligatorios

  // 1. Balance de tiempo y energía (hasta +25)
  if (profile.timeAvailable === 'more_than_4h') {
    score += 25
  } else if (profile.timeAvailable === '2_to_4h' && pet.energyLevel !== 'high') {
    score += 20
  } else if (profile.timeAvailable === 'under_2h' && pet.energyLevel === 'low') {
    score += 25
  }

  // 2. Comodidad de espacio (hasta +15)
  if (profile.housingType === 'house_with_yard') {
    score += 15
  } else if (profile.housingType === 'house_no_yard' || profile.housingType === 'apartment_large') {
    score += 10
  }

  // 3. Experiencia previa (hasta +10)
  if (profile.experienceLevel === 'experienced') {
    score += 10
  } else if (profile.experienceLevel === 'first_time' && pet.energyLevel === 'low') {
    score += 10
  }

  return Math.min(100, Math.max(0, score))
}

/**
 * Función principal del Algoritmo de Afinidad.
 * Filtra estrictamente las mascotas según las restricciones obligatorias y
 * retorna únicamente las candidatas compatibles, ordenadas por puntaje de match.
 *
 * @param profile Perfil del adoptante potencial con respuestas de vivienda, tiempo, etc.
 * @param pets Array completo de mascotas a evaluar.
 * @returns Array de mascotas compatibles ordenadas por mayor afinidad.
 */
export function filterCompatiblePets(profile: UserProfile, pets: Pet[]): Pet[] {
  if (!profile || !pets || pets.length === 0) {
    return []
  }

  const results: CompatibilityResult[] = []

  for (const pet of pets) {
    let isCompatible = true
    const rejectionReasons: string[] = []

    for (const rule of MANDATORY_RULES) {
      const evaluation = rule.evaluate(profile, pet)
      if (!evaluation.passed) {
        isCompatible = false
        if (evaluation.reason) {
          rejectionReasons.push(evaluation.reason)
        }
        // Fail-fast para optimizar rendimiento
        break
      }
    }

    if (isCompatible) {
      const score = calculateAffinityScore(profile, pet)
      results.push({
        pet,
        isCompatible: true,
        affinityScore: score,
        reasons: ['Cumple con todos los requisitos de vivienda, tiempo y convivencia.'],
      })
    }
  }

  // Ordenar de mayor a menor afinidad
  return results
    .sort((a, b) => b.affinityScore - a.affinityScore)
    .map((res) => res.pet)
}
