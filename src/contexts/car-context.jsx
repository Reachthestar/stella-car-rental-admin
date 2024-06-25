import { createContext, useContext, useEffect, useState } from 'react';
import carsApi from '../apis/cars';

const CarsContext = createContext();

export default function CarsContextProvider({ children }) {
  const [allCar, setAllCars] = useState(null);
  const [isAllCarLoading, setIsAllCarLoading] = useState(true);
  const [carAvailable, setCarAvailable] = useState(null);

  const fetchCars = async () => {
    try {
      const carsRes = await carsApi.getAllCar();
      const data = carsRes.data.message.reduce((acc, item) => {
        const carsData = {
          id: item.carId,
          brand: item.CarModel.brand,
          model: item.CarModel.model,
          plate: item.licensePlate,
          region: item.Branch.region,
          airport: item.Branch.branchName,
          useDate: item.useDate,
          updatedAt: item.updatedAt.split('T')[0].split('-').join('/'),
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
        };
        acc.push(carsData);
        return acc;
      }, []);
      setCarAvailable(data.filter((item) => item.status === 'Available'));
      setAllCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAllCarLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <CarsContext.Provider
      value={{ allCar, fetchCars, isAllCarLoading, carAvailable }}
    >
      {children}
    </CarsContext.Provider>
  );
}
export function useCars() {
  return useContext(CarsContext);
}
