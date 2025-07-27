import React from "react";

const sizeClasses = {
  sm: "w-full max-w-sm ",
  md: "w-full max-w-4xl ",
  lg: "w-11/12 md:w-[100%]  ",
};

export default function FormContainer({
  title = "Formulario",
  onSubmit,
  children,
  buttonText = "Enviar",
  size = "md", // Nuevo parámetro
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[SegoeUI]">
      <form
        onSubmit={onSubmit}
        className={`${sizeClasses[size]}  bg-white border border-[#00897B] rounded-2xl shadow-2xl`}
      >
        {/* Encabezado con fondo */}
        <div className="rounded-t-2xl bg-[#00897B] w-full">
          <div className="flex items-center justify-center gap-4 py-6">
            <h2 className="text-3xl font-bold text-white text-center">
              {title}
            </h2>
          </div>
        </div>
        <div className="p-12">{children}</div>
      </form>
    </div>
  );
}