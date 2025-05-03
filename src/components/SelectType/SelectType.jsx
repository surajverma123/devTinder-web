const SelectType = ({ options, labelName, selectedValue, setSelectedValue }) => {
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="max-w-sm mx-auto">
      <label
        htmlFor={labelName}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelName}
      </label>
      <select
        id={labelName}
        value={selectedValue}
        onChange={handleChange}
        className="bg-gray-50 border p-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>
          Select {labelName}
        </option>
        {options?.map((item, ind) => (
          <option key={ind} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectType;
