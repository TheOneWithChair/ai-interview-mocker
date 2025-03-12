"use client";

import  Hero from "./dashboard/_components/Hero"; // ✅ Ensure this exists
import { ProductShowcase } from "./dashboard/_components/ProductShowcase";
import { Testimonials } from "./dashboard/_components/Testimonials";
import {Pricing} from "./dashboard/upgrade/page"
import {Footer} from "./dashboard/_components/Footer"
import { CallToAction } from "./dashboard/_components/CallToAction";
export default function Page() {
  return (
    <div>
      <Hero />
      <ProductShowcase/>
      <Pricing/>
      <Testimonials/>

      <CallToAction/>
      <Footer/>
    </div>
  );
}
