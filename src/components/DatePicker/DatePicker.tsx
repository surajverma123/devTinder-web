import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type CustomDatePicker = {
  labelName: string
  selectedDate: any
  setSelectedDate: any
}
const CustomDatePicker: React.FC<CustomDatePicker> = ({ labelName, selectedDate, setSelectedDate }) => {

  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date: any) => setSelectedDate(date)}
        placeholderText="MM/dd/yyyy"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default CustomDatePicker;
