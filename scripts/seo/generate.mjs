// Generador de páginas SEO estáticas de GAMA Asesores Contables.
// Uso: `npm run seo` (también se ejecuta automáticamente antes de `npm run build`).
// - Crea páginas por servicio y por ubicación (ES/EN) dentro de /public
// - Repara los artículos estáticos del blog (sin redirección JS, con navegación, GA4 y schema)
// - Regenera public/sitemap.xml con hreflang
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOMAIN, ORG_ID, GA_ID, LASTMOD, CONTACT, OFFICES, SOCIAL } from "./site.mjs";
import { PAGES, HUB } from "./pages.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PUB = path.join(ROOT, "public");
const OG_IMAGE = `${DOMAIN}/og-gama.jpg`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
const write = (rel, content) => {
  const file = path.join(PUB, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

/* ───────────── Datos auxiliares ───────────── */
const blogDir = path.join(PUB, "blog");
const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".html"));
const blogTitle = {};
for (const f of blogFiles) {
  const html = fs.readFileSync(path.join(blogDir, f), "utf8");
  const m = html.match(/<h1>([\s\S]*?)<\/h1>/);
  blogTitle[f.replace(/\.html$/, "")] = m ? m[1].trim() : f;
}

// lastmod previos del sitemap (para no perderlos)
const prevLastmod = {};
try {
  const old = fs.readFileSync(path.join(PUB, "sitemap.xml"), "utf8");
  for (const m of old.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) prevLastmod[m[1]] = m[2];
} catch {}

const L = {
  es: {
    lang: "es", locale: "es_CR", home: "Inicio", services: "Servicios", blog: "Blog",
    altNav: "English", faq: "Preguntas frecuentes", related: "Artículos relacionados",
    other: "Otros servicios", locations: "Dónde atendemos", ctaH: "¿Hablamos de su caso?",
    ctaP: "Escriba al CPA Gustavo Monge A. y reciba orientación sobre su situación. Atendemos en español e inglés.",
    wa: "Escribir por WhatsApp", mail: "Enviar un correo", offices: "Oficinas",
    barranca: "Oficina principal · Barranca, Puntarenas", santaTeresa: "Oficina Santa Teresa · visitas programadas",
    hours: "Barranca: lunes a viernes, 8:00 a 17:00.", map: "Ver en el mapa", waze: "Abrir en Waze",
    waMsg: "Hola GAMA Asesores, me interesa: ", slogan: "Contabilidad · Finanzas · Consultoría Empresarial",
    rights: "Todos los derechos reservados.", blogHome: "/#blog", home_href: "/", seeMore: "Ver todos los artículos",
  },
  en: {
    lang: "en", locale: "en_US", home: "Home", services: "Services", blog: "Blog",
    altNav: "Español", faq: "Frequently asked questions", related: "Related articles (Spanish)",
    other: "Other services", locations: "Where we work", ctaH: "Shall we talk about your case?",
    ctaP: "Message CPA Gustavo Monge A. and get guidance on your situation. We work in English and Spanish.",
    wa: "Message us on WhatsApp", mail: "Send an e-mail", offices: "Offices",
    barranca: "Main office · Barranca, Puntarenas", santaTeresa: "Santa Teresa office · scheduled visits",
    hours: "Barranca: Monday to Friday, 8:00 am to 5:00 pm.", map: "View on map", waze: "Open in Waze",
    waMsg: "Hello GAMA Asesores, I am interested in: ", slogan: "Accounting · Finance · Business Consulting",
    rights: "All rights reserved.", blogHome: "/?lang=en#blog", home_href: "/?lang=en", seeMore: "See all articles",
  },
};

const pageOf = (key, lang) => PAGES.find((p) => p.key === key)[lang];
const services = PAGES.filter((p) => p.type === "service");
const locations = PAGES.filter((p) => p.type === "location");

/* ───────────── CSS compartido ───────────── */
const CSS = `
.gm-h{background:#051e57;padding:14px 5%;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 24px;font-family:Arial,Helvetica,sans-serif}
.gm-b{color:#fff;text-decoration:none;font-family:Georgia,serif;font-size:1.15rem;font-weight:700;letter-spacing:.02em}.gm-b span{color:#f2e485;font-weight:400}
.gm-h nav{display:flex;flex-wrap:wrap;gap:6px 20px}.gm-h nav a{color:#e8e4d8;text-decoration:none;font-size:.85rem}.gm-h nav a:hover{color:#f2e485}
.gm-cta{background:#051e57;color:#fff;padding:44px 5%;text-align:center;font-family:Arial,Helvetica,sans-serif}
.gm-cta h2{font-family:Georgia,serif;color:#f2e485;margin:0 0 10px;font-size:1.5rem}.gm-cta p{max-width:640px;margin:0 auto 22px;color:#e8e4d8;line-height:1.7}
.gm-btn{display:inline-block;background:#b38d47;color:#fff;padding:12px 26px;text-decoration:none;font-weight:700;margin:6px}.gm-btn2{display:inline-block;border:1px solid #f2e485;color:#f2e485;padding:11px 24px;text-decoration:none;font-weight:700;margin:6px}
.gm-f{background:#03122e;color:#c9c4b4;padding:40px 5% 24px;font-family:Arial,Helvetica,sans-serif;font-size:.85rem;line-height:1.7}
.gm-fg{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:28px;max-width:1100px;margin:0 auto}
.gm-f strong{color:#f2e485;display:block;margin-bottom:6px}.gm-f p{margin:0 0 6px}.gm-f ul{list-style:none;margin:0;padding:0}.gm-f a{color:#c9c4b4;text-decoration:none}.gm-f a:hover{color:#f2e485}
.gm-copy{text-align:center;margin:28px 0 0;color:#8a8573;font-size:.78rem}
body.gm-page{margin:0;background:#f8f7f4;color:#3d3830;font-family:Arial,Helvetica,sans-serif;line-height:1.8}
.gm-main{max-width:860px;margin:0 auto;padding:36px 5% 56px}
.gm-main h1,.gm-main h2,.gm-main h3{font-family:Georgia,serif;color:#051e57}
.gm-main h1{font-size:2rem;line-height:1.25;margin:.4em 0}.gm-main h2{font-size:1.35rem;margin:2em 0 .5em}.gm-main h3{font-size:1.05rem;margin:1.4em 0 .3em}
.gm-crumbs{font-size:.8rem;color:#7a7568}.gm-crumbs a{color:#7a7568}
.gm-lead{font-size:1.08rem;border-left:3px solid #b38d47;padding-left:16px}
.gm-main ul{padding-left:1.2em}.gm-main li{margin:.35em 0}.gm-main a{color:#051e57}
.gm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin-top:16px}
.gm-card{background:#fff;border:1px solid rgba(5,30,87,.1);border-top:3px solid #b38d47;padding:18px 20px}.gm-card h2,.gm-card h3{margin:0 0 6px;font-size:1.1rem}.gm-card p{margin:0;font-size:.92rem}
.gm-office{background:#fff;border:1px solid rgba(5,30,87,.1);padding:16px 20px;margin-top:18px}
`;

const GA = `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>`;

/* ───────────── Fragmentos HTML ───────────── */
const header = (lang, altHref) => {
  const t = L[lang];
  const sv = lang === "es" ? HUB.es.path : HUB.en.path;
  const st = pageOf("santateresa", lang).path;
  const br = pageOf("barranca", lang).path;
  return `<header class="gm-h"><a class="gm-b" href="${t.home_href}">GAMA <span>Asesores Contables</span></a><nav aria-label="Principal"><a href="${sv}">${t.services}</a><a href="${st}">Santa Teresa</a><a href="${br}">Barranca</a><a href="${t.blogHome}">${t.blog}</a><a href="${altHref}" hreflang="${lang === "es" ? "en" : "es"}">${t.altNav}</a></nav></header>`;
};

const cta = (lang, topic) => {
  const t = L[lang];
  const wa = `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(t.waMsg + topic)}`;
  return `<section class="gm-cta"><h2>${t.ctaH}</h2><p>${t.ctaP}</p><a class="gm-btn" href="${wa}" rel="noopener">${t.wa}</a><a class="gm-btn2" href="mailto:${CONTACT.email}">${t.mail}</a><p style="margin-top:14px;font-size:.85rem">${CONTACT.phoneIntl} · ${CONTACT.email}</p></section>`;
};

const footer = (lang) => {
  const t = L[lang];
  const links = services.map((s) => `<li><a href="${s[lang].path}">${esc(s[lang].crumb)}</a></li>`).join("");
  const b = OFFICES.barranca, s = OFFICES.santaTeresa;
  return `<footer class="gm-f"><div class="gm-fg"><div><strong>GAMA Asesores Contables</strong><p>${t.slogan}</p><p>CPA Gustavo Monge A.</p><p>${CONTACT.phoneIntl}<br>${CONTACT.email}</p></div><div><strong>${t.offices}</strong><p>${t.barranca}<br>${esc(b.street)}</p><p>${t.santaTeresa}<br>${esc(s.street)}</p><p>${t.hours}</p></div><div><strong>${t.services}</strong><ul>${links}<li><a href="${pageOf("santateresa", lang).path}">Santa Teresa</a></li><li><a href="${pageOf("barranca", lang).path}">Barranca</a></li></ul></div></div><p class="gm-copy">© ${LASTMOD.slice(0, 4)} GAMA Asesores Contables. ${t.rights}</p></footer>`;
};

const head = ({ lang, title, desc, url, alts, ogType = "website", ld }) => {
  const t = L[lang];
  const alt = alts ? alts.map(([hl, href]) => `<link rel="alternate" hreflang="${hl}" href="${DOMAIN}${href}">`).join("") : "";
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${DOMAIN}${url}">
${alt}
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="GAMA Asesores Contables">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${DOMAIN}${url}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${OG_IMAGE}">
${ld.map(jsonLd).join("\n")}
<style>${CSS}</style>
${GA}
</head>
`;
};

const crumbLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${DOMAIN}${url}` })),
});

const faqLd = (faq) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

const hreflangs = (key) => {
  const es = pageOf(key, "es").path, en = pageOf(key, "en").path;
  return [["es-CR", es], ["en", en], ["x-default", es]];
};

const officeHtml = (office, lang) => {
  const t = L[lang];
  const o = OFFICES[office];
  const q = `${o.lat},${o.lng}`;
  return `<div class="gm-office"><strong>${office === "barranca" ? t.barranca : t.santaTeresa}</strong><br>${esc(o.street)}, ${esc(o.locality)}, ${esc(o.region)}, Costa Rica<br><a href="https://www.google.com/maps?q=${q}" rel="noopener">${t.map}</a> · <a href="https://waze.com/ul?ll=${q}&navigate=yes" rel="noopener">${t.waze}</a></div>`;
};

/* ───────────── Páginas de servicio / ubicación ───────────── */
function renderPage(p, lang) {
  const t = L[lang], d = p[lang];
  const hub = lang === "es" ? HUB.es : HUB.en;
  const altLang = lang === "es" ? "en" : "es";
  const altHref = p[altLang].path;
  const crumbs = p.type === "service"
    ? [[t.home, t.home_href], [hub.crumb, hub.path], [d.crumb, d.path]]
    : [[t.home, t.home_href], [d.crumb, d.path]];

  const provider = { "@id": ORG_ID };
  const entity = p.type === "service"
    ? {
        "@context": "https://schema.org", "@type": "Service", name: d.h1, serviceType: d.serviceType,
        description: d.desc, url: `${DOMAIN}${d.path}`, inLanguage: lang === "es" ? "es-CR" : "en",
        provider, areaServed: { "@type": "Country", name: "Costa Rica" },
      }
    : (() => {
        const o = OFFICES[p.office];
        const ent = {
          "@context": "https://schema.org", "@type": "AccountingService",
          "@id": `${DOMAIN}${d.path}#office`, name: `GAMA Asesores Contables — ${o.locality}`,
          url: `${DOMAIN}${d.path}`, telephone: "+50688969883", email: CONTACT.email,
          parentOrganization: provider,
          address: { "@type": "PostalAddress", streetAddress: o.street, addressLocality: o.locality, addressRegion: o.region, addressCountry: "CR" },
          geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
          hasMap: `https://www.google.com/maps?q=${o.lat},${o.lng}`,
          areaServed: p.office === "santaTeresa" ? ["Santa Teresa", "Cóbano", "Península de Nicoya"] : ["Barranca", "Puntarenas"],
        };
        if (p.office === "barranca") {
          ent.openingHoursSpecification = { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" };
        }
        return ent;
      })();

  const related = (d.blog || []).filter((s) => blogTitle[s]).map((s) => `<li><a href="/blog/${s}.html">${blogTitle[s]}</a></li>`).join("");
  const others = services.filter((s) => s.key !== p.key).map((s) => `<li><a href="${s[lang].path}">${esc(s[lang].crumb)}</a></li>`).join("");
  const locs = locations.filter((l) => l.key !== p.key).map((l) => `<li><a href="${l[lang].path}">${esc(l[lang].crumb)}</a></li>`).join("");

  const crumbHtml = crumbs.map(([n, u], i) => (i === crumbs.length - 1 ? esc(n) : `<a href="${u}">${esc(n)}</a>`)).join(" › ");

  return (
    head({ lang, title: d.title, desc: d.desc, url: d.path, alts: hreflangs(p.key), ld: [crumbLd(crumbs), entity, faqLd(d.faq)] }) +
    `<body class="gm-page">
${header(lang, altHref)}
<main class="gm-main">
<nav class="gm-crumbs" aria-label="breadcrumb">${crumbHtml}</nav>
<article>
<h1>${esc(d.h1)}</h1>
<p class="gm-lead">${esc(d.lead)}</p>
<h2>${esc(d.includesTitle)}</h2>
<ul>${d.includes.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
<h2>${esc(d.whenTitle)}</h2>
${d.when.map((w) => `<p>${esc(w)}</p>`).join("")}
${p.type === "location" ? officeHtml(p.office, lang) : ""}
<h2>${t.faq}</h2>
${d.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}
</article>
${related ? `<h2>${t.related}</h2><ul>${related}</ul>` : ""}
<h2>${t.other}</h2><ul>${others}</ul>
<h2>${t.locations}</h2><ul>${locs}</ul>
</main>
${cta(lang, d.crumb)}
${footer(lang)}
</body>
</html>
`
  );
}

function renderHub(lang) {
  const t = L[lang], h = HUB[lang];
  const altLang = lang === "es" ? "en" : "es";
  const crumbs = [[t.home, t.home_href], [h.crumb, h.path]];
  const cards = services.map((s) => `<div class="gm-card"><h2><a href="${s[lang].path}">${esc(s[lang].crumb)}</a></h2><p>${esc(s[lang].desc)}</p></div>`).join("");
  const locCards = locations.map((l) => `<div class="gm-card"><h3><a href="${l[lang].path}">${esc(l[lang].crumb)}</a></h3><p>${esc(l[lang].desc)}</p></div>`).join("");
  const list = {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s[lang].crumb, url: `${DOMAIN}${s[lang].path}` })),
  };
  return (
    head({ lang, title: h.title, desc: h.desc, url: h.path, alts: [["es-CR", HUB.es.path], ["en", HUB.en.path], ["x-default", HUB.es.path]], ld: [crumbLd(crumbs), list] }) +
    `<body class="gm-page">
${header(lang, HUB[altLang].path)}
<main class="gm-main">
<nav class="gm-crumbs" aria-label="breadcrumb"><a href="${t.home_href}">${t.home}</a> › ${esc(h.crumb)}</nav>
<h1>${esc(h.h1)}</h1>
<p class="gm-lead">${esc(h.lead)}</p>
<div class="gm-grid">${cards}</div>
<h2>${h.locTitle}</h2>
<div class="gm-grid">${locCards}</div>
</main>
${cta(lang, h.crumb)}
${footer(lang)}
</body>
</html>
`
  );
}

/* ───────────── Artículos del blog (HTML estático existente) ───────────── */
const MONTHS = { enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, setiembre: 9, octubre: 10, noviembre: 11, diciembre: 12 };

function processBlog(file) {
  const slug = file.replace(/\.html$/, "");
  const fp = path.join(blogDir, file);
  let html = fs.readFileSync(fp, "utf8");

  // 1) Quitar la redirección JS a /#blog/N (Google la trata como redirección a la portada)
  html = html.replace(/<script>\s*\/\* Visitantes humanos[\s\S]*?<\/script>\s*/g, "");

  // 2) Quitar el botón antiguo "Ver este artículo…" (apuntaba a /#blog/N)
  html = html.replace(/<p><a class="cta" href="\/#blog\/\d+">[^<]*<\/a><\/p>\s*/g, "");

  // 3) CSS + GA4 en <head>
  if (!html.includes('id="gm-shell"')) {
    html = html.replace("</head>", `<style id="gm-shell">${CSS}</style>\n${GA}\n</head>`);
  }

  // 4) Cabecera, CTA y pie con enlaces internos
  if (!html.includes("<!--gm-header-->")) {
    html = html.replace(/<body>\s*<main>/, `<body>\n<!--gm-header-->${header("es", HUB.en.path)}<!--/gm-header-->\n<main>`);
  }
  if (!html.includes("<!--gm-footer-->")) {
    html = html.replace("</main>", `<p><a href="/#blog">${L.es.seeMore}</a></p>\n</main>\n<!--gm-footer-->${cta("es", blogTitle[slug])}${footer("es")}<!--/gm-footer-->`);
  }

  // 5) Schema: Article con autor persona, fechas y breadcrumb
  const dm = html.match(/<span class="tag">[^<]*<\/span>\s*&nbsp;\s*(\d{1,2}) de ([a-záéíóú]+),? (\d{4})/i);
  const url = `${DOMAIN}/blog/${file}`;
  html = html.replace(/<script type="application\/ld\+json">(\{"@context": "https:\/\/schema\.org", "@type": "Article"[\s\S]*?)<\/script>/, (_m, json) => {
    const a = JSON.parse(json);
    a.inLanguage = "es-CR";
    a.author = { "@type": "Person", name: "Gustavo Monge Alemán", jobTitle: "Contador Público Autorizado", url: `${DOMAIN}/` };
    a.publisher = { "@type": "Organization", "@id": ORG_ID, name: "GAMA Asesores Contables", logo: { "@type": "ImageObject", url: `${DOMAIN}/favicon-192x192.png` } };
    if (dm && MONTHS[dm[2].toLowerCase()]) {
      a.datePublished = `${dm[3]}-${String(MONTHS[dm[2].toLowerCase()]).padStart(2, "0")}-${dm[1].padStart(2, "0")}`;
    }
    a.dateModified = prevLastmod[url] || LASTMOD;
    return jsonLd(a);
  });
  if (!html.includes('"BreadcrumbList"')) {
    html = html.replace("</head>", `${jsonLd(crumbLd([[L.es.home, "/"], [blogTitle[slug], `/blog/${file}`]]))}\n</head>`);
  }
  // body class para fondo/tipografía coherentes
  fs.writeFileSync(fp, html);
}

/* ───────────── Sitemap ───────────── */
function buildSitemap() {
  const urls = [];
  const add = (loc, { lastmod, changefreq, priority, alts } = {}) => {
    const alt = alts ? alts.map(([hl, href]) => `\n    <xhtml:link rel="alternate" hreflang="${hl}" href="${DOMAIN}${href}"/>`).join("") : "";
    urls.push(`  <url>\n    <loc>${DOMAIN}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}${changefreq ? `\n    <changefreq>${changefreq}</changefreq>` : ""}${priority ? `\n    <priority>${priority}</priority>` : ""}${alt}\n  </url>`);
  };
  add("/", { lastmod: LASTMOD, changefreq: "monthly", priority: "1.0" });
  const hubAlts = [["es-CR", HUB.es.path], ["en", HUB.en.path], ["x-default", HUB.es.path]];
  for (const lang of ["es", "en"]) add(HUB[lang].path, { lastmod: LASTMOD, changefreq: "monthly", priority: "0.9", alts: hubAlts });
  for (const p of PAGES) {
    for (const lang of ["es", "en"]) {
      add(p[lang].path, { lastmod: LASTMOD, changefreq: "monthly", priority: p.type === "location" ? "0.9" : "0.8", alts: hreflangs(p.key) });
    }
  }
  for (const f of blogFiles) {
    const loc = `/blog/${f}`;
    add(loc, { lastmod: prevLastmod[`${DOMAIN}${loc}`] || LASTMOD, changefreq: "monthly", priority: "0.7" });
  }
  write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`);
}

/* ───────────── index.html (schema de la organización + contenido pre-renderizado) ───────────── */
function patchIndex() {
  const fp = path.join(ROOT, "index.html");
  let html = fs.readFileSync(fp, "utf8");
  const b = OFFICES.barranca, s = OFFICES.santaTeresa;
  const post = (o) => ({ "@type": "PostalAddress", streetAddress: o.street, addressLocality: o.locality, addressRegion: o.region, addressCountry: "CR" });
  const org = {
    "@context": "https://schema.org", "@type": "AccountingService", "@id": ORG_ID,
    name: "GAMA Asesores Contables", alternateName: "GAMA CPA Consulting", url: `${DOMAIN}/`,
    logo: `${DOMAIN}/favicon-192x192.png`, image: `${DOMAIN}/gustavo_monge_cpa.jpg`,
    description: "Firma contable en Costa Rica: contabilidad, NIIF para PYMES, declaraciones tributarias, auditoría y certificaciones CPA. Oficinas en Barranca (Puntarenas) y Santa Teresa (Cóbano).",
    telephone: "+50688969883", email: CONTACT.email,
    address: post(b), geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    hasMap: `https://www.google.com/maps?q=${b.lat},${b.lng}`,
    openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    department: [{
      "@type": "AccountingService", name: "GAMA Asesores Contables — Santa Teresa", url: `${DOMAIN}${pageOf("santateresa", "es").path}`,
      address: post(s), geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
    }],
    founder: { "@type": "Person", name: "Gustavo Monge Alemán", jobTitle: "Contador Público Autorizado", email: CONTACT.email },
    areaServed: { "@type": "Country", name: "Costa Rica" }, knowsLanguage: ["es", "en"],
    sameAs: SOCIAL, priceRange: "$$", currenciesAccepted: "CRC, USD", paymentAccepted: "Transferencia bancaria, SINPE Móvil",
    hasOfferCatalog: {
      "@type": "OfferCatalog", name: "Servicios contables, tributarios y de auditoría",
      itemListElement: services.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p.es.crumb, url: `${DOMAIN}${p.es.path}` } })),
    },
  };
  const site = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${DOMAIN}/#website`, url: `${DOMAIN}/`, name: "GAMA Asesores Contables", inLanguage: ["es-CR", "en"], publisher: { "@id": ORG_ID } };
  const ld = `<!--seo-ld-->${jsonLd(org)}\n  ${jsonLd(site)}<!--/seo-ld-->`;

  const links = services.map((p) => `<li><a href="${p.es.path}">${esc(p.es.crumb)}</a> — ${esc(p.es.desc)}</li>`).join("");
  const pre = `<!--seo-prerender--><main style="font-family:Georgia,serif;max-width:900px;margin:0 auto;padding:48px 5%;color:#051e57;line-height:1.7"><h1>GAMA Asesores Contables: contabilidad, impuestos y auditoría en Costa Rica</h1><p style="font-family:Arial,sans-serif;color:#3d3830">Firma contable dirigida por el CPA Gustavo Monge A., con oficinas en Barranca de Puntarenas y en Santa Teresa de Cóbano. Atención en español e inglés.</p><h2>Servicios</h2><ul style="font-family:Arial,sans-serif;color:#3d3830">${links}</ul><h2>Oficinas</h2><ul style="font-family:Arial,sans-serif;color:#3d3830"><li><a href="${pageOf("barranca", "es").path}">Barranca, Puntarenas</a>: ${esc(b.street)}</li><li><a href="${pageOf("santateresa", "es").path}">Santa Teresa, Cóbano</a>: ${esc(s.street)}</li></ul><p style="font-family:Arial,sans-serif"><a href="https://wa.me/${CONTACT.wa}">WhatsApp ${CONTACT.phoneIntl}</a> · <a href="mailto:${CONTACT.email}">${CONTACT.email}</a> · <a href="${HUB.en.path}">English</a></p></main><!--/seo-prerender-->`;

  html = html.replace(/<!--seo-ld-->[\s\S]*?<!--\/seo-ld-->/, () => ld);
  html = html.replace(/<!--seo-prerender-->[\s\S]*?<!--\/seo-prerender-->/, () => pre);
  fs.writeFileSync(fp, html);
}

/* ───────────── Ejecución ───────────── */
for (const lang of ["es", "en"]) write(`${HUB[lang].path.replace(/^\//, "")}index.html`, renderHub(lang));
for (const p of PAGES) for (const lang of ["es", "en"]) write(`${p[lang].path.replace(/^\//, "")}index.html`, renderPage(p, lang));
for (const f of blogFiles) processBlog(f);
buildSitemap();
patchIndex();
console.log(`SEO: ${PAGES.length * 2 + 2} páginas generadas, ${blogFiles.length} artículos procesados, sitemap actualizado.`);
