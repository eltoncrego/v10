import { WonkyCircle } from "@/components/wonky-circle";

const links = [
  { label: "GitHub", href: "https://github.com/eltoncrego" },
  { label: "LinkedIn", href: "https://linkedin.com/in/eltoncrego" },
  { label: "Email", href: "mailto:rego.elton@gmail.com" },
];

function Separator() {
  return (
    <div className="my-10 md:my-14 separator" role="separator" />
  );
}

export default function Home() {
  return (
    <article>
      <header className="mb-6">
        <WonkyCircle size={44} className="text-accent mb-8" />
        <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight text-foreground">
          Elton Christopher Rego.
        </h1>
      </header>

      <Separator />

      <section>
        <p className="drop-cap font-body text-lg leading-[1.75] text-justify text-foreground">
          Currently building at{" "}
          <a href="https://frigade.com" className="editorial-link font-bold">
            Frigade
          </a>
          , where I help craft developer tools that make software onboarding
          feel less like a chore and more like a conversation. I'm a front-end
          engineer drawn to the seam between design and engineering — the place
          where type is set, spacing is negotiated, and pixels become feel.
        </p>
        <p className="font-body text-lg leading-[1.75] text-justify text-foreground mt-5">
          Before Frigade I shaped product experiences at LinkedIn and Gantri.
          Outside of work you'll find me cooking, writing music, or reading
          about the history of typesetting.
        </p>
      </section>

      <Separator />

      <nav>
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.label} className="flex items-center gap-3">
              <WonkyCircle size={8} className="text-accent shrink-0" />
              <a
                href={link.href}
                className="editorial-link"
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="mt-16 md:mt-24">
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted">
          Oakland, California
        </p>
      </footer>
    </article>
  );
}
