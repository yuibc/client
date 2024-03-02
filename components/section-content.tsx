"use client";

import { ArtBlock } from "./art-block";
import { useState } from "react";
import { SectionProps, TArtBlock } from "@/types";
import { Button, Link } from "@nextui-org/react";

export const SectionContent = ({ header, icon }: Partial<SectionProps>) => {
  const [arts, _] = useState<TArtBlock[]>([
    {
      title: "Horses for Courses",
      url: "/assets/output_3761611179_0.jpg",
      cryptoPrice: 1,
      cryptoCurrency: "SOL",
      convertedPrice: 97,
      currency: "$",
    },
    {
      title: "Clockwork",
      url: "",
      cryptoPrice: 1,
      cryptoCurrency: "SOL",
      convertedPrice: 97,
      currency: "$",
    },
    {
      title: "Abstraction",
      url: "",
      cryptoPrice: 1,
      cryptoCurrency: "SOL",
      convertedPrice: 97,
      currency: "$",
    },
    {
      title: "Uniqueness",
      url: "",
      cryptoPrice: 1,
      cryptoCurrency: "SOL",
      convertedPrice: 97,
      currency: "$",
    },
    {
      title: "Empowered",
      url: "",
      cryptoPrice: 1,
      cryptoCurrency: "SOL",
      convertedPrice: 97,
      currency: "$",
    },
  ]);

  return (
    <div className="flex flex-col gap-3 w-full mb-5">
      <div className="flex justify-start items-center gap-3">
        <Button
          isIconOnly
          color="default"
          startContent={icon}
          variant="faded"
        />
        <h2 className="text-2xl font-semibold">{header}</h2>
      </div>
      <div className="flex gap-5 w-full">
        {arts.map((item, index) => (
          <ArtBlock
            key={index}
            title={item.title}
            currency={item.currency}
            cryptoCurrency={item.cryptoCurrency}
            convertedPrice={item.convertedPrice}
            cryptoPrice={item.cryptoPrice}
            url={item.url}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Link className="text-md font-semibold cursor-pointer">See more</Link>
      </div>
    </div>
  );
};
