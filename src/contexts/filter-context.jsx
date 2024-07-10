import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { useBooking } from "./booking-context";
import { useCars } from "./car-context";
import { useCustomer } from '../contexts/customer-context';
import { usePayment } from "./payment-context";
import dayjs from "dayjs";
import Pagination from "../components/Pagination";


const FilterContext = createContext()

export default function FilterContextProvider({ children }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('');
    const { allBooking } = useBooking()
    const { allCar } = useCars()
    const { allCustomer } = useCustomer()
    const { allPaymentComplete } = usePayment()
    const [currentPage, setCurrentPage] = useState(1)
    const cardPerPage = 10
    const currentPath = useLocation().pathname
    // set currentItm by path 
    let currentItem;
    switch (currentPath) {
        case '/bookings':
            currentItem = allBooking;
            break;
        case '/cars':
            currentItem = allCar;
            break;
        case '/customers':
            currentItem = allCustomer;
            break;
        case '/payments':
            currentItem = allPaymentComplete;
            break;
        default:
            currentItem = null;
    }

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page on search or sort
    }, [searchTerm, sortKey, currentPath]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortKey(event.target.value);
    };

    // filter item by currentItem for render when handle searchTerm
    const filteredItems = currentItem?.filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();
        // check path for select key then set filteredItem
        switch (currentPath) {
            case '/bookings':
                return (
                    item.id.toString().includes(searchTermLower) ||
                    item.customer.toLowerCase().includes(searchTermLower) ||
                    item.car.toLowerCase().includes(searchTermLower) ||
                    item.plate.toLowerCase().includes(searchTermLower) ||
                    dayjs(item.startDate).format('DD/MM/YYYY').toLowerCase().includes(searchTermLower) ||
                    dayjs(item.endDate).format('DD/MM/YYYY').toLowerCase().includes(searchTermLower) ||
                    item.amount.toString().includes(searchTermLower) ||
                    item.pickup.toLowerCase().includes(searchTermLower) ||
                    item.dropoff.toLowerCase().includes(searchTermLower) ||
                    item.time.toLowerCase().includes(searchTermLower) ||
                    item.status.toLowerCase().includes(searchTermLower)
                );
            case '/cars':
                return (
                    item.brand.toLowerCase().includes(searchTermLower) ||
                    item.model.toLowerCase().includes(searchTermLower) ||
                    item.color.toLowerCase().includes(searchTermLower) ||
                    item.plate.toLowerCase().includes(searchTermLower) ||
                    item.region.toLowerCase().includes(searchTermLower) ||
                    item.airport.toLowerCase().includes(searchTermLower) ||
                    item.useDate.toLowerCase().includes(searchTermLower) ||
                    dayjs(item.updatedAt).format('DD/MM/YYYY').toLowerCase().includes(searchTermLower) ||
                    item.status.toLowerCase().includes(searchTermLower)
                );
            case '/customers':
                return (
                    item.firstName.toLowerCase().includes(searchTermLower) ||
                    item.lastName.toLowerCase().includes(searchTermLower) ||
                    item.email.toLowerCase().includes(searchTermLower) ||
                    item.phone.includes(searchTerm) ||
                    item.address.toLowerCase().includes(searchTermLower) ||
                    item.driverLicense.toLowerCase().includes(searchTermLower) ||
                    item.totalPoints.toString().includes(searchTerm)
                );
            case '/payments':
                return (
                    item.bookingId.toString().includes(searchTermLower) ||
                    item.paymentId.toString().includes(searchTermLower) ||
                    item.customer.toLowerCase().includes(searchTermLower) ||
                    dayjs(item.paymentDate).format('DD/MM/YYYY').toLowerCase().includes(searchTermLower) ||
                    item.amount.toString().includes(searchTermLower) ||
                    item.status.toLowerCase().includes(searchTermLower)
                );
            default:
                return null;
        }
    });
    // set sortedItems
    const sortedItems = filteredItems?.sort((a, b) => {
        let valueA = a[sortKey];
        let valueB = b[sortKey];
        // change value to lowercase when typeof value === 'string
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }
        switch (sortKey) {
            case 'startDate':
            case 'endDate':
                return new Date(valueB) - new Date(valueA); // Sort Start and End Date in Descending Order

            case 'paymentDate':
                return new Date(valueB) - new Date(valueA); // Sort by payment date in Descending order

            case 'updatedAt':
            case 'useDate':
                return new Date(valueB) - new Date(valueA); // Sort UpdatedAt or useDate in Descending Order

            case 'amount':
                return valueB - valueA; // Sort by amount in Descending order

            case 'totalPoints':
                return valueB - valueA; // Descending order for totalPoints

            case 'customerId':
                return valueA - valueB; // Ascending order for customerId

            default:
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
        }
    });

    const totalPage = Math.ceil(sortedItems?.length / cardPerPage); // Have to declare here or cause initialization error
    const indexOfLastPaymentPerPage = currentPage * cardPerPage;
    const firstIndexOfPaymentPerPage = indexOfLastPaymentPerPage - cardPerPage;
    const currentItemPerPage = sortedItems?.slice(firstIndexOfPaymentPerPage, indexOfLastPaymentPerPage);

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

    const pagination = () => {
        return (
            <Pagination
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage}
                currentPage={currentPage}
                totalPage={totalPage}
                handleChangePage={handleChangePage}
            />
        )
    }

    return (
        <FilterContext.Provider value={{
            handleSearch,
            handleSort,
            searchTerm,
            sortKey,
            currentItemPerPage,
            currentPage,
            totalPage,
            handleChangePage,
            goToNextPage,
            goToPrevPage,
            pagination
        }}>{children}</FilterContext.Provider>
    )
}

export function useFilter() {
    return useContext(FilterContext)
}
