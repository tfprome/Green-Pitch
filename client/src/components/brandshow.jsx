import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Brandskeleton from './skeleton/brands-skeleton';
import {easeInOut, motion} from 'framer-motion'

const BrandShow = (props) => {
    //const [formdata,setFormdata]=useState({brandname:'',brandimg:''})
    const [branddata,setBranddata]=useState([])
    const [loading,setLoading]=useState(true)

     useEffect(()=>{
        const fetch=async()=>{
            try{
                const brands=await axios.get('https://green-pitch.onrender.com/brand')
                setBranddata(brands.data)
                //console.log(brands.data)
                setLoading(false)
            }
            catch(e){
                console.error('brand data failed',e)
                setLoading(false)
            }
        }
        fetch();   
     },[])

    //  if(branddata.length==0)
    //     console.log('empty')
    // else
    //   console.log(`https://green-pitch.onrender.com${branddata[0].brandimg}`)
    // if (loading || !branddata.length) {
    //     return <Brandskeleton />;
    // }

    


    return (
        
     <div>
        {loading?<Brandskeleton count={8}/>
        :
        <div className=''>
          <div className='text-4xl font-bold text-center mt-10'>Featured Brands</div>
              <motion.div className='flex flex-wrap mt-9 p-5 justify-center'
               initial="hidden"
               animate="visible"
               variants={{
                 hidden: {},
                 visible: {
                   transition: {
                     staggerChildren: 0.1
                   }
                 }
               }} style={{overflowX:'hidden'}}>
                 {branddata.map((item,index)=>(
                 <Link to={`/productlistbybrand/${item._id}`}>
                        <motion.div key={item._id} className='shadow-md rounded-md  m-5 w-40 h-40 flex flex-col items-center cursor-pointer transition-transform ease-in-out
                            duration-300 hover:shadow-xl hover:scale-110  hover:bg-gray-300'
                            initial={{opacity:0,x:20}}
                            animate={{opacity:1,x:0}}
                            transition={{duration:0.5,delay:index*0.1}}>
                            <img src={`https://green-pitch.onrender.com${item.brandimg}`} alt={item.brandname} height={200} width={200} className='max-w-full max-h-[100px] p-4 object-contain'/>
                            <div className='text-center mt-3 font-semibold'>{item.brandname}</div>
                        </motion.div>
                 </Link>
             
          ))}
           </motion.div>
       </div>}
     </div>

    );
};

export default BrandShow;