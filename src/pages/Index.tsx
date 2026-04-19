import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Catalog from "@/components/Catalog";
import Promo from "@/components/Promo";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FloatingUI from "@/components/FloatingUI";

const Index = () => {
  const [promoDiscount, setPromoDiscount] = useState(0);

  return (
    <>
      <Preloader />
      <main className="min-h-screen">
        <Header promoDiscount={promoDiscount} />
        <Hero />
        <Featured />
        <Catalog onPromoChange={setPromoDiscount} />
        <Promo />
        <Footer />
      </main>
      <FloatingUI />
    </>
  );
};

export default Index;
