import { useState } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/destinations");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-glow p-6 w-full max-w-5xl mx-auto animate-fade-in-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 border-border focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Travel Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 border-border focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* People */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground/70 mb-2">
            Travelers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              type="number"
              placeholder="2"
              min="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="pl-10 border-border focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            className="w-full gradient-sunset shadow-glow-accent hover:shadow-lg transition-all"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
