import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
import {
  Camera,
  MapPin,
  FileText,
  AlertTriangle,
  Send,
  CheckCircle2,
  X,
  Upload,
} from "lucide-react";

function ReportIssue() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [formData, setFormData] = useState({
    issueType: "",
    priority: "Medium",
    description: "",
    location: "",
  });

  const [evidenceFile, setEvidenceFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [captureMode, setCaptureMode] = useState(false);
  const [webcamImage, setWebcamImage] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [locLoading, setLocLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          location: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)} (Nagpur Region)`,
        }));
        setLocLoading(false);
      },
      (err) => {
        console.error(err);
        alert("Unable to retrieve your location. Please type manually.");
        setLocLoading(false);
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvidenceFile(file);
      setFileName(file.name);
      setWebcamImage(null);
      setCaptureMode(false);
    }
  };

  const capturePhoto = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setWebcamImage(screenshot);
    setCaptureMode(false);
    setFileName("live-camera-capture.jpg");
    setEvidenceFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.issueType || !formData.description || !formData.location) {
      setError("Please fill all required fields (Issue Type, Description, Location).");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const categoryMap = {
        "traffic-jam": "Traffic Jam",
        "accident": "Road Accident",
        "rash-driving": "Rash Driving",
        "illegal-parking": "Illegal Parking",
        "road-damage": "Road Damage",
        "traffic-signal": "Traffic Signal Issue",
        "other": "Other",
      };

      const data = new FormData();
      data.append("category", categoryMap[formData.issueType]);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("priority", formData.priority);
      
      if (evidenceFile) {
        data.append("evidence", evidenceFile);
      } else if (webcamImage) {
        const res = await fetch(webcamImage);
        const blob = await res.blob();
        const file = new File([blob], "evidence-capture.jpg", { type: "image/jpeg" });
        data.append("evidence", file);
      }

      // Direct Render Backend URL
      const res = await axios.post("https://trafficsetu.onrender.com/api/complaints/report", data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      if (res.data.success) {
        alert(`Complaint registered successfully!\nUnique Ticket ID: ${res.data.complaint.ticketId}`);
        navigate("/citizen/dashboard");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.response?.data?.message || "Error submitting complaint to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
            <FileText className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Report Traffic Issue 🚨</h1>
            <p className="text-blue-100 mt-1">Submit public safety grievances directly to the Traffic Department.</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-5 py-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">Issue Type *</label>
          <select
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-900 font-medium transition"
          >
            <option value="">Select traffic grievance type</option>
            <option value="traffic-jam">Traffic Jam</option>
            <option value="accident">Road Accident</option>
            <option value="rash-driving">Rash Driving</option>
            <option value="illegal-parking">Illegal Parking</option>
            <option value="road-damage">Road Damage</option>
            <option value="traffic-signal">Traffic Signal Issue</option>
            <option value="other">Other Public Grievance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">Severity / Priority *</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ["Low", "Low - Minor Inconvenience"],
              ["Medium", "Medium - Moderate Issue"],
              ["High", "High - Urgent Emergency / Blockage"],
            ].map(([value, label]) => (
              <label
                key={value}
                className={`border rounded-2xl p-4 cursor-pointer transition flex items-center ${
                  formData.priority === value ? "border-blue-500 bg-blue-50/60 text-blue-900 shadow-sm" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="priority"
                  value={value}
                  checked={formData.priority === value}
                  onChange={handleChange}
                  className="mr-3 accent-blue-600 w-4 h-4"
                />
                <span className="font-semibold text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">Detailed Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Explain what happened, vehicle numbers, or specific landmarks..."
            className="w-full px-4 py-3.5 border border-slate-200 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-900 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">Location Details *</label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter street name or landmark"
              required
              className="flex-1 px-4 py-3.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 text-slate-900 transition"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={locLoading}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-50 hover:bg-blue-100 rounded-xl font-semibold text-blue-700 transition"
            >
              <MapPin size={18} />
              {locLoading ? "Fetching GPS..." : "Use My Location"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-900 mb-3">Supporting Evidence (Photos / Videos)</label>
          
          {!captureMode && !webcamImage && !evidenceFile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setCaptureMode(true)}
                className="border-2 border-dashed border-blue-300 bg-blue-50/30 hover:bg-blue-50 rounded-2xl p-6 text-center transition flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
                  <Camera size={24} />
                </div>
                <p className="font-bold text-slate-900 mt-1">Open Live Camera</p>
                <p className="text-xs text-slate-500">Capture photo instantly from phone/laptop</p>
              </button>

              <label className="border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-100 rounded-2xl p-6 text-center transition flex flex-col items-center justify-center gap-2 cursor-pointer group">
                <div className="w-12 h-12 bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition">
                  <Upload size={24} />
                </div>
                <p className="font-bold text-slate-900 mt-1">Upload from Device</p>
                <p className="text-xs text-slate-500">Supports JPG, PNG, MP4</p>
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </label>
            </div>
          )}

          {captureMode && (
            <div className="relative border-2 border-blue-500 rounded-2xl overflow-hidden bg-black shadow-lg">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition"
                >
                  <Camera size={18} /> Capture Photo
                </button>
                <button
                  type="button"
                  onClick={() => setCaptureMode(false)}
                  className="bg-slate-800/80 hover:bg-slate-900 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {(webcamImage || fileName) && !captureMode && (
            <div className="p-4 border border-slate-200 rounded-2xl bg-slate-50 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                {webcamImage ? (
                  <img src={webcamImage} alt="Capture" className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm" />
                ) : (
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">FILE</div>
                )}
                <div>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-green-700">
                    <CheckCircle2 size={16} /> Attached: {fileName}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Ready for department dispatch</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { setWebcamImage(null); setEvidenceFile(null); setFileName(""); }}
                className="p-2 text-slate-400 hover:text-red-600 transition"
                title="Remove evidence"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-amber-800">
          <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
          <p className="text-xs font-medium leading-relaxed">
            All submitted grievances are recorded under official traffic department guidelines. Ensure information is accurate.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition cursor-pointer disabled:opacity-50 shadow-lg shadow-blue-500/20 text-base"
        >
          {loading ? "Registering Ticket..." : <><Send size={18} /> Submit Complaint & Generate Ticket 🚀</>}
        </button>

      </form>
    </div>
  );
}

export default ReportIssue;