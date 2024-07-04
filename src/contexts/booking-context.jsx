import { createContext, useContext, useEffect, useState } from "react";
import bookingApi from "../apis/booking";

const BookingContext = createContext();

export default function BookingContextProvider({ children }) {
  const [allBooking, setAllBooking] = useState(null);
  const [isAllBookingLoading, setAllBookingLoading] = useState(true);
  const [monthlyBookings, setMonthlyBookings] = useState(null);
  const [yearlyBookings, setYearlyBookings] = useState(null);
  const [popularCarsMonthly, setPopularCarsMonthly] = useState([]);
  const [popularCarsYearly, setPopularCarsYearly] = useState([]);
  const [bookingBrand, setBookingBrand] = useState(null);
  const [totalPaymentPerMonth, setTotalPaymentPerMonth] = useState(null);
  const [pickupByBranchPerYear, setPickupByBranchPerYear] = useState(null);
  const [pickupByBranchPerMonth, setPickupByBranchPerMonth] = useState(null);
  const [dropOffByBranchPerYear, setDropOffByBranchPerYear] = useState(null);
  const [dropOffByBranchPerMonth, setDropOffByBranchPerMonth] = useState(null);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const fetchBooking = async () => {
    try {
      const bookingRes = await bookingApi.getAllBooking();
      const data = bookingRes.data.message.reduce((acc, item) => {
        const dataBooking = {
          id: item.bookingId,
          carModelId: item.Car.CarModel.carModelId,
          customer: item.Customer.firstName,
          car:
            item.Car.CarModel.brand +
            " " +
            item.Car.CarModel.model +
            " " +
            item.Car.CarModel.color,
          plate: item.Car.licensePlate,
          startDate: item.startDate.split("T")[0].split("-").join("/"),
          endDate: item.endDate.split("T")[0].split("-").join("/"),
          amount: item.totalAmount,
          pickup: item.PickupLocation.branchName,
          dropoff: item.DropoffLocation.branchName,
          time: item.pickDropTime,
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
          createdAt: item.createdAt.split("T")[0],
        };
        acc.push(dataBooking);
        return acc;
      }, []);

      // Filter bookings for the current year
      const bookingsThisYear = data.filter(
        (item) => new Date(item.createdAt).getFullYear() === currentYear
      );

      // Filter bookings for the current month
      const bookingsThisMonth = data.filter((item) => {
        const date = new Date(item.createdAt);
        return (
          date.getFullYear() === currentYear &&
          date.getMonth() + 1 === currentMonth
        );
      });

      // Set State with Year Filter
      setYearlyBookings(bookingsThisYear);
      // Set State with Month Filter
      setMonthlyBookings(bookingsThisMonth);

      const calculateCarPopularity = (bookings) => {
        return bookings.reduce((acc, item) => {
          const car = item.car;
          if (!acc[car]) {
            acc[car] = 0;
          }
          acc[car] += 1;
          return acc;
        }, {});
      };

      const popularCarsMonthlyData = calculateCarPopularity(bookingsThisMonth);
      const popularCarsYearlyData = calculateCarPopularity(bookingsThisYear);

      setPopularCarsMonthly(
        Object.keys(popularCarsMonthlyData).map((key) => ({
          car: key,
          count: popularCarsMonthlyData[key],
        }))
      );

      setPopularCarsYearly(
        Object.keys(popularCarsYearlyData).map((key) => ({
          car: key,
          count: popularCarsYearlyData[key],
        }))
      );

      const countBranchByBooking = (bookings) => {
        const branchCounts = bookings.reduce((acc, item) => {
          const branch = item.pickup;
          if (!acc[branch]) {
            acc[branch] = 0;
          }
          acc[branch] += 1;
          return acc;
        }, {});

        const sortedBranchCounts = Object.keys(branchCounts)
          .map((branch) => ({
            branch,
            bookingTimes: branchCounts[branch],
          }))
          .sort((a, b) => b.bookingTimes - a.bookingTimes);

        return sortedBranchCounts;
      };

      const countDropBranchByBooking = (bookings) => {
        const branchCounts = bookings.reduce((acc, item) => {
          const branch = item.dropoff;
          if (!acc[branch]) {
            acc[branch] = 0;
          }
          acc[branch] += 1;
          return acc;
        }, {});

        const sortedDropBranchCounts = Object.keys(branchCounts)
          .map((branch) => ({
            branch,
            dropTimes: branchCounts[branch],
          }))
          .sort((a, b) => b.dropTimes - a.dropTimes);

        return sortedDropBranchCounts;
      };

      const branchBookingCountsYear = countBranchByBooking(bookingsThisYear);
      const branchBookingCountsMonth = countBranchByBooking(bookingsThisMonth);
      const dropBranchCountsYear = countDropBranchByBooking(bookingsThisYear);
      const dropBranchCountsMonth = countDropBranchByBooking(bookingsThisMonth);

      setPickupByBranchPerYear(branchBookingCountsYear);
      setPickupByBranchPerMonth(branchBookingCountsMonth);
      setDropOffByBranchPerYear(dropBranchCountsYear);
      setDropOffByBranchPerMonth(dropBranchCountsMonth);

      setAllBooking(data.sort((a, b) => b.id - a.id));

      const bookingBrandData = data.reduce((acc, item) => {
        if (acc[item.car]) {
          acc[item.car]++;
        } else {
          acc[item.car] = 1;
        }
        return acc;
      }, {});
      const bookingBrandDataArray = Object.keys(bookingBrandData).map((key) => {
        return { brand: key, count: bookingBrandData[key] };
      });
      setBookingBrand(bookingBrandDataArray);

      const totalPaymentPerMonth = bookingRes.data.message.reduce(
        (acc, item) => {
          const month = new Date(item.createdAt).getMonth();
          acc[month] = (acc[month] || 0) + item.totalAmount;
          return acc;
        },
        Array(12).fill(0)
      );

      setTotalPaymentPerMonth(totalPaymentPerMonth);
    } catch (error) {
      console.log(error);
    } finally {
      setAllBookingLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        allBooking,
        isAllBookingLoading,
        fetchBooking,
        monthlyBookings,
        yearlyBookings,
        popularCarsMonthly,
        popularCarsYearly,
        bookingBrand,
        totalPaymentPerMonth,
        currentMonth,
        currentYear,
        pickupByBranchPerYear,
        pickupByBranchPerMonth,
        dropOffByBranchPerYear,
        dropOffByBranchPerMonth,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
