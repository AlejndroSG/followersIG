require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { json, urlencoded } = require('express');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({
    message: 'FollowersIG API funcionando correctamente',
    status: 'online',
    version: '1.0.0'
  });
});

// Ruta para simular la API de formulario de Instagram
app.post('/api/instagram-signup', (req, res) => {
  try {
    // Aquí se procesarían y validarían los datos
    console.log('Datos recibidos del formulario:', req.body);
    
    // Simulamos una pequeña demora para imitar el procesamiento
    setTimeout(() => {
      res.status(201).json({
        success: true,
        message: 'Cuenta registrada con éxito',
        data: {
          id: Date.now(),
          ...req.body,
          createdAt: new Date().toISOString()
        }
      });
    }, 1000);
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud',
      error: error.message
    });
  }
});

// Ruta para simular datos del dashboard
app.get('/api/dashboard', (req, res) => {
  res.json({
    followers: {
      current: 2547,
      previous: 2320,
      growth: 9.8,
      data: [2320, 2345, 2370, 2410, 2450, 2495, 2547]
    },
    engagement: {
      rate: 4.2,
      previous: 3.8,
      growth: 10.5,
      data: [3.8, 3.9, 4.0, 3.9, 4.1, 4.0, 4.2]
    },
    hashtags: [
      { tag: "#fitness", reach: 12500, engagement: 5.2 },
      { tag: "#healthylife", reach: 8700, engagement: 4.8 },
      { tag: "#workout", reach: 10200, engagement: 4.5 },
      { tag: "#motivation", reach: 7800, engagement: 3.9 },
      { tag: "#gym", reach: 9500, engagement: 4.1 }
    ],
    recommendations: [
      "Publica contenido entre las 18:00 y 20:00 para maximizar engagement",
      "Aumenta la frecuencia de historias con encuestas para impulsar la interacción",
      "Los carruseles generan un 20% más de engagement que las publicaciones individuales",
      "Utiliza hashtags específicos de nicho para alcanzar audiencias más relevantes"
    ]
  });
});

// Ruta para simular datos de analytics
app.get('/api/analytics', (req, res) => {
  res.json({
    reach: {
      total: 45870,
      previous: 42300,
      growth: 8.4,
      bySource: {
        hashtags: 18350,
        explore: 12780,
        home: 8940,
        profile: 5800
      }
    },
    followers: {
      bySource: {
        posts: 40,
        explore: 25,
        stories: 20,
        reels: 15
      }
    },
    engagement: {
      byHour: [2.1, 2.3, 2.0, 1.8, 1.5, 1.7, 2.0, 2.5, 3.0, 3.2, 3.5, 3.8,
               4.1, 4.3, 4.0, 3.9, 3.7, 4.2, 4.5, 4.8, 4.2, 3.5, 2.8, 2.4]
    },
    topPosts: [
      {
        id: 'post1',
        image: 'https://via.placeholder.com/300',
        likes: 856,
        comments: 42,
        engagement: 5.2,
        date: '2023-07-15T10:30:00Z'
      },
      {
        id: 'post2',
        image: 'https://via.placeholder.com/300',
        likes: 721,
        comments: 38,
        engagement: 4.9,
        date: '2023-07-10T14:20:00Z'
      },
      {
        id: 'post3',
        image: 'https://via.placeholder.com/300',
        likes: 935,
        comments: 51,
        engagement: 5.5,
        date: '2023-07-05T18:45:00Z'
      },
      {
        id: 'post4',
        image: 'https://via.placeholder.com/300',
        likes: 682,
        comments: 32,
        engagement: 4.6,
        date: '2023-06-28T09:15:00Z'
      }
    ]
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Conexión a MongoDB (comentado hasta implementar con valores reales)
/*
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/followersig';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));
*/

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
