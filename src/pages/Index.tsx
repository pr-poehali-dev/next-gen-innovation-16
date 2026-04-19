import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Catalog from "@/components/Catalog";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingUI from "@/components/FloatingUI";

const Index = () => {
  return (
    <>
      <Preloader />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Featured />
        <Catalog />
        <Promo />
        <Footer />
      </main>
      <FloatingUI />
    </>
  );
};

export default Index;
