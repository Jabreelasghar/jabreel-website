"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => ({
        ...event,
        url: event.url.split("?")[0]
      })}
    />
  );
}
