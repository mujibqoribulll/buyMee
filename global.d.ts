//import the object theme you created

import { themes } from "./src/utils/themes";

declare module '@react-navigation/native' {
  export type ExtendedTheme = typeof themes.default;
  export function useTheme(): ExtendedTheme;
}
