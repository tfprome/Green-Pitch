import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col mb-20 lg:flex-row items-start justify-center px-4 lg:px-0 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full lg:w-2/5 mt-10 lg:mt-35 mb-6 lg:mb-0 flex justify-center">
        <div className="bg-gray-300 rounded-lg w-[350px] h-[400px]" />
      </div>

      {/* Right side placeholder */}
      <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start mt-10 lg:mt-30">
        {/* Title */}
        <div className="w-3/4 h-8 bg-gray-300 rounded mb-5" />

        {/* Description lines */}
        <div className="w-full h-4 bg-gray-300 rounded mb-3" />
        <div className="w-5/6 h-4 bg-gray-300 rounded mb-3" />
        <div className="w-4/6 h-4 bg-gray-300 rounded mb-5" />

        {/* Size buttons skeleton */}
        <div className="flex gap-3 mb-5">
          <div className="w-16 h-8 bg-gray-300 rounded" />
          <div className="w-16 h-8 bg-gray-300 rounded" />
          <div className="w-16 h-8 bg-gray-300 rounded" />
        </div>

        {/* Price skeleton */}
        <div className="w-24 h-6 bg-gray-300 rounded mb-5" />

        {/* Rating stars skeleton */}
        <div className="flex gap-2 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-300 rounded-full" />
          ))}
        </div>

        {/* Quantity buttons */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-8 h-8 bg-gray-300 rounded" />
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-8 h-8 bg-gray-300 rounded" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col lg:flex-row w-full gap-2">
          <div className="w-full lg:w-1/3 h-10 bg-gray-300 rounded" />
          <div className="w-full lg:w-1/3 h-10 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
