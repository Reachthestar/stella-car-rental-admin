import React, { useState } from "react";

const initialCustomers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    driverLicense: "D1234567",
    totalPoints: 150,
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    address: "456 Elm St, Othertown, USA",
    driverLicense: "E7654321",
    totalPoints: 200,
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "555-123-4567",
    address: "789 Oak St, Sometown, USA",
    driverLicense: "F1234567",
    totalPoints: 250,
  },
];

function CustomerCards() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortKey(event.target.value);
    const sortedCustomers = [...customers].sort((a, b) => {
      if (a[event.target.value] < b[event.target.value]) return -1;
      if (a[event.target.value] > b[event.target.value]) return 1;
      return 0;
    });
    setCustomers(sortedCustomers);
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.driverLicense.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
          className="ml-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Sort by</option>
          <option value="id">ID</option>
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
        <div className="bg-gray-100 rounded-lg p-5 shadow-lg w-full">
          <div className="grid grid-cols-9 text-center font-bold">
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
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-lg p-5 shadow-lg w-full"
          >
            <div className="grid grid-cols-9 text-center items-center">
              <div className="p-2 h-fit">{customer.id}</div>
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
    </div>
  );
}

export default CustomerCards;
