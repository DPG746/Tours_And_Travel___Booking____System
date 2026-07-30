import { Link } from "react-router-dom";
import { Plane, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 gradient-primary rounded-lg shadow-glow">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">TravelWise</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in creating unforgettable travel experiences around the world.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Facebook className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Instagram className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Twitter className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Flight Booking</li>
              <li className="text-sm text-muted-foreground">Hotel Reservation</li>
              <li className="text-sm text-muted-foreground">Tour Packages</li>
              <li className="text-sm text-muted-foreground">Travel Insurance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Travel Street, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@travelwise.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TravelWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
