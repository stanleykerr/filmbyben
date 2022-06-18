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
