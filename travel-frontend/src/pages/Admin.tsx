import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "@/lib/config";
import {
  Plane, Users, MapPin, CalendarCheck, TrendingUp,
  DollarSign, LogOut, Trash2, RefreshCw, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Booking {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  travelers: string;
  startDate: string;
  endDate: string;
  specialRequests: string;
  destinationId: number;
  destinationName: string;
  userId: number;
  username: string;
}

interface AppUser {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

interface ContactMsg {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Admin = () => {
  const { user, token, logout, isAdmin } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "users" | "contacts">("bookings");

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/booking`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    if (!isAdmin || !token) return;
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchBookings(), fetchUsers(), fetchContacts()]);
      setLoading(false);
    };
    load();
  }, [isAdmin, token, fetchBookings, fetchUsers, fetchContacts]);

  const handleDeleteBooking = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/booking/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== id));
        toast.success("Booking deleted");
      }
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
        toast.success("User deleted");
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setContacts(contacts.filter((c) => c.id !== id));
        toast.success("Contact message deleted");
      }
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You need admin privileges to view this page.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Bookings", value: String(bookings.length), icon: CalendarCheck, trend: "+12.5%", color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Registered Users", value: String(users.length), icon: Users, trend: "+8.2%", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Destinations", value: "6", icon: MapPin, trend: "Active", color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Revenue", value: "$128.4K", icon: DollarSign, trend: "+23.1%", color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const statusColors: Record<string, string> = {
    Confirmed: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
    Cancelled: "bg-red-500/10 text-red-600",
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome, <span className="font-medium text-foreground">{user.fullName}</span>
              <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">Admin</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { fetchBookings(); fetchUsers(); fetchContacts(); toast.success("Data refreshed"); }}>
              <RefreshCw className="h-4 w-4 mr-1.5" /> Refresh
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend.startsWith("+") ? "text-emerald-600 bg-emerald-500/10" : "text-blue-600 bg-blue-500/10"}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-card rounded-xl p-1 border border-border shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "bookings" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CalendarCheck className="h-4 w-4 inline mr-1.5" />
            Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "users" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4 inline mr-1.5" />
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "contacts" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-4 w-4 inline mr-1.5" />
            Contacts ({contacts.length})
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <Card className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Customer</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Username</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden lg:table-cell">Destination</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Travelers</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => (
                      <tr key={b.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono text-primary font-medium">BK-{b.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <span className="text-sm font-medium">{b.fullName}</span>
                            <p className="text-xs text-muted-foreground">{b.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm hidden md:table-cell">{b.username || "-"}</td>
                        <td className="px-4 py-3 text-sm hidden lg:table-cell">{b.destinationName || `Dest #${b.destinationId}`}</td>
                        <td className="px-4 py-3 text-sm hidden sm:table-cell">{b.startDate} → {b.endDate}</td>
                        <td className="px-4 py-3 text-sm">{b.travelers}</td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteBooking(b.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Full Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Username</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden sm:table-cell">Phone</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{u.id}</td>
                        <td className="px-4 py-3 text-sm font-medium">{u.fullName}</td>
                        <td className="px-4 py-3 text-sm">{u.username}</td>
                        <td className="px-4 py-3 text-sm hidden md:table-cell">{u.email}</td>
                        <td className="px-4 py-3 text-sm hidden sm:table-cell">{u.phone || "-"}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            u.role === "ADMIN" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {u.id !== user?.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteUser(u.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <Card className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Subject</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase hidden lg:table-cell">Message</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No contact messages found
                      </td>
                    </tr>
                  ) : (
                    contacts.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{c.id}</td>
                        <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-sm hidden md:table-cell">{c.email}</td>
                        <td className="px-4 py-3 text-sm">{c.subject}</td>
                        <td className="px-4 py-3 text-sm hidden lg:table-cell max-w-xs truncate">{c.message}</td>
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteContact(c.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
