export type HousingType =
  | 'apartment_small'
  | 'apartment_large'
  | 'house_no_yard'
  | 'house_with_yard'

export type DailyTimeAvailable =
  | 'under_2h'
  | '2_to_4h'
  | 'more_than_4h'

export type ExperienceLevel =
  | 'first_time'
  | 'intermediate'
  | 'experienced'

export interface UserProfile {
  id: string
  fullName: string
  email: string
  housingType: HousingType
  hasChildren: boolean
  childrenMinAge?: number
  timeAvailable: DailyTimeAvailable
  hasOtherPets: boolean
  experienceLevel: ExperienceLevel
}
