import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Calendar, Users, Mail, Phone, User, CreditCard, MapPin } from "lucide-react";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((d) => d.id === Number(id));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "2",
    startDate: "",
    endDate: "",
    specialRequests: "",
  });

  if (!destination) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Destination Not Found</h1>
          <Button onClick={() => navigate("/destinations")} className="gradient-primary">
            Browse Destinations
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation check before sending
  const start = new Date(formData.startDate);
  const end = new Date(formData.endDate);
  if (start >= end) {
    toast.error("Invalid Dates", {
      description: "Start date must be earlier than end date.",
    });
    return;
  }

  try {
    const response = await fetch("http://localhost:7070/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("Booking Confirmed!", {
        description: `Your trip to ${destination.name} has been confirmed.`,
      });
      setTimeout(() => navigate("/"), 2000);
    } else {
      toast.error("Booking failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error");
  }
};


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = destination.price * Number(formData.travelers);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Complete Your Booking
          </h1>
          <p className="text-xl text-muted-foreground">
            You're one step away from an amazing adventure!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 animate-fade-in-up shadow-glow">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Traveler Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Please provide your details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelers" className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      Number of Travelers
                    </Label>
                    <Input
                      id="travelers"
                      name="travelers"
                      type="number"
                      min="1"
                      value={formData.travelers}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                       min={new Date().toISOString().split("T")[0]} 
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      min={formData.startDate || new Date().toISOString().split("T")[0]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requirements or requests..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-sunset shadow-glow-accent hover:shadow-lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Confirm Booking
                </Button>
              </form>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 animate-fade-in-up shadow-glow">
              <h3 className="text-2xl font-semibold mb-6">Booking Summary</h3>

              <div className="space-y-4">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div>
                  <h4 className="text-xl font-semibold">{destination.name}</h4>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {destination.country}
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{destination.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price per person</span>
                    <span className="font-medium">${destination.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travelers</span>
                    <span className="font-medium">{formData.travelers}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-semibold">What's Included:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>✓ Round-trip flights</li>
                    <li>✓ Accommodation</li>
                    <li>✓ Daily breakfast</li>
                    <li>✓ Travel insurance</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
