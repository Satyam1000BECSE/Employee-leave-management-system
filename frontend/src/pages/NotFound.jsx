import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="text-xl mt-3">
        Page Not Found
      </p>

      <Link
        to="/login"
        className="bg-blue-600 text-white px-5 py-2 rounded mt-5"
      >
        Go Home
      </Link>

    </div>
  );
};

export default NotFound;