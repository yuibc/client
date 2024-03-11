import { SectionProps } from "@/types";
import { Button, Link } from "@nextui-org/react";
import { FluentFilter24FilledIcon } from "./icons";

export const SectionContent = ({
  header,
  icon,
  children,
  hasFilter,
  onClick,
}: Partial<SectionProps>) => {
  return (
    <div className="flex flex-col gap-3 w-full mb-5">
      <div className="flex justify-between items-center gap-3">
        <span className="flex items-center gap-3">
          <Button
            isIconOnly
            color="default"
            startContent={icon}
            variant="faded"
          />
          <h2 className="text-2xl font-semibold">{header}</h2>
        </span>
        {hasFilter && (
          <Button
            color="default"
            variant="flat"
            startContent={<FluentFilter24FilledIcon />}
            onClick={onClick}
          >
            Filter
          </Button>
        )}
      </div>
      <div className="grid grid-cols-5 gap-5">{children}</div>
      <div className="flex justify-end">
        <Link className="text-md font-semibold cursor-pointer">See more</Link>
      </div>
    </div>
  );
};
