import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASSE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASSE_URL+ "/feed",{withCredentials: true });
      dispatch(addFeed(res.data));
    } catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    getFeed();
  },[]);

  return feed && (
    <div className='flex my-10 justify-center'>
       <UserCard user={feed[4]}/>
    </div>
  )
}

export default Feed
