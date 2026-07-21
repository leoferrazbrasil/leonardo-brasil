import fs from "fs";
import path from "path";

const SITEMAP_PATH = path.resolve(process.cwd(), "public/sitemap.xml");
const NICHES_PATH = path.resolve(process.cwd(), "src/data/niches.ts");

// Rotas estáticas
const STATIC_ROUTES = [
  "",
  "/termos",
  "/privacidade",
  "/exclusao-de-dados"
];

// Lê o arquivo de nichos usando regex para extrair os slugs (evita compilar TypeScript no build do node)
function getDynamicNiches() {
  try {
    const content = fs.readFileSync(NICHES_PATH, "utf8");
    const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
    return matches.map((m) => `/estrutura-de-vendas-para-${m[1]}`);
  } catch (error) {
    console.error("Erro ao ler niches.ts para o Sitemap", error);
    return [];
  }
}

function generateSitemapXML() {
  const baseUrl = "https://leonardobrasil.com.br";
  const date = new Date().toISOString();
  
  const dynamicRoutes = getDynamicNiches();
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of allRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>${route === "" ? "weekly" : "monthly"}</changefreq>\n`;
    xml += `    <priority>${route === "" ? "1.0" : "0.8"}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

try {
  const xmlContent = generateSitemapXML();
  fs.writeFileSync(SITEMAP_PATH, xmlContent, "utf8");
  console.log(`Sitemap gerado com sucesso em ${SITEMAP_PATH}`);
} catch (error) {
  console.error("Erro ao gerar sitemap:", error);
}
