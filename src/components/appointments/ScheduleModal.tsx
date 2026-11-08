import React, { useState } from 'react'
import type { Pet } from '../../types/pet'
import { AppointmentService } from '../../services/supabase/appointmentService'

interface ScheduleModalProps {
  pet: Pet
  adopterId: string
  onClose: () => void
  onSuccess?: () => void
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  pet,
  adopterId,
  onClose,
  onSuccess,
}) => {
  const [date, setDate] = useState<string>('2026-11-15')
  const [timeSlot, setTimeSlot] = useState<string>('10:00')
  const [notes, setNotes] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    try {
      const start = new Date(`${date}T${timeSlot}:00`)
      // Cita de 1 hora de duración
      const end = new Date(start.getTime() + 60 * 60 * 1000)

      const result = await AppointmentService.createAppointment({
        petId: pet.id,
        adopterId,
        shelterId: pet.shelterId,
        startDateTime: start.toISOString(),
        endDateTime: end.toISOString(),
        notes,
      })

      if (result.error) {
        setErrorMessage(result.error)
      } else {
        setSuccessMessage(`¡Cita confirmada exitosamente con el refugio ${pet.shelter?.name}!`)
        setTimeout(() => {
          onSuccess?.()
          onClose()
        }, 2200)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-surface border border-surface-container rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-body-md">calendar_month</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface">Agendar Visita con {pet.name}</h3>
            <p className="text-xs text-on-surface-variant">{pet.shelter?.name} &bull; {pet.shelter?.city}</p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-sm text-error">warning</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-secondary-container text-on-secondary-container text-xs flex items-center gap-2 font-medium">
            <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5">
              Fecha de la visita
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5">
              Bloque Horario (1 hora) &bull; Prevención de colisiones
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    timeSlot === slot
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-surface-container-low border-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs inline mr-1">schedule</span>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5">
              Comentarios o preguntas para el refugio (opcional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Llevaré a mi perro actual para evaluar convivencia..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-surface-container bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? 'Validando horario...' : 'Confirmar Cita'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
