import {
  LayoutDashboard,
  FilePlus2,
  ClipboardList,
  User,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/citizen/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Report Issue",
    path: "/citizen/report",
    icon: FilePlus2,
  },
  {
    label: "My Complaints",
    path: "/citizen/complaints",
    icon: ClipboardList,
  },
  {
    label: "Profile",
    path: "/citizen/profile",
    icon: User,
  },
];

function CitizenSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-900">
          TrafficSetu
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Citizen Portal
        </p>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

export default CitizenSidebar;