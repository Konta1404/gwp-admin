import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    bodyClass.toggle(className, colorMode === "dark");
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
