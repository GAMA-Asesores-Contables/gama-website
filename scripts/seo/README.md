# Páginas SEO de GAMA

- `pages.mjs`: textos de cada servicio y ubicación (español e inglés). Es el único archivo que normalmente se edita.
- `site.mjs`: teléfonos, direcciones, redes y fecha `LASTMOD` (actualícela cuando cambie contenido).
- `generate.mjs`: construye las páginas, repara los artículos del blog, regenera `sitemap.xml` y el schema/pre-render de `index.html`.

`npm run seo` lo ejecuta a mano; `npm run build` (Vercel) lo ejecuta automáticamente antes de compilar.
No edite a mano `public/servicios`, `public/en`, `public/contador-*` ni `public/sitemap.xml`: se regeneran.
