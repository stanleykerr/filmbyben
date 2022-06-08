import { Tabs, useTheme, Breadcrumbs } from "@geist-ui/core";
import styled from "styled-components";

import { useRouter } from "next/router";

import { useUser } from "@/lib/hooks";
import { cmsPages } from "@/shared/constants";

import styles from "@/styles/CmsNavbar.module.scss";

// TODO: use theme for header height
const Nav = styled.nav`
  display: flex;
  align-items: center;
  max-width: ${(props) => props.theme.layout.pageWidthWithMargin};
  margin: auto;
  padding: 0 ${(props) => props.theme.layout.pageMargin};
  height: 64px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
`;

const Linkz = styled.a`
  display: block;
  width: 28px;
  height: 26px;
  padding: ${(props) => props.theme.layout.gapHalf};
  margin: ${(props) => props.theme.layout.gapHalfNegative};
  box-sizing: content-box;
  position: relative;
`;

export default function CmsNavbar() {
  const router = useRouter();
  const theme = useTheme();

  const [user, { mutate }] = useUser();

  const handleLogout = async () => {
    await fetch("/api/logout");
    mutate({ user: null });
  };

  // [title, href]

  return (
    <div style={{ background: "white" }}>
      <Nav>
        <div className={styles.scope}>
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <Linkz>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={theme.palette.foreground}
                  /* height="26" */
                  /* viewBox="0 0 12.45 18.61" */
                  viewBox="0 0 12.45 18.61"
                  style={{
                    width: "auto",
                    height: "26px",
                    margin: 0,
                  }}
                >
                  <path d="M3.1,15.52a.13.13,0,0,0,0,.12,1,1,0,0,0,.18.17,4.18,4.18,0,0,0,1,.64A4.39,4.39,0,0,0,6,16.89a5,5,0,0,0,1.09-.07l.5-.13L5.07,12.53C5,12.69,3.24,15.29,3.1,15.52Z" />
                  <path d="M6.37,10.78C5.9,9.9,5.43,9,5,8.14c0-.07-.08-.09-.15-.05l-.69.3a3.73,3.73,0,0,0-1,.66,4.62,4.62,0,0,0-1.11,1.58c-.09.2-.15.42-.23.66H6.64Z" />
                  <path d="M10.55,11.06A4.44,4.44,0,0,0,9.5,9.27c-.08-.09-.09-.09-.16,0l-.9,1.52c-.33.56-.67,1.11-1,1.66-.14.25-.29.5-.45.77h3.44c.25,0,.26,0,.28-.25A4.46,4.46,0,0,0,10.55,11.06Z" />
                  <path d="M9.24,9a4.44,4.44,0,0,0-4.1-1l2.23,4.15Z" />
                  <path d="M10.5,13.46H5.88l.19.29h0l.32.52c.46.76.92,1.51,1.37,2.27,0,.06.07.07.13,0s.37-.16.55-.26a4.47,4.47,0,0,0,2.15-2.75C10.62,13.48,10.6,13.46,10.5,13.46Z" />
                  <path d="M5.31,11.52H1.89s-.11,0-.12.07l0,.24a4.46,4.46,0,0,0,.16,1.85,4.52,4.52,0,0,0,1,1.74l2.58-3.9Z" />
                  <path d="M10.63,8a6,6,0,0,0-4.4-1.82A6,6,0,0,0,1.83,8a6.29,6.29,0,0,0-1,1.36V0H0V12.38a6,6,0,0,0,1.82,4.4,6,6,0,0,0,4.41,1.83,6,6,0,0,0,4.4-1.83,6,6,0,0,0,1.82-4.4A6,6,0,0,0,10.63,8Zm-.55,8.26a5.26,5.26,0,0,1-3.85,1.6,5.29,5.29,0,0,1-3.86-1.6A5.25,5.25,0,0,1,.78,12.38,5.28,5.28,0,0,1,2.37,8.52,5.28,5.28,0,0,1,6.23,6.93a5.25,5.25,0,0,1,3.85,1.59,5.29,5.29,0,0,1,1.6,3.86A5.26,5.26,0,0,1,10.08,16.23Z" />
                </svg>

                {/* <svg
                  fill={theme.palette.foreground}
                  height="26"
                  viewBox="0 0 75 65"
                  style={{
                    width: "auto",
                    height: "26px",
                    margin: 0,
                  }}
                >
                  <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
                </svg> */}
              </Linkz>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item href="">{user && user.name}</Breadcrumbs.Item>
            <Breadcrumbs.Item>Page</Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className={styles.links}>test2</div>
      </Nav>
      <style jsx global>{`
        .content {
          padding-top: 0 !important;
        }

        .separator {
          font-size: 32px;
          font-weight: 200;
        }

        /* .separator:first-of-type {
          padding: 0 ${theme.layout.gapHalf} !important;
        } */
      `}</style>
      <nav className={styles.menu}>
        <Tabs
          hideDivider
          initialValue={router.asPath}
          onChange={(href) => router.push(href)}
          leftSpace={theme.layout.pageMargin}
          style={{
            width: theme.layout.pageWidthWithMargin,
            margin: "auto auto",
            marginTop: -10,
            height: 48, // theme.layout.pageMargin * 2
          }}
        >
          {cmsPages.map(([title, href], index) => (
            <Tabs.Item
              key={`tab-${index}`}
              value={href}
              label={title}
            ></Tabs.Item>
          ))}
        </Tabs>
      </nav>
    </div>
  );
}
