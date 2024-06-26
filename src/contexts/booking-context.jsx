import { createContext, useContext, useEffect, useState } from "react";
import bookingApi from "../apis/booking";


const BookingContext = createContext()

export default function BookingContextProvider({ children }) {
    const [allBooking, setAllBooking] = useState(null)
    const [isAllBookingLoading, setAllBookingLoading] = useState(true)
    const [monthlyBookings, setMonthlyBookings] = useState(null)
    const [bookingBrand, setBookingBrand] = useState(null)
    const today = new Date();
    const currentMonth = today.getMonth() + 1

    const fetchBooking = async () => {
        try {
            const bookingRes = await bookingApi.getAllBooking()
            const data = bookingRes.data.message.reduce((acc, item) => {
                const dataBooking = {
                    id: item.bookingId,
                    customer: item.Customer.firstName,
                    car: item.Car.CarModel.brand + ' ' + item.Car.CarModel.model + ' ' + item.Car.CarModel.color,
                    plate: item.Car.licensePlate,
                    startDate: item.startDate.split('T')[0].split('-').join('/'),
                    endDate: item.endDate.split('T')[0].split('-').join('/'),
                    amount: '฿' + ' ' + item.totalAmount.toLocaleString(),
                    pickup: item.PickupLocation.branchName,
                    dropoff: item.DropoffLocation.branchName,
                    time: item.pickDropTime,
                    status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
                    createdAt: item.createdAt.split('T')[0]
                }
                acc.push(dataBooking)
                return acc
            }, [])
            const bookingBrandData = data.reduce((acc, item) => {
                if (acc[item.car]) {
                    acc[item.car]++;
                } else {
                    acc[item.car] = 1;
                }
                return acc;
            }, {});
            const bookingBrandDataArray = Object.keys(bookingBrandData).map(key => {
                return { brand: key, count: bookingBrandData[key] };
            });
            setBookingBrand(bookingBrandDataArray)
            setMonthlyBookings(data.filter(item => parseInt(item.createdAt.split('-')[1]) === currentMonth))
            setAllBooking(data.sort((a, b) => b.id - a.id))
        } catch (error) {
            console.log(error)
        } finally {
            setAllBookingLoading(false)
        }
    }
    useEffect(() => {
        fetchBooking()
    }, [])

    return (
        <BookingContext.Provider value={{
            allBooking,
            isAllBookingLoading,
            fetchBooking,
            monthlyBookings,
            bookingBrand
        }}>
            {children}
        </BookingContext.Provider>
    )
}

export function useBooking() {
    return useContext(BookingContext)
}


