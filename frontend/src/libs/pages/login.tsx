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

import { EyeClosedIcon, EyeIcon, LockIcon, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/useRedux";
import { setAuthState } from "../store/reducers/authSlice";

function Login() {
  const [email, setEmail] = useState("satyam@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUserLogin = async () => {
    try {
      setLoading(true);
      const data = await loginUser({ email, password });

      if (data.success) {
        toast.success("Login successfull!");
        dispatch(
          setAuthState({
            userId: data?.user?.id,
            email: data?.user?.email,
            token: data?.accessToken,
          })
        );

        navigate("/my-calendar");
      }
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    handleUserLogin();
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

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Forgot?
                  </button>
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
                    onClick={() => setShowPassword(!showPassword)}
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
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          By signing in, you agree to our{" "}
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

export default Login;
