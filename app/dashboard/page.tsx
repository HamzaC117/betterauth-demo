"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define user type
interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        // Fetch current user from session
        const response = await fetch('/api/auth/session');
        
        if (!response.ok) {
          // Not authenticated, redirect to login
          router.push('/login');
          return;
        }
        
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error("Failed to check authentication:", error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, [router]);
  
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        {user ? (
          <div>
            <p>Email: {user.email}</p>
            <p>Name: {user.name || 'Not provided'}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
}
