import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: Record<string, any> | Record<string, any>[];
}

export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = "website",
  schema,
}: SeoHeadProps) {
  const defaultTitle = "Leonardo Brasil — Estrutura de Vendas para Negócios Locais";
  const defaultDescription =
    "Leonardo Brasil monta a estrutura de vendas do seu negócio local, presença no Google, aquisição, conversão no WhatsApp e escala. Diagnóstico gratuito.";
  const defaultUrl = "https://leonardobrasil.com.br/";
  const defaultOgImage = "https://leonardobrasil.com.br/logo-completo.png";

  const finalTitle = title ? `${title} | Leonardo Brasil` : defaultTitle;
  const finalDesc = description || defaultDescription;
  const finalUrl = canonicalUrl || defaultUrl;
  const finalOgImage = ogImage || defaultOgImage;

  const schemasToRender = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

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
