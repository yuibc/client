import { CreatorBlock } from '@/components/creator-block';
import { FaSolidUsersIcon, MingcuteUserStarFillIcon } from '@/components/icons';
import { SectionContent } from '@/components/section-content';
import { fixedCreators } from '@/config/fixed-data';

export default function Creators() {
    return (
        <section>
            <div className="flex flex-col items-center mb-6">
                <span className="my-7 flex flex-row gap-2">
                    <MingcuteUserStarFillIcon size={60} />
                    <h1 className="text-5xl font-bold">
                        Creators of the month
                    </h1>
                </span>
                <div className="flex justify-center items-center gap-3">
                    <CreatorBlock
                        displayName="@User_Name_123"
                        followerCount={10000}
                    />
                    <CreatorBlock
                        displayName="@User_Name_123"
                        followerCount={6000}
                    />
                    <CreatorBlock
                        displayName="@User_Name_123"
                        followerCount={4000}
                    />
                </div>
            </div>
            <hr className="my-10 border-default-50" />
            <SectionContent
                header="Creators"
                icon={<FaSolidUsersIcon />}
                hasFilter
                gridSize={4}>
                {fixedCreators.map((item, index) => (
                    <CreatorBlock
                        key={index}
                        displayName={item.displayName}
                        followerCount={item.followerCount}
                    />
                ))}
            </SectionContent>
        </section>
    );
}
