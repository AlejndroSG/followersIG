import { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsPage() {
  // Estado para los datos de análisis
  const [timeRange, setTimeRange] = useState('7d');

  // Datos para el gráfico de alcance por tipo de contenido
  const reachChartData = {
    labels: ['Posts', 'Stories', 'Reels', 'IGTV'],
    datasets: [
      {
        label: 'Alcance',
        data: [15420, 12340, 27800, 8450],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para la distribución de fuentes de seguidores
  const followerSourceData = {
    labels: ['Hashtags', 'Explorar', 'Sugeridos', 'Directos', 'Menciones'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de engagement por hora del día
  const hourlyEngagementData = {
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am', '3am'],
    datasets: [
      {
        label: 'Tasa de engagement (%)',
        data: [3.2, 4.5, 5.8, 6.2, 8.4, 9.1, 6.5, 3.7],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones para los gráficos
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  // Lista de los posts con mejor rendimiento
  const topPosts = [
    {
      id: 'post1',
      thumbnail: 'https://via.placeholder.com/150',
      caption: '¡Nuevo tutorial disponible! Aprende cómo optimizar tus hashtags...',
      likes: 872,
      comments: 145,
      saved: 324,
      reach: 15420,
      date: '2025-06-30',
    },
    {
      id: 'post2',
      thumbnail: 'https://via.placeholder.com/150',
      caption: '5 consejos esenciales para hacer crecer tu cuenta de Instagram...',
      likes: 756,
      comments: 98,
      saved: 289,
      reach: 12890,
      date: '2025-06-25',
    },
    {
      id: 'post3',
      thumbnail: 'https://via.placeholder.com/150',
      caption: 'Los errores más comunes que debes evitar en Instagram...',
      likes: 643,
      comments: 87,
      saved: 246,
      reach: 11320,
      date: '2025-06-20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Selector de rango de tiempo */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Análisis detallado</h2>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              timeRange === '7d' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('7d')}
          >
            7 días
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === '30d' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('30d')}
          >
            30 días
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeRange === '90d' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setTimeRange('90d')}
          >
            90 días
          </button>
        </div>
      </div>

      {/* Tarjetas de métricas clave */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500 truncate">Total alcance</dt>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +12.3%
              </div>
            </div>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">64,010</dd>
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                vs. 57,000 periodo anterior
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500 truncate">Nuevos seguidores</dt>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +8.7%
              </div>
            </div>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">342</dd>
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                vs. 315 periodo anterior
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500 truncate">Engagement medio</dt>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +1.5%
              </div>
            </div>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">8.4%</dd>
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                vs. 6.9% periodo anterior
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500 truncate">Impresiones totales</dt>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +15.8%
              </div>
            </div>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">98,450</dd>
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                vs. 85,000 periodo anterior
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Alcance por tipo de contenido</h3>
          <div className="mt-5 h-64">
            <Bar data={reachChartData} options={barOptions} />
          </div>
        </div>

        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Fuentes de nuevos seguidores</h3>
          <div className="mt-5 h-64">
            <Doughnut data={followerSourceData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Engagement por hora del día */}
      <div className="p-5 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Engagement por hora del día</h3>
        <p className="mt-1 text-sm text-gray-500">
          Analiza las mejores horas para publicar basado en el engagement de tu audiencia.
        </p>
        <div className="mt-5 h-64">
          <Bar data={hourlyEngagementData} options={barOptions} />
        </div>
      </div>

      {/* Mejores publicaciones */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Publicaciones con mejor rendimiento</h3>
          <p className="mt-1 text-sm text-gray-500">
            Las publicaciones que han generado más engagement en el periodo seleccionado.
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {topPosts.map((post) => (
            <li key={post.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="w-16 h-16 rounded-md object-cover" src={post.thumbnail} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{post.caption}</p>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
                <div className="flex-shrink-0 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                      {post.saved}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {post.reach}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a href="#" className="text-primary-600 hover:text-primary-900">Ver</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
