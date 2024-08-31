// components/LottieAnimation.js
import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({ path }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const loadAnimation = async () => {
      const response = await fetch(path);
      const animationData = await response.json();

      const animation = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });

      return () => animation.destroy(); // Clean up on unmount
    };

    loadAnimation();
  }, [path]);

  return (
    <div ref={animationContainer} style={{ width: "100%", height: "100%" }} />
  );
};

export default LottieAnimation;
