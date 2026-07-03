import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingApprovals: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  const [recentActivities, setRecentActivities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(
          "/dashboard/manager"
        );

        setStats(data.stats || {});

        setRecentActivities(
          data.recentActivities || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          Manager Dashboard
        </h1>

        <button
          onClick={() =>
            navigate("/manager/pending")
          }
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Review Requests
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg">
            Total Employees
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.totalEmployees}
          </h1>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg">
            Pending Approvals
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.pendingApprovals}
          </h1>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg">
            Approved Requests
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.approvedLeaves}
          </h1>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg">
            Rejected Requests
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {stats.rejectedLeaves}
          </h1>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() =>
              navigate("/manager/pending")
            }
            className="bg-indigo-600 text-white px-5 py-3 rounded"
          >
            Pending Requests
          </button>

          <button
            onClick={() =>
              navigate("/manager/employees")
            }
            className="bg-purple-600 text-white px-5 py-3 rounded"
          >
            Employees
          </button>

        </div>

      </div>

      {/* Recent Activities */}

      <div className="mt-10 bg-white p-6 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-5">
          Recent Activities
        </h2>

        {recentActivities.length > 0 ? (

          recentActivities.map((item) => (

            <div
              key={item._id}
              className="border-b py-3"
            >

              <p>
                <span className="font-semibold">
                  {item.employee?.name}
                </span>

                {" "}applied for{" "}

                <span className="font-semibold">
                  {item.leaveType}
                </span>

              </p>

              <p className="text-sm text-gray-500">
                Status: {item.status}
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

export default ManagerDashboard;