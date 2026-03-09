import { useState, useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';
import { uploadImage } from '../api/uploadService';
import { settingsService } from '../api/settingsService';
import { useOutletContext } from 'react-router-dom';

export default function CatalogoMujer() {
  const { success, error: toastError } = useToast();
  const { lang: idioma = 'es' } = useOutletContext();
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Bota Alta Elegante', sku: 'MW-001', descripcion: 'Bota alta con diseño femenino y elegante.', materiales: ['piel'], marca: 'Caborca', categoria: 'alta', destacado: false, imagen: '/images/bota-mujer-1.jpg', imagenes: ['/images/bota-mujer-1.jpg'], tags: ['elegante'] },
    { id: 2, nombre: 'Botín Casual', sku: 'MW-002', descripcion: 'Botín cómodo para uso diario.', materiales: ['piel', 'goma'], marca: 'Caborca', categoria: 'botin', destacado: false, imagen: '/images/bota-mujer-2.jpg', imagenes: ['/images/bota-mujer-2.jpg'], tags: ['casual'] },
    { id: 3, nombre: 'Bota Vaquera Femenina', sku: 'MW-003', descripcion: 'Versión femenina de la clásica bota vaquera.', materiales: ['piel'], marca: 'Caborca', categoria: 'vaquera', destacado: false, imagen: '/images/bota-mujer-3.jpg', imagenes: ['/images/bota-mujer-3.jpg'], tags: ['vaquera'] },
    { id: 4, nombre: 'Bota de Moda', sku: 'MW-004', descripcion: 'Bota de moda con acabado contemporáneo.', materiales: ['piel'], marca: 'Caborca', categoria: 'moda', destacado: false, imagen: '/images/bota-mujer-4.jpg', imagenes: ['/images/bota-mujer-4.jpg'], tags: ['moda'] },
  ]);

  const [filtro, setFiltro] = useState('todos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [contenido, setContenido] = useState({
    titulo: 'Calzado Dama',
    titulo_EN: "Women's Footwear",
    subtitulo: 'Elegancia y tradición en cada paso.',
    subtitulo_EN: 'Elegance and tradition in every step.',
    imagenPortada: '',
    mostrarPortada: true
  });
  const [guardandoContenido, setGuardandoContenido] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await settingsService.getCatalogoMujer();
        if (data && data.productos && Array.isArray(data.productos)) {
          if (data.productos.length > 0) setProductos(data.productos);
        }
        if (data && data.contenido) {
          setContenido(data.contenido);
        }
      } catch (e) {
        console.error('Error cargando catalogo mujer desde API:', e);
      }
    };
    fetchData();
  }, []);

  const guardarContenido = async () => {
    setGuardandoContenido(true);
    try {
      await settingsService.updateCatalogoMujer({ contenido, productos });
      success('Contenido actualizado');
    } catch (e) {
      toastError('Error al guardar contenido');
    } finally {
      setGuardandoContenido(false);
    }
  };


  const categorias = ['todos', 'alta', 'botin', 'vaquera', 'moda'];

  const productosFiltrados = filtro === 'todos'
    ? productos
    : productos.filter(p => p.categoria === filtro);

  const abrirModal = (producto = null) => {
    setProductoEditando(producto ? { ...producto, imagenes: producto.imagenes || (producto.imagen ? [producto.imagen] : []) } : {
      id: Date.now(),
      nombre: '',
      badge: 'NUEVO',
      sku: '',
      descripcion: '',
      materiales: [],
      marca: '',
      materialCorte: '',
      suela: '',
      construccion: '',
      horma: '',
      tags: [],
      categoria: 'alta',
      destacado: false,
      imagen: '',
      imagenes: []
    });
    setModalAbierto(true);
  };
  const persistProductos = async (lista) => {
    try {
      await settingsService.updateCatalogoMujer({ contenido, productos: lista });
      window.dispatchEvent(new CustomEvent('cms:productos:updated', { detail: { productos: lista } }));
    } catch (e) {
      console.error('Error dispatching productos updated event', e);
    }
  };
  const guardarProducto = () => {
    let nuevos;
    if (productos.find(p => p.id === productoEditando.id)) {
      nuevos = productos.map(p => p.id === productoEditando.id ? productoEditando : p);
    } else {
      nuevos = [...productos, productoEditando];
    }
    setProductos(nuevos);
    persistProductos(nuevos);
    setModalAbierto(false);
    setProductoEditando(null);
  };

  const inputFileRef = useRef(null);
  const manejarCargarImagen = async (e) => {
    const archivos = Array.from(e.target.files || []);
    if (archivos.length === 0) return;
    const maxFiles = 5;
    const maxBytesPerFile = 2 * 1024 * 1024; // 2MB per image
    const allowed = archivos.slice(0, maxFiles);
    const uploadTasks = allowed.map(async (file) => {
      try {
        return await uploadImage(file);
      } catch (err) {
        throw new Error('Error al subir la imagen');
      }
    });
    try {
      const dataUrls = await Promise.all(uploadTasks);
      setProductoEditando(prev => ({ ...prev, imagenes: Array.from(new Set([...(prev.imagenes || []), ...dataUrls])).slice(0, maxFiles) }));
    } catch (err) {
      toastError(err.message || 'Error al leer imágenes');
    }
    if (inputFileRef.current) inputFileRef.current.value = null;
  };

  const eliminarImagen = (index) => {
    setProductoEditando(prev => ({ ...prev, imagenes: (prev.imagenes || []).filter((_, i) => i !== index) }));
  };

  const eliminarProducto = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const nuevos = productos.filter(p => p.id !== id);
      setProductos(nuevos);
      persistProductos(nuevos);
    }
  };

  const toggleDestacado = (id) => {
    const nuevos = productos.map(p => p.id === id ? { ...p, destacado: !p.destacado } : p);
    setProductos(nuevos);
    persistProductos(nuevos);
  };

  const guardarCambios = async () => {
    setGuardando(true);
    try {
      console.log('Guardando catálogo mujer:', productos);
      persistProductos(productos);
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Cambios guardados correctamente');
    } catch (error) {
      toastError('Error al guardar');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <>
      {/* Barra de editor removida */}

      <div className="space-y-6 mt-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-caborca-cafe mb-2">
              Catálogo Mujer
            </h3>
            <p className="text-sm text-gray-600">
              Gestiona los productos del catálogo de mujer
            </p>
          </div>
          <button
            onClick={() => abrirModal()}
            className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors"
          >
            + Nuevo Producto
          </button>
        </div>

        {/* Gestor de Contenido del Catálogo */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-caborca-cafe" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Sección: Encabezado
          </h4>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                <input
                  type="text"
                  value={idioma === 'es' ? (contenido.titulo_ES || contenido.titulo || '') : (contenido.titulo_EN || contenido.titulo || '')}
                  onChange={(e) => setContenido(prev => idioma === 'es' ? { ...prev, titulo_ES: e.target.value } : { ...prev, titulo_EN: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe outline-none"
                  placeholder="Ej. Catálogo Mujer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo / Descripción</label>
                <textarea
                  rows={2}
                  value={idioma === 'es' ? (contenido.subtitulo_ES || contenido.subtitulo || '') : (contenido.subtitulo_EN || contenido.subtitulo || '')}
                  onChange={(e) => setContenido(prev => idioma === 'es' ? { ...prev, subtitulo_ES: e.target.value } : { ...prev, subtitulo_EN: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caborca-cafe outline-none resize-none"
                  placeholder="Ej. Elegancia y tradición en cada paso..."
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={guardarContenido}
                disabled={guardandoContenido}
                className="px-4 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors text-sm font-medium flex items-center space-x-2"
              >
                {guardandoContenido ? (
                  <><span>Guardando...</span></>
                ) : (
                  <><span>Guardar Textos</span></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
            <div className="flex space-x-2">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${filtro === cat
                    ? 'bg-caborca-cafe text-white'
                    : 'bg-caborca-beige-suave text-caborca-cafe hover:bg-caborca-cafe/20'
                    }`}
                >
                  {cat === 'botin' ? 'Botín' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div className="relative aspect-square bg-gray-200">
                <img
                  src={(producto.imagenes && producto.imagenes[0]) || producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://blocks.astratic.com/img/general-img-landscape.png'; }}
                />
                {producto.destacado && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    Destacado
                  </span>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <button
                    onClick={() => abrirModal(producto)}
                    className="p-3 bg-white rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button
                    onClick={() => toggleDestacado(producto.id)}
                    className="p-3 bg-white rounded-full hover:bg-yellow-100 transition-colors"
                  >
                    <svg className={`w-5 h-5 ${producto.destacado ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  </button>
                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="p-3 bg-white rounded-full hover:bg-red-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-caborca-cafe mb-1">{idioma === 'es' ? (producto.nombre_ES || producto.nombre) : (producto.nombre_EN || producto.nombre)}</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="px-2 py-1 bg-caborca-beige-suave text-caborca-cafe rounded capitalize">
                    {producto.categoria === 'botin' ? 'Botín' : producto.categoria}
                  </span>
                  <span className="text-xs text-gray-500">SKU: {producto.sku}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de edición */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl w-full max-w-7xl shadow-2xl my-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-2xl font-serif font-bold text-caborca-cafe font-bold">
                  {productoEditando?.nombre ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button
                  onClick={() => setModalAbierto(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6 text-caborca-cafe">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  <span className="font-semibold text-lg">Sección: Detalles de Producto</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                  {/* Left Column: Basic Info (8 cols) */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Información Básica</h4>

                      <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 md:col-span-6">
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre</label>
                            <input type="text" value={idioma === 'es' ? (productoEditando?.nombre_ES || productoEditando?.nombre || '') : (productoEditando?.nombre_EN || productoEditando?.nombre || '')} onChange={(e) => setProductoEditando(prev => idioma === 'es' ? { ...prev, nombre_ES: e.target.value } : { ...prev, nombre_EN: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" placeholder="Ej. Bota Alta" />
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">SKU</label>
                            <input type="text" value={productoEditando?.sku || ''} onChange={(e) => setProductoEditando({ ...productoEditando, sku: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" placeholder="Ej. MW-001" />
                          </div>
                          <div className="col-span-6 md:col-span-3">
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Badge</label>
                            <input type="text" value={idioma === 'es' ? (productoEditando?.badge_ES || productoEditando?.badge || '') : (productoEditando?.badge_EN || productoEditando?.badge || '')} onChange={(e) => setProductoEditando(prev => idioma === 'es' ? { ...prev, badge_ES: e.target.value } : { ...prev, badge_EN: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" placeholder="NUEVO / OFERTA" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Marca</label>
                            <input type="text" value={productoEditando?.marca || ''} onChange={(e) => setProductoEditando({ ...productoEditando, marca: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Categoría</label>
                            <select value={productoEditando?.categoria || 'alta'} onChange={(e) => setProductoEditando({ ...productoEditando, categoria: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none bg-white">
                              <option value="alta">Bota Alta</option>
                              <option value="botin">Botín</option>
                              <option value="vaquera">Vaquera</option>
                              <option value="moda">Moda</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tags</label>
                            <input type="text" value={(productoEditando?.tags || []).join(', ')} onChange={(e) => setProductoEditando({ ...productoEditando, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" placeholder="elegante, piel" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Descripción</label>
                          <textarea rows={2} value={idioma === 'es' ? (productoEditando?.descripcion_ES || productoEditando?.descripcion || '') : (productoEditando?.descripcion_EN || productoEditando?.descripcion || '')} onChange={(e) => setProductoEditando(prev => idioma === 'es' ? { ...prev, descripcion_ES: e.target.value } : { ...prev, descripcion_EN: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none resize-none" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Ficha Técnica</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Corte</label>
                          <input type="text" value={idioma === 'es' ? (productoEditando?.materialCorte_ES || productoEditando?.materialCorte || '') : (productoEditando?.materialCorte_EN || productoEditando?.materialCorte || '')} onChange={(e) => setProductoEditando(prev => idioma === 'es' ? { ...prev, materialCorte_ES: e.target.value } : { ...prev, materialCorte_EN: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Suela</label>
                          <input type="text" value={idioma === 'es' ? (productoEditando?.suela_ES || productoEditando?.suela || '') : (productoEditando?.suela_EN || productoEditando?.suela || '')} onChange={(e) => setProductoEditando(prev => idioma === 'es' ? { ...prev, suela_ES: e.target.value } : { ...prev, suela_EN: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Construccion</label>
                          <input type="text" value={idioma === 'es' ? (productoEditando?.construccion_ES || productoEditando?.construccion || '') : (productoEditando?.construccion_EN || productoEditando?.construccion || '')} onChange={(e) => setProductoEditando(prev => idioma === 'es' ? { ...prev, construccion_ES: e.target.value } : { ...prev, construccion_EN: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Horma</label>
                          <input type="text" value={idioma === 'es' ? (productoEditando?.horma_ES || productoEditando?.horma || '') : (productoEditando?.horma_EN || productoEditando?.horma || '')} onChange={(e) => setProductoEditando(prev => idioma === 'es' ? { ...prev, horma_ES: e.target.value } : { ...prev, horma_EN: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-caborca-cafe outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Images (4 cols) */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 h-full">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Galería</h4>

                      <div className="mb-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => inputFileRef.current && inputFileRef.current.click()}
                            className="w-full bg-white border border-dashed border-gray-300 text-gray-600 px-4 py-6 rounded-lg hover:border-caborca-cafe hover:text-caborca-cafe transition-all flex flex-col items-center justify-center gap-2 group"
                          >
                            <svg className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span className="text-xs font-medium">Subir Imágenes</span>
                          </button>
                          <input ref={inputFileRef} type="file" accept="image/*" multiple onChange={manejarCargarImagen} className="hidden" />
                        </div>
                      </div>

                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {(productoEditando?.imagenes || []).length === 0 && !productoEditando?.imagen && (
                          <div className="text-center py-8 text-gray-400 text-xs italic">Sin imágenes</div>
                        )}

                        {/* Display primary image if set separately */}
                        {productoEditando?.imagen && !(productoEditando.imagenes || []).includes(productoEditando.imagen) && (
                          <div className="group relative bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                            <img src={productoEditando.imagen} alt="Principal" className="w-12 h-12 object-cover rounded bg-gray-100" />
                            <div className="flex-1 overflow-hidden">
                              <p className="text-[10px] text-gray-500 truncate">Img Principal</p>
                              <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Principal</span>
                            </div>
                          </div>
                        )}

                        {(productoEditando?.imagenes || []).map((img, idx) => (
                          <div key={idx} className="group relative bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                            <img src={img} alt={`img-${idx}`} className="w-12 h-12 object-cover rounded bg-gray-100" />
                            <div className="flex-1 overflow-hidden">
                              <p className="text-[10px] text-gray-500 truncate">Img {idx + 1}</p>
                              {idx === 0 && <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Principal</span>}
                            </div>
                            <button type="button" onClick={() => eliminarImagen(idx)} className="p-1 hover:bg-red-50 text-red-400 rounded transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <label className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-yellow-50 transition-colors">
                          <input type="checkbox" checked={productoEditando?.destacado || false} onChange={(e) => setProductoEditando({ ...productoEditando, destacado: e.target.checked })} className="w-4 h-4 text-caborca-cafe border-gray-300 rounded focus:ring-caborca-cafe" />
                          <span className="text-xs font-bold text-gray-900">Marcar como Destacado</span>
                        </label>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button onClick={() => setModalAbierto(false)} className="px-6 py-2.5 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all">Cancelar</button>
                <button onClick={guardarProducto} className="px-8 py-2.5 bg-caborca-cafe text-white font-medium rounded-lg hover:bg-caborca-negro shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">Guardar Cambios</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
