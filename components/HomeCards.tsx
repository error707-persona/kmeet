import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomeCardProps {
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
  className?: string;
}
const HomeCards = ({
  img,
  title,
  description,
  handleClick,
  className,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        " px-4 py-2 flex flex-col justify-between w-full xl:max-w-full min-h-full rounded-[14px] cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-8 rounded-[10px]">
        <Image src={img} alt="meeting" width={12} height={12} />
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-md md:text-sm lg:text-lg xl:text-2xl">
          {title}
        </h1>
        <span className="text-[10px] mb-1">{description}</span>
      </div>
    </div>
  );
};

export default HomeCards;
