import { useState } from "react";
import Input from "../../../components/Input";
import { useCars } from "../../../contexts/car-context";
import carsApi from "../../../apis/cars";
import validateAddCarsInfo from "../../../validators/validate-addCar";

const currentYear = new Date().getFullYear();

const initial_input = {
  carModelId: "",
  branchId: "",
  status: "",
  useDate: "" + currentYear,
  licensePlate: "",
};

const initial_input_error = {
  carModelId: "",
  branchId: "",
  status: "",
  useDate: "",
  licensePlate: "",
};

export default function AddCarForm() {
  const { allCarModel, allBranch, fetchCars } = useCars();
  const [input, setInput] = useState(initial_input);
  const [errorInput, setErrorInput] = useState(initial_input_error);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrorInput((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateAddCarsInfo(input);
      setErrorInput(error);
      if (!error) {
        const message = await carsApi.createCar(input);
        alert(message.data.message);
        fetchCars();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col px-8 py-6 bg-white rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmitForm}
      >
        <div className="text-center mx-auto w-full">
          <select
            name="carModelId"
            className="border-2 border-gray-300 rounded-md outline-none w-full p-2 focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
          >
            <option value="">Model</option>
            {allCarModel?.map((item) => (
              <option key={item.carModelId} value={item.carModelId}>
                {`${item.brand} ${item.model} (${item.color})`}
              </option>
            ))}
          </select>
          <div className="text-red-500 text-sm mt-1">
            {errorInput?.carModelId}
          </div>
        </div>

        <div className="text-center mx-auto w-full">
          <select
            name="branchId"
            className="border-2 border-gray-300 rounded-md outline-none w-full p-2 focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
          >
            <option value="">Branch</option>
            {allBranch?.map((item) => (
              <option key={item.branchId} value={item.branchId}>
                {`${item.branchName} (${item.region})`}
              </option>
            ))}
          </select>
          <div className="text-red-500 text-sm mt-1">
            {errorInput?.branchId}
          </div>
        </div>

        <div className="text-center mx-auto w-full">
          <select
            name="status"
            className="border-2 border-gray-300 rounded-md outline-none w-full p-2 focus:ring-2 focus:ring-blue-500"
            onChange={handleInput}
          >
            <option value="">Status</option>
            <option value="available">Available</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <div className="text-red-500 text-sm mt-1">{errorInput?.status}</div>
        </div>

        <Input
          placeholder="License Plate"
          name="licensePlate"
          value={input.licensePlate}
          onChange={handleInput}
          error={errorInput?.licensePlate}
          className="border-2 border-gray-300 rounded-md outline-none w-full p-2 focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
          + New Car
        </button>
      </form>
    </>
  );
}
