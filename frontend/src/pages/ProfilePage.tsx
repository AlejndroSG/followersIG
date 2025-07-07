import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface UserProfile {
  name: string;
  email: string;
  instagramUsername: string;
  website: string;
  category: string;
  notifications: {
    email: boolean;
    reports: boolean;
    tips: boolean;
  };
}

export default function ProfilePage() {
  // Estado inicial del perfil (simulando datos de la API)
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const defaultValues: UserProfile = {
    name: 'Usuario Demo',
    email: 'usuario@ejemplo.com',
    instagramUsername: 'tuusuario',
    website: 'https://ejemplo.com',
    category: 'Marketing Digital',
    notifications: {
      email: true,
      reports: true,
      tips: false
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm<UserProfile>({
    defaultValues
  });

  const onSubmit = async (data: UserProfile) => {
    setIsSaving(true);
    try {
      // Simular petición a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Datos de perfil actualizados:', data);
      
      // Simular actualización exitosa
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Perfil de usuario</h2>
        <p className="mt-1 text-sm text-gray-500">
          Administra la información de tu cuenta y preferencias.
        </p>
      </div>

      {/* Perfil principal */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Información personal</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Detalles personales y de contacto.</p>
          </div>
          <div>
            {isEditing ? (
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancelar
                </button>
                <button
                  form="profile-form"
                  type="submit"
                  disabled={isSaving}
                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    isSaving ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSaving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Editar
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Este campo es obligatorio' })}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.name ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Ingresa un correo válido'
                        }
                      })}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.email ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="instagramUsername" className="block text-sm font-medium text-gray-700">
                    Usuario de Instagram
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">@</span>
                    </div>
                    <input
                      type="text"
                      id="instagramUsername"
                      {...register('instagramUsername', { required: 'Este campo es obligatorio' })}
                      className={`pl-8 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.instagramUsername ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.instagramUsername && (
                      <p className="mt-2 text-sm text-red-600">{errors.instagramUsername.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Sitio web
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      id="website"
                      placeholder="https://"
                      {...register('website')}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      {...register('category', { required: 'Este campo es obligatorio' })}
                      className={`shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                        errors.category ? 'border-red-300' : ''
                      }`}
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="Moda">Moda</option>
                      <option value="Belleza">Belleza</option>
                      <option value="Fitness">Fitness</option>
                      <option value="Viajes">Viajes</option>
                      <option value="Gastronomía">Gastronomía</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="Arte">Arte</option>
                      <option value="Música">Música</option>
                      <option value="Marketing Digital">Marketing Digital</option>
                      <option value="Educación">Educación</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.category && (
                      <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <fieldset>
                <legend className="text-base font-medium text-gray-900">Notificaciones</legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.email"
                        type="checkbox"
                        {...register('notifications.email')}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.email" className="font-medium text-gray-700">Notificaciones por email</label>
                      <p className="text-gray-500">Recibe actualizaciones importantes sobre tu cuenta.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.reports"
                        type="checkbox"
                        {...register('notifications.reports')}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.reports" className="font-medium text-gray-700">Reportes semanales</label>
                      <p className="text-gray-500">Recibe un resumen semanal del rendimiento de tu cuenta.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notifications.tips"
                        type="checkbox"
                        {...register('notifications.tips')}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notifications.tips" className="font-medium text-gray-700">Consejos y trucos</label>
                      <p className="text-gray-500">Recibe consejos personalizados para optimizar tu cuenta.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        ) : (
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nombre completo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{defaultValues.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Correo electrónico</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{defaultValues.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Usuario de Instagram</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">@{defaultValues.instagramUsername}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Sitio web</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {defaultValues.website ? (
                    <a href={defaultValues.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-500">
                      {defaultValues.website}
                    </a>
                  ) : (
                    <span className="text-gray-500 italic">No especificado</span>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Categoría</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{defaultValues.category}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Notificaciones</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">Notificaciones por email</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          defaultValues.notifications.email ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {defaultValues.notifications.email ? 'Activadas' : 'Desactivadas'}
                        </span>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">Reportes semanales</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          defaultValues.notifications.reports ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {defaultValues.notifications.reports ? 'Activados' : 'Desactivados'}
                        </span>
                      </div>
                    </li>
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">Consejos y trucos</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          defaultValues.notifications.tips ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {defaultValues.notifications.tips ? 'Activados' : 'Desactivados'}
                        </span>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      {/* Suscripción */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Plan de suscripción
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Actualmente estás utilizando la versión de prueba gratuita.
            </p>
          </div>
          <div className="mt-5 sm:flex sm:items-center">
            <div className="sm:flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 sm:text-sm"
              >
                Actualizar a Premium
              </button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-6">
              <p className="text-sm text-gray-500">
                Desbloquea todas las características avanzadas y soporte prioritario.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seguridad */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Seguridad de la cuenta
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Administra la seguridad de tu cuenta y cambia tu contraseña.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>

      {/* Eliminar cuenta */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Eliminar cuenta
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
            </p>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
