import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const route = "/porto-alegre-digital";
const htmlPath = path.join(
  root,
  "dist",
  "porto-alegre-digital",
  "index.html",
);
const publicSitemapPath = path.join(root, "public", "sitemap.xml");
const distSitemapPath = path.join(root, "dist", "sitemap.xml");
const assetDirectories = [
  path.join(root, "public", "porto-alegre-digital"),
  path.join(root, "dist", "porto-alegre-digital"),
];
const assets = [
  "perfil-porto-alegre-oficial.webp",
  "perfil-porto-alegre.webp",
  "perfil-rio-grande-do-sul.webp",
  "metricas-publicacao-01.webp",
  "metricas-publicacao-02.webp",
  "metricas-publicacao-03.webp",
  "script-vendas.webp",
];

assert.equal(
  existsSync(htmlPath),
  true,
  `HTML pré-renderizado ausente: ${htmlPath}`,
);

const html = readFileSync(htmlPath, "utf8");
const publicSitemap = readFileSync(publicSitemapPath, "utf8");
const distSitemap = readFileSync(distSitemapPath, "utf8");

assert.match(html, /noindex, nofollow/);
assert.match(
  html,
  /Podemos iniciar a implantação desta operação comercial\?/,
);
assert.match(html, /CRM próprio/);
assert.match(html, /1\.748\.000/);
assert.doesNotMatch(html, /R\$\s*\d/);
assert.doesNotMatch(html, /Kommo|RD Station/i);
assert.doesNotMatch(html, /wa\.me|WhatsApp/i);
assert.doesNotMatch(html, /Conheça minha Consultoria Comercial/i);
assert.doesNotMatch(publicSitemap, new RegExp(route));
assert.doesNotMatch(distSitemap, new RegExp(route));

for (const directory of assetDirectories) {
  for (const asset of assets) {
    const assetPath = path.join(directory, asset);
    assert.equal(existsSync(assetPath), true, `Ativo ausente: ${assetPath}`);
    assert.ok(statSync(assetPath).size > 0, `Ativo vazio: ${assetPath}`);
  }
}

console.log(
  "[porto-alegre-digital] HTML, conteúdo, chrome, sitemap e ativos validados.",
);
