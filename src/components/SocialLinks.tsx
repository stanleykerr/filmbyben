import { useEffect, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MagnetMouse from "magnet-mouse";

import SocialButton from "@components/SocialButton";
import { socialLinks, SocialMedia } from "@shared/constants";

export interface Props {
  magnetic?: boolean;
}

const SocialLinks = ({ magnetic }: Props) => {
  const socialBtns = useMemo(
    () =>
      Object.entries(socialLinks).map((e, index) => {
        const name = e[0] as SocialMedia;
        const url = e[1];

        return (
          <SocialButton
            key={index}
            $flavor={name}
            $size={40}
            href={url}
            rel="noreferrer"
            target="_blank"
            className={magnetic ? "social-button" : ""}
          >
            <FontAwesomeIcon icon={["fab", name]} size={"lg"} />
          </SocialButton>
        );
      }),
    [magnetic]
  );

  useEffect(() => {
    if (!magnetic) return;

    let mm = new MagnetMouse({
      magnet: {
        element: ".social-button",
        enabled: true,
        distance: 0,
      },
    });
    mm.init();

    window.dispatchEvent(new Event("resize"));

    return () => {
      mm.destroy();
    };
  }, [magnetic]);

  return <>{socialBtns}</>;
};

export default SocialLinks;
