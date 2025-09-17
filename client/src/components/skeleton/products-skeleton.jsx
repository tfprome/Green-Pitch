import React from "react";


// Default-exported functional component. `count` controls how many skeleton cards show.
const ProductShowSkeleton=({ count = 8 })=> {
    // Create an array of the requested length so we can map and render placeholders
    const items = Array.from({ length: count });


    return (
        // Outer wrapper: spacing matches ProductShow and provides accessibility attrs
        <div
            className="w-full px-2 sm:px-4 md:px-6 lg:px-10 py-6"
            aria-busy="true" // tells assistive tech the section is loading
            aria-live="polite" // politely announce updates
        >



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((_, i) => (
                    <div key={i} className="p-2 sm:p-3">
                        <div className="bg-white shadow-md rounded-xl overflow-hidden animate-pulse flex flex-col h-full">


                            {/* Image placeholder: fixed height to match ProductShow's img heights */}
                            <div className="w-full h-36 sm:h-44 md:h-52 bg-gray-200" />


                            {/* Card body placeholder: spacing and vertical layout like real card */}
                            <div className="p-3 flex-1 flex flex-col justify-between">
                                {/* Title placeholder (one-line) */}
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />


                                {/* Description placeholder (two-line height) */}
                                <div className="h-10 bg-gray-200 rounded w-full mb-2" />


                                {/* Price & rating row placeholder */}
                                <div className="flex justify-between items-center mt-2">
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                    <div className="h-4 bg-gray-200 rounded w-12" />
                                </div>


                                {/* CTA button placeholder */}
                                <div className="mt-3 h-8 bg-gray-200 rounded w-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductShowSkeleton;