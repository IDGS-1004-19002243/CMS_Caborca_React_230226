import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function LayoutAdmin() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const cerrarSesion = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const menuItems = [
    {
      nombre: 'Inicio',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      ruta: '/editar-inicio'
    },
    {
      nombre: 'Nosotros',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      ruta: '/editar-nosotros'
    },
    {
      nombre: 'Catálogo Hombre',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      ruta: '/editar-catalogo-hombre'
    },
    {
      nombre: 'Catálogo Mujer',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
      ruta: '/editar-catalogo-mujer'
    },
    {
      nombre: 'Responsabilidad',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      ruta: '/editar-responsabilidad'
    },
    {
      nombre: 'Distribuidores',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      ruta: '/editar-distribuidores'
    },
    {
      nombre: 'Contacto',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      ruta: '/editar-contacto'
    },
    {
      nombre: 'Mantenimiento',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      ruta: '/editar-mantenimiento'
    },
    {
      nombre: '404 Not Found',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
      ruta: '/editar-notfound'
    },
    {
      nombre: 'Configuración',
      icono: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      ruta: '/editar-configuracion'
    }
  ];

  const usuarioAdmin = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('cms:editor:lang') || 'es'; } catch (e) { return 'es'; }
  });



  useEffect(() => {
    // Ensure initial broadcast so pages can sync
    try {
      window.dispatchEvent(new CustomEvent('cms:editor:lang-changed', { detail: { lang } }));
    } catch (e) { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#5C4A3A] text-white transition-all duration-300 ${menuAbierto ? 'w-64' : 'w-20'
          } flex flex-col z-40 shadow-2xl overflow-hidden`}
      >
        {/* Header del Sidebar */}
        <div className="p-4 border-b border-white/10 bg-[#4A3B2E]">
          <div className="flex items-center justify-between">
            <div className={`flex items-center transition-all duration-300 ${!menuAbierto && 'justify-center w-full'}`}>
              {menuAbierto ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white text-caborca-cafe rounded-lg flex items-center justify-center font-bold text-xl">C</div>
                  <span className="font-playfair font-bold text-lg tracking-wide">CABORCA</span>
                </div>
              ) : (
                <div className="w-8 h-8 bg-white text-caborca-cafe rounded-lg flex items-center justify-center font-bold text-xl">
                  C
                </div>
              )}
            </div>
            {menuAbierto && (
              <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/70 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
              </button>
            )}
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const estaActivo = location.pathname === item.ruta;
              return (
                <li key={item.ruta}>
                  <Link
                    to={item.ruta}
                    className={`flex items-center h-12 rounded-lg transition-all duration-200 group relative ${estaActivo
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                      } ${menuAbierto ? 'px-4 space-x-3' : 'justify-center px-0'}`}
                    title={!menuAbierto ? item.nombre : ''}
                  >
                    <span className={`flex-shrink-0 transition-transform duration-300 ${!menuAbierto && 'group-hover:scale-110'}`}>
                      {item.icono}
                    </span>

                    <span className={`whitespace-nowrap font-medium transition-all duration-300 origin-left ${menuAbierto
                      ? 'opacity-100 translate-x-0 w-auto'
                      : 'opacity-0 -translate-x-4 w-0 hidden'
                      }`}>
                      {item.nombre}
                    </span>

                    {/* Tooltip for collapsed state */}
                    {!menuAbierto && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
                        {item.nombre}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Toggle Button for Collapsed State positioned at bottom if desired, or keep logic in header. 
            User asked to "adjust how it contracts". Moving the toggle to the bottom handles usually feels nice, 
            but kept it in header for now with improved logic. 
        */}
        {!menuAbierto && (
          <div className="p-2 border-t border-white/10 flex justify-center">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}

        {/* Usuario */}
        {menuAbierto && (
          <div className="p-4 border-t border-white/10 bg-[#4A3B2E]">
            <button
              onClick={cerrarSesion}
              className="w-full bg-black/20 hover:bg-black/40 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}
      </aside>

      {/* Contenido principal */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${menuAbierto ? 'ml-64' : 'ml-20'
        }`}>
        {/* Header superior */}
        <header className="sticky top-0 z-50 bg-white shadow-sm p-4 w-full border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-playfair text-caborca-cafe">
              {menuItems.find(item => item.ruta === location.pathname)?.nombre || 'Panel de Administración'}
            </h2>
            <div className="flex items-center gap-4">
              {/* Contenedor DOM para el Portal de BotonesPublicar */}
              <div id="top-bar-actions" className="flex items-center gap-3"></div>

              <a
                href="https://blue-dune-0ce139d10.1.azurestaticapps.net/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#9C8A79] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#8A7968] transition shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Ver Sitio
              </a>


              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => {
                    const lang = 'es';
                    localStorage.setItem('cms:editor:lang', lang);
                    window.dispatchEvent(new CustomEvent('cms:editor:lang-changed', { detail: { lang } }));
                    setLang(lang);
                  }}
                  className={`px-3 py-1 text-sm transition-colors ${(typeof window !== 'undefined' && (localStorage.getItem('cms:editor:lang') || 'es') === 'es')
                    ? 'bg-caborca-cafe text-white rounded'
                    : 'text-gray-600 hover:bg-gray-200 rounded'
                    }`}
                >
                  🇲🇽 ES
                </button>
                <button
                  onClick={() => {
                    const lang = 'en';
                    localStorage.setItem('cms:editor:lang', lang);
                    window.dispatchEvent(new CustomEvent('cms:editor:lang-changed', { detail: { lang } }));
                    setLang(lang);
                  }}
                  className={`px-3 py-1 text-sm transition-colors ${(typeof window !== 'undefined' && (localStorage.getItem('cms:editor:lang') || 'es') === 'en')
                    ? 'bg-caborca-cafe text-white rounded'
                    : 'text-gray-600 hover:bg-gray-200 rounded'
                    }`}
                >
                  🇺🇸 EN
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Área de contenido */}
        <div className="flex-1 p-6 z-0">
          <Outlet context={{ lang }} />
        </div>
      </main>


    </div>
  );
}
