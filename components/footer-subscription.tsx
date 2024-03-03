import { Input, Link, Button } from "@nextui-org/react";
import { IcBaselineEmailIcon, MingcuteUserFollowFillIcon } from "./icons";
import { FooterSubscriptionProps } from "@/types";
import { communityLinks } from "@/config/link";

export const FooterSubscription = ({
  subscriptionTitle,
  communityTitle,
}: Partial<FooterSubscriptionProps>) => {
  return (
    <div className="grid grid-cols-6 w-full pb-12">
      <div className="flex flex-col items-start col-span-4">
        <h2 className="text-2xl font-semibold">{subscriptionTitle}</h2>
        <div className="flex justify-center items-center gap-2">
          <Input
            aria-label="Email address"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm xl:w-[435px] lg:w-[435px] md:[255px]",
            }}
            labelPlacement="outside"
            placeholder="Email address"
            startContent={<IcBaselineEmailIcon width={30} />}
          />
          <Button
            isExternal
            as={Link}
            size="md"
            className="text-sm font-semibold text-default-600 bg-default-100"
            href="/"
            startContent={<MingcuteUserFollowFillIcon />}
            variant="flat"
          >
            Sign up
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start col-span-2">
        <h2 className="text-2xl font-semibold">{communityTitle}</h2>
        <div className="flex justify-center items-center gap-2">
          {communityLinks.map((link) => (
            <Button
              key={link.title}
              isExternal
              isIconOnly
              as={Link}
              size="md"
              className="text-sm font-semibold text-default-600 bg-default-100"
              href={link.href}
              startContent={<link.icon />}
              variant="flat"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
