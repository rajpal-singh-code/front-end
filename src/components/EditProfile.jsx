import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import axios from 'axios';
import { BASSE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    setError("");
    try{
      const res = await axios.patch(
        BASSE_URL + "/profile/edit", 
        {firstName,lastName,photoUrl,age,gender,about}, 
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);


    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <>
      <div className='flex justify-center gap-5 flex-col sm:flex-row m-5 mb-20 md:mb-1'>
      
        <div className="card bg-base-300 bg-opacity-80 w-96 shadow-lg">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold">Edit Profile</h2>

            <div>
              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="first-name"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="last-name"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">Photo-Url</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="photourl"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  placeholder="age"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  placeholder="gender"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs ">
                <div className="label my-2">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  placeholder="about"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              
            </div>

            <p className='text-red-500'>{error}</p>
            <div className="card-actions justify-center m-2">
              <button className="btn bg-cyan-600 text-white rounded-md" onClick={saveProfile}>save Profile</button>
            </div>

          </div>
        </div>
      
        <UserCard user={{ firstName,lastName,photoUrl,age,gender,about}}/>

      </div>


      { showToast &&  <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile save successfully.</span>
          </div>
        </div>
      }


    </>
  )
}

export default EditProfile
