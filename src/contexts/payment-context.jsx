import { createContext, useContext, useEffect, useState } from "react";
import paymentApi from "../apis/payment";


const PaymentContext = createContext()

export default function PaymentContextProvider({ children }) {
    const [allPayment, setAllPayment] = useState()
    const [isAllPaymentLoading, setIsAllPaymentLoading] = useState(true)
    const [monthlyPayments, setMonthlyPayments] = useState(null)
    const [allPaymentComplete , setAllPaymentComplete] = useState(null)
    const today = new Date();
    const currentMonth = today.getMonth() + 1

    const fetchPayment = async () => {
        try {
            const paymentRes = await paymentApi.getAllPayment()
            const data = paymentRes.data.message.reduce((acc, item) => {
                const paymentData = {
                    bookingId: item.bookingId,
                    paymentId: item.paymentId,
                    customer: item.Booking.Customer.firstName + ' ' + item.Booking.Customer.lastName,
                    paymentDate: item.paymentDate.split('T')[0].split('-').join('/'),
                    amount: '฿' + item.amount.toLocaleString(),
                    status: item.paymentStatus.charAt(0).toUpperCase() + item.paymentStatus.slice(1),
                    createdAt: item.createdAt.split('T')[0]
                }
                acc.push(paymentData)
                return acc
            }, [])
            setMonthlyPayments(data.filter(item => parseInt(item.createdAt.split('-')[1]) === currentMonth))
            setAllPayment(data.sort((a, b) => b.bookingId - a.bookingId))
            setAllPaymentComplete(data.filter(item => item.status === 'Complete'))
        } catch (error) {
            console.log(error)
        } finally {
            setIsAllPaymentLoading(false)
        }
    }

    useEffect(() => {
        fetchPayment()
    }, [])

    return (
        <PaymentContext.Provider value={{ allPayment, isAllPaymentLoading, monthlyPayments, allPaymentComplete }}>{children}</PaymentContext.Provider>
    )
}

export function usePayment() {
    return useContext(PaymentContext)
}