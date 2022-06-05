// TODO: import this into type declarations
// TODO: organize type declarations
// import original module declarations
import "styled-components";

import type { SocialMediaMap } from "@shared/constants";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      socials: SocialMediaMap;
    };

    layout: {
      pageWidthWithMargin: string | number;
      pageMargin: string | number;
    };
  }
}
