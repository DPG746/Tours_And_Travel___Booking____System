import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Trash2, Plane } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: number;
  destinationName: string;
  destinationId: number;
  fullName: string;
  email: string;
  phone: string;
  travelers: string;
  startDate: string;
  endDate: string;
  specialRequests: string;
}

const MyBookings = () => {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/booking/my-bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, token]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/booking/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
        toast.success("Booking cancelled successfully");
      }
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient">My Bookings</h1>
          <p className="text-muted-foreground mt-2">
            Welcome, {user?.fullName} — here are your travel bookings
          </p>
        </div>

        {bookings.length === 0 ? (
          <Card className="p-12 text-center animate-fade-in">
            <div className="inline-flex p-4 bg-muted rounded-full mb-4">
              <Plane className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
            <p className="text-muted-foreground mb-6">Start your adventure by booking a destination!</p>
            <Button onClick={() => navigate("/destinations")} className="gradient-primary">
              Browse Destinations
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6 animate-fade-in-up shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-xl font-semibold">{booking.destinationName}</h3>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        Destination ID: {booking.destinationId}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-primary" />
                        {booking.startDate} → {booking.endDate}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1.5 text-primary" />
                        {booking.travelers} traveler(s)
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Booked by: <span className="text-foreground font-medium">{booking.fullName}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Email: <span className="text-foreground">{booking.email}</span>
                      </span>
                      {booking.phone && (
                        <span className="text-muted-foreground">
                          Phone: <span className="text-foreground">{booking.phone}</span>
                        </span>
                      )}
                    </div>

                    {booking.specialRequests && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Special Requests:</span> {booking.specialRequests}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive border-destructive/30 hover:bg-destructive/10"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
