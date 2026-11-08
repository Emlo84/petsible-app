export type InterestAction = 'interested' | 'skipped'

export interface AdoptionInterestRecord {
  id?: string
  adopterId: string
  petId: string
  action: InterestAction
  createdAt: string
}
