import { Fragment, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChartPieIcon,
  UserIcon,
  PresentationChartLineIcon,
  RocketLaunchIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
// Usamos un logo de texto en lugar de una imagen para evitar problemas de construcción

// Configuración de navegación
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Análisis', href: '/analytics', icon: ChartPieIcon },
  { name: 'Estrategias', href: '/strategy', icon: RocketLaunchIcon },
  { name: 'Estadísticas', href: '/statistics', icon: PresentationChartLineIcon },
  { name: 'Perfil', href: '/profile', icon: UserIcon },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar móvil */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                <div className="flex flex-col flex-1 overflow-y-auto bg-white shadow-lg">
                  <div className="flex items-center justify-between flex-shrink-0 h-16 px-6">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-md text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <span className="ml-2 text-xl font-bold text-primary-600">FollowersIG</span>
                    </div>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-900"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <nav className="flex flex-col flex-1 px-4 py-4 space-y-1">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`
                            flex items-center px-3 py-2 text-sm font-medium rounded-md
                            ${isActive 
                              ? 'bg-primary-100 text-primary-600' 
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                          `}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon 
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                    <div className="pt-4 mt-auto border-t border-gray-200">
                      <button
                        className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Sidebar estático para escritorio */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-600 rounded-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold text-primary-600">FollowersIG</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${isActive 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                    `}
                  >
                    <item.icon 
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-4 mt-auto border-t border-gray-200">
              <button
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-gray-500" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Separador */}
          <div className="w-px h-6 bg-gray-200 lg:hidden" aria-hidden="true" />

          {/* Título de la página actual */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">
              {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          {/* Perfil de usuario */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="relative flex items-center">
              <Link
                to="/profile"
                className="flex items-center p-1.5 text-sm font-semibold text-gray-700 rounded-full bg-gray-50 hover:bg-gray-100"
              >
                <span className="hidden lg:block">Usuario</span>
                <span className="flex items-center justify-center w-8 h-8 ml-2 text-white bg-primary-600 rounded-full">
                  U
                </span>
              </Link>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
