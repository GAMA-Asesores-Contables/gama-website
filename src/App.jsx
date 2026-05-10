import React, { useState } from 'react';
import { Menu, X, Send, ArrowRight, CheckCircle2, Globe, ArrowLeft } from 'lucide-react';

export default function GAMAWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('es');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articlesES = [
    {
      id: 1,
      title: 'TRIBU-CR: Guía completa para la tributación electrónica 2026',
      category: 'TRIBU-CR',
      date: '10 de mayo de 2026',
      excerpt: 'TRIBU-CR es el sistema obligatorio de declaración electrónica ante la DIAN costarricense. Aprende qué es, cómo funciona, plazos y cómo evitar sanciones.',
      content: 'TRIBU-CR es el sistema obligatorio de declaración electrónica ante la DIAN costarricense. En esta guía te explicamos qué es, cómo funciona, plazos de presentación, requisitos técnicos y cómo evitar sanciones. Ideal para empresas que recién inician en el sistema o necesitan actualizar sus procesos de cumplimiento tributario.\n\nTemas cubiertos:\n- Qué es TRIBU-CR y obligatoriedad\n- Plazos de presentación según tu tipo de empresa\n- Requisitos técnicos y certificados digitales\n- Paso a paso para tu primera declaración\n- Errores comunes y cómo evitarlos\n- Sanciones y consecuencias del incumplimiento'
    },
    {
      id: 2,
      title: 'IVA en Costa Rica: Declaración, cálculo y obligaciones actualizadas',
      category: 'IVA',
      date: '8 de mayo de 2026',
      excerpt: 'El Impuesto al Valor Agregado (IVA) es una de las obligaciones fiscales más importantes. Conoce porcentajes, exenciones y cómo declarar correctamente.',
      content: 'El Impuesto al Valor Agregado (IVA) es una de las obligaciones fiscales más importantes. Conoce los porcentajes vigentes, exenciones, cómo calcular correctamente tu declaración mensual, y evita errores comunes que pueden generar multas. Este artículo cubre tanto empresas nuevas como consolidadas.\n\nTemas cubiertos:\n- Porcentajes de IVA vigentes en Costa Rica\n- Operaciones exentas y no sujetas\n- Cálculo del IVA: débito vs crédito fiscal\n- Declaración mensual: paso a paso\n- Errores que generan multas\n- Empresas pequeñas y regímenes especiales\n- Auditoria del IVA por parte de Hacienda'
    },
    {
      id: 3,
      title: 'Renta Capital vs. Renta Utilidades: Diferencias y estrategias fiscales',
      category: 'Renta',
      date: '5 de mayo de 2026',
      excerpt: '¿Sabes la diferencia entre renta capital y renta utilidades? Esta distinción impacta tu carga tributaria. Descubre cómo optimizar legalmente tu declaración.',
      content: '¿Sabes la diferencia entre renta capital y renta utilidades? Esta distinción impacta directamente tu carga tributaria. Te explicamos qué ganancias se categorizan en cada una, tasas de impuesto aplicables, y cómo optimizar legalmente tu declaración de renta anual para maximizar rendimiento.\n\nTemas cubiertos:\n- Definición de renta capital vs renta utilidades\n- Tratamiento fiscal de cada tipo de renta\n- Tasas de impuesto vigentes\n- Ganancias de capital: acciones, inmuebles, inversiones\n- Utilidades empresariales y distribuciones\n- Pérdidas: cómo compensarlas\n- Estrategias legales de optimización fiscal'
    },
    {
      id: 4,
      title: 'NIIF para PYMES: Implementación paso a paso en tu empresa',
      category: 'NIIF',
      date: '2 de mayo de 2026',
      excerpt: 'Las NIIF para PYMES son obligatorias para muchas empresas costarricenses. Descubre la implementación, cambios contables y cuándo necesitas asesoría profesional.',
      content: 'Las Normas Internacionales de Información Financiera (NIIF para PYMES) son obligatorias para muchas empresas costarricenses. Descubre qué requiere la implementación, cómo afecta tus estados financieros, cuáles son los principales cambios contables, y cuándo necesitas asesoría profesional para esta transición.\n\nTemas cubiertos:\n- ¿Quién debe aplicar NIIF para PYMES?\n- Principales cambios respecto a PCGA\n- Implementación: diagnóstico inicial\n- Reconocimiento de ingresos bajo NIIF\n- Valuación de inventarios\n- Depreciación de activos fijos\n- Estados financieros bajo NIIF\n- Transición y primeras cifras comparativas'
    },
    {
      id: 5,
      title: 'Reforma tributaria 2026: Cambios que impactan tu negocio',
      category: 'Normativa',
      date: '28 de abril de 2026',
      excerpt: 'Análisis de los cambios tributarios de 2026: cómo afectan empresas grandes, medianas y pequeñas, y qué acciones debes tomar ahora.',
      content: 'Cada año trae nuevos cambios en la normativa tributaria costarricense. En este artículo analizamos los cambios más relevantes de 2026, cómo afectan empresas grandes, medianas y pequeñas, y qué acciones debes tomar ahora para adaptarte. Mantente informado y evita sorpresas fiscales.\n\nTemas cubiertos:\n- Cambios en tasas y porcentajes tributarios\n- Nuevas obligaciones de declaración\n- Reformas al sistema de retenciones\n- Incentivos fiscales disponibles\n- Impacto en pequeñas y medianas empresas\n- Calendario de implementación\n- Recomendaciones para adaptarte'
    }
  ];

  const articlesEN = [
    {
      id: 1,
      title: 'TRIBU-CR: Complete guide to electronic taxation 2026',
      category: 'TRIBU-CR',
      date: 'May 10, 2026',
      excerpt: 'TRIBU-CR is the mandatory electronic declaration system with Costa Rican tax authorities. Learn what it is, how it works, deadlines and how to avoid penalties.',
      content: 'TRIBU-CR is the mandatory electronic declaration system with Costa Rican tax authorities. In this guide we explain what it is, how it works, filing deadlines, technical requirements and how to avoid penalties. Ideal for companies just starting out in the system or needing to update their tax compliance processes.\n\nTopics covered:\n- What is TRIBU-CR and mandatory requirements\n- Filing deadlines by company type\n- Technical requirements and digital certificates\n- Step-by-step for your first filing\n- Common mistakes and how to avoid them\n- Penalties and consequences of non-compliance'
    },
    {
      id: 2,
      title: 'VAT in Costa Rica: Declaration, calculation and updated obligations',
      category: 'VAT',
      date: 'May 8, 2026',
      excerpt: 'Value Added Tax (VAT) is one of the most important tax obligations. Know the rates, exemptions and how to file correctly.',
      content: 'Value Added Tax (VAT) is one of the most important tax obligations. Know the current rates, exemptions, how to correctly calculate your monthly declaration, and avoid common mistakes that can result in fines. This article covers both new and established companies.\n\nTopics covered:\n- Current VAT rates in Costa Rica\n- Exempt and non-taxable operations\n- VAT calculation: tax debit vs credit\n- Monthly filing: step by step\n- Mistakes that generate fines\n- Small businesses and special regimes\n- VAT audit by tax authorities'
    },
    {
      id: 3,
      title: 'Capital Income vs. Business Income: Differences and tax strategies',
      category: 'Income',
      date: 'May 5, 2026',
      excerpt: 'Do you know the difference between capital and business income? This distinction directly impacts your tax burden. Discover how to legally optimize your filing.',
      content: 'Do you know the difference between capital and business income? This distinction directly impacts your tax burden. We explain what income is categorized in each type, applicable tax rates, and how to legally optimize your annual income tax filing to maximize returns.\n\nTopics covered:\n- Definition of capital income vs business income\n- Tax treatment of each income type\n- Current tax rates\n- Capital gains: stocks, real estate, investments\n- Business earnings and distributions\n- Losses: how to offset them\n- Legal tax optimization strategies'
    },
    {
      id: 4,
      title: 'IFRS for SMEs: Step-by-step implementation in your company',
      category: 'IFRS',
      date: 'May 2, 2026',
      excerpt: 'IFRS for SMEs is mandatory for many Costa Rican companies. Discover implementation, accounting changes and when you need professional advice.',
      content: 'International Financial Reporting Standards for Small and Medium Entities (IFRS for SMEs) are mandatory for many Costa Rican companies. Discover what implementation requires, how it affects your financial statements, what the main accounting changes are, and when you need professional guidance for this transition.\n\nTopics covered:\n- Who must apply IFRS for SMEs?\n- Main changes from previous standards\n- Implementation: initial assessment\n- Revenue recognition under IFRS\n- Inventory valuation\n- Fixed asset depreciation\n- Financial statements under IFRS\n- Transition and first comparative figures'
    },
    {
      id: 5,
      title: 'Tax reform 2026: Changes that impact your business',
      category: 'Regulations',
      date: 'April 28, 2026',
      excerpt: 'Analysis of 2026 tax changes: how they affect large, medium and small companies, and what actions you should take now.',
      content: 'Every year brings new changes to Costa Rican tax regulations. In this article we analyze the most relevant 2026 changes, how they affect large, medium and small companies, and what actions you should take now to adapt. Stay informed and avoid tax surprises.\n\nTopics covered:\n- Changes in tax rates and percentages\n- New filing obligations\n- Reforms to the withholding system\n- Available tax incentives\n- Impact on small and medium companies\n- Implementation timeline\n- Recommendations to adapt'
    }
  ];

  const t = {
    es: {
      nav: { inicio: 'Inicio', servicios: 'Servicios', nosotros: 'Nosotros', blog: 'Blog', contacto: 'Contacto' },
      hero: {
        title: 'Asesoría Contable, Tributaria y Financiera',
        subtitle: 'Soluciones integrales para empresas que buscan crecer con seguridad',
        cta: 'Solicitar Presupuesto'
      },
      services: {
        title: 'Servicios Especializados',
        subtitle: 'Desde cumplimiento tributario hasta transformación financiera',
        items: [
          { name: 'NIIF para PYMES', desc: 'Implementación y revisión de estándares internacionales' },
          { name: 'Declaraciones Fiscales', desc: 'Gestión tributaria mensual y anual ante TRIBU-CR' },
          { name: 'Auditoría y Aseguramiento', desc: 'Informes técnicos y certificaciones CPA' },
          { name: 'Outsourcing Contable', desc: 'Gestión integral de procesos contables y administrativos' },
          { name: 'Proyecciones Financieras', desc: 'Análisis y flujos de caja para decisiones estratégicas' },
          { name: 'Constitución Societaria', desc: 'Asesoría legal y administrativa en conformación de empresas' }
        ]
      },
      why: {
        title: '¿Por qué elegirnos?',
        items: [
          { title: 'Experiencia Técnica', desc: 'Dominio profundo de NIIF, tributación costarricense y regulaciones locales' },
          { title: 'Atención Personalizada', desc: 'Cada cliente merece soluciones adaptadas a su realidad empresarial' },
          { title: 'Bilingües', desc: 'Atención en español e inglés para clientes nacionales e internacionales' },
          { title: 'Disponibilidad 360°', desc: 'Presencial en San José y virtual para todo Costa Rica' }
        ]
      },
      contact: {
        title: 'Solicitá tu Presupuesto',
        subtitle: 'Cuéntanos sobre tu empresa y te contactaremos en 24 horas',
        name: 'Nombre', email: 'Correo', company: 'Empresa', message: 'Mensaje', send: 'Enviar'
      },
      blog: {
        title: 'Blog Tributario',
        subtitle: 'Actualizaciones, guías y análisis sobre tributación, NIIF y finanzas',
        readMore: 'Leer más',
        back: 'Volver al blog',
        date: 'Fecha',
        category: 'Categoría'
      },
      footer: 'GAMA Asesores Contables © 2026. Contabilidad y Finanzas.'
    },
    en: {
      nav: { inicio: 'Home', servicios: 'Services', nosotros: 'About', blog: 'Blog', contacto: 'Contact' },
      hero: {
        title: 'Accounting, Tax & Financial Advisory',
        subtitle: 'Complete solutions for companies seeking growth with confidence',
        cta: 'Request a Quote'
      },
      services: {
        title: 'Specialized Services',
        subtitle: 'From tax compliance to financial transformation',
        items: [
          { name: 'IFRS for SMEs', desc: 'Implementation and review of international standards' },
          { name: 'Tax Declarations', desc: 'Monthly and annual tax management with TRIBU-CR' },
          { name: 'Audit & Assurance', desc: 'Technical reports and CPA certifications' },
          { name: 'Accounting Outsourcing', desc: 'Comprehensive accounting and administrative processes' },
          { name: 'Financial Projections', desc: 'Analysis and cash flow forecasting for strategy' },
          { name: 'Corporate Setup', desc: 'Legal and administrative guidance in company formation' }
        ]
      },
      why: {
        title: 'Why Choose Us',
        items: [
          { title: 'Technical Expertise', desc: 'Deep knowledge of IFRS, Costa Rican taxation and local regulations' },
          { title: 'Personalized Service', desc: 'Each client deserves solutions tailored to their business reality' },
          { title: 'Bilingual', desc: 'Spanish and English support for local and international clients' },
          { title: '360° Availability', desc: 'In-person in San José and virtual throughout Costa Rica' }
        ]
      },
      contact: {
        title: 'Request Your Quote',
        subtitle: 'Tell us about your business and we will contact you within 24 hours',
        name: 'Name', email: 'Email', company: 'Company', message: 'Message', send: 'Send'
      },
      blog: {
        title: 'Tax & Finance Blog',
        subtitle: 'Updates, guides and analysis on taxation, IFRS and finance',
        readMore: 'Read more',
        back: 'Back to blog',
        date: 'Date',
        category: 'Category'
      },
      footer: 'GAMA Asesores Contables © 2026. Accounting and Finance.'
    }
  };

  const content = t[language];
  const articles = language === 'es' ? articlesES : articlesEN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xyzabc123', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, company: formData.company, message: formData.message })
      });
      if (response.ok) {
        setFormData({ name: '', email: '', company: '', message: '' });
        alert(language === 'es' ? '✅ Presupuesto enviado.' : '✅ Quote sent.');
      }
    } catch (error) {
      alert(language === 'es' ? '❌ Error.' : '❌ Error.');
    }
  };

  // Renderizar artículo individual
  if (currentPage === 'blog' && selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold" style={{ color: '#051e57' }}>GAMA</div>
              <span className="text-sm" style={{ color: '#b38d47' }}>Asesores</span>
            </div>
            <div className="hidden md:flex gap-8 items-center">
              {Object.entries(content.nav).map(([key, val]) => (
                <button key={key} onClick={() => { setCurrentPage(key); setSelectedArticle(null); }} className="text-sm font-medium hover:text-blue-700">{val}</button>
              ))}
              <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="flex items-center gap-1 px-3 py-1 rounded border" style={{ borderColor: '#051e57', color: '#051e57' }}>{language === 'es' ? 'EN' : 'ES'}</button>
            </div>
          </div>
        </nav>

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <button onClick={() => { setCurrentPage('blog'); setSelectedArticle(null); }} className="flex items-center gap-2 mb-6" style={{ color: '#051e57' }}>
              <ArrowLeft size={20} /> {content.blog.back}
            </button>
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#051e57' }}>{article.title}</h1>
            <div className="flex gap-4 text-sm text-gray-600 mb-8">
              <span>{content.blog.date}: {article.date}</span>
              <span>{content.blog.category}: <span style={{ color: '#b38d47', fontWeight: 'bold' }}>{article.category}</span></span>
            </div>
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </div>

        <a href="https://wa.me/50688969883?text=Hola%20GAMA%20Asesores,%20me%20interesa%20solicitar%20un%20presupuesto" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-40 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.26-1.022 1.024-1.756 2.12-2.26 3.359a9.9 9.9 0 00-1.271 3.999c-.108.816-.073 1.63.1 2.431.174.801.48 1.555.923 2.236.443.681 1.006 1.289 1.687 1.815.68.526 1.479.938 2.289 1.243.809.305 1.66.456 2.522.456 2.04 0 3.97-.775 5.414-2.173 1.444-1.397 2.25-3.32 2.25-5.354 0-.954-.178-1.897-.529-2.8-.35-.904-.868-1.738-1.537-2.458-.669-.72-1.464-1.286-2.34-1.685-.876-.4-1.82-.603-2.788-.603z" />
          </svg>
        </a>

        <footer className="py-8 px-4 text-center text-sm" style={{ backgroundColor: '#051e57', color: 'white' }}><p>{content.footer}</p></footer>
      </div>
    );
  }

  // Renderizar lista de blog
  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold" style={{ color: '#051e57' }}>GAMA</div>
              <span className="text-sm" style={{ color: '#b38d47' }}>Asesores</span>
            </div>
            <div className="hidden md:flex gap-8 items-center">
              {Object.entries(content.nav).map(([key, val]) => (
                <button key={key} onClick={() => setCurrentPage(key)} className="text-sm font-medium hover:text-blue-700">{val}</button>
              ))}
              <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="flex items-center gap-1 px-3 py-1 rounded border" style={{ borderColor: '#051e57', color: '#051e57' }}>{language === 'es' ? 'EN' : 'ES'}</button>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4" style={{ color: '#051e57' }}>{content.blog.title}</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{content.blog.subtitle}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => setSelectedArticle(article.id)}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded" style={{ backgroundColor: '#f2e485', color: '#051e57' }}>{article.category}</span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#051e57' }}>{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                  <button className="text-sm font-semibold" style={{ color: '#b38d47' }}>{content.blog.readMore} →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <a href="https://wa.me/50688969883?text=Hola%20GAMA%20Asesores,%20me%20interesa%20solicitar%20un%20presupuesto" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-40 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.26-1.022 1.024-1.756 2.12-2.26 3.359a9.9 9.9 0 00-1.271 3.999c-.108.816-.073 1.63.1 2.431.174.801.48 1.555.923 2.236.443.681 1.006 1.289 1.687 1.815.68.526 1.479.938 2.289 1.243.809.305 1.66.456 2.522.456 2.04 0 3.97-.775 5.414-2.173 1.444-1.397 2.25-3.32 2.25-5.354 0-.954-.178-1.897-.529-2.8-.35-.904-.868-1.738-1.537-2.458-.669-.72-1.464-1.286-2.34-1.685-.876-.4-1.82-.603-2.788-.603z" />
          </svg>
        </a>

        <footer className="py-8 px-4 text-center text-sm" style={{ backgroundColor: '#051e57', color: 'white' }}><p>{content.footer}</p></footer>
      </div>
    );
  }

  // Página principal
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold" style={{ color: '#051e57' }}>GAMA</div>
            <span className="text-sm" style={{ color: '#b38d47' }}>Asesores</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {Object.entries(content.nav).map(([key, val]) => (
              <button key={key} onClick={() => { setCurrentPage(key); setIsMenuOpen(false); }} className="text-sm font-medium hover:text-blue-700">{val}</button>
            ))}
            <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="flex items-center gap-1 px-3 py-1 rounded border" style={{ borderColor: '#051e57', color: '#051e57' }}>
              <Globe size={16} />{language === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="text-sm font-medium" style={{ color: '#051e57' }}>{language === 'es' ? 'EN' : 'ES'}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t p-4 space-y-3">
            {Object.entries(content.nav).map(([key, val]) => (<button key={key} onClick={() => { setCurrentPage(key); setIsMenuOpen(false); }} className="block w-full text-left text-sm font-medium py-2">{val}</button>))}
          </div>
        )}
      </nav>

      <section id="inicio" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#051e57' }}>{content.hero.title}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{content.hero.subtitle}</p>
          <button onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 text-white font-semibold rounded-lg" style={{ backgroundColor: '#b38d47' }}>{content.hero.cta}</button>
        </div>
      </section>

      <section id="servicios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#051e57' }}>{content.services.title}</h2>
          <p className="text-center text-gray-600 mb-12">{content.services.subtitle}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {content.services.items.map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <CheckCircle2 size={24} style={{ color: '#b38d47' }} className="mb-2" />
                <h3 className="font-bold text-lg mb-2" style={{ color: '#051e57' }}>{service.name}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#051e57' }}>{content.why.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.why.items.map((item, idx) => (
              <div key={idx} className="border-l-4 pl-6" style={{ borderColor: '#b38d47' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#051e57' }}>{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#051e57' }}>{content.contact.title}</h2>
          <p className="text-center text-gray-600 mb-12">{content.contact.subtitle}</p>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#051e57' }}>{content.contact.name}</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#051e57' }}>{content.contact.email}</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#051e57' }}>{content.contact.company}</label>
              <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#051e57' }}>{content.contact.message}</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32" />
            </div>
            <button type="submit" className="w-full py-3 text-white font-semibold rounded-lg" style={{ backgroundColor: '#b38d47' }}>{content.contact.send}</button>
          </form>
        </div>
      </section>

      <a href="https://wa.me/50688969883?text=Hola%20GAMA%20Asesores,%20me%20interesa%20solicitar%20un%20presupuesto" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-40 flex items-center justify-center" style={{ width: '50px', height: '50px' }}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.26-1.022 1.024-1.756 2.12-2.26 3.359a9.9 9.9 0 00-1.271 3.999c-.108.816-.073 1.63.1 2.431.174.801.48 1.555.923 2.236.443.681 1.006 1.289 1.687 1.815.68.526 1.479.938 2.289 1.243.809.305 1.66.456 2.522.456 2.04 0 3.97-.775 5.414-2.173 1.444-1.397 2.25-3.32 2.25-5.354 0-.954-.178-1.897-.529-2.8-.35-.904-.868-1.738-1.537-2.458-.669-.72-1.464-1.286-2.34-1.685-.876-.4-1.82-.603-2.788-.603z" />
        </svg>
      </a>

      <footer className="py-8 px-4 text-center text-sm" style={{ backgroundColor: '#051e57', color: 'white' }}><p>{content.footer}</p></footer>
    </div>
  );
}
