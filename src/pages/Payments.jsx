import LoadingSpinner from "../components/LoadingSpinner";
import PaymentCards from "../components/PaymentCards";
import { usePayment } from "../contexts/payment-context";

export default function Payments() {
  const { isAllPaymentLoading } = usePayment()
  return (
    <div>
      {isAllPaymentLoading ? <LoadingSpinner /> : <PaymentCards />}
    </div>
  );
}
