import { Star, Award, HeadphonesIcon, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";

const Home = () => {
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/hero-beach.jpg)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in-up">
            Discover Your Next
            <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Explore breathtaking destinations and create unforgettable memories
          </p>
          <div className="pt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Best Price Guarantee",
                desc: "Find the best deals on flights and hotels",
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                desc: "Your data is protected with top security",
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                desc: "We're here to help anytime you need",
              },
              {
                icon: Star,
                title: "Trusted by Millions",
                desc: "Join our community of happy travelers",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-xl hover:bg-white hover:shadow-glow transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-4 gradient-primary rounded-full shadow-glow">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              Popular Destinations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked destinations that offer the best travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredDestinations.map((destination, index) => (
              <div key={destination.id} style={{ animationDelay: `${index * 100}ms` }}>
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="gradient-primary shadow-glow hover:shadow-lg">
              <Link to="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from real adventurers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                review:
                  "TravelWise made our honeymoon in Santorini absolutely perfect. Every detail was taken care of!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                location: "Singapore",
                review:
                  "Amazing service and great prices. I've booked three trips through TravelWise and never been disappointed.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                location: "London, UK",
                review:
                  "The customer support is outstanding. They helped us every step of the way during our Bali adventure.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-glow hover:shadow-xl transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.review}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
