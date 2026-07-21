import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  schema?: Record<string, any>;
}

export function SeoHead({ title, description, canonicalUrl, schema }: SeoHeadProps) {
  const defaultTitle = "Leonardo Brasil — Estrutura de Vendas para Negócios Locais";
  const defaultDescription = "Leonardo Brasil monta a estrutura de vendas do seu negócio local, presença no Google, aquisição, conversão no WhatsApp e escala. Diagnóstico gratuito.";
  const defaultUrl = "https://leonardobrasil.com.br/";

  const finalTitle = title ? `${title} | Leonardo Brasil` : defaultTitle;
  const finalDesc = description || defaultDescription;
  const finalUrl = canonicalUrl || defaultUrl;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={finalUrl} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
