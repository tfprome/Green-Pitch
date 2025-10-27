import React from "react";

const SliderSkeleton = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-[500px] bg-gray-100">
      <div
        className="w-8 h-8 rounded-sm mx-auto relative overflow-hidden"
        style={{
          border: "1px solid #000",
          background: `linear-gradient(45deg, transparent 49%, #000 50%, #000 50%, transparent 51%, transparent),
                       linear-gradient(-45deg, transparent 49%, #000 50%, #000 50%, transparent 51%, transparent)`,
          backgroundSize: "1rem 1rem",
          backgroundPosition: "0 0",
          animation: "spTexture 1s infinite linear",
        }}
      >
        {/* Wave overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
            transform: "skewX(-20deg)",
            animation: "wave 1.5s infinite",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes spTexture {
          from { background-position: 0 0; }
          to { background-position: -1rem 0; }
        }
        @keyframes wave {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default SliderSkeleton;
