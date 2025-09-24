import axios from 'axios';
import React, { useEffect } from 'react'
import { BASSE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    
    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const fectchConnections = async() => {
      try{
        const res = await axios.get(BASSE_URL + "/user/connections", { withCredentials: true, });
        dispatch(addConnections(res.data.data));

      } catch(err){
        console.log(err);
      }
    };

   useEffect(() => {
    fectchConnections();
   },[]);

   console.log(connections)
   if(!connections) return;
   if(connections.length === 0) return <h1 className='text-green-700 text-2xl text-center my-10'>No Connections Found</h1>;

  return (
    <div className='text-center my-10'>
      <h1 className='font-bold text-3xl text-teal-600'>Connections</h1>

      { connections.map((connection) => {
        const { firstName,lastName,photoUrl,age,gender,about} = connection;

        return (
          <div className='flex m-4 p-4 rounded-lg bg-base-300 w-95 sm:w-110 mx-auto gap-5'>
            <div className=''>
              <img className='w-25 h-25 rounded-full' src={photoUrl} alt="photo" />
            </div>
            <div className=''>
              <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Connections
