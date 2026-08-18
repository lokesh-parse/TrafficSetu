import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Auth
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Citizen Layout
import CitizenLayout from '../layouts/CitizenLayout'

// Citizen Pages
import CitizenDashboard from '../pages/citizen/Dashboard'
import ReportIssue from '../pages/citizen/ReportIssue'
import CitizenComplaints from '../pages/citizen/Complaints'
import CitizenComplaintDetails from '../pages/citizen/ComplaintDetails'
import CitizenProfile from '../pages/citizen/Profile'

// Authority Pages
import AuthorityDashboard from '../pages/authority/Dashboard'
import AuthorityComplaints from '../pages/authority/Complaints'
import AuthorityComplaintDetails from '../pages/authority/ComplaintDetails'
import AuthorityMap from '../pages/authority/Map'
import AuthorityAnalytics from '../pages/authority/Analytics'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          404
        </h1>
        <p className="mt-2 text-slate-600">
          TrafficSetu - Page Not Found
        </p>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            CITIZEN PORTAL
        ========================= */}

        <Route
          path="/citizen"
          element={<CitizenLayout />}
        >
          <Route
            index
            element={
              <Navigate
                to="/citizen/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<CitizenDashboard />}
          />

          <Route
            path="report"
            element={<ReportIssue />}
          />

          <Route
            path="complaints"
            element={<CitizenComplaints />}
          />

          <Route
            path="complaints/:id"
            element={<CitizenComplaintDetails />}
          />

          <Route
            path="profile"
            element={<CitizenProfile />}
          />
        </Route>


        {/* =========================
            AUTHORITY PORTAL
        ========================= */}

        <Route
          path="/authority/dashboard"
          element={<AuthorityDashboard />}
        />

        <Route
          path="/authority/complaints"
          element={<AuthorityComplaints />}
        />

        <Route
          path="/authority/complaints/:id"
          element={<AuthorityComplaintDetails />}
        />

        <Route
          path="/authority/map"
          element={<AuthorityMap />}
        />

        <Route
          path="/authority/analytics"
          element={<AuthorityAnalytics />}
        />


        {/* =========================
            DEFAULT ROUTE (Redirects to Login)
        ========================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* =========================
            404
        ========================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes