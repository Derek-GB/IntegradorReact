export default function FormContainer({
  title = "Formulario",
  onSubmit,
  children,
  size = "md"
}) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-full sm:max-w-sm mx-auto";
      case "md":
        return "w-full sm:max-w-md md:max-w-lg mx-auto";
      case "lg":
        return "w-full sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto";
      case "xl":
        return "w-full sm:max-w-md md:max-w-xl xl:max-w-2xl mx-auto";
      case "full":
        return "w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto";
      default:
        return "w-full sm:max-w-md md:max-w-lg mx-auto";
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-12 font-[Poppins]">
      <form
        onSubmit={onSubmit}
        className={`${getSizeClasses()} bg-white/95 backdrop-blur-sm border-2 border-[#00897B]/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}
      >
        {/* Encabezado */}
        <div className="w-full bg-[#00897B]  -mx-0">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center">
            {title}
          </h2>
        </div>

        {/* Campos personalizados */}
        <div className="p-8 space-y-6">{children}</div>
      </form>
    </div>
  );
}