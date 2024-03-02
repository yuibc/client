import { GgTrendingIcon, MdiCreationIcon } from "@/components/icons";
import { title, subtitle } from "@/components/primitives";
import { SectionContent } from "@/components/section-content";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <SectionContent
        header="TOP Trending"
        icon={<GgTrendingIcon width={30} />}
      />
      <SectionContent
        header="TOP Creation"
        icon={<MdiCreationIcon width={30} />}
      />
    </section>
  );
}
