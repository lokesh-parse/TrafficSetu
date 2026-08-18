import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaint details from Render backend
  useEffect(() => {
    const fetchComplaintDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://trafficsetu.onrender.com/api/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setComplaint(response.data.complaint);
        }
      } catch (err) {
        console.error("Error fetching complaint:", err);
        setError("Failed to load complaint details");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintDetails();
  }, [id]);

  // Handle status update (In Progress / Resolved)
  const handleStatusUpdate = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `https://trafficsetu.onrender.com/api/complaints/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert(`Complaint status updated to ${newStatus} successfully!`);
        setComplaint(response.data.complaint); // Update UI state instantly
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Error updating complaint status");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-600">Loading complaint details...</div>;
  }

  if (error || !complaint) {
    return <div className="p-8 text-center text-red-600">{error || "Complaint not found"}</div>;
  }

  const getPriorityStyle = () => {
    if (complaint.priority === "High" || complaint.priority === "Critical") {
      return "bg-red-50 text-red-700 border-red-200";
    }
    if (complaint.priority === "Medium") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
    return "bg-green-50 text-green-700 border-green-200";
  };

  const getStatusStyle = () => {
    if (complaint.status === "RESOLVED") {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (complaint.status === "IN_PROGRESS") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/authority/dashboard")}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 transition"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="text-blue-600" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{complaint.category}</h1>
              <p className="text-sm text-slate-500 mt-1">Ticket ID: {complaint.ticketId}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityStyle()}`}>
              {complaint.priority} Priority
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle()}`}>
              {complaint.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaint Information */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Complaint Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <MapPin className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium text-slate-900 mt-1">{complaint.location}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Calendar className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate-500">Reported Date</p>
                <p className="font-medium text-slate-900 mt-1">
                  {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Description</p>
            <p className="text-slate-700 leading-7">{complaint.description}</p>
          </div>
        </div>

        {/* Citizen Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Citizen Information</h2>

          <div className="space-y-5">
            <div className="flex gap-3">
              <User className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-slate-500">Citizen ID / Ref</p>
                <p className="font-medium text-slate-900 mt-1">{complaint.citizen}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Supporting Evidence</h2>
        <p className="text-sm text-slate-500 mb-5">Photos or documents submitted by the citizen.</p>

        {complaint.evidence ? (
          <div className="border border-slate-200 rounded-xl p-4">
            <a
              href={`https://trafficsetu.onrender.com/${complaint.evidence}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline flex items-center gap-2"
            >
              <FileText size={18} /> View Uploaded Evidence File
            </a>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
            <FileText className="mx-auto text-slate-400 mb-3" size={32} />
            <p className="font-medium text-slate-700">No evidence uploaded</p>
          </div>
        )}
      </div>

      {/* Authority Actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">Authority Actions</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleStatusUpdate("IN_PROGRESS")}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm"
          >
            Mark In Progress
          </button>

          <button
            onClick={() => handleStatusUpdate("RESOLVED")}
            className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-sm"
          >
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;