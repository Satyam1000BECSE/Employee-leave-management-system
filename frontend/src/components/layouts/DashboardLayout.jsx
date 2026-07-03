import {
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logoutUser,
} from "../../features/auth/authSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}

      <aside className="w-64 bg-gray-900 text-white p-5">

        <h1 className="text-3xl font-bold mb-8">
          LeaveMS
        </h1>

        <nav className="space-y-4">

          {/* Employee Menu */}

          {user?.role === "employee" && (
            <>
              <Link
                to="/employee/dashboard"
                className="block p-2 rounded hover:bg-gray-800"
              >
                Dashboard
              </Link>

              <Link
                to="/employee/apply-leave"
                className="block p-2 rounded hover:bg-gray-800"
              >
                Apply Leave
              </Link>

              <Link
                to="/employee/history"
                className="block p-2 rounded hover:bg-gray-800"
              >
                Leave History
              </Link>

              <Link
                to="/employee/profile"
                className="block p-2 rounded hover:bg-gray-800"
              >
                My Profile
              </Link>
            </>
          )}

          {/* Manager Menu */}

          {user?.role === "manager" && (
            <>
              <Link
                to="/manager/dashboard"
                className="block p-2 rounded hover:bg-gray-800"
              >
                Dashboard
              </Link>

              <Link
                to="/manager/pending"
                className="block p-2 rounded hover:bg-gray-800"
              >
                Pending Requests
              </Link>

              <Link
                to="/manager/employees"
                className="block p-2 rounded hover:bg-gray-800"
              >
                Employees
              </Link>

              <Link
                to="/manager/leave-history"
                className="block p-2 rounded hover:bg-gray-800"
              >
                Leave History
              </Link>

              <Link
                to="/manager/profile"
                className="block p-2 rounded hover:bg-gray-800"
              >
                My Profile
              </Link>
            </>
          )}

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 p-2 rounded mt-8"
          >
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;