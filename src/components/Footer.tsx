import { Link } from "react-router-dom";
import { NICHES } from "../data/niches";
import { LOCATIONS } from "../data/locations";

const TOP_LOCATIONS = LOCATIONS.filter(l => 
  ["sao-paulo", "rio-de-janeiro", "belo-horizonte", "curitiba", "balneario-camboriu", "florianopolis"].includes(l.slug)
);

export function Footer() {
  return (
    <footer className="border-t border-line mt-12 bg-[#080d18]">
      <div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted">
        
        {/* SEO Linking Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 pb-10 border-b border-line">
          <div>
            <h4 className="font-semibold text-text mb-4">Áreas de Atuação (Especialidades)</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {NICHES.map(niche => (
                <li key={niche.slug}>
                  <Link to={`/estrutura-de-vendas-para-${niche.slug}`} className="hover:text-primary transition-colors">
                    {niche.badge}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-4">Principais Cidades</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOP_LOCATIONS.map(city => (
                <li key={city.slug}>
                  <Link to={`/estrutura-de-vendas-para-dentistas-em-${city.slug}`} className="hover:text-primary transition-colors">
                    Em {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors mt-2 block font-medium underline underline-offset-4">
                  Ler Artigos do Blog →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-text">Leonardo Brasil</p>
          <a href="mailto:contato@leonardobrasil.com.br" className="hover:text-text transition-colors">contato@leonardobrasil.com.br</a>
          <a href="https://funilcomercial.com" target="_blank" rel="noreferrer" className="hover:text-text transition-colors">Funil Comercial ↗</a>
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
          </div>
          <p>LEONARDO FERRAZ DA SILVA BRASIL · CNPJ 65.993.728/0001-07</p>
          <p className="mt-1">© {new Date().getFullYear()} · Estrutura de vendas para negócio local · leonardobrasil.com.br</p>
        </div>
      </div>
    </footer>
  );
}
