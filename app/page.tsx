
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/layout/navbar";
import LuxuryIntro from "@/components/sections/luxury-intro";
import Rooms from "@/components/sections/rooms/Rooms";
import Amenities from "@/components/sections/amenities";
import Dining from "@/components/sections/dining";
import Gallery from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import Location from "@/components/sections/location";
import CTA from "@/components/sections/cta";
import Footer from "@/components/layout/footer";


import {
  Button,
  Container,
  Heading,
  Section,
} from "@/components/ui";

export default function Home() {
  return (
      
  <>
      <Navbar />
      
      <Section>
        <Hero/>
        <Container>
          {/* <Heading
            title="Welcome to Janki Elite"
            subtitle="Luxury Hotel in Jaipur"
            align="center"
          /> */}

          <div className="mt-8 flex ">
            {/* <Button>Book Now</Button> */}
          </div>
        </Container>
          <LuxuryIntro />
          <Rooms />
          <Amenities />
          <Dining />
          <Gallery />
          <Testimonials />
          <Location />
          <CTA />
         
      </Section>
      <Footer/>
  </>
  
  );
}