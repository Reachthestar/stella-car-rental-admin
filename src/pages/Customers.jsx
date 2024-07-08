import React from "react";
import CustomerCards from "../components/CustomerCards";
import { useCustomer } from "../contexts/customer-context";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Customers() {
  const { isAllCustomerLoading } = useCustomer()
  return (
    <>
      {isAllCustomerLoading ?
        <div className='h-full flex items-center'>
          <LoadingSpinner />
        </div>
        :
        <CustomerCards />
      }
    </>
  )
}
