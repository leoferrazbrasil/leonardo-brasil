import { useState, useEffect } from "react";
import { Link } from "../lib/local-router";
import { SeoHead } from "../components/SeoHead";
import { NICHES } from "../data/niches";
import { LOCATIONS, LocationData } from "../data/locations";

export default function CitiesDirectory() {
  const [selectedState, setSelectedState] = useState<string>("TODOS");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const states = ["TODOS", ...Array.from(new Set(LOCATIONS.map((l) => l.state)))];

  const filteredLocations = LOCATIONS.filter((loc) => {
    const matchesState = selectedState === "TODOS" || loc.state === selectedState;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesSearch;
  });

  // Agrupa cidades por estado para exibição visual limpa
  const locationsByState = filteredLocations.reduce((acc, loc) => {
    if (!acc[loc.state]) acc[loc.state] = [];
    acc[loc.state].push(loc);
    return acc;
  }, {} as Record<string, LocationData[]>);

  const stateNames: Record<string, string> = {
    SP: "São Paulo",
    RJ: "Rio de Janeiro",
    SC: "Santa Catarina",
    PR: "Paraná",
    MG: "Minas Gerais",
  };

  return (
    <div className="min-h-screen bg-ink text-text font-sans">
      <SeoHead
        title="Regiões & Cidades Atendidas | Leonardo Brasil"
        description="Diretório completo de estrutura de vendas para negócios locais e profissionais de saúde nas principais capitais e cidades do Brasil."
        canonicalUrl="https://leonardobrasil.com.br/cidades"
      />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold tracking-tight hover:text-accent transition-colors">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30">
              <svg viewBox="0 0 48 48" className="w-[18px] h-[18px]" fill="none">
                <rect x="6" y="9" width="36" height="9" rx="4" fill="#3b82f6" opacity="0.4" />
                <rect x="13" y="21" width="22" height="9" rx="4" fill="#3b82f6" opacity="0.7" />
                <rect x="20" y="33" width="8" height="9" rx="4" fill="#60a5fa" />
              </svg>
            </span>
            Leonardo Brasil
          </Link>
          <nav className="flex gap-6 items-center">
            <Link to="/calculadora" className="text-sm font-bold text-accent-400 hover:text-accent-300 transition-colors">Calculadora</Link>
            <Link to="/" className="text-sm font-medium text-muted hover:text-text transition-colors">
              Voltar ao Início
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          {/* HERO E BUSCA */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent-400 uppercase tracking-wide mb-4">
              Cobertura Regional
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Estrutura de Vendas <span className="text-accent-400">na sua Cidade</span>
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Explore o ecossistema de aquisição e conversão desenhado sob medida para profissionais da saúde e negócios locais nas principais regiões do Sul e Sudeste.
            </p>

            {/* Filtros */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                type="text"
                placeholder="Buscar cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 rounded-xl border border-line bg-panel px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none"
              />
              <div className="flex flex-wrap justify-center gap-1.5">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      selectedState === st
                        ? "bg-accent text-white shadow-sm"
                        : "bg-panel text-muted hover:text-text border border-line"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GRID POR ESTADO E NICHO */}
          <div className="space-y-16">
            {Object.keys(locationsByState).length === 0 ? (
              <div className="text-center py-12 text-muted">
                Nenhuma cidade encontrada para a busca "{searchTerm}".
              </div>
            ) : (
              Object.entries(locationsByState).map(([stateCode, cities]) => (
                <section key={stateCode} className="rounded-3xl border border-line bg-panel/30 p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-8 border-b border-line pb-4">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-accent/20 font-black text-accent-400 text-sm border border-accent/30">
                      {stateCode}
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold">{stateNames[stateCode] || stateCode}</h2>
                      <p className="text-xs text-muted">{cities.length} cidades mapeadas</p>
                    </div>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {cities.map((city) => (
                      <div key={city.slug} className="rounded-2xl border border-line bg-panel p-6 flex flex-col justify-between hover:border-accent/40 transition-colors">
                        <div>
                          <h3 className="text-lg font-bold text-text flex items-center justify-between mb-4">
                            {city.name}
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-ink border border-line text-accent-400">
                              {city.state}
                            </span>
                          </h3>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
                            Nichos Atendidos:
                          </p>
                          <div className="flex flex-col gap-1.5">
                            {NICHES.map((niche) => (
                              <Link
                                key={niche.slug}
                                to={`/estrutura-de-vendas-para-${niche.slug}-em-${city.slug}`}
                                className="text-sm text-muted hover:text-accent-400 hover:translate-x-1 transition-all flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-400/60" />
                                {niche.badge} em {city.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line mt-20">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="font-semibold text-text hover:text-accent transition-colors">
              Leonardo Brasil
            </Link>
            <a href="mailto:contato@leonardobrasil.com.br" className="hover:text-text transition-colors">
              contato@leonardobrasil.com.br
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-line text-center text-xs leading-relaxed text-muted/80">
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-3">
              <Link to="/termos" className="hover:text-text transition-colors">Termos</Link>
              <span className="text-line-strong">·</span>
              <Link to="/privacidade" className="hover:text-text transition-colors">Privacidade</Link>
              <span className="text-line-strong">·</span>
              <Link to="/exclusao-de-dados" className="hover:text-text transition-colors">Exclusão de Dados</Link>
              <span className="text-line-strong">·</span>
              <Link to="/brandbook" className="hover:text-text transition-colors">Brandbook</Link>
              <span className="text-line-strong">·</span>
              <Link to="/cidades" className="hover:text-text transition-colors">Cidades Atendidas</Link>
            </div>
            <p>LEONARDO FERRAZ DA SILVA BRASIL · CNPJ 65.993.728/0001-07</p>
            <p className="mt-1">© {new Date().getFullYear()} · leonardobrasil.com.br</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
