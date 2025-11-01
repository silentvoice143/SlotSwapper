import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/libs/components/ui/card";
import { Input } from "@/libs/components/ui/input";
import { Button } from "@/libs/components/ui/button";
import { Label } from "@/libs/components/ui/label";

import {
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  Mail,
  PersonStanding,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { toast } from "sonner";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      setError("");
      console.log(error);

      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      const data = await registerUser({ name, email, password });
      if (data.success) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      setError((err as any)?.message || (err as any) || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SlotSwapper</h1>
          <p className="text-gray-600 mt-2">Swap your schedule with ease</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to SlotSwapper
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <PersonStanding
                    className="absolute top-2.5 left-3"
                    size={16}
                  />
                  <Input
                    id="name"
                    type="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute top-2.5 left-3" size={16} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <LockIcon className="absolute top-2.5 left-3" size={16} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    className="absolute right-3 top-3 "
                  >
                    {showPassword ? (
                      <EyeIcon size={16} />
                    ) : (
                      <EyeClosedIcon size={16} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          By signing up, you agree to our{" "}
          <button className="text-blue-600 hover:text-blue-700">Terms</button>{" "}
          and{" "}
          <button className="text-blue-600 hover:text-blue-700">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
