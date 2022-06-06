import { ReactNode } from "react";

import Link from "next/link";

import Button from "@/components/Button";
import useMagnetic from "@/components/useMagnetic";

type Props = {
  children: ReactNode;
  href: string;
};

const ButtonMagnet = ({ children, href }: Props) => {
  const { style, ...magnetHandlers } = useMagnetic();

  return (
    <Link href={href} passHref>
      <Button
        {...magnetHandlers}
        style={{
          transition: "transform 100ms ease",
          ...style,
        }}
      >
        {children}
      </Button>
    </Link>
  );
};

export default ButtonMagnet;
