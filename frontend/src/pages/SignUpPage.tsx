import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

// Assets
// Imagen placeholder - reemplazar con tu logo real
const logoPlaceholder = 'https://placeholder.pics/svg/200/7C3AED/FFFFFF-7C3AED/FollowersIG';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpFormData>();

  const password = watch('password');

  // Evaluar la fortaleza de la contraseña
  const evaluatePasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let score = 0;
    // Longitud mínima
    if (password.length >= 8) score += 1;
    // Contiene números
    if (/\d/.test(password)) score += 1;
    // Contiene letras minúsculas y mayúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    // Contiene caracteres especiales
    if (/[^a-zA-Z\d]/.test(password)) score += 1;
    
    return score;
  };

  // Actualizar la fortaleza cada vez que cambia la contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      // Simular una petición de registro
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Datos de registro:', data);
      alert('Registro exitoso! (Simulado)');
    } catch (error) {
      console.error('Error en el registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Panel izquierdo con imagen */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-md px-8">
          <img
            className="mx-auto h-36 w-auto"
            // src={logo}
            alt="FollowersIG Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white text-center">
            Impulsa tu presencia en Instagram
          </h2>
          <p className="mt-4 text-xl text-center text-white opacity-90">
            Analiza, optimiza y haz crecer tu cuenta de Instagram con herramientas profesionales.
          </p>
          <div className="mt-10">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-white">Análisis avanzado</p>
                  <p className="text-white opacity-80">Métricas detalladas y tendencias de tu cuenta</p>
                </div>
              </div>

            </div>
            <h2 className="mt-2 text-4xl font-extrabold text-white tracking-tight">
              FollowersIG
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              Tu herramienta definitiva para hacer crecer tu presencia en Instagram.
              Análisis avanzado, gestión de seguidores y mucho más.
            </p>
          </div>
          <div className="mt-12 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white border-opacity-20 w-full max-w-md transform transition-all hover:scale-105">
            <blockquote>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-purple-200 text-purple-600 flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-base font-semibold text-white">María González</div>
                  <div className="text-sm text-indigo-200">Influencer de moda</div>
                </div>
              </div>
              <p className="text-base italic text-white">
                "FollowersIG me ha ayudado a triplicar mis seguidores en menos de 3 meses.
                Las estadísticas y el análisis son simplemente excepcionales."
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Panel de formulario */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative">
        {/* Círculos decorativos */}
        <div className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-32 w-80 h-80 rounded-full bg-purple-50 opacity-30"></div>
        <div className="hidden lg:block absolute bottom-0 right-0 -mb-20 -mr-16 w-40 h-40 rounded-full bg-indigo-100 opacity-40"></div>
        
        <div className="mx-auto w-full max-w-md relative z-10">
          <div className="lg:hidden text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg flex items-center justify-center">
              <img
                className="h-12 w-auto"
                src={logoPlaceholder}
                alt="FollowersIG Logo"
              />
            </div>
            <h2 className="mt-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              FollowersIG
            </h2>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Crea tu cuenta</h2>
            <p className="mt-2 text-base text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
                Inicia sesión
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      {...register('name', {
                        required: 'El nombre es obligatorio',
                        minLength: {
                          value: 3,
                          message: 'El nombre debe tener al menos 3 caracteres'
                        }
                      })}
                      className={`appearance-none block w-full px-4 py-3 border ${errors.name ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition-colors duration-200 sm:text-sm`}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@ejemplo.com"
                      autoComplete="email"
                      {...register('email', {
                        required: 'El correo electrónico es obligatorio',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Ingresa un correo electrónico válido'
                        }
                      })}
                      className={`appearance-none block w-full px-4 py-3 border ${errors.email ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition-colors duration-200 sm:text-sm`}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="password"
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                      {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener al menos 8 caracteres'
                        },
                        onChange: handlePasswordChange
                      })}
                      className={`appearance-none block w-full px-4 py-3 border ${errors.password ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition-colors duration-200 sm:text-sm`}
                    />
                    {password && !errors.password && (
                      <div className="mt-2">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${passwordStrength === 0 ? 'bg-red-500' : passwordStrength === 1 ? 'bg-orange-500' : passwordStrength === 2 ? 'bg-yellow-500' : passwordStrength === 3 ? 'bg-green-500' : 'bg-green-600'}`}
                              style={{ width: `${(passwordStrength / 4) * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs">
                            {passwordStrength === 0 ? 'Débil' : passwordStrength === 1 ? 'Regular' : passwordStrength === 2 ? 'Buena' : 'Fuerte'}
                          </span>
                        </div>
                      </div>
                    )}
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar contraseña
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      {...register('confirmPassword', {
                        required: 'Confirma tu contraseña',
                        validate: value =>
                          value === password || 'Las contraseñas no coinciden'
                      })}
                      className={`appearance-none block w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition-colors duration-200 sm:text-sm`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkbox de términos */}
              <div className="mt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      {...register('terms', { required: 'Debes aceptar los términos y condiciones' })}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer transition-colors duration-200"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">Acepto los términos y condiciones</label>
                    {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>}
                    <p className="mt-1 text-xs text-gray-500">Al registrarte, aceptas nuestros <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200">Términos de servicio</a> y <a href="#" className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200">Política de privacidad</a>.</p>
                  </div>
                </div>
              </div>

              {/* Botón de registro mejorado */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center py-3 px-5 border border-transparent rounded-lg shadow-md text-base font-medium text-white transition-all duration-300 ${isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5'}`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registrando...
                    </div>
                  ) : (
                    <>
                      <LockClosedIcon className="h-5 w-5 mr-2" />
                      Crear cuenta
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Separador */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>
            </div>

            {/* Botones de redes sociales */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <a
                href="#"
                className="group w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8279 19.252 12.24 19.252C9.11277 19.252 6.46929 17.1399 5.50971 14.3003H1.5165V17.3912C3.55359 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853"/>
                  <path d="M5.50973 14.3003C4.99972 12.8099 4.99972 11.1961 5.50973 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50973 14.3003Z" fill="#FBBC04"/>
                  <path d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.1 1.0855 15.2207 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55359 2.55822 1.5165 6.61481L5.50973 9.70575C6.4693 6.86173 9.1128 4.74966 12.24 4.74966Z" fill="#EA4335"/>
                </svg>
                Google
              </a>

              <a
                href="#"
                className="group w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <svg className="h-5 w-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </a>
            </div>
            
            {/* Beneficios de registro */}
            <div className="mt-8 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-5 border border-indigo-100">
              <h3 className="text-sm font-medium text-indigo-900 flex items-center mb-2">
                <CheckIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Beneficios de FollowersIG
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  Análisis avanzado de seguidores y engagement
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  Recomendaciones personalizadas para crecimiento
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                  Soporte 24/7 y actualizaciones regulares
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
