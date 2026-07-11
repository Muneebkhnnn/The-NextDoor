import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import RevealText from "../components/RevealText";
import MagneticButton from "../components/MagneticButton";

const BUDGETS = ["Under $499", "$500–$2k", "$2k+", "Not sure yet"];

function Field({ label, id, error, children }) {
  return (
    <div className="field-group flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="font-mono text-xs text-[var(--color-ember)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const groups = formRef.current.querySelectorAll(".field-group");
      gsap.fromTo(
        groups,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) e.message = "Tell us a bit about the project.";
    return e;
  };

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstErr = formRef.current.querySelector("[aria-invalid='true']");
      firstErr?.focus();
      return;
    }

    setStatus("sending");

    try {
      const formData = new FormData();

      formData.append(
        "accessKey",
        import.meta.env.VITE_STATICFORMS_ACCESS_KEY
      );

      formData.append("name", values.name);
      formData.append("email", values.email);

      formData.append(
        "subject",
        `New Project Inquiry from ${values.name}`
      );

      formData.append("replyTo", values.email);

      formData.append(
        "message",
        `
        Company: ${values.company || "Not provided"}
        Budget: ${values.budget || "Not specified"}

        Message:
        ${values.message}
        `
      );

      const response = await fetch(
        "https://api.staticforms.dev/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Form submission result:", result);
      if (result.success) {
        setStatus("sent");

        gsap.fromTo(
          sectionRef.current.querySelector(".success-msg"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );

        setValues({
          name: "",
          email: "",
          company: "",
          budget: "",
          message: "",
        });

        setTimeout(()=>{
          setStatus("idle");
        },2000)
        
      } else {
        alert("Something went wrong. Please try again.");
        setStatus("idle");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
      setStatus("idle");
    }
  };

  const inputBase =
    "w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3.5 text-[var(--color-cream)] text-sm placeholder:text-[var(--color-muted)]/50 outline-none transition-colors duration-200 focus:border-[var(--color-ember)] focus:ring-1 focus:ring-[var(--color-ember)]/40";

  return (
    <section id="contact" ref={sectionRef} className="border-b border-[var(--color-line)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: headline + social proof */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)]">
              Get in touch
            </p>
            <RevealText
              as="h2"
              className="font-display text-5xl leading-none tracking-tight text-[var(--color-cream)] sm:text-6xl"
            >
              Let's build something worth deploying.
            </RevealText>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
              Drop us a brief note. We'll read it the same day and reply within 24 hours — no
              automated acknowledgement, no sales call unless you ask for one.
            </p>

            <dl className="mt-12 flex flex-col gap-5">
              {[
                { label: "Email", value: "muneebkhan.web@gmail.com" },
                { label: "Response time", value: "Within 24 hours" },
                { label: "Current availability", value: "Accepting New Projects" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-4 border-t border-[var(--color-line)] pt-4">
                  <dt className="w-36 shrink-0 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
                    {label}
                  </dt>
                  <dd className="text-sm text-[var(--color-cream)]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: form */}
          <div>
            {status === "sent" ? (
              <div className="success-msg flex h-full flex-col items-center justify-center gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-10">
                <span className="font-display text-6xl text-[var(--color-ember)]">✓</span>
                <div className="text-center">
                  <h3 className="font-display text-3xl text-[var(--color-cream)]">
                    Message received.
                  </h3>
                  <p className="mt-3 text-sm text-[var(--color-muted)]">
                    We'll have a real reply in your inbox within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Project enquiry form"
                className="flex flex-col gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8 sm:p-10"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Your name *" id="name" error={errors.name}>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      placeholder="Ada Lovelace"
                      className={inputBase}
                    />
                  </Field>

                  <Field label="Email address *" id="email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange("email")}
                      aria-invalid={!!errors.email}
                      placeholder="ada@company.com"
                      className={inputBase}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field label="Company" id="company" error={errors.company}>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      value={values.company}
                      onChange={handleChange("company")}
                      placeholder="Acme Corp"
                      className={inputBase}
                    />
                  </Field>

                  <Field label="Budget range" id="budget" error={errors.budget}>
                    <select
                      id="budget"
                      value={values.budget}
                      onChange={handleChange("budget")}
                      className={`${inputBase} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Tell us about the project *" id="message" error={errors.message}>
                  <textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={handleChange("message")}
                    aria-invalid={!!errors.message}
                    placeholder="What are you building, what's broken, and what does success look like for you?"
                    className={`${inputBase} resize-none`}
                  />
                </Field>

                <MagneticButton
                  type="submit"
                  data-cursor="send"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--color-ember)] py-4 font-mono text-sm uppercase tracking-wider text-[var(--color-ink)] transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-ink)] border-t-transparent" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </MagneticButton>

                <p className="text-center font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)]">
                  No spam. No automated replies. Just us.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
