import { useState } from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Strategy {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeRequired: string;
  impact: 'low' | 'medium' | 'high';
  steps: string[];
  isActive: boolean;
}

export default function StrategyPage() {
  // Estado para las estrategias
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      title: 'Calendario de contenido optimizado',
      description: 'Establece un calendario de publicaciones consistente basado en las horas de mayor engagement de tu audiencia.',
      difficulty: 'medium',
      timeRequired: '2-3 horas iniciales + 30 min diarios',
      impact: 'high',
      steps: [
        'Analizar las estadísticas de engagement por hora y día',
        'Crear un calendario semanal de publicaciones',
        'Preparar contenido con anticipación',
        'Publicar consistentemente en los horarios establecidos',
        'Revisar y ajustar según resultados'
      ],
      isActive: true
    },
    {
      id: '2',
      title: 'Estrategia de hashtags por nicho',
      description: 'Utiliza combinaciones estratégicas de hashtags populares, de nicho y específicos para maximizar tu alcance.',
      difficulty: 'easy',
      timeRequired: '1-2 horas semanales',
      impact: 'medium',
      steps: [
        'Investigar hashtags populares en tu nicho',
        'Crear 3-5 grupos de hashtags para rotar',
        'Combinar hashtags populares (>500k posts) con hashtags de nicho (50k-500k)',
        'Incluir 1-2 hashtags únicos o de marca',
        'Analizar rendimiento y ajustar semanalmente'
      ],
      isActive: false
    },
    {
      id: '3',
      title: 'Colaboraciones estratégicas',
      description: 'Identifica y colabora con creadores e influencers relevantes para expandir tu alcance a nuevas audiencias.',
      difficulty: 'hard',
      timeRequired: 'Proceso continuo, 3-5 horas semanales',
      impact: 'high',
      steps: [
        'Identificar 10-20 creadores de contenido con audiencias similares',
        'Establecer relaciones genuinas interactuando con su contenido',
        'Proponer colaboraciones de valor mutuo',
        'Crear contenido colaborativo',
        'Promover el contenido en ambas audiencias',
        'Medir resultados y mantener relaciones'
      ],
      isActive: false
    },
    {
      id: '4',
      title: 'Optimización de biografía y perfil',
      description: 'Mejora tu biografía, foto de perfil y destacados para aumentar la tasa de conversión de visitantes a seguidores.',
      difficulty: 'easy',
      timeRequired: '1-2 horas',
      impact: 'medium',
      steps: [
        'Crear una biografía clara y atractiva con palabras clave',
        'Incluir un call-to-action efectivo',
        'Optimizar la foto de perfil para reconocimiento instantáneo',
        'Organizar destacados con portadas coherentes',
        'Añadir enlace estratégico o página de enlaces'
      ],
      isActive: false
    },
    {
      id: '5',
      title: 'Campaña de engagement recíproco',
      description: 'Aumenta tu engagement interactuando de manera genuina y estratégica con cuentas relevantes en tu nicho.',
      difficulty: 'medium',
      timeRequired: '30-60 minutos diarios',
      impact: 'high',
      steps: [
        'Identificar 50-100 cuentas relevantes en tu nicho',
        'Interactuar diariamente con sus contenidos recientes',
        'Dejar comentarios significativos (más de 4 palabras)',
        'Responder a historias y fomentar conversaciones',
        'Mantener constancia y autenticidad'
      ],
      isActive: false
    }
  ]);

  const [customStrategyForm, setCustomStrategyForm] = useState({
    isOpen: false,
    title: '',
    description: '',
    steps: [''],
    difficulty: 'medium' as Strategy['difficulty'],
    impact: 'medium' as Strategy['impact']
  });

  // Función para cambiar el estado activo de una estrategia
  const toggleStrategyActive = (id: string) => {
    setStrategies(
      strategies.map(strategy => 
        strategy.id === id 
          ? { ...strategy, isActive: !strategy.isActive } 
          : strategy
      )
    );
  };

  // Función para añadir un paso al formulario de estrategia personalizada
  const addStep = () => {
    setCustomStrategyForm({
      ...customStrategyForm,
      steps: [...customStrategyForm.steps, '']
    });
  };

  // Función para cambiar un paso en el formulario
  const changeStep = (index: number, value: string) => {
    const newSteps = [...customStrategyForm.steps];
    newSteps[index] = value;
    setCustomStrategyForm({
      ...customStrategyForm,
      steps: newSteps
    });
  };

  // Función para eliminar un paso del formulario
  const removeStep = (index: number) => {
    if (customStrategyForm.steps.length > 1) {
      const newSteps = [...customStrategyForm.steps];
      newSteps.splice(index, 1);
      setCustomStrategyForm({
        ...customStrategyForm,
        steps: newSteps
      });
    }
  };

  // Función para añadir una estrategia personalizada
  const addCustomStrategy = () => {
    if (customStrategyForm.title.trim() === '' || customStrategyForm.description.trim() === '') {
      return;
    }

    const filteredSteps = customStrategyForm.steps.filter(step => step.trim() !== '');
    
    if (filteredSteps.length === 0) {
      return;
    }

    const newStrategy: Strategy = {
      id: `custom-${Date.now()}`,
      title: customStrategyForm.title,
      description: customStrategyForm.description,
      difficulty: customStrategyForm.difficulty,
      timeRequired: 'Personalizado',
      impact: customStrategyForm.impact,
      steps: filteredSteps,
      isActive: false
    };

    setStrategies([...strategies, newStrategy]);
    
    // Resetear el formulario
    setCustomStrategyForm({
      isOpen: false,
      title: '',
      description: '',
      steps: [''],
      difficulty: 'medium',
      impact: 'medium'
    });
  };

  // Devolver color según el nivel de dificultad
  const getDifficultyColor = (difficulty: Strategy['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Devolver color según el nivel de impacto
  const getImpactColor = (impact: Strategy['impact']) => {
    switch (impact) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-purple-100 text-purple-800';
      case 'high':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Estrategias de crecimiento</h2>
          <p className="mt-1 text-sm text-gray-500">
            Implementa estas estrategias para aumentar tus seguidores y engagement de forma orgánica.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCustomStrategyForm({ ...customStrategyForm, isOpen: !customStrategyForm.isOpen })}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          {customStrategyForm.isOpen ? 'Cancelar' : 'Crear estrategia'}
        </button>
      </div>

      {/* Formulario para estrategia personalizada */}
      {customStrategyForm.isOpen && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Crear estrategia personalizada
            </h3>
            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="strategy-title" className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  id="strategy-title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Título de la estrategia"
                  value={customStrategyForm.title}
                  onChange={(e) => setCustomStrategyForm({ ...customStrategyForm, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="strategy-description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="strategy-description"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Describe brevemente en qué consiste esta estrategia"
                  value={customStrategyForm.description}
                  onChange={(e) => setCustomStrategyForm({ ...customStrategyForm, description: e.target.value })}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="strategy-difficulty" className="block text-sm font-medium text-gray-700">
                    Dificultad
                  </label>
                  <select
                    id="strategy-difficulty"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={customStrategyForm.difficulty}
                    onChange={(e) => setCustomStrategyForm({ ...customStrategyForm, difficulty: e.target.value as Strategy['difficulty'] })}
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Media</option>
                    <option value="hard">Difícil</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="strategy-impact" className="block text-sm font-medium text-gray-700">
                    Impacto estimado
                  </label>
                  <select
                    id="strategy-impact"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={customStrategyForm.impact}
                    onChange={(e) => setCustomStrategyForm({ ...customStrategyForm, impact: e.target.value as Strategy['impact'] })}
                  >
                    <option value="low">Bajo</option>
                    <option value="medium">Medio</option>
                    <option value="high">Alto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pasos a seguir
                </label>
                <div className="mt-2 space-y-2">
                  {customStrategyForm.steps.map((step, index) => (
                    <div key={index} className="flex">
                      <input
                        type="text"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder={`Paso ${index + 1}`}
                        value={step}
                        onChange={(e) => changeStep(index, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="ml-2 inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addStep}
                  className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  + Añadir paso
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addCustomStrategy}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Guardar estrategia
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de estrategias */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {strategies.map((strategy) => (
            <li key={strategy.id}>
              <div className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-primary-600 truncate">{strategy.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(strategy.difficulty)}`}>
                          {strategy.difficulty === 'easy' ? 'Fácil' : strategy.difficulty === 'medium' ? 'Media' : 'Difícil'}
                        </p>
                        <p className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getImpactColor(strategy.impact)}`}>
                          Impacto {strategy.impact === 'low' ? 'bajo' : strategy.impact === 'medium' ? 'medio' : 'alto'}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <button
                        onClick={() => toggleStrategyActive(strategy.id)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-md ${
                          strategy.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {strategy.isActive ? 'Activa' : 'Inactiva'}
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {strategy.timeRequired}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{strategy.description}</p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-500">Pasos a seguir:</h4>
                      <ul className="mt-2 space-y-2">
                        {strategy.steps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 text-green-500">
                              <CheckCircleIcon className="h-5 w-5" />
                            </span>
                            <p className="ml-2 text-sm text-gray-500">{step}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de recursos */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recursos adicionales
          </h3>
          <div className="mt-4 max-w-xl text-sm text-gray-500">
            <p>
              Explora estos recursos para profundizar en tus estrategias de crecimiento de Instagram.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
              <h4 className="text-sm font-medium text-gray-900">Guía de hashtags 2025</h4>
              <p className="mt-1 text-sm text-gray-500">Documento PDF con estrategias actualizadas de hashtags para maximizar el alcance.</p>
              <a href="#" className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-500">Descargar guía →</a>
            </div>
            <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
              <h4 className="text-sm font-medium text-gray-900">Webinar: Engagement orgánico</h4>
              <p className="mt-1 text-sm text-gray-500">Webinar grabado sobre técnicas avanzadas para aumentar el engagement sin publicidad.</p>
              <a href="#" className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-500">Ver webinar →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
