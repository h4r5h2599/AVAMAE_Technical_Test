import { useState, useEffect } from "react";

function useMobile() {
  const [isSmall, setIsSmall] = useState(() => window.innerWidth < 1300);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1300);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isSmall;
}

export default useMobile;
