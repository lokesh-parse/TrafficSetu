import {
  MapPin,
  AlertTriangle,
  Clock,
  CheckCircle,
  Navigation,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Map() {
  const navigate = useNavigate();
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const complaints = [
    {
      id: "TS-2026-001",
      type: "Illegal Parking",
      location: "Civil Lines, Nagpur",
      priority: "High",
      status: "Pending",
      top: "30%",
      left: "42%",
    },
    {
      id: "TS-2026-002",
      type: "Traffic Jam",
      location: "Wardha Road, Nagpur",
      priority: "Medium",
      status: "In Progress",
      top: "55%",
      left: "65%",
    },
    {
      id: "TS-2026-003",
      type: "Road Accident",
      location: "Manish Nagar, Nagpur",
      priority: "High",
      status: "Resolved",
      top: "70%",
      left: "35%",
    },
    {
      id: "TS-2026-004",
      type: "Road Damage",
      location: "Sadar, Nagpur",
      priority: "Medium",
      status: "Pending",
      top: "40%",
      left: "72%",
    },
  ];

  const getMarkerStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-600 ring-red-200";
    }

    if (priority === "Medium") {
      return "bg-yellow-500 ring-yellow-200";
    }

    return "bg-green-600 ring-green-200";
  };

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
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Traffic Map
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor reported traffic and public safety issues across Nagpur.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />

          <span className="text-sm font-medium text-green-700">
            Live Monitoring
          </span>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle
                size={20}
                className="text-red-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                High Priority
              </p>

              <p className="text-2xl font-bold text-slate-900">
                2
              </p>
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Clock
                size={20}
                className="text-yellow-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <p className="text-2xl font-bold text-slate-900">
                2
              </p>
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Navigation
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <p className="text-2xl font-bold text-slate-900">
                1
              </p>
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle
                size={20}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <p className="text-2xl font-bold text-slate-900">
                1
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Main Map Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h2 className="font-bold text-slate-900">
                Nagpur Issue Map
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Reported incidents and complaints
              </p>
            </div>

            <button
              onClick={() => setSelectedComplaint(null)}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              <Navigation size={15} />
              Reset
            </button>

          </div>

          {/* Map Simulation */}
          <div className="relative h-[550px] overflow-hidden bg-slate-100">

            {/* Map Grid */}
            <div className="absolute inset-0 opacity-40">

              <div className="absolute left-[10%] top-0 bottom-0 w-3 bg-white rotate-[12deg]" />

              <div className="absolute left-[35%] top-0 bottom-0 w-4 bg-white rotate-[-18deg]" />

              <div className="absolute left-[65%] top-0 bottom-0 w-3 bg-white rotate-[8deg]" />

              <div className="absolute top-[25%] left-0 right-0 h-4 bg-white rotate-[8deg]" />

              <div className="absolute top-[52%] left-0 right-0 h-5 bg-white rotate-[-10deg]" />

              <div className="absolute top-[78%] left-0 right-0 h-4 bg-white rotate-[5deg]" />

            </div>

            {/* Map Labels */}
            <div className="absolute top-8 left-8 text-xs font-semibold text-slate-500">
              CIVIL LINES
            </div>

            <div className="absolute top-24 right-10 text-xs font-semibold text-slate-500">
              Sadar
            </div>

            <div className="absolute bottom-32 left-10 text-xs font-semibold text-slate-500">
              MANISH NAGAR
            </div>

            <div className="absolute bottom-20 right-12 text-xs font-semibold text-slate-500">
              WARDHA ROAD
            </div>

            {/* Nagpur Center */}
            <div className="absolute top-[45%] left-[48%] text-xs font-bold text-slate-400">
              NAGPUR
            </div>

            {/* Complaint Markers */}
            {complaints.map((complaint) => (
              <button
                key={complaint.id}
                onClick={() => setSelectedComplaint(complaint)}
                style={{
                  top: complaint.top,
                  left: complaint.left,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${getMarkerStyle(
                  complaint.priority
                )} ring-8 flex items-center justify-center shadow-lg hover:scale-125 transition`}
                title={complaint.type}
              >
                <MapPin
                  size={17}
                  className="text-white"
                />
              </button>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-5 left-5 bg-white rounded-xl border border-slate-200 shadow-sm p-4">

              <p className="text-sm font-semibold text-slate-900 mb-3">
                Priority
              </p>

              <div className="space-y-2 text-xs">

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-600" />
                  High Priority
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  Medium Priority
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-600" />
                  Low Priority
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-slate-200">

            <h2 className="font-bold text-slate-900">
              Reported Issues
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Click a complaint to view its location.
            </p>

          </div>

          <div className="divide-y divide-slate-100">

            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className={`p-4 transition ${
                  selectedComplaint?.id === complaint.id
                    ? "bg-blue-50"
                    : "hover:bg-slate-50"
                }`}
              >

                <div className="flex gap-3">

                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      complaint.priority === "High"
                        ? "bg-red-50"
                        : complaint.priority === "Medium"
                        ? "bg-yellow-50"
                        : "bg-green-50"
                    }`}
                  >
                    <MapPin
                      size={18}
                      className={
                        complaint.priority === "High"
                          ? "text-red-600"
                          : complaint.priority === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    />
                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-2">

                      <div>
                        <h3 className="font-semibold text-sm text-slate-900">
                          {complaint.type}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1">
                          {complaint.id}
                        </p>
                      </div>

                      <span
                        className={`px-2 py-1 rounded-full text-[11px] font-medium border ${getStatusStyle(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>

                    </div>

                    <p className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                      <MapPin size={13} />
                      {complaint.location}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedComplaint(complaint);
                      }}
                      className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <Eye size={14} />
                      Locate on Map
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Selected Complaint */}
          {selectedComplaint && (
            <div className="border-t border-slate-200 p-5 bg-slate-50">

              <p className="text-xs font-semibold text-slate-500 uppercase">
                Selected Complaint
              </p>

              <h3 className="font-bold text-slate-900 mt-1">
                {selectedComplaint.type}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {selectedComplaint.location}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/authority/complaints/${selectedComplaint.id}`
                  )
                }
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
              >
                <Eye size={16} />
                View Complaint
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Map;