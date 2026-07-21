export function initAnalytics() {
  if (typeof window === "undefined") return;

  // 1. Captura parâmetros da URL e salva na Sessão
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmCampaign = urlParams.get("utm_campaign");
  const utmMedium = urlParams.get("utm_medium");
  const gclid = urlParams.get("gclid");

  if (utmSource) sessionStorage.setItem("utm_source", utmSource);
  if (utmCampaign) sessionStorage.setItem("utm_campaign", utmCampaign);
  if (utmMedium) sessionStorage.setItem("utm_medium", utmMedium);
  if (gclid) sessionStorage.setItem("gclid", gclid);

  // 2. Intercepta cliques em botões do WhatsApp
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest("a");
    if (target && target.href && target.href.includes("wa.me")) {
      const source = sessionStorage.getItem("utm_source");
      const campaign = sessionStorage.getItem("utm_campaign");
      const gclidStored = sessionStorage.getItem("gclid");

      if (source || campaign || gclidStored) {
        try {
          const waUrl = new URL(target.href);
          let textParam = waUrl.searchParams.get("text") || "";
          
          let tracker = "\n\n---";
          if (source) tracker += `\nOrigem: ${source}`;
          if (campaign) tracker += `\nCampanha: ${campaign}`;
          if (gclidStored) tracker += `\nGCLID: ${gclidStored}`;

          // Só adiciona se já não adicionou antes no mesmo link
          if (!textParam.includes("Origem:")) {
            waUrl.searchParams.set("text", textParam + tracker);
            target.href = waUrl.toString();
          }
        } catch (err) {
          console.error("Erro ao rastrear clique no WhatsApp:", err);
        }
      }
    }
  });
}
