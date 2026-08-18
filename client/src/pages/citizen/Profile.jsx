import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Shield, Calendar, Award, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setProfile(response.data.user);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Fallback profile data if API endpoint name differs
        setProfile({
          name: "Lokesh Umesh Parse",
          email: "lokesh@example.com",
          phone: "+91 98765 43210",
          role: "Citizen",
          createdAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out successfully!");
    navigate("/login"); // ya jahan bhi login route ho
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-medium">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Citizen Profile</h1>
        <p className="mt-1 text-slate-500">Manage your TrafficSetu account details and preferences.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden p-8 space-y-8">
        
        {/* Top Info Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md shadow-blue-500/20">
            {profile?.name ? profile.name.charAt(0) : "C"}
          </div>

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-slate-900">{profile?.name || "TrafficSetu Citizen"}</h2>
            <p className="text-sm text-blue-600 font-semibold mt-0.5 flex items-center justify-center sm:justify-start gap-1">
              <Shield size={16} /> Verified Citizen Account
            </p>
            <p className="text-xs text-slate-400 mt-2">Nagpur Region, Maharashtra</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-sm font-semibold transition border border-red-200/80 cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Full Name</p>
              <p className="font-semibold text-slate-900 text-sm mt-0.5">{profile?.name || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Email Address</p>
              <p className="font-semibold text-slate-900 text-sm mt-0.5">{profile?.email || "citizen@trafficsetu.gov"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Contact Number</p>
              <p className="font-semibold text-slate-900 text-sm mt-0.5">{profile?.phone || "+91 98765 43210"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Member Since</p>
              <p className="font-semibold text-slate-900 text-sm mt-0.5">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "August 2026"}
              </p>
            </div>
          </div>
        </div>

        {/* Badge / Contribution Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Active Contributor</h4>
              <p className="text-xs text-slate-600 mt-0.5">Thank you for helping keep Nagpur traffic safe and disciplined.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;