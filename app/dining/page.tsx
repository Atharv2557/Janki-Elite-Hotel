import { Navbar } from "@/components/layout/navbar";
import { DiningPageHero,  DiningExperience,    FeaturedDiningMenu,  DiningGalleryReveal,
    DiningBookingCTA,
} from "@/components/sections/dining-page";


export default function DiningPage() {
  return (
    <main className="bg-white">
         <Navbar />
      <DiningPageHero />
       <DiningExperience />
       {/* <DiningMenuShowcase/> */}

      <FeaturedDiningMenu />

       <DiningGalleryReveal/>
       <DiningBookingCTA/>
    </main>
  );
}