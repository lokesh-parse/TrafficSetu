import {
  FileText,
  Clock,
  LoaderCircle,
  CheckCircle,
  AlertTriangle,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

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

  const stats = [
    {
      title: "Total Complaints",
      value: complaints.length,
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending",
      value: complaints.filter(
        (item) => item.status === "Pending"
      ).length,
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "In Progress",
      value: complaints.filter(
        (item) => item.status === "In Progress"
      ).length,
      icon: LoaderCircle,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Resolved",
      value: complaints.filter(
        (item) => item.status === "Resolved"
      ).length,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (priority === "Medium") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return "bg-green-50 text-green-700 border-green-200";
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Authority Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Monitor and manage citizen traffic complaints.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="font-bold text-blue-600">
                A
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Authority Officer
              </p>

              <p className="text-xs text-slate-500">
                Traffic Department
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white border border-slate-200 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}
                  >
                    <Icon
                      size={24}
                      className={stat.iconColor}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High Priority Alert */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle
                  size={21}
                  className="text-red-600"
                />
              </div>

              <div>
                <h3 className="font-semibold text-red-900">
                  High Priority Complaints
                </h3>

                <p className="text-sm text-red-700 mt-1">
                  {
                    complaints.filter(
                      (item) => item.priority === "High"
                    ).length
                  }{" "}
                  high priority complaints require attention.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/authority/complaints")}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium"
            >
              Review Complaints
              <ArrowRight size={17} />
            </button>

          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-slate-200">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Complaints
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Latest complaints submitted by citizens.
              </p>
            </div>

            <button
              onClick={() => navigate("/authority/complaints")}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All
              <ArrowRight size={16} />
            </button>

          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">

              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    Complaint
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    Location
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    Priority
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {complaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {complaint.type}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {complaint.id}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={15} />
                        {complaint.location}
                      </div>

                      <p className="text-xs text-slate-400 mt-1">
                        {complaint.date}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getPriorityStyle(
                          complaint.priority
                        )}`}
                      >
                        {complaint.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(
                            `/authority/complaints/${complaint.id}`
                          )
                        }
                        className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {complaint.type}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      {complaint.id}
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityStyle(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority}
                  </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 mt-3">
                  <MapPin size={15} />
                  {complaint.location}
                </div>

                <div className="flex items-center justify-between mt-4">

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(
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
                    className="text-sm font-medium text-blue-600"
                  >
                    View Details
                  </button>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;