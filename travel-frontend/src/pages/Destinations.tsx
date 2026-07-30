import { useState } from "react";
import DestinationCard from "@/components/DestinationCard";
import { destinations, categories } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
            Explore Destinations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing places around the world and start planning your next adventure
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 space-y-6 animate-fade-in-up">
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-border focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "gradient-primary shadow-glow"
                    : "hover:border-primary"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div key={destination.id} style={{ animationDelay: `${index * 100}ms` }}>
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-2xl text-muted-foreground">
              No destinations found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
