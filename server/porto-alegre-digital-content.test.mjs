import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("Porto Alegre Digital content keeps the approved commercial contract", async () => {
  const source = await read("../src/data/portoAlegreDigital.ts");

  assert.match(source, /644_000/);
  assert.match(source, /521_000/);
  assert.match(source, /583_000/);
  assert.match(source, /1_748_000/);
  assert.match(source, /soma nominal/i);
  assert.match(source, /três publicações/i);
  assert.match(source, /633\.906/);
  assert.match(source, /visualizações/);
  assert.match(source, /66\.109/);
  assert.match(source, /interações/);
  assert.match(source, /CRM próprio/);
  assert.match(source, /implantação progressiva/i);
  assert.match(source, /400 contatos/);
  assert.match(source, /cinco contratos recorrentes/i);
  assert.match(source, /Podemos iniciar a implantação desta operação comercial\?/);

  assert.doesNotMatch(source, /R\$\s*\d/);
  assert.doesNotMatch(source, /Kommo/i);
  assert.doesNotMatch(source, /RD Station/i);
  assert.doesNotMatch(source, /resultado garantido/i);
});

test("private presentation exposes robots control and hides the global announcement", async () => {
  const seo = await read("../src/components/SeoHead.tsx");
  const routeBar = await read("../src/components/RouteAnnouncementBar.tsx");

  assert.match(seo, /robots\?: string/);
  assert.match(seo, /meta name="robots"/);
  assert.match(routeBar, /porto-alegre-digital/);
  assert.match(routeBar, /return null/);
  assert.match(routeBar, /AnnouncementBar/);
});
