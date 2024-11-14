import { createContext } from "react";

interface OptionsContextType {
  page: string;
  trimester: string;
  course: string;
}
export const OptionsContext = createContext<OptionsContextType>({
  page: "",
  trimester: "",
  course: "",
});
