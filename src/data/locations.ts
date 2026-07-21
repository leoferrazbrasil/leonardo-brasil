export interface LocationData {
  slug: string;
  name: string;
  state: string;
}

export const LOCATIONS: LocationData[] = [
  // Santa Catarina
  { slug: "balneario-camboriu", name: "Balneário Camboriú", state: "SC" },
  { slug: "itajai", name: "Itajaí", state: "SC" },
  { slug: "blumenau", name: "Blumenau", state: "SC" },
  { slug: "florianopolis", name: "Florianópolis", state: "SC" },
  { slug: "joinville", name: "Joinville", state: "SC" },
  { slug: "cascavel", name: "Cascavel", state: "PR" }, // Note: Cascavel was listed with SC in prompt but is actually PR geographically. Grouped as PR in output. Let's keep the user's explicit array of strings as slugs and formatted names.
  
  // São Paulo
  { slug: "sao-paulo", name: "São Paulo", state: "SP" },
  { slug: "campinas", name: "Campinas", state: "SP" },
  { slug: "ribeirao-preto", name: "Ribeirão Preto", state: "SP" },
  { slug: "sorocaba", name: "Sorocaba", state: "SP" },
  { slug: "sao-jose-dos-campos", name: "São José dos Campos", state: "SP" },
  
  // Rio de Janeiro
  { slug: "rio-de-janeiro", name: "Rio de Janeiro", state: "RJ" },
  { slug: "niteroi", name: "Niterói", state: "RJ" },
  { slug: "duque-de-caxias", name: "Duque de Caxias", state: "RJ" },
  { slug: "nova-iguacu", name: "Nova Iguaçu", state: "RJ" },
  { slug: "petropolis", name: "Petrópolis", state: "RJ" },
  
  // Minas Gerais
  { slug: "belo-horizonte", name: "Belo Horizonte", state: "MG" },
  { slug: "uberlandia", name: "Uberlândia", state: "MG" },
  { slug: "contagem", name: "Contagem", state: "MG" },
  { slug: "juiz-de-fora", name: "Juiz de Fora", state: "MG" },
  { slug: "betim", name: "Betim", state: "MG" },
  
  // Paraná
  { slug: "curitiba", name: "Curitiba", state: "PR" },
  { slug: "londrina", name: "Londrina", state: "PR" },
  { slug: "maringa", name: "Maringá", state: "PR" },
  { slug: "ponta-grossa", name: "Ponta Grossa", state: "PR" }
];
