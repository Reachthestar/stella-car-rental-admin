import Header from './Header';
import Filter from './Filter';
import { useFilter } from '../contexts/filter-context';

function CustomerCards() {
  const {
    searchTerm,
    sortKey,
    handleSearch,
    handleSort,
    currentItemPerPage,
    pagination,
  } = useFilter()

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
        {currentItemPerPage?.map((customer) => (
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
      {pagination()}
    </div>
  );
}

export default CustomerCards;
