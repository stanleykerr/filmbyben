import styled from "styled-components";

import type { SocialMedia } from "@shared/constants";

// TODO: find which size should be used as default (40 vs 48 vs ???)
export interface SocialButtonProps {
  $size?: number;
  $flavor?: SocialMedia;
}

const SocialButton = styled.a.attrs<SocialButtonProps>((props) => ({
  $size: props.$size ?? 40,
}))<SocialButtonProps>`
  display: flex;
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition-property: transform, background-color, border-color;
  transition-duration: 250ms, 250ms, 250ms;
  transition-timing-function: ease, ease, cubic-bezier(0.165, 0.84, 0.44, 1);
  color: white;
  margin: 0 5px;

  &:hover {
    background-color: ${(props) =>
      props.$flavor && props.theme.colors.socials[props.$flavor]};
  }
`;

export default SocialButton;
