const StatsCard = ({
  title,
  value,
  color = "bg-blue-500",
}) => {

  return (
    <div
      className={`${color} text-white p-5 rounded shadow`}
    >
      <h3 className="text-lg">
        {title}
      </h3>

      <h1 className="text-3xl font-bold">
        {value}
      </h1>
    </div>
  );
};

export default StatsCard;