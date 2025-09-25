import axios from 'axios';
import React, { useEffect } from 'react'
import { BASSE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async(status,_id) => {
      try{
        const res = axios.post(BASSE_URL + "/request/review/" + status + "/" + _id,{},{ withCredentials: true,});
        dispatch(removeRequest(_id));
      }catch(err) {
        console.log(err);
      }
    }

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASSE_URL + "/user/requests/received", {withCredentials: true ,});
            // console.log(res.data.data);
            dispatch(addRequests(res.data.data));
        } catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => {
        fetchRequests();
    },[]);
   
   if(!requests) return;
   if(requests.length === 0) return <h1 className='text-green-700 text-2xl text-center my-10'>No Request Found</h1>;

  return (
    <div className='text-center my-10'>
      <h1 className='font-bold text-3xl text-teal-600'>All Connection Requests</h1>

      { requests.map((request) => {
        const { _id,firstName,lastName,photoUrl,age,gender,about} = request.fromUserId;

        return (
          <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-95 sm:w-2/4 mx-auto gap-'>
            <div className=''>
              <img className='w-25 h-25 rounded-full' src={photoUrl} alt="photo" />
            </div>
            <div className=''>
              <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className=''>
              <button className='btn btn-primary my-2' onClick={()=> reviewRequest("rejected",request._id)}>Reject</button>
              <button className='btn btn-secondary mx-2' onClick={()=> reviewRequest("accepted",request._id)}>Accept</button>
            </div>
          </div>
        )
      })}

    </div>
  )

  
}

export default Requests
