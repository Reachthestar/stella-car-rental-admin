import React, { useState, useEffect } from "react";
import { useCustomer } from "../contexts/customer-context";

function CustomerCards() {
  const { allCustomer, fetchCustomer } = useCustomer();
  const [customers, setCustomers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    setCustomers(allCustomer || []);
  }, [allCustomer]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleSort = (event) => {
    const key = event.target.value;
    setSortKey(key);
    const sortedCustomers = [...customers].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (key === "totalPoints") {
        return valueB - valueA; // Descending order for totalPoints
      }

      if (key === "customerId") {
        return valueA - valueB; // Ascending order for customerId
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB; // Ascending order for other numerical fields
      }

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    setCustomers(sortedCustomers);
    setCurrentPage(1); // Reset to the first page on sort
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      customer.firstName.toLowerCase().includes(searchTermLower) ||
      customer.lastName.toLowerCase().includes(searchTermLower) ||
      customer.email.toLowerCase().includes(searchTermLower) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTermLower) ||
      customer.driverLicense.toLowerCase().includes(searchTermLower) ||
      customer.totalPoints.toString().includes(searchTerm)
    );
  });

  // Calculate pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={sortKey}
          onChange={handleSort}
          className="ml-4 shadow text-center appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Sort by</option>
          <option value="customerId">ID</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="address">Address</option>
          <option value="driverLicense">Driver License</option>
          <option value="totalPoints">Total Points</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-gray-100 rounded-lg p-5 shadow-lg w-full sticky top-0">
          <div className="grid grid-cols-8 text-center font-bold">
            <div className="p-2">ID</div>
            <div className="p-2">First Name</div>
            <div className="p-2">Last Name</div>
            <div className="p-2">Email</div>
            <div className="p-2">Phone</div>
            <div className="p-2">Address</div>
            <div className="p-2">Driver License</div>
            <div className="p-2">Total Points</div>
          </div>
        </div>
        {currentCustomers.map((customer) => (
          <div
            key={customer.customerId}
            className="bg-white rounded-lg p-5 shadow-lg w-full"
          >
            <div className="grid grid-cols-8 text-center items-center">
              <div className="p-2 h-fit">{customer.customerId}</div>
              <div className="p-2 h-fit">{customer.firstName}</div>
              <div className="p-2 h-fit">{customer.lastName}</div>
              <div className="p-2 h-fit whitespace-normal break-words">
                {customer.email}
              </div>
              <div className="p-2 h-fit whitespace-normal break-words">
                {customer.phone}
              </div>
              <div className="p-2 h-fit">{customer.address}</div>
              <div className="p-2 h-fit">{customer.driverLicense}</div>
              <div className="p-2 h-fit">{customer.totalPoints}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 flex gap-2">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="hover:text-orange-500"
        >
          prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            className={`w-10 h-10 rounded-full ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="hover:text-orange-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomerCards;
