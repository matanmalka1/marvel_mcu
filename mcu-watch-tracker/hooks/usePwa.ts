"use client";

import { useCallback, useEffect, useState } from "react";

/** Chrome/Edge/Android install prompt event (not in the standard DOM typings). */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/**
 * Registers the service worker (production only), tracks connectivity, and exposes
 * the browser's install prompt when one is available.
 */
export function usePwa() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures (private mode, blocked) just mean no offline support.
      });
    }

    const syncOnline = () => setOnline(navigator.onLine);
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => setInstallEvent(null);

    syncOnline();
    window.addEventListener("online", syncOnline);
    window.addEventListener("offline", syncOnline);
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("online", syncOnline);
      window.removeEventListener("offline", syncOnline);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    // The event can only be used once, whatever the choice.
    setInstallEvent(null);
  }, [installEvent]);

  return { online, canInstall: installEvent !== null, install };
}
