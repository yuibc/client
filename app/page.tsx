import { FooterSubscription } from "@/components/footer-subscription";
import { GgTrendingIcon, MdiCreationIcon } from "@/components/icons";
import { title, subtitle } from "@/components/primitives";
import { SectionContent } from "@/components/section-content";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-y-5">
      <SectionContent header="TOP Trending" icon={<GgTrendingIcon />} />
      <SectionContent header="TOP Creation" icon={<MdiCreationIcon />} />
      <FooterSubscription
        subscriptionTitle="Interested in this digital world?"
        communityTitle="Join the community"
      />
    </section>
  );
}
