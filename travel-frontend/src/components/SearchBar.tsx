import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { destinations } from "@/data/destinations";

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredDestinations = destination.trim().length > 0
    ? destinations.filter((d) =>
        d.name.toLowerCase().includes(destination.toLowerCase()) ||
        d.country.toLowerCase().includes(destination.toLowerCase())
      )
    : [];

  const showDropdown = destination.trim().length > 0 && filteredDestinations.length > 0;

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-primary font-semibold">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  const handleSelect = (dest: typeof destinations[0]) => {
    setDestination(dest.name);
    setShowSuggestions(false);
    setActiveIndex(-1);
    navigate(`/booking/${dest.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredDestinations.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredDestinations.length - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredDestinations[activeIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim()) {
      const match = destinations.find(
        (d) => d.name.toLowerCase() === destination.toLowerCase()
      );
      if (match) {
        navigate(`/booking/${match.id}`);
      } else {
        navigate("/destinations");
      }
    } else {
      navigate("/destinations");
    }
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
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary z-10" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowSuggestions(true);
                setActiveIndex(-1);
              }}
              onFocus={() => {
                if (destination.trim() && filteredDestinations.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              onKeyDown={handleKeyDown}
              className="pl-10 border-border focus:ring-2 focus:ring-primary"
              autoComplete="off"
            />
          </div>

          {/* Suggestions dropdown */}
          {showDropdown && showSuggestions && (
            <div
              ref={dropdownRef}
              className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-fade-in"
            >
              {filteredDestinations.map((dest, index) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => handleSelect(dest)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors hover:bg-muted/50 ${
                    index === activeIndex ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">
                      {highlightMatch(dest.name, destination)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {highlightMatch(dest.country, destination)}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-xs text-muted-foreground">
                    {dest.duration}
                  </div>
                </button>
              ))}
            </div>
          )}
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
