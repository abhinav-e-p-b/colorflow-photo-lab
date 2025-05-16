
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/update-password',
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        setSent(true);
        toast.success("Password reset link sent to your email");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-editor-dark">
      <div className="form w-80 flex flex-col gap-3 py-4 px-8 bg-[#171717] rounded-3xl transition-transform duration-400 hover:scale-105 hover:border border-black">
        <p id="heading" className="text-center my-8 text-white text-xl">Reset Password</p>
        
        {sent ? (
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Password reset link has been sent to your email. Please check your inbox.
            </p>
            <Button 
              onClick={() => navigate('/login')}
              className="w-full mt-4 mb-8 bg-[#252525] hover:bg-black"
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="field flex items-center justify-center gap-2 rounded-3xl p-2 border-none outline-none text-white bg-[#171717] shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
              <svg className="input-icon h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
              </svg>
              <Input 
                type="email"
                placeholder="Email" 
                className="input-field bg-transparent border-none outline-none w-full text-[#d3d3d3]" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="btn flex justify-center flex-row mt-6">
              <Button 
                type="submit"
                className="w-full px-4 py-2 rounded border-none outline-none transition-all duration-400 bg-[#252525] text-white hover:bg-black hover:text-white"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
            
            <p className="mt-4 text-center text-sm text-gray-400">
              Remember your password?{" "}
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:underline"
              >
                Back to login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
