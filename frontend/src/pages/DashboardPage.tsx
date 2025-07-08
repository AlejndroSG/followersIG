import { useState } from 'react';
import { 
  ArrowUpIcon,
  ArrowDownIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  EyeIcon,
  FireIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage() {
  // Estado para simular datos de la cuenta
  const [accountData] = useState({
    username: 'tuusuario',
    followers: 2547,
    followersChange: 126,
    followersChangePercent: 5.2,
    engagement: 8.4,
    engagementChange: 1.2,
    posts: 87,
    postsLastWeek: 3,
    likes: 12465,
    likesPerPost: 143,
    comments: 1874,
    commentsPerPost: 21,
    impressions: 45280,
    saved: 326
  });

  // Datos para el gráfico de seguidores
  const followersChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Seguidores',
        data: [2421, 2440, 2468, 2487, 2504, 2526, 2547],
        borderColor: 'rgb(124, 58, 237)',
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: 'rgb(124, 58, 237)',
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  // Datos para el gráfico de engagement
  const engagementChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Engagement (%)',
        data: [7.2, 7.5, 7.8, 8.0, 7.9, 8.2, 8.4],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: 'rgb(79, 70, 229)',
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  // Opciones comunes para los gráficos
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        bodyFont: {
          size: 12
        },
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        padding: 12,
        boxPadding: 6,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          }
        }
      }
    }
  };

  // Datos de los hashtags más efectivos
  const topHashtags = [
    { tag: '#instagram', posts: 1287, engagement: 9.7 },
    { tag: '#marketing', posts: 843, engagement: 8.9 },
    { tag: '#socialmedia', posts: 1532, engagement: 8.5 },
    { tag: '#growth', posts: 672, engagement: 8.2 },
    { tag: '#digital', posts: 945, engagement: 7.6 }
  ];

  return (
    <div className="space-y-8">
      {/* Encabezado del dashboard */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 text-transparent bg-clip-text">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Análisis y estadísticas de tu cuenta <span className="font-medium text-indigo-600">@{accountData.username}</span>
          </p>
        </div>
        <div>
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-800 bg-green-100 rounded-full shadow-sm">
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></span>
            Actualizado hace 2 horas
          </span>
        </div>
      </div>

      {/* Tarjetas de KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Seguidores */}
        <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-sm">
                <UserGroupIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Seguidores</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold text-gray-900">{accountData.followers.toLocaleString()}</div>
                      <div className="ml-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          accountData.followersChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {accountData.followersChange >= 0 ? (
                            <ArrowUpIcon className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownIcon className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(accountData.followersChangePercent)}%
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">vs. semana anterior</p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg shadow-sm">
                <HeartIcon className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Engagement</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold text-gray-900">{accountData.engagement}%</div>
                      <div className="ml-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          accountData.engagementChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {accountData.engagementChange >= 0 ? (
                            <ArrowUpIcon className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownIcon className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(accountData.engagementChange)}%
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">vs. semana anterior</p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Publicaciones */}
        <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm">
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Publicaciones</dt>
                  <dd>
                    <div className="text-2xl font-bold text-gray-900">{accountData.posts}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {accountData.postsLastWeek > 0 ? (
                          <span className="text-green-600 font-medium">{accountData.postsLastWeek} nuevas</span>
                        ) : 'Sin publicaciones'} esta semana
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Impresiones */}
        <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg shadow-sm">
                <EyeIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Impresiones</dt>
                  <dd>
                    <div className="text-2xl font-bold text-gray-900">
                      {accountData.impressions.toLocaleString()}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {Math.round(accountData.impressions / accountData.posts).toLocaleString()} por publicación
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Gráfico de seguidores */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Crecimiento de seguidores</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <ArrowUpIcon className="w-3 h-3 mr-1" /> {accountData.followersChangePercent}% esta semana
            </span>
          </div>
          <div className="mt-3 h-64">
            <Line data={followersChartData} options={chartOptions} />
          </div>
        </div>

        {/* Gráfico de engagement */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Tasa de engagement</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              <ArrowUpIcon className="w-3 h-3 mr-1" /> {accountData.engagementChange}% esta semana
            </span>
          </div>
          <div className="mt-3 h-64">
            <Line data={engagementChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Hashtags más efectivos */}
      <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Hashtags más efectivos</h3>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
              Ver todos
            </button>
          </div>
          <div className="mt-2 -mx-6">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Hashtag
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Posts
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Engagement
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-6">
                      <span className="sr-only">Acción</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topHashtags.map((hashtag, index) => (
                    <tr key={hashtag.tag} className="transition-colors hover:bg-gray-50">
                      <td className="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 w-2 h-2 rounded-full mr-3 ${
                            index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-indigo-500' : 'bg-blue-400'
                          }`}></div>
                          {hashtag.tag}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{hashtag.posts.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {hashtag.engagement}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button className="text-purple-600 hover:text-purple-900 transition-colors">
                          Usar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recomendaciones personalizadas</h3>
          <span className="inline-block px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
            3 nuevas
          </span>
        </div>
        <ul className="mt-4 space-y-4">
          <li className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <LightBulbIcon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Mejora tu engagement</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Publica a las <span className="font-semibold">18:00</span> para maximizar la interacción con tus seguidores. Basado en tus últimas 20 publicaciones, este horario genera un <span className="font-semibold">23% más de engagement</span>.</p>
                </div>
                <div className="mt-3">
                  <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors">
                    Programar publicación
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <FireIcon className="w-5 h-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Hashtags recomendados</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Prueba con <span className="font-semibold">#instagramtips</span>, <span className="font-semibold">#instagramgrowth</span> y <span className="font-semibold">#digitalmarketing</span> para ampliar tu alcance. Estos hashtags son populares en tu nicho y tienen buen engagement.</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-green-700 border border-green-300">
                    #instagramtips
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-green-700 border border-green-300">
                    #instagramgrowth
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-green-700 border border-green-300">
                    #digitalmarketing
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="p-4 bg-gradient-to-r from-yellow-50 to-amber-100 rounded-lg border border-yellow-200 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Tendencia detectada</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>Tus <span className="font-semibold">Reels generan un 45% más de impresiones</span> que tus posts estáticos. Considera aumentar la frecuencia de contenido en video para mejorar tu alcance.</p>
                </div>
                <div className="mt-3">
                  <button className="inline-flex items-center px-3 py-1.5 border border-amber-300 text-xs font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50 transition-colors">
                    Ver análisis de Reels
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
