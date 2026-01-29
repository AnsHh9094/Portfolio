import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative">
      {/* Scrollytelling Section */}
      <section className="relative">
        <ScrollyCanvas />
        <Overlay />
      </section>

      {/* Projects Section */}
      <Projects />

    </main>
  );
}
