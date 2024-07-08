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
    const currentItem =
        currentPath === '/bookings' ? allBooking
            : currentPath === '/cars' ? allCar
                : currentPath === '/customers' ? allCustomer
                    : currentPath === '/payments' ? allPaymentComplete
                        : null
    useEffect(() => {
        setCurrentPage(1); // Reset to the first page on search or sort
    }, [searchTerm, sortKey, currentPath]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortKey(event.target.value);
    };

    const filteredItems = currentItem?.filter((item) => {
        const searchTermLower = searchTerm.toLowerCase();
        if (currentPath === '/bookings') {
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
        }
        if (currentPath === '/cars') {
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
            )
        }
        if (currentPath === '/customers') {
            return (
                item.firstName.toLowerCase().includes(searchTermLower) ||
                item.lastName.toLowerCase().includes(searchTermLower) ||
                item.email.toLowerCase().includes(searchTermLower) ||
                item.phone.includes(searchTerm) ||
                item.address.toLowerCase().includes(searchTermLower) ||
                item.driverLicense.toLowerCase().includes(searchTermLower) ||
                item.totalPoints.toString().includes(searchTerm)
            )
        }
        if (currentPath === '/payments') {
            return (
                item.bookingId.toString().includes(searchTermLower) ||
                item.paymentId.toString().includes(searchTermLower) ||
                item.customer.toLowerCase().includes(searchTermLower) ||
                dayjs(item.paymentDate).format('DD/MM/YYYY').toLowerCase().includes(searchTermLower) ||
                item.amount.toString().includes(searchTermLower) ||
                item.status.toLowerCase().includes(searchTermLower)
            )
        }
    });

    const sortedItems = filteredItems?.sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        if (sortKey === 'startDate' || sortKey === 'endDate') {
            return new Date(valueB) - new Date(valueA); // Sorty Start and End Date by Descending Order
        }

        if (sortKey === 'paymentDate') {
            return new Date(valueB) - new Date(valueA); // Sort by payment date in descending order
        }

        if (sortKey === 'updatedAt' || sortKey === 'useDate') {
            return new Date(valueB) - new Date(valueA);
        }

        if (sortKey === 'amount') {
            // return new Date(valueB) - new Date(valueA); // Sort by amount in descending order
            return valueB - valueA; // Sort by amount in descending order
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueA - valueB;
        }

        // ตรงนี้มีบัค กดแล้วไม่เรียงจากมากไปน้อยให้
        if (sortKey === 'totalPoints') {
            return valueB - valueA; // Descending order for totalPoints
        }

        if (sortKey === 'customerId') {
            return valueA - valueB; // Ascending order for customerId
        }

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
    });

    const searchedItems = searchTerm === '' ? currentItem : filteredItems; // Make pagination equal to searched payments, not exceeding it
    const totalPage = Math.ceil(searchedItems?.length / cardPerPage); // Have to declare here or cause initialization error
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
