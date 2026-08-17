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

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const complaint = {
    id: id || "TS-2026-001",
    type: "Illegal Parking",
    location: "Civil Lines, Nagpur",
    date: "17 Aug 2026",
    priority: "High",
    status: "Pending",
    citizen: "Rahul Sharma",
    phone: "+91 98765 43210",
    description:
      "A vehicle is illegally parked on the roadside, causing traffic obstruction and difficulty for other vehicles.",
  };

  const getPriorityStyle = () => {
    if (complaint.priority === "High") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (complaint.priority === "Medium") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return "bg-green-50 text-green-700 border-green-200";
  };

  const getStatusStyle = () => {
    if (complaint.status === "Pending") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    if (complaint.status === "In Progress") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    return "bg-green-50 text-green-700 border-green-200";
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Back Button */}
      <button
        onClick={() => navigate("/authority/complaints")}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 transition"
      >
        <ArrowLeft size={18} />
        Back to Complaints
      </button>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText
                className="text-blue-600"
                size={28}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {complaint.type}
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Ticket ID: {complaint.id}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityStyle()}`}
            >
              {complaint.priority} Priority
            </span>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle()}`}
            >
              {complaint.status}
            </span>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Complaint Information */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Complaint Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Location */}
            <div className="flex gap-3">
              <MapPin
                className="text-blue-600 flex-shrink-0"
                size={20}
              />

              <div>
                <p className="text-sm text-slate-500">
                  Location
                </p>

                <p className="font-medium text-slate-900 mt-1">
                  {complaint.location}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex gap-3">
              <Calendar
                className="text-blue-600 flex-shrink-0"
                size={20}
              />

              <div>
                <p className="text-sm text-slate-500">
                  Reported Date
                </p>

                <p className="font-medium text-slate-900 mt-1">
                  {complaint.date}
                </p>
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="mt-7 pt-6 border-t border-slate-200">

            <p className="text-sm text-slate-500 mb-2">
              Description
            </p>

            <p className="text-slate-700 leading-7">
              {complaint.description}
            </p>

          </div>

        </div>

        {/* Citizen Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Citizen Information
          </h2>

          <div className="space-y-5">

            <div className="flex gap-3">
              <User
                className="text-blue-600 flex-shrink-0"
                size={20}
              />

              <div>
                <p className="text-sm text-slate-500">
                  Citizen
                </p>

                <p className="font-medium text-slate-900 mt-1">
                  {complaint.citizen}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone
                className="text-blue-600 flex-shrink-0"
                size={20}
              />

              <div>
                <p className="text-sm text-slate-500">
                  Contact
                </p>

                <p className="font-medium text-slate-900 mt-1">
                  {complaint.phone}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Complaint Status */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Complaint Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex gap-3">
            <CheckCircle
              className="text-green-600 flex-shrink-0"
              size={22}
            />

            <div>
              <p className="font-semibold text-slate-900">
                Complaint Submitted
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Complaint successfully registered.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Clock
              className="text-yellow-600 flex-shrink-0"
              size={22}
            />

            <div>
              <p className="font-semibold text-slate-900">
                Awaiting Action
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Authority action is pending.
              </p>
            </div>
          </div>

          <div className="flex gap-3 opacity-50">
            <AlertCircle
              className="text-slate-500 flex-shrink-0"
              size={22}
            />

            <div>
              <p className="font-semibold text-slate-900">
                Resolution
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Resolution details will appear here.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Evidence */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Supporting Evidence
        </h2>

        <p className="text-sm text-slate-500 mb-5">
          Photos, videos or other evidence submitted by the citizen.
        </p>

        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">

          <FileText
            className="mx-auto text-slate-400 mb-3"
            size={32}
          />

          <p className="font-medium text-slate-700">
            No evidence uploaded
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Uploaded evidence will appear here.
          </p>

        </div>
      </div>

      {/* Authority Actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-bold text-slate-900 mb-5">
          Authority Actions
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">

          <button
            onClick={() => alert("Complaint marked as In Progress")}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Mark In Progress
          </button>

          <button
            onClick={() => alert("Complaint marked as Resolved")}
            className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
          >
            Mark Resolved
          </button>

        </div>
      </div>

    </div>
  );
}

export default ComplaintDetails;