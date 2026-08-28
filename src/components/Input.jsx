import { forwardRef } from "react";

// Usamos forwardRef para que funcione con react-hook-form
const Input = forwardRef(({ icon, suffix, className = "", ...props }, ref) => {
    return (
        <div className="relative w-full">
            {/* Icono de la izquierda (opcional) */}
            {icon && (
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none">
          {icon}
        </span>
            )}

            {/* Input nativo */}
            <input
                ref={ref} /* <-- Esto conecta react-hook-form con el input */
                className={`
          w-full xl:h-11 py-3 bg-surface-variant border-2 border-transparent 
          focus:border-secondary focus:bg-surface-container-lowest outline-none 
          transition-colors rounded-lg font-body-md text-on-surface 
          placeholder:text-on-surface-variant/50
          /* Ajustamos los paddings si hay iconos para que el texto no los pise */
          ${icon ? 'pl-10' : 'pl-4'} 
          ${suffix ? 'pr-12' : 'pr-4'}
          ${className}
        `}
                {...props}
            />

            {/* Elemento de la derecha (Botón de visibilidad u otros iconos) */}
            {suffix && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    {suffix}
                </div>
            )}
        </div>
    );
});

// React recomienda ponerle un displayName a los componentes con forwardRef
Input.displayName = "Input";

export default Input;