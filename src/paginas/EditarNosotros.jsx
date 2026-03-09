import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import EditButton from '../componentes/EditButton'
import BotonesPublicar from '../componentes/BotonesPublicar'
import { useToast } from '../context/ToastContext'
import { textosService } from '../api/textosService'
import { uploadImage } from '../api/uploadService'

const EditarNosotros = () => {
    const context = useOutletContext();
    const idioma = context?.lang || 'es';

    const defaultContent = {
        hero: {
            badge_ES: 'NUESTRA HISTORIA',
            badge_EN: 'OUR HISTORY',
            title_ES: 'Quiénes Somos',
            title_EN: 'Who We Are',
            subtitle_ES: '45 años de tradición, pasión y maestría artesanal',
            subtitle_EN: '45 years of tradition, passion and artisan mastery',
            imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
        },
        origen: {
            badge_ES: 'NUESTRO ORIGEN',
            badge_EN: 'OUR ORIGIN',
            title_ES: 'El inicio de una aventura',
            title_EN: 'The start of an adventure',
            paragraphs_ES: [
                "Nuestra aventura inicia más o menos hace 45 años en el ocaso de una de las décadas más emocionantes del siglo pasado. Al igual que algunos de los movimientos culturales más importantes de la historia, Botas Caborca, también nació en los 70's.",
                "Para probar suerte dentro del mundo zapatero, Luis Torres Muñoz y sus dos hijos Luis y José Manuel montaron un pequeño taller de bota en León, Guanajuato, una de las ciudades con mayor tradición zapatera en México y el mundo.",
                "Iniciaron pequeños, sólo eran 6 trabajadores y fabricaban 12 pares al día. A la empresa le pusieron Botas Caborca en honor a un pequeño pueblo del norte de México, iniciando operaciones en Abril de 1978."
            ],
            paragraphs_EN: [
                "Our adventure begins roughly 45 years ago at the sunset of one of the most exciting decades of the last century. Like some of the most important cultural movements in history, Caborca Boots was also born in the 70's.",
                "To try their luck in the shoemaking world, Luis Torres Muñoz and his two sons Luis and José Manuel set up a small boot workshop in León, Guanajuato.",
                "They started small, with only 6 workers and manufacturing 12 pairs a day. They named the company Caborca Boots after a small town in northern Mexico, starting operations in April 1978."
            ],
            imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
        },
        crecimiento: {
            title_ES: 'De lo local a lo global',
            title_EN: 'From local to global',
            paragraphs_ES: [
                'Durante algunos años se dedicaron a fabricar la tradicional bota vaquera hecha a mano y se concentraron en vender solamente dentro del territorio mexicano.',
                'El año de 1986 fue histórico porque fue el año en que se empezaron a exportar los primeros pares a Estados Unidos.',
                'Año con año la empresa se fue haciendo más fuerte y comenzó a exportar a otras partes del mundo como Canadá, Japón e Italia.'
            ],
            paragraphs_EN: [
                'For several years they dedicated themselves to manufacturing the traditional handmade cowboy boot and concentrated on selling only within Mexican territory.',
                'The year 1986 was historic because it was the year they began exporting the first pairs to the United States.',
                'Year after year the company grew stronger and began exporting to other parts of the world such as Canada, Japan, and Italy.'
            ],
            imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
        },
        caborcaHoy: {
            title_ES: 'Caborca Group Hoy',
            title_EN: 'Caborca Group Today',
            subtitle_ES: 'Números que reflejan nuestro compromiso y crecimiento',
            subtitle_EN: 'Numbers that reflect our commitment and growth',
            stats: [
                { label_ES: 'AÑOS DE HISTORIA', label_EN: 'YEARS OF HISTORY', value: '45' },
                { label_ES: 'MARCAS PROPIAS', label_EN: 'OWN BRANDS', value: '5' },
                { label_ES: 'COLABORADORES', label_EN: 'WORKERS', value: '800+' },
                { label_ES: 'PARES SEMANALES', label_EN: 'WEEKLY PAIRS', value: '8,000' }
            ],
            paragraph_ES: 'En la actualidad Caborca Group cuenta con 4 plantas manufactureras cubriendo un área total de 30,000 metros cuadrados donde fabricamos alrededor de 8,000 pares semanales con la ayuda de más de 800 colaboradores.',
            paragraph_EN: 'Today Caborca Group has 4 manufacturing plants covering a total area of 30,000 square meters where we manufacture around 8,000 weekly pairs with the help of more than 800 collaborators.'
        },
        artesania: {
            badge_ES: 'NUESTRO ARTE',
            badge_EN: 'OUR ART',
            title_ES: 'Artesanía con legado',
            title_EN: 'Artisanship with legacy',
            subtitle_ES: 'Es un arte que requiere maestría y experiencia',
            subtitle_EN: 'It is an art that requires mastery and experience',
            paragraphs_ES: [
                'Estamos orgullosos y realmente privilegiados de ser maestros en la artesanía de las botas vaqueras y de contar con talentosos colaboradores.',
                'En Grupo Caborca, hemos logrado unir dos mundos: el tradicional y el moderno.'
            ],
            paragraphs_EN: [
                'We are proud and truly privileged to be masters in the craftsmanship of cowboy boots and to have talented collaborators.',
                'In Caborca Group, we have managed to unite two worlds: the traditional and the modern.'
            ],
            imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
        },
        proceso: {
            badge_ES: 'NUESTRO PROCESO',
            badge_EN: 'OUR PROCESS',
            title_ES: 'Pasión por el detalle',
            title_EN: 'Passion for detail',
            paragraphs_ES: [
                'Todo lo que hacemos en Grupo Caborca lo hacemos con pasión; amamos nuestra artesanía y la hacemos bien.',
                'Nuestras botas pasan por un proceso de más de 200 pasos.',
                'Más de cuatro décadas de trabajo arduo.'
            ],
            paragraphs_EN: [
                'Everything we do at Caborca Group we do with passion; we love our craft and we do it well.',
                'Our boots go through a process of more than 200 steps.',
                'More than four decades of hard work.'
            ],
            stat: '+200',
            statLabel_ES: 'Pasos en el proceso de fabricación',
            statLabel_EN: 'Steps in the manufacturing process'
        },
        legado: {
            title_ES: 'Nuestro Legado',
            title_EN: 'Our Legacy',
            paragraphs_ES: [
                'Generaciones de trabajo duro han forjado este legado. En 45 años de trabajo arduo hemos logrado consolidar una gran empresa.'
            ],
            paragraphs_EN: [
                'Generations of hard work have forged this legacy. In 45 years of hard work we have managed to consolidate a great company.'
            ],
            tagline_ES: 'En cada par de botas dejamos el alma y entregamos nuestro ser.',
            tagline_EN: 'In every pair of boots we leave our soul and give our being.'
        }
    };

    const [content, setContent] = useState(defaultContent);
    const [activeEdit, setActiveEdit] = useState(null);

    // Form State (stores all bilingual fields)
    const [form, setForm] = useState({
        title_ES: '', title_EN: '',
        subtitle_ES: '', subtitle_EN: '',
        badge_ES: '', badge_EN: '',
        body_ES: '', body_EN: '',
        statLabel_ES: '', statLabel_EN: '',
        tagline_ES: '', tagline_EN: '',
        stat: '', image: null, stats: []
    });

    const { success, error } = useToast();

    useEffect(() => {
        const fetchTextos = async () => {
            try {
                const data = await textosService.getTextos('nosotros');
                if (data && Object.keys(data).length > 0) {
                    setContent(prev => ({ ...prev, ...data }));
                }
            } catch (e) {
                console.error('Error loading content', e);
            }
        };
        fetchTextos();
    }, []);

    function openEditor(section) {
        const sec = content[section] || {};

        let _bodyES = '';
        let _bodyEN = '';

        if (Array.isArray(sec.paragraphs_ES)) _bodyES = sec.paragraphs_ES.join('\n\n');
        else if (typeof sec.paragraph_ES === 'string') _bodyES = sec.paragraph_ES;

        if (Array.isArray(sec.paragraphs_EN)) _bodyEN = sec.paragraphs_EN.join('\n\n');
        else if (typeof sec.paragraph_EN === 'string') _bodyEN = sec.paragraph_EN;

        // Fallback if legacy object loaded
        if (!_bodyES && Array.isArray(sec.paragraphs)) _bodyES = sec.paragraphs.join('\n\n');
        if (!_bodyES && typeof sec.paragraph === 'string') _bodyES = sec.paragraph;

        setForm({
            title_ES: sec.title_ES || sec.title || '',
            title_EN: sec.title_EN || '',
            subtitle_ES: sec.subtitle_ES || sec.subtitle || '',
            subtitle_EN: sec.subtitle_EN || '',
            badge_ES: sec.badge_ES || sec.badge || '',
            badge_EN: sec.badge_EN || '',
            body_ES: _bodyES,
            body_EN: _bodyEN,
            image: sec.imagen || null,
            stats: sec.stats ? JSON.parse(JSON.stringify(sec.stats)) : [],
            stat: sec.stat || '',
            statLabel_ES: sec.statLabel_ES || sec.statLabel || '',
            statLabel_EN: sec.statLabel_EN || '',
            tagline_ES: sec.tagline_ES || sec.tagline || '',
            tagline_EN: sec.tagline_EN || ''
        });
        setActiveEdit(section);
    }

    useEffect(() => {
        const handler = (e) => {
            const section = e.detail?.section;
            if (section) openEditor(section);
        };
        window.addEventListener('cms:edit-section', handler);
        return () => window.removeEventListener('cms:edit-section', handler);
    }, [content]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...form.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setForm(prev => ({ ...prev, stats: newStats }));
    };

    const handleImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const url = await uploadImage(file);
            setForm(prev => ({ ...prev, image: url }));
        } catch (err) {
            console.error(err);
            alert('Error al subir la imagen');
        }
    };

    const saveChanges = async () => {
        if (!activeEdit) return;

        const previousState = content[activeEdit] || {};
        let newSectionData = { ...previousState };

        // General updates
        newSectionData.title_ES = form.title_ES;
        newSectionData.title_EN = form.title_EN;

        if (form.subtitle_ES || form.subtitle_EN) {
            newSectionData.subtitle_ES = form.subtitle_ES;
            newSectionData.subtitle_EN = form.subtitle_EN;
        }

        if (form.badge_ES || form.badge_EN) {
            newSectionData.badge_ES = form.badge_ES;
            newSectionData.badge_EN = form.badge_EN;
        }

        if (activeEdit === 'caborcaHoy') {
            newSectionData.paragraph_ES = form.body_ES;
            newSectionData.paragraph_EN = form.body_EN;
            newSectionData.stats = form.stats;
        } else {
            if (typeof form.body_ES !== 'undefined' && form.body_ES.includes('\n')) {
                newSectionData.paragraphs_ES = form.body_ES.split('\n\n').filter(p => p.trim());
            } else {
                newSectionData.paragraphs_ES = [form.body_ES];
            }

            if (typeof form.body_EN !== 'undefined' && form.body_EN.includes('\n')) {
                newSectionData.paragraphs_EN = form.body_EN.split('\n\n').filter(p => p.trim());
            } else if (form.body_EN) {
                newSectionData.paragraphs_EN = [form.body_EN];
            }
        }

        if (activeEdit !== 'legado' && activeEdit !== 'caborcaHoy') {
            newSectionData.imagen = form.image;
        }

        if (activeEdit === 'proceso') {
            newSectionData.stat = form.stat;
            newSectionData.statLabel_ES = form.statLabel_ES;
            newSectionData.statLabel_EN = form.statLabel_EN;
        }

        if (activeEdit === 'legado') {
            newSectionData.tagline_ES = form.tagline_ES;
            newSectionData.tagline_EN = form.tagline_EN;
        }

        // Limpiar claves viejas
        delete newSectionData.title;
        delete newSectionData.subtitle;
        delete newSectionData.badge;
        delete newSectionData.paragraph;
        delete newSectionData.paragraphs;
        delete newSectionData.statLabel;
        delete newSectionData.tagline;

        try {
            await textosService.updateTextos('nosotros', { [activeEdit]: newSectionData });
            setContent(prev => ({ ...prev, [activeEdit]: newSectionData }));

            success('Sección actualizada con éxito');
            setActiveEdit(null);
        } catch (e) {
            console.error(e);
            if (error) {
                error('Error al guardar la sección.');
            }
        }
    };

    const guardarBorrador = async () => {
        await textosService.updateTextos('nosotros', content);
    };

    const currentProp = (obj, field) => {
        const suf = idioma === 'en' ? '_EN' : '_ES';
        return obj[`${field}${suf}`] || obj[field] || '';
    };

    const currentArr = (obj, field) => {
        const suf = idioma === 'en' ? '_EN' : '_ES';
        return obj[`${field}${suf}`] || obj[field] || [];
    };

    return (
        <div className="bg-white text-caborca-cafe font-sans pb-28">
            <BotonesPublicar onGuardar={guardarBorrador} />
            <main>
                {/* HERO SECTION */}
                <section className="relative bg-gray-50">
                    <div className="w-full">
                        <div className="w-full">
                            <div className="relative overflow-hidden shadow-sm">
                                <img
                                    src={content.hero.imagen || "https://blocks.astratic.com/img/general-img-landscape.png"}
                                    alt="Nosotros Caborca Boots"
                                    className="w-full h-[600px] object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="text-center text-white px-4 relative flex flex-col items-center">
                                        <EditButton section="hero" onOpen={() => openEditor('hero')} className="absolute -top-16 -right-16" size="sm" />
                                        <div className="inline-block bg-caborca-cafe px-6 py-2 rounded-lg mb-6 shadow-md mt-16 z-20">
                                            <p className="text-sm md:text-base font-medium tracking-widest uppercase text-white">
                                                {currentProp(content.hero, 'badge')}
                                            </p>
                                        </div>
                                        <h1 className="text-5xl md:text-7xl font-serif mb-6 z-20">{currentProp(content.hero, 'title')}</h1>
                                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto z-20">
                                            {currentProp(content.hero, 'subtitle')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ORIGEN - Inicio de la historia */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <div className="inline-block bg-caborca-beige-suave px-4 py-2 rounded-full mb-6 relative">
                                        <EditButton section="origen" onOpen={() => openEditor('origen')} className="absolute -right-12 top-0" size="sm" />
                                        <span className="text-caborca-cafe text-sm font-semibold tracking-wider">{currentProp(content.origen, 'badge')}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif mb-6 text-caborca-cafe">{currentProp(content.origen, 'title')}</h2>
                                    <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                                        {currentArr(content.origen, 'paragraphs').map((p, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <img
                                        src={content.origen.imagen || "https://blocks.astratic.com/img/general-img-landscape.png"}
                                        alt="Historia Caborca"
                                        className="rounded-lg shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CRECIMIENTO */}
                <section className="py-20 bg-caborca-beige-suave">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <div className="bg-white rounded-2xl p-8 shadow-2xl">
                                        <div className="w-full h-[380px] rounded-lg flex items-center justify-center">
                                            <img src={content.crecimiento.imagen || "https://blocks.astratic.com/img/general-img-landscape.png"} alt="Imagen crecimiento" className="object-cover w-full h-full rounded" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="inline-block bg-white rounded-full px-4 py-2 mb-6 relative shadow-sm">
                                        <EditButton section="crecimiento" onOpen={() => openEditor('crecimiento')} className="absolute -right-12 top-0" size="sm" />
                                        <span className="text-sm font-semibold tracking-wider text-caborca-cafe">{currentProp(content.crecimiento, 'badge')}</span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-serif mb-6 text-caborca-cafe">{currentProp(content.crecimiento, 'title')}</h2>
                                    <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                                        {currentArr(content.crecimiento, 'paragraphs').map((p, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CABORCA GROUP HOY - ESTADÍSTICAS */}
                <section className="py-10 text-white" style={{ backgroundColor: '#332B1E' }}>
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto text-center">
                            <div className="relative z-10 w-fit mx-auto mb-4">
                                <EditButton section="caborcaHoy" onOpen={() => openEditor('caborcaHoy')} className="absolute -top-6 -right-14" size="sm" />
                                <h2 className="text-5xl font-serif">{currentProp(content.caborcaHoy, 'title')}</h2>
                            </div>
                            <p className="mb-12 text-lg text-white/80">{currentProp(content.caborcaHoy, 'subtitle')}</p>

                            <div className="grid md:grid-cols-4 gap-8 mb-12">
                                {content.caborcaHoy.stats.map((s, i) => (
                                    <div key={i}>
                                        <div className="text-5xl md:text-6xl font-bold">{s.value}</div>
                                        <div className="uppercase text-sm tracking-wider mt-2">{currentProp(s, 'label')}</div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/90 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: currentProp(content.caborcaHoy, 'paragraph') }}></p>
                        </div>
                    </div>
                </section>

                {/* NUESTRO ARTE - ARTESANÍA CON LEGADO */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <div className="inline-block bg-caborca-beige-suave px-4 py-2 rounded-full mb-6 relative">
                                        <EditButton section="artesania" onOpen={() => openEditor('artesania')} className="absolute -right-12 top-0" size="sm" />
                                        <span className="text-caborca-cafe text-sm font-semibold tracking-wider">{currentProp(content.artesania, 'badge')}</span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-serif mb-4 text-caborca-cafe">{currentProp(content.artesania, 'title')}</h2>
                                    <p className="text-2xl text-caborca-negro/80 mb-6">{currentProp(content.artesania, 'subtitle')}</p>
                                    <div className="space-y-6 text-caborca-negro/80 leading-relaxed">
                                        {currentArr(content.artesania, 'paragraphs').map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-gray-50 rounded-2xl p-10 shadow-2xl">
                                        <div className="w-full h-[420px] flex items-center justify-center">
                                            <img src={content.artesania.imagen || "https://blocks.astratic.com/img/general-img-landscape.png"} alt="Artesanía" className="object-cover w-full h-full rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NUESTRO PROCESO - PASIÓN POR EL DETALLE */}
                <section className="py-10 bg-caborca-beige-suave">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <div className="bg-gray-50 rounded-2xl p-10 shadow-2xl">
                                        <div className="w-full h-[420px] flex items-center justify-center">
                                            <img src={content.proceso.imagen || "https://blocks.astratic.com/img/general-img-landscape.png"} alt="Nuestro proceso" className="object-cover w-full h-full rounded" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="inline-block bg-white rounded-full px-4 py-2 mb-6 shadow-sm relative">
                                        <EditButton section="proceso" onOpen={() => openEditor('proceso')} className="absolute -right-12 top-0" size="sm" />
                                        <span className="text-sm font-semibold tracking-wider text-caborca-cafe">{currentProp(content.proceso, 'badge')}</span>
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-serif mb-6 text-caborca-cafe">{currentProp(content.proceso, 'title')}</h2>
                                    <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                                        {currentArr(content.proceso, 'paragraphs').map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>

                                    <div className="text-white rounded-lg px-8 py-6" style={{ backgroundColor: '#332B1E' }}>
                                        <div className="text-4xl md:text-5xl font-bold">{content.proceso.stat}</div>
                                        <div className="mt-3 text-sm text-white/90">{currentProp(content.proceso, 'statLabel')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NUESTRO LEGADO */}
                <section className="py-20 text-white" style={{ backgroundColor: '#232B26' }} data-cms-section="legado">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="relative w-fit mx-auto">
                                <EditButton section="legado" onOpen={() => openEditor('legado')} className="absolute top-0 -right-12" size="sm" />
                                <h2 className="text-5xl font-serif mb-6">{currentProp(content.legado, 'title')}</h2>
                            </div>
                            {currentArr(content.legado, 'paragraphs').map((p, i) => (
                                <p key={i} className="mb-6 text-lg text-white/80">{p}</p>
                            ))}
                            <p className="text-2xl md:text-3xl font-serif">{currentProp(content.legado, 'tagline')}</p>
                        </div>
                    </div>
                </section>

                {/* EDIT MODAL */}
                {activeEdit && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto mt-16 pt-32 pb-16">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4 absolute top-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-caborca-cafe flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    Sección: {activeEdit} ({idioma === 'en' ? 'Inglés' : 'Español'})
                                </h3>
                                <button onClick={() => setActiveEdit(null)} className="text-gray-500 hover:text-gray-700">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="block">
                                    <div className="text-sm font-semibold text-gray-700 mb-1">Título ({idioma.toUpperCase()})</div>
                                    <input
                                        name={idioma === 'en' ? 'title_EN' : 'title_ES'}
                                        value={idioma === 'en' ? form.title_EN : form.title_ES}
                                        onChange={handleInput}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                                    />
                                </label>

                                {['artesania', 'caborcaHoy', 'hero'].includes(activeEdit) && (
                                    <label className="block">
                                        <div className="text-sm font-semibold text-gray-700 mb-1">Subtítulo ({idioma.toUpperCase()})</div>
                                        <input
                                            name={idioma === 'en' ? 'subtitle_EN' : 'subtitle_ES'}
                                            value={idioma === 'en' ? form.subtitle_EN : form.subtitle_ES}
                                            onChange={handleInput}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                                        />
                                    </label>
                                )}

                                {['hero', 'origen', 'crecimiento', 'artesania', 'proceso'].includes(activeEdit) && (
                                    <label className="block">
                                        <div className="text-sm font-semibold text-gray-700 mb-1">Badge / Insignia ({idioma.toUpperCase()})</div>
                                        <input
                                            name={idioma === 'en' ? 'badge_EN' : 'badge_ES'}
                                            value={idioma === 'en' ? form.badge_EN : form.badge_ES}
                                            onChange={handleInput}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                                        />
                                    </label>
                                )}

                                {activeEdit === 'legado' && (
                                    <label className="block">
                                        <div className="text-sm font-semibold text-gray-700 mb-1">Frase Final ({idioma.toUpperCase()})</div>
                                        <input
                                            name={idioma === 'en' ? 'tagline_EN' : 'tagline_ES'}
                                            value={idioma === 'en' ? form.tagline_EN : form.tagline_ES}
                                            onChange={handleInput}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                                        />
                                    </label>
                                )}

                                {activeEdit === 'caborcaHoy' && (
                                    <div className="md:col-span-2 bg-gray-50 p-3 rounded border border-gray-200">
                                        <div className="text-sm font-semibold text-gray-700 mb-2">Estadísticas</div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {form.stats.map((stat, i) => (
                                                <div key={i} className="flex flex-col gap-1 bg-white p-2 rounded shadow-sm">
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Stat {i + 1}</span>
                                                    <input
                                                        value={stat.value}
                                                        onChange={e => handleStatChange(i, 'value', e.target.value)}
                                                        placeholder="Valor"
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-1"
                                                    />
                                                    <input
                                                        value={idioma === 'en' ? (stat.label_EN || '') : (stat.label_ES || stat.label || '')}
                                                        onChange={e => handleStatChange(i, idioma === 'en' ? 'label_EN' : 'label_ES', e.target.value)}
                                                        placeholder={`Etiqueta (${idioma.toUpperCase()})`}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeEdit !== 'hero' && (
                                    <label className="block md:col-span-2">
                                        <div className="text-sm font-semibold text-gray-700 mb-1">
                                            {activeEdit === 'caborcaHoy' ? `Contenido (${idioma.toUpperCase()})` : `Contenido (${idioma.toUpperCase()}) - separar párrafos con línea en blanco`}
                                        </div>
                                        <textarea
                                            name={idioma === 'en' ? 'body_EN' : 'body_ES'}
                                            value={idioma === 'en' ? form.body_EN : form.body_ES}
                                            onChange={handleInput}
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none text-sm"
                                            rows={6}
                                        />
                                    </label>
                                )}

                                {activeEdit === 'proceso' && (
                                    <label className="block md:col-span-2">
                                        <div className="text-sm font-semibold text-gray-700 mb-1">Dato Estadístico y Etiqueta</div>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                name="stat"
                                                value={form.stat}
                                                onChange={handleInput}
                                                placeholder="Ej. +200"
                                                className="w-full sm:w-1/4 px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                                            />
                                            <input
                                                name={idioma === 'en' ? 'statLabel_EN' : 'statLabel_ES'}
                                                value={idioma === 'en' ? form.statLabel_EN : form.statLabel_ES}
                                                onChange={handleInput}
                                                placeholder={`Ej. Pasos en el proceso de fabricación (${idioma.toUpperCase()})`}
                                                className="w-full sm:w-3/4 px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none"
                                            />
                                        </div>
                                    </label>
                                )}

                                {!['caborcaHoy', 'legado'].includes(activeEdit) && (
                                    <div className="md:col-span-2 flex items-start gap-4 border border-gray-200 p-3 rounded bg-gray-50">
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-gray-700 mb-1">Imagen (opcional)</div>
                                            <div className="flex gap-2 items-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 cursor-pointer text-sm font-medium"
                                                >
                                                    Seleccionar Imagen
                                                </label>
                                                <span className="text-xs text-gray-500">Max 1MB</span>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={handleImage}
                                                    className="hidden"
                                                    id="file-upload"
                                                />
                                            </div>
                                        </div>
                                        {form.image && (
                                            <div className="rounded overflow-hidden border border-gray-300 bg-white p-1">
                                                <img src={form.image} alt="preview" className="h-20 w-auto object-cover" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end gap-3 z-50 relative border-t pt-4">
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
};

export default EditarNosotros;
