const RecentActivity = ({
  activities,
}) => {

  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="text-xl font-bold mb-4">
        Recent Activities
      </h2>

      {activities?.map((item) => (
        <div
          key={item._id}
          className="border-b py-2"
        >
          {item.leaveType} -
          {" "}
          {item.status}
        </div>
      ))}

    </div>
  );
};

export default RecentActivity;