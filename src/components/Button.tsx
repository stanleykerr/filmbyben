import styled from "styled-components";

const Button = styled.a`
  display: flex;
  // height: 48px;
  padding: 12px 28px;
  justify-content: center;
  align-items: center;
  border-style: none;
  border-radius: 24px;
  background-color: transparent;
  background-image: none;
  box-shadow: rgb(255 255 255) 0px 0px 0px 2px inset;
  transition-property: box-shadow, box-shadow, border-color, color,
    background-color;
  transition-duration: 600ms, 600ms, 600ms, 600ms, 600ms;
  transition-timing-function: ease, ease, ease, ease, ease;
  color: rgb(255, 255, 255);
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: var(--swatch_46f8859a);
    color: var(--swatch_59430538);
  }
`;

export default Button;
