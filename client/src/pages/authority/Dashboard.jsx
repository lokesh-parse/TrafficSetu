import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FileText,
  Clock,
  LoaderCircle,
  CheckCircle,
  AlertTriangle,
  MapPin,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch all complaints from backend for authority view
        const res = await axios.get("http://localhost:5000/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setComplaints(res.data.complaints);
        }
      } catch (err) {
        console.error("Authority dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllComplaints();
  }, []);

  const stats = [
    {
      title: "Total Complaints",
      value: complaints.length,
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending / Review",
      value: complaints.filter((item) => item.status === "SUBMITTED" || item.status === "UNDER_REVIEW").length,
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "In Progress",
      value: complaints.filter((item) => item.status === "ASSIGNED" || item.status === "IN_PROGRESS").length,
      icon: LoaderCircle,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Resolved",
      value: complaints.filter((item) => item.status === "RESOLVED").length,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const getPriorityStyle = (priority) => {
    if (priority === "Critical" || priority === "High") return "bg-red-50 text-red-700 border-red-200";
    if (priority === "Medium") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-green-50 text-green-700 border-green-200";
  };

  const getStatusStyle = (status) => {
    if (status === "SUBMITTED" || status === "UNDER_REVIEW") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (status === "ASSIGNED" || status === "IN_PROGRESS") return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-green-50 text-green-700 border-green-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoaderCircle className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Authority Dashboard</h1>
            <p className="mt-2 text-slate-600">Monitor and manage citizen traffic complaints in real-time.</p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="font-bold text-blue-600">A</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Traffic Police Dept</p>
              <p className="text-xs text-slate-500">Nagpur Division</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <h2 className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</h2>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                    <Icon size={24} className={stat.iconColor} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complaints Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">All Citizen Complaints</h2>
            <p className="text-sm text-slate-500 mt-1">Live queue of reported traffic and public safety issues.</p>
          </div>

          {complaints.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No complaints registered in the system yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Ticket & Category</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Location</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Priority</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint._id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{complaint.category}</p>
                        <p className="text-xs text-slate-500 mt-1">{complaint.ticketId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin size={15} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate max-w-xs">{complaint.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getPriorityStyle(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => navigate(`/authority/complaints/${complaint._id}`)}
                          className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;