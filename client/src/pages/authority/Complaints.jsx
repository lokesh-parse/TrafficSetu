import {
  Search,
  FileText,
  MapPin,
  Calendar,
  Eye,
  Filter,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Complaints() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const complaints = [
    {
      id: "TS-2026-001",
      type: "Illegal Parking",
      location: "Civil Lines, Nagpur",
      date: "17 Aug 2026",
      priority: "High",
      status: "Pending",
    },
    {
      id: "TS-2026-002",
      type: "Traffic Jam",
      location: "Wardha Road, Nagpur",
      date: "17 Aug 2026",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: "TS-2026-003",
      type: "Road Accident",
      location: "Manish Nagar, Nagpur",
      date: "17 Aug 2026",
      priority: "High",
      status: "Resolved",
    },
    {
      id: "TS-2026-004",
      type: "Road Damage",
      location: "Sadar, Nagpur",
      date: "16 Aug 2026",
      priority: "Medium",
      status: "Pending",
    },
  ];

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        complaint.id.toLowerCase().includes(search.toLowerCase()) ||
        complaint.type.toLowerCase().includes(search.toLowerCase()) ||
        complaint.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-green-50 text-green-700 border-green-200";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (priority === "Medium") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return "bg-green-50 text-green-700 border-green-200";
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Complaints
        </h1>

        <p className="mt-2 text-slate-500">
          Review and manage complaints submitted by citizens.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Total Complaints
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {complaints.length}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {complaints.filter((c) => c.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {
              complaints.filter(
                (c) => c.status === "In Progress"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Resolved
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {complaints.filter((c) => c.status === "Resolved").length}
          </h2>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">

        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-slate-600" />

          <h2 className="font-semibold text-slate-900">
            Search & Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search complaint, ticket or location..."
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>
      </div>

      {/* Complaints */}
      <div className="space-y-4">

        {filteredComplaints.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">

            <FileText
              size={40}
              className="mx-auto text-slate-300 mb-3"
            />

            <h3 className="text-lg font-semibold text-slate-900">
              No complaints found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Try changing your search or filters.
            </p>

          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                {/* Complaint Info */}
                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText
                      size={22}
                      className="text-blue-600"
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-slate-900">
                      {complaint.type}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Ticket: {complaint.id}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-3 text-sm text-slate-500">

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

                {/* Right Side */}
                <div className="flex flex-wrap items-center gap-3">

                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getPriorityStyle(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority}
                  </span>

                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/authority/complaints/${complaint.id}`
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <Eye size={17} />
                    View
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