const Input = ({
  label,
  ...props
}) => {

  return (
    <div className="mb-4">

      {label && (
        <label className="block mb-2 font-medium">
          {label}
        </label>
      )}

      <input
        className="w-full border p-3 rounded"
        {...props}
      />

    </div>
  );
};

export default Input;