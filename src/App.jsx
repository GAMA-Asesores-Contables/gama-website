import { useState, useEffect, useRef } from "react";

/* ─────────────── BRAND TOKENS ─────────────── */
const C = {
  navy:    "#051e57",
  navyDk:  "#03122e",
  navyLt:  "#0a2d7a",
  gold:    "#b38d47",
  goldLt:  "#d4aa65",
  yellow:  "#f2e485",
  white:   "#ffffff",
  gray50:  "#f8f7f4",
  gray100: "#eeebe3",
  gray400: "#9a9280",
  gray700: "#3d3830",
};

/* ─────────────── STYLES HELPERS ─────────────── */
const btn = {
  primary: {
    background: `linear-gradient(135deg, ${C.gold}, ${C.goldLt})`,
    color: C.navy,
    fontWeight: 700,
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "0.08em",
    fontSize: "0.82rem",
    padding: "14px 34px",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "opacity .2s, transform .2s",
  },
  outline: {
    background: "transparent",
    color: C.gold,
    fontWeight: 700,
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "0.08em",
    fontSize: "0.82rem",
    padding: "13px 33px",
    border: `1.5px solid ${C.gold}`,
    borderRadius: "2px",
    cursor: "pointer",
    textTransform: "uppercase",
    transition: "background .2s, color .2s",
  },
};

/* ─────────────── ICON SVGs ─────────────── */
const icons = {
  niif: (
    <svg viewBox="0 0 40 40" fill="none" style={{width:40,height:40}}>
      <rect x="4" y="6" width="24" height="28" rx="2" stroke={C.gold} strokeWidth="1.8"/>
      <line x1="10" y1="14" x2="22" y2="14" stroke={C.gold} strokeWidth="1.5"/>
      <line x1="10" y1="19" x2="22" y2="19" stroke={C.gold} strokeWidth="1.5"/>
      <line x1="10" y1="24" x2="18" y2="24" stroke={C.gold} strokeWidth="1.5"/>
      <polyline points="28,20 33,26 38,16" stroke={C.yellow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  fiscal: (
    <svg viewBox="0 0 40 40" fill="none" style={{width:40,height:40}}>
      <rect x="6" y="4" width="28" height="32" rx="2" stroke={C.gold} strokeWidth="1.8"/>
      <line x1="13" y1="13" x2="27" y2="13" stroke={C.gold} strokeWidth="1.5"/>
      <line x1="13" y1="19" x2="27" y2="19" stroke={C.gold} strokeWidth="1.5"/>
      <line x1="13" y1="25" x2="21" y2="25" stroke={C.gold} strokeWidth="1.5"/>
      <circle cx="30" cy="30" r="7" fill={C.navyDk} stroke={C.yellow} strokeWidth="1.5"/>
      <line x1="30" y1="27" x2="30" y2="30" stroke={C.yellow} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="30" cy="32.5" r="0.8" fill={C.yellow}/>
    </svg>
  ),
  audit: (
    <svg viewBox="0 0 40 40" fill="none" style={{width:40,height:40}}>
      <circle cx="18" cy="18" r="12" stroke={C.gold} strokeWidth="1.8"/>
      <polyline points="14,18 17,22 23,13" stroke={C.yellow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="27" y1="27" x2="36" y2="36" stroke={C.gold} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  outsourcing: (
    <svg viewBox="0 0 40 40" fill="none" style={{width:40,height:40}}>
      <circle cx="13" cy="13" r="6" stroke={C.gold} strokeWidth="1.8"/>
      <circle cx="27" cy="13" r="6" stroke={C.gold} strokeWidth="1.8"/>
      <path d="M6 34c0-5 3-9 7-9h14c4 0 7 4 7 9" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="20" y1="22" x2="20" y2="30" stroke={C.yellow} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="26" x2="24" y2="26" stroke={C.yellow} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  projection: (
    <svg viewBox="0 0 40 40" fill="none" style={{width:40,height:40}}>
      <polyline points="4,32 12,20 20,24 30,10 36,14" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="30,10 36,10 36,16" stroke={C.yellow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="4" y1="36" x2="36" y2="36" stroke={C.gray400} strokeWidth="1.2"/>
    </svg>
  ),
  society: (
    <svg viewBox="0 0 40 40" fill="none" style={{width:40,height:40}}>
      <rect x="8" y="16" width="24" height="20" rx="1" stroke={C.gold} strokeWidth="1.8"/>
      <path d="M14 16v-4a6 6 0 0 1 12 0v4" stroke={C.gold} strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="16" y="24" width="8" height="12" rx="1" stroke={C.yellow} strokeWidth="1.5"/>
    </svg>
  ),
};

/* ─────────────── CONTENT DATA ─────────────── */
const DATA = {
  es: {
    nav: {
      links: ["Inicio","Servicios","Nosotros","Blog","Contacto"],
      cta: "Presupuesto",
    },
    hero: {
      badge: "Firma especializada · Costa Rica",
      title: "Asesoría Contable,\nTributaria y Financiera",
      subtitle: "Soluciones integrales para empresas que buscan crecer con seguridad financiera y cumplimiento normativo.",
      cta: "Solicitar Presupuesto",
      ctaSecondary: "Ver Servicios",
    },
    services: {
      label: "Servicios Profesionales",
      title: "Soluciones a la Medida de su Empresa",
      items: [
        {
          icon: icons.niif,
          title: "NIIF para PYMES",
          short: "Preparación e implementación de estados financieros bajo estándares internacionales.",
          detail: `Las NIIF para PYMES son la norma obligatoria en Costa Rica para la presentación de estados financieros. En GAMA Asesores acompañamos el proceso completo desde el diagnóstico inicial hasta la implementación total.

Incluye diagnóstico de brechas (gap analysis), diseño de nuevas políticas contables, elaboración de estados financieros comparativos y capacitación al equipo. Nos aseguramos de que su empresa cumpla con Colegio de Contadores y requisitos de entidades financieras.`,
        },
        {
          icon: icons.fiscal,
          title: "Declaraciones Fiscales",
          short: "Gestión mensual y anual de sus obligaciones ante TRIBU-CR y la DGT.",
          detail: `El cumplimiento tributario es fundamental para cualquier empresa en Costa Rica. Gestionamos la totalidad de sus declaraciones fiscales garantizando puntualidad, exactitud y cumplimiento normativo.

Incluye declaraciones mensuales de IVA, renta anual (Formulario 2600), retenciones, declaraciones especiales y análisis de optimización fiscal legal. Atendemos requerimientos de Hacienda y representamos a su empresa ante auditorías tributarias.`,
        },
        {
          icon: icons.audit,
          title: "Auditoría y Aseguramiento",
          short: "Informes técnicos independientes y certificaciones CPA bajo Ley N.º 7527.",
          detail: `Las auditorías y certificaciones son herramientas para validar la información financiera ante bancos, inversionistas o autoridades reguladoras. Ofrecemos servicios de auditoría integral bajo la legislación costarricense vigente.

Incluye auditorías financieras independientes, certificaciones de ingresos, informes de aseguramiento para entidades bancarias, revisión analítica de estados financieros y dictámenes profesionales independientes.`,
        },
        {
          icon: icons.outsourcing,
          title: "Outsourcing Contable",
          short: "Gestión integral de procesos contables y administrativos sin aumentar su nómina.",
          detail: `El outsourcing contable es la solución para optimizar procesos sin incrementar costos fijos. GAMA Asesores asume la responsabilidad total de la contabilidad, liberándole para enfocarse en el crecimiento del negocio.

Incluye registro contable diario, conciliaciones bancarias, cuentas por cobrar y pagar, gestión de planilla ante CCSS, reportes financieros mensuales con análisis de variaciones, y apoyo en trámites administrativos.`,
        },
        {
          icon: icons.projection,
          title: "Proyecciones Financieras",
          short: "Análisis, flujos de caja y escenarios para decisiones estratégicas fundamentadas.",
          detail: `La planificación financiera es la brújula del crecimiento empresarial. Elaboramos proyecciones realistas basadas en datos históricos y supuestos técnicamente fundamentados para tomar decisiones con confianza.

Incluye análisis histórico de desempeño, proyecciones de ingresos y gastos, flujos de caja proyectados, análisis de escenarios (pesimista, base, optimista), identificación de puntos de equilibrio y recomendaciones estratégicas.`,
        },
        {
          icon: icons.society,
          title: "Constitución Societaria",
          short: "Asesoría legal y administrativa en la conformación y registro de empresas.",
          detail: `Iniciar una empresa en Costa Rica requiere cumplir múltiples requisitos legales y administrativos. Acompañamos el proceso completo desde la planificación hasta la operación, asegurando constitución correcta y conforme a la ley.

Incluye asesoría en la estructura societaria más conveniente, inscripción en Registro Público, cédula jurídica, registro tributario ante DGT, cumplimiento de regulaciones sectoriales y orientación en obligaciones ante CCSS, CAJA y Municipalidad.`,
        },
      ],
    },
    why: {
      label: "¿Por qué elegirnos?",
      title: "Compromiso con la Excelencia",
      items: [
        {
          num: "01",
          title: "Experiencia Técnica",
          text: "Más de 10 años en el mercado costarricense con dominio profundo de NIIF para PYMES, tributación actualizada y regulaciones locales vigentes. Capacitación continua en cambios normativos.",
        },
        {
          num: "02",
          title: "Atención Personalizada",
          text: "No creemos en soluciones genéricas. Nos tomamos el tiempo necesario para entender su negocio, industria y metas financieras, diseñando soluciones a la medida de su realidad empresarial.",
        },
        {
          num: "03",
          title: "Bilingüe · ES / EN",
          text: "Atención profesional completa en español e inglés. Facilitamos comunicación directa con clientes nacionales e internacionales y preparamos documentación para ambas audiencias.",
        },
        {
          num: "04",
          title: "Disponibilidad 360°",
          text: "Presencia en Barranca y Santa Teresa con equipo virtual para toda Costa Rica. Flexibilidad para trabajo presencial o remoto, siempre con la misma calidad de servicio.",
        },
      ],
    },
    about: {
      label: "Nosotros",
      title: "GAMA Asesores Contables",
      body: `GAMA Asesores es una firma especializada en servicios contables, financieros, tributarios y de consultoría empresarial. Combinamos experiencia profesional, análisis financiero riguroso y conocimiento profundo de la normativa costarricense para apoyar la toma de decisiones empresariales.

Nuestro nombre, GAMA, representa el espectro completo de soluciones que ofrecemos: desde gestión administrativa hasta modelamiento financiero avanzado. No somos solo contadores; somos socios estratégicos en el crecimiento de su empresa.`,
      cpa: {
        name: "CPA Gustavo Monge A.",
        role: "Contador Público Autorizado · Profesor Universitario",
        bio: `Contador Público Autorizado en Costa Rica con amplia experiencia en asesoría contable, financiera y tributaria para empresas de distintos sectores, especialmente servicios, turismo y bienes raíces.

Me he especializado en la correcta aplicación de las NIIF para PYMES y en el cumplimiento de obligaciones fiscales ante la Administración Tributaria, brindando acompañamiento integral en preparación de estados financieros, certificaciones CPA e informes de aseguramiento.

Adicionalmente me desempeño como docente universitario en contabilidad, costos y sistemas de información contable.`,
      },
      values: [
        { title: "Integridad", text: "Honestidad absoluta respetando normas, leyes y principios éticos en cada actuación." },
        { title: "Transparencia", text: "Comunicación clara, directa y sin tecnicismos innecesarios con cada cliente." },
        { title: "Excelencia", text: "Actualización constante en normas internacionales y mejores prácticas contables." },
        { title: "Resultados", text: "Soluciones que generan valor real y medible para la empresa del cliente." },
      ],
    },
    blog: {
      label: "Blog Tributario",
      title: "Información Fiscal Actualizada",
      subtitle: "Análisis profesional sobre normativa costarricense para tomar mejores decisiones.",
      readMore: "Leer artículo →",
      back: "← Volver al Blog",
      articles: [
        {
          id: 1,
          category: "TRIBU-CR",
          date: "10 de mayo, 2026",
          title: "TRIBU-CR: Guía completa para la tributación electrónica 2026",
          summary: "Todo lo que necesita saber sobre el sistema obligatorio de declaración electrónica: plazos, requisitos técnicos, errores comunes y cómo evitar sanciones.",
          content: `TRIBU-CR (Sistema de Tributación Electrónica de Costa Rica) es la plataforma obligatoria mediante la cual todas las empresas deben presentar sus declaraciones fiscales ante la Dirección General de Tributación (DGT).

## ¿Qué es TRIBU-CR?

Desde 2018, TRIBU-CR reemplazó los formatos en papel y modernizó el cumplimiento tributario. Es obligatorio para todas las personas jurídicas, personas físicas con actividades comerciales, y organizaciones que generan ingresos.

## Plazos según tipo de contribuyente

Los contribuyentes normales presentan dentro de los 15 días posteriores al cierre del mes fiscal. Los grandes contribuyentes siguen un cronograma específico publicado por la DGT. Los contribuyentes del régimen simplificado tienen plazos trimestrales.

El incumplimiento de plazos genera intereses (1% mensual) y multas sobre el tributo adeudado.

## Requisitos técnicos

Para operar en TRIBU-CR necesita un certificado digital de la ACCV (Autoridad Certificadora de Costa Rica), acceso a internet confiable, software contable compatible con la plataforma, y credenciales de usuario registradas.

## Paso a paso para su declaración

1. Verificar que su certificado digital esté vigente
2. Preparar información fiscal del período (ingresos, gastos, retenciones)
3. Generar el archivo en su sistema contable
4. Firmar digitalmente con su certificado
5. Transmitir a TRIBU-CR y guardar el comprobante de recibo

## Errores comunes a evitar

El error más frecuente es presentar con certificado vencido, lo que genera rechazo automático. También son comunes las inconsistencias entre datos declarados y registros bancarios, y no conservar los comprobantes de transmisión.

## Sanciones por incumplimiento

La mora genera multa del 1% mensual sobre el impuesto. La omisión de declaración puede generar multas de hasta el 50% del tributo adeudado, más intereses. En casos graves y reiterados, la DGT puede ordenar clausura del negocio.

En GAMA Asesores gestionamos integralmente su cumplimiento en TRIBU-CR para que usted se enfoque en su negocio.`,
        },
        {
          id: 2,
          category: "IVA",
          date: "8 de mayo, 2026",
          title: "IVA en Costa Rica: Declaración, cálculo y obligaciones actualizadas",
          summary: "Porcentajes vigentes, exenciones, cálculo de débito y crédito fiscal, y cómo presentar su declaración mensual correctamente ante la Administración Tributaria.",
          content: `El Impuesto al Valor Agregado (IVA) es la obligación fiscal de mayor recaudación en Costa Rica. Aunque es un impuesto que paga el consumidor final, las empresas son responsables de recaudarlo y declararlo correctamente.

## Tasas vigentes de IVA

La tasa general es 13%, aplicable a la mayoría de bienes y servicios. Existe una tasa reducida del 4% para medicamentos, algunos alimentos básicos y productos agrícolas. Ciertas operaciones especiales tienen tasa del 1%.

## Operaciones exentas

No todas las operaciones pagan IVA. Están exentos: servicios de educación de instituciones autorizadas, servicios médicos y odontológicos, servicios financieros (comisiones bancarias, seguros), arrendamiento de vivienda habitual, y exportaciones de bienes y servicios.

## Cómo funciona el mecanismo de débito y crédito

El IVA Débito es el impuesto que cobra a sus clientes (13% sobre ventas gravadas). El IVA Crédito es el impuesto que usted pagó al comprar materiales o servicios para su negocio, respaldado con factura. La diferencia es el IVA a pagar al Estado.

Si su crédito supera el débito, tiene un saldo a favor que puede trasladar o solicitar como devolución.

## Declaración mensual: proceso

Debe presentar su declaración antes del día 15 del mes siguiente al período declarado. Requiere compilar ventas (gravadas, exentas y no sujetas), compras con factura válida, y calcular la diferencia. La presentación se hace en TRIBU-CR.

## Errores que generan multas

No documentar compras con factura autorizada impide deducir el crédito fiscal. Presentar fuera de plazo genera multa del 1% mensual. Incluir gastos personales como deducibles de negocio es causal de ajuste tributario y sanción.

## Documentación obligatoria

Toda compra que genere crédito fiscal debe respaldarse con factura electrónica emitida correctamente por el proveedor, con los datos de su empresa incluidos. Guarde respaldos digitales por al menos 5 años.`,
        },
        {
          id: 3,
          category: "Renta",
          date: "5 de mayo, 2026",
          title: "Renta Capital vs. Renta Utilidades: Diferencias y estrategias fiscales",
          summary: "La clasificación correcta de sus ingresos puede significar diferencias significativas en su carga tributaria. Comprenda la distinción, tasas aplicables y estrategias de planificación legal.",
          content: `En Costa Rica coexisten dos categorías de renta con tratamientos tributarios distintos: la renta capital (15-18%) y la renta utilidades (hasta 25%). Clasificar incorrectamente sus ingresos puede costarle caro, o bien privarlo de una ventaja fiscal legítima.

## Qué es renta capital

Es la ganancia obtenida por la venta o disposición de activos (propiedades, acciones, bonos, vehículos) poseídos sin intención original de venderlos comercialmente. También incluye intereses y dividendos de inversiones financieras.

Ejemplos clásicos: vender un terreno comprado como inversión a largo plazo, cobrar intereses de certificados de depósito, o vender acciones de una empresa en la que invirtió.

## Qué es renta utilidades

Es la ganancia derivada de operaciones comerciales habituales: el resultado de su negocio después de deducir costos y gastos operacionales. Es la renta de su empresa o profesión.

Ejemplos: utilidades de su empresa comercial, ingresos como profesional independiente, ganancias de un negocio de servicios.

## Tasas tributarias: la diferencia clave

La renta capital tributa al 15% (y 18% desde 2026 para algunos activos). La renta utilidades tributa hasta el 25% para empresas, más las obligaciones de IVA y retenciones en la fuente.

Si obtiene ₡10M de ganancia, la diferencia entre clasificarla como capital (₡1.5M-1.8M) o utilidades (₡2.5M) puede ser sustancial.

## ¿Cómo se clasifica su ingreso?

La clasificación depende del carácter habitual y profesional de la actividad. Si vende un inmueble de forma aislada y no es parte de su negocio regular, es renta capital. Si compra y vende propiedades habitualmente como actividad principal, la DGT puede clasificarlo como renta utilidades.

## Estrategias de planificación legal

Documente siempre la intención al adquirir un activo. Si es inversión de largo plazo, deje registro. Planifique el timing de ventas con criterio fiscal. Consulte antes de vender activos significativos. La optimización debe hacerse antes de la transacción, no después.`,
        },
        {
          id: 4,
          category: "NIIF",
          date: "2 de mayo, 2026",
          title: "NIIF para PYMES: Implementación paso a paso en su empresa",
          summary: "Guía práctica del proceso completo de implementación, cambios principales versus contabilidad tradicional, cronograma realista e impacto en sus estados financieros.",
          content: `Las Normas Internacionales de Información Financiera para PYMES no son opcionales en Costa Rica. Son obligatorias desde 2011. Si aún opera bajo contabilidad tradicional, esta guía le muestra cómo hacer la transición correctamente.

## Por qué son obligatorias

El Colegio de Contadores Públicos de Costa Rica estableció en 2010 que todas las empresas deben preparar sus estados financieros bajo NIIF para PYMES. Los bancos, la SUGEF y otras entidades reguladoras requieren estados bajo este estándar para evaluar créditos y operaciones.

## Cambios principales versus contabilidad tradicional

En reconocimiento de ingresos, bajo NIIF el ingreso se registra cuando el cliente obtiene control del bien o servicio (no necesariamente cuando se emite la factura). Esto afecta especialmente a proyectos y contratos de largo plazo.

La depreciación de activos fijos debe basarse en la vida útil real de cada activo en su negocio específico, no en tasas genéricas. Un computador puede tener vida útil de 3 años en una empresa intensiva en tecnología, o 5 años en otra.

Los estados financieros bajo NIIF deben incluir: Estado de Situación Financiera, Estado de Resultados, Estado de Cambios en el Patrimonio, Estado de Flujos de Caja y Notas detalladas. El nivel de revelación requerido en las notas es significativamente mayor.

## Proceso de implementación en 7 pasos

El proceso recomendado incluye: diagnóstico de brechas (gap analysis), capacitación del equipo, diseño de nuevas políticas contables documentadas, conversión de saldos iniciales al 1 de enero, configuración del sistema contable, reprocesamiento de operaciones del período, y preparación de notas a los estados financieros.

## Cronograma realista

Con asesoría profesional dedicada, la implementación toma entre 4 y 6 semanas para una empresa mediana con registros ordenados. Empresas con registros desorganizados o activos fijos sin lista actualizada pueden requerir 10-12 semanas.

## Impacto en sus estados financieros

Es normal que el patrimonio cambie al implementar NIIF. Ajustes en depreciación, reconocimiento de provisiones y cambios en inventario generan diferencias. Informe a sus bancos y accionistas con anticipación para evitar interpretaciones erróneas de los cambios.`,
        },
        {
          id: 5,
          category: "Normativa",
          date: "28 de abril, 2026",
          title: "Reforma tributaria 2026: Cambios que impactan su negocio",
          summary: "Los cambios normativos de 2026 en Costa Rica introducen nuevas obligaciones de facturación, modificaciones en tasas, y el nuevo reporte de beneficiarios finales (CIF-BB). Conozca qué debe hacer.",
          content: `La reforma tributaria 2026 moderniza la administración tributaria costarricense y introduce obligaciones nuevas para todos los tamaños de empresa. Ignorarlas tiene costo directo en sanciones.

## Facturación electrónica 100% obligatoria

A partir del 30 de junio de 2026, toda factura debe ser electrónica y transmitida a TRIBU-CR dentro de 48 horas. Las pymes que aún usan facturas en papel tienen plazo hasta esa fecha para actualizarse.

Si no tiene software con facturación electrónica integrada, instálelo antes de mayo. La implementación requiere tiempo de configuración, capacitación y pruebas.

## Ampliación del régimen de monotributo

El techo de ingresos para acceder al monotributo aumenta de ₡30M a ₡50M anuales. Esto significa que más pequeñas empresas pueden acogerse a este régimen simplificado, con una sola cuota mensual que combina IVA y renta, y menor carga administrativa.

Evalúe si con sus ingresos actuales le conviene más el régimen simplificado que el régimen regular.

## Cambios en tasas de renta capital

La tasa de renta capital aumenta de 15% a 18% para ventas de activos. Se mantiene el 15% para activos poseídos más de 10 años (beneficio por inversión a largo plazo). Si tiene ventas de activos planeadas, analice el timing con su asesor.

## Nueva declaración de beneficiarios finales (CIF-BB)

Todas las sociedades mercantiles deben presentar anualmente la Declaración de Información sobre Beneficiarios Finales, identificando quiénes son los propietarios reales de la empresa. El primer vencimiento fue el 31 de marzo de 2026. La multa por incumplimiento va de ₡500.000 a ₡2.000.000.

## Aumento en retención de servicios

La retención sobre pagos a servicios profesionales (consultoría, diseño, servicios técnicos) aumenta del 10% al 12%. Si paga por estos servicios, debe retener y declarar el nuevo porcentaje.

## Incentivos tributarios para empresas verdes

Nuevos beneficios para empresas con certificación ambiental (ISO 14001 o equivalente): deducción adicional del 15% en inversiones ambientales y reducción de 2 puntos en la tasa de renta. Si su industria aplica, evalúe el retorno de obtener certificación.`,
        },
      ],
    },
    contact: {
      label: "Contacto",
      title: "¿Listo para Impulsar su Empresa?",
      subtitle: "Contáctenos para una consulta inicial sin costo.",
      form: {
        name: "Nombre completo",
        email: "Correo electrónico",
        phone: "Teléfono (opcional)",
        company: "Nombre de la empresa",
        service: "Servicio de interés",
        serviceOptions: ["Seleccione un servicio","NIIF para PYMES","Declaraciones Fiscales","Auditoría y Aseguramiento","Outsourcing Contable","Proyecciones Financieras","Constitución Societaria","Otro / Consulta general"],
        message: "¿En qué podemos ayudarle?",
        send: "Enviar Solicitud",
        sending: "Enviando...",
        success: "¡Mensaje enviado! Le contactaremos pronto.",
        error: "Hubo un error. Por favor intente nuevamente.",
      },
      contactInfo: {
        title: "Información de Contacto",
        phones: ["+506 8896-9883", "+506 6055-8006"],
        emails: ["gmongea@gamacpa-asesores.com", "gamasacsa@gmail.com"],
        officesTitle: "Nuestras Oficinas",
        offices: [
          { name: "Oficina Puntarenas", addr: "Residencial Bulevar del Sol, Etapa IV, Casa E-14, Barranca, Puntarenas" },
          { name: "Oficina Peninsular", addr: "Frente a la Plaza de Fútbol de Santa Teresa, 2° piso del Súper El Mango, Santa Teresa, Cóbano, Puntarenas" },
        ],
      },
    },
    footer: {
      tagline: "Contabilidad · Finanzas · Consultoría Empresarial",
      rights: "© 2026 GAMA Asesores Contables. Todos los derechos reservados.",
      links: ["Inicio","Servicios","Nosotros","Blog","Contacto"],
    },
  },

  /* ── ENGLISH ── */
  en: {
    nav: { links: ["Home","Services","About","Blog","Contact"], cta: "Get Quote" },
    hero: {
      badge: "Specialized firm · Costa Rica",
      title: "Accounting, Tax\n& Financial Advisory",
      subtitle: "Complete solutions for companies seeking growth with financial confidence and regulatory compliance.",
      cta: "Request a Quote",
      ctaSecondary: "View Services",
    },
    services: {
      label: "Professional Services",
      title: "Solutions Tailored to Your Company",
      items: [
        {
          icon: icons.niif,
          title: "IFRS for SMEs",
          short: "Preparation and implementation of financial statements under international standards.",
          detail: `IFRS for SMEs is the mandatory standard in Costa Rica for financial statement presentation. At GAMA Advisors we accompany the complete process from initial diagnosis to full implementation.

Includes gap analysis, design of new accounting policies, preparation of comparative financial statements, and team training. We ensure your company complies with the Accountants Association requirements and financial entity standards.`,
        },
        {
          icon: icons.fiscal,
          title: "Tax Declarations",
          short: "Monthly and annual management of your obligations with TRIBU-CR and the DGT.",
          detail: `Tax compliance is fundamental for any company in Costa Rica. We manage all your tax declarations guaranteeing timeliness, accuracy and regulatory compliance.

Includes monthly VAT declarations, annual income tax (Form 2600), withholdings, special declarations and legal tax optimization analysis. We attend Revenue requirements and represent your company in tax audits.`,
        },
        {
          icon: icons.audit,
          title: "Audit & Assurance",
          short: "Independent technical reports and CPA certifications under Law No. 7527.",
          detail: `Audits and certifications are tools to validate financial information to banks, investors or regulatory authorities. We offer comprehensive audit services under current Costa Rican legislation.

Includes independent financial audits, income certifications, assurance reports for banking entities, analytical review of financial statements and independent professional opinions.`,
        },
        {
          icon: icons.outsourcing,
          title: "Accounting Outsourcing",
          short: "Comprehensive accounting and administrative process management without increasing payroll.",
          detail: `Accounting outsourcing optimizes processes without increasing fixed costs. GAMA Advisors assumes total responsibility for your accounting, freeing you to focus on business growth.

Includes daily bookkeeping, monthly bank reconciliations, accounts receivable and payable, payroll and CCSS management, monthly financial reports with variance analysis, and administrative procedure support.`,
        },
        {
          icon: icons.projection,
          title: "Financial Projections",
          short: "Analysis, cash flows and scenarios for well-founded strategic decisions.",
          detail: `Financial planning is the compass of business growth. We prepare realistic projections based on historical data and technically sound assumptions so you can make decisions with confidence.

Includes historical performance analysis, income and expense projections, projected cash flows, scenario analysis (pessimistic, base, optimistic), break-even identification and strategic recommendations.`,
        },
        {
          icon: icons.society,
          title: "Company Formation",
          short: "Legal and administrative guidance in company formation and registration in Costa Rica.",
          detail: `Starting a company in Costa Rica requires multiple legal and administrative requirements. We accompany the complete process from planning to operation, ensuring correct and law-compliant formation.

Includes corporate structure advice, Public Registry registration, legal ID, DGT tax registration, sector-specific regulatory compliance, and guidance on CCSS, CAJA and Municipality obligations.`,
        },
      ],
    },
    why: {
      label: "Why Choose Us?",
      title: "Commitment to Excellence",
      items: [
        { num: "01", title: "Technical Expertise", text: "Over 10 years in the Costa Rican market with deep knowledge of IFRS for SMEs, updated taxation and current local regulations. Continuous training in regulatory changes." },
        { num: "02", title: "Personalized Service", text: "We don't believe in one-size-fits-all. We take the time to understand your business, industry and financial goals, designing solutions tailored to your business reality." },
        { num: "03", title: "Bilingual · ES / EN", text: "Full professional service in Spanish and English. We facilitate direct communication with local and international clients and prepare documentation for both audiences." },
        { num: "04", title: "360° Availability", text: "Offices in Barranca and Santa Teresa with a virtual team for all of Costa Rica. Flexibility for in-person or remote work, always with the same quality of service." },
      ],
    },
    about: {
      label: "About Us",
      title: "GAMA Advisors",
      body: `GAMA Advisors is a firm specialized in accounting, financial, tax and business consulting services. We combine professional experience, rigorous financial analysis and deep knowledge of Costa Rican regulations to support business decision-making.

Our name, GAMA, represents the complete spectrum of solutions we offer: from administrative management to advanced financial modeling. We are not just accountants; we are strategic partners in your company's growth.`,
      cpa: {
        name: "CPA Gustavo Monge A.",
        role: "Certified Public Accountant · University Professor",
        bio: `Certified Public Accountant in Costa Rica with extensive experience in accounting, financial and tax advisory for companies in various sectors, especially services, tourism and real estate.

I have specialized in the correct application of IFRS for SMEs and compliance with tax obligations before the Tax Administration, providing comprehensive support in financial statement preparation, CPA certifications and assurance reports.

I also serve as a university professor in accounting, costs and accounting information systems.`,
      },
      values: [
        { title: "Integrity", text: "Absolute honesty respecting standards, laws and ethical principles in every action." },
        { title: "Transparency", text: "Clear, direct communication without unnecessary jargon with every client." },
        { title: "Excellence", text: "Continuous update on international standards and best accounting practices." },
        { title: "Results", text: "Solutions that generate real, measurable value for the client's company." },
      ],
    },
    blog: {
      label: "Tax Blog",
      title: "Up-to-Date Fiscal Information",
      subtitle: "Professional analysis on Costa Rican regulations to make better decisions.",
      readMore: "Read article →",
      back: "← Back to Blog",
      articles: [
        {
          id:1, category:"TRIBU-CR", date:"May 10, 2026",
          title:"TRIBU-CR: Complete guide to electronic taxation 2026",
          summary:"Everything you need to know about the mandatory electronic declaration system: deadlines, technical requirements, common mistakes and how to avoid penalties.",
          content:`TRIBU-CR (Costa Rica's Electronic Taxation System) is the mandatory platform through which all companies must submit their tax returns to the General Tax Directorate (DGT) of Costa Rica.

## What is TRIBU-CR?

Since 2018, TRIBU-CR replaced paper formats and modernized tax compliance. It is mandatory for all legal entities, natural persons with commercial activities, and organizations that generate income. Exceptions are limited and require special processing with the DGT.

## Filing deadlines by type of contributor

Normal contributors must file within 15 days after the end of the tax month. Large contributors follow a specific schedule published by the DGT. Simplified regime contributors have quarterly deadlines.

Non-compliance generates interest (1% per month) and fines on the owed tax.

## Technical requirements

To operate in TRIBU-CR you need a digital certificate from the ACCV (Costa Rica Certification Authority), reliable internet access, accounting software compatible with the platform, and registered user credentials.

## Step by step for your declaration

1. Verify that your digital certificate is valid
2. Prepare tax information for the period (income, expenses, withholdings)
3. Generate the file in your accounting system
4. Digitally sign with your certificate
5. Transmit to TRIBU-CR and save the receipt

## Common mistakes to avoid

The most frequent error is filing with an expired certificate, which causes automatic rejection. Inconsistencies between declared data and bank records are also common, as is failing to keep transmission receipts.

## Penalties for non-compliance

Late filing generates a monthly penalty of 1% on the tax owed. Omission of declaration can generate fines of up to 50% of the owed tax, plus interest. In serious and repeated cases, the DGT can order business closure.

At GAMA Advisors we comprehensively manage your TRIBU-CR compliance so you can focus on your business.`,
        },
        {
          id:2, category:"VAT", date:"May 8, 2026",
          title:"VAT in Costa Rica: Declaration, calculation and updated obligations",
          summary:"Current rates, exemptions, calculation of tax debit and credit, and how to correctly submit your monthly declaration to the Tax Administration.",
          content:`Value Added Tax (VAT) is the highest-revenue tax obligation in Costa Rica. Although it is a tax paid by the final consumer, companies are responsible for collecting and correctly declaring it.

## Current VAT rates

The general rate is 13%, applicable to most goods and services. A reduced rate of 4% applies to medicines, some basic foods and agricultural products. Certain special operations have a rate of 1%.

## Exempt operations

Not all operations are subject to VAT. Exempt operations include: education services from authorized institutions, medical and dental services, financial services (bank fees, insurance), residential rental, and exports of goods and services.

## How the debit and credit mechanism works

VAT Debit is the tax you collect from your customers (13% on taxable sales). VAT Credit is the tax you paid when purchasing materials or services for your business, supported by valid invoice. The difference is the VAT to be paid to the State.

If your credit exceeds your debit, you have a balance in your favor that you can carry forward or request as a refund.

## Monthly declaration: process

You must file your declaration before the 15th of the month following the declared period. This requires compiling sales (taxable, exempt, and non-subject), purchases with valid invoice, and calculating the difference. Filing is done in TRIBU-CR.

## Errors that generate fines

Not documenting purchases with an authorized invoice prevents deducting the tax credit. Filing after the deadline generates a monthly fine of 1%. Including personal expenses as business deductions is grounds for tax adjustment and penalty.

## Mandatory documentation

Every purchase generating a tax credit must be supported by an electronic invoice correctly issued by the supplier, including your company's data. Keep digital backups for at least 5 years.`,
        },
        {
          id:3, category:"Income", date:"May 5, 2026",
          title:"Capital Income vs. Business Income: Differences and tax strategies",
          summary:"Correct classification of your income can make a significant difference in your tax burden. Understand the distinction, applicable rates and legal planning strategies.",
          content:`In Costa Rica, two categories of income coexist with different tax treatments: capital income (15-18%) and business income (up to 25%). Incorrectly classifying your income can be costly, or deprive you of a legitimate tax advantage.

## What is capital income?

It is the gain obtained from the sale or disposal of assets (properties, stocks, bonds, vehicles) held without original commercial intent to sell. It also includes interest and dividends from financial investments.

Classic examples: selling land purchased as a long-term investment, collecting interest on certificates of deposit, or selling shares in a company you invested in.

## What is business income?

It is the gain derived from regular commercial operations: the result of your business after deducting costs and operating expenses. It is the income from your company or profession.

Examples: profits from your commercial company, income as an independent professional, gains from a service business.

## Tax rates: the key difference

Capital income is taxed at 15% (and 18% from 2026 for some assets). Business income is taxed up to 25% for companies, plus VAT and withholding obligations.

If you obtain ₡10M in gain, the difference between classifying it as capital (₡1.5M-1.8M) or business (₡2.5M) can be substantial.

## How is your income classified?

Classification depends on the habitual and professional character of the activity. If you sell a property in isolation and it is not part of your regular business, it is capital income. If you buy and sell properties regularly as your main activity, the DGT may classify it as business income.

## Legal tax planning strategies

Always document your intention when acquiring an asset. If it is a long-term investment, keep a record. Plan the timing of sales with tax criteria. Consult before selling significant assets. Optimization must be done before the transaction, not after.`,
        },
        {
          id:4, category:"IFRS", date:"May 2, 2026",
          title:"IFRS for SMEs: Step-by-step implementation in your company",
          summary:"Practical guide to the complete implementation process, main changes versus traditional accounting, realistic timeline and impact on your financial statements.",
          content:`International Financial Reporting Standards for Small and Medium Entities (IFRS for SMEs) are not optional in Costa Rica. They have been mandatory since 2011. If you still operate under traditional accounting, this guide shows you how to make the transition correctly.

## Why are they mandatory?

The Costa Rican Public Accountants Association officially established in 2010 that all companies must prepare their financial statements under IFRS for SMEs. Banks, SUGEF and other regulatory entities require IFRS-compliant statements to evaluate credit applications and operations.

## Main changes versus traditional accounting

In revenue recognition, under IFRS income is recorded when the customer obtains control of the good or service (not necessarily when the invoice is issued). This especially affects long-term projects and contracts.

Depreciation of fixed assets must be based on the actual useful life of each asset in your specific business, not generic rates. A computer may have a 3-year useful life in a technology-intensive company, or 5 years in another.

Financial statements under IFRS must include: Statement of Financial Position, Income Statement, Statement of Changes in Equity, Cash Flow Statement, and detailed Notes. The level of disclosure required in the notes is significantly greater.

## Implementation process in 7 steps

The recommended process includes: gap analysis (identifying differences between your current situation and IFRS requirements), team training, design of new documented accounting policies, conversion of opening balances as of January 1, accounting system configuration, reprocessing of period operations, and preparation of notes to financial statements.

## Realistic timeline

With dedicated professional advice, implementation takes between 4 and 6 weeks for a medium-sized company with organized records. Companies with disorganized records or fixed assets without an updated list may require 10-12 weeks.

## Impact on your financial statements

It is normal for equity to change when implementing IFRS. Adjustments in depreciation, recognition of provisions, and inventory changes generate differences. Inform your banks and shareholders in advance to avoid misinterpretations of the changes.`,
        },
        {
          id:5, category:"Regulations", date:"April 28, 2026",
          title:"Tax reform 2026: Changes that impact your business",
          summary:"The 2026 regulatory changes in Costa Rica introduce new invoicing obligations, rate modifications, and the new beneficial owners report (CIF-BB). Know what you must do.",
          content:`The 2026 tax reform modernizes Costa Rican tax administration and introduces new obligations for companies of all sizes. Ignoring them has a direct cost in penalties.

## Electronic invoicing 100% mandatory

Starting June 30, 2026, every invoice must be electronic and transmitted to TRIBU-CR within 48 hours. SMEs still using paper invoices have until that date to update.

If you do not have software with integrated electronic invoicing, install it before May. Implementation requires configuration time, training and testing.

## Expansion of the single tax regime

The income ceiling to access the single tax regime increases from ₡30M to ₡50M annually. This means more small businesses can adopt this simplified regime, with a single monthly payment combining VAT and income tax, and lower administrative burden.

Evaluate whether, with your current income, the simplified regime is more efficient than the regular regime.

## Changes in capital income rates

The capital income rate increases from 15% to 18% for asset sales. The 15% rate is maintained for assets held more than 10 years (long-term investment benefit). If you have planned asset sales, analyze the timing with your advisor.

## New beneficial owners declaration (CIF-BB)

All business corporations must annually file the Declaration of Information on Final Beneficiaries, identifying who are the real owners of the company. The first deadline was March 31, 2026. The penalty for non-compliance ranges from ₡500,000 to ₡2,000,000.

## Increase in service withholding

The withholding rate on payments for professional services (consulting, design, technical services) increases from 10% to 12%. If you pay for these services, you must withhold and declare the new percentage.

## Tax incentives for green companies

New benefits for companies with environmental certification (ISO 14001 or equivalent): an additional deduction of 15% on environmental investments and a 2-point reduction in the income tax rate. If your industry qualifies, evaluate the return on obtaining certification.`,
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Ready to Grow Your Business?",
      subtitle: "Contact us for a free initial consultation.",
      form: {
        name: "Full name",
        email: "Email address",
        phone: "Phone (optional)",
        company: "Company name",
        service: "Service of interest",
        serviceOptions: ["Select a service","IFRS for SMEs","Tax Declarations","Audit & Assurance","Accounting Outsourcing","Financial Projections","Company Formation","Other / General inquiry"],
        message: "How can we help you?",
        send: "Send Request",
        sending: "Sending...",
        success: "Message sent! We will contact you shortly.",
        error: "An error occurred. Please try again.",
      },
      contactInfo: {
        title: "Contact Information",
        phones: ["+506 8896-9883", "+506 6055-8006"],
        emails: ["gmongea@gamacpa-asesores.com", "gamasacsa@gmail.com"],
        officesTitle: "Our Offices",
        offices: [
          { name: "Puntarenas Office", addr: "Residencial Bulevar del Sol, Etapa IV, Casa E-14, Barranca, Puntarenas" },
          { name: "Peninsula Office", addr: "Across from the Soccer Field in Santa Teresa, 2nd floor of Súper El Mango, Santa Teresa, Cóbano, Puntarenas" },
        ],
      },
    },
    footer: {
      tagline: "Accounting · Finance · Business Consulting",
      rights: "© 2026 GAMA Asesores Contables. All rights reserved.",
      links: ["Home","Services","About","Blog","Contact"],
    },
  },
};

/* ─────────────── COMPONENTS ─────────────── */

function Navbar({ lang, setLang, section, setSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = DATA[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: scrolled ? `rgba(3,18,46,0.98)` : `rgba(5,30,87,0.92)`,
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid rgba(179,141,71,${scrolled ? "0.25" : "0.15"})`,
    transition: "all 0.35s ease",
    padding: "0 5%",
  };

  const navSections = ["home","services","about","blog","contact"];

  const go = (s) => {
    setSection(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:84 }}>
        {/* Logo modificado (fondo navy, letras blancas+doradas) — ideal para navbar oscura */}
        <div onClick={() => go("home")} style={{ cursor:"pointer" }}>
          <img src="/logo_gama_asesores_modificado_web.jpg" alt="GAMA Asesores"
            style={{ height:70, objectFit:"contain", borderRadius:3, display:"block" }}
            onError={(e) => { e.target.src="/logo_gama_asesores_web.jpg"; }} />
        </div>

        {/* Desktop links */}
        <div style={{ display:"flex", alignItems:"center", gap:32 }} className="nav-desktop">
          {t.links.map((link, i) => (
            <button key={i}
              onClick={() => go(navSections[i])}
              style={{
                background:"none", border:"none", cursor:"pointer",
                color: section === navSections[i] ? C.gold : "rgba(255,255,255,0.85)",
                fontFamily:"'Montserrat',sans-serif", fontWeight:500,
                fontSize:"0.8rem", letterSpacing:"0.12em",
                textTransform:"uppercase", padding:"4px 0",
                borderBottom: section === navSections[i] ? `2px solid ${C.gold}` : "2px solid transparent",
                transition:"color .2s, border-color .2s",
              }}
            >{link}</button>
          ))}

          {/* Language switcher */}
          <div style={{ display:"flex", border:`1px solid rgba(179,141,71,0.4)`, borderRadius:2, overflow:"hidden" }}>
            {["es","en"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  padding:"5px 12px", border:"none", cursor:"pointer",
                  background: lang===l ? C.gold : "transparent",
                  color: lang===l ? C.navy : "rgba(255,255,255,0.7)",
                  fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem",
                  fontWeight:700, letterSpacing:"0.06em",
                  textTransform:"uppercase", transition:"all .2s",
                }}
              >{l.toUpperCase()}</button>
            ))}
          </div>

          <button onClick={() => go("contact")} style={{ ...btn.primary, padding:"10px 22px", fontSize:"0.75rem" }}>
            {t.cta}
          </button>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ display:"none", background:"none", border:"none", cursor:"pointer", color:C.white, fontSize:24 }}
          className="nav-mobile-btn"
        >☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:C.navy, padding:"16px 5% 24px", borderTop:`1px solid rgba(179,141,71,0.2)` }}>
          {t.links.map((link, i) => (
            <button key={i} onClick={() => go(navSections[i])}
              style={{ display:"block", width:"100%", background:"none", border:"none", cursor:"pointer",
                color: C.white, fontFamily:"'Montserrat',sans-serif", fontSize:"0.9rem",
                textAlign:"left", padding:"12px 0", letterSpacing:"0.08em",
                borderBottom:`1px solid rgba(255,255,255,0.08)`,
              }}
            >{link}</button>
          ))}
          <div style={{ display:"flex", gap:8, marginTop:16 }}>
            {["es","en"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ padding:"8px 20px", border:`1px solid ${C.gold}`, cursor:"pointer",
                  background: lang===l ? C.gold : "transparent",
                  color: lang===l ? C.navy : C.gold,
                  fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"0.8rem",
                }}
              >{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── HERO ── */
function HeroSection({ lang, setSection }) {
  const t = DATA[lang].hero;
  return (
    <section style={{ minHeight:"100vh", background:`linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 55%, ${C.navyLt} 100%)`, display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
      {/* Decorative bar motif */}
      <div style={{ position:"absolute", right:"-5%", top:"10%", opacity:0.06, transform:"rotate(-8deg)" }}>
        <svg viewBox="0 0 300 400" style={{ width:400, height:500 }}>
          <rect x="0" y="200" width="60" height="200" fill={C.gold}/>
          <rect x="80" y="130" width="60" height="270" fill={C.gold}/>
          <rect x="160" y="60" width="60" height="340" fill={C.gold}/>
          <polygon points="220,60 280,0 280,60" fill={C.gold}/>
        </svg>
      </div>
      <div style={{ position:"absolute", left:"0", bottom:"0", width:"100%", height:3, background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity:0.4 }} />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"120px 5% 80px", width:"100%" }}>
        {/* Badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:`1px solid rgba(179,141,71,0.4)`, padding:"6px 16px", borderRadius:2, marginBottom:32 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.gold }} />
          <span style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600 }}>{t.badge}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.6rem,5.5vw,4.2rem)", fontWeight:700, color:C.white, lineHeight:1.12, marginBottom:28, maxWidth:700, whiteSpace:"pre-line" }}>
          {t.title.split("\n")[0]}<br/>
          <span style={{ background:`linear-gradient(135deg, ${C.gold}, ${C.yellow})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            {t.title.split("\n").slice(1).join("\n")}
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{ color:"rgba(255,255,255,0.72)", fontFamily:"'Montserrat',sans-serif", fontSize:"1.05rem", lineHeight:1.75, maxWidth:580, marginBottom:48, fontWeight:300 }}>
          {t.subtitle}
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          <button onClick={() => setSection("contact")}
            style={btn.primary}
            onMouseEnter={e => e.target.style.opacity=0.88}
            onMouseLeave={e => e.target.style.opacity=1}
          >{t.cta}</button>
          <button onClick={() => setSection("services")}
            style={btn.outline}
            onMouseEnter={e => { e.target.style.background=C.gold; e.target.style.color=C.navy; }}
            onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color=C.gold; }}
          >{t.ctaSecondary}</button>
        </div>

        {/* Stats bar */}
        <div style={{ marginTop:72, paddingTop:40, borderTop:`1px solid rgba(255,255,255,0.1)`, display:"flex", gap:48, flexWrap:"wrap" }}>
          {[["10+", lang==="es"?"Años de experiencia":"Years of experience"], ["100+", lang==="es"?"Clientes satisfechos":"Satisfied clients"], ["6", lang==="es"?"Servicios especializados":"Specialized services"], ["2", lang==="es"?"Oficinas en CR":"Offices in CR"]].map(([n,l]) => (
            <div key={n}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.2rem", fontWeight:700, color:C.gold }}>{n}</div>
              <div style={{ color:"rgba(255,255,255,0.55)", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.06em", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
function ServicesSection({ lang }) {
  const t = DATA[lang].services;
  const [open, setOpen] = useState(null);

  return (
    <section id="services-section" style={{ padding:"100px 5%", background:"#f4f1eb" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ marginBottom:64, textAlign:"center" }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.5vw,2.8rem)", color:C.navy, fontWeight:700 }}>{t.title}</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:28 }}>
          {t.items.map((item, i) => (
            <div key={i}
              style={{
                background: open===i ? C.navy : C.white,
                borderRadius:2,
                borderLeft:`3px solid ${C.gold}`,
                boxShadow: open===i ? `0 12px 40px rgba(5,30,87,0.18)` : `0 2px 12px rgba(5,30,87,0.07)`,
                padding:"32px 28px", cursor:"pointer", transition:"all .25s",
                transform: open===i ? "translateY(-4px)" : "none",
              }}
              onClick={() => setOpen(open===i ? null : i)}
            >
              <div style={{ marginBottom:20 }}>{item.icon}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.18rem", fontWeight:700, color: open===i ? C.white : C.navy, marginBottom:10 }}>{item.title}</h3>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.87rem", color: open===i ? "rgba(255,255,255,0.72)" : "#4a4540", lineHeight:1.7, marginBottom:16 }}>{item.short}</p>

              {open===i && (
                <div style={{ borderTop:`1px solid rgba(179,141,71,0.3)`, paddingTop:16, marginTop:4 }}>
                  {item.detail.split("\n\n").map((para, j) => (
                    <p key={j} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.84rem", color:"rgba(255,255,255,0.70)", lineHeight:1.75, marginBottom:10 }}>{para}</p>
                  ))}
                </div>
              )}

              <div style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginTop:8 }}>
                {open===i ? (lang==="es"?"— Ver menos":"— Show less") : (lang==="es"?"Ver detalle +":"See details +")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WHY US ── */
function WhySection({ lang }) {
  const t = DATA[lang].why;
  return (
    <section style={{ padding:"100px 5%", background:C.navy }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ marginBottom:72, textAlign:"center" }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.5vw,2.8rem)", color:C.white, fontWeight:700 }}>{t.title}</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:40 }}>
          {t.items.map((item,i) => (
            <div key={i} style={{ borderTop:`2px solid rgba(179,141,71,0.3)`, paddingTop:28 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.8rem", fontWeight:700, color:"rgba(179,141,71,0.25)", marginBottom:16, lineHeight:1 }}>{item.num}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color:C.white, fontWeight:700, marginBottom:14 }}>{item.title}</h3>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.86rem", color:"rgba(255,255,255,0.62)", lineHeight:1.8 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div style={{ marginTop:72, height:1, background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity:0.4 }} />
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function AboutSection({ lang }) {
  const t = DATA[lang].about;

  // Equipo — 6 colaboradores placeholder (Gustavo los completará con fotos y datos reales)
  const team = [
    { initial:"A", name: lang==="es" ? "Nombre del Colaborador" : "Team Member Name", role: lang==="es" ? "Asistente Contable" : "Accounting Assistant", bio: lang==="es" ? "Información del colaborador próximamente." : "Team member information coming soon." },
    { initial:"B", name: lang==="es" ? "Nombre del Colaborador" : "Team Member Name", role: lang==="es" ? "Asistente Contable" : "Accounting Assistant", bio: lang==="es" ? "Información del colaborador próximamente." : "Team member information coming soon." },
    { initial:"C", name: lang==="es" ? "Nombre del Colaborador" : "Team Member Name", role: lang==="es" ? "Asistente Contable" : "Accounting Assistant", bio: lang==="es" ? "Información del colaborador próximamente." : "Team member information coming soon." },
    { initial:"D", name: lang==="es" ? "Nombre del Colaborador" : "Team Member Name", role: lang==="es" ? "Asistente Contable" : "Accounting Assistant", bio: lang==="es" ? "Información del colaborador próximamente." : "Team member information coming soon." },
    { initial:"E", name: lang==="es" ? "Nombre del Colaborador" : "Team Member Name", role: lang==="es" ? "Asistente Contable" : "Accounting Assistant", bio: lang==="es" ? "Información del colaborador próximamente." : "Team member information coming soon." },
    { initial:"F", name: lang==="es" ? "Nombre del Colaborador" : "Team Member Name", role: lang==="es" ? "Asistente Contable" : "Accounting Assistant", bio: lang==="es" ? "Información del colaborador próximamente." : "Team member information coming soon." },
  ];

  return (
    <>
      {/* ── SOBRE NOSOTROS ── */}
      <section id="about-section" style={{ padding:"100px 5%", background:C.white }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }} className="about-grid">
            {/* Left */}
            <div>
              <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3vw,2.6rem)", color:C.navy, fontWeight:700, marginBottom:28 }}>{t.title}</h2>
              {t.body.split("\n\n").map((p,i) => (
                <p key={i} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.92rem", color:"#3d3830", lineHeight:1.85, marginBottom:16 }}>{p}</p>
              ))}

              {/* Values */}
              <div style={{ marginTop:40, display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {t.values.map((v,i) => (
                  <div key={i} style={{ padding:"20px 18px", background:"#f4f1eb", borderLeft:`3px solid ${C.gold}` }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, color:C.navy, marginBottom:8, fontSize:"0.96rem" }}>{v.title}</div>
                    <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.82rem", color:"#4a4540", lineHeight:1.65 }}>{v.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CPA card */}
            <div>
              <div style={{ background:C.navy, padding:"40px 36px", borderRadius:2, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:"rgba(179,141,71,0.08)" }} />
                <div style={{ position:"absolute", bottom:0, left:0, height:3, width:"100%", background:`linear-gradient(90deg, ${C.gold}, transparent)` }} />
                <div style={{ width:80, height:80, borderRadius:"50%", background:`linear-gradient(135deg, ${C.gold}, ${C.navyLt})`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, border:`3px solid rgba(179,141,71,0.4)` }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.8rem", fontWeight:700, color:C.white }}>G</span>
                </div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", fontWeight:700, color:C.white, marginBottom:4 }}>{t.cpa.name}</div>
                <div style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.76rem", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:24, fontWeight:600 }}>{t.cpa.role}</div>
                {t.cpa.bio.split("\n\n").map((p,i) => (
                  <p key={i} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.85rem", color:"rgba(255,255,255,0.7)", lineHeight:1.8, marginBottom:12 }}>{p}</p>
                ))}
                <div style={{ marginTop:28, paddingTop:24, borderTop:`1px solid rgba(255,255,255,0.1)` }}>
                  <a href="mailto:gmongea@gamacpa-asesores.com" style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.78rem", textDecoration:"none", letterSpacing:"0.04em" }}>gmongea@gamacpa-asesores.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section style={{ padding:"80px 5% 100px", background:"#f4f1eb" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>
              {lang==="es" ? "Nuestro Equipo" : "Our Team"}
            </p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3vw,2.4rem)", color:C.navy, fontWeight:700 }}>
              {lang==="es" ? "Los Profesionales Detrás de GAMA" : "The Professionals Behind GAMA"}
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
            {team.map((m, i) => (
              <div key={i} style={{ background:C.white, borderRadius:2, overflow:"hidden", boxShadow:"0 2px 12px rgba(5,30,87,0.07)", borderTop:`3px solid ${C.gold}` }}>
                {/* Foto placeholder — reemplazar src con ruta de foto real */}
                <div style={{ height:200, background:`linear-gradient(135deg, ${C.navyDk}, ${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <div style={{ width:90, height:90, borderRadius:"50%", background:`linear-gradient(135deg, ${C.gold}, ${C.goldLt})`, display:"flex", alignItems:"center", justifyContent:"center", border:`3px solid rgba(255,255,255,0.2)` }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:700, color:C.white }}>{m.initial}</span>
                  </div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
                </div>
                {/* Info */}
                <div style={{ padding:"24px 22px" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.05rem", fontWeight:700, color:C.navy, marginBottom:4 }}>{m.name}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:C.gold, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>{m.role}</div>
                  <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.83rem", color:"#4a4540", lineHeight:1.7, fontStyle:"italic" }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign:"center", marginTop:40, fontFamily:"'Montserrat',sans-serif", fontSize:"0.82rem", color:"#9a9280", fontStyle:"italic" }}>
            {lang==="es"
              ? "* Información del equipo en actualización. Próximamente los perfiles completos de nuestros colaboradores."
              : "* Team information being updated. Full profiles of our collaborators coming soon."}
          </p>
        </div>
      </section>
    </>
  );
}

/* ── BLOG LIST ── */
function BlogList({ lang, onRead }) {
  const t = DATA[lang].blog;
  const arts = t.articles;

  return (
    <section id="blog-section" style={{ padding:"100px 5%", background:"#f4f1eb" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ marginBottom:64, textAlign:"center" }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.5vw,2.8rem)", color:C.navy, fontWeight:700, marginBottom:12 }}>{t.title}</h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif", color:"#6b6560", maxWidth:560, margin:"0 auto", lineHeight:1.7, fontSize:"0.92rem" }}>{t.subtitle}</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:28 }}>
          {arts.map((a,i) => (
            <article key={a.id} style={{ background:C.white, borderRadius:2, overflow:"hidden", boxShadow:"0 2px 16px rgba(5,30,87,0.08)", transition:"box-shadow .25s, transform .25s", cursor:"pointer", borderTop:`3px solid ${C.gold}` }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 32px rgba(5,30,87,0.14)"; e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow="0 2px 16px rgba(5,30,87,0.08)"; e.currentTarget.style.transform="none"; }}
              onClick={() => onRead(a)}
            >
              <div style={{ padding:"28px 28px 24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                  <span style={{ background:C.navy, color:C.yellow, fontFamily:"'Montserrat',sans-serif", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"3px 10px", borderRadius:2 }}>{a.category}</span>
                  <span style={{ color:"#9a9280", fontFamily:"'Montserrat',sans-serif", fontSize:"0.76rem" }}>{a.date}</span>
                </div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.12rem", fontWeight:700, color:C.navy, lineHeight:1.4, marginBottom:14 }}>{a.title}</h3>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.85rem", color:"#4a4540", lineHeight:1.75 }}>{a.summary}</p>
                <div style={{ marginTop:20, color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.06em" }}>{t.readMore}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <WhatsAppBtn />
    </section>
  );
}

/* ── ARTICLE VIEW ── */
function ArticleView({ article, lang, onBack }) {
  const t = DATA[lang].blog;

  const renderContent = (text) => {
    if (!text) return <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.95rem", color:"#3d3830", lineHeight:1.85 }}>Contenido en actualización.</p>;
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:C.navy, fontWeight:700, marginTop:36, marginBottom:14 }}>{line.slice(3)}</h2>;
      if (line.startsWith("# ")) return <h1 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.6rem", color:C.navy, fontWeight:700, marginBottom:16 }}>{line.slice(2)}</h1>;
      if (line.trim() === "") return <br key={i}/>;
      return <p key={i} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.93rem", color:"#3d3830", lineHeight:1.85, marginBottom:14 }}>{line}</p>;
    });
  };

  return (
    <section style={{ padding:"100px 5% 80px", background:C.white }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <button onClick={onBack}
          style={{ ...btn.outline, marginBottom:40, fontSize:"0.78rem", padding:"10px 24px", color:C.navy, borderColor:C.navy }}
          onMouseEnter={e => { e.target.style.background=C.navy; e.target.style.color=C.white; }}
          onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color=C.navy; }}
        >{t.back}</button>

        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          <span style={{ background:C.navy, color:C.yellow, fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 12px" }}>{article.category}</span>
          <span style={{ color:"#9a9280", fontFamily:"'Montserrat',sans-serif", fontSize:"0.82rem", alignSelf:"center" }}>{article.date}</span>
        </div>

        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:700, color:C.navy, lineHeight:1.28, marginBottom:32 }}>{article.title}</h1>

        <div style={{ background:"#f4f1eb", padding:"20px 24px", borderLeft:`3px solid ${C.gold}`, marginBottom:40 }}>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.93rem", color:"#3d3830", lineHeight:1.75, margin:0, fontStyle:"italic" }}>{article.summary}</p>
        </div>

        <div>{renderContent(article.content)}</div>

        <div style={{ marginTop:60, padding:"32px 28px", background:C.navy, textAlign:"center" }}>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", color:C.white, marginBottom:20 }}>
            {lang==="es" ? "¿Necesita asesoría sobre este tema?" : "Need advice on this topic?"}
          </p>
          <a href={`https://wa.me/50688969883?text=${encodeURIComponent(lang==="es"?"Hola GAMA Asesores, leí el artículo del blog y me gustaría consultar.":"Hello GAMA Advisors, I read the blog article and would like to inquire.")}`}
            target="_blank" rel="noopener noreferrer"
            style={{ ...btn.primary, display:"inline-block", textDecoration:"none" }}
          >{lang==="es" ? "Consultar por WhatsApp" : "Ask via WhatsApp"}</a>
        </div>
      </div>
      <WhatsAppBtn />
    </section>
  );
}

/* ── CONTACT ── */
function ContactSection({ lang }) {
  const t = DATA[lang].contact;
  const f = t.form;
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name:"", email:"", phone:"", company:"", service:"", message:"" });

  const set = (k,v) => setForm(p => ({...p,[k]:v}));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xeenzndr", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setForm({ name:"", email:"", phone:"", company:"", service:"", message:"" });
    } catch { setStatus("error"); }
  };

  const inputStyle = { width:"100%", padding:"12px 16px", border:`1px solid rgba(5,30,87,0.18)`, borderRadius:2, fontFamily:"'Montserrat',sans-serif", fontSize:"0.88rem", color:C.navy, background:C.white, boxSizing:"border-box", outline:"none", transition:"border-color .2s" };

  return (
    <section id="contact-section" style={{ padding:"100px 5%", background:"#f4f1eb" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ marginBottom:64, textAlign:"center" }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.5vw,2.8rem)", color:C.navy, fontWeight:700, marginBottom:12 }}>{t.title}</h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif", color:"#6b6560", fontSize:"0.92rem" }}>{t.subtitle}</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:60, alignItems:"start" }} className="contact-grid">
          {/* Form */}
          <div style={{ background:C.white, padding:"44px 40px", boxShadow:"0 4px 24px rgba(5,30,87,0.10)", borderTop:`3px solid ${C.gold}` }}>
            <form onSubmit={submit}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                <div>
                  <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", color:C.navy, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{f.name}</label>
                  <input style={{...inputStyle}} value={form.name} onChange={e=>set("name",e.target.value)} required onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="rgba(5,30,87,0.15)"}/>
                </div>
                <div>
                  <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", color:C.navy, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{f.email}</label>
                  <input type="email" style={{...inputStyle}} value={form.email} onChange={e=>set("email",e.target.value)} required onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="rgba(5,30,87,0.15)"}/>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                <div>
                  <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", color:C.navy, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{f.phone}</label>
                  <input style={{...inputStyle}} value={form.phone} onChange={e=>set("phone",e.target.value)} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="rgba(5,30,87,0.15)"}/>
                </div>
                <div>
                  <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", color:C.navy, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{f.company}</label>
                  <input style={{...inputStyle}} value={form.company} onChange={e=>set("company",e.target.value)} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="rgba(5,30,87,0.15)"}/>
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", color:C.navy, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{f.service}</label>
                <select style={{...inputStyle}} value={form.service} onChange={e=>set("service",e.target.value)} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="rgba(5,30,87,0.15)"}>
                  {f.serviceOptions.map((o,i) => <option key={i} value={i===0?"":o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:24 }}>
                <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", color:C.navy, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{f.message}</label>
                <textarea rows={5} style={{...inputStyle, resize:"vertical"}} value={form.message} onChange={e=>set("message",e.target.value)} required onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="rgba(5,30,87,0.15)"} />
              </div>

              {status==="ok" && <div style={{ background:"#e8f5e9", border:"1px solid #a5d6a7", padding:"12px 16px", borderRadius:2, fontFamily:"'Montserrat',sans-serif", fontSize:"0.86rem", color:"#2e7d32", marginBottom:16 }}>{f.success}</div>}
              {status==="error" && <div style={{ background:"#fce4ec", border:"1px solid #f48fb1", padding:"12px 16px", borderRadius:2, fontFamily:"'Montserrat',sans-serif", fontSize:"0.86rem", color:"#c62828", marginBottom:16 }}>{f.error}</div>}

              <button type="submit" disabled={status==="sending"} style={{...btn.primary, width:"100%", opacity:status==="sending"?0.7:1}}>
                {status==="sending" ? f.sending : f.send}
              </button>
            </form>
          </div>

          {/* Contacto info — nuevo formato */}
          <div>
            {/* Datos de contacto */}
            <div style={{ marginBottom:36 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", fontWeight:700, color:C.navy, marginBottom:4 }}>{t.contactInfo.title}</div>
              <div style={{ height:2, width:36, background:C.gold, marginBottom:20 }} />

              {/* Teléfonos */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", fontWeight:700, color:C.navy, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>
                  {lang==="es" ? "Teléfonos" : "Phone Numbers"}
                </div>
                {t.contactInfo.phones.map((p,i) => (
                  <div key={i} style={{ marginBottom:4 }}>
                    <a href={`tel:${p.replace(/\s/g,"")}`} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.95rem", color:C.gold, textDecoration:"none", fontWeight:600 }}>{p}</a>
                  </div>
                ))}
              </div>

              {/* Correos */}
              <div style={{ marginBottom:8 }}>
                <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", fontWeight:700, color:C.navy, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>
                  {lang==="es" ? "Correos Electrónicos" : "Email Addresses"}
                </div>
                {t.contactInfo.emails.map((e,i) => (
                  <div key={i} style={{ marginBottom:4 }}>
                    <a href={`mailto:${e}`} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.88rem", color:C.gold, textDecoration:"none" }}>{e}</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Divisor dorado */}
            <div style={{ height:1, background:`linear-gradient(90deg, ${C.gold}, transparent)`, marginBottom:32, opacity:0.5 }} />

            {/* Direcciones */}
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", fontWeight:700, color:C.navy, marginBottom:4 }}>{t.contactInfo.officesTitle}</div>
              <div style={{ height:2, width:36, background:C.gold, marginBottom:20 }} />
              {t.contactInfo.offices.map((o,i) => (
                <div key={i} style={{ marginBottom:20, paddingBottom:20, borderBottom: i<t.contactInfo.offices.length-1 ? `1px solid rgba(5,30,87,0.08)` : "none" }}>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.78rem", fontWeight:700, color:C.navy, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>{o.name}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.86rem", color:"#4a4540", lineHeight:1.7 }}>{o.addr}</div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/50688969883?text=Hola%20GAMA%20Asesores,%20me%20interesa%20solicitar%20un%20presupuesto"
              target="_blank" rel="noopener noreferrer"
              style={{ ...btn.primary, display:"flex", alignItems:"center", justifyContent:"center", gap:10, textDecoration:"none", textAlign:"center" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp · +506 8896-9883
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer({ lang, setSection }) {
  const t = DATA[lang].footer;
  const navSections = ["home","services","about","blog","contact"];
  return (
    <footer style={{ background:C.navyDk, padding:"60px 5% 32px", borderTop:`3px solid rgba(179,141,71,0.25)` }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"start", flexWrap:"wrap", gap:40, marginBottom:48 }}>
          <div style={{ maxWidth:280 }}>
            <img src="/logo_gama_asesores_modificado_web.jpg" alt="GAMA Asesores"
              style={{ height:70, objectFit:"contain", marginBottom:16, borderRadius:3 }}
              onError={(e) => { e.target.src="/logo_gama_asesores_web.jpg"; }} />
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.8rem", color:"rgba(255,255,255,0.45)", lineHeight:1.7 }}>{t.tagline}</p>
          </div>
          <div style={{ display:"flex", gap:48, flexWrap:"wrap" }}>
            <div>
              <div style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16 }}>
                {lang==="es"?"Navegación":"Navigation"}
              </div>
              {t.links.map((l,i) => (
                <button key={i} onClick={() => setSection(navSections[i])}
                  style={{ display:"block", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.55)", fontFamily:"'Montserrat',sans-serif", fontSize:"0.85rem", marginBottom:10, textAlign:"left", padding:0 }}
                  onMouseEnter={e=>e.target.style.color=C.gold}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}
                >{l}</button>
              ))}
            </div>
            <div>
              <div style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16 }}>
                Contacto
              </div>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.55)", lineHeight:2 }}>
                <a href="tel:+50688969883" style={{ display:"block", color:"rgba(255,255,255,0.55)", textDecoration:"none" }}>+506 8896-9883</a>
                <a href="mailto:gmongea@gamacpa-asesores.com" style={{ display:"block", color:"rgba(255,255,255,0.55)", textDecoration:"none" }}>gmongea@gamacpa-asesores.com</a>
                <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.78rem", marginTop:8 }}>Barranca & Santa Teresa, Puntarenas</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop:`1px solid rgba(255,255,255,0.08)`, paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.76rem", color:"rgba(255,255,255,0.3)" }}>{t.rights}</p>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.22)" }}>
            <a href="https://gamacpa-asesores.com" style={{ color:"rgba(179,141,71,0.4)", textDecoration:"none" }}>gamacpa-asesores.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── WHATSAPP BUTTON ── */
function WhatsAppBtn() {
  return (
    <a href="https://wa.me/50688969883?text=Hola%20GAMA%20Asesores,%20me%20interesa%20solicitar%20un%20presupuesto"
      target="_blank" rel="noopener noreferrer"
      style={{ position:"fixed", bottom:28, right:28, zIndex:999, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(37,211,102,0.4)", textDecoration:"none", transition:"transform .2s" }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" style={{width:28,height:28}}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

/* ─────────────── APP ─────────────── */
export default function App() {
  const [lang, setLang] = useState("es");
  const [section, setSection] = useState("home");
  const [article, setArticle] = useState(null);

  const renderSection = () => {
    if (section === "blog" && article) return <ArticleView article={article} lang={lang} onBack={() => setArticle(null)} />;
    switch(section) {
      case "home":     return <><HeroSection lang={lang} setSection={setSection}/><WhySection lang={lang}/></>;
      case "services": return <ServicesSection lang={lang}/>;
      case "about":    return <AboutSection lang={lang}/>;
      case "blog":     return <BlogList lang={lang} onRead={(a)=>{ setArticle(a); window.scrollTo({top:0,behavior:"smooth"}); }}/>;
      case "contact":  return <ContactSection lang={lang}/>;
      default:         return <HeroSection lang={lang} setSection={setSection}/>;
    }
  };

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { background:#f8f7f4; }
        @media(max-width:768px){
          .nav-desktop{display:none!important;}
          .nav-mobile-btn{display:flex!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .contact-grid{grid-template-columns:1fr!important;}
        }
        button:focus{outline:none;}
        a:focus{outline:none;}
      `}</style>

      <Navbar lang={lang} setLang={setLang} section={section} setSection={setSection}/>

      <main style={{ paddingTop: section === "home" ? 0 : 72 }}>
        {renderSection()}
      </main>

      <Footer lang={lang} setSection={(s)=>{ setSection(s); setArticle(null); window.scrollTo({top:0}); }}/>
      <WhatsAppBtn/>
    </>
  );
}
