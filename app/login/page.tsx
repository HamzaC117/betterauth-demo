"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");
      
      console.log("Attempting direct login with:", { email });
      
      // Use our custom direct login endpoint
      const response = await fetch('/api/auth/direct-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Login error:', responseData);
        setError(responseData.error || 'Authentication failed');
        return;
      }
      
      console.log('Login successful:', responseData);
      
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Failed to log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <Input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <Input 
        type="password" 
        className="mt-2" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button 
        className="mt-4 w-full" 
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </Button>
    </div>
  );
}
