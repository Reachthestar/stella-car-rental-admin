import { createContext, useContext, useEffect, useState } from 'react';
import customerApi from '../apis/customer';

const CustomerContext = createContext();

export default function CustomerContextProvider({ children }) {
  const [allCustomer, setAllCustomer] = useState();
  const [isAllCustomerLoading, setIsAllCustomerLoading] = useState(true);
  const [yearlyCustomer, setYearlyCustomer] = useState([]);
  const [monthlyCustomer, setMonthlyCustomer] = useState([]);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentDate = today.getDate()

  const fetchCustomer = async () => {
    try {
      const customerRes = await customerApi.getAllCustomer();
      const data = customerRes.data.message.reduce((acc, item) => {
        const customerData = {
          ...item,
          createdAt: item.createdAt,
        };
        acc.push(customerData);
        return acc;
      }, []);
      setAllCustomer(data);

      //Filter data for current month
      const currentMonthData = data.filter((item) => {
        const date = new Date(item.createdAt);
        return (
          date.getMonth() + 1 === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

      // Filter data for current year
      const currentYearData = data.filter((item) => {
        const date = new Date(item.createdAt);
        return date.getFullYear() === currentYear;
      });

      setMonthlyCustomer(currentMonthData);
      setYearlyCustomer(currentYearData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAllCustomerLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        allCustomer,
        isAllCustomerLoading,
        yearlyCustomer,
        monthlyCustomer,
        currentYear,
        currentMonth,
        currentDate
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
}
