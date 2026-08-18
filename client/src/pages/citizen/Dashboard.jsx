import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Plus,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real complaints from Render backend API
  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://trafficsetu.onrender.com/api/complaints/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setComplaints(response.data.complaints);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyComplaints();
  }, []);

  // Calculate real dynamic counts
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(
    (c) => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW' || c.status === 'Pending'
  ).length;
  const inProgressCount = complaints.filter(
    (c) => c.status === 'IN_PROGRESS' || c.status === 'In Progress'
  ).length;
  const resolvedCount = complaints.filter(
    (c) => c.status === 'RESOLVED' || c.status === 'Resolved'
  ).length;

  const stats = [
    {
      title: 'Total Complaints',
      value: totalCount.toString(),
      icon: FileText,
      description: 'All reported issues',
    },
    {
      title: 'Pending',
      value: pendingCount.toString(),
      icon: Clock3,
      description: 'Awaiting action',
    },
    {
      title: 'In Progress',
      value: inProgressCount.toString(),
      icon: Activity,
      description: 'Being investigated',
    },
    {
      title: 'Resolved',
      value: resolvedCount.toString(),
      icon: CheckCircle2,
      description: 'Successfully resolved',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="flex flex-col gap-4 rounded-2xl bg-blue-600 p-6 text-white shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-sm text-blue-100">Citizen Portal</p>
          <h1 className="text-2xl font-bold md:text-3xl">Welcome back, Citizen 👋</h1>
          <p className="mt-2 max-w-xl text-sm text-blue-100 md:text-base">
            Report traffic and public safety issues and track the action taken by authorities.
          </p>
        </div>

        <Link
          to="/citizen/report"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          <Plus size={20} />
          Report Issue
        </Link>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3">
                  <Icon size={22} className="text-blue-600" />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">{stat.description}</p>
            </div>
          );
        })}
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Complaints */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Complaints</h2>
              <p className="mt-1 text-sm text-slate-500">Track your latest reported issues</p>
            </div>

            <Link
              to="/citizen/complaints"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <p className="p-6 text-center text-slate-500">Loading your complaints...</p>
            ) : complaints.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-slate-500 mb-2">You haven't reported any traffic issues yet.</p>
                <Link to="/citizen/report" className="text-blue-600 font-semibold hover:underline">
                  Report your first issue now →
                </Link>
              </div>
            ) : (
              complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex gap-4">
                    <div className="mt-1 rounded-xl bg-slate-100 p-3">
                      <AlertTriangle size={20} className="text-slate-600" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">{complaint.category}</p>
                      <p className="mt-1 text-sm text-slate-500">Ticket: {complaint.ticketId}</p>

                      <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={14} />
                        {complaint.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        complaint.status === 'RESOLVED' || complaint.status === 'Resolved'
                          ? 'bg-green-50 text-green-700'
                          : complaint.status === 'IN_PROGRESS' || complaint.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {complaint.status}
                    </span>

                    <span className="text-xs text-slate-400">
                      {new Date(complaint.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500">Access important features quickly</p>

          <div className="mt-5 space-y-3">
            <Link
              to="/citizen/report"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="rounded-lg bg-blue-50 p-2">
                <Plus size={20} className="text-blue-600" />
              </div>

              <div>
                <p className="font-semibold text-slate-900">Report an Issue</p>
                <p className="text-xs text-slate-500">Submit a new complaint</p>
              </div>
            </Link>

            <Link
              to="/citizen/complaints"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="rounded-lg bg-slate-100 p-2">
                <FileText size={20} className="text-slate-600" />
              </div>

              <div>
                <p className="font-semibold text-slate-900">My Complaints</p>
                <p className="text-xs text-slate-500">Track complaint status</p>
              </div>
            </Link>

            <Link
              to="/citizen/profile"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="rounded-lg bg-slate-100 p-2">
                <Activity size={20} className="text-slate-600" />
              </div>

              <div>
                <p className="font-semibold text-slate-900">My Profile</p>
                <p className="text-xs text-slate-500">Manage your account</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;