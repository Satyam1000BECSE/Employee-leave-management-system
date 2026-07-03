import { useEffect, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

const ManagerLeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const { data } = await API.get(
        "/leaves"
      );

      setLeaves(data.leaves || []);
    } catch (error) {
      toast.error(
        "Failed to fetch leave history"
      );
    }
  };

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Employee Leave History
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-white shadow rounded">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">
                Employee
              </th>

              <th className="p-3">
                Type
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Start
              </th>

              <th className="p-3">
                End
              </th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave._id}
                className="border-b text-center"
              >
                <td className="p-3">
                  {leave.employee?.name}
                </td>

                <td className="p-3">
                  {leave.leaveType}
                </td>

                <td className="p-3">
                  {leave.status}
                </td>

                <td className="p-3">
                  {new Date(
                    leave.startDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(
                    leave.endDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManagerLeaveHistory;