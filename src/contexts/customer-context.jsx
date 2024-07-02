import { createContext, useContext, useEffect, useState } from "react";
import customerApi from "../apis/customer";

const CustomerContext = createContext();

export default function CustomerContextProvider({ children }) {
  const [allCustomer, setAllCustomer] = useState();
  const [isAllCustomerLoading, setIsAllCustomerLoading] = useState(true);

  const fetchCustomer = async () => {
    try {
      const customerRes = await customerApi.getAllCustomer();
      const data = customerRes.data.message;
      setAllCustomer(data);
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
    <CustomerContext.Provider value={{ allCustomer, isAllCustomerLoading }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  return useContext(CustomerContext);
}
