import styled from "styled-components";

import Link from "next/link";

import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_PRETTY,
  pages,
} from "@/shared/constants";

const FooterSection = styled(Section)`
  padding-top: 0px;
  padding-bottom: 0px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: var(--swatch_d4a2cf80);
  background-color: var(--swatch_59430538);
`;

const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
`;

const FooterLeft = styled.div`
  display: flex;
  width: 33.33%;
  padding: 5vw;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: var(--swatch_d4a2cf80);
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 0%;
`;

const ContactHeading = styled.h4`
  margin-top: 8px;
  margin-bottom: 16px;

  font-size: 21px;
  line-height: 28px;
  font-weight: 500;
`;

const ContactEmail = styled.a`
  display: inline-block;
  margin-top: 4px;
  margin-bottom: 4px;
  transition: color 400ms ease;
  color: var(--swatch_46f8859a);
  text-decoration: none;

  &:hover {
    color: var(--swatch_88916155);
  }
`;

const ContactPhone = styled.a`
  display: inline-block;
  max-width: 100%;
  transition: color 400ms ease;
  color: var(--swatch_f4c6e65c);
  text-decoration: none;

  &:hover {
    color: var(--swatch_88916155);
  }
`;

const FooterSocials = styled.div`
  display: flex;
  margin-top: 12px;
  margin-left: -8px;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
`;

const FooterNav = styled.div`
  display: flex;
  width: 100%;
  padding: 3vw 5vw;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  flex: 1 1 0%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: var(--swatch_d4a2cf80);

  a {
    margin-top: 1vw;
    margin-right: 3vw;
    margin-bottom: 1vw;
    transition: color 300ms ease;
    color: white;
    font-size: 1.3vw;
    line-height: 1.8vw;
    font-weight: 500;
    text-decoration: none;

    :hover {
      color: var(--swatch_88916155);
    }
  }
`;

const FooterBottom = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 3vw 5vw;
  justify-content: flex-start;
  align-items: center;
  color: var(--swatch_d3053aea);
  font-size: 11px;
  line-height: 16px;

  a {
    transition: color 400ms ease;
    color: var(--swatch_f4c6e65c);
    text-decoration: none;

    :hover {
      color: var(--swatch_46f8859a);
    }
  }
`;

const Footer = () => {
  const navLinks = pages.map(([page, href], index) => (
    <Link key={index} href={href}>
      <a>{page}</a>
    </Link>
  ));

  return (
    <FooterSection>
      <FooterWrapper>
        <FooterLeft>
          <ContactHeading>Get in Touch</ContactHeading>
          <ContactEmail href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </ContactEmail>
          <ContactPhone href={`tel:${CONTACT_PHONE}`}>
            {CONTACT_PHONE_PRETTY}
          </ContactPhone>
          <FooterSocials>
            <SocialLinks size={36} />
          </FooterSocials>
        </FooterLeft>
        <FooterRight>
          <FooterNav>{navLinks}</FooterNav>
          <FooterBottom>
            <Link href="/">
              <a>
                Film By Ben &copy; {new Date().getFullYear()}. All Rights
                Reserved.
              </a>
            </Link>
          </FooterBottom>
        </FooterRight>
      </FooterWrapper>
    </FooterSection>
  );
};

export default Footer;
