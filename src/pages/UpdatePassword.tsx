
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a valid session from the reset link
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setValidSession(true);
      } else {
        toast.error("Invalid or expired password reset session");
        navigate('/login');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password updated successfully");
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!validSession) {
    return <div className="min-h-screen flex items-center justify-center">Validating session...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-dark">
      <div className="form w-80 flex flex-col gap-3 py-4 px-8 bg-[#171717] rounded-3xl transition-transform duration-400 hover:scale-105 hover:border border-black">
        <p id="heading" className="text-center my-8 text-white text-xl">Update Password</p>
        
        <form onSubmit={handleUpdatePassword}>
          <div className="field flex items-center justify-center gap-2 rounded-3xl p-2 border-none outline-none text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)] mt-3">
            <svg className="input-icon h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <Input 
              type="password"
              placeholder="New Password" 
              className="input-field bg-transparent border-none outline-none w-full text-[#d3d3d3]" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="field flex items-center justify-center gap-2 rounded-3xl p-2 border-none outline-none text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)] mt-3">
            <svg className="input-icon h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <Input 
              type="password"
              placeholder="Confirm Password" 
              className="input-field bg-transparent border-none outline-none w-full text-[#d3d3d3]" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="btn flex justify-center flex-row mt-6">
            <Button 
              type="submit"
              className="w-full px-4 py-2 rounded border-none outline-none transition-all duration-400 bg-[#252525] text-white hover:bg-black hover:text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
