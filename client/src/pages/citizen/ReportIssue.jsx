import { useState } from "react";
import {
  Camera,
  MapPin,
  Video,
  Mic,
  FileText,
  AlertTriangle,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ReportIssue() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    issueType: "",
    priority: "medium",
    description: "",
    location: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.issueType ||
      !formData.description ||
      !formData.location
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const existingComplaints =
      JSON.parse(localStorage.getItem("trafficSetuComplaints")) || [];

    const newComplaint = {
      id: `TS-2026-${String(existingComplaints.length + 1).padStart(3, "0")}`,
      type:
        formData.issueType === "traffic-jam"
          ? "Traffic Jam"
          : formData.issueType === "accident"
          ? "Road Accident"
          : formData.issueType === "rash-driving"
          ? "Rash Driving"
          : formData.issueType === "illegal-parking"
          ? "Illegal Parking"
          : formData.issueType === "road-damage"
          ? "Road Damage"
          : formData.issueType === "traffic-signal"
          ? "Traffic Signal Issue"
          : "Other",
      location: formData.location,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      priority: formData.priority,
      status: "Pending",
      description: formData.description,
      evidence: [],
    };

    localStorage.setItem(
      "trafficSetuComplaints",
      JSON.stringify([
        ...existingComplaints,
        newComplaint,
      ])
    );

    alert(`Complaint submitted successfully!\nTicket ID: ${newComplaint.id}`);

    navigate("/citizen/complaints");
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <FileText
              className="text-blue-600"
              size={24}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Report an Issue
            </h1>
            <p className="text-slate-500 mt-1">
              Report traffic or public safety issues to the authorities.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
      >

        {/* Issue Type */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Issue Type
          </label>
          <select
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select issue type</option>
            <option value="traffic-jam">Traffic Jam</option>
            <option value="accident">Road Accident</option>
            <option value="rash-driving">Rash Driving</option>
            <option value="illegal-parking">Illegal Parking</option>
            <option value="road-damage">Road Damage</option>
            <option value="traffic-signal">Traffic Signal Issue</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Priority
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              ["low", "Low"],
              ["medium", "Medium"],
              ["high", "High"],
            ].map(([value, label]) => (
              <label
                key={value}
                className={`border rounded-xl p-4 cursor-pointer ${
                  formData.priority === value
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  name="priority"
                  value={value}
                  checked={formData.priority === value}
                  onChange={handleChange}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Describe the issue in detail..."
            className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Location
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  location: "Current Location, Nagpur",
                })
              }
              className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium"
            >
              <MapPin size={18} />
              Use My Location
            </button>
          </div>
        </div>

        {/* Evidence */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Supporting Evidence
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <Camera className="mx-auto text-blue-600 mb-2" size={28} />
              <p className="font-medium text-slate-700">Add Photo</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG</p>
              <input type="file" accept="image/*" className="hidden" />
            </label>

            <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <Video className="mx-auto text-purple-600 mb-2" size={28} />
              <p className="font-medium text-slate-700">Add Video</p>
              <p className="text-xs text-slate-400 mt-1">MP4, MOV</p>
              <input type="file" accept="video/*" className="hidden" />
            </label>

            <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <Mic className="mx-auto text-red-600 mb-2" size={28} />
              <p className="font-medium text-slate-700">Add Audio</p>
              <p className="text-xs text-slate-400 mt-1">MP3, WAV</p>
              <input type="file" accept="audio/*" className="hidden" />
            </label>

          </div>
        </div>

        {/* Warning */}
        <div className="flex gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
          <p className="text-sm text-yellow-800">
            Please provide accurate information and location details.
            False complaints may be subject to verification.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition cursor-pointer"
        >
          <Send size={18} />
          Submit Complaint
        </button>

      </form>

    </div>
  );
}

export default ReportIssue;