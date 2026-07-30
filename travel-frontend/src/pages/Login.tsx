import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plane, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const result = await login(username.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-muted/50 via-background to-primary/5">
      <div className="w-full max-w-md mx-4">
        <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden">
          <div className="gradient-primary p-8 text-center text-white">
            <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4">
              <Plane className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-white/80 mt-2">Sign in to your TravelWise account</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary shadow-glow h-11 text-base" disabled={loading}>
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary"
              disabled={loading}
              onClick={() => {
                setError("");
                setUsername("admin");
                setPassword("admin123");
              }}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Fill Admin Credentials
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Register here
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="text-primary hover:underline font-medium">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
