import fs from "fs";
import path from "path";

const SITEMAP_PATH = path.resolve(process.cwd(), "public/sitemap.xml");
const NICHES_PATH = path.resolve(process.cwd(), "src/data/niches.ts");
const BLOG_PATH = path.resolve(process.cwd(), "src/data/blogData.ts");
const LOCATIONS_PATH = path.resolve(process.cwd(), "src/data/locations.ts");

// Rotas estáticas
const STATIC_ROUTES = [
  "",
  "/termos",
  "/privacidade",
  "/exclusao-de-dados",
  "/blog"
];

// Lê o arquivo de nichos usando regex
function getDynamicNiches() {
  try {
    const content = fs.readFileSync(NICHES_PATH, "utf8");
    const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
    return matches.map((m) => m[1]); // Retorna apenas o slug cru
  } catch (error) {
    console.error("Erro ao ler niches.ts para o Sitemap", error);
    return [];
  }
}

// Lê o arquivo de cidades usando regex
function getLocations() {
  try {
    const content = fs.readFileSync(LOCATIONS_PATH, "utf8");
    const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
    return matches.map((m) => m[1]); // Retorna apenas o slug cru
  } catch (error) {
    console.error("Erro ao ler locations.ts para o Sitemap", error);
    return [];
  }
}

// Lê o arquivo de blog usando regex
function getDynamicBlogPosts() {
  try {
    const content = fs.readFileSync(BLOG_PATH, "utf8");
    const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
    return matches.map((m) => `/blog/${m[1]}`);
  } catch (error) {
    console.error("Erro ao ler blogData.ts para o Sitemap", error);
    return [];
  }
}

function generateSitemapXML() {
  const baseUrl = "https://leonardobrasil.com.br";
  const date = new Date().toISOString();
  
  const nicheSlugs = getDynamicNiches();
  const locationSlugs = getLocations();
  const blogRoutes = getDynamicBlogPosts();
  
  const dynamicNicheRoutes = nicheSlugs.map(slug => `/estrutura-de-vendas-para-${slug}`);
  const programmaticCityRoutes = [];
  
  nicheSlugs.forEach(niche => {
    locationSlugs.forEach(city => {
      programmaticCityRoutes.push(`/estrutura-de-vendas-para-${niche}-em-${city}`);
    });
  });

  const allRoutes = [...STATIC_ROUTES, ...dynamicNicheRoutes, ...programmaticCityRoutes, ...blogRoutes];

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
