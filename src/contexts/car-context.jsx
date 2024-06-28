import { createContext, useContext, useEffect, useState } from 'react';
import carsApi from '../apis/cars';

const CarsContext = createContext();

export default function CarsContextProvider({ children }) {
  const [allCar, setAllCars] = useState(null);
  const [isAllCarLoading, setIsAllCarLoading] = useState(true);
  const [carAvailable, setCarAvailable] = useState(null);
  const [allCarModel, setAllCarModel] = useState(null)
  const [allBranch, setAllBranch] = useState(null)

  const fetchCars = async () => {
    try {
      // Cars
      const carsRes = await carsApi.getAllCar();
      const dataCars = carsRes.data.message.reduce((acc, item) => {
        const carsData = {
          id: item.carId,
          brand: item.CarModel.brand,
          model: item.CarModel.model,
          plate: item.licensePlate,
          color: item.CarModel.color,
          region: item.Branch.region,
          airport: item.Branch.branchName,
          useDate: item.useDate,
          updatedAt: item.updatedAt.split('T')[0].split('-').join('/'),
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
        };
        acc.push(carsData);
        return acc;
      }, []);
      setCarAvailable(dataCars.filter((item) => item.status === 'Available'));

      setAllCars(dataCars.sort((beforeModel, afterModel) => beforeModel.model - afterModel.model))
      //CarModels
      const carModelRes = await carsApi.getAllCarModel()
      const dataCarModel = carModelRes.data.message
      setAllCarModel(dataCarModel)
    } catch (error) {
      console.log(error);
    } finally {
      setIsAllCarLoading(false);
    }
  };
  // BRANCHES
  const fetchBranches = async () => {
    const branchRes = await carsApi.getAllBranches()
    const branchData = branchRes.data.message
    setAllBranch(branchData)
  }

  useEffect(() => {
    fetchCars();
    fetchBranches()
  }, []);

  return (
    <CarsContext.Provider
      value={{ allCar, fetchCars, isAllCarLoading, carAvailable, allCarModel, allBranch }}
    >
      {children}
    </CarsContext.Provider>
  );
}
export function useCars() {
  return useContext(CarsContext);
}
