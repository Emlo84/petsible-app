import React from 'react'
import type { Pet } from '../../types/pet'

interface PetCardProps {
  pet: Pet
  onInterest: (pet: Pet) => void
  onSkip: (pet: Pet) => void
  isLoading?: boolean
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  onInterest,
  onSkip,
  isLoading = false,
}) => {
  const getEnergyBadge = (level: Pet['energyLevel']) => {
    switch (level) {
      case 'low':
        return {
          label: 'Energía Tranquila',
          color: 'bg-secondary-container text-on-secondary-container',
        }
      case 'moderate':
        return {
          label: 'Energía Media',
          color: 'bg-primary-fixed text-on-primary-fixed',
        }
      case 'high':
        return {
          label: 'Alta Demanda de Ejercicio',
          color: 'bg-tertiary-fixed text-on-tertiary-fixed',
        }
    }
  }

  const energyInfo = getEnergyBadge(pet.energyLevel)

  return (
    <article className="w-full max-w-md mx-auto bg-surface rounded-3xl overflow-hidden shadow-xl border border-surface-container transition-all duration-300 hover:shadow-2xl">
      {/* Contenedor Imagen */}
      <div className="relative aspect-[4/3] w-full bg-surface-container overflow-hidden">
        <img
          src={pet.imageUrls[0]}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges superiores */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          {pet.shelter?.isVerified && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-on-secondary shadow-md">
              <span className="material-symbols-outlined text-sm">verified</span>
              Refugio Verificado
            </span>
          )}

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-surface/90 text-on-surface backdrop-blur">
            <span className="material-symbols-outlined text-sm text-primary">
              {pet.species === 'dog' ? 'pets' : 'cruelty_free'}
            </span>
            {pet.species === 'dog' ? 'Perro' : 'Gato'}
          </span>
        </div>

        {/* Nombre y Edad sobre la imagen */}
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {pet.name}
              <span className="text-lg font-normal text-white/80 ml-2">
                &bull; {pet.ageYears} {pet.ageYears === 1 ? 'año' : 'años'}
              </span>
            </h2>
          </div>
          <p className="text-sm font-medium text-primary-fixed mt-0.5">{pet.breed}</p>
        </div>
      </div>

      {/* Contenido / Atributos de Afinidad */}
      <div className="p-6 space-y-5 bg-surface">
        {/* Refugio de procedencia en Bogotá */}
        <div className="flex items-center gap-2 text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-xl border border-surface-container">
          <span className="material-symbols-outlined text-secondary text-body-md shrink-0">
            location_on
          </span>
          <span className="truncate">
            <strong className="text-on-surface">{pet.shelter?.name}</strong> &bull; {pet.shelter?.city}
          </span>
        </div>

        {/* Chips de características y estilo de vida */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold ${energyInfo.color}`}>
            <span className="material-symbols-outlined text-xs">bolt</span>
            {energyInfo.label}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-medium">
            Tamaño {pet.size === 'small' ? 'Pequeño' : pet.size === 'medium' ? 'Mediano' : 'Grande'}
          </span>

          {pet.goodWithChildren && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-fixed/50 text-on-secondary-fixed-variant font-medium">
              <span className="material-symbols-outlined text-xs">family_restroom</span>
              Apto niños
            </span>
          )}

          {pet.goodWithOtherPets && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-fixed/40 text-on-primary-fixed-variant font-medium">
              <span className="material-symbols-outlined text-xs">pets</span>
              Convive con mascotas
            </span>
          )}

          {pet.requiresYard ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-tertiary-fixed-dim/40 text-on-tertiary-fixed-variant font-medium">
              Requiere patio / jardín
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-container/60 text-on-secondary-container font-medium">
              Apto apartamento
            </span>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
          {pet.description}
        </p>

        {/* Tags de salud garantizados */}
        {pet.tags && pet.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-surface-container">
            {pet.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary bg-surface-container-low px-2 py-0.5 rounded-md border border-surface-container"
              >
                <span className="material-symbols-outlined text-xs">check_circle</span>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Botones de Acción (Omitir / Me interesa) */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onSkip(pet)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline/30 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-body-md text-outline">close</span>
            <span>Omitir</span>
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => onInterest(pet)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-body-md">favorite</span>
            <span>Me interesa</span>
          </button>
        </div>
      </div>
    </article>
  )
}
