const Table = ({ children }) => {

  return (
    <table className="w-full border border-collapse">
      {children}
    </table>
  );
};

export default Table;