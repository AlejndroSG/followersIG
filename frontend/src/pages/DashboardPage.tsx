import { useState } from 'react';
import { 
  ArrowUpIcon,
  ArrowDownIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  EyeIcon
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
  Legend
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        tension: 0.4
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
        borderColor: 'rgb(217, 70, 239)',
        backgroundColor: 'rgba(217, 70, 239, 0.5)',
        tension: 0.4
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
    },
    scales: {
      y: {
        beginAtZero: false,
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Análisis y estadísticas de tu cuenta @{accountData.username}
          </p>
        </div>
        <div>
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            Actualizado hace 2 horas
          </span>
        </div>
      </div>

      {/* Tarjetas de KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Seguidores */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-md">
                <UserGroupIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Seguidores</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{accountData.followers.toLocaleString()}</div>
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
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-purple-100 rounded-md">
                <HeartIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Engagement</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{accountData.engagement}%</div>
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
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-md">
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Publicaciones</dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">{accountData.posts}</div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {accountData.postsLastWeek} nuevas esta semana
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Impresiones */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-md">
                <EyeIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Impresiones</dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">
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
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Gráfico de seguidores */}
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Crecimiento de seguidores</h3>
          <div className="mt-2 h-64">
            <Line data={followersChartData} options={chartOptions} />
          </div>
        </div>

        {/* Gráfico de engagement */}
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Tasa de engagement</h3>
          <div className="mt-2 h-64">
            <Line data={engagementChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Hashtags más efectivos */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Hashtags más efectivos</h3>
          <div className="mt-4">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Hashtag
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Posts
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Engagement
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Acción</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topHashtags.map((hashtag) => (
                    <tr key={hashtag.tag}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                        {hashtag.tag}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{hashtag.posts.toLocaleString()}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{hashtag.engagement}%</td>
                      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                        <a href="#" className="text-primary-600 hover:text-primary-900">
                          Usar<span className="sr-only">, {hashtag.tag}</span>
                        </a>
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
      <div className="p-5 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recomendaciones personalizadas</h3>
        <ul className="mt-4 space-y-4">
          <li className="p-4 bg-blue-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Mejora tu engagement</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Publica a las 18:00 para maximizar la interacción con tus seguidores. Basado en tus últimas 20 publicaciones, este horario genera un 23% más de engagement.</p>
                </div>
              </div>
            </div>
          </li>
          <li className="p-4 bg-green-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Hashtags recomendados</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Prueba con #instagramtips, #instagramgrowth y #digitalmarketing para ampliar tu alcance. Estos hashtags son populares en tu nicho y tienen buen engagement.</p>
                </div>
              </div>
            </div>
          </li>
          <li className="p-4 bg-yellow-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Tendencia detectada</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Tus Reels generan un 45% más de impresiones que tus posts estáticos. Considera aumentar la frecuencia de contenido en video para mejorar tu alcance.</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
