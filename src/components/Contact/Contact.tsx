import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_ENDPOINT, site } from "@/lib/config";

type Status = "idle" | "sending" | "success" | "error" | "mailto";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const emptyForm: FormState = { name: "", email: "", subject: "", message: "" };

const contactLinks = [
  { label: "Email", value: site.email, href: site.socials.email, Icon: Mail },
  { label: "LinkedIn", value: "Rohit SK", href: site.socials.linkedin, Icon: Linkedin },
  { label: "GitHub", value: "@rohitsk", href: site.socials.github, Icon: Github },
  { label: "Freelancer", value: "Rohit SK", href: site.socials.freelancer, Icon: Briefcase },
];

function Field({
  label,
  id,
  type = "text",
  textarea,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const base =
    "w-full rounded-xl border bg-obsidian-2/60 px-4 py-3 text-sm text-cream placeholder:text-muted/60 transition focus:outline-none focus:ring-2";
  const borderCls = error
    ? "border-red-500/60 focus:ring-red-500/40"
    : "border-line focus:border-maroon-bright/60 focus:ring-maroon-bright/30";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
        {required && <span className="ml-1 text-maroon-bright">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${borderCls} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${borderCls}`}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): Partial<FormState> => {
    const errs: Partial<FormState> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      errs.message = "Message should be at least 10 characters.";
    return errs;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      if (CONTACT_ENDPOINT) {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        setStatus("success");
        setForm(emptyForm);
      } else {
        // No backend configured — open the visitor's email client with the
        // message pre-filled. This is a real action, not a fake success.
        const subject = encodeURIComponent(
          form.subject || `Project inquiry from ${form.name}`
        );
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("mailto");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-obsidian">
      {/* Glowing maroon lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 100%, rgba(165,31,75,0.18), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Have an Idea?{" "}
              <span className="text-gradient-solid">Let's Build It.</span>
            </>
          }
          subtitle="Tell me about your project, your product, or the problem you want solved — I'll get back to you."
          align="center"
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-cream">
                <Sparkles className="h-4 w-4 text-maroon-bright" aria-hidden="true" />
                Let's connect
              </h3>
              <div className="mt-4 space-y-3">
                {contactLinks.map(({ label, value, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-obsidian-2/50 px-4 py-3 transition hover:border-maroon-bright/50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/30 bg-maroon/10">
                      <Icon className="h-4 w-4 text-maroon-bright" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">{label}</span>
                      <span className="block text-sm font-medium text-cream group-hover:text-white">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-maroon-bright" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-cream">Based in {site.location}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {site.availability}. Working across time zones with
                    international clients and remote teams.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={onSubmit}
            noValidate
            className="glass-elevated rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" id="name" value={form.name} onChange={set("name")} error={errors.name} required />
              <Field label="Email" id="email" type="email" value={form.email} onChange={set("email")} error={errors.email} required />
            </div>
            <div className="mt-5">
              <Field label="Subject" id="subject" value={form.subject} onChange={set("subject")} />
            </div>
            <div className="mt-5">
              <Field label="Message" id="message" textarea value={form.message} onChange={set("message")} error={errors.message} required />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-maroon-bright px-7 py-3 text-sm font-semibold text-white shadow-glow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent — I'll reply soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again, or email me directly.
                </p>
              )}
              {status === "mailto" && (
                <p className="max-w-xs text-sm text-muted">
                  Your email app should open with the message pre-filled. If it
                  didn't, email me at{" "}
                  <a href={site.socials.email} className="text-maroon-bright underline">
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </div>

            {!CONTACT_ENDPOINT && (
              <p className="mt-4 text-xs leading-relaxed text-muted/70">
                Tip: configure{" "}
                <code className="rounded bg-black/40 px-1.5 py-0.5 text-[11px] text-maroon-bright">
                  VITE_CONTACT_ENDPOINT
                </code>{" "}
                to send messages straight from this form (see{" "}
                <code className="rounded bg-black/40 px-1.5 py-0.5 text-[11px] text-muted">src/lib/config.ts</code>
                ).
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
