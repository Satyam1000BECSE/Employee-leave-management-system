import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";

// Employee Pages
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ApplyLeave from "./pages/employee/ApplyLeave";
import LeaveHistory from "./pages/employee/LeaveHistory";
import Profile from "./pages/employee/Profile";
import EditLeave from "./pages/employee/EditLeave";

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import PendingLeaves from "./pages/manager/PendingLeaves";
import Employees from "./pages/manager/Employees";
import ManagerProfile from "./pages/manager/ManagerProfile";
import ManagerLeaveHistory from "./pages/manager/ManagerLeaveHistory";

// Shared Pages
import LeaveDetails from "./pages/shared/LeaveDetails";
import NotFound from "./pages/NotFound";

// Layout
import DashboardLayout from "./components/layouts/DashboardLayout";

// Protected Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <Routes>

      {/* Default Route */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* Public Route */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Employee Routes */}

      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="employee">
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >

        <Route
          path="/employee/dashboard"
          element={<EmployeeDashboard />}
        />

        <Route
          path="/employee/apply-leave"
          element={<ApplyLeave />}
        />

        <Route
          path="/employee/history"
          element={<LeaveHistory />}
        />

        <Route
          path="/employee/profile"
          element={<Profile />}
        />

        <Route
          path="/employee/edit/:id"
          element={<EditLeave />}
        />

        <Route
          path="/employee/leave/:id"
          element={<LeaveDetails />}
        />

      </Route>

      {/* Manager Routes */}

      <Route
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="manager">
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >

        <Route
          path="/manager/dashboard"
          element={<ManagerDashboard />}
        />

        <Route
          path="/manager/pending"
          element={<PendingLeaves />}
        />

        <Route
          path="/manager/employees"
          element={<Employees />}
        />

        <Route
          path="/manager/profile"
          element={<ManagerProfile />}
        />

        <Route
          path="/manager/leave-history"
          element={<ManagerLeaveHistory />}
        />

        <Route
          path="/manager/leave/:id"
          element={<LeaveDetails />}
        />

      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;