import { useEffect, useState } from "react";
import {
  getLeaves,
  deleteLeave,
} from "../../features/leave/leaveSlice";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";

const LeaveHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leaves } = useSelector(
    (state) => state.leave
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("");

  useEffect(() => {
    dispatch(getLeaves(""));
  }, [dispatch]);

  // Search + Filter

  const filteredLeaves = leaves.filter(
    (leave) => {
      const matchesSearch =
        leave.reason
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        leave.leaveType
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "" ||
        leave.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    }
  );

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Leave History
      </h1>

      {/* Search + Filter */}

      <div className="flex gap-4 mb-5">

        <input
          type="text"
          placeholder="Search by reason/type"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>

      </div>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-200">

            <th className="p-2">Type</th>

            <th className="p-2">Status</th>

            <th className="p-2">Reason</th>

            <th className="p-2">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredLeaves.length > 0 ? (

            filteredLeaves.map((leave) => (

              <tr
                key={leave._id}
                className="text-center border-t"
              >

                <td className="p-2">
                  {leave.leaveType}
                </td>

                {/* Colored Status */}

                <td className="p-2">

                  <span
                    className={`px-3 py-1 rounded text-white
                      ${
                        leave.status ===
                        "Approved"
                          ? "bg-green-500"
                          : leave.status ===
                            "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }
                    `}
                  >
                    {leave.status}
                  </span>

                </td>

                <td className="p-2">
                  {leave.reason}
                </td>

                <td className="p-2 flex gap-2 justify-center">

                  {/* Edit Pending */}

                  {leave.status ===
                    "Pending" && (

                    <button
                      onClick={() =>
                        navigate(
                          `/employee/edit/${leave._id}`
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                  )}

                  {/* Cancel Pending */}

                  {leave.status ===
                    "Pending" && (

                    <button
                      onClick={() =>
                        dispatch(
                          deleteLeave(
                            leave._id
                          )
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

                  )}

                  {/* View Details */}

                  <button
                    onClick={() =>
                      navigate(
                        `/leave/${leave._id}`
                      )
                    }
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="4"
                className="text-center p-5"
              >
                No Leave Records Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};

export default LeaveHistory;