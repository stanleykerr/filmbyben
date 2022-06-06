// import original module declarations
import "styled-components";

import type { SocialMediaMap } from "@shared/constants";

// and extend them!
// find: (.*): (.*);
// replace: $1: string | number;
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      socials: SocialMediaMap;
    };

    palette: {
      accents_1: string;
      accents_2: string;
      accents_3: string;
      accents_4: string;
      accents_5: string;
      accents_6: string;
      accents_7: string;
      accents_8: string;
      background: string;
      foreground: string;
      selection: string;
      secondary: string;
      code: string;
      border: string;
      error: string;
      errorLight: string;
      errorLighter: string;
      errorDark: string;
      success: string;
      successLight: string;
      successLighter: string;
      successDark: string;
      warning: string;
      warningLight: string;
      warningLighter: string;
      warningDark: string;
      cyan: string;
      cyanLighter: string;
      cyanLight: string;
      cyanDark: string;
      violet: string;
      violetLighter: string;
      violetLight: string;
      violetDark: string;
      purple: string;
      alert: string;
      magenta: string;
      link: string;
    };

    layout: {
      gap: string | number;
      gapNegative: string | number;
      gapHalf: string | number;
      gapHalfNegative: string | number;
      gapQuarter: string | number;
      gapQuarterNegative: string | number;
      pageMargin: string | number;
      pageWidth: string | number;
      pageWidthWithMargin: string | number;
      breakpointMobile: string | number;
      breakpointTablet: string | number;
      radius: string | number;
      unit: string | number;
    };
  }
}
