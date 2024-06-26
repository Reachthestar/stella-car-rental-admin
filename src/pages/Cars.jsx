import CarsCards from "../components/CarsCards";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCars } from "../contexts/car-context";

export default function Cars() {
  const { isAllCarLoading } = useCars()
  return (
    <div>
      {isAllCarLoading ?
        <div className="pt-5">
          <LoadingSpinner />
        </div>
        :
        <CarsCards />
      }
    </div>
  );
}
