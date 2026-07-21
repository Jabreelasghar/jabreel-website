# Private website analytics

Vercel Web Analytics is installed for private aggregate traffic reporting. Enable it from **Vercel project → Analytics → Enable**, then use the same Analytics area to view overall visits, commonly viewed pages, referral sources, and general geographic and device information.

No analytics figures or dashboard links are displayed publicly. Microsoft Clarity and custom analytics events are not installed.

To disable analytics, remove `VercelAnalytics` from `src/app/layout.tsx`, remove the `@vercel/analytics` package, and disable Analytics in the Vercel project dashboard.
