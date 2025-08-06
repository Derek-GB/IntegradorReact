import React, { useState, useEffect } from 'react';

const Inicio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      text: "Este sistema ha revolucionado la gestión de emergencias en nuestra región. La rapidez y eficiencia son incomparables.",
      author: "Dra. María González",
      role: "Directora de Protección Civil"
    },
    {
      text: "La facilidad para registrar familias y coordinar recursos ha mejorado significativamente nuestros tiempos de respuesta.",
      author: "Ing. Carlos Ruiz",
      role: "Coordinador de Emergencias"
    },
    {
      text: "Una herramienta indispensable para cualquier organización que maneje situaciones de crisis.",
      author: "Lic. Ana Torres",
      role: "Administradora de Albergues"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section con animación */}
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 pt-16 relative overflow-hidden">
        {/* Elementos decorativos animados */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-25 animate-bounce delay-1000"></div>

        {/* Header principal */}
        <div className={`container mx-auto px-4 py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full mb-6 shadow-2xl animate-pulse">
              <span className="material-icons text-white text-5xl">home_work</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 mb-6 leading-tight">
              Sistema de Gestión de
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 block">Albergues</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Solución integral para <strong className="text-teal-700">agilizar y eficientizar</strong> el registro de familias, 
              suministros y albergues en situaciones de emergencia.
            </p>
            
      

          </div>

          {/* Características principales mejoradas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                  <span className="material-icons text-white text-3xl">groups</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Registro de Familias</h3>
                <p className="text-gray-600 leading-relaxed">Sistema rápido y seguro para el registro de familias afectadas con validación en tiempo real</p>
                <div className="mt-4 flex items-center text-blue-600 font-semibold">
                  <span className="text-sm">Ver más</span>
                  <span className="material-icons ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                  <span className="material-icons text-white text-3xl">inventory_2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Control de Suministros</h3>
                <p className="text-gray-600 leading-relaxed">Gestión eficiente del inventario y distribución de recursos con alertas automáticas</p>
                <div className="mt-4 flex items-center text-green-600 font-semibold">
                  <span className="text-sm">Ver más</span>
                  <span className="material-icons ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                  <span className="material-icons text-white text-3xl">hotel</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Gestión de Albergues</h3>
                <p className="text-gray-600 leading-relaxed">Administración centralizada de espacios y capacidades con monitoreo en vivo</p>
                <div className="mt-4 flex items-center text-purple-600 font-semibold">
                  <span className="text-sm">Ver más</span>
                  <span className="material-icons ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                  <span className="material-icons text-white text-3xl">flash_on</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Respuesta Rápida</h3>
                <p className="text-gray-600 leading-relaxed">Coordinación ágil y efectiva ante situaciones de emergencia con notificaciones push</p>
                <div className="mt-4 flex items-center text-orange-600 font-semibold">
                  <span className="text-sm">Ver más</span>
                  <span className="material-icons ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nueva sección: Flujo de trabajo */}
          <div className="bg-white rounded-3xl p-12 shadow-xl mb-20 border border-gray-100">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              ¿Cómo Funciona?
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Proceso simplificado en 4 pasos para una gestión eficiente
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Registro</h4>
                <p className="text-gray-600 text-sm">Registra familias y recursos de manera rápida y segura</p>
                {/* Flecha conectora */}
                <div className="hidden md:block absolute top-8 left-full w-8 text-gray-300">
                  <span className="material-icons">arrow_forward</span>
                </div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Organización</h4>
                <p className="text-gray-600 text-sm">Clasifica y organiza la información automáticamente</p>
                <div className="hidden md:block absolute top-8 left-full w-8 text-gray-300">
                  <span className="material-icons">arrow_forward</span>
                </div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Distribución</h4>
                <p className="text-gray-600 text-sm">Asigna recursos y espacios de manera eficiente</p>
                <div className="hidden md:block absolute top-8 left-full w-8 text-gray-300">
                  <span className="material-icons">arrow_forward</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                  4
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Monitoreo</h4>
                <p className="text-gray-600 text-sm">Supervisa y actualiza en tiempo real</p>
              </div>
            </div>
          </div>

          {/* Sección de estadísticas mejorada */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-12 shadow-xl mb-20 text-white">
            <h2 className="text-4xl font-bold text-center mb-4">
              Impacto del Sistema
            </h2>
            <p className="text-center mb-12 text-xl opacity-90">
              Resultados que marcan la diferencia
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">24/7</div>
                <p className="text-lg opacity-90">Disponibilidad continua</p>
                <span className="material-icons text-4xl mt-2 opacity-70">schedule</span>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100%</div>
                <p className="text-lg opacity-90">Datos seguros</p>
                <span className="material-icons text-4xl mt-2 opacity-70">security</span>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">50%</div>
                <p className="text-lg opacity-90">Reducción de tiempo</p>
                <span className="material-icons text-4xl mt-2 opacity-70">speed</span>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">99.9%</div>
                <p className="text-lg opacity-90">Uptime garantizado</p>
                <span className="material-icons text-4xl mt-2 opacity-70">cloud_done</span>
              </div>
            </div>
          </div>


        
        </div>
      </div>
    </>
  );
};

export default Inicio;