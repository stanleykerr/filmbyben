import { createGlobalStyle } from "styled-components";

/**
 * TODO: implement swapping theme based on user preference?
 * would need to include a theme switcher component and swap usage in the _app
 *
 * ```jsx
 * const [themeType, setThemeType] = useState("light");
 * const switchThemes = () => {
 *   setThemeType((last) => (last === "dark" ? "light" : "dark"));
 * };
 * ```
 */

export const GlobalStyle = createGlobalStyle`
  
`;

export { theme, themeType, customUnitTheme } from "./dark";
