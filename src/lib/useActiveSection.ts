import { useEffect, useState } from "react";

const SECTION_IDS = ["home", "residential", "commercial", "amc", "contact"] as const;

export function useActiveSection() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + 130;
      let current: string = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}
