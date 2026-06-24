import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Destination } from "@/data/destinations";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-glow transition-all duration-300 animate-fade-in-up">
      <div className="relative overflow-hidden h-56">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 px-3 py-1 gradient-primary rounded-full text-white text-sm font-semibold shadow-lg">
          ${destination.price}
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {destination.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {destination.country}
            </div>
          </div>
          <div className="flex items-center space-x-1 bg-accent/10 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{destination.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {destination.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {destination.duration}
          </div>
          <Button asChild size="sm" className="gradient-sunset shadow-glow-accent hover:shadow-lg">
            <Link to={`/booking/${destination.id}`}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DestinationCard;
