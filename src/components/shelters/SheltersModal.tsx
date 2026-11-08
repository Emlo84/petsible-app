import React from 'react'
import { MOCK_SHELTERS } from '../../data/mockData'

interface SheltersModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectShelter?: (shelterName: string) => void
}

export const SheltersModal: React.FC<SheltersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const shelters = Object.values(MOCK_SHELTERS)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shelters-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="w-full max-w-2xl bg-surface border border-surface-container rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar modal"
          className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-secondary">domain</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 id="shelters-modal-title" className="text-xl font-bold text-on-surface">
                Red de Refugios Aliados
              </h2>
              <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Verificados
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Refugios y fundaciones auditadas con protocolo de bienestar animal estricto.
            </p>
          </div>
        </div>

        {/* Lista de Refugios */}
        <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
          {shelters.map((shelter) => (
            <div
              key={shelter.id}
              className="p-4 rounded-2xl bg-surface-container-low border border-surface-container hover:border-secondary/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-on-surface">{shelter.name}</h3>
                  {shelter.isVerified && (
                    <span
                      title="Refugio auditado y verificado"
                      className="inline-flex items-center text-secondary text-xs"
                    >
                      <span className="material-symbols-outlined text-base">verified</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-secondary">location_on</span>
                    {shelter.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary">mail</span>
                    {shelter.contactEmail}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-tertiary">call</span>
                    {shelter.phone}
                  </span>
                </div>
              </div>

              <a
                href="#catalogo-preview"
                onClick={onClose}
                className="self-start sm:self-center inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-container px-3 py-1.5 rounded-lg bg-surface border border-surface-container hover:bg-surface-container transition-colors shrink-0"
              >
                <span>Ver mascotas</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer del Modal */}
        <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
            Protocolo distrital de bienestar animal
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}

