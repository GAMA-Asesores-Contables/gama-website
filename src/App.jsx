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
      links: ["Inicio","Servicios","Nosotros","Blog","Herramientas","Contacto"],
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
        {
          id:6, category:"Ganancias de Capital", date:"25 de abril, 2026",
          title:"Ganancias de Capital en Costa Rica: Aplicación, pago y beneficios fiscales",
          summary:"Todo sobre el impuesto de ganancias de capital: qué activos lo generan, cómo se calcula, cuándo y cómo se paga, y los beneficios fiscales disponibles para inversionistas a largo plazo.",
          content:`El impuesto sobre ganancias de capital en Costa Rica, regulado por la Ley del Impuesto sobre la Renta N.º 7092 y sus reformas, aplica cuando usted vende o transfiere activos que han aumentado de valor. Comprenderlo correctamente puede significar una diferencia importante en su carga tributaria.

## ¿Qué activos generan ganancias de capital?

Las ganancias de capital provienen principalmente de: venta de bienes inmuebles (terrenos, casas, apartamentos, locales comerciales), venta de acciones o participaciones en sociedades mercantiles, traspasos de vehículos con ganancia sobre el precio de compra, rendimientos de instrumentos financieros (bonos, fondos de inversión, certificados a plazo), y dividendos de empresas no sujetas a retención en la fuente.

## Tasa aplicable y base imponible

Desde la reforma de 2026, la tasa general es el 18% sobre la ganancia neta (diferencia entre precio de venta y costo de adquisición debidamente documentado). Se aplica una tasa preferencial del 15% para activos poseídos por más de 10 años, reconociendo la inversión a largo plazo.

La base imponible es la ganancia neta: precio de venta menos costo de adquisición, más gastos asociados a la venta que sean deducibles (honorarios notariales, comisiones de venta debidamente facturadas, mejoras capitalizadas documentadas).

## Cuándo y cómo se paga

El impuesto se declara y paga mediante el formulario específico de ganancias de capital, dentro del mes siguiente a la fecha de la transacción. No es un impuesto anual acumulado: cada transacción genera una obligación independiente.

Las notarías y registradores tienen obligación de informar a la DGT sobre traspasos de bienes inmuebles, por lo que las ventas son cruzadas automáticamente. No declarar una venta es de alto riesgo de detección.

## Beneficios fiscales disponibles

Costa Rica ofrece varios beneficios para inversionistas: la tasa preferencial del 15% para activos de largo plazo, la posibilidad de compensar pérdidas de capital con ganancias del mismo período, exención en la venta de casa de habitación principal bajo ciertas condiciones (consulte con su asesor los requisitos vigentes), y la posibilidad de diferir el impuesto en restructuraciones empresariales bajo fusiones o escisiones autorizadas.

## Errores más costosos

El principal error es no documentar el costo de adquisición original. Sin comprobante del precio de compra, la DGT puede considerar el costo como cero, aplicando el 18% sobre el precio de venta completo. Guarde escrituras, facturas y cualquier documento del costo original por tiempo indefinido.

Otro error frecuente es asumir que una venta hecha "en efectivo" o sin notario no genera obligación. Todos los traspasos registrales son reportados a la DGT independientemente del medio de pago.

En GAMA Asesores le ayudamos a planificar sus transacciones antes de que ocurran, no después.`,
        },
        {
          id:7, category:"Plataformas Digitales", date:"22 de abril, 2026",
          title:"Airbnb, Booking y HomeAway en Costa Rica: Impuestos y obligaciones del anfitrión",
          summary:"Si alquila propiedades a través de plataformas de hospedaje, tiene obligaciones tributarias específicas en Costa Rica. Conozca el IVA, el impuesto sobre la renta y los requisitos de facturación aplicables.",
          content:`El alquiler de inmuebles a través de plataformas digitales como Airbnb, Booking.com, HomeAway (ahora Vrbo) y similares genera obligaciones tributarias en Costa Rica que muchos anfitriones desconocen, con riesgo directo de sanciones y ajustes.

## Marco legal aplicable

La Ley del Impuesto sobre el Valor Agregado (N.º 9635) y la Ley del Impuesto sobre la Renta (N.º 7092) regulan estas actividades. Adicionalmente, la DGT emitió directrices específicas para plataformas digitales que establecen responsabilidades tanto para las plataformas como para los anfitriones.

## IVA: Impuesto al Valor Agregado

Los servicios de hospedaje, independientemente de si se ofrecen a través de plataformas digitales o directamente, están gravados con IVA en Costa Rica a la tasa del 13%. Esto significa que usted, como anfitrión, debe estar inscrito ante la DGT como contribuyente del IVA si sus ingresos por hospedaje superan los límites del régimen simplificado.

Importante: Airbnb y otras plataformas pueden retener y remitir el IVA directamente a la DGT en algunos casos, pero esto no exime al anfitrión de su obligación de inscripción y declaración. Verifique si la plataforma que utiliza tiene acuerdo con la DGT costarricense para retención en la fuente.

## Impuesto sobre la Renta

Los ingresos por alquiler de corto plazo (hospedaje) se clasifican como renta de actividad empresarial si se prestan de forma habitual y organizada, o como renta capital inmobiliario en casos de alquileres esporádicos.

Para la mayoría de anfitriones activos en plataformas, la DGT tiende a clasificarlos como actividad empresarial, lo que implica declaración mensual de IVA y declaración anual de renta con deducción de gastos operacionales (mantenimiento, comisiones de la plataforma, servicios, depreciación del inmueble).

## Facturación electrónica

Desde la entrada en vigencia de la obligatoriedad de facturación electrónica, los anfitriones deben emitir factura electrónica por cada hospedaje. Algunas plataformas ofrecen integración con el sistema de facturación costarricense, pero muchas no. En esos casos, el anfitrión debe emitir factura independientemente del comprobante de la plataforma.

## Gastos deducibles del hospedaje

Los anfitriones pueden deducir: comisión cobrada por la plataforma (Airbnb cobra entre 3% y 5% al anfitrión, que es gasto deducible), costos de limpieza y mantenimiento, servicios públicos (agua, luz, internet) proporcionales al uso turístico, depreciación del inmueble y mobiliario, seguros, y gastos de administración.

## Régimen simplificado: ¿aplica para usted?

Si sus ingresos anuales por hospedaje no superan el límite establecido para el régimen simplificado (actualizado anualmente), puede acogerse a este régimen y pagar una cuota mensual fija sin necesidad de declarar IVA por separado. Consulte los montos vigentes con su asesor tributario.

## Recomendaciones de GAMA Asesores

Inscríbase ante la DGT si aún no lo ha hecho. Emita factura electrónica por cada servicio de hospedaje. Registre todos los ingresos de la plataforma y conserve los estados de cuenta mensuales. Separe los gastos del inmueble de uso turístico versus uso personal. No espere a ser requerido por Hacienda; el cumplimiento proactivo siempre cuesta menos.`,
        },
        {
          id:8, category:"Empresas Nuevas", date:"18 de abril, 2026",
          title:"Obligaciones tributarias para empresas nuevas en Costa Rica: Guía del primer año",
          summary:"Si acaba de constituir su empresa, este artículo le explica todas las obligaciones tributarias que debe cumplir desde el primer mes: inscripciones, declaraciones, planilla y más.",
          content:`El primer año de una empresa en Costa Rica está lleno de obligaciones tributarias con plazos críticos. No cumplirlas desde el inicio genera multas y antecedentes que complican el crecimiento futuro.

## Primeros 30 días: inscripciones obligatorias

Dentro del primer mes de inicio de operaciones debe completar: inscripción ante la Dirección General de Tributación (DGT) como contribuyente del IVA y del Impuesto sobre la Renta, inscripción ante la Caja Costarricense de Seguro Social (CCSS) como patrono (si tiene empleados), registro de la razón social ante la Municipalidad del cantón donde opera (patente municipal), y apertura de cuenta bancaria empresarial.

La inscripción en la DGT se realiza en el portal ATV (Administración Tributaria Virtual) con la cédula jurídica de la sociedad.

## Obligaciones mensuales desde el primer mes

Desde el primer mes de operaciones debe declarar y pagar el IVA mensualmente (antes del día 15 del mes siguiente). Si tiene empleados, debe calcular y pagar la planilla de CCSS mensualmente (cuotas obrero-patronales). Debe emitir factura electrónica por cada venta o servicio desde el primer día de operaciones.

## Facturación electrónica: obligatoria desde el inicio

No existe período de gracia para la facturación electrónica. Desde el primer día de operaciones debe emitir facturas electrónicas autorizadas por la DGT. Para ello necesita registrarse como emisor en el ATV, adquirir un certificado digital de la ACCV, y contar con software de facturación compatible o usar el sistema Comprobantes Electrónicos gratuito de la DGT.

## Impuesto sobre la Renta: declaración anual

La declaración anual de renta (Formulario D-101) se presenta dentro de los dos meses y quince días después del cierre del período fiscal (para períodos que cierran el 31 de diciembre, el plazo es hasta el 15 de marzo del año siguiente).

En el primer año, aunque tenga pérdidas (lo cual es común), debe presentar la declaración. Las pérdidas del primer año pueden trasladarse a períodos siguientes para compensar utilidades futuras.

## Impuesto sobre sociedades

Todas las sociedades mercantiles inscritas en Costa Rica, independientemente de si operan o no, deben pagar el impuesto a las personas jurídicas anualmente. Para el período 2026, el monto varía según la actividad y el tamaño de la empresa. Su no pago puede generar limitaciones en trámites registrales.

## Declaración de beneficiarios finales (CIF-BB)

Las nuevas sociedades deben presentar la declaración de información sobre beneficiarios finales dentro de los primeros 20 días hábiles después de su inscripción en el Registro Nacional. Esta declaración identifica a los propietarios reales de la empresa y debe actualizarse anualmente.

## Errores del primer año más comunes

No inscribirse oportunamente en la DGT, no emitir factura electrónica desde el inicio, mezclar finanzas personales con las empresariales, no llevar contabilidad desde el primer mes, y no registrar adecuadamente los gastos (sin factura, no hay deducción) son los errores que más caro cuestan en el primer año.

En GAMA Asesores acompañamos empresas desde su constitución, asegurándonos de que arranquen correctamente desde el primer día.`,
        },
        {
          id:9, category:"Planilla y CCSS", date:"15 de abril, 2026",
          title:"Planilla y CCSS en Costa Rica: Obligaciones del empleador y cálculo correcto",
          summary:"Como empleador en Costa Rica, debe calcular y pagar correctamente las cargas sociales ante la CCSS. Comprenda los porcentajes, plazos, el cálculo de aguinaldo y las consecuencias del incumplimiento.",
          content:`Las obligaciones laborales y de seguridad social son de las más sensibles para cualquier empresa. El incumplimiento en el pago de la CCSS genera deudas que crecen con intereses y multas, y puede afectar gravemente la operación y reputación de su empresa.

## Estructura de la planilla: quién paga qué

En Costa Rica, las cargas sociales se dividen entre el empleador y el trabajador. El empleador paga sobre el salario bruto del trabajador los siguientes porcentajes aproximados: CCSS (enfermedad y maternidad): 9.25%, IVM (invalidez, vejez y muerte): 5.08%, Banco Popular: 0.50%, IMAS: 0.50%, INA: 1.50%, FODESAF: 0.50%, Fondo de Capitalización Laboral: 3.00%. Total patrono: aproximadamente 26.33%.

El trabajador también aporta de su salario: CCSS: 5.50%, IVM: 3.84%, Banco Popular: 1.00%. Total trabajador: aproximadamente 10.34%.

## Cómo calcular la planilla paso a paso

Primero determine el salario bruto de cada empleado (incluyendo horas extra, incentivos y cualquier remuneración regular). Calcule las deducciones del trabajador (10.34% sobre el salario bruto). Calcule la contribución patronal (26.33% sobre el salario bruto). El salario neto que recibe el empleado es el salario bruto menos las deducciones del trabajador. El costo total para el empleador es el salario bruto más la contribución patronal.

## Aguinaldo: obligatorio y con fecha fija

El aguinaldo es un derecho de todo trabajador en Costa Rica equivalente a un mes de salario (un doceavo del salario anual). Se calcula sobre todos los salarios ordinarios y extraordinarios recibidos entre el 1 de diciembre del año anterior y el 30 de noviembre del año en curso. El pago es obligatorio antes del 20 de diciembre. No tiene cargas sociales de CCSS, pero sí se incluye en el salario anual para el cálculo del impuesto sobre la renta del trabajador si supera los montos exentos.

## Plazos de pago a la CCSS

La planilla debe cancelarse mensualmente, dentro de los primeros 15 días calendario del mes siguiente al período trabajado. Pagos tardíos generan intereses del 1% mensual más multas. La CCSS tiene acceso a información bancaria y tributaria para detectar omisiones, por lo que reportar menos salarios de los reales es una práctica de alto riesgo legal.

## Consecuencias del incumplimiento

El no pago de cargas sociales puede resultar en: proceso judicial con embargo de cuentas bancarias y activos, imposibilidad de obtener certificados de estar al día (requeridos para contratos con el Estado y muchos bancos), responsabilidad personal de los representantes legales en casos graves, y cierre temporal de operaciones.

## Otros beneficios laborales obligatorios

Además de la planilla mensual, el empleador debe garantizar: vacaciones anuales (2 semanas mínimo por año trabajado), preaviso al desvincularse o desvincular al empleado, cesantía proporcional según tiempo laborado, y días feriados con salario.

La gestión correcta de la planilla no es solo cumplimiento legal: es la base de una relación laboral sana y sostenible.`,
        },
        {
          id:10, category:"Profesionales Independientes", date:"10 de abril, 2026",
          title:"Tributación para profesionales independientes en Costa Rica: Lo que debe saber",
          summary:"Médicos, abogados, ingenieros, contadores y otros profesionales que facturan independientemente tienen obligaciones específicas. Conozca sus obligaciones de IVA, renta, y cómo optimizar legalmente sus deducciones.",
          content:`Miles de profesionales en Costa Rica prestan servicios de forma independiente sin entender completamente sus obligaciones tributarias. Este desconocimiento genera tanto incumplimientos como deducciones no aprovechadas.

## ¿Quién es profesional independiente ante la DGT?

Es toda persona física que presta servicios basados en conocimiento especializado (salud, derecho, ingeniería, arquitectura, contaduría, consultoría, educación, tecnología, etc.) sin una relación de dependencia laboral con quien le paga. Si emite facturas por sus servicios y no tiene un patrono que le deduzca CCSS del salario, es un profesional independiente con obligaciones tributarias propias.

## Inscripción obligatoria ante la DGT

Todo profesional independiente con ingresos regulares debe inscribirse ante la Dirección General de Tributación. La inscripción determina sus obligaciones específicas: si debe declarar IVA mensualmente o puede acogerse al régimen simplificado, y cómo declarará su impuesto sobre la renta anualmente.

## IVA para profesionales: 13% sobre sus servicios

Los servicios profesionales en general están gravados con IVA al 13%. Esto significa que cuando factura sus honorarios, debe incluir el 13% de IVA que luego declara y paga a Hacienda. Al mismo tiempo, el IVA que usted paga en sus compras y gastos relacionados con su actividad (equipo de oficina, software, papelería, servicios profesionales subcontratados) genera crédito fiscal que reduce su IVA a pagar.

Existen excepciones: algunos servicios de salud están exentos. Consulte si su especialidad específica aplica a alguna exención.

## Retención en la fuente: ¿qué pasa cuando le pagan?

Cuando una empresa le paga por sus servicios, está obligada a retenerle el 12% del monto bruto como retención del impuesto sobre la renta (aumentado en la reforma 2026). Esta retención no es el impuesto final; es un anticipo que se acredita en su declaración anual. Si al final del año pagó más retenciones de las que le corresponden en impuesto, tiene derecho a devolución.

## Impuesto sobre la Renta: cómo funciona para independientes

Los profesionales independientes declaran su renta anualmente sumando todos sus ingresos y deduciendo todos sus gastos relacionados con la actividad. La diferencia es la base imponible sobre la que aplican las tasas progresivas: desde un 0% para los primeros tramos hasta el 25% para ingresos altos (los tramos se actualizan anualmente por la DGT).

## Gastos deducibles que muchos profesionales no aprovechan

Pueden deducirse: arrendamiento de oficina o consultorio (proporcional al uso profesional), equipo de cómputo y tecnología, software y suscripciones profesionales, libros, cursos y capacitaciones relacionadas con su área, conexión a internet y teléfono (proporción de uso profesional), vehículo (proporción de uso profesional), seguro médico o de responsabilidad civil profesional, y honorarios de su propio contador.

Todos los gastos deben respaldarse con factura electrónica a nombre del profesional o su sociedad.

## Régimen simplificado: ¿conviene?

Si sus ingresos anuales están dentro del límite establecido, el régimen simplificado le permite pagar una cuota mensual fija sin declarar IVA separado. Sin embargo, en el régimen simplificado no puede deducir gastos reales, por lo que puede no ser conveniente si tiene gastos significativos. Compare ambos regímenes con su asesor antes de escoger.

En GAMA Asesores atendemos a decenas de profesionales independientes, ayudándoles a cumplir correctamente y optimizar su carga tributaria de forma legal.`,
        },
        {
          id:11, category:"Administración Tributaria", date:"17 de septiembre, 2026",
          title:"Hacienda reestructura sus 18 áreas legales: qué significa para los contribuyentes",
          summary:"El Ministerio de Hacienda prepara la consolidación de sus más de 200 abogados dispersos en 18 unidades administrativas, buscando unificar criterios jurídicos y fortalecer el cobro de impuestos adeudados. Le explicamos qué implica esta reorganización para su empresa.",
          content:`El Ministerio de Hacienda anunció el 17 de setiembre de 2026 que someterá a consulta interna una propuesta para reestructurar sus 18 áreas legales. Aunque puede sonar como un asunto interno de la institución, tiene implicaciones directas para toda empresa que tenga o pueda tener procesos pendientes ante el fisco costarricense.

## El problema actual: dispersión jurídica

Actualmente Hacienda cuenta con más de 200 abogados distribuidos en 18 unidades administrativas de distintas dependencias del Ministerio. Según el propio viceministro de Ingresos, Víctor Carvajal Porras, este modelo genera:

- Criterios jurídicos contradictorios entre unidades que tratan situaciones similares
- Duplicidad de trámites que frena la gestión institucional
- Fragmentación en los procesos de cobro, especialmente en la fase judicial
- Dificultades para recuperar la deuda tributaria adeudada al Fisco

Esta dispersión no solo afecta la eficiencia interna de Hacienda: también genera inseguridad jurídica para los contribuyentes, ya que un mismo tipo de situación puede resolverse de forma diferente dependiendo de cuál unidad legal la tramite.

## ¿Qué busca la reestructuración?

La propuesta, alineada con recomendaciones del Ministerio de Planificación Nacional y Política Económica (MIDEPLAN) y de la Organización para la Cooperación y el Desarrollo Económicos (OCDE), busca:

1. Concentrar las funciones jurídicas en una Dirección Jurídica fortalecida con criterios unificados
2. Eliminar la duplicidad de competencias entre áreas con funciones similares
3. Redistribuir el recurso humano para fortalecer las áreas de cobro judicial
4. Establecer criterios jurídicos únicos que garanticen predictibilidad para los contribuyentes

En palabras del viceministro Carvajal: "El Ministerio debe hablar con una sola voz legal".

## ¿Qué implica para los contribuyentes?

Cobro coactivo más efectivo: una estructura jurídica centralizada significa que Hacienda será más eficiente al iniciar y dar seguimiento a procesos de cobro judicial. Las empresas con deudas tributarias —incluyendo declaraciones tardías, omisiones o diferencias detectadas en auditoría— enfrentarán una gestión de cobro más ágil y sistemática.

Mayor coherencia en criterios: con criterios unificados, será más predecible qué interpretación adoptará Hacienda ante situaciones tributarias complejas. Esto reduce la posibilidad de resoluciones contradictorias, algo que históricamente ha perjudicado tanto a la institución como a los contribuyentes.

Proceso en curso: es importante aclarar que la propuesta está en fase de consulta interna. Hacienda no ha especificado cuáles de las 18 áreas serán modificadas, fusionadas o eliminadas, ni en qué plazo remitirá la propuesta a MIDEPLAN. Los cambios no son inmediatos.

## Lo que su empresa debe hacer ahora

Independientemente del resultado de esta reestructuración, la señal es clara: Hacienda está invirtiendo en fortalecer su capacidad de cobro y gestión jurídica. Esto hace más importante que nunca:

- Mantener todas las declaraciones al día: IVA mensual, renta anual, planilla D-150
- Tener respaldos documentales de todas las transacciones relevantes
- Atender oportunamente cualquier notificación de la DGT o de TRIBU-CR
- Regularizar situaciones pendientes antes de que pasen a la fase de cobro judicial, donde los costos procesales se incrementan significativamente

En GAMA Asesores acompañamos a nuestros clientes no solo en el cumplimiento mensual, sino también en la atención de requerimientos de Hacienda, gestión de recursos y regularización de situaciones tributarias. Si tiene dudas sobre la situación fiscal de su empresa, contáctenos antes de que el problema llegue a la fase judicial.

Fuente: Delfino.cr, 17 de setiembre de 2026. Declaraciones del Viceministro de Ingresos Víctor Carvajal Porras.`,
        },
        {
          id:12, category:"Registro Nacional", date:"15 de septiembre, 2026",
          title:"Correo electrónico obligatorio para su sociedad: el Registro Nacional abre sistema gratuito el 20 de setiembre de 2026",
          summary:"A partir del 20 de setiembre de 2026, el Registro Nacional habilita el Sistema ACE para inscribir gratis el correo electrónico de su sociedad. El plazo límite es el 3 de diciembre de 2027; después de esa fecha, su sociedad no podrá inscribir ningún documento si no tiene correo registrado.",
          content:`El Registro Nacional anunció que a partir del 20 de setiembre de 2026 habilitará el Sistema de Autogestión de Correos Electrónicos (ACE), mediante el cual los representantes legales podrán registrar directamente y de forma gratuita el correo electrónico de sus sociedades mercantiles. Este trámite, antes complejo y con costos notariales y arancelarios, pasa a ser un proceso en línea, gratuito y sin necesidad de publicar en La Gaceta.

## ¿Por qué es obligatorio registrar un correo?

La obligación nace de dos leyes:

Ley 10.597: estableció el correo electrónico como medio oficial de notificación para todas las sociedades mercantiles ante Hacienda, el Poder Judicial y otras instituciones públicas.

Ley 10.962: creó un mecanismo gratuito y expedito para registrar esa dirección, eliminando las barreras anteriores de costo y complejidad.

Sin correo registrado, su sociedad podría no recibir notificaciones judiciales o administrativas que la ley considerará válidamente entregadas aunque usted no las haya visto.

## ¿A qué sociedades aplica?

La obligación aplica a:
- Sociedad Anónima (S.A.)
- Sociedad de Responsabilidad Limitada (S.R.L.)
- Sociedad en Nombre Colectivo
- Sociedad en Comandita Simple
- Asociaciones extranjeras y sucursales de sociedades extranjeras cuyos apoderados no tengan domicilio en Costa Rica

No aplica para: sociedades civiles, empresas individuales de responsabilidad limitada (EIRL), asociaciones bajo la Ley 218 ni fundaciones reguladas por la Ley 5338.

## ¿Cómo funciona el trámite con el sistema ACE?

El Sistema ACE estará disponible en el portal de servicios en línea del Registro Nacional a partir del 20 de setiembre. El proceso es el siguiente:

1. Ingrese con su firma digital certificada
2. El sistema muestra automáticamente las sociedades en las que usted figura como representante legal vigente
3. Seleccione la sociedad para la cual desea inscribir el correo
4. Ingrese y confirme la dirección de correo electrónico
5. El sistema genera una declaración jurada electrónica que debe firmar digitalmente
6. Descargue el comprobante de la gestión realizada

No se requiere publicación en La Gaceta cuando se usa el sistema ACE.

## El plazo límite y las consecuencias de no cumplir

El plazo para inscribir el correo es el 3 de diciembre de 2027.

A partir del 4 de diciembre de 2027, el Registro de Personas Jurídicas no tramitará ningún documento relacionado con sociedades que no tengan correo electrónico inscrito y consignará el defecto correspondiente, bloqueando certificaciones, cambios de representación, traspasos y cualquier otro movimiento registral.

Después de esa fecha, el trámite tendrá costo: ₡2.000 de arancel del Registro Nacional, ₡275 timbre del Colegio de Abogados, ₡20 timbre del Archivo Nacional y ₡5.000 timbre de Educación y Cultura, para un total de ₡7.295 (más costo notarial si se hace por escritura).

## ¿Qué pasa con el plazo del 31 de diciembre de 2026?

El transitorio I de la Ley 10.597 establecía originalmente un plazo al 31 de diciembre de 2026. Sin embargo, la Ley 10.962, de fecha posterior, amplió ese plazo al 3 de diciembre de 2027. La Directriz DPJ-002-2026 del Registro de Personas Jurídicas confirma que el plazo vigente es el de 2027.

## Condiciones que su sociedad debe cumplir para el trámite

La Directriz DPJ-002-2026 establece que las sociedades deben mantenerse al día con el impuesto a las personas jurídicas (Ley 9024), el Registro de Transparencia y Beneficiarios Finales (RTBF), y si aplica, con la Caja Costarricense de Seguro Social (CCSS) y el Fondo de Desarrollo Social y Asignaciones Familiares (FODESAF).

## Nuestra recomendación

No espere hasta diciembre de 2027. El sistema estará habilitado desde el 20 de setiembre de 2026 y el trámite es gratuito, rápido y no requiere visitar el Registro. Aproveche ahora que no hay costo, no hay congestión en el sistema y no necesita abogado ni notario si tiene firma digital activa.

Si su sociedad tiene alguna condición pendiente —impuesto de personas jurídicas atrasado, RTBF sin actualizar, o el representante legal no tiene firma digital vigente— este es el momento de regularizarlo antes de que el plazo se acerque.

En GAMA Asesores le asistimos en verificar el estado registral de sus sociedades, mantener al día el impuesto de personas jurídicas y coordinar el trámite del correo electrónico ante el Registro Nacional.

Fuente: Delfino.cr, 15 de setiembre de 2026. Basado en la Circular DGL-003-2026 del Registro Nacional y la Directriz DPJ-002-2026.`,
        },
      ],
    },
    faq: {
      label: "Preguntas Frecuentes",
      title: "¿Tiene Dudas? Tenemos Respuestas",
      subtitle: "Las consultas más frecuentes de nuestros clientes.",
      items: [
        { q: "¿Cuánto cuesta el servicio de contabilidad?", a: "Los honorarios dependen del volumen de transacciones y servicios requeridos. Ofrecemos planes desde ₡80,000 mensuales para profesionales independientes hasta paquetes corporativos personalizados. Contáctenos para una cotización sin costo." },
        { q: "¿Cuándo vence el IVA cada mes?", a: "El IVA (D-104) se declara y paga el día 15 de cada mes por el período anterior. Si el 15 cae en fin de semana o feriado, se traslada al siguiente día hábil." },
        { q: "¿Necesito contador si soy profesional independiente?", a: "Sí. Todo profesional que emite facturas tiene obligaciones de IVA mensual (13%), retención en la fuente (12%) y declaración anual de renta. Sin asesoría adecuada es fácil pagar de más o incurrir en multas." },
        { q: "¿Qué es TRIBU-CR?", a: "TRIBU-CR es la plataforma digital del Ministerio de Hacienda que reemplazó al ATV. Allí se gestionan todas las declaraciones, pagos y comunicaciones con Tributación. Toda empresa debe estar registrada." },
        { q: "¿Cuánto tarda implementar NIIF para PYMES?", a: "Para una empresa mediana con registros ordenados, entre 4 y 6 semanas. Con documentación desordenada puede tomar de 10 a 12 semanas. Incluye diagnóstico, políticas contables, estados comparativos y capacitación." },
        { q: "¿Pueden atenderme si estoy fuera de Costa Rica?", a: "Absolutamente. Atendemos clientes internacionales con operaciones en Costa Rica de forma 100% remota, en español e inglés. Ideal para inversionistas extranjeros y propietarios no residentes." },
        { q: "¿Qué pasa si no presento una declaración a tiempo?", a: "La multa por omisión es del 2% mensual hasta el 20% del impuesto adeudado. Se cobran además intereses. En casos graves, Hacienda puede iniciar cobro judicial. Regularizar pronto siempre es más económico." },
        { q: "¿Qué documentos necesito para empezar?", a: "Cédula jurídica o física, acceso a TRIBU-CR, estados de cuenta bancarios, facturas electrónicas del período y declaraciones anteriores si las hay. Le guiamos paso a paso en el proceso de incorporación." },
      ],
    },
    cost: {
      label: "El costo de no cumplir",
      title: "Hacer Mal las Cosas Sale Muy Caro",
      subtitle: "El incumplimiento tributario tiene consecuencias reales. Estos son los riesgos que evitamos para nuestros clientes.",
      items: [
        { icon: "⚖️", title: "Multas y Sanciones", text: "La multa por declaración tardía es del 2% mensual hasta el 20% del impuesto. Las omisiones pueden representar hasta el 50% del impuesto omitido más intereses moratorios." },
        { icon: "🏛️", title: "Cobro Judicial", text: "Las deudas con Hacienda pasan a cobro judicial con honorarios adicionales, posible embargo de cuentas bancarias y bienes de la empresa." },
        { icon: "🚫", title: "Bloqueo Registral", text: "Sin cumplimiento tributario, el Registro Nacional no inscribirá documentos: no traspasos, no cambios de representación, no certificaciones de ningún tipo." },
        { icon: "📉", title: "Acceso al Crédito", text: "Los bancos exigen estar al día con Hacienda y CCSS para aprobar financiamiento. El incumplimiento cierra las puertas al crédito empresarial cuando más lo necesita." },
      ],
    },
    tools: {
      label: "Herramientas",
      title: "Herramientas Fiscales Gratuitas",
      subtitle: "Calculadoras y calendario de obligaciones para su gestión tributaria.",
      calcTitle: "Calculadora de IVA",
      calcSub: "Calcule el IVA al 13% de forma instantánea",
      mode1: "Calcular IVA sobre precio neto",
      mode2: "Extraer IVA de precio total",
      base: "Precio base",
      iva: "IVA (13%)",
      total: "Total",
      placeholder: "Ingrese el monto",
      calTitle: "Calendario Tributario 2026",
      calSub: "Fechas clave del año fiscal costarricense",
      calNote: "* Cuando el vencimiento cae en fin de semana o feriado, se traslada al siguiente día hábil. Consulte a su asesor para fechas específicas del D-101.",
      filterAll: "Todos",
    },
    privacy: {
      label: "Política de Privacidad",
      title: "Política de Privacidad",
      subtitle: "Conforme a la Ley N.° 8968, Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales",
      content: `Última actualización: enero de 2026

GAMA CPA y Asesoría Contable, S.R.L. (cédula jurídica 3-102-913105), en adelante GAMA Asesores, con domicilio en Residencial Bulevar del Sol, Etapa IV, Casa E-14, Barranca, Puntarenas, Costa Rica, es la responsable del tratamiento de los datos personales recopilados a través del sitio web gamacpa-asesores.com.

## ¿Qué datos recopilamos?

A través del formulario de contacto recopilamos: nombre completo, dirección de correo electrónico, número de teléfono (opcional), nombre de la empresa o negocio (opcional) y el mensaje que nos envía. Adicionalmente, mediante Google Analytics recopilamos datos de navegación de forma anónima y agregada (páginas visitadas, tiempo en el sitio, ubicación aproximada).

## ¿Para qué usamos sus datos?

Sus datos se utilizan exclusivamente para: responder sus consultas y solicitudes de cotización, contactarle con información sobre nuestros servicios, y mejorar la experiencia del sitio web mediante el análisis de tráfico anónimo.

## Base legal del tratamiento

El tratamiento de sus datos personales se basa en su consentimiento expreso al enviar el formulario de contacto, conforme al Artículo 5 de la Ley N.° 8968.

## ¿Por cuánto tiempo conservamos sus datos?

Los datos del formulario de contacto se conservan por el tiempo necesario para atender su consulta y, en caso de convertirse en cliente, durante toda la relación comercial más el período exigido por la legislación tributaria costarricense vigente.

## Sus derechos

Conforme a la Ley N.° 8968 y sus reglamentos, usted tiene derecho a: acceder a sus datos personales, rectificar datos incorrectos, solicitar su eliminación, oponerse al tratamiento, y revocar su consentimiento en cualquier momento. Para ejercer estos derechos, contáctenos en: gmongea@gamacpa-asesores.com

## Cookies y análisis web

Este sitio utiliza Google Analytics para analizar el uso del sitio de forma anónima. Puede desactivar esta funcionalidad a través de la configuración de su navegador o mediante el complemento de inhabilitación de Google Analytics.

## Contacto

Para consultas sobre esta política o para ejercer sus derechos: GAMA CPA y Asesoría Contable, S.R.L. · gmongea@gamacpa-asesores.com · +506 8896-9883`,
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
        phones: [
          { number:"+506 8896-9883", label:"Directo con Gustavo Monge A., CPA" },
          { number:"+506 6055-8006", label:"Directo con Asistentes / Colaboradores" },
        ],
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
      links: ["Inicio","Servicios","Nosotros","Blog","Herramientas","Contacto"],
    },
  },

  /* ── ENGLISH ── */
  en: {
    nav: { links: ["Home","Services","About","Blog","Tools","Contact"], cta: "Get Quote" },
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
        {
          id:6, category:"Capital Gains", date:"April 25, 2026",
          title:"Capital Gains in Costa Rica: Application, payment and tax benefits",
          summary:"Everything about capital gains tax: which assets generate it, how it is calculated, when and how it is paid, and the tax benefits available for long-term investors.",
          content:`Capital gains tax in Costa Rica, regulated by the Income Tax Law No. 7092 and its reforms, applies when you sell or transfer assets that have increased in value. Understanding it correctly can mean a significant difference in your tax burden.

## What assets generate capital gains?

Capital gains come primarily from: sale of real estate (land, houses, apartments, commercial premises), sale of shares or participations in business corporations, vehicle transfers with gain over the purchase price, returns from financial instruments (bonds, investment funds, time deposits), and dividends from companies not subject to source withholding.

## Applicable rate and tax base

Since the 2026 reform, the general rate is 18% on the net gain (difference between sale price and duly documented acquisition cost). A preferential rate of 15% applies to assets held for more than 10 years, recognizing long-term investment.

The tax base is the net gain: sale price minus acquisition cost, plus deductible sale expenses (notary fees, duly invoiced sales commissions, documented capitalized improvements).

## When and how it is paid

The tax is declared and paid using the specific capital gains form, within the month following the transaction date. It is not an annual cumulative tax: each transaction generates an independent obligation.

Notaries and registrars are required to report real estate transfers to the DGT, so sales are automatically cross-referenced. Not declaring a sale carries a high risk of detection.

## Available tax benefits

Costa Rica offers several benefits for investors: the preferential 15% rate for long-term assets, the ability to offset capital losses against gains from the same period, exemption on the sale of primary residence under certain conditions (consult your advisor for current requirements), and the possibility of deferring tax in corporate restructurings under authorized mergers or spin-offs.

## Most costly mistakes

The main mistake is not documenting the original acquisition cost. Without proof of the purchase price, the DGT may consider the cost as zero, applying 18% on the full sale price. Keep deeds, invoices and any original cost documents indefinitely.

Another frequent mistake is assuming that a sale made "in cash" or without a notary generates no obligation. All registry transfers are reported to the DGT regardless of the payment method.

At GAMA Advisors we help you plan your transactions before they happen, not after.`,
        },
        {
          id:7, category:"Digital Platforms", date:"April 22, 2026",
          title:"Airbnb, Booking and HomeAway in Costa Rica: Taxes and host obligations",
          summary:"If you rent properties through hosting platforms, you have specific tax obligations in Costa Rica. Learn about VAT, income tax and applicable invoicing requirements.",
          content:`Renting properties through digital platforms like Airbnb, Booking.com, HomeAway (now Vrbo) and similar generates tax obligations in Costa Rica that many hosts are unaware of, with direct risk of penalties and adjustments.

## Applicable legal framework

The Value Added Tax Law (No. 9635) and the Income Tax Law (No. 7092) regulate these activities. Additionally, the DGT issued specific guidelines for digital platforms establishing responsibilities for both platforms and hosts.

## VAT: Value Added Tax

Lodging services, regardless of whether offered through digital platforms or directly, are subject to VAT in Costa Rica at the rate of 13%. This means that you, as a host, must be registered with the DGT as a VAT taxpayer if your lodging income exceeds the simplified regime limits.

Important: Airbnb and other platforms may withhold and remit VAT directly to the DGT in some cases, but this does not exempt the host from registration and filing obligations. Verify whether the platform you use has an agreement with the Costa Rican DGT for source withholding.

## Income Tax

Short-term rental income (lodging) is classified as business activity income if provided habitually and in an organized manner, or as real estate capital income for sporadic rentals.

For most active hosts on platforms, the DGT tends to classify them as business activity, which implies monthly VAT declaration and annual income declaration with deduction of operating expenses (maintenance, platform commissions, services, property depreciation).

## Electronic invoicing

Hosts must issue electronic invoices for each lodging. Some platforms offer integration with the Costa Rican invoicing system, but many do not. In those cases, the host must issue invoices independently from the platform receipt.

## Deductible lodging expenses

Hosts can deduct: platform commission (Airbnb charges between 3% and 5% to the host, which is a deductible expense), cleaning and maintenance costs, utilities (water, electricity, internet) proportional to tourist use, depreciation of the property and furniture, insurance, and management expenses.

## Simplified regime: does it apply to you?

If your annual lodging income does not exceed the established limit for the simplified regime, you can adopt this regime and pay a fixed monthly fee without needing to declare VAT separately. Consult current amounts with your tax advisor.

At GAMA Advisors we help platform hosts regularize and optimize their tax situation.`,
        },
        {
          id:8, category:"New Companies", date:"April 18, 2026",
          title:"Tax obligations for new companies in Costa Rica: First year guide",
          summary:"If you just incorporated your company, this article explains all the tax obligations you must meet from the first month: registrations, declarations, payroll and more.",
          content:`The first year of a company in Costa Rica is full of tax obligations with critical deadlines. Not meeting them from the start generates fines and records that complicate future growth.

## First 30 days: mandatory registrations

Within the first month of starting operations you must complete: registration with the General Tax Directorate (DGT) as a VAT and Income Tax contributor, registration with the Costa Rican Social Security Fund (CCSS) as an employer (if you have employees), registration of the business name with the Municipality of the canton where you operate, and opening a business bank account.

DGT registration is done on the ATV (Virtual Tax Administration) portal with the company's legal ID.

## Monthly obligations from the first month

From the first month of operations you must declare and pay VAT monthly (before the 15th of the following month). If you have employees, you must calculate and pay CCSS payroll monthly. You must issue electronic invoices for each sale or service from the first day of operations.

## Electronic invoicing: mandatory from day one

There is no grace period for electronic invoicing. From the first day of operations you must issue DGT-authorized electronic invoices. For this you need to register as an issuer on the ATV, obtain a digital certificate from the ACCV, and have compatible invoicing software or use the DGT's free Electronic Receipts system.

## Income Tax: annual declaration

The annual income tax declaration (Form D-101) is filed within two months and fifteen days after the end of the fiscal period. Even if you have losses in the first year (which is common), you must file the declaration. First-year losses can be carried forward to future periods to offset future profits.

## Corporate tax

All business corporations registered in Costa Rica, regardless of whether they operate or not, must pay the annual legal entities tax. Non-payment can generate limitations in registry procedures.

## Beneficial owners declaration (CIF-BB)

New corporations must file the beneficial owners information declaration within the first 20 business days after registration at the National Registry. This declaration identifies the real owners of the company and must be updated annually.

At GAMA Advisors we accompany companies from their incorporation, ensuring they start correctly from day one.`,
        },
        {
          id:9, category:"Payroll & CCSS", date:"April 15, 2026",
          title:"Payroll and CCSS in Costa Rica: Employer obligations and correct calculation",
          summary:"As an employer in Costa Rica, you must correctly calculate and pay social security contributions to the CCSS. Understand the percentages, deadlines, Christmas bonus calculation and the consequences of non-compliance.",
          content:`Labor and social security obligations are among the most sensitive for any company. Non-payment of CCSS generates debts that grow with interest and fines, and can seriously affect your company's operation and reputation.

## Payroll structure: who pays what

In Costa Rica, social charges are divided between employer and employee. The employer pays on the worker's gross salary approximately: CCSS (illness and maternity): 9.25%, IVM (disability, old age and death): 5.08%, Banco Popular: 0.50%, IMAS: 0.50%, INA: 1.50%, FODESAF: 0.50%, Labor Capitalization Fund: 3.00%. Total employer contribution: approximately 26.33%.

The employee also contributes from their salary: CCSS: 5.50%, IVM: 3.84%, Banco Popular: 1.00%. Total employee: approximately 10.34%.

## How to calculate payroll step by step

First determine each employee's gross salary (including overtime, incentives and any regular compensation). Calculate employee deductions (10.34% on gross salary). Calculate employer contribution (26.33% on gross salary). The net salary the employee receives is gross salary minus employee deductions. Total cost to the employer is gross salary plus employer contribution.

## Christmas bonus: mandatory with fixed date

The Christmas bonus (aguinaldo) is a right of every worker in Costa Rica equivalent to one month's salary. It is calculated on all ordinary and extraordinary salaries received between December 1 of the previous year and November 30 of the current year. Payment is mandatory before December 20. It has no CCSS social charges, but is included in the annual salary for income tax calculation if it exceeds exempt amounts.

## CCSS payment deadlines

Payroll must be paid monthly, within the first 15 calendar days of the month following the worked period. Late payments generate 1% monthly interest plus fines. CCSS has access to banking and tax information to detect omissions.

## Consequences of non-compliance

Non-payment of social charges can result in: legal proceedings with bank account and asset attachment, inability to obtain certificates of compliance (required for government contracts and many banks), personal liability of legal representatives in serious cases, and temporary business closure.

At GAMA Advisors we manage payroll for companies of all sizes, ensuring timely and correct compliance.`,
        },
        {
          id:10, category:"Independent Professionals", date:"April 10, 2026",
          title:"Taxation for independent professionals in Costa Rica: What you need to know",
          summary:"Doctors, lawyers, engineers, accountants and other professionals who invoice independently have specific obligations. Learn about VAT, income tax and how to legally optimize your deductions.",
          content:`Thousands of professionals in Costa Rica provide services independently without fully understanding their tax obligations. This lack of knowledge generates both non-compliance and unused deductions.

## Who is an independent professional according to the DGT?

It is any natural person who provides services based on specialized knowledge (healthcare, law, engineering, architecture, accounting, consulting, education, technology, etc.) without an employment dependency relationship with their payer. If you issue invoices for your services and do not have an employer deducting CCSS from a salary, you are an independent professional with your own tax obligations.

## Mandatory registration with the DGT

Every independent professional with regular income must register with the General Tax Directorate. Registration determines your specific obligations: whether you must declare VAT monthly or can adopt the simplified regime, and how you will declare your income tax annually.

## VAT for professionals: 13% on your services

Professional services in general are subject to 13% VAT. When you invoice your fees, you must include 13% VAT which you then declare and pay to Revenue. At the same time, the VAT you pay on your purchases and expenses related to your activity (office equipment, software, stationery, subcontracted professional services) generates tax credit that reduces your VAT payable.

There are exceptions: some healthcare services are exempt. Check if your specific specialty qualifies for any exemption.

## Source withholding: what happens when you are paid

When a company pays you for your services, it is required to withhold 12% of the gross amount as income tax withholding (increased in the 2026 reform). This withholding is not the final tax; it is an advance that is credited in your annual declaration. If you paid more withholdings than your tax obligation, you are entitled to a refund.

## Income Tax: how it works for independents

Independent professionals declare their income annually, adding all income and deducting all expenses related to the activity. The difference is the taxable base on which progressive rates apply: from 0% for the lower brackets up to 25% for high incomes.

## Deductible expenses many professionals don't take advantage of

Deductible expenses include: office or clinic rental (proportional to professional use), computer equipment and technology, professional software and subscriptions, books, courses and training related to your field, internet and phone (professional use proportion), vehicle (professional use proportion), professional liability insurance, and your own accountant's fees.

All expenses must be supported by an electronic invoice in the professional's or their company's name.

At GAMA Advisors we serve dozens of independent professionals, helping them comply correctly and optimize their tax burden legally.`,
        },
        {
          id:11, category:"Tax Administration", date:"September 17, 2026",
          title:"Costa Rica's Tax Ministry restructures its 18 legal units: What it means for taxpayers",
          summary:"Costa Rica's Ministry of Finance (Hacienda) announced plans to consolidate its 200+ lawyers spread across 18 administrative units. The goal: unify legal criteria and strengthen tax debt collection. Here is what this reorganization means for your business.",
          content:`On September 17, 2026, the Costa Rican Ministry of Finance announced it will put forward an internal consultation to restructure its 18 legal areas. While this may sound like a purely institutional matter, it has direct implications for any business that has — or could have — pending matters with the tax authority.

## The current problem: legal dispersion

Currently, Hacienda has more than 200 lawyers distributed across 18 administrative units within different departments. According to Vice Minister of Revenue Víctor Carvajal Porras, this model creates:

- Contradictory legal criteria between units handling similar situations
- Duplicate procedures that slow down institutional management
- Fragmented collection processes, especially in the judicial phase
- Difficulties recovering tax debt owed to the State

This dispersion does not only affect Hacienda's internal efficiency: it also creates legal uncertainty for taxpayers, since the same type of situation may be resolved differently depending on which legal unit handles it.

## What the restructuring seeks

The proposal — aligned with recommendations from the Ministry of National Planning (MIDEPLAN) and the Organisation for Economic Co-operation and Development (OECD) — aims to:

1. Concentrate legal functions in a strengthened Legal Directorate with unified criteria
2. Eliminate duplication of competencies between units with similar functions
3. Redistribute human resources to strengthen judicial tax collection
4. Establish unified legal criteria to ensure predictability for taxpayers

In the Vice Minister's words: "The Ministry must speak with one legal voice."

## What this means for taxpayers

More effective enforcement: a centralized legal structure means Hacienda will be more efficient at initiating and following through on judicial collection processes. Companies with tax debts — including late filings, omissions, or differences detected in audits — will face faster, more systematic collection management.

Greater coherence in criteria: with unified criteria, it will be more predictable what interpretation Hacienda will take on complex tax situations. This reduces the possibility of contradictory resolutions — a historical issue that has harmed both the institution and taxpayers.

Still in progress: the proposal is currently in internal consultation phase. Hacienda has not specified which of the 18 areas will be modified, merged, or eliminated, nor when it will be submitted to MIDEPLAN. Changes are not immediate.

## What your company should do now

Regardless of the outcome of this restructuring, the signal is clear: Hacienda is strengthening its legal and collection management capacity. This makes it more important than ever to:

- Keep all filings current: monthly VAT, annual income tax, payroll D-150
- Maintain complete documentation of all relevant transactions
- Promptly respond to any notification from the DGT or TRIBU-CR
- Regularize pending situations before they advance to the judicial collection phase, where procedural costs increase significantly

At GAMA Advisors we support our clients not only with monthly compliance, but also with handling Hacienda inquiries, filing appeals, and regularizing tax situations. Contact us before the problem reaches the judicial stage.

Source: Delfino.cr, September 17, 2026. Statements from Vice Minister of Revenue Víctor Carvajal Porras.`,
        },
        {
          id:12, category:"Corporate Compliance", date:"September 15, 2026",
          title:"Mandatory email registration for Costa Rican companies: Free system opens September 20, 2026",
          summary:"Starting September 20, 2026, Costa Rica's National Registry will launch the ACE System for companies to register their official email address for free. The deadline is December 3, 2027 — after which companies without a registered email will be blocked from any registry transaction.",
          content:`Costa Rica's National Registry announced that starting September 20, 2026, it will launch the Email Self-Management System (ACE — Sistema de Autogestión de Correos Electrónicos), allowing legal representatives to register their companies' official email addresses directly and for free. What was previously a complex and costly process is now an online procedure — free of charge and without requiring publication in the Official Gazette.

## Why is registering an email mandatory?

The obligation stems from two laws:

Law 10.597: established email as the official notification channel for all commercial companies with government entities, including the Tax Authority and the Judicial Branch.

Law 10.962: created a free, expedited mechanism to register that email address, removing previous cost and complexity barriers.

Without a registered email, your company could miss judicial or administrative notifications that will be legally considered as validly delivered — even if you never received them.

## Which companies are required to comply?

The obligation applies to: Sociedad Anónima (S.A. / Corporation), Sociedad de Responsabilidad Limitada (S.R.L. / LLC), Sociedad en Nombre Colectivo (General Partnership), Sociedad en Comandita Simple, and foreign companies or branches whose legal representatives do not have domicile in Costa Rica.

It does not apply to: civil partnerships (Sociedad Civil), Individual Limited Liability Companies (EIRL), associations under Law 218, or foundations under Law 5338.

## How does the ACE system work?

The ACE System will be available on the National Registry's online services portal starting September 20, 2026. The process:

1. Log in with a valid digital signature certificate
2. The system automatically displays all companies where you appear as an active legal representative
3. Select the company for which you want to register the email
4. Enter and confirm the email address that will receive official notifications
5. The system generates an electronic sworn statement to be signed digitally
6. Download your receipt as proof of the completed transaction

No publication in the Official Gazette (La Gaceta) is required when using the ACE system.

## The deadline and consequences of non-compliance

The deadline to register the email is December 3, 2027.

Starting December 4, 2027, the Registry of Legal Entities will not process any document for companies without a registered email. The defect will be recorded, blocking certifications, management changes, share transfers, and all other registry transactions.

After that date, the procedure will carry fees: ₡2,000 National Registry fee, ₡275 Bar Association stamp, ₡20 National Archives stamp, and ₡5,000 Education and Culture stamp, for a total of ₡7,295 (plus notarial fees if done through a notarized deed).

## What about the December 31, 2026 deadline?

The original transitional provision in Law 10.597 set a deadline of December 31, 2026. However, the subsequently enacted Law 10.962 extended this to December 3, 2027. National Registry Directive DPJ-002-2026 confirms the 2027 deadline is the one currently in effect.

## Conditions your company must meet

Directive DPJ-002-2026 establishes that companies must be current with: the Corporate Income Tax (Impuesto a las Personas Jurídicas, Law 9024), the Beneficial Owners Registry (RTBF), and if applicable, the Social Security system (CCSS) and FODESAF.

## Our practical recommendation

Do not wait until December 2027. The system opens September 20, 2026, and the procedure is free, fast, and does not require visiting the Registry. Take advantage of the fact that right now there is no cost, no system congestion, and no need for a lawyer or notary if the legal representative has an active digital signature.

If your company has any pending condition — outstanding corporate tax, outdated beneficial owners filing, or the legal representative lacks an active digital signature — now is the time to regularize before the deadline approaches.

At GAMA Advisors we help verify your companies' registry status, keep corporate taxes current, and coordinate the email registration with the National Registry.

Source: Delfino.cr, September 15, 2026. Based on National Registry Circular DGL-003-2026 and Directive DPJ-002-2026.`,
        },
      ],
    },
    faq: {
      label: "FAQ",
      title: "Have Questions? We Have Answers",
      subtitle: "The most common questions from our clients and prospects.",
      items: [
        { q: "How much does accounting service cost?", a: "Fees depend on transaction volume and services required. We offer plans starting at ₡80,000 per month for independent professionals up to customized corporate packages. Contact us for a free quote." },
        { q: "When is the monthly VAT return due?", a: "VAT (D-104) is declared and paid on the 15th of each month for the prior period. If the 15th falls on a weekend or holiday, it moves to the next business day." },
        { q: "Do I need an accountant as an independent professional?", a: "Yes. Every professional who issues invoices has obligations: 13% VAT monthly, 12% withholding at source, and annual income tax declaration. Without proper advice it's easy to overpay or incur penalties." },
        { q: "What is TRIBU-CR?", a: "TRIBU-CR is the Ministry of Finance's digital platform that replaced the old ATV system. All declarations, payments and communications with the Tax Authority are managed there. Every company must be registered." },
        { q: "How long does IFRS for SMEs implementation take?", a: "For a mid-sized company with organized records: 4 to 6 weeks. With disorganized documentation it may take 10 to 12 weeks. Includes gap analysis, accounting policies, comparative statements and team training." },
        { q: "Can you serve me if I'm outside Costa Rica?", a: "Absolutely. We serve international clients with operations in Costa Rica 100% remotely, in Spanish and English. Ideal for foreign investors and non-resident property owners." },
        { q: "What happens if I miss a tax filing?", a: "The penalty is 2% per month up to 20% of the tax owed, plus interest. In serious cases, Hacienda can initiate judicial collection. Regularizing quickly is always cheaper." },
        { q: "What documents do I need to start?", a: "Legal ID or business registration number, TRIBU-CR access, bank statements, electronic invoices for the period, and prior declarations if available. We guide you step by step." },
      ],
    },
    cost: {
      label: "The cost of non-compliance",
      title: "Doing Things Wrong Is Very Expensive",
      subtitle: "Tax non-compliance has real consequences. These are the risks we prevent for our clients.",
      items: [
        { icon: "⚖️", title: "Fines & Penalties", text: "Late filing penalty is 2% per month up to 20% of the tax owed. Omissions can represent up to 50% of the omitted tax plus interest charges." },
        { icon: "🏛️", title: "Judicial Collection", text: "Tax debts move to judicial collection with additional legal fees, possible bank account garnishments and business asset seizures." },
        { icon: "🚫", title: "Registry Blocks", text: "Without tax compliance, the National Registry won't process any documents for your company: no transfers, no management changes, no certifications." },
        { icon: "📉", title: "Credit Access", text: "Banks require being current with Hacienda and CCSS to approve financing. Non-compliance closes doors to business credit when you need it most." },
      ],
    },
    tools: {
      label: "Tools",
      title: "Free Tax Tools",
      subtitle: "Calculators and obligation calendar for your tax management.",
      calcTitle: "VAT Calculator",
      calcSub: "Calculate 13% VAT instantly",
      mode1: "Calculate VAT on net price",
      mode2: "Extract VAT from total price",
      base: "Base price",
      iva: "VAT (13%)",
      total: "Total",
      placeholder: "Enter amount",
      calTitle: "2026 Tax Calendar",
      calSub: "Key dates of the Costa Rican fiscal year",
      calNote: "* When a due date falls on a weekend or holiday, it moves to the next business day. Consult your advisor for specific D-101 dates.",
      filterAll: "All",
    },
    privacy: {
      label: "Privacy Policy",
      title: "Privacy Policy",
      subtitle: "In compliance with Law No. 8968, Personal Data Protection Law of Costa Rica",
      content: `Last updated: January 2026

GAMA CPA y Asesoría Contable, S.R.L. (corporate ID 3-102-913105), hereafter GAMA Advisors, located at Residencial Bulevar del Sol, Etapa IV, Casa E-14, Barranca, Puntarenas, Costa Rica, is the data controller for personal data collected through gamacpa-asesores.com.

## What data do we collect?

Through the contact form we collect: full name, email address, phone number (optional), company name (optional) and your message. Additionally, through Google Analytics we collect anonymous, aggregated browsing data (pages visited, time on site, approximate location).

## How do we use your data?

Your data is used exclusively to: respond to your inquiries and quote requests, contact you with information about our services, and improve the website experience through anonymous traffic analysis.

## Legal basis

Data processing is based on your express consent when submitting the contact form, pursuant to Article 5 of Law No. 8968.

## How long do we retain your data?

Contact form data is retained for as long as necessary to address your inquiry and, if you become a client, throughout the business relationship plus the period required by Costa Rican tax legislation.

## Your rights

Under Law No. 8968, you have the right to: access your personal data, correct inaccurate data, request deletion, object to processing, and revoke consent at any time. To exercise these rights contact us at: gmongea@gamacpa-asesores.com

## Cookies and web analytics

This site uses Google Analytics to analyze site usage anonymously. You can disable this through your browser settings or via the Google Analytics opt-out add-on.

## Contact

For questions about this policy or to exercise your rights: GAMA CPA y Asesoría Contable, S.R.L. · gmongea@gamacpa-asesores.com · +506 8896-9883`,
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
        phones: [
          { number:"+506 8896-9883", label:"Direct line to Gustavo Monge A., CPA" },
          { number:"+506 6055-8006", label:"Direct line to Assistants / Collaborators" },
        ],
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
      links: ["Home","Services","About","Blog","Tools","Contact"],
    },
  },

  /* ── HEBREW ── */
  he: {
    nav: { links: ["ראשי","שירותים","אודות","בלוג","כלים","צור קשר"], cta: "בקש הצעת מחיר" },
    hero: {
      badge: "משרד מקצועי · קוסטה ריקה",
      title: "ייעוץ חשבונאי,\nמיסויי ופיננסי",
      subtitle: "פתרונות מקיפים לעסקים ומשקיעים הפועלים בקוסטה ריקה — בספרדית, אנגלית ועברית.",
      cta: "בקש הצעת מחיר",
      ctaSecondary: "לשירותים שלנו",
    },
    services: {
      label: "שירותים מקצועיים",
      title: "פתרונות מותאמים לעסק שלכם",
      items: [
        {
          icon: icons.niif,
          title: "IFRS לעסקים קטנים ובינוניים",
          short: "יישום והטמעה של תקני IFRS for SMEs לחברות הפועלות בקוסטה ריקה.",
          detail: `תקני IFRS לעסקים קטנים ובינוניים הם תקן החשבונאות הבינלאומי המיושם בקוסטה ריקה. אנו מלווים את התהליך המלא מהאבחון הראשוני ועד ליישום מלא.

כולל: ניתוח פערים, עיצוב מדיניות חשבונאית חדשה, הכנת דוחות כספיים השוואתיים, הכשרת הצוות ועמידה בדרישות הבנקים וגופים פיננסיים.`,
        },
        {
          icon: icons.fiscal,
          title: "הגשת דוחות מס",
          short: "ניהול חודשי ושנתי של חובות המס שלכם בקוסטה ריקה.",
          detail: `ניהול מלא של כל דוחות המס: מע״מ חודשי (D-104), מס הכנסה שנתי (D-101), ניכויים, דוחות מיוחדים ואופטימיזציה מיסויית חוקית.

אנו מנהלים את כל ההגשות דרך מערכת TRIBU-CR ומייצגים את לקוחותינו מול רשות המסים.`,
        },
        {
          icon: icons.audit,
          title: "ביקורת ומתן ביטחון",
          short: "דוחות טכניים עצמאיים ואישורי רו\"ח לגופי שלישיים.",
          detail: `ביקורות ואישורים הם כלים חיוניים לאימות מידע פיננסי בפני בנקים, משקיעים ורשויות. אנו מציעים שירותי ביקורת מקיפים בהתאם לחקיקה הקוסטה-ריקאית.

כולל: ביקורות פיננסיות עצמאיות, אישורי הכנסה, דוחות ביטחון לגורמים בנקאיים וחוות דעת מקצועיות.`,
        },
        {
          icon: icons.outsourcing,
          title: "מיקור חוץ חשבונאי",
          short: "ניהול מלא של התהליכים החשבונאיים שלכם ללא הגדלת כוח אדם.",
          detail: `מיקור חוץ חשבונאי הוא הפתרון לייעול תהליכים ללא הגדלת עלויות קבועות. GAMA Asesores לוקחת אחריות מלאה על החשבונאות שלכם.

כולל: רישום חשבונאי יומי, פיוסי בנק, חשבונות לקבל ולשלם, ניהול שכר ו-CCSS, ודוחות חודשיים עם ניתוח שונויות.`,
        },
        {
          icon: icons.projection,
          title: "תחזיות פיננסיות",
          short: "ניתוח, תזרים מזומנים ותרחישים להחלטות אסטרטגיות מבוססות.",
          detail: `תכנון פיננסי הוא מצפן הצמיחה העסקית. אנו מכינים תחזיות מציאותיות המבוססות על נתונים היסטוריים ומניחים טכניים מנומקים.

כולל: ניתוח ביצועים היסטוריים, תחזיות הכנסות והוצאות, תזרים מזומנים חזוי, ניתוח תרחישים (פסימי, בסיסי, אופטימי) ונקודות שיווי משקל.`,
        },
        {
          icon: icons.society,
          title: "הקמת חברות",
          short: "ייעוץ משפטי ומנהלתי בהקמה ורישום של חברות בקוסטה ריקה.",
          detail: `הקמת חברה בקוסטה ריקה דורשת עמידה במספר רב של דרישות חוקיות ומנהליות. אנו מלווים את התהליך המלא מהתכנון ועד לפעולה.

כולל: ייעוץ לגבי המבנה המשפטי המתאים, רישום ב-Registro Nacional, מספר עוסק, רישום מיסויי ב-TRIBU-CR ועמידה בדרישות CCSS ועיריות.`,
        },
      ],
    },
    why: {
      label: "למה לבחור אותנו?",
      title: "מחויבות למצוינות",
      items: [
        { num: "01", title: "מומחיות טכנית", text: "מעל 10 שנות ניסיון בשוק קוסטה ריקה עם ידע מעמיק ב-IFRS לעסקים קטנים, מיסוי עדכני ותקנות מקומיות. עדכון מתמיד בשינויי חקיקה." },
        { num: "02", title: "שירות אישי", text: "אנו מאמינים בשירות מותאם אישית. לוקחים את הזמן להבין את העסק, הענף והמטרות הפיננסיות שלכם ומעצבים פתרונות המותאמים למציאות העסקית שלכם." },
        { num: "03", title: "שלישי לשוני ES / EN / עב", text: "שירות מקצועי מלא בספרדית, אנגלית ועברית. אנו מאפשרים תקשורת ישירה עם לקוחות מקומיים ומשקיעים זרים ומכינים תיעוד לכל הקהלים." },
        { num: "04", title: "זמינות מלאה", text: "משרדים בברנקה ובסנטה טרזה, עם צוות וירטואלי לכל קוסטה ריקה. גמישות לעבודה פנים אל פנים או מרחוק, תמיד באותה איכות שירות." },
      ],
    },
    about: {
      label: "אודות",
      title: "GAMA Asesores Contables",
      body: `GAMA Asesores היא משרד המתמחה בשירותי חשבונאות, פיננסים, מיסוי וייעוץ עסקי. אנו משלבים ניסיון מקצועי, ניתוח פיננסי קפדני וידע מעמיק בתקנות קוסטה ריקה לתמיכה בקבלת החלטות עסקיות.

שמנו, GAMA, מייצג את הספקטרום המלא של הפתרונות שאנו מציעים: מניהול מנהלתי ועד מודלים פיננסיים מתקדמים. איננו רק רואי חשבון — אנחנו שותפים אסטרטגיים בצמיחת העסק שלכם.`,
      cpa: {
        name: "CPA Gustavo Monge A.",
        role: "רואה חשבון מוסמך · מרצה אוניברסיטאי",
        bio: `רואה חשבון מוסמך בקוסטה ריקה עם ניסיון נרחב בייעוץ חשבונאי, פיננסי ומיסויי לחברות במגזרי השירותים, התיירות והנדל״ן.

התמחיתי ביישום נכון של IFRS לעסקים קטנים ובינוניים ובעמידה בחובות המס בפני רשות המסים, ומספק ליווי מקיף בהכנת דוחות כספיים, אישורי CPA ודוחות ביטחון.

כמו כן, אני משמש כמרצה באוניברסיטה בתחומי החשבונאות, עלויות ומערכות מידע חשבונאיות.`,
      },
      values: [
        { title: "יושרה", text: "כנות מוחלטת תוך כיבוד תקנים, חוקים ועקרונות אתיים בכל פעולה." },
        { title: "שקיפות", text: "תקשורת ברורה, ישירה וללא ז'רגון מיותר עם כל לקוח." },
        { title: "מצוינות", text: "עדכון מתמיד בתקנים בינלאומיים ובנוהלי חשבונאות מיטביים." },
        { title: "תוצאות", text: "פתרונות שיוצרים ערך אמיתי ומדיד לחברת הלקוח." },
      ],
    },
    blog: {
      label: "בלוג מקצועי",
      title: "מידע מיסויי עדכני",
      subtitle: "ניתוח מקצועי על תקנות קוסטה ריקה לקבלת החלטות טובות יותר.",
      readMore: "קרא עוד →",
      back: "← חזרה לבלוג",
      articles: [
        {
          id:1, category:"מיסוי דיגיטלי", date:"10 במאי, 2026",
          title:"TRIBU-CR: מדריך מקיף למערכת המיסוי הדיגיטלי של קוסטה ריקה 2026",
          summary:"TRIBU-CR היא פלטפורמת המיסוי הדיגיטלי החדשה של רשות המסים בקוסטה ריקה, שהחליפה את מערכת ATV הישנה. מדריך זה יסביר כיצד לנהל את חובות המס שלכם דרכה.",
          content:`TRIBU-CR היא פלטפורמת המיסוי הדיגיטלי החדשה של ממשלת קוסטה ריקה. כל חברה ועצמאי חייב להגיש את דוחות המס שלהם דרך פלטפורמה זו.

## מה ניתן לעשות ב-TRIBU-CR?

הגשת דוחות מע״מ חודשיים (D-104), הגשת דוחות מס הכנסה שנתיים (D-101), ניהול חשבוניות אלקטרוניות, תשלום מסים ישירות לרשות וצפייה בהיסטוריית הדוחות.

## רישום ועדכון פרטים

כל ישות חייבת להיות רשומה ב-TRIBU-CR עם פרטים עדכניים: כתובת, טלפון, ייצוג חוקי ופעילות כלכלית. עדכון הפרטים הוא חובה ואי-עמידה עלולה לגרום לקנסות.

## הגשת דוחות מע״מ

דוחות מע״מ (IVA) מוגשים עד ה-15 לכל חודש עבור החודש הקודם. שיעור המע״מ הסטנדרטי הוא 13% על מרבית הסחורות והשירותים.

ב-GAMA Asesores אנו מנהלים את כל ההגשות ב-TRIBU-CR עבור לקוחותינו, מבטיחים עמידה בלוחות הזמנים ומונעים קנסות.`,
        },
        {
          id:2, category:"מע\"מ", date:"8 במאי, 2026",
          title:"מע\"מ בקוסטה ריקה: הצהרה, חישוב וחובות עדכניות",
          summary:"מע\"מ (IVA) בשיעור 13% חל על מרבית הסחורות והשירותים בקוסטה ריקה. למדו כיצד לחשב, לדווח ולנצל את אשראי המס הזמין.",
          content:`מע״מ (IVA) בקוסטה ריקה נכנס לתוקף בשנת 2019 עם חוק החיזוק הפיסקאלי (Ley 9635). שיעור המע״מ הסטנדרטי הוא 13%.

## מה חייב במע״מ?

מרבית הסחורות והשירותים חייבים ב-13%. שיעורים מופחתים: 4% על שירותי בריאות פרטיים, 2% על ביטוחים, 1% על מוצרי מזון בסיסיים.

## אשראי מס

עסקים יכולים לנכות את מע״מ הרכישות מ-IVA המכירות שלהם. זה מאפשר לשלם רק על "הערך המוסף" שנוצר בפעילות.

## מועדי הגשה

הדוח החודשי מוגש עד ה-15 לחודש שאחרי. הגשה מאוחרת גוררת קנס של 2% לחודש ועד ל-20%.

ב-GAMA Asesores אנו מנהלים את כל חישובי ה-IVA ודואגים לעמידה בלוחות הזמנים.`,
        },
        {
          id:3, category:"מס הכנסה", date:"5 במאי, 2026",
          title:"הכנסות מהון מול רווחי פעילות עסקית: ההבדלים בקוסטה ריקה",
          summary:"בקוסטה ריקה ישנה הבחנה ברורה בין הכנסות מהון לבין הכנסות מפעילות עסקית. ההבחנה קובעת את שיעור המס החל.",
          content:`חוק מס הכנסה בקוסטה ריקה (Ley 7092) מבחין בין סוגי הכנסה שונים הממוסים בשיעורים שונים.

## הכנסות מהון

הכנסות מהון כוללות ריבית, דיבידנדים ודמי שכירות מנכסי מקרקעין. אלה ממוסות בשיעור 15%.

דמי שכירות מנכסים: 15% על ברוטו, או 15% על הנטו לאחר ניכוי 15% הוצאות אוטומטיות.

## הכנסות עסקיות

הכנסות מפעילות עסקית רגילה ממוסות בשיעורים פרוגרסיביים על רווח נקי: 5% לטווח הנמוך עד 25% לטווח הגבוה.

## חשיבות ההבחנה

הבחנה שגויה בין סוגי הכנסה עלולה לגרום לתשלום יתר או לחסר. ב-GAMA Asesores אנו מוודאים שכל הכנסה ממוסה בשיעור הנכון.`,
        },
        {
          id:4, category:"IFRS", date:"2 במאי, 2026",
          title:"IFRS לעסקים קטנים ובינוניים: יישום צעד אחר צעד",
          summary:"IFRS for SMEs הוא תקן החשבונאות הבינלאומי המיושם בחברות בקוסטה ריקה. מדריך מעשי ליישום מוצלח.",
          content:`IFRS for SMEs (NIIF para PYMES) הוא תקן חשבונאי בינלאומי שפורסם על ידי IASB ואומץ בקוסטה ריקה כתקן החובה לחברות שאינן ציבוריות.

## מדוע IFRS for SMEs?

הבנקים, הרשויות והמשקיעים בקוסטה ריקה דורשים דוחות כספיים לפי IFRS for SMEs. ללא יישום נכון, חברות עלולות להתקשות בקבלת מימון בנקאי.

## שלבי היישום

שלב 1 - אבחון: בדיקת המצב הקיים אל מול דרישות IFRS.
שלב 2 - מדיניות חשבונאית: קביעת מדיניות חשבונאית חדשה.
שלב 3 - יישום: המרת יתרות הפתיחה, הכנת דוחות השוואתיים.
שלב 4 - דוחות שנתיים: הכנת הדוחות הכספיים השנתיים הראשונים.

ב-GAMA Asesores, תהליך היישום לחברה בינונית עם רישומים מסודרים אורך 4-6 שבועות.`,
        },
        {
          id:5, category:"חקיקה", date:"28 באפריל, 2026",
          title:"רפורמת המס 2026 בקוסטה ריקה: מה שחברות חייבות לדעת",
          summary:"שנת 2026 מביאה עדכונים חשובים בתחום המיסוי בקוסטה ריקה. מחשבוניות אלקטרוניות ועד שינויים בשיעורי המס.",
          content:`שנת 2026 מציינת שינויים משמעותיים במערכת המיסוי של קוסטה ריקה. חשוב שחברות יהיו מעודכנות כדי למנוע קנסות ולנצל הזדמנויות.

## חשבוניות אלקטרוניות 4.4

מאז 30 ביוני 2026, כל חשבונית חייבת להיות אלקטרונית ולהיות מועברת ל-TRIBU-CR תוך 48 שעות. חברות שעדיין משתמשות בחשבוניות נייר חייבות לעדכן מיד.

## עדכוני TRIBU-CR

מערכת TRIBU-CR שדרגה את ממשק הגשת הדוחות. ישנם שינויים בפורמטים של מספר טפסים.

## שיעורי ניכוי מס במקור

שיעורי ניכוי המס במקור עודכנו לשנת 2026. שירותים מקצועיים: 12% ניכוי במקור.

ב-GAMA Asesores אנו מלווים את לקוחותינו בכל עדכוני הרגולציה ומוודאים ציות מלא.`,
        },
        {
          id:6, category:"רווחי הון", date:"25 באפריל, 2026",
          title:"רווחי הון בקוסטה ריקה: יישום, תשלום ויתרונות",
          summary:"מס על רווחי הון בשיעור 15% חל על מכירת נכסים בקוסטה ריקה. מדריך מלא על מתי חל המס, כיצד מחשבים ומתי ישנן פטורים.",
          content:`מס על רווחי הון בקוסטה ריקה חל על רווחים ממכירת נכסים כגון קרקעות, בתים, מניות וציוד עסקי. שיעור המס הוא 15% על הרווח הנקי.

## מה הם רווחי הון?

רווח הון הוא ההפרש בין מחיר המכירה לבין עלות הרכישה. מכירת נכס מקרקעין ברווח של $100,000 תגרור מס של $15,000.

## הגשה ותשלום

המס מוגש ומשולם תוך חודש ממועד העסקה. אין מס שנתי מצטבר — כל עסקה מייצרת חובה עצמאית.

## תכנון לפני מכירה

שמירת מסמכים על מחיר הרכישה המקורי, שיפוצים ועלויות אחרות היא חיונית להפחתת בסיס המס. ב-GAMA Asesores אנו מסייעים בתכנון לפני מכירה.`,
        },
        {
          id:7, category:"פלטפורמות דיגיטליות", date:"22 באפריל, 2026",
          title:"Airbnb ופלטפורמות דיגיטליות: חובות מס המארחים בקוסטה ריקה",
          summary:"מארחים ב-Airbnb, Booking ו-VRBO בקוסטה ריקה חייבים במע\"מ ובמס הכנסה. מדריך לחישוב וניהול מלא של חובות אלה.",
          content:`קוסטה ריקה חוקקה תקנות ברורות לגבי מיסוי פעילות מארחים בפלטפורמות דיגיטליות כ-Airbnb, Booking.com ו-VRBO.

## חובות מע״מ

הכנסות משכירות לטווח קצר (פחות מ-30 יום) חייבות ב-13% מע״מ. הפלטפורמות עשויות לגבות מע״מ ישירות מהלקוח, אך המארח אחראי לוודא שהמס הוגש כראוי.

## מס הכנסה

הכנסות נטו משכירות ממוסות ב-15% כהכנסות מהון. ניתן לנכות הוצאות ריאליות: תחזוקה, חשמל, ניהול נכס, פחת.

## רישום נדרש

מארחים חייבים להיות רשומים ב-TRIBU-CR ולהגיש דוחות חודשיים (מע״מ) ושנתי (הכנסה). אי-רישום עלול לגרור קנסות משמעותיים.

ב-GAMA Asesores אנו מתמחים בטיפול בלקוחות עם פעילות Airbnb ונכסים להשכרה, כולל משקיעים זרים.`,
        },
        {
          id:8, category:"חברות חדשות", date:"18 באפריל, 2026",
          title:"חובות מס לחברות חדשות בקוסטה ריקה: כל מה שצריך לדעת",
          summary:"אם הקמתם לאחרונה חברה בקוסטה ריקה, מאמר זה מסביר את כל חובות המס מהחודש הראשון: רישומים, דוחות, שכר ועוד.",
          content:`הקמת חברה בקוסטה ריקה מחייבת עמידה בחובות מיסוי ורגולציה מהחודש הראשון לפעילות.

## רישומים חובה

TRIBU-CR: רישום תוך 30 יום מהפעלת החברה עם קוד פעילות כלכלי נכון.
CCSS: רישום כמעסיק גם אם אתם העובד היחיד, לפני קבלת עובד ראשון.
Registro de Beneficiarios Finales: רישום הבעלים האמיתיים תוך 20 ימי עסקים מהרישום.

## חובות חודשיות מחודש 1

הגשת דוח מע״מ (אם פעילות כפופה ל-IVA), הגשת דוח שכר ל-CCSS, והפקת חשבוניות אלקטרוניות לכל עסקה.

## חובות שנתיות

דוח מס הכנסה שנתי (D-101), עדכון Registro de Transparencia, ותשלום מס חברות שנתי.

ב-GAMA Asesores אנו מלווים חברות חדשות בכל תהליך הרישום וההגדרה הנכונה.`,
        },
        {
          id:9, category:"שכר ו-CCSS", date:"15 באפריל, 2026",
          title:"שכר ו-CCSS בקוסטה ריקה: חובות המעסיק",
          summary:"ניהול שכר ב-CCSS בקוסטה ריקה כולל ניכויים קבועים, אגרות ודוחות חודשיים. מדריך מלא למעסיקים.",
          content:`כל מעסיק בקוסטה ריקה חייב לנהל שכר ב-CCSS (Caja Costarricense de Seguro Social) ולדווח על כל עובד מדי חודש.

## שיעורי ניכוי

מנת המעסיק: 26.33% מהשכר הגולמי (בריאות, פנסיה, ביטוח תאונות ועוד).
מנת העובד: 10.67% מהשכר הגולמי (בריאות ופנסיה).

## שכר מינימום 2026

שכר המינימום מתעדכן מדי שנה. יש לוודא שהשכר המשולם עומד בדרישות החוק הנוכחיות.

## אגרת חופשה שנתית (Aguinaldo)

בכל חודש דצמבר, כל מעסיק חייב לשלם אגרת חופשה שנתית השווה לחודש שכר. אין אפשרות חוקית לוותר על תשלום זה.

ב-GAMA Asesores אנו מנהלים שכר של עשרות חברות, כולל ניהול CCSS ואגרות שנתיות.`,
        },
        {
          id:10, category:"עצמאים", date:"10 באפריל, 2026",
          title:"מיסוי עצמאים בקוסטה ריקה: מה שחייבים לדעת",
          summary:"רופאים, עורכי דין, מהנדסים, יועצים ועצמאים אחרים בקוסטה ריקה חייבים בחובות מס ספציפיות. מדריך מקיף.",
          content:`אלפי אנשי מקצוע בקוסטה ריקה פועלים כעצמאים מבלי להבין לגמרי את חובות המס שלהם. בורות זו גורמת הן לאי-עמידה והן לניכויים לא מנוצלים.

## מי נחשב עצמאי?

כל אדם המספק שירותים מבוססי ידע (בריאות, משפט, הנדסה, חשבונאות, ייעוץ וכו') ללא קשר עבודה תלוי. אם אתם מנפיקים חשבוניות — חייבים ברישום ב-TRIBU-CR.

## מע״מ לעצמאים: 13%

שירותים מקצועיים חייבים ב-13% מע״מ. בעת הוצאת חשבונית, יש לכלול 13% IVA.

## ניכוי במקור: 12%

כאשר חברה משלמת לכם על שירות, היא חייבת לנכות 12% כניכוי במקור. זוהי מקדמה על חשבון מס ההכנסה השנתי.

## הוצאות ניתנות לניכוי

שכירות משרד, ציוד מחשוב, תוכנות, קורסים, אינטרנט וטלפון (פרופורציה מקצועית), רכב, ביטוח מקצועי ושכר רואה החשבון שלכם.

ב-GAMA Asesores אנו מסייעים לעשרות עצמאים לעמוד בחובותיהם ולמקסם את הניכויים המותרים.`,
        },
        {
          id:11, category:"מנהל המסים", date:"17 בספטמבר, 2026",
          title:"משרד האוצר מארגן מחדש 18 אגפים משפטיים: מה זה אומר לנישומים?",
          summary:"משרד האוצר של קוסטה ריקה מכין את איחוד יותר מ-200 עורכי דינו המפוזרים ב-18 יחידות, במטרה לאחד קריטריונים ולחזק גביית מסים.",
          content:`ב-17 בספטמבר 2026 הודיע משרד האוצר של קוסטה ריקה שיעמיד להתייעצות פנימית הצעה לארגון מחדש של 18 האגפים המשפטיים שלו. נשמע כמו ענין פנימי, אך יש לכך השלכות ישירות על כל עסק.

## הבעיה הנוכחית: פיזור משפטי

כיום יש למשרד האוצר יותר מ-200 עורכי דין המפוזרים ב-18 יחידות שונות. מצב זה יוצר קריטריונים משפטיים סותרים, כפילות תהליכים ופיצול בגביית מסים.

## מה מבקשת הארגון מחדש?

ההצעה, המתואמת עם המלצות MIDEPLAN ו-OECD, שואפת לרכז את הפונקציות המשפטיות במנהל משפטי מחוזק עם קריטריונים אחידים.

## מה זה אומר לנישומים?

גבייה יעילה יותר: חברות עם חובות מס יתמודדו עם ניהול גבייה מהיר ושיטתי יותר.
קוהרנטיות גדולה יותר: קריטריונים אחידים יאפשרו תחזיות טובות יותר לגבי מדיניות מסים.

## מה כדאי שהחברה שלכם תעשה עכשיו?

לשמור על כל ההגשות עדכניות, לשמור תיעוד מלא, לטפל מיידית בכל הודעה מה-DGT ולסדר מצבים תלויים לפני שיעברו לשלב הגבייה השיפוטי.

מקור: Delfino.cr, 17 בספטמבר 2026.`,
        },
        {
          id:12, category:"מרשם החברות", date:"15 בספטמבר, 2026",
          title:"כתובת דוא\"ל חובה לחברות: מרשם החברות פותח מערכת חינמית ב-20 בספטמבר 2026",
          summary:"החל מ-20 בספטמבר 2026, מרשם החברות של קוסטה ריקה פותח את מערכת ACE לרישום חינמי של כתובת דוא\"ל לחברות. המועד האחרון: 3 בדצמבר 2027.",
          content:`מרשם החברות הודיע שהחל מ-20 בספטמבר 2026 יפעיל את מערכת ניהול-עצמי של דוא״ל (ACE), שתאפשר לנציגים משפטיים לרשום ישירות ובחינם את כתובת הדוא״ל של חברותיהם.

## מדוע כתובת דוא״ל היא חובה?

חוק 10.597 קבע דוא״ל כאמצעי ההודעה הרשמי לכל חברות המסחר. חוק 10.962 יצר מנגנון חינמי לרישום. ללא דוא״ל רשום, הודעות ייחשבו כמומצאות כדין גם אם לא קיבלתם אותן.

## לאיזה חברות זה חל?

החובה חלה על: חברה בעמ (S.A.), חברת אחריות מוגבלת (S.R.L.), שותפות כללית, שותפות מוגבלת, וחברות זרות ללא מושב בקוסטה ריקה.

## כיצד פועלת מערכת ACE?

כניסה עם חתימה דיגיטלית, בחירת החברה, הזנת הדוא״ל, חתימה על הצהרה בשבועה אלקטרונית והורדת קבלה. אין צורך בביקור פיזי במרשם ואין צורך בפרסום ב-La Gaceta.

## המועד האחרון והתוצאות של אי-ציות

המועד לרישום הדוא״ל הוא 3 בדצמבר 2027. לאחר מכן המרשם לא יעבד שום מסמך לחברות ללא דוא״ל רשום, והעמלה תהיה ₡7,295.

## ההמלצה שלנו

אל תחכו עד דצמבר 2027. המערכת פתוחה מ-20 בספטמבר 2026, חינמית, מהירה ולא מצריכה ביקור במרשם.

ב-GAMA Asesores אנו מסייעים לבדוק את מצב החברות שלכם ולתאם את רישום הדוא״ל.

מקור: Delfino.cr, 15 בספטמבר 2026. חוזר DGL-003-2026 והנחיית DPJ-002-2026.`,
        },
      ],
    },
    faq: {
      label: "שאלות נפוצות",
      title: "יש שאלות? יש לנו תשובות",
      subtitle: "השאלות הנפוצות ביותר מהלקוחות שלנו.",
      items: [
        { q: "כמה עולה שירות חשבונאות?", a: "העמלות תלויות בנפח העסקאות ובשירותים הנדרשים. אנו מציעים תוכניות החל מ-₡80,000 לחודש לעצמאים ועד חבילות ארגוניות מותאמות. צרו איתנו קשר לקבלת הצעת מחיר ללא עלות." },
        { q: "מתי מוגש דוח מע״מ חודשי?", a: "מע״מ (D-104) מוגש ומשולם עד ה-15 לכל חודש עבור התקופה הקודמת. אם ה-15 חל בסוף שבוע או חג, הוא נדחה ליום העסקים הבא." },
        { q: "האם אני זקוק לרואה חשבון כעצמאי?", a: "כן. כל איש מקצוע שמנפיק חשבוניות חייב ב-13% מע״מ חודשי, 12% ניכוי במקור ודוח שנתי. ללא ייעוץ מתאים קל לשלם יותר מדי או לקבל קנסות." },
        { q: "מה זה TRIBU-CR?", a: "TRIBU-CR היא הפלטפורמה הדיגיטלית של משרד האוצר. כל הגשת דוחות, תשלומים ותקשורת עם רשות המסים מנוהלים שם. כל חברה חייבת להיות רשומה." },
        { q: "כמה זמן לוקחת הטמעת IFRS?", a: "לחברה בינונית עם רישומים מסודרים: 4 עד 6 שבועות. עם תיעוד לא מסודר עשוי לקחת 10 עד 12 שבועות. כולל אבחון, מדיניות חשבונאית, דוחות השוואתיים והכשרת צוות." },
        { q: "האם אפשר לקבל שירות מחוץ לקוסטה ריקה?", a: "בהחלט. אנו משרתים לקוחות בינלאומיים עם פעילות בקוסטה ריקה 100% מרחוק, בספרדית ובאנגלית. אידיאלי למשקיעים זרים ובעלי נכסים שאינם תושבים." },
        { q: "מה קורה אם אני לא מגיש הצהרה בזמן?", a: "הקנס הוא 2% לחודש עד 20% מהמס שלא שולם, בתוספת ריבית. במקרים חמורים, Hacienda יכולה לפתוח בהליכי גבייה שיפוטית. הסדרה מוקדמת תמיד זולה יותר." },
        { q: "אילו מסמכים צריך כדי להתחיל?", a: "מספר חברה או ת.ז, גישה ל-TRIBU-CR, דפי חשבון בנק, חשבוניות אלקטרוניות לתקופה ודוחות קודמים אם קיימים. אנו מנחים אתכם בכל שלב." },
      ],
    },
    cost: {
      label: "עלות אי-ציות",
      title: "לעשות דברים בצורה שגויה יוצא ביוקר",
      subtitle: "לאי-ציות מיסויי יש השלכות אמיתיות. אלה הסיכונים שאנו מונעים ללקוחותינו.",
      items: [
        { icon: "⚖️", title: "קנסות וסנקציות", text: "הקנס על הגשה מאוחרת הוא 2% לחודש עד 20% מהמס. השמטות עלולות להגיע ל-50% מהמס שהושמט בתוספת ריבית." },
        { icon: "🏛️", title: "גבייה שיפוטית", text: "חובות מס עוברים לגבייה שיפוטית עם שכ״ט נוסף, עיקול אפשרי של חשבונות בנק ונכסי החברה." },
        { icon: "🚫", title: "חסימת מרשם", text: "ללא ציות מיסויי, מרשם החברות לא יעבד שום מסמך: לא העברות, לא שינויי ייצוג, לא אישורים." },
        { icon: "📉", title: "גישה לאשראי", text: "הבנקים דורשים להיות עדכניים עם Hacienda ו-CCSS לאישור מימון. אי-ציות סוגר את דלתות האשראי העסקי." },
      ],
    },
    tools: {
      label: "כלים",
      title: "כלים מיסויים חינמיים",
      subtitle: "מחשבונים ולוח שנה לניהול המס שלכם.",
      calcTitle: "מחשבון מע״מ",
      calcSub: "חשבו 13% מע״מ באופן מיידי",
      mode1: "חשב מע״מ על מחיר נטו",
      mode2: "הוצא מע״מ ממחיר כולל",
      base: "מחיר בסיס",
      iva: "מע״מ (13%)",
      total: "סה״כ",
      placeholder: "הזינו סכום",
      calTitle: "לוח שנה מיסויי 2026",
      calSub: "תאריכים מרכזיים בשנת המס הקוסטה-ריקאית",
      calNote: "* כאשר מועד ביצוע חל בסוף שבוע או חג, הוא נדחה ליום העסקים הבא. התייעצו עם היועץ שלכם לגבי תאריכי D-101.",
      filterAll: "הכל",
    },
    privacy: {
      label: "מדיניות פרטיות",
      title: "מדיניות פרטיות",
      subtitle: "בהתאם לחוק N.° 8968, חוק הגנת המידע האישי של קוסטה ריקה",
      content: `עדכון אחרון: ינואר 2026

GAMA CPA y Asesoría Contable, S.R.L. (מספר עוסק 3-102-913105), להלן GAMA Asesores, הממוקמת ב-Residencial Bulevar del Sol, Etapa IV, Casa E-14, Barranca, Puntarenas, קוסטה ריקה, היא האחראית לטיפול בנתונים האישיים הנאספים דרך gamacpa-asesores.com.

## אילו נתונים אנו אוספים?

דרך טופס יצירת הקשר אנו אוספים: שם מלא, כתובת דוא״ל, מספר טלפון (אופציונלי), שם החברה (אופציונלי) וההודעה שלכם. בנוסף, דרך Google Analytics אנו אוספים נתוני גלישה אנונימיים ומצטברים.

## כיצד אנו משתמשים בנתונים?

הנתונים שלכם משמשים אך ורק: להגיב לפניות ובקשות הצעת מחיר, ליצור איתכם קשר בנוגע לשירותינו, ולשפר את חוויית האתר.

## הבסיס החוקי

עיבוד הנתונים האישיים שלכם מבוסס על הסכמתכם המפורשת בעת שליחת הטופס, בהתאם לסעיף 5 של חוק N.° 8968.

## פרטי יצירת קשר

לשאלות או לממש זכויותיכם: gmongea@gamacpa-asesores.com · +506 8896-9883`,
    },
    contact: {
      label: "צור קשר",
      title: "מוכנים לשדרג את הניהול הפיננסי שלכם?",
      subtitle: "צרו איתנו קשר לייעוץ ראשוני ללא עלות.",
      form: {
        name: "שם מלא",
        email: "כתובת דוא\"ל",
        phone: "טלפון (אופציונלי)",
        company: "שם החברה",
        service: "שירות מבוקש",
        serviceOptions: ["בחרו שירות","IFRS לעסקים קטנים","הגשת דוחות מס","ביקורת ומתן ביטחון","מיקור חוץ חשבונאי","תחזיות פיננסיות","הקמת חברות","אחר / שאלה כללית"],
        message: "כיצד נוכל לסייע לכם?",
        send: "שלח פנייה",
        sending: "שולח...",
        success: "ההודעה נשלחה! ניצור אתכם קשר בקרוב.",
        error: "אירעה שגיאה. אנא נסו שנית.",
      },
      contactInfo: {
        title: "פרטי יצירת קשר",
        phones: [
          { number:"+506 8896-9883", label:"ישיר עם גוסטבו מונחה, CPA" },
          { number:"+506 6055-8006", label:"ישיר עם הסגל / עוזרים" },
        ],
        emails: ["gmongea@gamacpa-asesores.com","gamasacsa@gmail.com"],
        officesTitle: "המשרדים שלנו",
        offices: [
          { name:"משרד פונטרנס", addr:"Residencial Bulevar del Sol, Etapa IV, Casa E-14, Barranca, Puntarenas" },
          { name:"משרד חצי האי", addr:"מול מגרש הכדורגל, קומה 2, Súper El Mango, Santa Teresa, Cóbano, Puntarenas" },
        ],
      },
    },
    footer: {
      tagline: "חשבונאות · פיננסים · ייעוץ עסקי",
      rights: "© 2026 GAMA Asesores Contables. כל הזכויות שמורות.",
      links: ["ראשי","שירותים","אודות","בלוג","כלים","צור קשר"],
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
    position: "fixed", top: 36, left: 0, right: 0, zIndex: 100,
    background: scrolled ? `rgba(3,18,46,0.98)` : `rgba(5,30,87,0.92)`,
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid rgba(179,141,71,${scrolled ? "0.25" : "0.15"})`,
    transition: "all 0.35s ease",
    padding: "0 5%",
  };

  const navSections = ["home","services","about","blog","tools","contact"];

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
        <div style={{ display:"flex", alignItems:"center", gap:20 }} className="nav-desktop">
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
            {["es","en","he"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  padding:"5px 12px", border:"none", cursor:"pointer",
                  background: lang===l ? C.gold : "transparent",
                  color: lang===l ? C.navy : "rgba(255,255,255,0.7)",
                  fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem",
                  fontWeight:700, letterSpacing:"0.06em",
                  textTransform:"uppercase", transition:"all .2s",
                }}
              >{l === "he" ? "עב" : l.toUpperCase()}</button>
            ))}
          </div>

          <a href="https://calendly.com/gamacpa-asesores/30min" target="_blank" rel="noopener noreferrer"
            style={{ ...btn.outline, padding:"7px 14px", fontSize:"0.72rem", textDecoration:"none", color:C.gold, borderColor:C.gold }}
            onMouseEnter={e=>{e.currentTarget.style.background=C.gold;e.currentTarget.style.color=C.navy;}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.gold;}}
          >{lang==="he"?"📅 קביעת פגישה":lang==="es"?"📅 Agendar Cita":"📅 Book Appointment"}</a>
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
                textAlign:"start", padding:"12px 0", letterSpacing:"0.08em",
                borderBottom:`1px solid rgba(255,255,255,0.08)`,
              }}
            >{link}</button>
          ))}
          <a href="https://calendly.com/gamacpa-asesores/30min" target="_blank" rel="noopener noreferrer"
            style={{ display:"block", width:"100%", background:C.gold, color:C.navy, fontFamily:"'Montserrat',sans-serif", fontSize:"0.85rem", fontWeight:700, textAlign:"center", padding:"14px 0", textDecoration:"none", letterSpacing:"0.08em", marginTop:16, marginBottom:8 }}
          >📅 {lang==="he"?"קביעת פגישה":lang==="es"?"Agendar Cita":"Book Appointment"}</a>
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            {["es","en","he"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ padding:"8px 20px", border:`1px solid ${C.gold}`, cursor:"pointer",
                  background: lang===l ? C.gold : "transparent",
                  color: lang===l ? C.navy : C.gold,
                  fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:"0.8rem",
                }}
              >{l === "he" ? "עב" : l.toUpperCase()}</button>
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
    <section style={{ minHeight:"100vh", background:C.white, display:"flex", alignItems:"center", position:"relative", overflow:"hidden", borderBottom:`3px solid rgba(179,141,71,0.15)` }}>

      {/* Motivo decorativo dorado — fondo claro */}
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"42%", background:"#f4f1eb", clipPath:"polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }} />
      <div style={{ position:"absolute", right:"5%", top:"50%", transform:"translateY(-50%)", opacity:0.12 }}>
        <svg viewBox="0 0 300 400" style={{ width:320, height:420 }}>
          <rect x="0" y="200" width="55" height="200" fill={C.gold}/>
          <rect x="75" y="120" width="55" height="280" fill={C.gold}/>
          <rect x="150" y="50" width="55" height="350" fill={C.gold}/>
          <polygon points="205,50 265,0 265,50" fill={C.gold}/>
        </svg>
      </div>
      {/* Línea dorada inferior */}
      <div style={{ position:"absolute", left:0, bottom:0, width:"100%", height:3, background:`linear-gradient(90deg, ${C.gold}, ${C.yellow}, transparent)`, opacity:0.5 }} />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"120px 5% 80px", width:"100%", position:"relative" }}>
        <div style={{ maxWidth:620 }}>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:`1px solid rgba(179,141,71,0.45)`, background:"rgba(179,141,71,0.06)", padding:"6px 16px", borderRadius:2, marginBottom:32 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.gold }} />
            <span style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700 }}>{t.badge}</span>
          </div>

          {/* Título */}
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:700, color:C.navy, lineHeight:1.1, marginBottom:28, maxWidth:640 }}>
            {t.title.split("\n")[0]}<br/>
            <span style={{ color:C.gold }}>
              {t.title.split("\n").slice(1).join("\n")}
            </span>
          </h1>

          {/* Subtítulo */}
          <p style={{ color:"#4a4540", fontFamily:"'Montserrat',sans-serif", fontSize:"1.05rem", lineHeight:1.8, maxWidth:520, marginBottom:48, fontWeight:300 }}>
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
              style={{ ...btn.outline, color:C.navy, borderColor:C.navy }}
              onMouseEnter={e => { e.target.style.background=C.navy; e.target.style.color=C.white; }}
              onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color=C.navy; e.target.style.borderColor=C.navy; }}
            >{t.ctaSecondary}</button>
          </div>

          {/* Stats bar */}
          <div style={{ marginTop:72, paddingTop:40, borderTop:`1px solid rgba(5,30,87,0.1)`, display:"flex", gap:48, flexWrap:"wrap" }}>
            {[["10+", lang==="he"?"שנות ניסיון":lang==="es"?"Años de experiencia":"Years of experience"],
              ["100+", lang==="he"?"לקוחות מרוצים":lang==="es"?"Clientes satisfechos":"Satisfied clients"],
              ["6", lang==="he"?"שירותים מקצועיים":lang==="es"?"Servicios especializados":"Specialized services"],
              ["2", lang==="he"?"משרדים בקוסטה ריקה":lang==="es"?"Oficinas en Costa Rica":"Offices in Costa Rica"]
            ].map(([n,l]) => (
              <div key={n}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.2rem", fontWeight:700, color:C.navy }}>{n}</div>
                <div style={{ width:24, height:2, background:C.gold, margin:"6px 0 8px" }} />
                <div style={{ color:"#6b6560", fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.06em" }}>{l}</div>
              </div>
            ))}
          </div>

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
    <section style={{ padding:"100px 5%", background:C.white }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ marginBottom:72, textAlign:"center" }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.5vw,2.8rem)", color:C.navy, fontWeight:700 }}>{t.title}</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:40 }}>
          {t.items.map((item,i) => (
            <div key={i} style={{ borderTop:`2px solid ${C.gold}`, paddingTop:28 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.8rem", fontWeight:700, color:"rgba(179,141,71,0.18)", marginBottom:16, lineHeight:1 }}>{item.num}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color:C.navy, fontWeight:700, marginBottom:14 }}>{item.title}</h3>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.86rem", color:"#4a4540", lineHeight:1.8 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop:72, height:1, background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity:0.35 }} />
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function AboutSection({ lang }) {
  const t = DATA[lang].about;

  // Equipo — 6 colaboradores placeholder
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
      {/* ── HISTORIA DE LA FIRMA ── */}
      <section style={{ padding:"80px 5% 60px", background:"#f4f1eb" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>
            {lang==="he"?"ההיסטוריה שלנו":lang==="es"?"Nuestra Historia":"Our Story"}
          </p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,2.8vw,2.2rem)", color:C.navy, fontWeight:700, marginBottom:32 }}>
            {lang==="he"?"ממשרד מקומי לפירמה בינלאומית":lang==="es"?"De Práctica Local a Firma Internacional":"From Local Practice to International Firm"}
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"start" }} className="about-grid">
            <div>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.91rem", color:"#4a4540", lineHeight:1.9, marginBottom:18 }}>
                {lang==="he"
                  ? "GAMA Asesores החלה פעילות תחת השם GAMA Servicios de Auditoría y Contabilidad, עם ייסוד רשמי בשנת 2017. הפירמה נוסדה על ידי CPA גוסטבו מונחה אלמן, שעבד כעצמאי מאז שנת 2000, מתוך אמונה שעסקים קטנים ובינוניים בקוסטה ריקה זכאים לייעוץ חשבונאי ברמה בינלאומית."
                  : lang==="es"
                  ? "GAMA Asesores inició operaciones bajo el nombre GAMA Servicios de Auditoría y Contabilidad, con fundación formal en 2017. La firma nació de la convicción del CPA Gustavo Monge Alemán — quien ejercía de forma independiente desde el año 2000 — de que las PYMES costarricenses merecen acceso a asesoría contable de alto nivel técnico, no solo servicios de registro básico."
                  : "GAMA Asesores began operations as GAMA Servicios de Auditoría y Contabilidad, formally founded in 2017. The firm was built on CPA Gustavo Monge Alemán's conviction — having worked independently since 2000 — that Costa Rican SMEs deserve high-level technical accounting advisory, not just basic bookkeeping."}
              </p>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.91rem", color:"#4a4540", lineHeight:1.9 }}>
                {lang==="he"
                  ? "עם השנים, הפירמה התפתחה מהתמקדות בלקוחות מקומיים בפונטרנס לכיסוי ארצי ובינלאומי. ב-2025 בוצע שינוי חברתי ל-GAMA CPA y Asesoría Contable, S.R.L., תוך שמירה על שמות המסחר המוכרים. כיום הפירמה פועלת משני משרדים פיזיים עם יכולת שירות מרחוק לכל קוסטה ריקה."
                  : lang==="es"
                  ? "Con el tiempo, la firma amplió su cobertura de clientes locales de la región de Puntarenas hacia atención nacional e internacional, adoptando el bilingüismo español/inglés como estándar. En 2025 se realizó el cambio societario a GAMA CPA y Asesoría Contable, S.R.L., manteniendo sus nombres comerciales. Hoy opera con dos oficinas físicas y cobertura remota para todo el país."
                  : "Over time, the firm expanded from local Puntarenas clients to national and international coverage, adopting Spanish/English bilingualism as a service standard. In 2025, the structure was updated to GAMA CPA y Asesoría Contable, S.R.L. Today it operates two physical offices with remote service capacity across Costa Rica."}
              </p>
            </div>
            <div style={{ borderLeft:`3px solid ${C.gold}`, paddingLeft:28 }}>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:C.gold, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:20 }}>
                {lang==="he"?"ציר הזמן":lang==="es"?"Línea de Tiempo":"Timeline"}
              </div>
              {[
                ["2000", lang==="he"?"תחילת עיסוק עצמאי":lang==="es"?"Inicio práctica profesional independiente":"Independent practice begins"],
                ["2017", lang==="he"?"ייסוד רשמי של GAMA Asesores":lang==="es"?"Fundación formal de GAMA Asesores":"GAMA Asesores formally founded"],
                ["2020", lang==="he"?"הרחבה לאזור חצי האי (Cóbano)":lang==="es"?"Expansión a zona peninsular (Cóbano)":"Expansion to Peninsula office (Cóbano)"],
                ["2023", lang==="he"?"שירות בינלאומי, לקוחות דוברי אנגלית":lang==="es"?"Expansión a clientes internacionales bilingüe":"International clients & bilingual service"],
                ["2025", lang==="he"?"שינוי חברתי ותמורה דיגיטלית":lang==="es"?"Cambio societario y transformación digital":"Corporate restructuring & digital transformation"],
                ["2026", lang==="he"?"ספר מותג ושלושה שפות":lang==="es"?"Manual de Marca y servicio trilingüe":"Brand Manual & trilingual service launch"],
              ].map(([yr, ev]) => (
                <div key={yr} style={{ marginBottom:14, display:"flex", gap:12 }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.9rem", fontWeight:700, color:C.gold, flexShrink:0, minWidth:40 }}>{yr}</span>
                  <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.84rem", color:"#4a4540", lineHeight:1.6 }}>{ev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              {lang==="he" ? "הצוות שלנו" : lang==="es" ? "Nuestro Equipo" : "Our Team"}
            </p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3vw,2.4rem)", color:C.navy, fontWeight:700 }}>
              {lang==="he" ? "המקצוענים מאחורי GAMA" : lang==="es" ? "Los Profesionales Detrás de GAMA" : "The Professionals Behind GAMA"}
            </h2>
          </div>

          {/* Fila 1 — Gustavo destacado centrado */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}>
            <div style={{ background:C.navy, borderRadius:2, overflow:"hidden", boxShadow:"0 6px 28px rgba(5,30,87,0.18)", width:"100%", maxWidth:380, borderTop:`3px solid ${C.gold}` }}>
              <div style={{ height:220, background:`linear-gradient(135deg, ${C.navyDk}, ${C.navyLt})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                <div style={{ width:100, height:100, borderRadius:"50%", background:`linear-gradient(135deg, ${C.gold}, ${C.goldLt})`, display:"flex", alignItems:"center", justifyContent:"center", border:`3px solid rgba(255,255,255,0.25)` }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.4rem", fontWeight:700, color:C.white }}>G</span>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
              </div>
              <div style={{ padding:"28px 28px 24px" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", fontWeight:700, color:C.white, marginBottom:4 }}>{t.cpa.name}</div>
                <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:C.gold, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>{t.cpa.role}</div>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.84rem", color:"rgba(255,255,255,0.68)", lineHeight:1.75 }}>
                  {lang==="es"
                    ? "Contador Público Autorizado y profesor universitario con especialización en NIIF para PYMES, auditoría y asesoría tributaria para el mercado costarricense."
                    : "Certified Public Accountant and university professor specializing in IFRS for SMEs, audit and tax advisory for the Costa Rican market."}
                </p>
                <div style={{ marginTop:16, paddingTop:16, borderTop:`1px solid rgba(179,141,71,0.2)` }}>
                  <a href="mailto:gmongea@gamacpa-asesores.com" style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.76rem", textDecoration:"none" }}>gmongea@gamacpa-asesores.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Fila 2 y 3 — 6 colaboradores en 3 columnas */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24 }} className="team-grid">
            {team.map((m, i) => (
              <div key={i} style={{ background:C.white, borderRadius:2, overflow:"hidden", boxShadow:"0 2px 12px rgba(5,30,87,0.07)", borderTop:`3px solid ${C.gold}` }}>
                <div style={{ height:190, background:`linear-gradient(135deg, ${C.navyDk}, ${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <div style={{ width:84, height:84, borderRadius:"50%", background:`linear-gradient(135deg, ${C.gold}, ${C.goldLt})`, display:"flex", alignItems:"center", justifyContent:"center", border:`3px solid rgba(255,255,255,0.2)` }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.9rem", fontWeight:700, color:C.white }}>{m.initial}</span>
                  </div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
                </div>
                <div style={{ padding:"22px 20px" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.02rem", fontWeight:700, color:C.navy, marginBottom:4 }}>{m.name}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.7rem", color:C.gold, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>{m.role}</div>
                  <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.82rem", color:"#4a4540", lineHeight:1.7, fontStyle:"italic" }}>{m.bio}</p>
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
  const allArts = [...t.articles].sort((a, b) => b.id - a.id);
  const [catFilter, setCatFilter] = useState("all");
  const categories = ["all", ...new Set(allArts.map(a => a.category))];
  const arts = catFilter === "all" ? allArts : allArts.filter(a => a.category === catFilter);

  return (
    <section id="blog-section" style={{ padding:"100px 5%", background:"#f4f1eb" }}>
      <div style={{ maxWidth:1200, margin:"0 auto 0", display:"flex", flexWrap:"wrap", gap:8, marginBottom:0 }}>
        {/* category filter rendered inside the section below */}
      </div>
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
            {lang==="he" ? "צריכים ייעוץ בנושא זה?" : lang==="es" ? "¿Necesita asesoría sobre este tema?" : "Need advice on this topic?"}
          </p>
          <a href={`https://wa.me/50688969883?text=${encodeURIComponent(lang==="he"?"שלום GAMA Asesores, קראתי את המאמר ורציתי להתייעץ.":lang==="es"?"Hola GAMA Asesores, leí el artículo del blog y me gustaría consultar.":"Hello GAMA Advisors, I read the blog article and would like to inquire.")}`}
            target="_blank" rel="noopener noreferrer"
            style={{ ...btn.primary, display:"inline-block", textDecoration:"none" }}
          >{lang==="he" ? "שלחו הודעה ב-WhatsApp" : lang==="es" ? "Consultar por WhatsApp" : "Ask via WhatsApp"}</a>
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
                  <div key={i} style={{ marginBottom:10 }}>
                    <a href={`tel:${p.number.replace(/\s/g,"")}`} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"1rem", color:C.gold, textDecoration:"none", fontWeight:700, display:"block" }}>{p.number}</a>
                    <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.76rem", color:"#6b6560", letterSpacing:"0.04em" }}>{p.label}</span>
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
/* ── TESTIMONIALS ── */
/* ─── SUPABASE CONFIG ───────────────────────────────────────────────────────
   Reemplazar con tus valores reales después de crear el proyecto en Supabase.
   Ver instrucciones de configuración al final del archivo.
   ─────────────────────────────────────────────────────────────────────────── */
const SB_URL = "https://nsoheqglajgrprqwddaq.supabase.co";
const SB_KEY = "sb_publishable_VL-5kiCXe-grainH5QbvVw_uGeS82th";
const SB_CONFIGURED = SB_URL !== "YOUR_SUPABASE_URL";

/* Testimonios fijos (siempre visibles mientras Supabase no esté configurado
   o como respaldo si la carga falla) */
const STATIC_TESTIMONIALS = [
  { id:"s1", name:"Michael Bienz", company:"Shaka Surf Camp S.A.", stars:5, lang:"es",
    text:"GAMA Asesores transformó completamente nuestra gestión financiera. Pasamos de tener registros desordenados a estados financieros bajo NIIF que nuestro banco acepta sin problema para trámites de crédito." },
  { id:"s1en", name:"Michael Bienz", company:"Shaka Surf Camp S.A.", stars:5, lang:"en",
    text:"GAMA Advisors completely transformed our financial management. We went from disorganized records to IFRS financial statements that our bank accepts without issues for credit applications." },
  { id:"s2", name:"Ezio Cabalceta Chaves", company:"Soltara Healing Center S.R.L.", stars:5, lang:"es",
    text:"Como empresa internacional necesitábamos un contador que entendiera tanto la normativa costarricense como los requerimientos de nuestros socios extranjeros. Gustavo y su equipo cumplen ambas condiciones con excelencia." },
  { id:"s2en", name:"Ezio Cabalceta Chaves", company:"Soltara Healing Center S.R.L.", stars:5, lang:"en",
    text:"As an international company we needed an accountant who understood both Costa Rican regulations and our foreign partners' requirements. Gustavo and his team excel at both." },
  { id:"s3", name:"Naftali Dani Assado", company:"Grupo Empresarial Assado y Bernstein", stars:5, lang:"es",
    text:"La atención personalizada y la disponibilidad de Gustavo son excepcionales. Siempre responde rápido y con respuestas claras. Haber encontrado un CPA de esta calidad ha sido un alivio enorme para nuestra empresa." },
  { id:"s3en", name:"Naftali Dani Assado", company:"Grupo Empresarial Assado y Bernstein", stars:5, lang:"en",
    text:"Gustavo's personalized service and availability are exceptional. He always responds quickly and clearly. Finding a CPA of this quality has been a huge relief for our company." },
  { id:"s4", name:"Lilliana García Barrantes", company:"Abogada LG Privacy Legal", stars:5, lang:"es",
    text:"Llevaba años declarando de forma incorrecta sin saberlo. Gracias a GAMA Asesores regularicé mi situación tributaria y ahora tengo la tranquilidad de cumplir correctamente. El costo de la asesoría se recuperó en el primer año." },
  { id:"s4en", name:"Lilliana García Barrantes", company:"Abogada LG Privacy Legal", stars:5, lang:"en",
    text:"For years I had been filing incorrectly without knowing it. Thanks to GAMA Advisors I regularized my tax situation. The advisory cost was recovered in the first year." },
  { id:"s1he", name:"Michael Bienz", company:"Shaka Surf Camp S.A.", stars:5, lang:"he",
    text:"GAMA Asesores שינתה לחלוטין את הניהול הפיננסי שלנו. עברנו מרישומים מבולגנים לדוחות כספיים לפי IFRS שהבנק שלנו מקבל ללא בעיות לבקשות אשראי." },
  { id:"s2he", name:"Ezio Cabalceta Chaves", company:"Soltara Healing Center S.R.L.", stars:5, lang:"he",
    text:"כחברה בינלאומית היינו זקוקים לרואה חשבון שמבין הן את התקנות הקוסטה-ריקאיות והן את הדרישות של השותפים הזרים שלנו. גוסטבו וצוותו עונים על שני התנאים בצורה מצוינת." },
  { id:"s3he", name:"Naftali Dani Assado", company:"Grupo Empresarial Assado y Bernstein", stars:5, lang:"he",
    text:"השירות האישי והזמינות של גוסטבו יוצאי דופן. הוא תמיד עונה מהר ובצורה ברורה. למצוא CPA ברמה כזו היה הקלה עצומה עבור החברה שלנו." },
  { id:"s4he", name:"Lilliana García Barrantes", company:"Abogada LG Privacy Legal", stars:5, lang:"he",
    text:"שנים הגשתי דוחות שגויים מבלי שידעתי. הודות ל-GAMA Asesores הסדרתי את מצבי המיסויי ועכשיו יש לי שקט נפשי שאני עומדת בדרישות כראוי. עלות הייעוץ הוחזרה כבר בשנה הראשונה." },
];

function TestimonialsSection({ lang }) {
  const [dynItems, setDynItems] = useState([]);
  const [loadDone, setLoadDone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name:"", company:"", stars:5, text:"" });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | translating | sending | ok | error

  /* Cargar testimonios aprobados desde Supabase */
  useEffect(() => {
    if (!SB_CONFIGURED) { setLoadDone(true); return; }
    fetch(`${SB_URL}/rest/v1/testimonials?approved=eq.true&order=created_at.desc`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setDynItems(data); })
      .catch(() => {})
      .finally(() => setLoadDone(true));
  }, []);

  /* Mezclar: primero los dinámicos del idioma activo, luego los estáticos del idioma activo */
  const dynFiltered = dynItems.filter(t => (t.lang ?? "es") === lang);
  const staticFiltered = STATIC_TESTIMONIALS.filter(t => t.lang === lang);
  const allItems = [...dynFiltered, ...staticFiltered];

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  /* Enviar nuevo testimonio */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!SB_CONFIGURED) { setSubmitStatus("ok"); return; }

    const saveToSupabase = (item) =>
      fetch(`${SB_URL}/rest/v1/testimonials`, {
        method: "POST",
        headers: {
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(item),
      });

    const translateText = async (text, fromLang, toLang) => {
      const names = { es: "Spanish", en: "English", he: "Hebrew" };
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 500,
          messages: [{
            role: "user",
            content: `Translate the following client testimonial from ${names[fromLang]} to ${names[toLang]}. Preserve the original tone, warmth and authenticity. Return ONLY the translated text with no explanations:\n\n${text}`,
          }],
        }),
      });
      const data = await res.json();
      return data?.content?.[0]?.text ?? text;
    };

    try {
      setSubmitStatus("translating");
      const otherLangs = ["es","en","he"].filter(l => l !== lang);
      const translations = await Promise.all(
        otherLangs.map(async (toLang) => ({
          lang: toLang,
          text: await translateText(form.text, lang, toLang),
        }))
      );

      setSubmitStatus("sending");
      const items = [
        { ...form, lang, approved: false },
        ...translations.map(t => ({ ...form, text: t.text, lang: t.lang, approved: false })),
      ];
      const results = await Promise.all(items.map(saveToSupabase));
      const allOk = results.every(r => r.ok);
      setSubmitStatus(allOk ? "ok" : "error");
      if (allOk) setForm({ name:"", company:"", stars:5, text:"" });
    } catch { setSubmitStatus("error"); }
  };

  const inputSt = {
    width:"100%", padding:"11px 14px", border:"1px solid rgba(255,255,255,0.15)",
    borderRadius:2, fontFamily:"'Montserrat',sans-serif", fontSize:"0.88rem",
    color:C.white, background:"rgba(255,255,255,0.07)", boxSizing:"border-box",
    outline:"none",
  };

  return (
    <>
      <section style={{ padding:"100px 5%", background:C.navy }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>

          {/* Header */}
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>
              {lang==="he" ? "המלצות" : lang==="es" ? "Testimonios" : "Testimonials"}
            </p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.9rem,3.5vw,2.6rem)", color:C.white, fontWeight:700, marginBottom:8 }}>
              {lang==="he" ? "מה הלקוחות שלנו אומרים" : lang==="es" ? "Lo que Dicen Nuestros Clientes" : "What Our Clients Say"}
            </h2>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.86rem", color:"rgba(255,255,255,0.45)", marginTop:8 }}>
              {lang==="he" ? "חוויות אמיתיות של עסקים ואנשי מקצוע שסומכים על GAMA Asesores." : lang==="es" ? "Experiencias reales de empresas y profesionales que confían en GAMA Asesores." : "Real experiences from companies and professionals who trust GAMA Advisors."}
            </p>
          </div>

          {/* Grid de testimonios */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, marginBottom:52 }}>
            {allItems.map((item, i) => (
              <div key={item.id ?? i} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(179,141,71,0.2)", padding:"32px 28px", position:"relative" }}>
                <div style={{ position:"absolute", top:20, right:24, fontFamily:"Georgia,serif", fontSize:"5rem", color:"rgba(179,141,71,0.10)", lineHeight:1 }}>"</div>
                <div style={{ color:C.gold, fontSize:"1rem", marginBottom:14, letterSpacing:2 }}>{stars(item.stars ?? 5)}</div>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.88rem", color:"rgba(255,255,255,0.75)", lineHeight:1.85, marginBottom:24, fontStyle:"italic" }}>
                  "{item.text}"
                </p>
                <div style={{ borderTop:`1px solid rgba(179,141,71,0.2)`, paddingTop:18 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"0.98rem", fontWeight:700, color:C.white }}>{item.name}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.74rem", color:C.gold, letterSpacing:"0.06em", marginTop:3 }}>{item.company}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para dejar testimonio */}
          <div style={{ textAlign:"center" }}>
            <button onClick={() => { setShowModal(true); setSubmitStatus("idle"); }}
              style={{ ...btn.outline, padding:"14px 40px" }}
              onMouseEnter={e => { e.target.style.background=C.gold; e.target.style.color=C.navy; e.target.style.borderColor=C.gold; }}
              onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color=C.gold; e.target.style.borderColor=C.gold; }}
            >
              {lang==="he" ? "✍ שתפו את חוות הדעת שלכם" : lang==="es" ? "✍ Compartir mi Experiencia" : "✍ Share My Experience"}
            </button>
            <p style={{ marginTop:14, fontFamily:"'Montserrat',sans-serif", fontSize:"0.76rem", color:"rgba(255,255,255,0.3)", fontStyle:"italic" }}>
              {lang==="he" ? "ההמלצות נסקרות לפני פרסומן." : lang==="es"
                ? "Los comentarios son revisados antes de publicarse."
                : "Comments are reviewed before being published."}
            </p>
          </div>

        </div>
      </section>

      {/* ── MODAL ── */}
      {showModal && (
        <div style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          {/* Overlay */}
          <div style={{ position:"absolute", inset:0, background:"rgba(3,18,46,0.88)", backdropFilter:"blur(6px)" }} onClick={() => setShowModal(false)} />

          {/* Card */}
          <div style={{ position:"relative", background:C.navyDk, border:`1px solid rgba(179,141,71,0.3)`, borderTop:`3px solid ${C.gold}`, padding:"44px 40px", maxWidth:520, width:"100%", borderRadius:2, zIndex:1 }}>

            {/* Cerrar */}
            <button onClick={() => setShowModal(false)}
              style={{ position:"absolute", top:16, right:20, background:"none", border:"none", color:"rgba(255,255,255,0.45)", fontSize:"1.4rem", cursor:"pointer", lineHeight:1 }}>✕</button>

            {submitStatus === "ok" ? (
              <div style={{ textAlign:"center", padding:"24px 0" }}>
                <div style={{ fontSize:"3rem", marginBottom:16 }}>✅</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", color:C.white, marginBottom:12 }}>
                  {lang==="he" ? "תודה על חוות הדעת שלכם!" : lang==="es" ? "¡Gracias por su aporte!" : "Thank you for your feedback!"}
                </h3>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.88rem", color:"rgba(255,255,255,0.6)", lineHeight:1.75 }}>
                  {lang==="he" ? "חוות הדעת שלכם התקבלה ותיסקר על ידי הצוות שלנו. אם תאושר, תופיע בקרוב בסעיף זה." : lang==="es"
                    ? "Su comentario fue recibido y será revisado por nuestro equipo. Si es aprobado, aparecerá en esta sección próximamente."
                    : "Your comment has been received and will be reviewed by our team. If approved, it will appear in this section soon."}
                </p>
                <button onClick={() => setShowModal(false)} style={{ ...btn.primary, marginTop:24 }}>
                  {lang==="he" ? "סגור" : lang==="es" ? "Cerrar" : "Close"}
                </button>
              </div>
            ) : (
              <>
                <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700, marginBottom:8 }}>
                  {lang==="he" ? "כתבו המלצה" : lang==="es" ? "Dejar mi Testimonio" : "Leave My Testimonial"}
                </p>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:C.white, fontWeight:700, marginBottom:6 }}>
                  {lang==="he" ? "כיצד הייתה חוויתכם?" : lang==="es" ? "¿Cómo fue su experiencia?" : "How was your experience?"}
                </h3>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.8rem", color:"rgba(255,255,255,0.45)", marginBottom:28 }}>
                  {lang==="he" ? "חוות הדעת שלכם תיסקר לפני פרסומה." : lang==="es" ? "Su comentario será revisado antes de publicarse." : "Your comment will be reviewed before publishing."}
                </p>

                <form onSubmit={handleSubmit}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                    <div>
                      <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.6)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>
                        {lang==="he" ? "שם *" : lang==="es" ? "Nombre *" : "Name *"}
                      </label>
                      <input style={inputSt} required value={form.name}
                        onChange={e => setForm(p=>({...p,name:e.target.value}))}
                        onFocus={e=>e.target.style.borderColor=C.gold}
                        onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.15)"} />
                    </div>
                    <div>
                      <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.6)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>
                        {lang==="he" ? "חברה / תפקיד" : lang==="es" ? "Empresa / Cargo" : "Company / Role"}
                      </label>
                      <input style={inputSt} value={form.company}
                        onChange={e => setForm(p=>({...p,company:e.target.value}))}
                        onFocus={e=>e.target.style.borderColor=C.gold}
                        onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.15)"} />
                    </div>
                  </div>

                  {/* Estrellas interactivas */}
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.6)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>
                      {lang==="he" ? "דירוג" : lang==="es" ? "Calificación" : "Rating"}
                    </label>
                    <div style={{ display:"flex", gap:6 }}>
                      {[1,2,3,4,5].map(n => (
                        <span key={n} onClick={() => setForm(p=>({...p,stars:n}))}
                          style={{ fontSize:"1.6rem", cursor:"pointer", color: n <= form.stars ? C.gold : "rgba(255,255,255,0.2)", transition:"color .15s" }}>★</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom:22 }}>
                    <label style={{ display:"block", fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:"rgba(255,255,255,0.6)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:5 }}>
                      {lang==="he" ? "חוות הדעת שלכם *" : lang==="es" ? "Su Comentario *" : "Your Comment *"}
                    </label>
                    <textarea rows={4} required style={{...inputSt, resize:"vertical"}} value={form.text}
                      onChange={e => setForm(p=>({...p,text:e.target.value}))}
                      onFocus={e=>e.target.style.borderColor=C.gold}
                      onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.15)"} />
                  </div>

                  {submitStatus==="error" && (
                    <div style={{ background:"rgba(220,53,69,0.15)", border:"1px solid rgba(220,53,69,0.4)", padding:"10px 14px", borderRadius:2, fontFamily:"'Montserrat',sans-serif", fontSize:"0.83rem", color:"#ff8a94", marginBottom:16 }}>
                      {lang==="he" ? "שגיאה בשליחה. אנא נסו שנית." : lang==="es" ? "Error al enviar. Por favor intente de nuevo." : "Error sending. Please try again."}
                    </div>
                  )}

                  <button type="submit" disabled={submitStatus==="sending" || submitStatus==="translating"}
                    style={{ ...btn.primary, width:"100%", opacity: (submitStatus==="sending" || submitStatus==="translating") ? 0.7 : 1 }}>
                    {submitStatus==="translating"
                      ? (lang==="he" ? "מתרגם לשלושה שפות..." : lang==="es" ? "Traduciendo a 3 idiomas..." : "Translating to 3 languages...")
                      : submitStatus==="sending"
                      ? (lang==="he" ? "שולח..." : lang==="es" ? "Enviando..." : "Sending...")
                      : (lang==="he" ? "שלח המלצה" : lang==="es" ? "Enviar Testimonio" : "Submit Testimonial")}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ── MAP ── */
function MapSection({ lang }) {
  // Coordenadas: Barranca 10.0107,-84.7054 | Santa Teresa 9.6415,-85.1653
  const offices = [
    {
      name: lang==="he" ? "משרד פונטרנס" : lang==="es" ? "Oficina Puntarenas" : "Puntarenas Office",
      addr: lang==="he" ? "Residencial Bulevar del Sol, Etapa IV, Barranca, Puntarenas" : lang==="es" ? "Residencial Bulevar del Sol, Etapa IV, Barranca, Puntarenas" : "Residencial Bulevar del Sol, Stage IV, Barranca, Puntarenas",
      mapSrc: "https://maps.google.com/maps?q=9.97055,-84.72782&z=17&output=embed",
      waze: "https://waze.com/ul?ll=9.97055,-84.72782&navigate=yes",
    },
    {
      name: lang==="he" ? "משרד חצי האי" : lang==="es" ? "Oficina Peninsular" : "Peninsula Office",
      addr: lang==="he" ? "מול מגרש הכדורגל, קומה 2, Súper El Mango, Santa Teresa, Cóbano" : lang==="es" ? "Frente a la Plaza de Fútbol, 2° piso Súper El Mango, Santa Teresa, Cóbano" : "Across from the Soccer Field, 2nd floor Súper El Mango, Santa Teresa, Cóbano",
      mapSrc: "https://maps.google.com/maps?q=9.63883,-85.16311&z=17&output=embed",
      waze: "https://waze.com/ul?ll=9.63883,-85.16311&navigate=yes",
    },
  ];

  return (
    <section style={{ padding:"80px 5%", background:"#f4f1eb" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>
            {lang==="he" ? "מצאו אותנו" : lang==="es" ? "Encuéntrenos" : "Find Us"}
          </p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3vw,2.4rem)", color:C.navy, fontWeight:700 }}>
            {lang==="he" ? "המשרדים שלנו" : lang==="es" ? "Nuestras Ubicaciones" : "Our Locations"}
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }} className="map-grid">
          {offices.map((o, i) => (
            <div key={i} style={{ background:C.white, borderRadius:2, overflow:"hidden", boxShadow:"0 2px 16px rgba(5,30,87,0.08)", borderTop:`3px solid ${C.gold}` }}>
              <iframe
                title={o.name}
                src={o.mapSrc}
                width="100%"
                height="280"
                style={{ border:0, display:"block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", fontWeight:700, color:C.navy, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:6 }}>{o.name}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.86rem", color:"#4a4540", lineHeight:1.6 }}>{o.addr}</div>
                </div>
                <a href={o.waze} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:6, background:"#00BFFF", color:C.white, padding:"8px 14px", borderRadius:4, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", fontWeight:700, textDecoration:"none", flexShrink:0 }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}
                >🗺 Waze</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ lang, setSection }) {
  const t = DATA[lang].footer;
  const navSections = ["home","services","about","blog","tools","contact"];
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
          <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"center" }}>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.76rem", color:"rgba(255,255,255,0.3)", margin:0 }}>{t.rights}</p>
            <button onClick={() => setSection("privacy")}
              style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Montserrat',sans-serif", fontSize:"0.74rem", color:"rgba(255,255,255,0.3)", padding:0, textDecoration:"underline" }}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.3)"}
            >{lang==="he"?"מדיניות פרטיות":lang==="es"?"Política de Privacidad":"Privacy Policy"}</button>
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            {[["📘","https://www.facebook.com/GAMAAsesoresContables"],["📸","https://www.instagram.com/gamaasesorescontables"],["💼","https://www.linkedin.com/company/gama-asesores-contables"],["🎵","https://www.tiktok.com/@gamaasesores"]].map(([icon,href])=>(
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.35)", fontSize:"1rem", textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e=>e.target.style.color=C.gold}
                onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}
              >{icon}</a>
            ))}
          </div>
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


/* ── TOP BAR ── */
function TopBar({ lang }) {
  const SOCIAL = [
    { icon: "📘", label:"Facebook",  href:"https://www.facebook.com/GAMAAsesoresContables" },
    { icon: "📸", label:"Instagram", href:"https://www.instagram.com/gamaasesorescontables" },
    { icon: "💼", label:"LinkedIn",  href:"https://www.linkedin.com/company/gama-asesores-contables" },
    { icon: "🎵", label:"TikTok",    href:"https://www.tiktok.com/@gamaasesores" },
  ];
  return (
    <div style={{ background:C.navyDk, borderBottom:`1px solid rgba(179,141,71,0.2)`, padding:"6px 5%", position:"fixed", top:0, left:0, right:0, zIndex:101 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <div style={{ display:"flex", gap:20, alignItems:"center" }}>
          <a href="tel:+50688969883" style={{ color:"rgba(255,255,255,0.65)", fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", textDecoration:"none", letterSpacing:"0.04em" }}>
            📞 +506 8896-9883
          </a>
          <a href="mailto:gmongea@gamacpa-asesores.com" style={{ color:"rgba(255,255,255,0.65)", fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", textDecoration:"none", letterSpacing:"0.04em" }}>
            ✉ gmongea@gamacpa-asesores.com
          </a>
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          {SOCIAL.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.label}
              style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.85rem", textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.5)"}
            >{s.icon}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── COST SECTION ── */
function CostSection({ lang }) {
  const t = DATA[lang].cost;
  return (
    <section style={{ padding:"80px 5%", background:C.navy }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3vw,2.4rem)", color:C.white, fontWeight:700, marginBottom:14 }}>{t.title}</h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.9rem", color:"rgba(255,255,255,0.55)", maxWidth:600, margin:"0 auto" }}>{t.subtitle}</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24 }}>
          {t.items.map((item, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid rgba(179,141,71,0.2)`, borderTop:`3px solid ${C.gold}`, padding:"32px 24px", borderRadius:2 }}>
              <div style={{ fontSize:"2rem", marginBottom:16 }}>{item.icon}</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", fontWeight:700, color:C.white, marginBottom:12 }}>{item.title}</h3>
              <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.84rem", color:"rgba(255,255,255,0.6)", lineHeight:1.75 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ SECTION ── */
function FAQSection({ lang }) {
  const t = DATA[lang].faq;
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding:"100px 5%", background:"#f4f1eb" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3vw,2.4rem)", color:C.navy, fontWeight:700, marginBottom:14 }}>{t.title}</h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.9rem", color:"#6b6560" }}>{t.subtitle}</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {t.items.map((item, i) => (
            <div key={i} style={{ background:C.white, borderRadius:2, border:`1px solid rgba(5,30,87,0.08)`, overflow:"hidden", borderLeft:`3px solid ${open===i?C.gold:"transparent"}`, transition:"border-color .2s" }}>
              <button onClick={() => setOpen(open===i?null:i)}
                style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", textAlign:"start", gap:16 }}>
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.92rem", fontWeight:600, color:C.navy, lineHeight:1.4 }}>{item.q}</span>
                <span style={{ color:C.gold, fontSize:"1.2rem", fontWeight:700, flexShrink:0, transition:"transform .2s", transform: open===i?"rotate(45deg)":"rotate(0deg)" }}>+</span>
              </button>
              {open===i && (
                <div style={{ padding:"0 24px 20px" }}>
                  <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.88rem", color:"#4a4540", lineHeight:1.8, borderTop:`1px solid rgba(5,30,87,0.06)`, paddingTop:16 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TOOLS SECTION (Calculadora + Calendario) ── */
const CAL_DATA = [
  { date:"Ene 15",  duty:"D-104 IVA (diciembre)",         type:"IVA",      en:"Jan 15 — D-104 VAT (December)",      he:"15 ינואר — מע״מ D-104 (דצמבר)" },
  { date:"Ene 31",  duty:"Impuesto Personas Jurídicas",    type:"Registro", en:"Jan 31 — Corporate Tax",             he:"31 ינואר — מס חברות" },
  { date:"Feb 15",  duty:"D-104 IVA (enero)",              type:"IVA",      en:"Feb 15 — D-104 VAT (January)",      he:"15 פברואר — מע״מ D-104 (ינואר)" },
  { date:"Mar 15",  duty:"D-104 IVA (febrero)",            type:"IVA",      en:"Mar 15 — D-104 VAT (February)",     he:"15 מרץ — מע״מ D-104 (פברואר)" },
  { date:"Abr 15",  duty:"D-104 IVA (marzo)",              type:"IVA",      en:"Apr 15 — D-104 VAT (March)",        he:"15 אפריל — מע״מ D-104 (מרץ)" },
  { date:"Abr 30",  duty:"RTBF — Actualización anual",    type:"Registro", en:"Apr 30 — Beneficial Owners update", he:"30 אפריל — עדכון שנתי RTBF" },
  { date:"May 15",  duty:"D-104 IVA (abril)",              type:"IVA",      en:"May 15 — D-104 VAT (April)",        he:"15 מאי — מע״מ D-104 (אפריל)" },
  { date:"Jun 15",  duty:"D-104 IVA (mayo)",               type:"IVA",      en:"Jun 15 — D-104 VAT (May)",          he:"15 יוני — מע״מ D-104 (מאי)" },
  { date:"Jul 15",  duty:"D-104 IVA (junio)",              type:"IVA",      en:"Jul 15 — D-104 VAT (June)",         he:"15 יולי — מע״מ D-104 (יוני)" },
  { date:"Ago 15",  duty:"D-104 IVA (julio)",              type:"IVA",      en:"Aug 15 — D-104 VAT (July)",         he:"15 אוגוסט — מע״מ D-104 (יולי)" },
  { date:"Set 15",  duty:"D-104 IVA (agosto)",             type:"IVA",      en:"Sep 15 — D-104 VAT (August)",       he:"15 ספטמבר — מע״מ D-104 (אוגוסט)" },
  { date:"Oct 15",  duty:"D-104 IVA (setiembre)",          type:"IVA",      en:"Oct 15 — D-104 VAT (September)",    he:"15 אוקטובר — מע״מ D-104 (ספטמבר)" },
  { date:"Nov 15",  duty:"D-104 IVA (octubre)",            type:"IVA",      en:"Nov 15 — D-104 VAT (October)",      he:"15 נובמבר — מע״מ D-104 (אוקטובר)" },
  { date:"Dic 15",  duty:"D-104 IVA (noviembre)",          type:"IVA",      en:"Dec 15 — D-104 VAT (November)",     he:"15 דצמבר — מע״מ D-104 (נובמבר)" },
  { date:"Dic 15",  duty:"D-101 Renta anual (año fiscal)",type:"Renta",    en:"Dec 15 — D-101 Annual Income Tax",  he:"15 דצמבר — D-101 מס הכנסה שנתי" },
  { date:"Dic 20",  duty:"Aguinaldo — pago máximo",       type:"Aguinaldo",en:"Dec 20 — Christmas Bonus deadline", he:"20 דצמבר — תשלום אגרת חופשה שנתית" },
];
const TYPE_COLORS = { IVA:"#0a2d7a", Renta:"#b38d47", Registro:"#2d6a4f", Aguinaldo:"#8b0000", Planilla:"#4a235a" };

function ToolsSection({ lang }) {
  const t = DATA[lang].tools;
  const [mode, setMode] = useState("net");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState("all");

  const val = parseFloat(amount.replace(/,/g,"")) || 0;
  const base  = mode==="net"  ? val       : val / 1.13;
  const iva   = mode==="net"  ? val*0.13  : val - val/1.13;
  const total = mode==="net"  ? val*1.13  : val;
  const fmt = (n) => n.toLocaleString("es-CR", { minimumFractionDigits:2, maximumFractionDigits:2 });

  const types = ["all","IVA","Renta","Registro","Aguinaldo"];
  const filtered = filter==="all" ? CAL_DATA : CAL_DATA.filter(r=>r.type===filter);
  const getLabel = (r) => lang==="en" ? r.en : lang==="he" ? r.he : `${r.date} — ${r.duty}`;

  return (
    <section style={{ padding:"100px 5%", background:C.white }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3vw,2.4rem)", color:C.navy, fontWeight:700, marginBottom:14 }}>{t.title}</h2>
          <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.9rem", color:"#6b6560" }}>{t.subtitle}</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }} className="map-grid">
          {/* IVA Calculator */}
          <div style={{ background:"#f4f1eb", padding:"40px 36px", borderRadius:2, borderTop:`3px solid ${C.gold}` }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:C.navy, fontWeight:700, marginBottom:8 }}>{t.calcTitle}</h3>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.83rem", color:"#6b6560", marginBottom:28 }}>{t.calcSub}</p>

            <div style={{ display:"flex", gap:8, marginBottom:24 }}>
              {["net","gross"].map(m => (
                <button key={m} onClick={() => setMode(m)}
                  style={{ flex:1, padding:"10px 8px", border:`1.5px solid ${mode===m?C.navy:"rgba(5,30,87,0.2)"}`, background:mode===m?C.navy:"transparent", color:mode===m?C.white:C.navy, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", fontWeight:600, cursor:"pointer", borderRadius:2, transition:"all .2s" }}>
                  {m==="net" ? t.mode1 : t.mode2}
                </button>
              ))}
            </div>

            <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder={t.placeholder}
              style={{ width:"100%", padding:"14px 16px", border:`1.5px solid rgba(5,30,87,0.2)`, borderRadius:2, fontFamily:"'Montserrat',sans-serif", fontSize:"1rem", color:C.navy, background:C.white, outline:"none", boxSizing:"border-box", marginBottom:24 }}
              onFocus={e=>e.target.style.borderColor=C.gold}
              onBlur={e=>e.target.style.borderColor="rgba(5,30,87,0.2)"} />

            {val > 0 && (
              <div style={{ background:C.white, padding:"20px", borderRadius:2, border:`1px solid rgba(5,30,87,0.1)` }}>
                {[[ t.base, fmt(base) ],[ t.iva, fmt(iva) ],[ t.total, fmt(total) ]].map(([label,value], i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom: i<2 ? `1px solid rgba(5,30,87,0.06)` : "none" }}>
                    <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.85rem", color:"#6b6560" }}>{label}</span>
                    <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:i===2?"1.1rem":"0.88rem", fontWeight:i===2?700:500, color:i===2?C.gold:C.navy }}>₡{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calendario */}
          <div style={{ background:"#f4f1eb", padding:"40px 36px", borderRadius:2, borderTop:`3px solid ${C.gold}` }}>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.35rem", color:C.navy, fontWeight:700, marginBottom:8 }}>{t.calTitle}</h3>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.83rem", color:"#6b6560", marginBottom:20 }}>{t.calSub}</p>

            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
              {types.map(tp => (
                <button key={tp} onClick={() => setFilter(tp)}
                  style={{ padding:"5px 12px", border:`1.5px solid ${filter===tp?C.navy:"rgba(5,30,87,0.2)"}`, background:filter===tp?C.navy:"transparent", color:filter===tp?C.white:C.navy, fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", borderRadius:20, transition:"all .2s" }}>
                  {tp==="all" ? t.filterAll : tp}
                </button>
              ))}
            </div>

            <div style={{ maxHeight:340, overflowY:"auto", display:"flex", flexDirection:"column", gap:6 }}>
              {filtered.map((r, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:C.white, padding:"10px 14px", borderRadius:2, borderLeft:`3px solid ${TYPE_COLORS[r.type]||C.navy}` }}>
                  <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.82rem", color:C.navy, flex:1 }}>{getLabel(r)}</span>
                  <span style={{ background:TYPE_COLORS[r.type]||C.navy, color:C.white, fontFamily:"'Montserrat',sans-serif", fontSize:"0.66rem", fontWeight:700, letterSpacing:"0.06em", padding:"2px 8px", borderRadius:10, flexShrink:0 }}>{r.type}</span>
                </div>
              ))}
            </div>
            <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.72rem", color:"#9a9280", marginTop:14, lineHeight:1.6 }}>{t.calNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PRIVACY SECTION ── */
function PrivacySection({ lang, setSection }) {
  const t = DATA[lang].privacy;
  const renderContent = (text) => text.split("\n\n").map((para, i) => {
    if (para.startsWith("## ")) return <h2 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color:C.navy, fontWeight:700, marginTop:32, marginBottom:12 }}>{para.slice(3)}</h2>;
    return <p key={i} style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.9rem", color:"#4a4540", lineHeight:1.85, marginBottom:14 }}>{para}</p>;
  });
  return (
    <section style={{ padding:"100px 5% 80px", background:C.white }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <button onClick={() => setSection("home")}
          style={{ ...btn.outline, marginBottom:40, fontSize:"0.78rem", padding:"10px 24px", color:C.navy, borderColor:C.navy }}
          onMouseEnter={e=>{e.target.style.background=C.navy;e.target.style.color=C.white;}}
          onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=C.navy;}}
        >{lang==="he"?"← חזרה":lang==="es"?"← Volver":"← Back"}</button>
        <p style={{ color:C.gold, fontFamily:"'Montserrat',sans-serif", fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>{t.label}</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:700, color:C.navy, marginBottom:10 }}>{t.title}</h1>
        <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"0.85rem", color:"#9a9280", marginBottom:40, fontStyle:"italic" }}>{t.subtitle}</p>
        <div>{renderContent(t.content)}</div>
      </div>
    </section>
  );
}

/* ─────────────── APP ─────────────── */
export default function App() {
  const [lang, setLang] = useState("es");
  const [section, setSection] = useState("home");
  const [articleId, setArticleId] = useState(null);

  /* RTL support for Hebrew */
  useEffect(() => {
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  /* SEO meta tags — update on language change */
  useEffect(() => {
    const META = {
      es: { title:"GAMA Asesores Contables | Contabilidad y Finanzas en Costa Rica", desc:"Firma especializada en contabilidad, NIIF para PYMES, declaraciones fiscales, auditoría y asesoría financiera en Costa Rica. Servicio bilingüe ES/EN.", kw:"contabilidad costa rica, contador puntarenas, NIIF pymes, IVA costa rica, declaraciones tributarias" },
      en: { title:"GAMA Advisors | Accounting & Finance in Costa Rica", desc:"Specialized firm in accounting, IFRS for SMEs, tax declarations, audit and financial advisory in Costa Rica. Bilingual ES/EN service.", kw:"accountant costa rica, CPA puntarenas, IFRS SMEs, VAT costa rica, tax filing" },
      he: { title:"GAMA Asesores | חשבונאות ופיננסים בקוסטה ריקה", desc:"משרד המתמחה בחשבונאות, IFRS לעסקים קטנים, הגשת דוחות מס, ביקורת וייעוץ פיננסי בקוסטה ריקה.", kw:"רואה חשבון קוסטה ריקה, CPA, IFRS, מע״מ" },
    };
    const m = META[lang];
    document.title = m.title;
    const setMeta = (sel, content, attr="name") => {
      let el = document.querySelector(`meta[${attr}="${sel}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, sel); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", m.desc);
    setMeta("keywords", m.kw);
    setMeta("og:title", m.title, "property");
    setMeta("og:description", m.desc, "property");
    setMeta("og:url", "https://gamacpa-asesores.com", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", "https://gamacpa-asesores.com/logo_gama_asesores_modificado_web.jpg", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", m.title);
    setMeta("twitter:description", m.desc);
  }, [lang]);

  /* Schema.org LocalBusiness */
  useEffect(() => {
    const id = "schema-local-business";
    let el = document.getElementById(id);
    if (!el) { el = document.createElement("script"); el.id = id; el.type = "application/ld+json"; document.head.appendChild(el); }
    el.textContent = JSON.stringify({ "@context":"https://schema.org", "@type":"AccountingService", name:"GAMA Asesores Contables", url:"https://gamacpa-asesores.com", logo:"https://gamacpa-asesores.com/logo_gama_asesores_modificado_web.jpg", telephone:"+50688969883", email:"gmongea@gamacpa-asesores.com", address:[{ "@type":"PostalAddress", streetAddress:"Residencial Bulevar del Sol, Etapa IV, Casa E-14", addressLocality:"Barranca", addressRegion:"Puntarenas", addressCountry:"CR" },{ "@type":"PostalAddress", streetAddress:"2° piso Súper El Mango, frente Plaza de Fútbol Santa Teresa", addressLocality:"Cóbano", addressRegion:"Puntarenas", addressCountry:"CR" }], areaServed:"CR", availableLanguage:["Spanish","English","Hebrew"], description:"Firma especializada en contabilidad, NIIF para PYMES, declaraciones fiscales, auditoría y asesoría financiera en Costa Rica." });
  }, []);

  /* Google Analytics — reemplaza G-XXXXXXXXXX con tu Measurement ID real */
  useEffect(() => {
    const GA_ID = "G-NK13QV0MEQ";
    // Google Analytics 4 — gamacpa-asesores.com
    const s = document.createElement("script");
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }, []);

  const renderSection = () => {
    if (section === "blog" && articleId) {
      const article = DATA[lang].blog.articles.find(a => a.id === articleId);
      return <ArticleView article={article} lang={lang} onBack={() => setArticleId(null)} />;
    }
    switch(section) {
      case "home":     return <><HeroSection lang={lang} setSection={setSection}/><CostSection lang={lang}/><WhySection lang={lang}/><FAQSection lang={lang}/><TestimonialsSection lang={lang}/></>;
      case "services": return <ServicesSection lang={lang}/>;
      case "about":    return <AboutSection lang={lang}/>;
      case "blog":     return <BlogList lang={lang} onRead={(a)=>{ setArticleId(a.id); window.scrollTo({top:0,behavior:"smooth"}); }}/>;
      case "tools":    return <ToolsSection lang={lang}/>;
      case "contact":  return <><ContactSection lang={lang}/><MapSection lang={lang}/></>;
      case "privacy":  return <PrivacySection lang={lang} setSection={setSection}/>;
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
        @media(max-width:900px){
          .nav-desktop{display:none!important;}
          .nav-mobile-btn{display:flex!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .contact-grid{grid-template-columns:1fr!important;}
          .team-grid{grid-template-columns:1fr 1fr!important;}
          .map-grid{grid-template-columns:1fr!important;}
        }
        @media(max-width:560px){
          .team-grid{grid-template-columns:1fr!important;}
        }
        button:focus{outline:none;}
        a:focus{outline:none;}
      `}</style>

      <TopBar lang={lang}/>
      <Navbar lang={lang} setLang={setLang} section={section} setSection={setSection}/>

      <main style={{ paddingTop: section === "home" ? 36 : 108 }}>
        {renderSection()}
      </main>

      <Footer lang={lang} setSection={(s)=>{ setSection(s); setArticleId(null); window.scrollTo({top:0}); }}/>
      <WhatsAppBtn/>
    </>
  );
}
