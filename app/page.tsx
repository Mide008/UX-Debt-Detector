import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Analyzer } from "@/components/sections/analyzer";
import { Pricing } from "@/components/sections/pricing";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Analyzer />
      <Pricing />
      <Footer />
    </main>
  );
}
