// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../../api/axios";

// const LeaveDetails = () => {

//   const { id } = useParams();

//   const [leave, setLeave] =
//     useState(null);

//   useEffect(() => {

//     const fetchLeave = async () => {

//       const { data } = await API.get(
//         `/leaves/${id}`
//       );

//       setLeave(data);
//     };

//     fetchLeave();

//   }, [id]);

//   if (!leave)
//     return <h2>Loading...</h2>;

//   return (
//     <div className="p-5">

//       <h1 className="text-3xl mb-5">
//         Leave Details
//       </h1>

//       <div className="bg-white p-5 rounded shadow">

//         <p>
//           <strong>Type:</strong>
//           {" "}
//           {leave.leaveType}
//         </p>

//         <p>
//           <strong>Status:</strong>
//           {" "}
//           {leave.status}
//         </p>

//         <p>
//           <strong>Reason:</strong>
//           {" "}
//           {leave.reason}
//         </p>

//         <p>
//           <strong>Start Date:</strong>
//           {" "}
//           {new Date(
//             leave.startDate
//           ).toLocaleDateString()}
//         </p>

//         <p>
//           <strong>End Date:</strong>
//           {" "}
//           {new Date(
//             leave.endDate
//           ).toLocaleDateString()}
//         </p>

//       </div>
//     </div>
//   );
// };

// export default LeaveDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        setLoading(true);

        const { data } = await API.get(
          `/leaves/${id}`
        );

        setLeave(data.leave || data);

      } catch (error) {

        toast.error(
          "Failed to fetch leave details"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchLeave();

  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <h1 className="text-2xl">
          Loading...
        </h1>
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl">
          Leave Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-5">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Leave Details
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Back
          </button>

        </div>

        {/* Employee Info */}

        <div className="mb-6 border-b pb-4">

          <h2 className="text-xl font-semibold mb-3">
            Employee Information
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {leave.employee?.name || "N/A"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {leave.employee?.email || "N/A"}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {leave.employee?.department ||
              "N/A"}
          </p>

        </div>

        {/* Leave Info */}

        <div className="space-y-4">

          <p>
            <strong>Leave Type:</strong>{" "}
            {leave.leaveType}
          </p>

          <p>
            <strong>Status:</strong>{" "}

            <span
              className={`px-3 py-1 rounded text-white
              ${
                leave.status === "Approved"
                  ? "bg-green-600"
                  : leave.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            >
              {leave.status}
            </span>

          </p>

          <p>
            <strong>Reason:</strong>{" "}
            {leave.reason}
          </p>

          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(
              leave.startDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>End Date:</strong>{" "}
            {new Date(
              leave.endDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Applied On:</strong>{" "}
            {new Date(
              leave.createdAt
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Manager Comments:</strong>{" "}
            {leave.managerComments ||
              "No comments"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default LeaveDetails;