import type { IUser } from "@/types";

declare module "*module.css" {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

declare global {
  namespace Express {
    interface User extends IUser {
      email?: string;
    }
  }
}

declare module "magnet-mouse" {
  interface ElementPosition {
    elem: {
      node: HTMLElement;
      width: number;
      height: number;
    };
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  }

  interface MousePosition {
    x: number;
    y: number;
  }

  type MagnetPosition =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center"
    | "center";

  interface MagnetMouseConfig {
    follow?: {
      element?: string;
      class?: string;
    };
    magnet?: {
      element?: string;
      class?: string;
      enabled?: boolean;
      distance?: number;
      position?: MagnetPosition;
    };
    throttle?: number;
    inCallback?: (posElement: ElementPosition) => void;
    outCallback?: (posElement: ElementPosition) => void;
  }
  declare class MagnetMouse {
    constructor(config: MagnetMouseConfig);

    static throttle(
      callback: (e: MouseEvent) => void,
      delay: number
    ): () => void;
    static mobileAndTabletcheck(): boolean;

    getMousePosition(e: MouseEvent): MousePosition;
    getElementsPosition(): ElementPosition[];
    getPosition(
      data: ElementPosition[],
      posMouse: MousePosition
    ): MousePosition;
    defaultAction(
      action: "onEnter" | "onLeave",
      mouseElement: MousePosition,
      data: ElementPosition
    ): void;
    magnetElement(posElement: ElementPosition[], posMouse: MousePosition): void;
    hoverElement(posElement: ElementPosition[], posMouse: MousePosition): void;
    init(): void;
    destroy(): void;
  }

  export = MagnetMouse;
}
