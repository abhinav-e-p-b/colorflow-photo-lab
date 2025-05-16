
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";

// Tailwind version of your styled form
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      toast.success("Login successful!");
      navigate('/');
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Sign up functionality is not implemented yet.");
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-dark">
      <div className="form w-80 flex flex-col gap-3 py-4 px-8 bg-[#171717] rounded-3xl transition-transform duration-400 hover:scale-105 hover:border border-black">
        <p id="heading" className="text-center my-8 text-white text-xl">Login</p>
        <form onSubmit={handleLogin}>
          <div className="field flex items-center justify-center gap-2 rounded-3xl p-2 border-none outline-none text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
            <svg className="input-icon h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
            <input 
              autoComplete="off" 
              placeholder="Username" 
              className="input-field bg-transparent border-none outline-none w-full text-[#d3d3d3]" 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="field flex items-center justify-center gap-2 rounded-3xl p-2 border-none outline-none text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)] mt-3">
            <svg className="input-icon h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input 
              placeholder="Password" 
              className="input-field bg-transparent border-none outline-none w-full text-[#d3d3d3]" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="btn flex justify-center flex-row mt-10">
            <button 
              type="submit"
              className="px-4 py-2 rounded mr-2 border-none outline-none transition-all duration-400 bg-[#252525] text-white hover:bg-black hover:text-white"
            >
              Login
            </button>
            <button 
              onClick={handleSignUp}
              className="px-9 py-2 rounded border-none outline-none transition-all duration-400 bg-[#252525] text-white hover:bg-black hover:text-white"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <button 
          onClick={handleForgotPassword}
          className="mb-12 px-4 py-2 mt-3 rounded border-none outline-none transition-all duration-400 bg-[#252525] text-white hover:bg-red-600 hover:text-white"
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default Login;
