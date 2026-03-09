import React, { useState, useEffect } from 'react';
import EditButton from '../componentes/EditButton';
import BotonesPublicar from '../componentes/BotonesPublicar';
import { useToast } from '../context/ToastContext';
import { textosService } from '../api/textosService';
import { uploadImage } from '../api/uploadService';
import { useOutletContext } from 'react-router-dom';

const EditarResponsabilidad = () => {
  const { success, error: toastError } = useToast();
  const { lang: idioma = 'es' } = useOutletContext();

  const defaultContent = {
    hero: {
      badge_ES: 'COMPROMISO CON EL FUTURO', badge_EN: 'COMMITMENT TO THE FUTURE',
      title_ES: 'Responsabilidad Ambiental', title_EN: 'Environmental Responsibility',
      subtitle_ES: 'Nuestro compromiso con el planeta y las futuras generaciones a través de prácticas sostenibles', subtitle_EN: 'Our commitment to the planet and future generations through sustainable practices',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    compania: {
      title_ES: 'Compañía\nresponsable', title_EN: 'Responsible\nCompany',
      p1_ES: 'Como empresa, elegimos conscientemente preocuparnos por mejorar el mundo social, económico y ambiental que nos rodea. Por lo tanto, somos una empresa socialmente responsable que busca lograr un equilibrio mediante la adopción de prácticas, programas, actividades y sistemas de gestión adecuados.', p1_EN: 'As a company, we consciously choose to care about improving the social, economic and environmental world around us. Therefore, we are a socially responsible company that seeks to achieve balance by adopting appropriate policies, programs, activities and management systems.',
      p2_ES: 'También basamos nuestras decisiones en ideales éticos y valores humanos, prestamos especial atención a las leyes laborales y a los estándares relacionados con el medio ambiente y el desarrollo sostenible.', p2_EN: 'We also base our decisions on ethical ideals and human values, paying special attention to labor laws and standards related to the environment and sustainable development.',
      highlight_ES: 'Hemos asumido la tarea de crear programas estratégicos para dar un destino a todos los elementos y materiales que participan directa o indirectamente en la fabricación de nuestras botas.', highlight_EN: 'We have taken on the task of creating strategic programs to manage all elements and materials that participate directly or indirectly in the manufacturing of our boots.',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    energia: {
      title_ES: 'Consumo de\nelectricidad', title_EN: 'Electricity\nConsumption',
      p1_ES: 'Para reducir el impacto del calentamiento global, hemos instalado un sistema de paneles de energía solar que contribuye a un mejor desarrollo sostenible.', p1_EN: 'To reduce the impact of global warming, we have installed a solar panel system that contributes to better sustainable development.',
      p2_ES: 'La energía solar no genera residuos ni contaminación del agua, un factor muy importante teniendo en cuenta la escasez de agua.', p2_EN: 'Solar energy does not generate waste or water pollution, a very important factor considering water scarcity.',
      stat1_ES: '0%', stat1_EN: '0%',
      stat1Label_ES: 'Emisiones CO₂', stat1Label_EN: 'CO₂ Emissions',
      stat2_ES: '100%', stat2_EN: '100%',
      stat2Label_ES: 'Energía Limpia', stat2Label_EN: 'Clean Energy',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    video: {
      title_ES: 'Nuestro compromiso en acción', title_EN: 'Our commitment in action',
      description_ES: 'Descubre cómo transformamos nuestros valores en acciones concretas cada día', description_EN: 'Discover how we transform our values into concrete actions every day',
      videoUrl: 'https://www.youtube.com/embed/3nT5QS6h-tY'
    },
    pieles: {
      title_ES: 'Pieles libres de\nmetales pesados', title_EN: 'Heavy metal\nfree leathers',
      p1_ES: 'Tenemos nuestro propio analizador de metales X-MET7500, un dispositivo de tecnología avanzada que utilizamos para garantizar que nuestros productos estén libres de plomo y productos químicos tóxicos.', p1_EN: 'We have our own X-MET7500 metals analyzer, an advanced technology device we use to ensure our products are free of lead and toxic chemicals.',
      p2_ES: 'Realizamos inspecciones diarias en todas las pieles que recibimos de nuestros proveedores y, por lo tanto, en nuestros productos solo utilizamos aquellos materiales que pasan las pruebas.', p2_EN: 'We conduct daily inspections on all leathers we receive from our suppliers and therefore we only use in our products those materials that pass the tests.',
      sustanciasText_ES: '', sustanciasText_EN: '',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    shambhala: {
      title_ES: 'Un lugar para renacer', title_EN: 'A place to be reborn',
      subtitle_ES: 'Un ecosistema biodiverso donde la naturaleza y la producción sostenible se encuentran en perfecta armonía', subtitle_EN: 'A biodiverse ecosystem where nature and sustainable production meet in perfect harmony',
      missionTitle_ES: 'Nuestra Misión', missionTitle_EN: 'Our Mission',
      missionText_ES: 'Shambhala es un proyecto que nació con el objetivo de convertirse en parte de los pulmones del planeta Tierra.', missionText_EN: 'Shambhala is a project born with the objective of becoming part of the lungs of planet Earth.',
      granjaTitle_ES: 'Granja Biodinámica', granjaTitle_EN: 'Biodynamic Farm',
      granjaText_ES: 'Esta granja biodinámica es uno de nuestros mayores logros, produciendo frutas, verduras, huevos, miel y más de forma orgánica.', granjaText_EN: 'This biodynamic farm is one of our greatest achievements, producing fruits, vegetables, eggs, honey and more organically.',
      educTitle_ES: 'Educación Ambiental', educTitle_EN: 'Environmental Education',
      educText_ES: 'Realizamos talleres y charlas sobre ecología, reciclaje y concienciación de recursos naturales para nuestros colaboradores y sus familias.', educText_EN: 'We hold workshops and talks on ecology, recycling and natural resource awareness for our collaborators and their families.',
      statNumber_ES: '148', statNumber_EN: '148',
      statLabel_ES: 'ACRES DE ESPACIO\nAgroecológico', statLabel_EN: 'ACRES OF\nAgroecological Space',
      statDesc_ES: 'Un ciclo natural donde los desechos orgánicos enriquecen el suelo y nutren las verduras.', statDesc_EN: 'A natural cycle where organic waste enriches the soil and nourishes vegetables.',
      image: 'https://blocks.astratic.com/img/general-img-landscape.png',
      thumb1: 'https://blocks.astratic.com/img/general-img-landscape.png',
      thumb2: 'https://blocks.astratic.com/img/general-img-landscape.png'
    }
  };

  const [content, setContent] = useState(defaultContent);
  const [activeEdit, setActiveEdit] = useState(null);
  const [form, setForm] = useState({
    title_ES: '', title_EN: '', p1_ES: '', p1_EN: '', image: null, videoUrl: '',
    missionTitle_ES: '', missionTitle_EN: '', missionText_ES: '', missionText_EN: '', granjaTitle_ES: '', granjaTitle_EN: '', granjaText_ES: '', granjaText_EN: '', educTitle_ES: '', educTitle_EN: '', educText_ES: '', educText_EN: '', statNumber_ES: '', statNumber_EN: '', statLabel_ES: '', statLabel_EN: '', statDesc_ES: '', statDesc_EN: '', thumb1: '', thumb2: '', subtitle_ES: '', subtitle_EN: '', p2_ES: '', p2_EN: '', badge_ES: '', badge_EN: '', highlight_ES: '', highlight_EN: '', stat1_ES: '', stat1_EN: '', stat1Label_ES: '', stat1Label_EN: '', stat2_ES: '', stat2_EN: '', stat2Label_ES: '', stat2Label_EN: '', description_ES: '', description_EN: '', sustanciasText_ES: '', sustanciasText_EN: ''
  });

  useEffect(() => {
    const fetchResponsabilidad = async () => {
      try {
        const data = await textosService.getTextos('responsabilidad');
        if (data && Object.keys(data).length > 0) {
          setContent(prev => ({ ...prev, ...data }));
        }
      } catch (e) {
        console.error('Error loading content', e);
      }
    };
    fetchResponsabilidad();
  }, []);

  function openEditor(section) {
    const data = content[section] || {};

    setForm({
      title_ES: data.title_ES || data.title || '', title_EN: data.title_EN || '',
      badge_ES: data.badge_ES || data.badge || '', badge_EN: data.badge_EN || '',
      subtitle_ES: data.subtitle_ES || data.subtitle || '', subtitle_EN: data.subtitle_EN || '',
      p1_ES: data.p1_ES || data.p1 || '', p1_EN: data.p1_EN || '',
      p2_ES: data.p2_ES || data.p2 || '', p2_EN: data.p2_EN || '',
      highlight_ES: data.highlight_ES || data.highlight || '', highlight_EN: data.highlight_EN || '',
      image: data.image || null,
      videoUrl: data.videoUrl || '',
      description_ES: data.description_ES || data.description || '', description_EN: data.description_EN || '',
      sustanciasText_ES: data.sustanciasText_ES || data.sustanciasText || '', sustanciasText_EN: data.sustanciasText_EN || '',
      stat1_ES: data.stat1_ES || data.stat1 || '', stat1_EN: data.stat1_EN || '',
      stat1Label_ES: data.stat1Label_ES || data.stat1Label || '', stat1Label_EN: data.stat1Label_EN || '',
      stat2_ES: data.stat2_ES || data.stat2 || '', stat2_EN: data.stat2_EN || '',
      stat2Label_ES: data.stat2Label_ES || data.stat2Label || '', stat2Label_EN: data.stat2Label_EN || '',
      // shambhala
      missionTitle_ES: data.missionTitle_ES || data.missionTitle || '', missionTitle_EN: data.missionTitle_EN || '',
      missionText_ES: data.missionText_ES || data.missionText || '', missionText_EN: data.missionText_EN || '',
      granjaTitle_ES: data.granjaTitle_ES || data.granjaTitle || '', granjaTitle_EN: data.granjaTitle_EN || '',
      granjaText_ES: data.granjaText_ES || data.granjaText || '', granjaText_EN: data.granjaText_EN || '',
      educTitle_ES: data.educTitle_ES || data.educTitle || '', educTitle_EN: data.educTitle_EN || '',
      educText_ES: data.educText_ES || data.educText || '', educText_EN: data.educText_EN || '',
      statNumber_ES: data.statNumber_ES || data.statNumber || '', statNumber_EN: data.statNumber_EN || '',
      statLabel_ES: data.statLabel_ES || data.statLabel || '', statLabel_EN: data.statLabel_EN || '',
      statDesc_ES: data.statDesc_ES || data.statDesc || '', statDesc_EN: data.statDesc_EN || '',
      thumb1: data.thumb1 || '',
      thumb2: data.thumb2 || ''
    });
    setActiveEdit(section);
  };

  useEffect(() => {
    const handler = (e) => {
      const section = e.detail?.sectionId || e.detail?.section;
      if (section && content[section]) openEditor(section);
    };
    window.addEventListener('cms:edit-section', handler);
    try {
      const qp = new URLSearchParams(window.location.search);
      const edit = qp.get('edit');
      if (edit && content[edit]) openEditor(edit);
    } catch (e) { }
    return () => window.removeEventListener('cms:edit-section', handler);
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImageNamed = async (e) => {
    const field = e.target.dataset.field;
    const file = e.target.files?.[0];
    if (!file || !field) return;
    try {
      const url = await uploadImage(file);
      setForm(prev => ({ ...prev, [field]: url }));
    } catch (err) {
      toastError('Error al subir la imagen');
    }
  };

  const closeEditor = () => {
    setActiveEdit(null);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      toastError('Error al subir la imagen');
    }
  };

  const saveChanges = async () => {
    if (!activeEdit) return;

    try {
      const prevSection = content[activeEdit] || {};

      const newSectionData = {
        ...prevSection,
        title_ES: form.title_ES !== undefined ? form.title_ES : prevSection.title_ES,
        title_EN: form.title_EN !== undefined ? form.title_EN : prevSection.title_EN,
        badge_ES: form.badge_ES !== undefined ? form.badge_ES : prevSection.badge_ES,
        badge_EN: form.badge_EN !== undefined ? form.badge_EN : prevSection.badge_EN,
        subtitle_ES: activeEdit === 'hero' ? form.subtitle_ES : (form.p1_ES !== undefined ? form.p1_ES : prevSection.subtitle_ES),
        subtitle_EN: activeEdit === 'hero' ? form.subtitle_EN : (form.p1_EN !== undefined ? form.p1_EN : prevSection.subtitle_EN),
        p1_ES: form.p1_ES !== undefined ? form.p1_ES : prevSection.p1_ES,
        p1_EN: form.p1_EN !== undefined ? form.p1_EN : prevSection.p1_EN,
        p2_ES: form.p2_ES !== undefined ? form.p2_ES : prevSection.p2_ES,
        p2_EN: form.p2_EN !== undefined ? form.p2_EN : prevSection.p2_EN,
        highlight_ES: form.highlight_ES !== undefined ? form.highlight_ES : prevSection.highlight_ES,
        highlight_EN: form.highlight_EN !== undefined ? form.highlight_EN : prevSection.highlight_EN,
        image: form.image !== undefined ? form.image : prevSection.image,
        videoUrl: form.videoUrl !== undefined ? form.videoUrl : prevSection.videoUrl,
        description_ES: form.description_ES !== undefined ? form.description_ES : prevSection.description_ES,
        description_EN: form.description_EN !== undefined ? form.description_EN : prevSection.description_EN,
        sustanciasText_ES: form.sustanciasText_ES !== undefined ? form.sustanciasText_ES : prevSection.sustanciasText_ES,
        sustanciasText_EN: form.sustanciasText_EN !== undefined ? form.sustanciasText_EN : prevSection.sustanciasText_EN,
        // stats (energia)
        stat1_ES: form.stat1_ES !== undefined ? form.stat1_ES : prevSection.stat1_ES,
        stat1_EN: form.stat1_EN !== undefined ? form.stat1_EN : prevSection.stat1_EN,
        stat1Label_ES: form.stat1Label_ES !== undefined ? form.stat1Label_ES : prevSection.stat1Label_ES,
        stat1Label_EN: form.stat1Label_EN !== undefined ? form.stat1Label_EN : prevSection.stat1Label_EN,
        stat2_ES: form.stat2_ES !== undefined ? form.stat2_ES : prevSection.stat2_ES,
        stat2_EN: form.stat2_EN !== undefined ? form.stat2_EN : prevSection.stat2_EN,
        stat2Label_ES: form.stat2Label_ES !== undefined ? form.stat2Label_ES : prevSection.stat2Label_ES,
        stat2Label_EN: form.stat2Label_EN !== undefined ? form.stat2Label_EN : prevSection.stat2Label_EN,
        // shambhala specific
        missionTitle_ES: form.missionTitle_ES !== undefined ? form.missionTitle_ES : prevSection.missionTitle_ES,
        missionTitle_EN: form.missionTitle_EN !== undefined ? form.missionTitle_EN : prevSection.missionTitle_EN,
        missionText_ES: form.missionText_ES !== undefined ? form.missionText_ES : prevSection.missionText_ES,
        missionText_EN: form.missionText_EN !== undefined ? form.missionText_EN : prevSection.missionText_EN,
        granjaTitle_ES: form.granjaTitle_ES !== undefined ? form.granjaTitle_ES : prevSection.granjaTitle_ES,
        granjaTitle_EN: form.granjaTitle_EN !== undefined ? form.granjaTitle_EN : prevSection.granjaTitle_EN,
        granjaText_ES: form.granjaText_ES !== undefined ? form.granjaText_ES : prevSection.granjaText_ES,
        granjaText_EN: form.granjaText_EN !== undefined ? form.granjaText_EN : prevSection.granjaText_EN,
        educTitle_ES: form.educTitle_ES !== undefined ? form.educTitle_ES : prevSection.educTitle_ES,
        educTitle_EN: form.educTitle_EN !== undefined ? form.educTitle_EN : prevSection.educTitle_EN,
        educText_ES: form.educText_ES !== undefined ? form.educText_ES : prevSection.educText_ES,
        educText_EN: form.educText_EN !== undefined ? form.educText_EN : prevSection.educText_EN,
        statNumber_ES: form.statNumber_ES !== undefined ? form.statNumber_ES : prevSection.statNumber_ES,
        statNumber_EN: form.statNumber_EN !== undefined ? form.statNumber_EN : prevSection.statNumber_EN,
        statLabel_ES: form.statLabel_ES !== undefined ? form.statLabel_ES : prevSection.statLabel_ES,
        statLabel_EN: form.statLabel_EN !== undefined ? form.statLabel_EN : prevSection.statLabel_EN,
        statDesc_ES: form.statDesc_ES !== undefined ? form.statDesc_ES : prevSection.statDesc_ES,
        statDesc_EN: form.statDesc_EN !== undefined ? form.statDesc_EN : prevSection.statDesc_EN,
        thumb1: form.thumb1 !== undefined ? form.thumb1 : prevSection.thumb1,
        thumb2: form.thumb2 !== undefined ? form.thumb2 : prevSection.thumb2
      };

      await textosService.updateTextos('responsabilidad', { [activeEdit]: newSectionData });
      setContent(prev => ({ ...prev, [activeEdit]: newSectionData }));

      success('Cambios aplicados correctamente');
      closeEditor();
    } catch (e) {
      console.error(e);
      if (toastError) {
        toastError('Error al guardar la sección.');
      }
    }
  };

  const renderTitle = (raw) => raw?.split('\n').map((line, i) => <span key={i}>{line}{i < raw.split('\n').length - 1 && <br />}</span>);

  return (
    <div className="bg-white text-caborca-cafe font-sans pb-28">
      <BotonesPublicar onGuardar={async () => {
        await textosService.updateTextos('responsabilidad', content);
      }} />
      <main>
        {/* HERO */}
        <section data-cms-section="hero" className="relative bg-gray-50">
          <div className="w-full">
            <div className="w-full">
              <div className="relative overflow-hidden shadow-sm">
                <img src={content.hero.image} alt="Responsabilidad Ambiental Caborca Boots" className="w-full h-[600px] object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <div className="inline-block bg-caborca-cafe px-6 py-2 rounded-lg mb-6">
                      <p className="text-sm md:text-base font-medium tracking-widest uppercase text-white">{idioma === 'es' ? content.hero.badge_ES || content.hero.badge : content.hero.badge_EN || content.hero.badge}</p>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">{idioma === 'es' ? content.hero.title_ES || content.hero.title : content.hero.title_EN || content.hero.title}</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">{idioma === 'es' ? content.hero.subtitle_ES || content.hero.subtitle : content.hero.subtitle_EN || content.hero.subtitle}</p>
                  </div>
                </div>
                <EditButton section="hero" onOpen={() => openEditor('hero')} className="absolute top-4 right-4 z-20" />
              </div>
            </div>
          </div>
        </section>

        {/* COMPAÑÍA RESPONSABLE */}
        <section data-cms-section="compania" className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-caborca-cafe rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-caborca-cafe font-semibold tracking-wider text-sm uppercase">{idioma === 'es' ? 'Empresa Socialmente Responsable' : 'Socially Responsible Company'}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight">{renderTitle(idioma === 'es' ? content.compania.title_ES || content.compania.title : content.compania.title_EN || content.compania.title)}</h2>
                  <div className="w-24 h-1 bg-caborca-cafe"></div>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    <p>{idioma === 'es' ? content.compania.p1_ES || content.compania.p1 : content.compania.p1_EN || content.compania.p1}</p>
                    <p>{idioma === 'es' ? content.compania.p2_ES || content.compania.p2 : content.compania.p2_EN || content.compania.p2}</p>
                    <p className="font-medium text-caborca-cafe">{idioma === 'es' ? content.compania.highlight_ES || content.compania.highlight : content.compania.highlight_EN || content.compania.highlight}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-full h-full bg-caborca-cafe/5 rounded-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={content.compania.image} alt="Responsabilidad Ambiental" className="w-full h-[500px] object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-caborca-cafe mb-1">ESR</div>
                      <div className="text-xs text-caborca-negro/60 uppercase tracking-wide">{idioma === 'es' ? 'Certificación' : 'Certification'}</div>
                    </div>
                  </div>
                  <EditButton section="compania" onOpen={() => openEditor('compania')} className="absolute top-4 right-4 z-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONSUMO DE ELECTRICIDAD */}
        <section data-cms-section="energia" className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="absolute -top-8 -right-8 w-full h-full bg-yellow-400/10 rounded-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={content.energia.image || "https://blocks.astratic.com/img/general-img-landscape.png"} alt="Paneles Solares" className="w-full h-[500px] object-cover" />
                  </div>
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-6 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                    </div>
                    <span className="text-caborca-cafe font-semibold tracking-wider text-sm uppercase">{idioma === 'es' ? 'Energía Limpia' : 'Clean Energy'}</span>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight">{renderTitle(idioma === 'es' ? content.energia.title_ES || content.energia.title : content.energia.title_EN || content.energia.title)}</h2>
                      <div className="w-24 h-1 bg-yellow-400 mt-2"></div>
                    </div>
                    <div className="ml-4">
                      <EditButton section="energia" onOpen={() => openEditor('energia')} className="z-20" />
                    </div>
                  </div>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    <p>{idioma === 'es' ? content.energia.p1_ES || content.energia.p1 : content.energia.p1_EN || content.energia.p1}</p>
                    <p className="font-medium text-caborca-cafe">{idioma === 'es' ? content.energia.p2_ES || content.energia.p2 : content.energia.p2_EN || content.energia.p2}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">{idioma === 'es' ? content.energia.stat1_ES || content.energia.stat1 : content.energia.stat1_EN || content.energia.stat1}</div>
                      <div className="text-sm text-caborca-negro/70">{idioma === 'es' ? content.energia.stat1Label_ES || content.energia.stat1Label : content.energia.stat1Label_EN || content.energia.stat1Label}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">{idioma === 'es' ? content.energia.stat2_ES || content.energia.stat2 : content.energia.stat2_EN || content.energia.stat2}</div>
                      <div className="text-sm text-caborca-negro/70">{idioma === 'es' ? content.energia.stat2Label_ES || content.energia.stat2Label : content.energia.stat2Label_EN || content.energia.stat2Label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO */}
        <section data-cms-section="video" className="py-16 bg-caborca-cafe relative overflow-hidden">
          <EditButton section="video" onOpen={() => openEditor('video')} className="absolute top-6 right-6 z-20" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                  <span className="text-white/80 font-semibold tracking-wider text-sm uppercase">{idioma === 'es' ? 'Nuestro Compromiso' : 'Our Commitment'}</span>
                </div>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">{idioma === 'es' ? content.video.title_ES || content.video.title : content.video.title_EN || content.video.title}</h2>
                </div>
                <div className="w-32 h-1 bg-white mx-auto mb-4"></div>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">{idioma === 'es' ? content.video.description_ES || content.video.description : content.video.description_EN || content.video.description}</p>
              </div>
              <div className="relative group">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <iframe width="100%" height="100%" src={content.video.videoUrl} title="Responsabilidad Ambiental Caborca Boots" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PIELES LIBRES DE METALES PESADOS */}
        <section data-cms-section="pieles" className="py-24 bg-white relative">
          <EditButton section="pieles" onOpen={() => openEditor('pieles')} className="absolute top-6 right-6 z-20" />
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-caborca-cafe font-semibold tracking-wider text-sm uppercase">{idioma === 'es' ? 'Tecnología Avanzada' : 'Advanced Technology'}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight">{renderTitle(idioma === 'es' ? content.pieles.title_ES || content.pieles.title : content.pieles.title_EN || content.pieles.title)}</h2>
                  <div className="w-24 h-1 bg-green-500"></div>
                  <div className="space-y-4 text-caborca-negro/80 leading-relaxed">
                    <p>{idioma === 'es' ? content.pieles.p1_ES || content.pieles.p1 : content.pieles.p1_EN || content.pieles.p1}</p>
                    <p className="font-medium text-caborca-cafe">{idioma === 'es' ? content.pieles.p2_ES || content.pieles.p2 : content.pieles.p2_EN || content.pieles.p2}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-caborca-cafe mb-4 flex items-center gap-2">{idioma === 'es' ? 'Sustancias eliminadas' : 'Eliminated substances'}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {(idioma === 'es' ? content.pieles.sustanciasText_ES || content.pieles.sustanciasText : content.pieles.sustanciasText_EN || content.pieles.sustanciasText)?.split(',').map((s, idx) => s.trim() ? (
                        <div key={idx} className="flex items-center gap-2 text-sm text-caborca-negro/70">
                          <span className="w-2 h-2 bg-red-400 rounded-full" />
                          {s.trim()}
                        </div>
                      ) : null) || (
                          <>
                            <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Plomo</div>
                            <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Arsénico</div>
                            <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Cadmio</div>
                            <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Cloroformo</div>
                            <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Cromo hexavalente</div>
                            <div className="flex items-center gap-2 text-sm text-caborca-negro/70"><span className="w-2 h-2 bg-red-400 rounded-full" />Mercurio</div>
                          </>
                        )}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-full h-full bg-caborca-cafe/5 rounded-2xl"></div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={content.pieles.image} alt="Pieles" className="w-full h-[500px] object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROYECTO AGROECOLÓGICO SHAMBHALA - REDISEÑO */}
        <section data-cms-section="shambhala" className="py-24 bg-green-50 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-4 justify-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 6.5L21 9l-5 3.6L17.5 20 12 16.9 6.5 20 7 12.6 2 9l6.5-0.5L12 2z" fill="currentColor" /></svg>
                </div>
                <span className="text-green-700 font-semibold tracking-wider text-sm uppercase">{idioma === 'es' ? 'PROYECTO AGROECOLÓGICO' : 'AGROECOLOGICAL PROJECT'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-caborca-cafe leading-tight mb-3">{renderTitle(idioma === 'es' ? content.shambhala.title_ES || content.shambhala.title : content.shambhala.title_EN || content.shambhala.title)}</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
              <p className="text-caborca-negro/80 leading-relaxed max-w-3xl mx-auto">{idioma === 'es' ? content.shambhala.subtitle_ES || content.shambhala.subtitle : content.shambhala.subtitle_EN || content.shambhala.subtitle}</p>
            </div>

            <div className="max-w-7xl mx-auto mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                {/* LEFT: stacked feature cards + large stat card */}
                <div className="space-y-6 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1 shrink-0">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 6.5L21 9l-5 3.6L17.5 20 12 16.9 6.5 20 7 12.6 2 9l6.5-0.5L12 2z" fill="currentColor" /></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-caborca-cafe">{idioma === 'es' ? content.shambhala.missionTitle_ES || content.shambhala.missionTitle : content.shambhala.missionTitle_EN || content.shambhala.missionTitle}</h4>
                        <p className="text-sm text-caborca-negro/70">{idioma === 'es' ? content.shambhala.missionText_ES || content.shambhala.missionText : content.shambhala.missionText_EN || content.shambhala.missionText}</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-caborca-cafe">{idioma === 'es' ? content.shambhala.granjaTitle_ES || content.shambhala.granjaTitle : content.shambhala.granjaTitle_EN || content.shambhala.granjaTitle}</h4>
                        <p className="text-sm text-caborca-negro/70">{idioma === 'es' ? content.shambhala.granjaText_ES || content.shambhala.granjaText : content.shambhala.granjaText_EN || content.shambhala.granjaText}</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 7 7 13 7 13s7-6 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" /></svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-caborca-cafe">{idioma === 'es' ? content.shambhala.educTitle_ES || content.shambhala.educTitle : content.shambhala.educTitle_EN || content.shambhala.educTitle}</h4>
                        <p className="text-sm text-caborca-negro/70">{idioma === 'es' ? content.shambhala.educText_ES || content.shambhala.educText : content.shambhala.educText_EN || content.shambhala.educText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="text-4xl font-bold">{idioma === 'es' ? content.shambhala.statNumber_ES || content.shambhala.statNumber : content.shambhala.statNumber_EN || content.shambhala.statNumber}</div>
                    <div className="uppercase text-sm tracking-wide mt-1">{renderTitle(idioma === 'es' ? content.shambhala.statLabel_ES || content.shambhala.statLabel : content.shambhala.statLabel_EN || content.shambhala.statLabel)}</div>
                    <p className="mt-3 text-sm opacity-90">{idioma === 'es' ? content.shambhala.statDesc_ES || content.shambhala.statDesc : content.shambhala.statDesc_EN || content.shambhala.statDesc}</p>
                  </div>
                </div>

                {/* RIGHT: image grid */}
                <div className="flex flex-col gap-4 sm:gap-6 h-full">
                  <div className="flex-1 min-h-[250px] relative rounded-2xl shadow-2xl overflow-hidden group">
                    <img src={content.shambhala.image} alt="Proyecto Shambhala" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1 min-h-[200px]">
                    <div className="relative rounded-xl shadow-lg overflow-hidden group">
                      <img src={content.shambhala.thumb1} alt="thumb" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="relative rounded-xl shadow-lg overflow-hidden group">
                      <img src={content.shambhala.thumb2} alt="thumb" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <EditButton section="shambhala" onOpen={() => openEditor('shambhala')} className="absolute top-4 right-4 z-20" />
          </div>
        </section>

        {/* MODAL EDITOR GLOBAL */}
        {activeEdit && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-caborca-cafe flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Sección: {activeEdit}
                </h3>
                <button onClick={closeEditor} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="bg-gray-100 p-3 text-center text-sm font-semibold text-caborca-cafe">
                Editando en: {idioma === 'es' ? '🇪🇸 Español' : '🇺🇸 Inglés'}
              </div>
              <div className="p-6 space-y-4">

                {activeEdit === 'hero' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {idioma === 'es' ? (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Badge</label>
                            <input name="badge_ES" value={form.badge_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                            <input name="title_ES" value={form.title_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Badge</label>
                            <input name="badge_EN" value={form.badge_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                            <input name="title_EN" value={form.title_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Subtítulo</label>
                      {idioma === 'es' ? (
                        <textarea name="subtitle_ES" value={form.subtitle_ES} onChange={handleInput} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                      ) : (
                        <textarea name="subtitle_EN" value={form.subtitle_EN} onChange={handleInput} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                      )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded border flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="block font-semibold text-gray-700 mb-1">Imagen de fondo</label>
                        <div className="flex gap-2">
                          <input name="image" value={form.image || ''} onChange={handleInput} className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm" />
                          <label className="cursor-pointer bg-caborca-cafe text-white px-3 py-2 rounded text-sm font-medium hover:bg-caborca-negro">
                            Cargar
                            <input data-field="image" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                          </label>
                        </div>
                      </div>
                      {form.image && (
                        <img src={form.image} alt="preview" className="h-16 w-16 object-cover rounded border border-gray-200" />
                      )}
                    </div>
                  </div>
                )}

                {activeEdit === 'compania' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                      {idioma === 'es' ? (
                        <input name="title_ES" value={form.title_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      ) : (
                        <input name="title_EN" value={form.title_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {idioma === 'es' ? (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 1</label>
                            <textarea name="p1_ES" value={form.p1_ES} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 2</label>
                            <textarea name="p2_ES" value={form.p2_ES} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 1</label>
                            <textarea name="p1_EN" value={form.p1_EN} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 2</label>
                            <textarea name="p2_EN" value={form.p2_EN} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Texto destacado</label>
                      {idioma === 'es' ? (
                        <textarea name="highlight_ES" value={form.highlight_ES} onChange={handleInput} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                      ) : (
                        <textarea name="highlight_EN" value={form.highlight_EN} onChange={handleInput} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                      )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded border flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="block font-semibold text-gray-700 mb-1">Imagen</label>
                        <div className="flex gap-2">
                          <input name="image" value={form.image || ''} onChange={handleInput} className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm" />
                          <label className="cursor-pointer bg-caborca-cafe text-white px-3 py-2 rounded text-sm font-medium hover:bg-caborca-negro">
                            Cargar
                            <input data-field="image" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                          </label>
                        </div>
                      </div>
                      {form.image && (
                        <img src={form.image} alt="preview" className="h-16 w-16 object-cover rounded border border-gray-200" />
                      )}
                    </div>
                  </div>
                )}

                {activeEdit === 'pieles' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                      {idioma === 'es' ? (
                        <input name="title_ES" value={form.title_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      ) : (
                        <input name="title_EN" value={form.title_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {idioma === 'es' ? (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 1</label>
                            <textarea name="p1_ES" value={form.p1_ES} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 2</label>
                            <textarea name="p2_ES" value={form.p2_ES} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 1</label>
                            <textarea name="p1_EN" value={form.p1_EN} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Párrafo 2</label>
                            <textarea name="p2_EN" value={form.p2_EN} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Sustancias (separadas por coma)</label>
                      {idioma === 'es' ? (
                        <textarea name="sustanciasText_ES" value={form.sustanciasText_ES} onChange={handleInput} rows={2} placeholder="Plomo, Arsénico, Cadmio..." className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                      ) : (
                        <textarea name="sustanciasText_EN" value={form.sustanciasText_EN} onChange={handleInput} rows={2} placeholder="Lead, Arsenic, Cadmium..." className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none resize-none" />
                      )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded border flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="block font-semibold text-gray-700 mb-1">Imagen</label>
                        <div className="flex gap-2">
                          <input name="image" value={form.image || ''} onChange={handleInput} className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm" />
                          <label className="cursor-pointer bg-caborca-cafe text-white px-3 py-2 rounded text-sm font-medium hover:bg-caborca-negro">
                            Cargar
                            <input data-field="image" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                          </label>
                        </div>
                      </div>
                      {form.image && (
                        <img src={form.image} alt="preview" className="h-16 w-16 object-cover rounded border border-gray-200" />
                      )}
                    </div>
                  </div>
                )}

                {activeEdit === 'video' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                      {idioma === 'es' ? (
                        <input name="title_ES" value={form.title_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      ) : (
                        <input name="title_EN" value={form.title_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                      {idioma === 'es' ? (
                        <input name="description_ES" value={form.description_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      ) : (
                        <input name="description_EN" value={form.description_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">URL del video (embed)</label>
                      <input name="videoUrl" value={form.videoUrl} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe focus:outline-none" />
                    </div>
                  </div>
                )}

                {activeEdit === 'shambhala' && (
                  <div className="space-y-4 text-sm">
                    <div className="grid md:grid-cols-2 gap-4">
                      {idioma === 'es' ? (
                        <>
                          <div>
                            <label className="block font-semibold text-gray-700 mb-1">Título principal</label>
                            <input name="title_ES" value={form.title_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe" />
                          </div>
                          <div>
                            <label className="block font-semibold text-gray-700 mb-1">Subtítulo</label>
                            <input name="subtitle_ES" value={form.subtitle_ES || form.p1_ES} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block font-semibold text-gray-700 mb-1">Título principal</label>
                            <input name="title_EN" value={form.title_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe" />
                          </div>
                          <div>
                            <label className="block font-semibold text-gray-700 mb-1">Subtítulo</label>
                            <input name="subtitle_EN" value={form.subtitle_EN || form.p1_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe" />
                          </div>
                        </>
                      )}
                    </div>

                    <h4 className="font-semibold border-b pb-1">Bloques informativos</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded border">
                        <label className="block font-semibold mb-1">Misión (título)</label>
                        <input name={idioma === 'es' ? 'missionTitle_ES' : 'missionTitle_EN'} value={idioma === 'es' ? form.missionTitle_ES : form.missionTitle_EN} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2" />
                        <label className="block font-semibold mb-1">Texto</label>
                        <textarea name={idioma === 'es' ? 'missionText_ES' : 'missionText_EN'} value={idioma === 'es' ? form.missionText_ES : form.missionText_EN} onChange={handleInput} rows={3} className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none" />
                      </div>

                      <div className="bg-gray-50 p-3 rounded border">
                        <label className="block font-semibold mb-1">Granja (título)</label>
                        <input name={idioma === 'es' ? 'granjaTitle_ES' : 'granjaTitle_EN'} value={idioma === 'es' ? form.granjaTitle_ES : form.granjaTitle_EN} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2" />
                        <label className="block font-semibold mb-1">Texto</label>
                        <textarea name={idioma === 'es' ? 'granjaText_ES' : 'granjaText_EN'} value={idioma === 'es' ? form.granjaText_ES : form.granjaText_EN} onChange={handleInput} rows={3} className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none" />
                      </div>

                      <div className="bg-gray-50 p-3 rounded border">
                        <label className="block font-semibold mb-1">Educación (título)</label>
                        <input name={idioma === 'es' ? 'educTitle_ES' : 'educTitle_EN'} value={idioma === 'es' ? form.educTitle_ES : form.educTitle_EN} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-2" />
                        <label className="block font-semibold mb-1">Texto</label>
                        <textarea name={idioma === 'es' ? 'educText_ES' : 'educText_EN'} value={idioma === 'es' ? form.educText_ES : form.educText_EN} onChange={handleInput} rows={3} className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none" />
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded border border-green-100">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block font-semibold text-green-800 mb-1">Stat (número)</label>
                          <input name={idioma === 'es' ? 'statNumber_ES' : 'statNumber_EN'} value={idioma === 'es' ? form.statNumber_ES : form.statNumber_EN} onChange={handleInput} className="w-full px-2 py-1 border border-green-300 rounded text-sm" />
                        </div>
                        <div>
                          <label className="block font-semibold text-green-800 mb-1">Stat (etiqueta)</label>
                          <input name={idioma === 'es' ? 'statLabel_ES' : 'statLabel_EN'} value={idioma === 'es' ? form.statLabel_ES : form.statLabel_EN} onChange={handleInput} className="w-full px-2 py-1 border border-green-300 rounded text-sm" />
                        </div>
                        <div>
                          <label className="block font-semibold text-green-800 mb-1">Descripción</label>
                          <input name={idioma === 'es' ? 'statDesc_ES' : 'statDesc_EN'} value={idioma === 'es' ? form.statDesc_ES : form.statDesc_EN} onChange={handleInput} className="w-full px-2 py-1 border border-green-300 rounded text-sm" />
                        </div>
                      </div>
                    </div>

                    <h4 className="font-semibold border-b pb-1">Imágenes de galería</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[{ f: 'image', l: 'Principal' }, { f: 'thumb1', l: 'Miniatura 1' }, { f: 'thumb2', l: 'Miniatura 2' }].map((item) => (
                        <div key={item.f}>
                          <label className="block font-semibold mb-1">{item.l} (URL)</label>
                          <div className="flex gap-2">
                            <input name={item.f} value={form[item.f] || ''} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-xs" />
                            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs flex items-center">
                              📂
                              <input data-field={item.f} type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeEdit === 'energia' && (
                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Título</label>
                      <input name={idioma === 'es' ? 'title_ES' : 'title_EN'} value={idioma === 'es' ? form.title_ES : form.title_EN} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">Párrafo 1</label>
                        <textarea name={idioma === 'es' ? 'p1_ES' : 'p1_EN'} value={idioma === 'es' ? form.p1_ES : form.p1_EN} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe resize-none" />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">Párrafo 2</label>
                        <textarea name={idioma === 'es' ? 'p2_ES' : 'p2_EN'} value={idioma === 'es' ? form.p2_ES : form.p2_EN} onChange={handleInput} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded focus:border-caborca-cafe resize-none" />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded border flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="block font-semibold text-gray-700 mb-1">Imagen de sección</label>
                        <div className="flex gap-2">
                          <input name="image" value={form.image || ''} onChange={handleInput} className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm" />
                          <label className="cursor-pointer bg-caborca-cafe text-white px-3 py-2 rounded text-sm font-medium hover:bg-caborca-negro">
                            Cargar
                            <input data-field="image" type="file" accept="image/*" onChange={handleImageNamed} className="hidden" />
                          </label>
                        </div>
                      </div>
                      {form.image && (
                        <img src={form.image} alt="preview" className="h-16 w-16 object-cover rounded border border-gray-200" />
                      )}
                    </div>

                    <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded border">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1 text-xs">Stat 1 (valor)</label>
                        <input name={idioma === 'es' ? 'stat1_ES' : 'stat1_EN'} value={idioma === 'es' ? form.stat1_ES : form.stat1_EN} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1 text-xs">Stat 1 (etiqueta)</label>
                        <input name={idioma === 'es' ? 'stat1Label_ES' : 'stat1Label_EN'} value={idioma === 'es' ? form.stat1Label_ES : form.stat1Label_EN} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1 text-xs">Stat 2 (valor)</label>
                        <input name={idioma === 'es' ? 'stat2_ES' : 'stat2_EN'} value={idioma === 'es' ? form.stat2_ES : form.stat2_EN} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1 text-xs">Stat 2 (etiqueta)</label>
                        <input name={idioma === 'es' ? 'stat2Label_ES' : 'stat2Label_EN'} value={idioma === 'es' ? form.stat2Label_ES : form.stat2Label_EN} onChange={handleInput} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button onClick={closeEditor} className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cancelar
                </button>
                <button onClick={saveChanges} className="px-6 py-2 bg-caborca-cafe text-white rounded-lg hover:bg-caborca-negro flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div >
  );
};

export default EditarResponsabilidad;
