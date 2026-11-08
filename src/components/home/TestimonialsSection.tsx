import React from 'react'

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-space-xl px-margin md:px-margin-tablet lg:px-margin-desktop bg-surface" id="seccion-testimonios">
      <div className="max-w-7xl mx-auto space-y-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xs max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Historias de Hogar
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
              Familias bogotanas transformadas por el amor
            </h2>
          </div>
          <div className="flex items-center gap-2 text-secondary font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary">favorite</span>
            <span>Más de 1.200 historias felices en la capital</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-tablet lg:gap-gutter-desktop">
          {/* Testimonio 1: Suba */}
          <article className="p-space-lg rounded-2xl bg-surface-container-low shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container">
            <div className="space-y-space-sm">
              <div className="flex items-center gap-1 text-tertiary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-body-sm text-amber-500">
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                "Buscábamos un perrito tranquilo para nuestro apartamento en Suba Rincón. El test de compatibilidad nos conectó con 'Lucas', un criollo rescatado de 3 años. Fue amor a primera vista y la visita domiciliaria nos dio total tranquilidad."
              </p>
            </div>
            <div className="flex items-center gap-space-md pt-space-xs">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Mateo Ramírez"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                />
              </div>
              <div>
                <p className="font-headline-sm text-label-lg text-on-surface font-bold">Mateo Ramírez</p>
                <p className="font-body-sm text-label-sm text-on-surface-variant">Adoptó a Lucas &bull; Suba</p>
              </div>
            </div>
          </article>

          {/* Testimonio 2: Teusaquillo */}
          <article className="p-space-lg rounded-2xl bg-surface-container-low shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container">
            <div className="space-y-space-sm">
              <div className="flex items-center gap-1 text-tertiary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-body-sm text-amber-500">
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                "Nunca había adoptado un gatico adulto por temor a su adaptación. El equipo veterinario aliado de Pet-sible me guió paso a paso con 'Misha'. Hoy es la reina absoluta de nuestro hogar en Teusaquillo."
              </p>
            </div>
            <div className="flex items-center gap-space-md pt-space-xs">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Valentina Ospina"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                />
              </div>
              <div>
                <p className="font-headline-sm text-label-lg text-on-surface font-bold">Valentina Ospina</p>
                <p className="font-body-sm text-label-sm text-on-surface-variant">Adoptó a Misha &bull; Teusaquillo</p>
              </div>
            </div>
          </article>

          {/* Testimonio 3: Kennedy */}
          <article className="p-space-lg rounded-2xl bg-surface-container-low shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container">
            <div className="space-y-space-sm">
              <div className="flex items-center gap-1 text-tertiary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-body-sm text-amber-500">
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                "La claridad legal y el compromiso con la tenencia responsable me sorprendieron positivamente. Adoptamos a 'Bruno' en una jornada en Kennedy y nos entregaron su historial médico completo y chip al instante."
              </p>
            </div>
            <div className="flex items-center gap-space-md pt-space-xs">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="Familia González"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                />
              </div>
              <div>
                <p className="font-headline-sm text-label-lg text-on-surface font-bold">Familia González</p>
                <p className="font-body-sm text-label-sm text-on-surface-variant">Adoptaron a Bruno &bull; Kennedy</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
