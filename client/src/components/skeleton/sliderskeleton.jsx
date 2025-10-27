import React from "react";

const SliderSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-[500px] bg-gray-200 overflow-hidden">
      {/* Full-width shimmer background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      ></div>

      {/* Cube loader on top */}
      <div
        className="w-8 h-8 rounded-sm z-10"
        style={{
          border: "1px solid #000",
          background: `linear-gradient(45deg, transparent 49%, #000 50%, #000 50%, transparent 51%, transparent),
                       linear-gradient(-45deg, transparent 49%, #000 50%, #000 50%, transparent 51%, transparent)`,
          backgroundSize: "1rem 1rem",
          backgroundPosition: "0 0",
          animation: "spTexture 1s infinite linear",
        }}
      ></div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes spTexture {
          from { background-position: 0 0; }
          to { background-position: -1rem 0; }
        }
      `}</style>
    </div>
  );
};

export default SliderSkeleton;
