"use client";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Basic validation function
  const validateForm = () => {
    setError("");
    
    if (!name || name.trim() === "") {
      setError("Please enter your name");
      return false;
    }
    
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    return true;
  };

  async function handleSignUp() {
    if (!validateForm()) return;
  
    try {
      setLoading(true);
      setError("");
      
      console.log("Attempting direct sign-up with validated inputs");
      
      // Use our custom direct signup endpoint
      const response = await fetch('/api/auth/direct-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Signup error:', responseData);
        setError(responseData.error || 'Failed to sign up');
        setLoading(false);
        return;
      }
      
      console.log('Signup success:', responseData);
      
      // After successful signup, redirect to login
      alert('Account created successfully! Please log in.');
      router.push("/login");
    } catch (err) {
      console.error("Signup exception:", err);
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <Input 
        placeholder="Full Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="mb-2"
      />
      <Input
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="mb-2"
      />
      <Input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <p className="text-sm text-gray-500 mt-1 mb-4">Password must be at least 8 characters</p>
      <Button 
        className="mt-4 w-full" 
        onClick={handleSignUp}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </div>
  );
}

