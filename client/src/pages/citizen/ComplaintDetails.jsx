import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // Updated to use Render live backend URL
        const res = await axios.get(`https://trafficsetu.onrender.com/api/complaints/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setComplaint(res.data.complaint);
        }
      } catch (err) {
        console.error("Failed to fetch complaint details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoaderCircle className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // If complaint not found or error occurred
  if (error || !complaint) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <button
          onClick={() => navigate("/citizen/dashboard")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
          <FileText size={48} className="mx-auto text-slate-400 mb-4" />
          <h1 className="text-2xl font-bold text-slate-900">Complaint Not Found</h1>
          <p className="text-slate-500 mt-2">The complaint you're looking for does not exist or failed to load.</p>
          <button
            onClick={() => navigate("/citizen/dashboard")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    if (status === "SUBMITTED" || status === "UNDER_REVIEW") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (status === "ASSIGNED" || status === "IN_PROGRESS") return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-green-50 text-green-700 border-green-200";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Back */}
      <button
        onClick={() => navigate("/citizen/dashboard")}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 font-medium"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="text-blue-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{complaint.category}</h1>
              <p className="text-sm text-slate-500 mt-1">Ticket ID: {complaint.ticketId}</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle(complaint.status)}`}>
            {complaint.status}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaint Information */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Complaint Information</h2>
          <div className="space-y-5">
            {/* Location */}
            <div className="flex gap-3">
              <MapPin className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium text-slate-900">{complaint.location}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex gap-3">
              <Calendar className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate-500">Reported Date</p>
                <p className="font-medium text-slate-900">
                  {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Priority */}
            <div className="flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate-500">Priority</p>
                <p className="font-medium text-slate-900 capitalize">{complaint.priority}</p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-2">Description</p>
              <p className="text-slate-700 leading-7">{complaint.description}</p>
            </div>

            {/* Supporting Evidence Image if available */}
            {complaint.evidence && (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-2">Supporting Evidence</p>
                <img 
                  src={complaint.evidence} 
                  alt="Complaint Evidence" 
                  className="w-full max-h-80 object-cover rounded-xl border border-slate-200 shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Status Tracker */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Complaint Status</h2>
          <div className="space-y-6">
            <div className="flex gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-slate-900">Complaint Submitted</p>
                <p className="text-sm text-slate-500 mt-1">Successfully registered in database.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold text-slate-900">Current State: {complaint.status}</p>
                <p className="text-sm text-slate-500 mt-1">Authorities are processing this ticket.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;