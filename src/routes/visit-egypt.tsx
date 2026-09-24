import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  Lightbulb, Stamp, CalendarDays, Map as MapIcon, Headphones, ArrowRight, ExternalLink,
} from "lucide-react";
import hero from "@/assets/inner/visit-hero.jpg";
import giza from "@/assets/gov/giza.jpg";
import luxor from "@/assets/dest-luxor.jpg";
import aswan from "@/assets/dest-aswan.jpg";
import cairo from "@/assets/dest-cairo.jpg";
import redSea from "@/assets/gov/red-sea.jpg";
import hurghada from "@/assets/dest-hurghada.jpg";
import cruise from "@/assets/promo-cruise.jpg";
import desert from "@/assets/sec-desert.jpg";
import diving from "@/assets/home/diving.jpg";
import heritage from "@/assets/card-heritage.jpg";
import nile from "@/assets/home/nile.jpg";
import adventure from "@/assets/promo-adventure.jpg";
import {
  InnerPage, SectionHead, PhotoCard, SidePanel, LinkList, EgyptMap, ViewAll, GoldButton, SmartLink,
  AppPromoCard, BandPromo, type CardItem,
} from "@/components/layout/InnerPage";
import { visitChips } from "@/data/visit-chips";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";

const title = "Visit Egypt — Destinations, Experiences & Trip Planning | Egyptora Hub";
const description =
  "Plan your trip to Egypt: must-see destinations, Nile cruises, Red Sea diving, desert adventures and trusted travel services.";

export const Route = createFileRoute("/visit-egypt")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${SITE.url}/visit-egypt` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/visit-egypt` }],
  }),
  component: VisitEgypt,
});

const TT = "/visit-egypt/travel-and-tourism";

const destinations: CardItem[] = [
  { title: "Pyramids of Giza", desc: "The last standing wonder of the ancient world.", img: giza, badge: "Landmark", to: "/heritage-sites" },
  { title: "Luxor Temples", desc: "Karnak, Luxor Temple and the Valley of the Kings.", img: luxor, badge: "Cultural", to: "/heritage-sites" },
  { title: "Abu Simbel", desc: "Ramesses II's colossal temples on Lake Nasser.", img: heritage, badge: "Landmark", to: "/heritage-sites" },
  { title: "Red Sea Coast", desc: "Coral reefs, resorts and year-round sunshine.", img: redSea, badge: "Beach", to: TT },
  { title: "Aswan & Nubia", desc: "Colourful Nubian villages and a calm, golden Nile.", img: aswan, badge: "Cultural", to: "/heritage-sites" },
  { title: "Cairo City", desc: "A thousand minarets, bazaars and the Grand Egyptian Museum.", img: cairo, badge: "City", to: "/museums" },
];

const experiences: CardItem[] = [
  { title: "Nile Cruise", desc: "Sail between Luxor and Aswan in comfort.", img: cruise, badge: "Cruise", to: TT },
  { title: "Desert Safari", desc: "Dunes, oases and nights under the stars.", img: desert, badge: "Adventure", to: TT },
  { title: "Diving in Hurghada", desc: "World-class reefs for every level.", img: diving, badge: "Water Sports", to: TT },
  { title: "Cultural Walking Tour", desc: "Discover Islamic and Coptic Cairo on foot.", img: hurghada, badge: "Cultural", to: "/offers" },
  { title: "Felucca Sailing", desc: "A traditional sail at sunset on the Nile.", img: nile, badge: "Nile", to: TT },
  { title: "Hot Air Balloon Luxor", desc: "Sunrise views over temples and the West Bank.", img: adventure, badge: "Adventure", to: TT },
];

function VisitEgypt() {
  const { t } = useI18n();
  return (
    <InnerPage
      pageName="Visit Egypt"
      hero={{
        image: hero,
        title: "Visit Egypt",
        subtitle: "Timeless History. Breathtaking Beauty. Unforgettable Experiences.",
        body: "Everything you need to plan your trip to Egypt — destinations, experiences and trusted travel services in one place.",
        placeholder: "Search destinations, tours, hotels or experiences…",
        tagline: ["Discover", "Explore", "Experience"],
      }}
      chips={visitChips}
      showMore={false}
      sidebar={
        <>
          <SidePanel title="Explore Egypt by Map">
            <EgyptMap pins={["Alexandria", "Cairo", "Hurghada", "Luxor", "Aswan", "Siwa Oasis"]} />
            <div className="mt-3">
              <ViewAll to="/explore-egypt" label="Explore the Map" />
            </div>
          </SidePanel>
          <SidePanel title="Plan Your Trip">
            <LinkList
              items={[
                { label: "Travel Tips", to: "/traveler-stories", Icon: Lightbulb },
                { label: "Visa Information", to: "/government-directory", Icon: Stamp },
                { label: "Best Time to Visit", to: "/encyclopedia", Icon: CalendarDays },
                { label: "Suggested Itineraries", to: "/my-trips/new", Icon: MapIcon },
                { label: "Travel & Tourism Services", to: TT, Icon: Briefcase },
              ]}
            />
          </SidePanel>
        </>
      }
      bottom={
        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-[10px] border border-border bg-bg-band p-6">
            <h3 className="font-display text-lg font-bold text-navy">{t("Licensed Travel Companies in Egypt")}</h3>
            <p className="mt-1 text-sm text-text-body">
              {t("Search the official ETAA directory of licensed travel agencies and tour operators.")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <GoldButton to="/providers">
                {t("Search Travel Companies")} <ArrowRight className="size-4 rtl:rotate-180" />
              </GoldButton>
              <SmartLink
                to="https://www.etaa-egypt.org/"
                className="inline-flex items-center gap-2 rounded-lg border border-navy px-4 py-2.5 text-sm font-semibold text-navy hover:bg-card"
              >
                {t("ETAA Directory")} <ExternalLink className="size-4" />
              </SmartLink>
            </div>
          </section>
          <BandPromo
            Icon={Headphones}
            title="Need Help Planning?"
            body="Our team can help you shape the right itinerary for your trip."
            cta="Contact Us"
            to="/contact"
          />
          <AppPromoCard />
        </div>
      }
    >
      <section>
        <SectionHead title="Must-See Destinations" body="Iconic places every visitor to Egypt should see." to="/heritage-sites" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((c) => <PhotoCard key={c.title} c={c} />)}
        </div>
      </section>
      <section>
        <SectionHead title="Popular Experiences" body="Unforgettable ways to experience Egypt." to={TT} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((c) => <PhotoCard key={c.title} c={c} />)}
        </div>
      </section>
    </InnerPage>
  );
}
