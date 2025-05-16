
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeToggle from '@/components/ThemeToggle';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      toast.success("Login successful!");
      navigate('/');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    const success = await signup(signupEmail, signupPassword);
    if (success) {
      // Clear form fields after successful signup
      setSignupEmail('');
      setSignupPassword('');
      setSignupConfirmPassword('');
      setActiveTab('login');
      toast.success("Account created! Please log in.");
    }
  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: 'url(/lovable-uploads/66833b1e-908b-4859-b2d0-db24fbc358dc.png)' }}>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md p-6">
        <Card className="w-full shadow-xl bg-white/95 dark:bg-black/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 items-center text-center">
            <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center rounded mb-2">
              <span className="text-white dark:text-black font-bold text-xl">L</span>
            </div>
            <CardTitle className="text-2xl font-bold">
              {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
            </CardTitle>
            {activeTab === 'login' ? (
              <p className="text-sm text-muted-foreground">
                Please fill in your Email and Password to Sign In.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Enter your details to create a new account.
              </p>
            )}
          </CardHeader>

          <CardContent>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Your Email Address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="login-password" className="text-sm font-medium">
                      Password
                    </label>
                    <button 
                      type="button" 
                      onClick={handleForgotPassword}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="bg-gray-50 dark:bg-gray-900"
                  />
                </div>

                <Button type="submit" className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Sign in
                </Button>
                
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Don't have an Account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign-Up here!
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Your Email Address"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-gray-50 dark:bg-gray-900"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                    className="bg-gray-50 dark:bg-gray-900"
                  />
                </div>

                <Button type="submit" className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  Sign up
                </Button>
                
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Already have an Account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
