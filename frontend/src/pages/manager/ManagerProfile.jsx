import { useSelector } from "react-redux";

const ManagerProfile = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-6">
        Manager Profile
      </h1>

      <div className="bg-white p-6 rounded shadow max-w-lg">

        <div className="mb-4">
          <h3 className="font-semibold">
            Name
          </h3>
          <p>{user?.name}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">
            Email
          </h3>
          <p>{user?.email}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">
            Role
          </h3>
          <p>{user?.role}</p>
        </div>

      </div>

    </div>
  );
};

export default ManagerProfile;