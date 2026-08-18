import React, { useState, useEffect } from "react";
import {
  Search,
  FileText,
  MapPin,
  Calendar,
  Eye,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Complaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Fetch real complaints from backend API
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setComplaints(response.data.complaints);
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusStyle = (status) => {
    if (status === "PENDING" || status === "SUBMITTED" || status === "UNDER_REVIEW") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
    if (status === "IN_PROGRESS") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    return "bg-green-50 text-green-700 border-green-200";
  };

  // Filter complaints based on search query and status dropdown
  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch =
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      item.status.toUpperCase() === statusFilter.toUpperCase() ||
      (statusFilter === "Pending" && (item.status === "SUBMITTED" || item.status === "UNDER_REVIEW")) ||
      (statusFilter === "In Progress" && item.status === "IN_PROGRESS") ||
      (statusFilter === "Resolved" && item.status === "RESOLVED");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          My Complaints
        </h1>
        <p className="mt-2 text-slate-500">
          Track and manage all your reported complaints.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints or ticket ID..."
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium text-slate-700"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading complaints...</div>
        ) : filteredComplaints.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <FileText className="mx-auto text-slate-300 mb-3" size={40} />
            <p className="text-slate-700 font-bold text-lg">No complaints found</p>
            <p className="text-slate-400 text-sm mt-1">You haven't reported any issues matching your search or filter.</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                
                {/* Left */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {complaint.category}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Ticket: {complaint.ticketId}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={15} />
                        {complaint.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={15} />
                        {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>

                  <button
                    onClick={() => navigate(`/citizen/complaints/${complaint._id}`)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer transition shadow-sm"
                  >
                    <Eye size={17} />
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Complaints;