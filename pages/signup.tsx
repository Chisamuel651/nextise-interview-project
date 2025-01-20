import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("")
  const router = useRouter()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")

    try {
      const response = await fetch("/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if(response.ok){
        localStorage.setItem('token', data.token);
        router.push('/');
      }else {
        toast({
          title: "Error",
          description: "Failed to sign up",
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'An error occured',
        description: 'An error occured during signup',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="email"
              className='text-sm'
            >
              Username or Email:
            </Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="text-sm"
            >
              Password:
            </Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <span className='mt-5 text-sm pt-4'>Have an account ? <Link className='text-blue-500' href='/login'>Login</Link></span>
      </div>
    </div>
  );
}
