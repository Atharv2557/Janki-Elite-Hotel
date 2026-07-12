import  {Reveal  }from "@/components/ui/reveal/Reveal";
import { amenitiesPageData } from "@/data/amenities-page";
import { AmenityCard } from "./AmenityCard";

export function AmenitiesGrid() {
  return (
    <section className="bg-[#fbfaf8] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Our Amenities
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-[#211711] md:text-5xl">
              Thoughtful Facilities for Every Kind of Stay
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {amenitiesPageData.map((amenity, index) => (
            <Reveal key={amenity.id} delay={index * 100}>
              <AmenityCard
                title={amenity.title}
                description={amenity.description}
                icon={amenity.icon}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}