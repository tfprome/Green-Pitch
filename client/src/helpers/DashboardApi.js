const Backendurl=import.meta.env.VITE_BACKEND_URL
import axios from 'axios'

export const GetIndividualUser=async(req,res)=> {
     try{
          const token=sessionStorage.getItem('token')
          const res=await axios.get(`${Backendurl}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        return res.data.data;
     }
     catch(e){
          console.log('error in api',e)
          throw(e)
          
     }
}

export const GetAllProducts=async()=> {
     try{
          const res=await axios.get(`${Backendurl}/products`);
          console.log('res in products api',res)
          return res.data.data;
     }
     catch(e){
          console.log('error in api',e)
          throw(e)
          
     }
}