import { Outlet } from "react-router-dom";
import CitizenSidebar from "../components/citizen/CitizenSidebar";
import CitizenHeader from "../components/citizen/CitizenHeader";

function CitizenLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <CitizenHeader />

      <div className="flex">
        <CitizenSidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default CitizenLayout;