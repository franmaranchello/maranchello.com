type GtagCommand = "config" | "js";

type Gtag = (
  command: GtagCommand,
  target: string | Date,
  config?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const GTAG_SCRIPT_ID = "google-analytics-gtag";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const router = useRouter();
  const measurementId = runtimeConfig.public.firebase.measurementId;

  if (!measurementId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer?.push(args);
  };

  if (!document.getElementById(GTAG_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      measurementId
    )}`;
    document.head.appendChild(script);
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    page_path: window.location.pathname + window.location.search,
    send_page_view: true,
  });

  router.afterEach((to) => {
    window.gtag?.("config", measurementId, {
      page_path: to.fullPath,
      send_page_view: true,
    });
  });
});
