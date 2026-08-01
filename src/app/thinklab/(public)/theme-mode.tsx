"use client";

import { useEffect } from "react";

export function ThinkLabThemeMode() {
  useEffect(() => {
    document.body.classList.add("thinklab-mode");
    return () => document.body.classList.remove("thinklab-mode");
  }, []);

  return null;
}
