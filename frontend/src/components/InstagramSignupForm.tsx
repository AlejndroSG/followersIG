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

  // Para usos futuros si necesitamos observar cambios en la categoría
  // const selectedCategory = watch('category');

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Usuario de Instagram */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Usuario de Instagram <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">@</span>
          </div>
          <input
            type="text"
            id="username"
            className={`block w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
              errors.username ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="tuusuario"
            {...register('username', {
              required: 'El nombre de usuario es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._]+$/,
                message: 'Ingresa un nombre de usuario de Instagram válido'
              }
            })}
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      {/* Correo electrónico */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresa un correo electrónico válido'
              }
            })}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoría principal de tu cuenta <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <select
            id="category"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
              errors.category ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('category', {
              required: 'Selecciona una categoría'
            })}
          >
            <option value="">Selecciona una categoría</option>
            {INSTAGRAM_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Número de seguidores */}
      <div>
        <label htmlFor="followers" className="block text-sm font-medium text-gray-700">
          Número aproximado de seguidores <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <select
            id="followers"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
              errors.followers ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('followers', {
              required: 'Selecciona un rango de seguidores'
            })}
          >
            <option value="">Selecciona un rango</option>
            <option value="0-1k">0 - 1,000</option>
            <option value="1k-5k">1,000 - 5,000</option>
            <option value="5k-10k">5,000 - 10,000</option>
            <option value="10k-50k">10,000 - 50,000</option>
            <option value="50k-100k">50,000 - 100,000</option>
            <option value="100k+">Más de 100,000</option>
          </select>
        </div>
        {errors.followers && (
          <p className="mt-1 text-sm text-red-600">{errors.followers.message}</p>
        )}
      </div>

      {/* Objetivos */}
      <div>
        <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
          ¿Cuál es tu principal objetivo? <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <select
            id="goals"
            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
              errors.goals ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register('goals', {
              required: 'Selecciona un objetivo'
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
        </div>
        {errors.goals && (
          <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
        )}
      </div>

      {/* Sitio web (opcional) */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Sitio web o enlace en bio (opcional)
        </label>
        <div className="mt-1">
          <input
            type="url"
            id="website"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="https://ejemplo.com"
            {...register('website')}
          />
        </div>
      </div>

      {/* Términos y condiciones */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="termsAccepted"
            type="checkbox"
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            {...register('termsAccepted', {
              required: 'Debes aceptar los términos y condiciones'
            })}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="termsAccepted" className="font-medium text-gray-700">
            Acepto los términos y condiciones <span className="text-red-500">*</span>
          </label>
          <p className="text-gray-500">
            Al registrarte, aceptas nuestros{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Términos de servicio
            </a>{' '}
            y{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Política de privacidad
            </a>
          </p>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
          )}
        </div>
      </div>

      {/* Botón de envío */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm ${
            isLoading
              ? 'bg-primary-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </div>
          ) : (
            'Potencia mi cuenta ahora'
          )}
        </button>
      </div>

      {/* Texto de protección de datos */}
      <div className="mt-4 text-sm text-center text-gray-500">
        <p>
          Tus datos están seguros y no compartiremos tu información con terceros.
          Usamos medidas de seguridad avanzadas para proteger tu cuenta.
        </p>
      </div>
    </form>
  );
}
