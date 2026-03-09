import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { uploadImage } from '../api/uploadService';
import { textosService } from '../api/textosService';
import BotonesPublicar from '../componentes/BotonesPublicar';

import { useOutletContext } from 'react-router-dom';

export default function EditarNotFound() {
    const { success, error: toastError } = useToast();
    const { lang: idioma } = useOutletContext();
    const [content, setContent] = useState({
        titulo_ES: '¡Esa ruta no existe, vaquero!',
        titulo_EN: 'That route does not exist, cowboy!',
        mensaje_ES: 'Parece que te has alejado demasiado del camino.\nNo te preocupes, endereza las riendas y vuelve con nosotros.',
        mensaje_EN: 'It seems you have strayed too far off the path.\nDon\'t worry, straighten the reins and come back to us.',
        textoBoton_ES: 'Volver al pueblito',
        textoBoton_EN: 'Return to town',
        imagenFondo: 'https://blocks.astratic.com/img/general-img-landscape.png'
    });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await textosService.getTextos('notfound');
                if (data && Object.keys(data).length > 0) {
                    setContent(prev => ({ ...prev, ...data }));
                }
            } catch (e) {
                console.error('Error fetching 404 content:', e);
            }
        };
        fetchContent();
    }, []);

    const handleChange = (field, value) => {
        setContent(prev => ({ ...prev, [field]: value }));
    };

    const guardarCambios = async () => {
        setGuardando(true);
        try {
            await textosService.updateTextos('notfound', content);
            success('Configuración guardada en BD');
        } catch (e) {
            toastError('Error al guardar');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6">
            {/* Panel de Edición (Izquierda o Arriba en móviles) */}
            <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-caborca-cafe">Sección: Página no Encontrada (404)</h3>
                    <BotonesPublicar onGuardar={guardarCambios} />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Título Principal</label>
                            <input
                                type="text"
                                value={idioma === 'es' ? (content.titulo_ES || content.titulo || '¡Esa ruta no existe, vaquero!') : (content.titulo_EN || 'That route does not exist, cowboy!')}
                                onChange={(e) => handleChange(idioma === 'es' ? 'titulo_ES' : 'titulo_EN', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Texto del Botón</label>
                            <input
                                type="text"
                                value={idioma === 'es' ? (content.textoBoton_ES || content.textoBoton || 'Volver al pueblito') : (content.textoBoton_EN || 'Return to town')}
                                onChange={(e) => handleChange(idioma === 'es' ? 'textoBoton_ES' : 'textoBoton_EN', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Mensaje</label>
                            <textarea
                                rows={3}
                                value={idioma === 'es' ? (content.mensaje_ES || content.mensaje || 'Parece que te has alejado demasiado del camino.\nNo te preocupes, endereza las riendas y vuelve con nosotros.') : (content.mensaje_EN || 'It seems you have strayed too far off the path.\nDon\'t worry, straighten the reins and come back to us.')}
                                onChange={(e) => handleChange(idioma === 'es' ? 'mensaje_ES' : 'mensaje_EN', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">Imagen de Fondo</label>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200">
                            <div className="flex gap-4 items-center">
                                <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0 border border-gray-300">
                                    {content.imagenFondo ? (
                                        <img src={content.imagenFondo} alt="Fondo" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-1">Sin imagen</div>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={content.imagenFondo}
                                            onChange={(e) => handleChange('imagenFondo', e.target.value)}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                            placeholder="URL de la imagen"
                                        />
                                    </div>
                                    <div className="text-right">
                                        <label className="cursor-pointer inline-flex items-center gap-2 bg-caborca-beige-suave text-caborca-cafe px-3 py-1 rounded text-xs font-bold hover:bg-caborca-cafe hover:text-white transition-colors">
                                            <span>📂 Cargar</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        try {
                                                            const url = await uploadImage(file);
                                                            handleChange('imagenFondo', url);
                                                        } catch (err) {
                                                            toastError('Error al subir la imagen');
                                                        }
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {content.imagenFondo && (
                                <div className="mt-2 text-right">
                                    <button
                                        onClick={() => handleChange('imagenFondo', '')}
                                        className="text-xs text-red-500 hover:text-red-700 underline font-semibold"
                                    >
                                        Eliminar imagen actual
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Vista Previa (Derecha) */}
            <div className="w-full lg:w-3/5 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative" style={{ minHeight: '460px' }}>

                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white font-sans overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        {content.imagenFondo ? (
                            <img
                                src={content.imagenFondo}
                                alt="Fondo preview"
                                className="w-full h-full object-cover opacity-50 transition-all duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800"></div>
                        )}
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Preview Content */}
                    <div className="relative z-10 text-center w-full px-4 flex flex-col items-center justify-center min-h-[460px]">

                        {/* 404 background number scaled for preview */}
                        <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center select-none pointer-events-none -mt-20 z-0">
                            <h1 className="text-[10rem] md:text-[16rem] font-serif font-bold text-[#b58e5a] leading-none opacity-90 drop-shadow-2xl brightness-90">
                                404
                            </h1>
                        </div>

                        {/* Front Content */}
                        <div className="relative z-10 mt-10">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-white tracking-widest uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                                {idioma === 'es' ? (content.titulo_ES || content.titulo || '¡Esa ruta no existe, vaquero!') : (content.titulo_EN || 'That route does not exist, cowboy!')}
                            </h2>

                            <div className="w-16 md:w-20 h-1 bg-[#b58e5a] mx-auto mb-6 shadow-lg"></div>

                            <p className="text-base md:text-lg text-white max-w-lg mx-auto mb-8 leading-relaxed font-serif font-medium whitespace-pre-wrap" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                {idioma === 'es' ? (content.mensaje_ES || content.mensaje || 'Parece que te has alejado demasiado del camino.\nNo te preocupes, endereza las riendas y vuelve con nosotros.') : (content.mensaje_EN || 'It seems you have strayed too far off the path.\nDon\'t worry, straighten the reins and come back to us.')}
                            </p>

                            <button className="inline-flex items-center gap-2 bg-[#b58e5a] text-white font-bold tracking-widest text-xs md:text-sm px-6 py-3 shadow-xl hover:bg-[#99764a] transition-colors uppercase">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                <span>{idioma === 'es' ? (content.textoBoton_ES || content.textoBoton || 'Volver al pueblito') : (content.textoBoton_EN || 'Return to town')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
