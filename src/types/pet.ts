export type Species = 'dog' | 'cat'
export type PetSize = 'small' | 'medium' | 'large'
export type EnergyLevel = 'low' | 'moderate' | 'high'
export type PetStatus = 'available' | 'in_process' | 'adopted'

export interface Shelter {
  id: string
  name: string
  isVerified: boolean
  city: string
  contactEmail: string
  phone?: string
}

export interface Pet {
  id: string
  name: string
  species: Species
  breed: string
  ageYears: number
  size: PetSize
  energyLevel: EnergyLevel
  goodWithChildren: boolean
  goodWithOtherPets: boolean
  requiresYard: boolean
  status: PetStatus
  shelterId: string
  shelter?: Shelter
  imageUrls: string[]
  description: string
  tags?: string[]
}
