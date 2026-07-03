const EmptyState = ({
  message = "No Data Found",
}) => {

  return (
    <div className="text-center py-10">
      <h2 className="text-xl text-gray-500">
        {message}
      </h2>
    </div>
  );
};

export default EmptyState;