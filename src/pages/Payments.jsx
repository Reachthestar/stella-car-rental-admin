import LoadingSpinner from "../components/LoadingSpinner";
import PaymentCards from "../components/PaymentCards";
import { usePayment } from "../contexts/payment-context";

export default function Payments() {
  const { isAllPaymentLoading } = usePayment()
  return (
    <>
      {isAllPaymentLoading ?
        <div className='h-full flex items-center'>
          <LoadingSpinner />
        </div>
        :
        <PaymentCards />}
    </>
  );
}
