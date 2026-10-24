import Hero from "../components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <section className="flex h-[45vh] items-center justify-center px-6 text-center text-sm tracking-[0.3em] text-white/50">
        BUILT WITH NEXT.JS · GSAP · TAILWIND
      </section>
    </main>
  );
}
