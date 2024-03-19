import { EmptyProps } from '@/types';
import { TablerMoodEmptyFilledIcon } from './icons';

export const Empty = ({ description }: Partial<EmptyProps>) => {
    return (
        <div className="h-screen w-full flex justify-center items-start">
            <div className="w-[500px] p-10 grid place-items-center gap-3">
                <TablerMoodEmptyFilledIcon size={50} />
                <h2 className="text-xl font-semibold">{description}</h2>
            </div>
        </div>
    );
};
