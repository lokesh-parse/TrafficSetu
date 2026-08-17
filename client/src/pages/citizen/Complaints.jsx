import {
  Search,
  FileText,
  MapPin,
  Calendar,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Complaints() {
  const navigate = useNavigate(); // Hook initialize kiya

  const complaints = [
    {
      id: "TS-2026-001",
      type: "Illegal Parking",
      location: "Civil Lines, Nagpur",
      date: "16 Aug 2026",
      status: "Pending",
    },
    {
      id: "TS-2026-002",
      type: "Traffic Jam",
      location: "Wardha Road, Nagpur",
      date: "15 Aug 2026",
      status: "In Progress",
    },
    {
      id: "TS-2026-003",
      type: "Road Accident",
      location: "Manish Nagar, Nagpur",
      date: "14 Aug 2026",
      status: "Resolved",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-green-50 text-green-700 border-green-200";
  };

  return (
    // Yaha se CitizenLayout wrapper hata diya, sirf div rakha hai
    <div className="max-w-7xl mx-auto">
      
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
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search complaints or ticket ID..."
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Complaints */}
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              
              {/* Left */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FileText size={22} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {complaint.type}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Ticket: {complaint.id}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {complaint.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={15} />
                      {complaint.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusStyle(
                    complaint.status
                  )}`}
                >
                  {complaint.status}
                </span>

                <button
                  // window.location.href ko hatakar navigate use kiya
                  onClick={() => navigate(`/citizen/complaints/${complaint.id}`)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Eye size={17} />
                  View Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Complaints;