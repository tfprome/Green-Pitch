import React from 'react';
import ImagePlaceholder from '../../assets/image.json'
import Lottie from 'lottie-react';
import Skeleton from 'react-loading-skeleton';

const Featureskeleton = (props) => {
    return (
        <div className="container section">
            <div className="row">
                {
                  Array.from({length:4}).map(()=>{
                      return(
                          <div className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
                              <div className="card shadow-sm">
                                  <div className="card-body">
                                      <div className="row">
                                          <div className="col-4">
                                              <Lottie className="w-100" animationData={ImagePlaceholder} loop={true} />
                                          </div>
                                          <div className="col-8">
                                              <Skeleton count={3} />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )
                  })
                }
            </div>
        </div>

    );
};

export default Featureskeleton;