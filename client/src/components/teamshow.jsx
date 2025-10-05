import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import Categoryskeleton from './skeleton/categories-skeleton';

const Categoryshow = (props) => {
    //const [formdata,setFormdata]=useState({brandname:'',brandimg:''})
    const [categorydata,setCategorydata]=useState([])
    const [loading,setLoading]=useState(true)

     useEffect(()=>{
        const fetch=async()=>{
            try{
                const categories=await axios.get('https://green-pitch.vercel.app//category')
                setCategorydata(categories.data)
                //console.log(teams.data)
                setLoading(false)
            }
            catch(e){
                console.error('category data failed',e)
            }
        }
        fetch();   
     },[])

    //  if(branddata.length==0)
    //     console.log('empty')
    // else
    //   console.log(`https://green-pitch.vercel.app/${branddata[0].brandimg}`)
    
     //console.log(`https://green-pitch.vercel.app/${categorydata[15].categorylogo}`)
     //console.log(categorydata)

    return (
        
       <div>
          {loading?
          <Categoryskeleton count={8}/>:
          <div>
            <div className='text-4xl font-bold text-center mt-10'>Featured Categories</div>
           <div className='flex flex-wrap mt-9 p-5 justify-center' style={{overflowX:'hidden'}}>
           {categorydata.map((item,index)=>(
             <Link to={`/productlistbyteam/${item._id}`}>
                  <motion.div key={item._id} className='shadow-md rounded-md  m-5 w-40 h-40 flex flex-col items-center cursor-pointer transition-transform ease-in-out
                            duration-300 hover:shadow-xl hover:scale-110  hover:bg-gray-300'
                             initial={{opacity:0,x:20}}
                            animate={{opacity:1,x:0}}
                            transition={{duration:0.5,delay:index*0.1}}>
                        <img src={`https://green-pitch.vercel.app/${item.categorylogo}`} alt={item.categoryname} height={200} width={200} className='max-w-full max-h-[100px] p-4 object-contain'/>
                        <div className='text-center mt-3 font-semibold'>{item.categoryname}</div>
                  </motion.div>
             </Link>
             
          ))}
           </div></div>}
       </div>

    );
};

export default Categoryshow;