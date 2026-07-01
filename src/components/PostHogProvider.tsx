"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    posthog.init(key, {
      api_host: "https://eu.i.posthog.com",
      ui_host: "https://eu.posthog.com",
      capture_pageview: "history_change",
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: true,
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
