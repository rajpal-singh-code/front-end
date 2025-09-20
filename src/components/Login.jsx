import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASSE_URL } from '../utils/constants';

const Login = () => {

  const [emailId,setEmailId] = useState("rajpalk@gmail.com");
  const [password,setPassword] = useState("Rajpal@22");
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {

    try {
      const res = await axios.post(BASSE_URL + "/login", {
        emailId,password,
      }, { withCredentials: true});   // for cookies
      dispatch(addUser(res.data));
      navigate("/");
    } catch(err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1754980059802-d94c92cf4a39?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="card bg-base-300 bg-opacity-80 w-96 shadow-lg">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">Login</h2>

          <div>
            <label className="form-control w-full max-w-xs ">
              <div className="label my-2">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="email"
                value={emailId}
                placeholder="email-id"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs ">
              <div className="label my-2">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                placeholder="password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-end my-2">
            <button className="btn bg-cyan-600 text-white rounded-md w-full" onClick={handleLogin}>Login</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
