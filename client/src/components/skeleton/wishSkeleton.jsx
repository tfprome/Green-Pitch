import React from "react";

const WishpageSkeleton = () => {
  // 4 placeholder items
  const placeholders = [1, 2, 3, 4];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100 animate-pulse">
      {placeholders.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white shadow-md rounded-xl p-4 mb-4"
        >
          {/* Left side placeholder */}
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/5 bg-gray-300 rounded"></div> {/* title */}
            <div className="h-4 w-full bg-gray-300 rounded"></div> {/* description line 1 */}
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div> {/* description line 2 */}
            <div className="flex items-center gap-1">
              <div className="h-4 w-16 bg-gray-300 rounded"></div> {/* Price label */}
              <div className="h-4 w-6 bg-gray-300 rounded"></div> {/* Currency */}
              <div className="h-4 w-16 bg-gray-300 rounded"></div> {/* Price value */}
            </div>
            <div className="h-8 w-24 bg-gray-300 rounded mt-2"></div> {/* Remove button */}
          </div>

          {/* Right side image placeholder */}
          <div className="w-32 h-32 bg-gray-300 rounded-lg ml-4"></div>
        </div>
      ))}
    </div>
  );
};

export default WishpageSkeleton;
