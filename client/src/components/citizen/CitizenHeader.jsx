import React, { useState, useRef, useEffect } from "react";
import { Bell, MapPin, CheckCircle2, AlertTriangle, ShieldAlert, X } from "lucide-react";

function CitizenHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample dynamic notification state (tu ise apne backend ya complaints se bhi link kar sakta hai)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Complaint In Progress",
      message: "Your ticket TS-2026-002 is currently being investigated.",
      time: "10 mins ago",
      read: false,
      type: "progress"
    },
    {
      id: 2,
      title: "Traffic Advisory",
      message: "Heavy congestion reported near Civil Lines, Nagpur.",
      time: "1 hour ago",
      read: false,
      type: "alert"
    },
    {
      id: 3,
      title: "Complaint Resolved",
      message: "Ticket TS-2026-003 has been successfully resolved.",
      time: "Yesterday",
      read: true,
      type: "resolved"
    }
  ]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 flex items-center justify-between px-6 shadow-sm">
      {/* Brand Logo & Portal Name */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/20">
          <MapPin className="text-white" size={22} />
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-900 tracking-tight">
            TrafficSetu
          </h1>
          <p className="text-xs font-medium text-blue-600">
            Citizen Portal
          </p>
        </div>
      </div>

      {/* Notification Bell with Premium Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Notifications"
        >
          <Bell size={20} className="transition-transform active:scale-95" />
          
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Premium Dropdown Box */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200/80 rounded-2xl shadow-2xl shadow-slate-900/10 overflow-hidden z-50 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {notifications.length === 0 ? (
                <div className="py-10 text-center">
                  <Bell className="mx-auto text-slate-300 mb-2" size={32} />
                  <p className="text-sm font-medium text-slate-600">No notifications yet</p>
                  <p className="text-xs text-slate-400 mt-0.5">We'll keep you updated on your complaints.</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 transition hover:bg-slate-50 relative group ${
                      !n.read ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {n.type === "resolved" ? (
                          <CheckCircle2 className="text-green-600" size={18} />
                        ) : n.type === "progress" ? (
                          <AlertTriangle className="text-blue-600" size={18} />
                        ) : (
                          <ShieldAlert className="text-amber-600" size={18} />
                        )}
                      </div>

                      <div className="flex-1 pr-4">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm ${!n.read ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {n.message}
                        </p>
                      </div>

                      {/* Remove button on hover */}
                      <button
                        onClick={(e) => clearNotification(n.id, e)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition p-1"
                        title="Dismiss"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
              <span className="text-xs font-medium text-slate-500">
                TrafficSetu Alert Center
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default CitizenHeader;