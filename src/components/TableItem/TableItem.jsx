export const TableItem = ({ label, value, setValue, data, additional }) => {
  return (
    <div className="myItem">
      <label>{label}</label>
      <select onChange={(e) => setValue(e.target.value)} value={value}>
        <option value="">Оберіть...</option>
        {data && data.map(element => (
          <option key={element.name} value={element.name}>{additional && element.value}{additional&&"%"} {element.name}</option>
        ))}
      </select>
    </div>
  );
};
