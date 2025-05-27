import "./css/HeroHeader.css";
import React, { useState, useEffect } from "react";

const HeroHeader = () => {
  const images = [
    "/assets/0032079a-ebf7-4fde-aee8-2ad4109abe56.jpeg",
    "/assets/433663a2-d1df-4ee3-82db-0aa4f7ccfd5a.jpeg",
    "/assets/Bold Minimalism Graphic Design Trends 2023 Poster Design by Zeka Design.jpeg",
    "/assets/cc1089ba-ba69-4d02-8d03-60c0f3047e48.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Go to the next image, loop to 0 when finished
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 30 seconds

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-conatainer">
      <img
      className="img-img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default HeroHeader;
