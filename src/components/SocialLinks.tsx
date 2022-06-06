import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import useMagnetic from "@/components/useMagnetic";
import { socialLinks, SocialMedia } from "@/shared/constants";

interface SocialButtonProps {
  $size?: number;
  $flavor?: SocialMedia;
}

const SocialButton = styled.a.attrs<SocialButtonProps>((props) => ({
  $size: props.$size ?? 40,
}))<SocialButtonProps>`
  display: flex;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition-property: transform, background-color, border-color;
  transition-duration: 50ms, 250ms, 250ms;
  transition-timing-function: ease, ease, cubic-bezier(0.165, 0.84, 0.44, 1);
  color: white;
  margin: 0 5px;

  &:hover {
    background-color: ${(props) =>
      props.$flavor && props.theme.colors.socials[props.$flavor]};
  }
`;

const SocialButtonN = ({
  name,
  url,
  size = 40,
}: {
  name: SocialMedia;
  url: string;
  size?: number;
}) => {
  const magnetHandlers = useMagnetic();

  return (
    <SocialButton
      $flavor={name}
      $size={size}
      href={url}
      rel="noreferrer"
      target="_blank"
      {...magnetHandlers}
    >
      <FontAwesomeIcon icon={["fab", name]} size={"lg"} />
    </SocialButton>
  );
};

interface Props {
  size?: number;
}

const SocialLinks = ({ size }: Props) => {
  const socialBtns = Object.entries(socialLinks).map((e, index) => {
    const name = e[0] as SocialMedia;
    const url = e[1];

    return <SocialButtonN key={index} name={name} url={url} size={size} />;
  });

  return <>{socialBtns}</>;
};

export default SocialLinks;
