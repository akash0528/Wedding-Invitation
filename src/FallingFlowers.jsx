import React from "react";
import "./FallingFlowers.css";
import FlowerImg from "./assets/Flower.webp";
import FlowerImg2 from "./assets/Flow.webp";

// --- YAHAN APNA IMAGE URL YA LOCAL PATH DALEIN ---
// Agar image upload ho chuki hai, toh is variable ko uske standard URL se replace karein.
const LEAF_IMAGE_URL = FlowerImg; // Example image address.
const LEAF_IMAGE = FlowerImg2;
// -----------------------------------------------

const flowerShapes = [
  "🌺",

  "🌼",
  // Hum apne pink leaf image ko is object ke roop mein add karenge.
  { type: "image", url: LEAF_IMAGE_URL },
  { type: "image", url: LEAF_IMAGE },
];

const flowers = Array.from({ length: 30 }); // Humne total flowers badha diye hain.

const FallingFlowers = () => {
  return (
    <div className="falling-flowers">
      {flowers.map((_, index) => {
        const currentShape = flowerShapes[index % flowerShapes.length];

        return (
          <span
            key={index}
            className="falling-flower"
            style={{
              left: `${Math.random() * 100}%`,
              // ARAAM SE GIRNE KE LIYE (10 se 15 seconds)
              animationDuration: `${10 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 10}s`, // Delay range badha di hai.
              // Agar shape emoji hai, toh fontSize use karein.
              fontSize:
                typeof currentShape === "string"
                  ? `${18 + Math.random() * 12}px`
                  : undefined,
              // Agar shape image hai, toh special styling ke liye alag variable use kar sakte hain.
              width:
                typeof currentShape === "object"
                  ? `${35 + Math.random() * 20}px`
                  : undefined, // Leaf width
            }}
          >
            {typeof currentShape === "string" ? (
              currentShape
            ) : (
              <img
                src={currentShape.url}
                alt="pink-leaf"
                className="leaf-image"
              />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default FallingFlowers;
