/**
 * Runtime configuration.
 *
 * Replace the placeholder values below with your real profile information.
 * Everything else in the app reads from here and from `src/data/*.ts`,
 * so personal details never leak into UI components.
 */

/** Contact form endpoint.
 *  - Leave empty to fall back to a `mailto:` action (works locally, no server needed).
 *  - Point to a real backend route, e.g. "/api/contact", or a service like
 *    FormSubmit: "https://formsubmit.co/ajax/your-email@example.com".
 *  Set it in `.env.local` as: VITE_CONTACT_ENDPOINT=...
 */
export const CONTACT_ENDPOINT: string =
  (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? "";

export const site = {
  name: "ROHIT.SK",
  owner: "Rohit SK",
  tagline: "Engineering Ideas Into Intelligent Experiences.",
  location: "India",
  availability: "Open to international freelance projects & remote opportunities",

  // TODO: Replace with your real addresses.
  email: "hello@rohitsk.dev",
  phone: null as string | null,

  // TODO: Replace with your real profile URLs.
  socials: {
    github: "https://github.com/rohitsk",
    linkedin: "https://www.linkedin.com/in/rohitsk",
    freelancer: "https://www.freelancer.com/u/rohitsk",
    email: "mailto:hello@rohitsk.dev",
  },

  /**
   * Resume link. Drop a real PDF at `/public/resume.pdf` and this will
   * become a direct download. Until then the Resume button opens a
   * printable resume page (`/resume`).
   */
  resumeUrl: "/resume.pdf",
};
