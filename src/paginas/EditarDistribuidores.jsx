import { useState, useEffect } from 'react';
import EditButton from '../componentes/EditButton';
import BotonesPublicar from '../componentes/BotonesPublicar';
import { useToast } from '../context/ToastContext';
import { textosService } from '../api/textosService';
import { uploadImage } from '../api/uploadService';
import { useOutletContext } from 'react-router-dom';

export default function EditarDistribuidores() {
  const { success, error: toastError, info } = useToast();
  const { lang: idioma = 'es' } = useOutletContext();

  const defaultContent = {
    hero: {
      badge: 'ÚNETE A NOSOTROS',
      titulo: '¿Quieres ser distribuidor?',
      subtitulo: 'Únete a nuestra red de distribuidores y forma parte de la familia Caborca',
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    counters: {
      distribuidores: '+500',
      estados: '20+'
    },
    formulario: {
      titulo: '¿Quieres ser distribuidor?',
      subtitulo: 'Si estás interesado, déjanos tus datos y nuestro equipo se pondrá en contacto contigo.',
      submitLabel_ES: 'ENVIAR SOLICITUD', submitLabel_EN: 'SEND REQUEST',
      responseMessage_ES: '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.', responseMessage_EN: 'Thank you for your interest! We will contact you soon.',
      responseTime_ES: 'Respuesta en 24-48 hrs', responseTime_EN: 'Response in 24-48 hrs'
    },
    filtros: {
      purchasePlaceholder_ES: 'Tipo de compra', purchasePlaceholder_EN: 'Purchase type',
      estadoPlaceholder_ES: 'Estado', estadoPlaceholder_EN: 'State'
    },
    mapTitle_ES: 'Encuéntranos en el mapa', mapTitle_EN: 'Find us on the map',
    mapText_ES: 'Visita nuestras tiendas y distribuidores autorizados en todo México.', mapText_EN: 'Visit our stores and authorized distributors across Mexico.',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120615.72236587609!2d-99.2840989!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sCiudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx'
  };

  const [content, setContent] = useState(defaultContent);
  const [formulario, setFormulario] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    telefono: '',
    ciudad: '',
    mensaje: ''
  });

  const [tipoCompra, setTipoCompra] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [activeEdit, setActiveEdit] = useState(null);
  const [form, setForm] = useState({
    badge_ES: '', badge_EN: '', titulo_ES: '', titulo_EN: '', subtitulo_ES: '', subtitulo_EN: '',
    imagen: null,
    submitLabel_ES: '', submitLabel_EN: '', responseMessage_ES: '', responseMessage_EN: '', responseTime_ES: '', responseTime_EN: '',
    mapSrc: '', mapTitle_ES: '', mapTitle_EN: '', mapText_ES: '', mapText_EN: '',
    distribuidores: '', estados: '',
    purchasePlaceholder_ES: '', purchasePlaceholder_EN: '', estadoPlaceholder_ES: '', estadoPlaceholder_EN: ''
  });

  // decorative hero: no button behavior required

  const manejarCambioFormulario = (evento) => {
    const { name, value } = evento.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarEnvioFormulario = (evento) => {
    evento.preventDefault();
    console.log('Formulario enviado:', formulario);
    success(idioma === 'es' ? '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.' : 'Thank you for your interest! We will contact you soon.');
  };

  useEffect(() => {
    // Cargar valores de la base de datos a través de la API
    const fetchDistribuidores = async () => {
      try {
        const data = await textosService.getTextos('distribuidores');
        if (data && Object.keys(data).length > 0) {
          setContent(prev => ({ ...prev, ...data }));
        }
      } catch (e) {
        console.error('Error fetching distribuidores setup', e);
      }
    };
    fetchDistribuidores();
  }, []);

  function openEditor(section) {
    if (section === 'hero') {
      setForm({
        ...form,
        badge_ES: content.hero?.badge_ES || content.hero?.badge || '',
        badge_EN: content.hero?.badge_EN || '',
        titulo_ES: content.hero?.titulo_ES || content.hero?.titulo || '',
        titulo_EN: content.hero?.titulo_EN || '',
        subtitulo_ES: content.hero?.subtitulo_ES || content.hero?.subtitulo || '',
        subtitulo_EN: content.hero?.subtitulo_EN || '',
        imagen: content.hero?.imagen || null,
      });
    } else if (section === 'formulario') {
      setForm({
        ...form,
        badge_ES: '', badge_EN: '',
        titulo_ES: content.formulario?.titulo_ES || content.formulario?.titulo || '',
        titulo_EN: content.formulario?.titulo_EN || '',
        subtitulo_ES: content.formulario?.subtitulo_ES || content.formulario?.subtitulo || '',
        subtitulo_EN: content.formulario?.subtitulo_EN || '',
        submitLabel_ES: content.formulario?.submitLabel_ES || content.formulario?.submitLabel || 'ENVIAR SOLICITUD',
        submitLabel_EN: content.formulario?.submitLabel_EN || 'SEND REQUEST',
        responseMessage_ES: content.formulario?.responseMessage_ES || content.formulario?.responseMessage || '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.',
        responseMessage_EN: content.formulario?.responseMessage_EN || 'Thank you for your interest! We will contact you soon.',
        responseTime_ES: content.formulario?.responseTime_ES || content.formulario?.responseTime || 'Respuesta en 24-48 hrs',
        responseTime_EN: content.formulario?.responseTime_EN || 'Response in 24-48 hrs',
        distribuidores: content.counters?.distribuidores || '',
        estados: content.counters?.estados || ''
      });
    } else if (section === 'mapa') {
      setForm({ ...form, mapSrc: content.mapSrc || '', mapTitle_ES: content.mapTitle_ES || content.mapTitle || '', mapTitle_EN: content.mapTitle_EN || '', mapText_ES: content.mapText_ES || content.mapText || '', mapText_EN: content.mapText_EN || '' });
    } else if (section === 'filtros') {
      setForm({ ...form, purchasePlaceholder_ES: content.filtros?.purchasePlaceholder_ES || content.filtros?.purchasePlaceholder || '', purchasePlaceholder_EN: content.filtros?.purchasePlaceholder_EN || '', estadoPlaceholder_ES: content.filtros?.estadoPlaceholder_ES || content.filtros?.estadoPlaceholder || '', estadoPlaceholder_EN: content.filtros?.estadoPlaceholder_EN || '' });
    }
    setActiveEdit(section);
  }

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      const section = detail.section || detail.sectionId || detail.id || detail.sectionName;
      if (section) openEditor(section);
    };
    window.addEventListener('cms:edit-section', handler);
    try {
      const qp = new URLSearchParams(window.location.search);
      const edit = qp.get('edit');
      if (edit) openEditor(edit);
    } catch (e) { }
    return () => { window.removeEventListener('cms:edit-section', handler); };
  }, [content]);



  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      const name = e.target.name || 'imagen';
      setForm(prev => ({ ...prev, [name]: url }));
    } catch (err) {
      toastError('Error al subir la imagen');
    }
  };

  const saveChanges = async () => {
    if (!activeEdit) return;

    try {
      let payload = {};
      const newContent = { ...content };

      if (activeEdit === 'hero') {
        const h = {
          ...newContent.hero,
          badge_ES: form.badge_ES !== undefined ? form.badge_ES : newContent.hero?.badge_ES,
          badge_EN: form.badge_EN !== undefined ? form.badge_EN : newContent.hero?.badge_EN,
          titulo_ES: form.titulo_ES !== undefined ? form.titulo_ES : newContent.hero?.titulo_ES,
          titulo_EN: form.titulo_EN !== undefined ? form.titulo_EN : newContent.hero?.titulo_EN,
          subtitulo_ES: form.subtitulo_ES !== undefined ? form.subtitulo_ES : newContent.hero?.subtitulo_ES,
          subtitulo_EN: form.subtitulo_EN !== undefined ? form.subtitulo_EN : newContent.hero?.subtitulo_EN,
          imagen: form.imagen !== undefined ? form.imagen : newContent.hero?.imagen
        };
        newContent.hero = h;
        payload = { hero: h };
      } else if (activeEdit === 'formulario') {
        const f = {
          ...newContent.formulario,
          titulo_ES: form.titulo_ES !== undefined ? form.titulo_ES : newContent.formulario?.titulo_ES,
          titulo_EN: form.titulo_EN !== undefined ? form.titulo_EN : newContent.formulario?.titulo_EN,
          subtitulo_ES: form.subtitulo_ES !== undefined ? form.subtitulo_ES : newContent.formulario?.subtitulo_ES,
          subtitulo_EN: form.subtitulo_EN !== undefined ? form.subtitulo_EN : newContent.formulario?.subtitulo_EN,
          submitLabel_ES: form.submitLabel_ES !== undefined ? form.submitLabel_ES : newContent.formulario?.submitLabel_ES,
          submitLabel_EN: form.submitLabel_EN !== undefined ? form.submitLabel_EN : newContent.formulario?.submitLabel_EN,
          responseMessage_ES: form.responseMessage_ES !== undefined ? form.responseMessage_ES : newContent.formulario?.responseMessage_ES,
          responseMessage_EN: form.responseMessage_EN !== undefined ? form.responseMessage_EN : newContent.formulario?.responseMessage_EN,
          responseTime_ES: form.responseTime_ES !== undefined ? form.responseTime_ES : newContent.formulario?.responseTime_ES,
          responseTime_EN: form.responseTime_EN !== undefined ? form.responseTime_EN : newContent.formulario?.responseTime_EN,
        };
        const c = {
          ...newContent.counters,
          distribuidores: form.distribuidores !== undefined ? form.distribuidores : newContent.counters?.distribuidores,
          estados: form.estados !== undefined ? form.estados : newContent.counters?.estados
        };
        newContent.formulario = f;
        newContent.counters = c;
        payload = { formulario: f, counters: c };
      } else if (activeEdit === 'mapa') {
        newContent.mapSrc = form.mapSrc !== undefined ? form.mapSrc : newContent.mapSrc;
        newContent.mapTitle_ES = form.mapTitle_ES !== undefined ? form.mapTitle_ES : newContent.mapTitle_ES;
        newContent.mapTitle_EN = form.mapTitle_EN !== undefined ? form.mapTitle_EN : newContent.mapTitle_EN;
        newContent.mapText_ES = form.mapText_ES !== undefined ? form.mapText_ES : newContent.mapText_ES;
        newContent.mapText_EN = form.mapText_EN !== undefined ? form.mapText_EN : newContent.mapText_EN;
        payload = {
          mapSrc: newContent.mapSrc,
          mapTitle_ES: newContent.mapTitle_ES,
          mapTitle_EN: newContent.mapTitle_EN,
          mapText_ES: newContent.mapText_ES,
          mapText_EN: newContent.mapText_EN
        };
      } else if (activeEdit === 'filtros') {
        const filt = {
          ...newContent.filtros,
          purchasePlaceholder_ES: form.purchasePlaceholder_ES !== undefined ? form.purchasePlaceholder_ES : newContent.filtros?.purchasePlaceholder_ES,
          purchasePlaceholder_EN: form.purchasePlaceholder_EN !== undefined ? form.purchasePlaceholder_EN : newContent.filtros?.purchasePlaceholder_EN,
          estadoPlaceholder_ES: form.estadoPlaceholder_ES !== undefined ? form.estadoPlaceholder_ES : newContent.filtros?.estadoPlaceholder_ES,
          estadoPlaceholder_EN: form.estadoPlaceholder_EN !== undefined ? form.estadoPlaceholder_EN : newContent.filtros?.estadoPlaceholder_EN,
        };
        newContent.filtros = filt;
        payload = { filtros: filt };
      }

      await textosService.updateTextos('distribuidores', payload);
      setContent(newContent);
      success('Cambios guardados correctamente');
      setActiveEdit(null);
    } catch (e) {
      console.error('Error saving to server', e);
      if (toastError) toastError('Error al guardar en el servidor');
    }
  };

  const guardarCambios = () => {
    // Already saved in saveChanges? 
    // This function seems unused or for external save button. 
    // But saveChanges is called by the modal "Guardar" button.
    // If there is a global save button, we might need this.
    try {
      localStorage.setItem('cms:distribuidores', JSON.stringify(content));
      success('Cambios guardados correctamente');
    } catch (e) {
      toastError('Error al guardar');
    }
  };

  const manejarLimpiarFiltros = () => {
    setTipoCompra('');
    setEstadoFiltro('');
  };

  const manejarAplicarFiltros = () => {
    console.log('Filtros aplicados:', { tipoCompra, estadoFiltro });
  };

  const manejarUbicarme = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          console.log('Ubicación:', posicion.coords);
          success('Ubicación obtenida correctamente');
        },
        (error) => {
          console.error('Error al obtener ubicación:', error);
          toastError('No se pudo obtener tu ubicación');
        }
      );
    } else {
      toastError('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <div className="bg-white text-caborca-cafe font-sans pb-28">
      <BotonesPublicar onGuardar={async () => {
        await textosService.updateTextos('distribuidores', content);
      }} />
      {/* Barra de editor removida intencionalmente */}

      <main>
        {/* HERO IMAGE SECTION */}
        <section data-cms-section="hero" className="relative bg-gray-50">
          <div className="w-full">
            <div className="w-full">
              <div className="relative overflow-hidden shadow-sm">
                <img
                  src={content.hero.imagen}
                  alt="Distribuidores Caborca Boots"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                  <div className="text-center text-white px-6 flex flex-col items-center justify-center h-full">

                    <div className="inline-block mb-6 relative">
                      <span
                        style={{
                          backgroundColor: '#9B8674',
                          color: '#ffffff',
                          padding: '0.45rem 1.25rem',
                          borderRadius: 7,
                          letterSpacing: '0.18em',
                          fontWeight: 600,
                          display: 'inline-block'
                        }}
                        className="text-sm uppercase"
                      >
                        {idioma === 'es' ? content.hero.badge_ES || content.hero.badge : content.hero.badge_EN || content.hero.badge}
                      </span>
                    </div>
                    <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-3xl mx-auto text-white">
                      {idioma === 'es' ? content.hero.titulo_ES || content.hero.titulo : content.hero.titulo_EN || content.hero.titulo}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                      {idioma === 'es' ? content.hero.subtitulo_ES || content.hero.subtitulo : content.hero.subtitulo_EN || content.hero.subtitulo}
                    </p>
                  </div>
                  <EditButton section="hero" onOpen={() => openEditor('hero')} className="absolute top-6 right-6 z-20" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* EDIT MODAL */}
        {activeEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  Sección: {activeEdit}
                </h3>
                <button onClick={() => setActiveEdit(null)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 mb-4 text-xs font-semibold text-yellow-800">
                Editando en: {idioma === 'es' ? '🇲🇽 ESPAÑOL' : '🇺🇸 INGLÉS'}
              </div>

              <div className="space-y-4">
                {activeEdit === 'hero' && (
                  <>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Badge</div>
                      <input name={idioma === 'es' ? 'badge_ES' : 'badge_EN'} value={idioma === 'es' ? form.badge_ES : form.badge_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Título</div>
                      <input name={idioma === 'es' ? 'titulo_ES' : 'titulo_EN'} value={idioma === 'es' ? form.titulo_ES : form.titulo_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Subtítulo</div>
                      <input name={idioma === 'es' ? 'subtitulo_ES' : 'subtitulo_EN'} value={idioma === 'es' ? form.subtitulo_ES : form.subtitulo_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Imagen (max 1 MB)</div>
                      <div className="flex gap-3">
                        <input type="file" name="imagen" accept="image/*" onChange={handleImage} className="hidden" id="hero-img-upload" />
                        <label htmlFor="hero-img-upload" className="px-4 py-2 bg-caborca-beige-suave text-caborca-cafe rounded-lg hover:bg-caborca-cafe hover:text-white transition-colors cursor-pointer text-sm font-semibold">Seleccionar imagen</label>
                      </div>
                      {form.imagen && (
                        <div className="mt-3 rounded-lg overflow-hidden border-2 border-gray-200">
                          <img src={form.imagen} alt="preview" className="max-h-48 object-cover" />
                        </div>
                      )}
                    </label>
                  </>
                )}

                {activeEdit === 'formulario' && (
                  <div className="space-y-4">
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Título del Formulario</div>
                      <input name={idioma === 'es' ? 'titulo_ES' : 'titulo_EN'} value={idioma === 'es' ? form.titulo_ES : form.titulo_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Subtítulo del Formulario</div>
                      <textarea name={idioma === 'es' ? 'subtitulo_ES' : 'subtitulo_EN'} value={idioma === 'es' ? form.subtitulo_ES : form.subtitulo_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none resize-none" rows="2" />
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="block">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Texto del Botón</div>
                        <input name={idioma === 'es' ? 'submitLabel_ES' : 'submitLabel_EN'} value={idioma === 'es' ? form.submitLabel_ES : form.submitLabel_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                      </label>
                      <label className="block">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Texto de Respuesta Rápida</div>
                        <input name={idioma === 'es' ? 'responseTime_ES' : 'responseTime_EN'} value={idioma === 'es' ? form.responseTime_ES : form.responseTime_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                      </label>
                    </div>

                    <div className="border-t border-gray-200 mt-6 pt-4">
                      <div className="text-sm font-semibold text-caborca-bronce mb-4">Estadísticas (Mostradas al lado del botón)</div>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                          <div className="text-xs font-semibold text-gray-500 mb-1">Distribuidores (Ej: +500)</div>
                          <input name="distribuidores" value={form.distribuidores || ''} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                        </label>
                        <label className="block">
                          <div className="text-xs font-semibold text-gray-500 mb-1">Estados (Ej: 20+)</div>
                          <input name="estados" value={form.estados || ''} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeEdit === 'counters' && (
                  <div className="p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
                    ℹ️ Edita los contadores en la sección de Formulario.
                  </div>
                )}

                {activeEdit === 'filtros' && (
                  <>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Placeholder Tipo de compra</div>
                      <input name={idioma === 'es' ? 'purchasePlaceholder_ES' : 'purchasePlaceholder_EN'} value={idioma === 'es' ? form.purchasePlaceholder_ES : form.purchasePlaceholder_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Placeholder Estado</div>
                      <input name={idioma === 'es' ? 'estadoPlaceholder_ES' : 'estadoPlaceholder_EN'} value={idioma === 'es' ? form.estadoPlaceholder_ES : form.estadoPlaceholder_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                  </>
                )}

                {activeEdit === 'mapa' && (
                  <>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Título</div>
                      <input name={idioma === 'es' ? 'mapTitle_ES' : 'mapTitle_EN'} value={idioma === 'es' ? form.mapTitle_ES : form.mapTitle_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Texto</div>
                      <textarea name={idioma === 'es' ? 'mapText_ES' : 'mapText_EN'} value={idioma === 'es' ? form.mapText_ES : form.mapText_EN} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none resize-none" rows="3" />
                    </label>
                    <label className="block">
                      <div className="text-sm font-semibold text-gray-700 mb-2">URL del iframe de mapa</div>
                      <input name="mapSrc" value={form.mapSrc} onChange={handleInput} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-caborca-cafe focus:outline-none" />
                    </label>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setActiveEdit(null)} className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cancelar
                </button>
                <button onClick={saveChanges} className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FORMULARIO DISTRIBUIDOR */}
        <section data-cms-section="formulario" className="py-16 bg-caborca-beige-suave">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 relative">
                <EditButton section="formulario" onOpen={() => openEditor('formulario')} className="absolute top-2 right-4 z-20" />

                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-serif text-caborca-cafe mb-3">{idioma === 'es' ? content.formulario?.titulo_ES || content.formulario?.titulo : content.formulario?.titulo_EN || content.formulario?.titulo}</h2>
                  <p className="text-caborca-cafe/80 text-lg max-w-2xl mx-auto">{idioma === 'es' ? content.formulario?.subtitulo_ES || content.formulario?.subtitulo : content.formulario?.subtitulo_EN || content.formulario?.subtitulo}</p>
                </div>

                <form onSubmit={manejarEnvioFormulario} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        {idioma === 'es' ? 'Nombre completo' : 'Full name'}
                      </label>
                      <input
                        type="text"
                        name="nombreCompleto"
                        value={formulario.nombreCompleto}
                        onChange={manejarCambioFormulario}
                        placeholder={idioma === 'es' ? 'Ej: Juan Pérez' : 'Ex: John Smith'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        {idioma === 'es' ? 'Correo electrónico' : 'Email'}
                      </label>
                      <input
                        type="email"
                        name="correoElectronico"
                        value={formulario.correoElectronico}
                        onChange={manejarCambioFormulario}
                        placeholder="correo@ejemplo.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        {idioma === 'es' ? 'Teléfono' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={manejarCambioFormulario}
                        placeholder="(123) 456-7890"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        {idioma === 'es' ? 'Ciudad' : 'City'}
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formulario.ciudad}
                        onChange={manejarCambioFormulario}
                        placeholder={idioma === 'es' ? 'Ej: Guadalajara' : 'Ex: Los Angeles'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-caborca-cafe mb-1">
                        {idioma === 'es' ? 'Mensaje' : 'Message'}
                      </label>
                      <textarea
                        rows="1"
                        name="mensaje"
                        value={formulario.mensaje}
                        onChange={manejarCambioFormulario}
                        placeholder={idioma === 'es' ? 'Cuéntanos sobre tu negocio...' : 'Tell us about your business...'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent resize-none h-full"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                    <button
                      type="submit"
                      className="bg-caborca-cafe text-white px-8 py-3 rounded-lg font-semibold hover:bg-caborca-negro transition-colors"
                    >
                      {idioma === 'es' ? content.formulario?.submitLabel_ES || content.formulario?.submitLabel || 'ENVIAR SOLICITUD' : content.formulario?.submitLabel_EN || 'SEND REQUEST'}
                    </button>
                    <div className="flex items-center gap-3 text-caborca-cafe/70">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span className="text-sm">{idioma === 'es' ? content.formulario?.responseTime_ES || content.formulario?.responseTime || 'Respuesta en 24-48 hrs' : content.formulario?.responseTime_EN || 'Response in 24-48 hrs'}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-caborca-cafe">{content.counters.distribuidores}</div>
                        <div className="text-xs text-caborca-cafe/60">{idioma === 'es' ? 'Distribuidores' : 'Distributors'}</div>
                      </div>
                      <div className="w-14 h-14 bg-caborca-cafe rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-caborca-cafe">{content.counters.estados}</div>
                        <div className="text-xs text-caborca-cafe/60">{idioma === 'es' ? 'Estados' : 'States'}</div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section data-cms-section="mapa" className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif mb-8 text-caborca-cafe text-center">
              {idioma === 'es' ? content.mapTitle_ES || content.mapTitle || 'Encuéntranos en el mapa' : content.mapTitle_EN || 'Find us on the map'}
            </h2>
            <p className="text-center mb-8 text-black">
              {idioma === 'es' ? content.mapText_ES || content.mapText || 'Visita nuestras tiendas y distribuidores autorizados en todo México.' : content.mapText_EN || 'Visit our stores and authorized distributors across Mexico.'}
            </p>

            {/* Filtros de Búsqueda */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-7xl mx-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Filtro por Tipo de Compra */}
                <div className="flex flex-col">
                  <label htmlFor="purchaseType" className="block text-sm font-semibold text-caborca-cafe mb-2">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    {idioma === 'es' ? 'Tipo de compra' : 'Purchase type'}
                  </label>
                  <select
                    id="purchaseType"
                    value={tipoCompra}
                    onChange={(e) => setTipoCompra(e.target.value)}
                    className="border-2 border-gray-300 rounded py-2 px-4 focus:border-caborca-cafe focus:outline-none transition-colors w-full"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="tienda">Tienda física</option>
                    <option value="online">Compra en línea</option>
                    <option value="ambos">Tienda física y en línea</option>
                  </select>
                </div>

                {/* Filtro por Estado/Ciudad */}
                <div className="flex flex-col">
                  <label htmlFor="stateFilter" className="block text-sm font-semibold text-caborca-cafe mb-2">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    {idioma === 'es' ? 'Ubicación por Estado' : 'Location by State'}
                  </label>
                  <select
                    id="stateFilter"
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    className="border-2 border-gray-300 rounded py-2 px-4 focus:border-caborca-cafe focus:outline-none transition-colors w-full"
                  >
                    <option value="">Selecciona un estado</option>
                    <option value="cdmx">Ciudad de México</option>
                    <option value="jalisco">Jalisco</option>
                    <option value="nuevo-leon">Nuevo León</option>
                    <option value="sonora">Sonora</option>
                    <option value="chihuahua">Chihuahua</option>
                    <option value="texas">Texas, USA</option>
                    <option value="arizona">Arizona, USA</option>
                    <option value="california">California, USA</option>
                  </select>
                </div>

                {/* Botón Usar mi ubicación */}
                <div className="flex flex-col justify-end">
                  <button
                    onClick={manejarUbicarme}
                    className="bg-caborca-cafe text-white py-2 px-4 rounded hover:bg-caborca-cafe/80 transition-colors whitespace-nowrap w-full"
                    title="Usar mi ubicación"
                  >
                    <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {idioma === 'es' ? 'Usar mi ubicación' : 'Use my location'}
                  </button>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col justify-end">
                  <div className="flex gap-2">
                    <button
                      onClick={manejarLimpiarFiltros}
                      className="bg-gray-200 text-caborca-cafe py-2 px-3 rounded hover:bg-gray-300 transition-colors flex-1"
                      title="Limpiar filtros"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <button
                      onClick={manejarAplicarFiltros}
                      className="bg-caborca-cafe text-white py-2 px-3 rounded hover:bg-caborca-cafe/80 transition-colors flex-1"
                      title="Buscar distribuidores"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-xl max-w-7xl mx-auto" style={{ height: '500px' }}>
              <iframe
                id="mapFrame"
                src={content.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa de distribuidores"
              ></iframe>
            </div>
          </div>
        </section>

        {/* MODAL EDITOR */}
        {activeEdit && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-caborca-cafe flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Editar Sección: {activeEdit}
                </h3>
                <button
                  onClick={() => setActiveEdit(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {activeEdit === 'formulario' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                        <input
                          name="titulo"
                          value={form.titulo}
                          onChange={handleInput}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                          placeholder="¿Quieres ser distribuidor?"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Subtítulo</label>
                        <textarea
                          name="subtitulo"
                          value={form.subtitulo}
                          onChange={handleInput}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                          placeholder="Si estás interesado, déjanos tus datos..."
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-sm font-bold text-gray-700 mb-3">Botón y Mensaje de Respuesta</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Texto del Botón</label>
                          <input
                            name="submitLabel"
                            value={form.submitLabel}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            placeholder="ENVIAR SOLICITUD"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje de Respuesta</label>
                          <input
                            name="responseMessage"
                            value={form.responseMessage}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            placeholder="¡Gracias por tu interés!"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Tiempo de Respuesta</label>
                          <input
                            name="responseTime"
                            value={form.responseTime}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            placeholder="Respuesta en 24-48 hrs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="text-sm font-bold text-gray-700 mb-3">Estadísticas</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Número de Distribuidores</label>
                          <input
                            name="distribuidores"
                            value={form.distribuidores}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            placeholder="+500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Ejemplo: +500, 500+, etc.</p>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Número de Estados</label>
                          <input
                            name="estados"
                            value={form.estados}
                            onChange={handleInput}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            placeholder="20+"
                          />
                          <p className="text-xs text-gray-500 mt-1">Ejemplo: 20+, +20, etc.</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeEdit === 'hero' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Badge</label>
                        <input
                          name={idioma === 'es' ? "badge_ES" : "badge_EN"}
                          value={idioma === 'es' ? form.badge_ES : form.badge_EN}
                          onChange={handleInput}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                        <input
                          name={idioma === 'es' ? "titulo_ES" : "titulo_EN"}
                          value={idioma === 'es' ? form.titulo_ES : form.titulo_EN}
                          onChange={handleInput}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Subtítulo</label>
                      <textarea
                        name={idioma === 'es' ? "subtitulo_ES" : "subtitulo_EN"}
                        value={idioma === 'es' ? form.subtitulo_ES : form.subtitulo_EN}
                        onChange={handleInput}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded border flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="block font-semibold text-gray-700 mb-1">Imagen de fondo</label>
                        <div className="flex gap-2">
                          <input
                            name="imagen"
                            value={form.imagen || ''}
                            onChange={handleInput}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                            placeholder="URL de la imagen"
                          />
                          <label className="cursor-pointer bg-caborca-cafe text-white px-3 py-2 rounded text-sm font-medium hover:bg-caborca-negro">
                            Cargar
                            <input
                              name="imagen"
                              type="file"
                              accept="image/*"
                              onChange={handleImage}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      {form.imagen && (
                        <img src={form.imagen} alt="preview" className="h-16 w-16 object-cover rounded border border-gray-200" />
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setActiveEdit(null)}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cancelar
                </button>
                <button
                  onClick={saveChanges}
                  className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro transition-colors font-semibold flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
