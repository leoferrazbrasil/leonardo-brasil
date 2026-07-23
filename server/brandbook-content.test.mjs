import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("brandbook includes the business positioning content", async () => {
  const source = await readFile(new URL("../src/pages/Brandbook.tsx", import.meta.url), "utf8");

  assert.match(source, /Sobre o Negocio|Sobre o Negócio/);
  assert.match(source, /Funil Comercial/);
  assert.match(source, /Presenca digital|Presença digital/);
  assert.match(source, /Conversao no WhatsApp|Conversão no WhatsApp/);
  assert.match(source, /Vantagem Competitiva/);
  assert.match(source, /Clientes-Alvo/);
  assert.match(source, /CRM desenvolvido por ele mesmo/);
});
