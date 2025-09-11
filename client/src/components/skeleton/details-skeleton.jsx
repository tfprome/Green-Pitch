import React from 'react';
import Lottie from "lottie-react";
import ImagePlaceholder from "../../assets/image.json";
import Skeleton from "react-loading-skeleton";

const DetailsSkeleton = () => {
    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-7 align-content-center p-1">
                   <div className="container">
                       <div className="row">
                           <div className="col-12">
                               {
                                   Array.from({length:16}).map((_,index)=>{
                                       return(
                                           <Skeleton count={1} key={`left-${index}`} />
                                       )
                                   })
                               }
                           </div>
                           <div className="col-3">
                               <Lottie className="w-100" animationData={ImagePlaceholder} loop={true} />
                           </div>
                           <div className="col-3">
                               <Lottie className="w-100" animationData={ImagePlaceholder} loop={true} />
                           </div>
                           <div className="col-3">
                               <Lottie className="w-100" animationData={ImagePlaceholder} loop={true} />
                           </div>
                           <div className="col-3">
                               <Lottie className="w-100" animationData={ImagePlaceholder} loop={true} />
                           </div>
                       </div>
                   </div>
                </div>
                <div className="col-md-5 p-1">
                    {
                        Array.from({length:16}).map((_,index)=>{
                            return(
                                <Skeleton count={1} key={`right-${index}`}  />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default DetailsSkeleton;