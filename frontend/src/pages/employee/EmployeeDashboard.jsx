import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalLeaves: 0,
    approvedLeaves: 0,
    pendingLeaves: 0,
    rejectedLeaves: 0,
  });

  const [activities, setActivities] =
    useState([]);

  const [leaveBalance, setLeaveBalance] =
    useState({
      casual: 0,
      sick: 0,
      annual: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const { data } = await API.get(
          "/dashboard/employee"
        );

        setStats(data.stats || {});

        setActivities(
          data.recentActivities || []
        );

        setLeaveBalance(
          data.leaveBalance || {}
        );

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <h1 className="text-2xl">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-5">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Employee Dashboard
        </h1>

        <button
          onClick={() =>
            navigate("/employee/apply-leave")
          }
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Apply Leave
        </button>

      </div>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-blue-600 text-white p-6 rounded shadow">
          <h3>Total Requests</h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.totalLeaves}
          </h1>
        </div>

        <div className="bg-green-600 text-white p-6 rounded shadow">
          <h3>Approved</h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.approvedLeaves}
          </h1>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h3>Pending</h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.pendingLeaves}
          </h1>
        </div>

        <div className="bg-red-600 text-white p-6 rounded shadow">
          <h3>Rejected</h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.rejectedLeaves}
          </h1>
        </div>

      </div>

      {/* Leave Balance */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Leave Balance
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-white shadow p-5 rounded">
            <h3 className="font-semibold">
              Casual Leave
            </h3>

            <p className="text-3xl mt-2">
              {leaveBalance.casual}
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded">
            <h3 className="font-semibold">
              Sick Leave
            </h3>

            <p className="text-3xl mt-2">
              {leaveBalance.sick}
            </p>
          </div>

          <div className="bg-white shadow p-5 rounded">
            <h3 className="font-semibold">
              Annual Leave
            </h3>

            <p className="text-3xl mt-2">
              {leaveBalance.annual}
            </p>
          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() =>
              navigate("/employee/apply-leave")
            }
            className="bg-indigo-600 text-white px-5 py-3 rounded"
          >
            Apply Leave
          </button>

          <button
            onClick={() =>
              navigate("/employee/history")
            }
            className="bg-purple-600 text-white px-5 py-3 rounded"
          >
            View History
          </button>

          <button
            onClick={() =>
              navigate("/employee/profile")
            }
            className="bg-gray-700 text-white px-5 py-3 rounded"
          >
            Profile
          </button>

        </div>

      </div>

      {/* Recent Activities */}

      <div className="mt-10 bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-5">
          Recent Activities
        </h2>

        {activities.length > 0 ? (

          activities.map((leave) => (

            <div
              key={leave._id}
              className="border-b py-4"
            >

              <p>
                You applied for
                {" "}
                <span className="font-semibold">
                  {leave.leaveType}
                </span>
              </p>

              <p className="text-sm text-gray-500">
                Status:
                {" "}

                <span
                  className={
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {leave.status}
                </span>
              </p>

            </div>

          ))

        ) : (

          <p className="text-gray-500">
            No recent activities found.
          </p>

        )}

      </div>

    </div>
  );
};

export default EmployeeDashboard;