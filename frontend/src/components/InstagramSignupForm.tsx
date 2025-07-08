import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Define las categorías de Instagram para el dropdown
const INSTAGRAM_CATEGORIES = [
  'Moda',
  'Belleza',
  'Fitness',
  'Viajes',
  'Gastronomía',
  'Tecnología',
  'Arte',
  'Música',
  'Fotografía',
  'Emprendimiento',
  'Educación',
  'Lifestyle',
  'Gaming',
  'Deportes',
  'Humor',
  'Otro'
];

// Interfaces para el formulario
interface FormValues {
  username: string;
  email: string;
  category: string;
  followers: string;
  goals: string;
  website?: string;
  termsAccepted: boolean;
}

interface InstagramSignupFormProps {
  onSuccess: () => void;
}

export default function InstagramSignupForm({ onSuccess }: InstagramSignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      category: '',
      followers: '',
      goals: '',
      website: '',
      termsAccepted: false
    }
  });

  // Procesar el envío del formulario
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulamos una llamada API (esto sería reemplazado por una llamada real)
      console.log('Datos del formulario:', data);
      
      // Simulamos un pequeño delay para mostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Llamar al callback de éxito
      onSuccess();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <circle cx="18" cy="6" r="1.5"></circle>
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Potencia tu cuenta de Instagram</h2>
      <p className="text-center text-gray-500 mb-8">Accede a estadísticas avanzadas y herramientas de crecimiento</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Usuario de Instagram */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Usuario de Instagram <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="text-gray-500">@</span>
            </div>
            <input
              type="text"
              id="username"
              className={`block w-full pl-8 pr-4 py-3 border rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.username ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="tuusuario"
              {...register('username', {
                required: 'El nombre de usuario es obligatorio',
              })}
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.email ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="tucorreo@ejemplo.com"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría de tu cuenta <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white ${
              errors.category ? 'border-red-300' : 'border-gray-200'
            }`}
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
            {...register('category', {
              required: 'Selecciona una categoría',
            })}
          >
            <option value="">Selecciona una categoría</option>
            {INSTAGRAM_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Seguidores */}
        <div>
          <label htmlFor="followers" className="block text-sm font-medium text-gray-700 mb-1">
            Número aproximado de seguidores <span className="text-red-500">*</span>
          </label>
          <select
            id="followers"
            className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white ${
              errors.followers ? 'border-red-300' : 'border-gray-200'
            }`}
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
            {...register('followers', {
              required: 'Selecciona un rango de seguidores',
            })}
          >
            <option value="">Selecciona un rango</option>
            <option value="0-1000">0 - 1,000</option>
            <option value="1000-5000">1,000 - 5,000</option>
            <option value="5000-10000">5,000 - 10,000</option>
            <option value="10000-50000">10,000 - 50,000</option>
            <option value="50000-100000">50,000 - 100,000</option>
            <option value="100000+">Más de 100,000</option>
          </select>
          {errors.followers && (
            <p className="mt-1 text-sm text-red-500">{errors.followers.message}</p>
          )}
        </div>

        {/* Objetivos */}
        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
            Objetivo principal <span className="text-red-500">*</span>
          </label>
          <select
            id="goals"
            className={`block w-full px-4 py-3 border rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white ${
              errors.goals ? 'border-red-300' : 'border-gray-200'
            }`}
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
            {...register('goals', {
              required: 'Selecciona un objetivo',
            })}
          >
            <option value="">Selecciona un objetivo</option>
            <option value="increase_followers">Aumentar seguidores</option>
            <option value="improve_engagement">Mejorar engagement</option>
            <option value="monetize">Monetizar mi cuenta</option>
            <option value="brand_collaborations">Conseguir colaboraciones con marcas</option>
            <option value="community">Construir comunidad</option>
            <option value="other">Otro</option>
          </select>
          {errors.goals && (
            <p className="mt-1 text-sm text-red-500">{errors.goals.message}</p>
          )}
        </div>

        {/* Sitio web (opcional) */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Sitio web o enlace en bio (opcional)
          </label>
          <input
            type="url"
            id="website"
            className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://ejemplo.com"
            {...register('website')}
          />
        </div>

        {/* Términos y condiciones */}
        <div className="flex items-start pt-2">
          <div className="flex items-center h-5">
            <input
              id="termsAccepted"
              type="checkbox"
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              {...register('termsAccepted', {
                required: 'Debes aceptar los términos y condiciones',
              })}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="termsAccepted" className="font-medium text-gray-700">
              Acepto los términos y condiciones <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-500">
              Al registrarte, aceptas nuestros{' '}
              <a href="#" className="text-purple-600 hover:text-purple-500 hover:underline">
                Términos de servicio
              </a>{' '}
              y{' '}
              <a href="#" className="text-purple-600 hover:text-purple-500 hover:underline">
                Política de privacidad
              </a>
            </p>
            {errors.termsAccepted && (
              <p className="mt-1 text-sm text-red-500">{errors.termsAccepted.message}</p>
            )}
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              'Potencia mi cuenta ahora'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
