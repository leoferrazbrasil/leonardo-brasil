import { Helmet } from "react-helmet-async";
import { useLocation } from "../lib/local-router";

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: Record<string, any> | Record<string, any>[];
  includeBrandGraph?: boolean;
  robots?: string;
}

export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = "website",
  schema,
  includeBrandGraph = true,
  robots,
}: SeoHeadProps) {
  const location = useLocation();
  const currentPath = location.pathname === "/" ? "" : location.pathname;
  
  const defaultTitle = "Leonardo Brasil — Estrutura de Vendas para Negócios Locais";
  const defaultDescription =
    "Leonardo Brasil monta a estrutura de vendas do seu negócio local, presença no Google, aquisição, conversão no WhatsApp e escala. Diagnóstico gratuito.";
  const autoCanonical = `https://leonardobrasil.com.br${currentPath}`;
  const defaultOgImage = "https://leonardobrasil.com.br/logo-completo.png";

  const finalTitle = title
    ? title.includes("Leonardo Brasil")
      ? title
      : `${title} | Leonardo Brasil`
    : defaultTitle;
  const finalDesc = description || defaultDescription;
  const finalUrl = canonicalUrl || autoCanonical;
  const finalOgImage = ogImage || defaultOgImage;

  // Grafo de Entidade Oficial da Marca (Knowledge Graph for Google & AI Engines)
  const brandGraphSchema = includeBrandGraph
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://leonardobrasil.com.br/#organization",
            name: "Leonardo Brasil",
            legalName: "LEONARDO FERRAZ DA SILVA BRASIL",
            url: "https://leonardobrasil.com.br",
            logo: "https://leonardobrasil.com.br/logo-completo.png",
            image: "https://leonardobrasil.com.br/logo-completo.png",
            email: "contato@leonardobrasil.com.br",
            taxID: "65.993.728/0001-07",
            description:
              "Estrutura de vendas para negócios locais e profissionais de saúde: presença no Google, aquisição de pacientes particulares, conversão no WhatsApp e escala.",
            sameAs: [
              "https://www.instagram.com/leonardobrasil.com.br/",
              "https://www.facebook.com/leonardobrasil.com.br",
              "https://funilcomercial.com",
            ],
            knowsAbout: [
              "Estrutura de Vendas para Psicólogas",
              "Captação de Pacientes Particulares no Google",
              "SEO Local para Médicos e Dentistas",
              "Funil de Atendimento Consultivo no WhatsApp",
              "Consultoria Comercial de Vendas Locais",
              "Generative Engine Optimization (GEO)",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Serviços de Estruturação Comercial",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Estrutura de Vendas para Psicólogas",
                    description: "Captação ética de pacientes particulares via Google Search e atendimento consultivo no WhatsApp.",
                    url: "https://leonardobrasil.com.br/estrutura-de-vendas-para-psicologas",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Consultoria Comercial de Vendas Locais",
                    description: "Reestruturação do processo comercial de clínicas, consultórios e negócios locais.",
                    url: "https://leonardobrasil.com.br/consultoria",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Calculadora de Gargalo Comercial",
                    description: "Ferramenta gratuita para diagnóstico de perdas financeiras no atendimento comercial.",
                    url: "https://leonardobrasil.com.br/calculadora",
                  },
                },
              ],
            },
          },
          {
            "@type": "Person",
            "@id": "https://leonardobrasil.com.br/#person",
            name: "Leonardo Brasil",
            jobTitle: "Especialista em Estrutura de Vendas para Negócios Locais e Saúde",
            worksFor: { "@id": "https://leonardobrasil.com.br/#organization" },
            image: "https://leonardobrasil.com.br/avatar-leonardo-brasil.jpg",
            sameAs: [
              "https://www.instagram.com/leonardobrasil.com.br/",
            ],
            knowsAbout: [
              "Captação de Pacientes Particulares",
              "Processos Comerciais no WhatsApp",
              "Google Ads para Serviços Locais",
              "SEO Programático Local",
            ],
          },
          {
            "@type": "ProfessionalService",
            "@id": "https://leonardobrasil.com.br/#service",
            name: "Leonardo Brasil — Estrutura de Vendas para Negócios Locais",
            url: "https://leonardobrasil.com.br",
            priceRange: "$$$",
            areaServed: "BR",
            knowsLanguage: "pt-BR",
            publisher: { "@id": "https://leonardobrasil.com.br/#organization" },
          },
          {
            "@type": "WebSite",
            "@id": "https://leonardobrasil.com.br/#website",
            url: "https://leonardobrasil.com.br",
            name: "Leonardo Brasil",
            publisher: { "@id": "https://leonardobrasil.com.br/#organization" },
          },
        ],
      }
    : null;

  const pageSchemas = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  const schemasToRender = brandGraphSchema
    ? [brandGraphSchema, ...pageSchemas]
    : pageSchemas;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {robots && <meta name="robots" content={robots} />}
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Leonardo Brasil" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalOgImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Schema.org Structured Data */}
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
