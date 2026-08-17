import { Bell, MapPin } from 'lucide-react'

function Navbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
          <MapPin className="text-white" size={20} />
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
        <Bell size={20} className="text-slate-600" />

        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </header>
  )
}

export default Navbar