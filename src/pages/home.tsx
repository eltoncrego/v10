import { WonkyCircle } from "@/components/wonky-circle";

const links = [
  { label: "GitHub", href: "https://github.com/eltoncrego" },
  { label: "LinkedIn", href: "https://linkedin.com/in/eltoncrego" },
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
        <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight text-foreground">
          Elton Lai-Rego
          <WonkyCircle
            size={12}
            className="text-accent inline-block align-baseline ml-[2px] -mb-[2px] md:-mb-[1px]"
          />
        </h1>
      </header>

      <Separator />

      <section>
        <p className="drop-cap font-body text-lg leading-[1.75] text-justify text-foreground">
          A software engineer with over eight years of experience. Right
          now I'm at{" "}
          <a href="https://frigade.com" className="editorial-link font-bold">
            Frigade
          </a>
          , building the core AI assistant platform and the dashboard that
          powers it. I care a lot about how things look and how they feel to
          use, and I've spent most of my career in that space between design
          and engineering where those two things meet.
        </p>
        <p className="font-body text-lg leading-[1.75] text-justify text-foreground mt-5">
          Before this I worked at LinkedIn, Gantri, and Veeva. I like making
          software that people don't have to think too hard about.
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
          Davis, California
        </p>
      </footer>
    </article>
  );
}
