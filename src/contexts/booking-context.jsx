import { createContext, useContext, useEffect, useState } from "react";
import bookingApi from "../apis/booking";


const BookingContext = createContext()

export default function BookingContextProvider({ children }) {
    const [allBooking, setAllBooking] = useState()
    const [isAllBookingLoading, setAllBookingLoading] = useState(true)
    const fetchBooking = async () => {
        try {
            const bookingRes = await bookingApi.getAllBooking()
            const data = bookingRes.data.message.reduce((acc, item) => {
                const dataBooking = {
                    id: item.bookingId,
                    customer: item.Customer.firstName,
                    car: item.Car.CarModel.brand + ' ' + item.Car.CarModel.model,
                    plate: item.Car.licensePlate,
                    startDate: item.startDate.split('T')[0],
                    endDate: item.endDate.split('T')[0],
                    amount: '฿' + ' ' + item.totalAmount.toLocaleString(),
                    pickup: item.PickupLocation.branchName,
                    dropoff: item.DropoffLocation.branchName,
                    time: item.pickDropTime,
                    status: item.status
                }
                acc.push(dataBooking)
                return acc
            }, [])
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
        <BookingContext.Provider value={{ allBooking, isAllBookingLoading, fetchBooking }}>{children}</BookingContext.Provider>
    )
}

export function useBooking() {
    return useContext(BookingContext)
}


