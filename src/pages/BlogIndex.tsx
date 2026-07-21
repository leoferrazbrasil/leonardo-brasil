import { Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { BLOG_POSTS } from "../data/blogData";

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-ink text-text font-sans">
      <SeoHead 
        title="Blog e Estratégias de Vendas | Leonardo Brasil"
        description="Aprenda como estruturar a máquina de vendas da sua empresa. Artigos sobre CRM, Tráfego Pago, e SEO."
        canonicalUrl="https://leonardobrasil.com.br/blog"
      />
      
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold tracking-tight hover:text-accent transition-colors">
            Leonardo Brasil
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-sm font-medium text-muted hover:text-text transition-colors">
              Voltar ao Início
            </Link>
          </nav>
        </div>
      </header>

      <main className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Conteúdo <span className="text-accent-400">Estratégico</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              A inteligência e as táticas exatas que usamos para estruturar funis de vendas B2B e captação de clientes High-Ticket.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="group flex flex-col rounded-2xl border border-line bg-panel p-6 hover:border-accent/30 transition-all hover:-translate-y-1 shadow-lg">
                <div className="flex items-center gap-3 text-xs mb-4">
                  <time dateTime={post.date} className="text-muted font-medium">
                    {new Date(post.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 font-semibold text-accent-400">
                    {post.category}
                  </span>
                </div>
                
                <Link to={`/blog/${post.slug}`} className="block mt-2">
                  <h2 className="text-2xl font-bold leading-tight group-hover:text-accent-300 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="mt-4 text-muted leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent-400 text-sm overflow-hidden">
                    {post.authorAvatar ? (
                      <img src={post.authorAvatar} alt={post.author} className="h-full w-full object-cover" />
                    ) : (
                      post.author.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{post.author}</p>
                    <p className="text-xs text-muted">Especialista em Vendas</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-line mt-20">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="font-semibold text-text hover:text-accent transition-colors">Leonardo Brasil</Link>
            <a href="mailto:contato@leonardobrasil.com.br" className="hover:text-text transition-colors">contato@leonardobrasil.com.br</a>
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
            <p className="mt-1">© {new Date().getFullYear()} · leonardobrasil.com.br</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
