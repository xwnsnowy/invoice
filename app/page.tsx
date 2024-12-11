import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <header className="container">
        <Navbar />
      </header>
      <main className="container">
        <Hero />
      </main>
    </>
  );
}
