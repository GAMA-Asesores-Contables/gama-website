import React, { useState } from 'react';
import { Menu, X, Send, ArrowRight, CheckCircle2, Globe } from 'lucide-react';

export default function GAMAWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('es');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

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
        subtitle: 'Tell us about your business and we\'ll contact you within 24 hours',
        name: 'Name', email: 'Email', company: 'Company', message: 'Message', send: 'Send'
      },
      footer: 'GAMA Asesores Contables © 2026. Accounting and Finance.'
    }
  };

  const content = t[language];

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
              <a key={key} href={`#${key}`} className="text-sm font-medium hover:text-blue-700">{val}</a>
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
            {Object.entries(content.nav).map(([key, val]) => (<a key={key} href={`#${key}`} className="block text-sm font-medium py-2" onClick={() => setIsMenuOpen(false)}>{val}</a>))}
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
