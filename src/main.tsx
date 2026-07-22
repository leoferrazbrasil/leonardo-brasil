import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { initAnalytics } from "./lib/analytics";
import { AnnouncementBar } from "./components/AnnouncementBar";
import "./index.css";

// Inicia interceptador global de UTMs para o WhatsApp
initAnalytics();

const App = lazy(() => import("./App"));
const NicheLanding = lazy(() => import("./pages/NicheLanding"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Brandbook = lazy(() => import("./pages/Brandbook"));
const CitiesDirectory = lazy(() => import("./pages/CitiesDirectory"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const Consultoria = lazy(() => import("./pages/Consultoria"));
const TermsPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.PrivacyPage })));
const DataDeletionPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.DataDeletionPage })));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AnnouncementBar />
        <Suspense fallback={<div className="min-h-screen bg-ink flex items-center justify-center text-accent">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/consultoria" element={<Consultoria />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/estrutura-de-vendas-para-:slug" element={<NicheLanding />} />
            <Route path="/estrutura-de-vendas-para-:slug-em-:cidade" element={<NicheLanding />} />
            <Route path="/brandbook" element={<Brandbook />} />
            <Route path="/cidades" element={<CitiesDirectory />} />
            <Route path="/calculadora" element={<CalculatorPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/exclusao-de-dados" element={<DataDeletionPage />} />
            <Route path="*" element={<App />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
