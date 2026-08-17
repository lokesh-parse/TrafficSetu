import { Bell, MapPin } from "lucide-react";

function CitizenHeader() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <MapPin className="text-white" size={22} />
        </div>

        <div>
          <h1 className="font-bold text-slate-900">
            TrafficSetu
          </h1>

          <p className="text-xs text-slate-500">
            Citizen Portal
          </p>
        </div>
      </div>

      <button className="relative p-2 rounded-lg hover:bg-slate-100">
        <Bell size={22} className="text-slate-600" />

        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </header>
  );
}

export default CitizenHeader;