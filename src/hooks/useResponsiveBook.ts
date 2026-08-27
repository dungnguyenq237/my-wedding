import { useEffect, useState } from "react";

export interface ResponsiveBookProfile {
  isMobile: boolean;
  scale: number;
  cameraPosition: readonly [number, number, number];
}

const profileForWidth = (width: number): ResponsiveBookProfile => {
  if (width < 700) {
    return {
      isMobile: true,
      scale: 0.76,
      cameraPosition: [0, 0.15, 11.8],
    };
  }
  if (width < 1100) {
    return {
      isMobile: false,
      scale: 0.88,
      cameraPosition: [0, 0.25, 9.8],
    };
  }
  return {
    isMobile: false,
    scale: 1,
    cameraPosition: [0, 0.3, 8.8],
  };
};

export const useResponsiveBook = (): ResponsiveBookProfile => {
  const [profile, setProfile] = useState(() =>
    profileForWidth(typeof window === "undefined" ? 1440 : window.innerWidth),
  );

  useEffect(() => {
    const updateProfile = () => setProfile(profileForWidth(window.innerWidth));
    window.addEventListener("resize", updateProfile, { passive: true });
    return () => window.removeEventListener("resize", updateProfile);
  }, []);

  return profile;
};
