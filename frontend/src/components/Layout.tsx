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

// Utilidad para combinar nombres de clase
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

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
  
  // Determinar la ruta activa
  const isPathActive = (path: string): boolean => {
    return location.pathname === path;
  };

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
                  <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-purple-600 to-indigo-600">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <circle cx="12" cy="12" r="4"></circle>
                          <circle cx="18" cy="6" r="1.5"></circle>
                        </svg>
                      </div>
                      <span className="ml-3 text-xl font-bold text-white tracking-wide">FollowersIG</span>
                    </div>
                    <button
                      type="button"
                      className="text-white hover:text-gray-200 transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex flex-col flex-1 p-4 space-y-2 bg-gray-50">
                    {navigation.map((item) => {
                      const isActive = isPathActive(item.href);
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isActive
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                              : 'text-gray-700 hover:text-purple-700 hover:bg-white hover:shadow-md',
                            'flex items-center gap-x-3 rounded-xl p-3 font-medium transition-all duration-200'
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <div className={classNames(
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200',
                            'flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200'
                          )}>
                            <item.icon className="h-5 w-5 shrink-0" />
                          </div>
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                    <div className="pt-4 mt-auto">
                      <button
                        className="flex items-center w-full p-3 text-gray-700 rounded-xl hover:bg-white hover:shadow-md hover:text-purple-700 transition-all duration-200"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-lg">
                          <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        </div>
                        <span className="ml-3 font-medium">Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Sidebar estático para escritorio */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 shadow-xl">
          <div className="flex items-center h-16 px-6 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="18" cy="6" r="1.5"></circle>
              </svg>
            </div>
            <span className="ml-3 text-xl font-bold text-white tracking-wide">FollowersIG</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto bg-white">
            <nav className="flex-1 p-6 space-y-3">
              {navigation.map((item) => {
                const isActive = isPathActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-purple-700 hover:bg-white hover:shadow-md',
                      'flex items-center gap-x-3 rounded-xl p-3 font-medium transition-all duration-200'
                    )}
                  >
                    <div className={classNames(
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200',
                      'flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200'
                    )}>
                      <item.icon className="h-5 w-5 shrink-0" />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-6 mt-auto border-t border-gray-100">
              <button
                className="flex items-center w-full p-3 text-gray-700 rounded-xl hover:bg-white hover:shadow-md hover:text-purple-700 transition-all duration-200"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-lg">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </div>
                <span className="ml-3 font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white shadow-md shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="p-2 text-gray-700 rounded-md hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Título de la página actual */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">
              {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          {/* Perfil de usuario */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Link
              to="/profile"
              className="flex items-center p-1 text-sm font-semibold text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="hidden lg:block mr-2">Usuario</span>
              <div className="flex items-center justify-center w-8 h-8 text-white bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-sm">
                <span>U</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Contenido de la página */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
