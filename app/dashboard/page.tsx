"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Define user type for TypeScript type safety
interface User {
  id: string;
  email: string;
  name?: string;  // Optional field
  createdAt?: string;  // Optional field
}

export default function DashboardPage() {
  // State management for user data and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Function to check if user is authenticated
    async function checkAuth() {
      try {
        // Fetch current user from session endpoint
        const response = await fetch('/api/auth/session');
        
        if (!response.ok) {
          // If not authenticated, redirect to login page
          router.push('/login');
          return;
        }
        
        // Parse and store user data if authenticated
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        // Handle any errors during authentication check
        console.error("Failed to check authentication:", error);
        router.push('/login');
      } finally {
        // Set loading to false regardless of outcome
        setLoading(false);
      }
    }
    
    // Call the authentication check function when component mounts
    checkAuth();
  }, [router]); // Re-run if router changes
  
  // Handler for user logout
  const handleLogout = async () => {
    try {
      // Call logout endpoint
      await fetch('/api/auth/logout', { method: 'POST' });
      // Redirect to login page after successful logout
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header section with title and logout button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      
      {/* User information card */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
        {user ? (
          // Display user information if available
          <div>
            <p>Email: {user.email}</p>
            <p>Name: {user.name || 'Not provided'}</p>
          </div>
        ) : (
          // Fallback message if user data is still loading
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
}
