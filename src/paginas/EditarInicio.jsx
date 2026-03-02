import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import EditButton from '../componentes/EditButton';
import { useToast } from '../context/ToastContext';
import BotonesPublicar from '../componentes/BotonesPublicar';
import homeService from '../api/homeService';
import { uploadImage } from '../api/uploadService';
export default function EditarInicio() {
  // Editor de página de inicio
  const { success, error: toastError } = useToast();
  const context = useOutletContext();
  const idioma = context?.lang || 'es';
  const [modoEdicion, setModoEdicion] = useState(null); // null, 'carousel', 'productos', etc.
  const [elementoEditando, setElementoEditando] = useState(null);

  // Estado para el contenido editable
  const [contenido, setContenido] = useState({
    carousel: [
      {
        id: 1,
        titulo: { es: 'Colección Premium', en: 'Premium Collection' },
        subtitulo: { es: 'BOTAS DE LUJO HECHAS A MANO', en: 'LUXURY HANDMADE BOOTS' },
        boton: { es: 'DESCUBRE MÁS', en: 'DISCOVER MORE' },
        imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
      },
      {
        id: 2,
        titulo: { es: 'Elegancia Mexicana', en: 'Mexican Elegance' },
        subtitulo: { es: 'TRADICIÓN Y ESTILO', en: 'TRADITION AND STYLE' },
        boton: { es: 'DESCUBRE MÁS', en: 'DISCOVER MORE' },
        imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
      },
      {
        id: 3,
        titulo: { es: 'Botas Caborca', en: 'Caborca Boots' },
        subtitulo: { es: 'SOMOS LO QUE HACEMOS', en: 'WE ARE WHAT WE DO' },
        boton: { es: 'DESCUBRE MÁS', en: 'DISCOVER MORE' },
        imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
      }
    ],
    productosDestacados: {
      titulo: { es: 'Conoce nuestros nuevos estilos', en: 'Discover our new styles' },
      productos: []
    },
    arteCreacion: {
      badge: { es: 'ARTESANÍA MEXICANA', en: 'MEXICAN CRAFTSMANSHIP' },
      titulo: { es: 'El arte de la creación', en: 'The art of creation' },
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png',
      anosExperiencia: 40,
      features: [
        {
          id: 1,
          titulo: { es: 'Maestros Talabarteros', en: 'Master Leatherworkers' },
          descripcion: { es: 'Cada par es creado con pasión y dedicación por artesanos con décadas de experiencia.', en: 'Each pair is created with passion and dedication by artisans with decades of experience.' }
        },
        {
          id: 2,
          titulo: { es: 'Materiales Premium', en: 'Premium Materials' },
          descripcion: { es: 'Utilizamos los mejores materiales y técnicas tradicionales para garantizar calidad excepcional.', en: 'We use the best materials and traditional techniques to guarantee exceptional quality.' }
        },
        {
          id: 3,
          titulo: { es: 'Excelencia Garantizada', en: 'Guaranteed Excellence' },
          descripcion: { es: 'Nuestro compromiso con la excelencia nos ha convertido en líderes en calzado vaquero de lujo.', en: 'Our commitment to excellence has made us leaders in luxury cowboy footwear.' }
        }
      ],
      boton: { es: 'CONOCE NUESTRA HISTORIA', en: 'LEARN OUR STORY' },
      nota: { es: 'Calidad certificada', en: 'Certified quality' }
    },
    dondeComprar: {
      titulo: { es: '¿Dónde comprar?', en: 'Where to buy?' },
      descripcion: { es: 'Encuentra nuestras tiendas y distribuidores autorizados en todo México.', en: 'Find our stores and authorized distributors throughout Mexico.' },
      mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120615.72236587609!2d-99.2840989!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sCiudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx',
      boton: { es: 'VER TODOS LOS DISTRIBUIDORES', en: 'SEE ALL DISTRIBUTORS' },
      nota: { es: 'Conoce la ubicación y contacto de todos nuestros distribuidores autorizados', en: 'Know the location and contact of all our authorized distributors' }
    },
    distribuidoresAutorizados: {
      titulo: { es: 'Distribuidores Autorizados', en: 'Authorized Distributors' },
      subtitulo: { es: 'Encuentra nuestras colecciones exclusivas', en: 'Find our exclusive collections' },
      boton: { es: 'VER TODOS LOS DISTRIBUIDORES', en: 'SEE ALL DISTRIBUTORS' },
      distribuidores: [
        { id: 1, imagen: 'https://blocks.astratic.com/img/general-img-landscape.png' },
        { id: 2, imagen: 'https://blocks.astratic.com/img/general-img-landscape.png' },
        { id: 3, imagen: 'https://blocks.astratic.com/img/general-img-landscape.png' },
        { id: 4, imagen: 'https://blocks.astratic.com/img/general-img-landscape.png' }
      ]
    },
    sustentabilidadBanner: {
      imagenIzquierda: 'https://blocks.astratic.com/img/general-img-landscape.png',
      badge: { es: 'COMPROMISO AMBIENTAL', en: 'ENVIRONMENTAL COMMITMENT' },
      tituloIzquierdo: { es: 'Sustentabilidad', en: 'Sustainability' },
      descripcionIzquierdo: {
        es: 'Nos comprometemos con el medio ambiente, utilizando procesos responsables y materiales sostenibles en cada etapa de producción.',
        en: 'We are committed to the environment, using responsible processes and sustainable materials at every stage of production.'
      },
      tituloDerecho: { es: 'Nuestro compromiso con el planeta', en: 'Our commitment to the planet' },
      features: [
        { id: 1, titulo: { es: 'Materiales Sostenibles', en: 'Sustainable Materials' } },
        { id: 2, titulo: { es: 'Reciclaje Responsable', en: 'Responsible Recycling' } },
        { id: 3, titulo: { es: 'Reducción de Huella', en: 'Reduced Footprint' } },
        { id: 4, titulo: { es: 'Producción Ética', en: 'Ethical Production' } }
      ],
      boton: { es: 'Conoce más', en: 'Learn more' },
      nota: { es: 'Certificado por prácticas sustentables', en: 'Certified for sustainable practices' }
    },
    formDistribuidor: {
      titulo: { es: '¿Quieres ser distribuidor?', en: 'Want to be a distributor?' },
      subtitulo: { es: 'Únete a nuestra red', en: 'Join our network' },
      descripcion: { es: 'Únete a nuestra red de distribuidores y forma parte de la familia Caborca.', en: 'Join our network of distributors and become part of the Caborca family.' },
      mensaje: { es: 'Si estás interesado, déjanos tus datos y nuestro equipo se pondrá en contacto contigo.', en: 'If you are interested, leave us your information and our team will contact you.' },
      boton: { es: 'ENVIAR SOLICITUD', en: 'SUBMIT REQUEST' },
      notaTiempo: { es: 'Respuesta en 24-48 hrs', en: 'Response in 24-48 hrs' },
      statDistribuidores: '+500',
      statEstados: '20+'
    },
    responsabilidadAmbiental: {
      titulo: { es: 'Nuestra Responsabilidad Ambiental', en: 'Our Environmental Responsibility' },
      descripcion: {
        es: 'En Botas Caborca nos comprometemos con el medio ambiente, implementando prácticas sostenibles en toda nuestra cadena de producción.',
        en: 'At Botas Caborca we are committed to the environment, implementing sustainable practices throughout our production chain.'
      },
      features: [
        { id: 1, titulo: { es: 'Uso eficiente de recursos naturales', en: 'Efficient use of natural resources' } },
        { id: 2, titulo: { es: 'Reducción de residuos', en: 'Waste reduction' } },
        { id: 3, titulo: { es: 'Procesos de producción limpia', en: 'Clean production processes' } },
        { id: 4, titulo: { es: 'Compromiso con la comunidad', en: 'Commitment to the community' } }
      ],
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png',
      cta: { es: 'Conoce Más', en: 'Learn More' },
      nota: { es: '40+ años de tradición', en: '40+ years of tradition' }
    }
  });

  // Cargar contenido desde la API al iniciar
  const cargarDatos = async () => {
    try {
      const data = await homeService.getHomeContent();

      if (!data || (!data.carousel?.length && !data.formDistribuidor)) return;

      setContenido(prev => ({
        ...prev,

        // 1. Carousel
        carousel: data.carousel?.length > 0 ? data.carousel.map(c => ({
          id: c.id,
          titulo: { es: c.titulo_ES, en: c.titulo_EN },
          subtitulo: { es: c.subtitulo_ES, en: c.subtitulo_EN },
          boton: { es: c.textoBoton_ES, en: c.textoBoton_EN },
          link: c.linkBoton,
          imagen: c.imagenUrl
        })) : prev.carousel,

        // 2. Formulario Distribuidor
        formDistribuidor: {
          ...prev.formDistribuidor,
          titulo: { es: data.formDistribuidor?.titulo_ES || prev.formDistribuidor.titulo.es, en: data.formDistribuidor?.titulo_EN || prev.formDistribuidor.titulo.en },
          descripcion: { es: data.formDistribuidor?.descripcion_ES || prev.formDistribuidor.descripcion.es, en: data.formDistribuidor?.descripcion_EN || prev.formDistribuidor.descripcion.en },
          boton: { es: data.formDistribuidor?.textoBoton_ES || prev.formDistribuidor.boton.es, en: data.formDistribuidor?.textoBoton_EN || prev.formDistribuidor.boton.en }
        },

        // 3. Sustentabilidad
        sustentabilidadBanner: {
          ...prev.sustentabilidadBanner,
          tituloIzquierdo: { es: data.sustentabilidad?.titulo_ES || prev.sustentabilidadBanner.tituloIzquierdo.es, en: data.sustentabilidad?.titulo_EN || prev.sustentabilidadBanner.tituloIzquierdo.en },
          descripcionIzquierdo: { es: data.sustentabilidad?.descripcion_ES || prev.sustentabilidadBanner.descripcionIzquierdo.es, en: data.sustentabilidad?.descripcion_EN || prev.sustentabilidadBanner.descripcionIzquierdo.en },
          boton: { es: data.sustentabilidad?.textoBoton_ES || prev.sustentabilidadBanner.boton.es, en: data.sustentabilidad?.textoBoton_EN || prev.sustentabilidadBanner.boton.en },
          imagenIzquierda: data.sustentabilidad?.imagenUrl || prev.sustentabilidadBanner.imagenIzquierda,
          badge: { es: data.sustentabilidad?.badge_ES || prev.sustentabilidadBanner.badge.es, en: data.sustentabilidad?.badge_EN || prev.sustentabilidadBanner.badge.en },
          tituloDerecho: { es: data.sustentabilidad?.tituloDerecho_ES || prev.sustentabilidadBanner.tituloDerecho.es, en: data.sustentabilidad?.tituloDerecho_EN || prev.sustentabilidadBanner.tituloDerecho.en },
          nota: { es: data.sustentabilidad?.notaCertificacion_ES || prev.sustentabilidadBanner.nota?.es, en: data.sustentabilidad?.notaCertificacion_EN || prev.sustentabilidadBanner.nota?.en },
          features: data.sustentabilidad?.features?.length > 0
            ? data.sustentabilidad.features.map(f => ({
              id: Math.random(),
              titulo: { es: f.titulo_ES, en: f.titulo_EN }
            }))
            : prev.sustentabilidadBanner.features
        },

        // 4. Arte de la Creación
        arteCreacion: data.arteCreacion?.titulo_ES ? {
          ...prev.arteCreacion,
          badge: { es: data.arteCreacion.badge_ES || prev.arteCreacion.badge.es, en: data.arteCreacion.badge_EN || prev.arteCreacion.badge.en },
          titulo: { es: data.arteCreacion.titulo_ES, en: data.arteCreacion.titulo_EN },
          anosExperiencia: data.arteCreacion.anosExperiencia || prev.arteCreacion.anosExperiencia,
          imagen: data.arteCreacion.imagenUrl || prev.arteCreacion.imagen,
          boton: { es: data.arteCreacion.boton_ES || prev.arteCreacion.boton.es, en: data.arteCreacion.boton_EN || prev.arteCreacion.boton.en },
          nota: { es: data.arteCreacion.nota_ES || prev.arteCreacion.nota?.es, en: data.arteCreacion.nota_EN || prev.arteCreacion.nota?.en },
          features: data.arteCreacion.features?.length > 0
            ? data.arteCreacion.features.map(f => ({
              id: f.id || Math.random(),
              titulo: { es: f.titulo_ES, en: f.titulo_EN },
              descripcion: { es: f.descripcion_ES, en: f.descripcion_EN }
            }))
            : prev.arteCreacion.features
        } : prev.arteCreacion,

        // 5. Distribuidores Logos
        distribuidoresAutorizados: data.distribuidoresLogos?.titulo_ES ? {
          ...prev.distribuidoresAutorizados,
          titulo: { es: data.distribuidoresLogos.titulo_ES, en: data.distribuidoresLogos.titulo_EN },
          subtitulo: { es: data.distribuidoresLogos.subtitulo_ES || prev.distribuidoresAutorizados.subtitulo.es, en: data.distribuidoresLogos.subtitulo_EN || prev.distribuidoresAutorizados.subtitulo.en },
          boton: { es: data.distribuidoresLogos.textoBoton_ES || prev.distribuidoresAutorizados.boton.es, en: data.distribuidoresLogos.textoBoton_EN || prev.distribuidoresAutorizados.boton.en },
          distribuidores: data.distribuidoresLogos.logos?.length > 0
            ? data.distribuidoresLogos.logos.map(l => ({ id: l.id, imagen: l.imagenUrl }))
            : prev.distribuidoresAutorizados.distribuidores
        } : prev.distribuidoresAutorizados,

        // 6. Dónde Comprar
        dondeComprar: data.dondeComprar?.titulo_ES ? {
          ...prev.dondeComprar,
          titulo: { es: data.dondeComprar.titulo_ES, en: data.dondeComprar.titulo_EN },
          descripcion: { es: data.dondeComprar.descripcion_ES, en: data.dondeComprar.descripcion_EN },
          boton: { es: data.dondeComprar.textoBoton_ES, en: data.dondeComprar.textoBoton_EN },
          mapaUrl: data.dondeComprar.mapaUrl || prev.dondeComprar.mapaUrl,
          nota: { es: data.dondeComprar.nota_ES || prev.dondeComprar.nota.es, en: data.dondeComprar.nota_EN || prev.dondeComprar.nota.en }
        } : prev.dondeComprar,

        // 7. Productos Destacados
        productosDestacados: {
          ...prev.productosDestacados,
          titulo: { es: data.productosDestacados?.titulo_ES || prev.productosDestacados.titulo.es, en: data.productosDestacados?.titulo_EN || prev.productosDestacados.titulo.en }
        }
      }));
    } catch (err) {
      toastError('Error al cargar datos del servidor');
      console.error(err);
    }
  };

  // Ejecutar carga al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [slideActual, setSlideActual] = useState(0);
  const [slideDistribuidores, setSlideDistribuidores] = useState(0);
  const [guardando, setGuardando] = useState(false);
  const inputFileRef = useRef(null);

  // Auto-play for Distributors Carousel
  useEffect(() => {
    if (contenido.distribuidoresAutorizados.distribuidores.length <= 4) return;

    const interval = setInterval(() => {
      setSlideDistribuidores(prev => {
        const total = contenido.distribuidoresAutorizados.distribuidores.length;
        return (prev + 1) % total;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [contenido.distribuidoresAutorizados.distribuidores.length]);

  // Escuchar eventos globales para abrir el modal de edición por sección
  useEffect(() => {
    const handler = (e) => {
      const id = e && e.detail && e.detail.sectionId;
      if (!id) return;
      const map = {
        'inicio-hero': 'carousel',
        'inicio-productos': 'productos-titulo',
        'inicio-arte-creacion': 'arte-creacion',
        'inicio-distribuidores': 'distribuidores',
        'inicio-donde-comprar': 'donde-comprar',
        'inicio-sustentabilidad': 'sustentabilidad',
        'inicio-form-distribuidor': 'form-distribuidor',
      };
      const modo = map[id];
      if (modo) {
        if (modo === 'carousel') {
          abrirEdicion('carousel', 0);
        } else {
          abrirEdicion(modo);
        }
      } else {
        console.warn('No hay modal configurado para sección:', id);
      }
    };

    window.addEventListener('cms:edit-section', handler);
    return () => window.removeEventListener('cms:edit-section', handler);
  }, []);

  // Escuchar actualizaciones de catálogos para sincronizar productos destacados.
  useEffect(() => {
    const handlerProductos = (e) => {
      const lista = e && e.detail && e.detail.productos;
      if (!Array.isArray(lista)) return;
      const destacados = lista.map(p => ({
        id: `${p.origen || 'x'}-${p.id}`,
        nombre: { es: p.nombre, en: p.nombre },
        precio: p.precio,
        imagen: p.imagen,
        origen: p.origen
      }));
      setContenido(prev => ({
        ...prev,
        productosDestacados: {
          ...prev.productosDestacados,
          productos: destacados
        }
      }));
    };

    window.addEventListener('cms:productos:updated', handlerProductos);
    return () => window.removeEventListener('cms:productos:updated', handlerProductos);
  }, []);

  // Abrir modal de edición
  const abrirEdicion = (seccion, index = null) => {
    setModoEdicion(seccion);
    setElementoEditando(index);
  };

  const cerrarEdicion = () => {
    setModoEdicion(null);
    setElementoEditando(null);
  };

  // Función para manejar cambios en texto
  const manejarCambioTexto = (seccion, campo, valor) => {
    setContenido(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: {
          ...prev[seccion][campo],
          [idioma]: valor
        }
      }
    }));
  };

  // Función para manejar cambios en carousel
  const manejarCambioCarousel = (index, campo, valor) => {
    setContenido(prev => {
      const nuevoCarousel = [...prev.carousel];
      if (campo === 'imagen') {
        nuevoCarousel[index][campo] = valor;
      } else {
        nuevoCarousel[index][campo] = {
          ...nuevoCarousel[index][campo],
          [idioma]: valor
        };
      }
      return {
        ...prev,
        carousel: nuevoCarousel
      };
    });
  };

  // Función para manejar carga de imagen
  const manejarCargarImagen = async (e, tipo, index = null) => {
    const archivo = e.target.files[0];
    if (archivo) {
      try {
        const url = await uploadImage(archivo);
        if (tipo === 'carousel') {
          setContenido(prev => {
            const nuevos = [...prev.carousel];
            nuevos[index] = {
              ...nuevos[index],
              imagen: url,
              archivoImg: null
            };
            return { ...prev, carousel: nuevos };
          });
        } else if (tipo === 'producto') {
          manejarCambioProducto(index, 'imagen', url);
        } else if (tipo === 'arteCreacion') {
          setContenido(prev => ({
            ...prev,
            arteCreacion: {
              ...prev.arteCreacion,
              imagen: url,
              archivoImg: null
            }
          }));
        } else if (tipo === 'sustentabilidadBanner') {
          setContenido(prev => ({
            ...prev,
            sustentabilidadBanner: {
              ...prev.sustentabilidadBanner,
              imagenIzquierda: url,
              archivoIzquierda: null
            }
          }));
        } else if (tipo === 'distribuidor') {
          manejarCambioDistribuidor(index, 'imagen', url);
        }
      } catch (error) {
        toastError('No se pudo subir la imagen.');
      }
    }
  };

  const manejarCambioDistribuidor = (index, campo, valor) => {
    setContenido(prev => {
      const nuevos = [...prev.distribuidoresAutorizados.distribuidores];
      nuevos[index] = { ...nuevos[index], [campo]: valor };
      return {
        ...prev,
        distribuidoresAutorizados: {
          ...prev.distribuidoresAutorizados,
          distribuidores: nuevos
        }
      };
    });
  };

  const agregarDistribuidor = () => {
    setContenido(prev => {
      if (prev.distribuidoresAutorizados.distribuidores.length >= 10) {
        toastError('Has alcanzado el límite máximo de 10 distribuidores.');
        return prev;
      }
      const nuevoId = prev.distribuidoresAutorizados.distribuidores.length ? Math.max(...prev.distribuidoresAutorizados.distribuidores.map(d => d.id)) + 1 : 1;
      const nuevo = { id: nuevoId, imagen: 'https://blocks.astratic.com/img/general-img-landscape.png' };
      return {
        ...prev,
        distribuidoresAutorizados: {
          ...prev.distribuidoresAutorizados,
          distribuidores: [...prev.distribuidoresAutorizados.distribuidores, nuevo]
        }
      };
    });
  };

  const eliminarDistribuidor = (index) => {
    setContenido(prev => {
      const nuevos = prev.distribuidoresAutorizados.distribuidores.filter((_, i) => i !== index);
      return {
        ...prev,
        distribuidoresAutorizados: {
          ...prev.distribuidoresAutorizados,
          distribuidores: nuevos
        }
      };
    });
  };

  const manejarCargarMultiplesDistribuidores = async (e) => {
    const archivos = Array.from(e.target.files);
    const actuales = contenido.distribuidoresAutorizados.distribuidores.length;
    const disponibles = 10 - actuales;

    if (disponibles <= 0) {
      toastError('Has alcanzado el límite máximo de 10 distribuidores.');
      e.target.value = '';
      return;
    }

    const archivosParaCargar = archivos.slice(0, disponibles);
    if (archivos.length > disponibles) {
      toastError(`Solo se cargarán los primeros ${disponibles} archivos para no exceder el límite.`);
    }

    const promesas = archivosParaCargar.map(async (archivo) => {
      try {
        return await uploadImage(archivo);
      } catch (err) {
        return null;
      }
    });

    try {
      const resultadosBrutos = await Promise.all(promesas);
      const resultados = resultadosBrutos.filter(url => url !== null);

      setContenido(prev => {
        const maxId = prev.distribuidoresAutorizados.distribuidores.length
          ? Math.max(...prev.distribuidoresAutorizados.distribuidores.map(d => d.id))
          : 0;

        const nuevos = resultados.map((img, i) => ({
          id: maxId + i + 1,
          imagen: img
        }));

        return {
          ...prev,
          distribuidoresAutorizados: {
            ...prev.distribuidoresAutorizados,
            distribuidores: [...prev.distribuidoresAutorizados.distribuidores, ...nuevos]
          }
        };
      });
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
    }

    e.target.value = '';
  };

  const manejarCambioFeature = (seccion, index, campo, valor) => {
    setContenido(prev => {
      const features = [...prev[seccion].features];
      features[index] = {
        ...features[index],
        [campo]: {
          ...features[index][campo],
          [idioma]: valor
        }
      };
      return {
        ...prev,
        [seccion]: {
          ...prev[seccion],
          features
        }
      };
    });
  };

  const manejarCambioProducto = (index, campo, valor) => {
    setContenido(prev => {
      const nuevos = [...prev.productosDestacados.productos];
      if (campo === 'precio') {
        nuevos[index][campo] = parseFloat(valor) || 0;
      } else if (campo === 'imagen') {
        nuevos[index][campo] = valor;
      } else {
        nuevos[index][campo] = {
          ...nuevos[index][campo],
          [idioma]: valor
        };
      }
      return {
        ...prev,
        productosDestacados: {
          ...prev.productosDestacados,
          productos: nuevos
        }
      };
    });
  };

  // Agregar nuevo slide al carousel
  const agregarSlide = () => {
    setContenido(prev => {
      const nuevoId = prev.carousel.length ? Math.max(...prev.carousel.map(s => s.id)) + 1 : 1;
      const nuevoSlide = {
        id: nuevoId,
        titulo: { es: 'Nuevo Slide', en: 'New Slide' },
        subtitulo: { es: 'Descripción del slide', en: 'Slide description' },
        boton: { es: 'VER MÁS', en: 'SEE MORE' },
        imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
      };
      const nuevoCarousel = [...prev.carousel, nuevoSlide];
      setElementoEditando(nuevoCarousel.length - 1);
      setSlideActual(nuevoCarousel.length - 1);
      return { ...prev, carousel: nuevoCarousel };
    });
  };

  // Eliminar slide del carousel
  const eliminarSlide = (index) => {
    setContenido(prev => {
      if (prev.carousel.length <= 1) {
        toastError('Debe haber al menos un slide en el carousel');
        return prev;
      }
      const nuevoCarousel = prev.carousel.filter((_, i) => i !== index);
      const nuevoIndex = Math.max(0, Math.min(index, nuevoCarousel.length - 1));
      setElementoEditando(nuevoIndex);
      setSlideActual(nuevoIndex);
      return { ...prev, carousel: nuevoCarousel };
    });
  };

  // Guardar cambios en el backend
  const guardarCambios = async () => {
    setGuardando(true);
    try {
      // 1. Procesar Carousel (Subir imágenes nuevas)
      const carouselProcesado = await Promise.all(contenido.carousel.map(async (slide, index) => {
        let finalImageUrl = slide.imagen;

        // Si hay un archivo RAW nuevo cargado, lo subimos
        if (slide.archivoImg) {
          try {
            finalImageUrl = await uploadImage(slide.archivoImg);
          } catch (uploadError) {
            console.error("Error subiendo imagen slide " + index, uploadError);
            toastError(`Error al subir imagen del slide ${index + 1}. Se conservará la anterior.`);
            // Si falla, mantenemos la imagen anterior si no es base64 gigante, o dejamos string vacío
            if (finalImageUrl.startsWith('data:')) finalImageUrl = '';
          }
        }

        return {
          id: typeof slide.id === 'string' ? 0 : slide.id, // Si es string (temp id), enviar 0
          titulo_ES: slide.titulo.es,
          titulo_EN: slide.titulo.en,
          subtitulo_ES: slide.subtitulo.es,
          subtitulo_EN: slide.subtitulo.en,
          textoBoton_ES: slide.boton.es,
          textoBoton_EN: slide.boton.en,
          linkBoton: slide.link || '',
          imagenUrl: finalImageUrl,
          orden: index
        };
      }));

      // 2. Procesar Sustentabilidad (Subir imagen nueva)
      let sustImagenUrl = contenido.sustentabilidadBanner.imagenIzquierda;
      if (contenido.sustentabilidadBanner.archivoIzquierda) {
        try {
          sustImagenUrl = await uploadImage(contenido.sustentabilidadBanner.archivoIzquierda);
        } catch (uploadError) {
          console.error("Error subiendo imagen sustentabilidad", uploadError);
          toastError("Error al subir imagen de sustentabilidad.");
        }
      }

      // 3. Crear Payload Final con TODAS las secciones
      const payload = {
        carousel: carouselProcesado,

        // Formulario "¿Quieres ser distribuidor?"
        formDistribuidor: {
          titulo_ES: contenido.formDistribuidor.titulo.es,
          titulo_EN: contenido.formDistribuidor.titulo.en,
          descripcion_ES: contenido.formDistribuidor.descripcion.es,
          descripcion_EN: contenido.formDistribuidor.descripcion.en,
          textoBoton_ES: contenido.formDistribuidor.boton.es,
          textoBoton_EN: contenido.formDistribuidor.boton.en,
          notaTiempo_ES: contenido.formDistribuidor.notaTiempo?.es || 'Respuesta en 24-48 hrs',
          notaTiempo_EN: contenido.formDistribuidor.notaTiempo?.en || 'Response in 24-48 hrs',
          statDistribuidores: contenido.formDistribuidor.statDistribuidores || '+500',
          statEstados: contenido.formDistribuidor.statEstados || '20+',
          linkBoton: '/distribuidores',
          imagenUrl: ''
        },

        // Sección Sustentabilidad
        sustentabilidad: {
          titulo_ES: contenido.sustentabilidadBanner.tituloIzquierdo.es,
          titulo_EN: contenido.sustentabilidadBanner.tituloIzquierdo.en,
          descripcion_ES: contenido.sustentabilidadBanner.descripcionIzquierdo.es,
          descripcion_EN: contenido.sustentabilidadBanner.descripcionIzquierdo.en,
          textoBoton_ES: contenido.sustentabilidadBanner.boton.es,
          textoBoton_EN: contenido.sustentabilidadBanner.boton.en,
          linkBoton: '/responsabilidad-social',
          imagenUrl: sustImagenUrl,
          badge_ES: contenido.sustentabilidadBanner.badge?.es || 'COMPROMISO AMBIENTAL',
          badge_EN: contenido.sustentabilidadBanner.badge?.en || 'ENVIRONMENTAL COMMITMENT',
          tituloDerecho_ES: contenido.sustentabilidadBanner.tituloDerecho?.es || 'Nuestro compromiso con el planeta',
          tituloDerecho_EN: contenido.sustentabilidadBanner.tituloDerecho?.en || 'Our commitment to the planet',
          notaCertificacion_ES: contenido.sustentabilidadBanner.nota?.es || 'Certificado por prácticas sustentables',
          notaCertificacion_EN: contenido.sustentabilidadBanner.nota?.en || 'Certified for sustainable practices',
          features: (contenido.sustentabilidadBanner.features || []).map(f => ({
            titulo_ES: f.titulo.es,
            titulo_EN: f.titulo.en,
            descripcion_ES: '',
            descripcion_EN: ''
          }))
        },

        // Sección Arte de la Creación (Nosotros)
        arteCreacion: {
          badge_ES: contenido.arteCreacion.badge.es,
          badge_EN: contenido.arteCreacion.badge.en,
          titulo_ES: contenido.arteCreacion.titulo.es,
          titulo_EN: contenido.arteCreacion.titulo.en,
          anosExperiencia: contenido.arteCreacion.anosExperiencia,
          imagenUrl: contenido.arteCreacion.imagen || '',
          boton_ES: contenido.arteCreacion.boton.es,
          boton_EN: contenido.arteCreacion.boton.en,
          nota_ES: contenido.arteCreacion.nota?.es || '',
          nota_EN: contenido.arteCreacion.nota?.en || '',
          features: (contenido.arteCreacion.features || []).map(f => ({
            titulo_ES: f.titulo.es,
            titulo_EN: f.titulo.en,
            descripcion_ES: f.descripcion.es,
            descripcion_EN: f.descripcion.en
          }))
        },

        // Sección Logos Distribuidores Autorizados
        distribuidoresLogos: {
          titulo_ES: contenido.distribuidoresAutorizados.titulo.es,
          titulo_EN: contenido.distribuidoresAutorizados.titulo.en,
          subtitulo_ES: contenido.distribuidoresAutorizados.subtitulo.es,
          subtitulo_EN: contenido.distribuidoresAutorizados.subtitulo.en,
          textoBoton_ES: contenido.distribuidoresAutorizados.boton.es,
          textoBoton_EN: contenido.distribuidoresAutorizados.boton.en,
          logos: (contenido.distribuidoresAutorizados.distribuidores || []).map(d => ({
            id: d.id,
            imagenUrl: d.imagen || ''
          }))
        },

        // Sección Dónde Comprar
        dondeComprar: {
          titulo_ES: contenido.dondeComprar.titulo.es,
          titulo_EN: contenido.dondeComprar.titulo.en,
          descripcion_ES: contenido.dondeComprar.descripcion.es,
          descripcion_EN: contenido.dondeComprar.descripcion.en,
          textoBoton_ES: contenido.dondeComprar.boton.es,
          textoBoton_EN: contenido.dondeComprar.boton.en,
          mapaUrl: contenido.dondeComprar.mapaUrl || '',
          nota_ES: contenido.dondeComprar.nota?.es || '',
          nota_EN: contenido.dondeComprar.nota?.en || ''
        },

        // Sección Productos Destacados
        productosDestacados: {
          titulo_ES: contenido.productosDestacados.titulo?.es || '',
          titulo_EN: contenido.productosDestacados.titulo?.en || ''
        }
      };

      await homeService.updateHomeContent(payload);

      // Limpiar archivos temporales del estado para no re-subirlos
      setContenido(prev => ({
        ...prev,
        carousel: prev.carousel.map(s => {
          // Si acabamos de guardar, la "imagen" (preview) debería ser la nueva URL si queremos ser puristas,
          // pero dejar el base64 visualmente no daña nada hasta que recarguen.
          // Lo importante es quitar 'archivoImg'
          const { archivoImg, ...rest } = s;
          return rest;
        }),
        sustentabilidadBanner: {
          ...prev.sustentabilidadBanner,
          // Quitamos archivoIzquierda
          archivoIzquierda: undefined
        }
      }));

      success('Cambios guardados correctamente y archivos subidos.');
    } catch (err) {
      console.error(err);
      toastError('Error al guardar cambios');
    } finally {
      setGuardando(false);
    }
  };

  // Publicar cambios en el portafolio público (Guardar + Deploy)
  const [publicando, setPublicando] = useState(false);
  const publicarCambios = async () => {
    setPublicando(true);
    try {
      // 1. Primero guardar el borrador (reutilizamos la misma lógica de guardarCambios)
      await guardarCambios();
      // 2. Luego desplegar borrador → producción
      await homeService.deployContent();
      success('¡Cambios PUBLICADOS! El portafolio ya muestra los nuevos contenidos.');
    } catch (err) {
      console.error(err);
      toastError('Error al publicar cambios');
    } finally {
      setPublicando(false);
    }
  };
  return (
    <div className="relative min-h-screen bg-white pb-24">
      {/* Botones Flotantes mediante Portal */}
      <BotonesPublicar onGuardar={guardarCambios} />

      {/* Contenido principal con previsualización editable */}
      <div className="pb-10">
        {/* SECCIÓN CAROUSEL */}
        <section data-cms-section="inicio-hero" className="relative group min-h-screen">
          <div className="relative h-screen">
            <img
              src={contenido.carousel[slideActual].imagen}
              alt="Hero"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center text-white p-8">
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-12 max-w-4xl text-center">
                <h1 className="text-6xl font-playfair mb-6 drop-shadow-lg">
                  {contenido.carousel[slideActual].titulo[idioma]}
                </h1>
                <p className="text-2xl mb-8 drop-shadow">
                  {contenido.carousel[slideActual].subtitulo[idioma]}
                </p>
                <button className="bg-white text-caborca-cafe px-10 py-4 rounded-lg font-semibold text-lg shadow-xl">
                  {contenido.carousel[slideActual].boton[idioma]}
                </button>
              </div>
            </div>

            {/* Indicadores de slides */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {contenido.carousel.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSlideActual(index)}
                  className={`h-3 rounded-full transition-all ${index === slideActual ? 'w-12 bg-white' : 'w-3 bg-white/50'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Botón de edición flotante */}
          <EditButton section={`carousel:${slideActual}`} onOpen={() => abrirEdicion('carousel', slideActual)} className="absolute top-24 right-4 opacity-0 group-hover:opacity-100" title="Editar Carousel" />
        </section>

        {/* SECCIÓN PRODUCTOS */}
        <section data-cms-section="inicio-productos" className="relative group py-20 bg-gradient-to-b from-white to-caborca-beige-suave/30">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl font-playfair text-caborca-cafe text-center mb-16">
              {contenido.productosDestacados.titulo[idioma]}
            </h2>
            <div className="grid grid-cols-4 gap-8">
              {contenido.productosDestacados.productos.map((producto, i) => (
                <div key={producto.id} className="relative group/item">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre[idioma]}
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png';
                        }}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-sm font-bold text-caborca-cafe uppercase tracking-wide mb-2">
                        {producto.nombre[idioma]}
                      </p>
                      <p className="text-xl text-caborca-cafe font-semibold">
                        ${producto.precio.toLocaleString('es-MX')}
                      </p>
                    </div>
                  </div>

                  {/* tarjetas ahora solo muestran preview; edición individual deshabilitada */}
                </div>
              ))}
            </div>
          </div>

          {/* Botón de edición flotante */}
          <EditButton section="productos-titulo" onOpen={() => abrirEdicion('productos-titulo')} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100" />
        </section>

        {/* SECCIÓN EL ARTE DE LA CREACIÓN */}
        <section data-cms-section="inicio-arte-creacion" className="relative py-16 md:py-24 bg-[#F3EFEA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Botón de edición visible */}
            <EditButton section="arte-creacion" onOpen={() => abrirEdicion('arte-creacion')} className="absolute top-6 right-6 w-12 h-12 z-20" title="Editar Arte de la Creación" />

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Imagen izquierda */}
              <div className="order-2 md:order-1 relative">
                <div className="relative rounded-sm shadow-xl overflow-hidden bg-white p-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={contenido.arteCreacion.imagen}
                      alt="Arte"
                      className="w-full h-auto object-cover"
                      onError={(e) => { e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png'; }}
                    />
                  </div>
                </div>

                {/* Badge años estilo screenshot */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#EAE6DF] rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-[#F3EFEA] z-10">
                  <span className="text-3xl font-extrabold text-[#A68B6C] leading-none">{contenido.arteCreacion.anosExperiencia}+</span>
                  <span className="text-[10px] font-bold text-[#A68B6C] tracking-wider uppercase mt-1">AÑOS</span>
                </div>
              </div>

              {/* Contenido derecho */}
              <div className="order-1 md:order-2">
                <div className="mb-6">
                  <span className="inline-block bg-[#3E342B] text-white text-[10px] font-bold tracking-[0.2em] px-4 py-2 rounded-full uppercase">
                    {contenido.arteCreacion.badge[idioma]}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#A68B6C] mb-8 leading-tight">
                  {contenido.arteCreacion.titulo[idioma]}
                </h2>

                <div className="space-y-6 mb-10">
                  {contenido.arteCreacion.features.map((feature, i) => (
                    <div key={feature.id} className="flex items-start gap-4">
                      <div className="shrink-0 w-8 h-8 bg-[#A68B6C] rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#3E342B] text-lg mb-1">{feature.titulo[idioma]}</h4>
                        <p className="text-[#6B5E55] text-sm leading-relaxed">{feature.descripcion[idioma]}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a href="#" className="inline-flex items-center gap-2 bg-[#96836E] hover:bg-[#85725D] text-white font-bold tracking-widest text-xs px-8 py-4 rounded transition-colors uppercase shadow-md hover:shadow-lg">
                    <span>{contenido.arteCreacion.boton[idioma]}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <div className="flex items-center gap-2 text-[#96836E]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold tracking-wide uppercase">{contenido.arteCreacion.nota[idioma]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DISTRIBUIDORES AUTORIZADOS */}
        <section data-cms-section="inicio-distribuidores" className="relative py-20 bg-white group">
          <EditButton section="distribuidores" onOpen={() => abrirEdicion('distribuidores')} className="absolute top-6 right-6 w-12 h-12 z-20 opacity-0 group-hover:opacity-100" title="Editar Distribuidores" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe mb-4 font-bold">
                {contenido.distribuidoresAutorizados.titulo[idioma]}
              </h2>
              <p className="text-gray-500 text-lg uppercase tracking-wide">
                {contenido.distribuidoresAutorizados.subtitulo[idioma]}
              </p>

              {/* Categorías Visuales (Estáticas por ahora) */}
              <div className="flex justify-center gap-6 mt-8 mb-10 text-sm font-medium text-gray-400">
                <span className="text-caborca-cafe border-b-2 border-caborca-cafe pb-1 cursor-pointer">Todos</span>
                <span className="hover:text-caborca-cafe cursor-pointer transition-colors">Premium</span>
                <span className="hover:text-caborca-cafe cursor-pointer transition-colors">Nacionales</span>
                <span className="hover:text-caborca-cafe cursor-pointer transition-colors">Internacionales</span>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden mb-12 max-w-6xl mx-auto">
              {/* Fade Gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

              <div
                className="flex transition-transform duration-700 ease-linear"
                style={{
                  transform: `translateX(-${slideDistribuidores * (100 / (contenido.distribuidoresAutorizados.distribuidores.length > 4 ? 4 : contenido.distribuidoresAutorizados.distribuidores.length))}%)`
                }}
              >
                {[...contenido.distribuidoresAutorizados.distribuidores, ...contenido.distribuidoresAutorizados.distribuidores].map((distribuidor, idx) => (
                  <div key={`${distribuidor.id}-${idx}`} className="w-1/2 md:w-1/4 flex-shrink-0 p-4">
                    <div className="w-full h-32 flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-lg transition-all opacity-70 grayscale hover:grayscale-0 hover:opacity-100 duration-300">
                      <img
                        src={distribuidor.imagen}
                        alt={`Distribuidor ${distribuidor.id}`}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                        onError={(e) => { e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png'; }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button className="bg-[#A68B6C] text-white px-8 py-3 rounded hover:bg-[#8B735B] transition-colors uppercase tracking-widest text-xs font-bold shadow-md">
                {contenido.distribuidoresAutorizados.boton[idioma]}
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN ¿DÓNDE COMPRAR? */}
        <section data-cms-section="inicio-donde-comprar" className="relative group py-20 bg-gradient-to-b from-white to-caborca-beige-suave/30">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-playfair text-caborca-cafe mb-6">
                {contenido.dondeComprar.titulo[idioma]}
              </h2>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                {contenido.dondeComprar.descripcion[idioma]}
              </p>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl mb-10 border-4 border-caborca-beige-suave" style={{ height: '500px' }}>
              {contenido.dondeComprar.mapaUrl.includes('<iframe') ? (
                <div dangerouslySetInnerHTML={{ __html: contenido.dondeComprar.mapaUrl }} className="w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-center">
                    <div className="text-8xl mb-6 animate-pulse">🗺️</div>
                    <p className="text-lg font-semibold text-gray-500">Vista previa del mapa</p>
                    <p className="text-sm text-gray-400 mt-2">Google Maps se mostrará aquí</p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <button className="bg-caborca-cafe text-white px-12 py-5 rounded-lg hover:bg-caborca-negro transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 font-bold text-xl">
                {contenido.dondeComprar.boton[idioma]}
              </button>
              <p className="text-sm text-gray-500 mt-6 flex items-center justify-center">
                <span className="mr-2">📍</span>
                <span className="italic">{contenido.dondeComprar.nota[idioma]}</span>
              </p>
            </div>
          </div>

          {/* Botón de edición flotante */}
          <EditButton section="donde-comprar" onOpen={() => abrirEdicion('donde-comprar')} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100" />
        </section>

        {/* SECCIÓN BANNER SUSTENTABILIDAD (igual que Portafolio) */}
        <section data-cms-section="inicio-sustentabilidad" className="relative overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative h-100 md:h-125">
              <img src={contenido.sustentabilidadBanner.imagenIzquierda} alt="Sustentabilidad Caborca" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(155,134,116,0.8), rgba(0,0,0,0.4))' }} />
              <div className="absolute inset-0 flex items-center justify-center md:justify-start px-8 md:px-12">
                <div className="text-white max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold tracking-wider">{contenido.sustentabilidadBanner.badge[idioma]}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 leading-tight">{contenido.sustentabilidadBanner.tituloIzquierdo[idioma]}</h2>
                  <p className="text-base md:text-lg mb-6 text-gray-200 leading-relaxed">{contenido.sustentabilidadBanner.descripcionIzquierdo[idioma]}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="bg-linear-to-br from-caborca-beige-suave to-amber-50 p-8 md:p-12 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, #ECE7DF 0%, #F5EFE7 100%)' }}>
              <div className="max-w-lg mx-auto">
                <h3 className="text-xl md:text-2xl font-serif text-caborca-cafe mb-4 whitespace-nowrap overflow-hidden">{contenido.sustentabilidadBanner.tituloDerecho[idioma]}</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {contenido.sustentabilidadBanner.features.map((feature, i) => (
                    <div key={feature.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="text-caborca-cafe mb-2">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-caborca-cafe">{feature.titulo[idioma]}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a href="#" className="inline-flex items-center gap-2 bg-caborca-cafe text-white font-bold tracking-wider text-sm px-8 py-4 rounded-lg transition-all duration-300 shadow-lg group">
                    <span>{contenido.sustentabilidadBanner.boton[idioma]}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <div className="flex items-center gap-2 text-caborca-cafe text-sm">
                    <svg className="w-5 h-5 text-caborca-cafe" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{contenido.sustentabilidadBanner.nota[idioma]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de edición flotante (hover) */}
          <EditButton section="sustentabilidad" onOpen={() => abrirEdicion('sustentabilidad')} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 z-10" />

          {/* Botón de edición visible (pequeño cuadrado) */}
          <EditButton section="sustentabilidad" onOpen={() => abrirEdicion('sustentabilidad')} className="absolute top-6 right-6 w-12 h-12 z-20" title="Editar Sustentabilidad" />
        </section>

        {/* SECCIÓN FORMULARIO DISTRIBUIDOR (igual que Portafolio) */}
        <section data-cms-section="inicio-form-distribuidor" className="relative py-8 sm:py-10" style={{ backgroundColor: '#ECE7DF' }}>
          {/* Botón de edición visible (arriba derecha del título) */}
          <EditButton section="form-distribuidor" onOpen={() => abrirEdicion('form-distribuidor')} className="absolute top-6 right-6 w-12 h-12 z-20" title="Editar Formulario Distribuidor" />
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-5">
                <h2 className="text-2xl sm:text-3xl font-serif mb-2 text-caborca-cafe">{contenido.formDistribuidor.titulo[idioma]}</h2>
                <p className="text-caborca-cafe text-sm sm:text-base">{contenido.formDistribuidor.descripcion[idioma]}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <form className="space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-caborca-cafe mb-1">Nombre completo</label>
                      <input type="text" placeholder="Tu nombre" disabled className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-caborca-cafe focus:ring-1 focus:ring-caborca-cafe transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-caborca-cafe mb-1">Correo electrónico</label>
                      <input type="email" placeholder="correo@ejemplo.com" disabled className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-caborca-cafe focus:ring-1 focus:ring-caborca-cafe transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-caborca-cafe mb-1">Teléfono</label>
                      <input type="tel" placeholder="(123) 456-7890" disabled className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-caborca-cafe focus:ring-1 focus:ring-caborca-cafe transition-colors" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-caborca-cafe mb-1">Ciudad</label>
                      <input type="text" placeholder="Tu ciudad" disabled className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-caborca-cafe focus:ring-1 focus:ring-caborca-cafe transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-caborca-cafe mb-1">Mensaje</label>
                      <textarea placeholder="Cuéntanos sobre tu negocio..." rows="2" disabled className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-caborca-cafe focus:ring-1 focus:ring-caborca-cafe transition-colors resize-none"></textarea>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 items-center pt-2">
                    <div className="flex items-center gap-4">
                      <button type="submit" className="bg-caborca-cafe text-white font-bold tracking-wider text-xs px-8 py-3 rounded transition-colors shadow-md hover:shadow-lg">
                        {contenido.formDistribuidor.boton[idioma]}
                      </button>
                      <div className="hidden sm:flex items-center gap-2 text-caborca-cafe text-xs">
                        <svg className="w-5 h-5 text-caborca-cafe" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span>{contenido.formDistribuidor.notaTiempo[idioma]}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex justify-end items-center">
                      <div className="flex items-center gap-3 text-caborca-cafe">
                        <div className="text-right">
                          <p className="text-xs font-semibold">{contenido.formDistribuidor.statDistribuidores}</p>
                          <p className="text-xs text-gray-600">Distribuidores</p>
                        </div>
                        <div className="w-16 h-16 bg-caborca-cafe rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">{contenido.formDistribuidor.statEstados}</p>
                          <p className="text-xs text-gray-600">Estados</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL DE EDICIÓN */}
      {modoEdicion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-caborca-cafe flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Sección: {modoEdicion}
              </h3>
              <button
                onClick={cerrarEdicion}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* CONTENIDO DEL MODAL SEGÚN MODO */}
              {modoEdicion === 'carousel' && (
                <>
                  {/* Carousel toolbar: miniaturas, seleccionar slide, agregar/eliminar */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {contenido.carousel.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => setElementoEditando(idx)}
                          className={`flex flex-col items-center gap-2 p-1 rounded transition-shadow ${idx === elementoEditando ? 'ring-2 ring-caborca-cafe' : 'hover:shadow-md'}`}
                        >
                          <img src={s?.imagen || ''} alt={s?.titulo?.[idioma] || 'Slide'} className="w-32 h-16 object-cover rounded" onError={(e) => { e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png' }} />
                          <span className="text-xs text-gray-700 max-w-[80px] truncate">{s?.titulo?.[idioma] || 'Sin título'}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={agregarSlide}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        + Agregar Slide
                      </button>
                      <button
                        onClick={() => eliminarSlide(elementoEditando)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                        disabled={contenido.carousel.length <= 1}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  {/* CAROUSEL */}
                  {modoEdicion === 'carousel' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Título ({idioma === 'es' ? 'Español' : 'English'})
                        </label>
                        <input
                          type="text"
                          value={contenido.carousel[elementoEditando]?.titulo?.[idioma] || ''}
                          onChange={(e) => manejarCambioCarousel(elementoEditando, 'titulo', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Subtítulo ({idioma === 'es' ? 'Español' : 'English'})
                        </label>
                        <input
                          type="text"
                          value={contenido.carousel[elementoEditando]?.subtitulo?.[idioma] || ''}
                          onChange={(e) => manejarCambioCarousel(elementoEditando, 'subtitulo', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Texto del Botón ({idioma === 'es' ? 'Español' : 'English'})
                        </label>
                        <input
                          type="text"
                          value={contenido.carousel[elementoEditando]?.boton?.[idioma] || ''}
                          onChange={(e) => manejarCambioCarousel(elementoEditando, 'boton', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-semibold text-gray-700">Imagen de Fondo</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={contenido.carousel[elementoEditando]?.imagen || ''}
                              onChange={(e) => manejarCambioCarousel(elementoEditando, 'imagen', e.target.value)}
                              className="w-64 px-2 py-1 border border-gray-300 rounded text-xs"
                              placeholder="URL"
                            />
                            <button
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e) => manejarCargarImagen(e, 'carousel', elementoEditando);
                                input.click();
                              }}
                              className="px-3 py-1 bg-caborca-beige-suave text-caborca-cafe rounded text-xs font-bold hover:bg-caborca-cafe hover:text-white transition-colors"
                            >
                              📂 Cargar
                            </button>
                          </div>
                        </div>
                        <div className="rounded overflow-hidden border border-gray-200 bg-white h-32 w-full flex items-center justify-center">
                          <img
                            src={contenido.carousel[elementoEditando]?.imagen || ''}
                            alt="Preview"
                            className="h-full object-contain"
                            onError={(e) => {
                              e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {modoEdicion === 'producto' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Nombre del Producto ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.productosDestacados.productos[elementoEditando]?.nombre?.[idioma] || ''}
                      onChange={(e) => manejarCambioProducto(elementoEditando, 'nombre', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Precio (MXN)
                    </label>
                    <input
                      type="number"
                      value={contenido.productosDestacados.productos[elementoEditando]?.precio || 0}
                      onChange={(e) => manejarCambioProducto(elementoEditando, 'precio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div className="md:row-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Imagen del Producto
                    </label>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 h-full flex flex-col justify-between">
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={contenido.productosDestacados.productos[elementoEditando]?.imagen || ''}
                          onChange={(e) => manejarCambioProducto(elementoEditando, 'imagen', e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="URL"
                        />
                        <button
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => manejarCargarImagen(e, 'producto', elementoEditando);
                            input.click();
                          }}
                          className="px-3 py-1 bg-caborca-beige-suave text-caborca-cafe rounded text-xs font-bold hover:bg-caborca-cafe hover:text-white transition-colors"
                        >
                          📂
                        </button>
                      </div>
                      <div className="flex-1 flex items-center justify-center bg-white border border-gray-200 rounded overflow-hidden">
                        <img
                          src={contenido.productosDestacados.productos[elementoEditando]?.imagen || ''}
                          alt="Preview"
                          className="max-h-32 object-contain"
                          onError={(e) => {
                            e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modoEdicion === 'productos-titulo' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título de la Sección ({idioma === 'es' ? 'Español' : 'English'})
                  </label>
                  <input
                    type="text"
                    value={contenido.productosDestacados.titulo?.[idioma] || ''}
                    onChange={(e) => manejarCambioTexto('productosDestacados', 'titulo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none text-lg font-medium"
                  />
                </div>
              )}

              {/* ARTE DE LA CREACIÓN */}
              {modoEdicion === 'arte-creacion' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Badge ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <input
                        type="text"
                        value={contenido.arteCreacion.badge[idioma]}
                        onChange={(e) => manejarCambioTexto('arteCreacion', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Años de Experiencia</label>
                      <input
                        type="number"
                        value={contenido.arteCreacion.anosExperiencia}
                        onChange={(e) => setContenido(prev => ({
                          ...prev,
                          arteCreacion: { ...prev.arteCreacion, anosExperiencia: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Título ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <input
                        type="text"
                        value={contenido.arteCreacion.titulo[idioma]}
                        onChange={(e) => manejarCambioTexto('arteCreacion', 'titulo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none text-lg font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Features (3)</label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {contenido.arteCreacion.features.map((feature, i) => (
                        <div key={feature.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase">Feature {i + 1}</p>
                          <input
                            type="text"
                            value={feature.titulo[idioma]}
                            onChange={(e) => manejarCambioFeature('arteCreacion', i, 'titulo', e.target.value)}
                            placeholder="Título"
                            className="w-full mb-2 px-2 py-1 border border-gray-300 rounded text-sm focus:border-caborca-cafe focus:outline-none"
                          />
                          <textarea
                            value={feature.descripcion[idioma]}
                            onChange={(e) => manejarCambioFeature('arteCreacion', i, 'descripcion', e.target.value)}
                            placeholder="Descripción"
                            rows="4"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:border-caborca-cafe focus:outline-none resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Imagen</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={contenido.arteCreacion.imagen}
                          onChange={(e) => setContenido(prev => ({
                            ...prev,
                            arteCreacion: { ...prev.arteCreacion, imagen: e.target.value }
                          }))}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="URL"
                        />
                        <button
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => manejarCargarImagen(e, 'arteCreacion');
                            input.click();
                          }}
                          className="px-3 py-1 bg-caborca-beige-suave text-caborca-cafe rounded text-xs font-bold hover:bg-caborca-cafe hover:text-white transition-colors"
                        >
                          📂
                        </button>
                      </div>
                      <div className="mt-2 rounded overflow-hidden border border-gray-200 bg-white h-24 flex items-center justify-center">
                        <img
                          src={contenido.arteCreacion.imagen}
                          alt="Preview"
                          className="h-full object-contain"
                          onError={(e) => {
                            e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png';
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Texto del Botón
                        </label>
                        <input
                          type="text"
                          value={contenido.arteCreacion.boton[idioma]}
                          onChange={(e) => manejarCambioTexto('arteCreacion', 'boton', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Nota
                        </label>
                        <input
                          type="text"
                          value={contenido.arteCreacion.nota[idioma]}
                          onChange={(e) => manejarCambioTexto('arteCreacion', 'nota', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DISTRIBUIDORES AUTORIZADOS */}
              {modoEdicion === 'distribuidores' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Título ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.distribuidoresAutorizados.titulo[idioma]}
                      onChange={(e) => manejarCambioTexto('distribuidoresAutorizados', 'titulo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none text-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Subtítulo ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.distribuidoresAutorizados.subtitulo[idioma]}
                      onChange={(e) => manejarCambioTexto('distribuidoresAutorizados', 'subtitulo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Texto del Botón ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.distribuidoresAutorizados.boton[idioma]}
                      onChange={(e) => manejarCambioTexto('distribuidoresAutorizados', 'boton', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* DÓNDE COMPRAR */}
              {modoEdicion === 'donde-comprar' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Título ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.dondeComprar.titulo[idioma]}
                      onChange={(e) => manejarCambioTexto('dondeComprar', 'titulo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none text-lg font-medium"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Descripción ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <textarea
                      value={contenido.dondeComprar.descripcion[idioma]}
                      onChange={(e) => manejarCambioTexto('dondeComprar', 'descripcion', e.target.value)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      URL del Mapa (Google Maps Embed)
                    </label>
                    <textarea
                      value={contenido.dondeComprar.mapaUrl}
                      onChange={(e) => setContenido(prev => ({
                        ...prev,
                        dondeComprar: { ...prev.dondeComprar, mapaUrl: e.target.value }
                      }))}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none font-mono text-xs"
                      placeholder="<iframe>..."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Ve a Google Maps → Compartir → Insertar un mapa → Copia el HTML
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Texto del Botón ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.dondeComprar.boton[idioma]}
                      onChange={(e) => manejarCambioTexto('dondeComprar', 'boton', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Nota ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.dondeComprar.nota[idioma]}
                      onChange={(e) => manejarCambioTexto('dondeComprar', 'nota', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* SUSTENTABILIDAD */}
              {modoEdicion === 'sustentabilidad' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Imagen de Fondo</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={contenido.sustentabilidadBanner.imagenIzquierda}
                        onChange={(e) => setContenido(prev => ({
                          ...prev,
                          sustentabilidadBanner: { ...prev.sustentabilidadBanner, imagenIzquierda: e.target.value }
                        }))}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                        placeholder="URL"
                      />
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => manejarCargarImagen(e, 'sustentabilidadBanner');
                          input.click();
                        }}
                        className="px-3 py-1 bg-caborca-beige-suave text-caborca-cafe rounded text-xs font-bold hover:bg-caborca-cafe hover:text-white transition-colors"
                      >
                        📂
                      </button>
                    </div>
                    <div className="mt-2 rounded overflow-hidden border border-gray-200 bg-white h-24 flex items-center justify-center">
                      <img
                        src={contenido.sustentabilidadBanner.imagenIzquierda}
                        alt="Preview"
                        className="h-full object-contain"
                        onError={(e) => {
                          e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png';
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Badge ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <input
                        type="text"
                        value={contenido.sustentabilidadBanner.badge[idioma]}
                        onChange={(e) => manejarCambioTexto('sustentabilidadBanner', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Título Izquierdo ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <input
                        type="text"
                        value={contenido.sustentabilidadBanner.tituloIzquierdo[idioma]}
                        onChange={(e) => manejarCambioTexto('sustentabilidadBanner', 'tituloIzquierdo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Descripción Izquierda ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <textarea
                        value={contenido.sustentabilidadBanner.descripcionIzquierdo[idioma]}
                        onChange={(e) => manejarCambioTexto('sustentabilidadBanner', 'descripcionIzquierdo', e.target.value)}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Título Derecho ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <input
                        type="text"
                        value={contenido.sustentabilidadBanner.tituloDerecho[idioma]}
                        onChange={(e) => manejarCambioTexto('sustentabilidadBanner', 'tituloDerecho', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Features (4)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {contenido.sustentabilidadBanner.features.map((feature, i) => (
                        <div key={feature.id} className="p-2 bg-gray-50 rounded border border-gray-200">
                          <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase">Feature {i + 1}</p>
                          <input
                            type="text"
                            value={feature.titulo[idioma]}
                            onChange={(e) => manejarCambioFeature('sustentabilidadBanner', i, 'titulo', e.target.value)}
                            placeholder="Título"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:border-caborca-cafe focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Texto del Botón ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <input
                        type="text"
                        value={contenido.sustentabilidadBanner.boton[idioma]}
                        onChange={(e) => manejarCambioTexto('sustentabilidadBanner', 'boton', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Nota ({idioma === 'es' ? 'Español' : 'English'})
                      </label>
                      <input
                        type="text"
                        value={contenido.sustentabilidadBanner.nota[idioma]}
                        onChange={(e) => manejarCambioTexto('sustentabilidadBanner', 'nota', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* FORMULARIO DISTRIBUIDOR */}
              {modoEdicion === 'form-distribuidor' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Título ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.formDistribuidor.titulo[idioma]}
                      onChange={(e) => manejarCambioTexto('formDistribuidor', 'titulo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Subtítulo ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.formDistribuidor.subtitulo[idioma]}
                      onChange={(e) => manejarCambioTexto('formDistribuidor', 'subtitulo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Mensaje ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <textarea
                      value={contenido.formDistribuidor.mensaje[idioma]}
                      onChange={(e) => manejarCambioTexto('formDistribuidor', 'mensaje', e.target.value)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Texto del Botón ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.formDistribuidor.boton[idioma]}
                      onChange={(e) => manejarCambioTexto('formDistribuidor', 'boton', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Nota de Tiempo ({idioma === 'es' ? 'Español' : 'English'})
                    </label>
                    <input
                      type="text"
                      value={contenido.formDistribuidor.notaTiempo[idioma]}
                      onChange={(e) => manejarCambioTexto('formDistribuidor', 'notaTiempo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Stat Distribuidores</label>
                        <input
                          type="text"
                          value={contenido.formDistribuidor.statDistribuidores}
                          onChange={(e) => setContenido(prev => ({
                            ...prev,
                            formDistribuidor: { ...prev.formDistribuidor, statDistribuidores: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                          placeholder="Ej: +500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Stat Estados</label>
                        <input
                          type="text"
                          value={contenido.formDistribuidor.statEstados}
                          onChange={(e) => setContenido(prev => ({
                            ...prev,
                            formDistribuidor: { ...prev.formDistribuidor, statEstados: e.target.value }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                          placeholder="Ej: 20+"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={cerrarEdicion}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={cerrarEdicion}
                className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors font-semibold"
              >
                ✓ Aplicar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
