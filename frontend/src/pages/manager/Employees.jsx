import { useEffect, useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getEmployees,
} from "../../features/employee/employeeSlice";

const Employees = () => {
  const dispatch = useDispatch();

  const {
    employees,
    isLoading,
  } = useSelector(
    (state) => state.employee
  );

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  // Search Filter

  const filteredEmployees =
    employees.filter((emp) =>
      emp.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <h1 className="text-2xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-5">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded w-full md:w-[350px]"
        />

      </div>

      {/* Total Employees */}

      <div className="bg-blue-600 text-white p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl">
          Total Employees:
          {" "}
          {filteredEmployees.length}
        </h2>
      </div>

      {/* Employee Cards */}

      {filteredEmployees.length > 0 ? (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {filteredEmployees.map(
            (emp) => (

              <div
                key={emp._id}
                className="bg-white shadow-md rounded-lg p-5 border hover:shadow-xl transition"
              >

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                    {emp.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h2 className="text-xl font-semibold">
                      {emp.name}
                    </h2>

                    <p className="text-gray-500">
                      {emp.email}
                    </p>

                  </div>

                </div>

                <div className="space-y-2">

                  <p>
                    <strong>
                      Department:
                    </strong>
                    {" "}
                    {emp.department}
                  </p>

                  <p>
                    <strong>
                      Role:
                    </strong>
                    {" "}
                    {emp.role}
                  </p>

                </div>

                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </button>

              </div>

            )
          )}

        </div>

      ) : (

        <div className="text-center py-10">

          <h2 className="text-2xl text-gray-500">
            No Employees Found
          </h2>

        </div>

      )}

    </div>
  );
};

export default Employees;