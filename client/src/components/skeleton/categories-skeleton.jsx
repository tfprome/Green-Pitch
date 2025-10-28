import React from "react";

const Categoryskeleton = ({ count = 8 }) => {
  const items = Array.from({ length: count });

  return (
    <div className="">
      {/* <div className="text-4xl font-bold text-center mt-10">Featured Categories</div> */}

      {/* Mark region as loading for a11y */}
      <div
        className="flex flex-wrap mt-9 p-5 justify-center"
        aria-busy="true"
        aria-live="polite"
      >
        {items.map((_, i) => (
          <div
            key={i}
            className="shadow-md rounded-md m-5 w-40 h-40 p-4 animate-pulse"
          >
            {/* Image placeholder (matches your img area ~100px) */}
            <div className="w-full h-[100px] bg-gray-200 rounded" />

            {/* Brand name line */}
            <div className="mt-3 h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoryskeleton;
