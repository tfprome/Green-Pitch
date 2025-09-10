import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const BrandShow = (props) => {
    //const [formdata,setFormdata]=useState({brandname:'',brandimg:''})
    const [branddata,setBranddata]=useState([])

     useEffect(()=>{
        const fetch=async()=>{
            try{
                const brands=await axios.get('http://localhost:5000/brand')
                setBranddata(brands.data)
                //console.log(brands.data)
            }
            catch(e){
                console.error('brand data failed',e)
            }
        }
        fetch();   
     },[])

    //  if(branddata.length==0)
    //     console.log('empty')
    // else
    //   console.log(`http://localhost:5000${branddata[0].brandimg}`)
    



    return (
        
       <div className=''>
          <div className='text-4xl font-bold text-center mt-10'>Featured Brands</div>
              <div className='flex flex-wrap mt-9 p-5 justify-center' style={{overflowX:'hidden'}}>
                 {branddata.map((item)=>(
                 <Link to={`/productlistbybrand/${item._id}`}>
                        <div key={item._id} className='shadow-md rounded-md  m-5 w-40 h-40 flex flex-col items-center cursor-pointer transition-transform ease-in-out
                            duration-300 hover:shadow-xl hover:scale-110  hover:bg-gray-300'>
                            <img src={`http://localhost:5000${item.brandimg}`} alt={item.brandname} height={200} width={200} className='max-w-full max-h-[100px] p-4 object-contain'/>
                            <div className='text-center mt-3 font-semibold'>{item.brandname}</div>
                        </div>
                 </Link>
             
          ))}
           </div>
       </div>

    );
};

export default BrandShow;