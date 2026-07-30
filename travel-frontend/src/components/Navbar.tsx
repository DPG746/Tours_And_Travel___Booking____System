import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Plane, User, LogOut, LayoutDashboard, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 gradient-primary rounded-lg shadow-glow group-hover:scale-110 transition-transform">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">TravelWise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/my-bookings">
                    <ListChecks className="h-4 w-4 mr-1.5" />
                    My Bookings
                  </Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/admin">
                      <LayoutDashboard className="h-4 w-4 mr-1.5" />
                      Admin
                    </Link>
                  </Button>
                )}
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{user?.fullName || user?.username}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">
                    <User className="h-4 w-4 mr-1.5" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="gradient-primary shadow-glow hover:shadow-glow-accent transition-all">
                  <Link to="/destinations">Book Now</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-border my-1" />

              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-foreground/70">
                    <User className="h-4 w-4 text-primary" />
                    <span>{user?.fullName || user?.username}</span>
                  </div>
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted transition-colors flex items-center"
                  >
                    <ListChecks className="h-4 w-4 mr-2" />
                    My Bookings
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors flex items-center"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors flex items-center text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted transition-colors flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted transition-colors flex items-center"
                  >
                    Create Account
                  </Link>
                  <Button asChild className="gradient-primary shadow-glow">
                    <Link to="/destinations" onClick={() => setIsOpen(false)}>
                      Book Now
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
