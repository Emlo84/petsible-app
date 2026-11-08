import { supabase } from './client'
import type { Appointment, CreateAppointmentDTO } from '../../types/appointment'

export interface ServiceResponse<T> {
  data: T | null
  error: string | null
}

/**
 * Servicio de Agendamiento de Citas con validación estricta de solapamiento horario.
 * Aplica principio de responsabilidad única (SRP) y garantiza integridad de datos
 * evitando reservas duplicadas para una misma mascota en el mismo bloque de tiempo.
 */
export class AppointmentService {
  /**
   * Valida si un intervalo de tiempo solapa con citas existentes no canceladas.
   * Regla de intersección temporal: (StartA < EndB) AND (EndA > StartB).
   */
  public static async isTimeSlotAvailable(
    petId: string,
    startDateTime: string,
    endDateTime: string
  ): Promise<ServiceResponse<boolean>> {
    try {
      const startDate = new Date(startDateTime)
      const endDate = new Date(endDateTime)

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return { data: false, error: 'Las fechas proporcionadas no tienen un formato ISO válido.' }
      }

      if (startDate >= endDate) {
        return {
          data: false,
          error: 'La fecha de inicio debe ser anterior a la fecha de finalización.',
        }
      }

      // Consultar citas de la mascota que no hayan sido canceladas y solapen con el intervalo
      const { data, error } = await supabase
        .from('appointments')
        .select('id, start_time, end_time, status')
        .eq('pet_id', petId)
        .neq('status', 'cancelled')
        .lt('start_time', endDate.toISOString())
        .gt('end_time', startDate.toISOString())

      if (error) {
        // En modo desarrollo/demo o si la tabla aún no existe, podemos advertir o fallar limpiamente
        console.warn('[AppointmentService] Supabase query error:', error.message)
        return { data: false, error: error.message }
      }

      const hasConflict = (data && data.length > 0)
      return { data: !hasConflict, error: null }
    } catch (err) {
      return {
        data: false,
        error: err instanceof Error ? err.message : 'Error al verificar disponibilidad de horario.',
      }
    }
  }

  /**
   * Crea una cita de adopción previa verificación obligatoria contra colisiones.
   */
  public static async createAppointment(
    dto: CreateAppointmentDTO
  ): Promise<ServiceResponse<Appointment>> {
    try {
      // 1. Validación de conflicto horario
      const availabilityCheck = await this.isTimeSlotAvailable(
        dto.petId,
        dto.startDateTime,
        dto.endDateTime
      )

      if (availabilityCheck.error) {
        return { data: null, error: availabilityCheck.error }
      }

      if (!availabilityCheck.data) {
        return {
          data: null,
          error: 'Conflicto de horario: Ya existe una cita agendada para esta mascota en el bloque seleccionado.',
        }
      }

      // 2. Inserción atómica en la base de datos
      const payload = {
        pet_id: dto.petId,
        adopter_id: dto.adopterId,
        shelter_id: dto.shelterId,
        start_time: new Date(dto.startDateTime).toISOString(),
        end_time: new Date(dto.endDateTime).toISOString(),
        status: 'pending',
        notes: dto.notes?.trim() || null,
      }

      const { data, error } = await supabase
        .from('appointments')
        .insert(payload)
        .select()
        .single()

      if (error) {
        return { data: null, error: `Error al registrar la cita: ${error.message}` }
      }

      const appointment: Appointment = {
        id: data.id,
        petId: data.pet_id,
        adopterId: data.adopter_id,
        shelterId: data.shelter_id,
        startDateTime: data.start_time,
        endDateTime: data.end_time,
        status: data.status,
        notes: data.notes,
        createdAt: data.created_at,
      }

      return { data: appointment, error: null }
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Error inesperado al agendar cita.',
      }
    }
  }
}
