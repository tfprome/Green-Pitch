import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Categoryshow = (props) => {
    //const [formdata,setFormdata]=useState({brandname:'',brandimg:''})
    const [categorydata,setCategorydata]=useState([])

     useEffect(()=>{
        const fetch=async()=>{
            try{
                const categories=await axios.get('http://localhost:5000/category')
                setCategorydata(categories.data)
                //console.log(teams.data)
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
    //   console.log(`http://localhost:5000${branddata[0].brandimg}`)
    
     //console.log(`http://localhost:5000${categorydata[15].categorylogo}`)
     //console.log(categorydata)

    return (
        
       <div>
          <div className='text-4xl font-bold text-center mt-10'>Featured Categories</div>
           <div className='flex flex-wrap mt-9 p-5 justify-center' style={{overflowX:'hidden'}}>
           {categorydata.map((item)=>(
             <Link to={`/productlistbyteam/${item._id}`}>
                  <div key={item._id} className='shadow-md rounded-md  m-5 w-40 h-40 flex flex-col items-center cursor-pointer transition-transform ease-in-out
                            duration-300 hover:shadow-xl hover:scale-110  hover:bg-gray-300'>
                        <img src={`http://localhost:5000${item.categorylogo}`} alt={item.categoryname} height={200} width={200} className='max-w-full max-h-[100px] p-4 object-contain'/>
                        <div className='text-center mt-3 font-semibold'>{item.categoryname}</div>
                  </div>
             </Link>
             
          ))}
           </div>
       </div>

    );
};

export default Categoryshow;