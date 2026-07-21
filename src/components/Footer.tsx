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
          <div>
            <p className="font-semibold text-text">Leonardo Brasil</p>
            <p className="text-xs text-muted">Estrutura de Vendas para Negócios Locais</p>
          </div>

          {/* Redes Sociais */}
          <div className="flex items-center gap-4 py-2 sm:py-0">
            <a
              href="https://www.instagram.com/leonardobrasil.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Leonardo Brasil"
              className="p-2 text-muted hover:text-accent hover:scale-110 transition-all duration-200 rounded-lg hover:bg-white/5"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/leonardobrasil.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook do Leonardo Brasil"
              className="p-2 text-muted hover:text-accent hover:scale-110 transition-all duration-200 rounded-lg hover:bg-white/5"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://www.threads.com/@leonardobrasil.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads do Leonardo Brasil"
              className="p-2 text-muted hover:text-accent hover:scale-110 transition-all duration-200 rounded-lg hover:bg-white/5"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.186 24c-3.21 0-5.88-.952-7.72-2.754C2.553 19.37 1.62 16.59 1.62 13.06c0-3.69 1.002-6.67 2.977-8.86C6.634 1.92 9.513.78 13.064.78c3.67 0 6.64 1.18 8.84 3.51 2.05 2.17 3.12 5.12 3.12 8.78 0 .61-.03 1.23-.1 1.83-.24 2.11-.99 3.93-2.22 5.4-1.43 1.71-3.37 2.68-5.77 2.89-2.31.2-4.32-.47-5.96-1.98-1.57-1.45-2.37-3.41-2.37-5.83 0-2.3.75-4.2 2.22-5.64 1.41-1.38 3.32-2.07 5.67-2.07 1.05 0 2.06.14 3.01.43v-1.78c0-1.85-.56-3.32-1.66-4.37-1.12-1.07-2.69-1.61-4.66-1.61-1.82 0-3.36.46-4.57 1.36-1.17.87-1.86 2.17-2.06 3.86h-2.88c.24-2.86 1.4-5.11 3.44-6.69C10.15.69 12.82.02 16.14.02c3.42 0 6.07.97 7.89 2.89 1.77 1.87 2.66 4.47 2.66 7.74 0 .74-.04 1.49-.12 2.24-.31 2.8-1.33 5.2-3.03 7.15-2.06 2.36-4.8 3.65-8.15 3.85-.36.02-.72.03-1.09.03-3.03 0-5.62-.97-7.7-2.88-2.06-1.89-3.1-4.71-3.1-8.38 0-3.53 1.07-6.38 3.18-8.47 2.12-2.1 5.01-3.17 8.59-3.17 1.63 0 3.19.26 4.64.78v2.96c-1.33-.53-2.81-.8-4.4-.8-2.73 0-4.89.78-6.42 2.33-1.53 1.54-2.3 3.64-2.3 6.24 0 2.76.77 4.9 2.29 6.37 1.49 1.44 3.43 2.16 5.76 2.16.29 0 .58-.01.87-.03 1.83-.15 3.32-.87 4.43-2.14.99-1.13 1.58-2.58 1.76-4.3.05-.51.08-1.02.08-1.52 0-2.61-.71-4.66-2.11-6.1-1.37-1.41-3.32-2.12-5.78-2.12-1.63 0-3.01.44-4.09 1.32-1.08.88-1.63 2.13-1.63 3.71 0 1.53.51 2.76 1.53 3.65.98.86 2.32 1.29 3.98 1.29 1.49 0 2.79-.34 3.87-1.02v2.66c-1.1.58-2.45.87-4.04.87-2.44 0-4.42-.68-5.91-2.04-1.46-1.34-2.2-3.15-2.2-5.4 0-2.31.78-4.21 2.32-5.65 1.56-1.46 3.66-2.2 6.25-2.2 3.28 0 5.86.97 7.68 2.89 1.8 1.9 2.71 4.54 2.71 7.85 0 .74-.05 1.48-.14 2.22-.3 2.45-1.19 4.53-2.66 6.18-1.8 2.01-4.24 3.09-7.25 3.23-.28.01-.56.02-.85.02z"/>
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="mailto:contato@leonardobrasil.com.br" className="hover:text-text transition-colors">contato@leonardobrasil.com.br</a>
            <span className="text-line-strong">·</span>
            <a href="https://funilcomercial.com" target="_blank" rel="noreferrer" className="hover:text-text transition-colors">Funil Comercial ↗</a>
          </div>
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
