import React, { useState, useEffect } from 'react';
import { useCustomer } from '../contexts/customer-context';
import Pagination from './Pagination';
import Header from './Header';
import Filter from './Filter';

function CustomerCards() {
  const { allCustomer, fetchCustomer } = useCustomer();
  const [customers, setCustomers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
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

      if (key === 'totalPoints') {
        return valueB - valueA; // Descending order for totalPoints
      }

      if (key === 'customerId') {
        return valueA - valueB; // Ascending order for customerId
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
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
  const totalPage = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <Filter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortKey={sortKey}
        handleSort={handleSort}
        filterItem={[
          { value: 'customerId', text: 'ID' },
          { value: 'firstName', text: 'First Name' },
          { value: 'lastName', text: 'Last Name' },
          { value: 'email', text: 'Email' },
          { value: 'phone', text: 'Phone' },
          { value: 'address', text: 'Address' },
          { value: 'driverLicense', text: 'Driver License' },
          { value: 'totalPoints', text: 'Total Points' },
        ]}
      />
      <div className="grid grid-cols-1 gap-4 w-full">
        <Header
          addClass="grid-cols-8"
          columns={[
            'ID',
            'First Name',
            'Last Name',
            'Email',
            'Phone',
            'Address',
            'Driver License',
            'Total Points',
          ]}
        />
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
      <Pagination
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        currentPage={currentPage}
        totalPage={totalPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}

export default CustomerCards;
