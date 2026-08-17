import {
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Get complaints from localStorage
  const complaints =
    JSON.parse(localStorage.getItem("trafficsetu_complaints")) || [];

  // Find complaint using ticket ID
  const complaint = complaints.find(
    (item) => item.id === id
  );

  // If complaint not found
  if (!complaint) {
    return (
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/citizen/complaints")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Complaints
        </button>

        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <FileText
            size={48}
            className="mx-auto text-slate-400 mb-4"
          />

          <h1 className="text-2xl font-bold text-slate-900">
            Complaint Not Found
          </h1>

          <p className="text-slate-500 mt-2">
            The complaint you're looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/citizen/complaints")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium"
          >
            Go to My Complaints
          </button>
        </div>
      </div>
    );
  }

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
    <div className="max-w-6xl mx-auto">

      {/* Back */}
      <button
        onClick={() => navigate("/citizen/complaints")}
        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Complaints
      </button>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

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

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle()}`}
          >
            {complaint.status}
          </span>

        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Complaint Information */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Complaint Information
          </h2>

          <div className="space-y-5">

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

                <p className="font-medium text-slate-900">
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

                <p className="font-medium text-slate-900">
                  {complaint.date}
                </p>
              </div>
            </div>

            {/* Priority */}
            <div className="flex gap-3">
              <AlertCircle
                className="text-blue-600 flex-shrink-0"
                size={20}
              />

              <div>
                <p className="text-sm text-slate-500">
                  Priority
                </p>

                <p className="font-medium text-slate-900 capitalize">
                  {complaint.priority}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-slate-200">

              <p className="text-sm text-slate-500 mb-2">
                Description
              </p>

              <p className="text-slate-700 leading-7">
                {complaint.description}
              </p>

            </div>

          </div>
        </div>

        {/* Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Complaint Status
          </h2>

          <div className="space-y-6">

            {/* Submitted */}
            <div className="flex gap-3">
              <CheckCircle
                className="text-green-600 flex-shrink-0"
                size={20}
              />

              <div>
                <p className="font-semibold text-slate-900">
                  Complaint Submitted
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Your complaint has been successfully registered.
                </p>
              </div>
            </div>

            {/* Pending */}
            {complaint.status === "Pending" && (
              <div className="flex gap-3">
                <Clock
                  className="text-yellow-600 flex-shrink-0"
                  size={20}
                />

                <div>
                  <p className="font-semibold text-slate-900">
                    Awaiting Action
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Authorities will review your complaint.
                  </p>
                </div>
              </div>
            )}

            {/* In Progress */}
            {complaint.status === "In Progress" && (
              <div className="flex gap-3">
                <Clock
                  className="text-blue-600 flex-shrink-0"
                  size={20}
                />

                <div>
                  <p className="font-semibold text-slate-900">
                    Investigation In Progress
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Authorities are currently investigating this complaint.
                  </p>
                </div>
              </div>
            )}

            {/* Resolved */}
            {complaint.status === "Resolved" && (
              <div className="flex gap-3">
                <CheckCircle
                  className="text-green-600 flex-shrink-0"
                  size={20}
                />

                <div>
                  <p className="font-semibold text-slate-900">
                    Complaint Resolved
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    This complaint has been successfully resolved.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Evidence */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">

        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Supporting Evidence
        </h2>

        <p className="text-sm text-slate-500 mb-5">
          Photos, videos or other evidence submitted with this complaint.
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
            Evidence will appear here after submission.
          </p>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;