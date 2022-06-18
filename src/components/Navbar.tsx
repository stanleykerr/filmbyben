import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animated, useSpring, easings } from "react-spring";
import styled from "styled-components";

import Image from "next/image";
import Link from "next/link";

import ButtonMagnet from "./ButtonMagnet";
import SocialLinks from "./SocialLinks";

const Wrapper = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 100;
  display: flex;
  width: 100%;
  height: 112px;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  color: white;
`;

const BrandWrapper = styled.a`
  position: relative;
  z-index: 101;
  display: flex;
  padding: 20px 32px;
  justify-content: flex-start;
  align-items: center;
  color: white;
  font-weight: 400;

  img {
    height: 44px;
  }

  // brand text wrapper
  & > div {
    display: flex;
    margin-left: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    // top brand text
    span:first-of-type {
      margin-top: -2px;
      font-size: 22px;
      line-height: 28px;
      font-weight: 700;
    }

    // bottom brand text
    span:last-of-type {
      margin-top: 2px;
      margin-left: 1px;
      font-size: 9px;
      line-height: 16px;
      letter-spacing: 2.2px;
      text-transform: uppercase;
    }
  }
`;

const Navigation = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  height: 100%;
  padding-right: 24px;
  padding-left: 20px;
  justify-content: flex-end;
  align-items: center;
  flex: 1 1 0%;
`;

const NavBarInfo = styled.div`
  position: relative;
  z-index: 101;
  display: flex;
  padding-right: 16px;
  padding-left: 16px;
  justify-content: flex-end;
  align-items: center;
`;

const ToggleButton = styled.div`
  display: flex;
  z-index: 10;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: white;
  font-weight: 700;
  justify-content: center;
  align-items: center;

  :first-child {
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
  }
`;

const NavWrapper = styled.nav`
  position: fixed;
  inset: 0%;
  display: flex; // display: none; when collapsed
  overflow: auto;
  height: 100vh;
  max-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(21, 21, 21);
  text-align: center;
  min-width: 200px;
`;

const NavContent = styled.div`
  position: relative;
  display: flex;
  min-height: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`;

const NavInfo = styled.div`
  display: flex;
  width: 50%;
  padding-right: 11vw;
  padding-left: 11vw;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
`;

const NavLinks = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  padding-right: 11vw;
  padding-left: 11vw;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1 1 0%;
`;

const NavInfoText = styled.div`
  margin-top: -4px;
  margin-bottom: 12px;
  color: var(--swatch_f4c6e65c);
`;

const NavInfoLink = styled.a`
  padding-top: 4px;
  padding-bottom: 4px;
  transition-property: color;
  transition-duration: 400ms;
  transition-timing-function: ease;
  color: white;
  font-size: 17px;
  line-height: 24px;
  text-decoration: none;

  &:hover {
    color: var(--swatch_88916155);
  }
`;

const NavFollowText = styled.div`
  margin-top: 39px;
  margin-bottom: 4px;
  color: var(--swatch_f4c6e65c);
  font-size: 15px;
  line-height: 25px;
  font-weight: 500;
`;

const NavSocial = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: -8px;
  justify-content: flex-start;
  align-items: center;
`;

const NavigationOverlay = styled(animated.div)`
  z-index: 10;
  position: absolute;
  overflow: hidden;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
`;

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  /*
  transform: ${({ open }) => `translateY(${open ? 0 : -100}%)`};
  transition: transform 1200ms cubic-bezier(0.77, 0, 0.175, 1);
  */

  const { y } = useSpring({
    y: isOpen ? "0%" : "-100%",
    config: {
      duration: 1200,
      easing: easings.easeInOutQuart,
    },
  });

  return (
    <>
      <Wrapper>
        <Link href="/" passHref>
          <BrandWrapper>
            <Image src="/img/logo.png" alt="Logo" width={32} height={44} />
            <div>
              <span>Film by Ben</span>
              <span>Cinematographer &amp; Film maker</span>
            </div>
          </BrandWrapper>
        </Link>
        <Navigation>
          <NavBarInfo>
            <ButtonMagnet href="/quote">Request a Consultation</ButtonMagnet>
          </NavBarInfo>
          <ToggleButton onClick={() => setOpen(!isOpen)}>
            <FontAwesomeIcon
              icon={["fas", isOpen ? "times" : "bars"]}
              size={"lg"}
            />
          </ToggleButton>
        </Navigation>
      </Wrapper>
      <NavigationOverlay style={{ y }}>
        <NavWrapper>
          <NavContent>
            <NavInfo>
              <h4
                style={{
                  marginTop: 0,
                  marginBottom: 12,
                  fontSize: 21,
                  lineHeight: "28px",
                  fontWeight: 500,
                }}
              >
                Film by Ben
              </h4>
              <NavInfoText>
                Professional Cinematographer and Film Maker based in Las Vegas,
                Nevada
              </NavInfoText>
              <NavInfoLink href="mailto:ben@filmbyben.com">
                ben@filmbyben.com
              </NavInfoLink>
              <NavInfoLink href="tel:+1-770-713-2223">
                +1 (770) 713-2223
              </NavInfoLink>
              <NavFollowText>Follow me</NavFollowText>
              <NavSocial>
                <SocialLinks size={40} />
              </NavSocial>
            </NavInfo>
            <NavLinks></NavLinks>
          </NavContent>
        </NavWrapper>
      </NavigationOverlay>
    </>
  );
};

export default Navbar;
