export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Appointment {
  id: string
  petId: string
  adopterId: string
  shelterId: string
  startDateTime: string // ISO 8601
  endDateTime: string   // ISO 8601
  status: AppointmentStatus
  notes?: string
  createdAt?: string
}

export interface CreateAppointmentDTO {
  petId: string
  adopterId: string
  shelterId: string
  startDateTime: string
  endDateTime: string
  notes?: string
}
