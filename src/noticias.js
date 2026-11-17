/* ─────────────────────────────────────────────────────────────
   NOTICIAS de GAMA Asesores Contables (avisos y cambios de último momento)

   Fuente única de datos: la leen la app (src/App.jsx) y el generador de
   páginas estáticas (scripts/seo/generate.mjs). Para publicar una noticia:
     1) Agregar un objeto al INICIO del arreglo NEWS (la más nueva primero).
     2) Copiar la imagen a /public/noticias/<slug>.jpg y la tarjeta para
        redes (1200x630) a /public/noticias/og/<slug>.jpg.
     3) Ejecutar `npm run build` (genera /noticias/<slug>/ y /en/news/<slug>/
        y actualiza el sitemap) y hacer commit de todo junto.
   Cuerpo (body): texto = párrafo · "## texto" = subtítulo · arreglo = lista.
   validUntil: último día en que el aviso está vigente (AAAA-MM-DD).
   ───────────────────────────────────────────────────────────── */

export const NEWS = [
  {
    slug: "ampliacion-plazo-declaraciones-17-nov-2026",
    date: "2026-11-16",
    validUntil: "2026-11-17",
    image: "/noticias/ampliacion-plazo-declaraciones-17-nov-2026.jpg",
    og: "/noticias/og/ampliacion-plazo-declaraciones-17-nov-2026.jpg",
    es: {
      category: "Plazos tributarios",
      title: "Hacienda amplía hasta el 17 de noviembre de 2026 el plazo para presentar declaraciones",
      summary:
        "Por intermitencias en la plataforma TRIBU-CR, la Dirección General de Tributación amplió un día el plazo de las declaraciones informativas y de las autoliquidativas con vencimiento el 16 de noviembre.",
      body: [
        "Mediante la Resolución MH-DGT-RES-0042-2026, emitida el 16 de noviembre de 2026, la Dirección General de Tributación (DGT) del Ministerio de Hacienda amplió hasta el 17 de noviembre de 2026 el plazo para:",
        [
          "Presentar las declaraciones informativas.",
          "Presentar y pagar las declaraciones autoliquidativas con vencimiento al 16 de noviembre de 2026.",
        ],
        "## ¿Por qué se amplió el plazo?",
        "La medida responde a las intermitencias reportadas en la plataforma TRIBU-CR, según informó la propia DGT.",
        "## ¿Qué debe hacer?",
        "Si su declaración o su pago vencía el 16 de noviembre, tiene hasta el 17 de noviembre de 2026 para cumplir. Le recomendamos no esperar al último momento: presente y pague temprano ese día y conserve los comprobantes de presentación y de pago.",
        "Revise el texto de la resolución para confirmar el alcance exacto en su caso particular.",
      ],
      source: {
        label: "Ministerio de Hacienda, Dirección General de Tributación: Resolución MH-DGT-RES-0042-2026 (16 de noviembre de 2026)",
        url: "https://www.hacienda.go.cr/",
      },
      imageAlt: "Aviso del Ministerio de Hacienda: ampliación de plazo para la presentación de declaraciones hasta el 17 de noviembre de 2026",
    },
    en: {
      category: "Tax deadlines",
      title: "Costa Rica's Ministry of Finance extends the filing deadline to November 17, 2026",
      summary:
        "Due to outages on the TRIBU-CR platform, the Tax Authority (DGT) extended by one day the deadline for informative returns and for self-assessed returns originally due on November 16.",
      body: [
        "Through Resolution MH-DGT-RES-0042-2026, issued on November 16, 2026, the Tax Authority (DGT) of Costa Rica's Ministry of Finance extended until November 17, 2026 the deadline for:",
        [
          "Filing informative returns.",
          "Filing and paying self-assessed returns originally due on November 16, 2026.",
        ],
        "## Why was the deadline extended?",
        "The measure responds to the outages reported on the TRIBU-CR platform, as announced by the DGT itself.",
        "## What should you do?",
        "If your return or payment was due on November 16, you have until November 17, 2026 to comply. We recommend not waiting until the last minute: file and pay early that day and keep your filing and payment receipts.",
        "Please review the text of the resolution to confirm its exact scope in your particular case.",
      ],
      source: {
        label: "Ministry of Finance, Tax Authority (DGT): Resolution MH-DGT-RES-0042-2026 (November 16, 2026)",
        url: "https://www.hacienda.go.cr/",
      },
      imageAlt: "Ministry of Finance notice: filing deadline extended until November 17, 2026",
    },
  },
];

export const NEWS_PATHS = {
  es: { hub: "/noticias/", item: (slug) => `/noticias/${slug}/` },
  en: { hub: "/en/news/", item: (slug) => `/en/news/${slug}/` },
};

export const NEWS_LABELS = {
  es: {
    nav: "Noticias",
    label: "Noticias",
    title: "Avisos y Cambios de Último Momento",
    subtitle: "Plazos, resoluciones y novedades tributarias que le afectan, explicadas de forma breve y con su fuente oficial.",
    readMore: "Leer aviso →",
    back: "← Volver a Noticias",
    active: "Vigente",
    expired: "Vencida",
    validUntil: "Vigente hasta el",
    expiredOn: "Plazo vencido el",
    source: "Fuente oficial",
    disclaimer: "Este aviso es informativo y resume lo publicado por la autoridad competente. No sustituye asesoría profesional sobre su caso.",
    ctaTitle: "¿Necesita apoyo con sus declaraciones?",
    ctaBtn: "Consultar por WhatsApp",
    ctaMsg: "Hola GAMA Asesores, leí un aviso en su sitio web y me gustaría consultar.",
    empty: "Por el momento no hay noticias publicadas.",
    allNews: "Ver todas las noticias",
  },
  en: {
    nav: "News",
    label: "News",
    title: "Notices and Last-Minute Changes",
    subtitle: "Deadlines, resolutions and tax updates that affect you, explained briefly and with their official source.",
    readMore: "Read notice →",
    back: "← Back to News",
    active: "Current",
    expired: "Expired",
    validUntil: "Current until",
    expiredOn: "Deadline expired on",
    source: "Official source",
    disclaimer: "This notice is informational and summarizes what the competent authority published. It does not replace professional advice on your case.",
    ctaTitle: "Need help with your tax filings?",
    ctaBtn: "Ask via WhatsApp",
    ctaMsg: "Hello GAMA Advisors, I read a notice on your website and would like to inquire.",
    empty: "There are no published news items at the moment.",
    allNews: "See all news",
  },
};

const MONTHS = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

/* "2026-11-16" → "16 de noviembre de 2026" / "November 16, 2026" (sin depender de la zona horaria) */
export function fmtNewsDate(iso, lang) {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "es" ? `${d} de ${MONTHS.es[m - 1]} de ${y}` : `${MONTHS.en[m - 1]} ${d}, ${y}`;
}

/* Vigente mientras la fecha local de Costa Rica (UTC-6) no supere validUntil */
export function newsActive(item, now = new Date()) {
  const cr = new Date(now.getTime() - 6 * 3600 * 1000).toISOString().slice(0, 10);
  return cr <= item.validUntil;
}
