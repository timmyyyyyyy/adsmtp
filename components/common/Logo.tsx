import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: "default" | "sm";
}

const Logo = ({ className, variant = "default" }: Props) => {
  const isSmall = variant === "sm";

  return (
    <Link href="/" aria-label="E.D.S TECH">
      <div className={cn("flex items-center group", className)}>
        <Image
          src="/logo.png"
          alt="E.D.S TECH"
          width={isSmall ? 240 : 320}
height={isSmall ? 80 : 100}
          className={`${isSmall ? "h-14" : "h-24"} w-auto object-contain transition-transform group-hover:scale-105`}
          priority={!isSmall}
        />
      </div>
    </Link>
  );
};

export default Logo;