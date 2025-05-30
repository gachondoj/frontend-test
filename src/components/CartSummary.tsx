import CartSummaryList from "./CartSummaryList";
import { useCart } from "@/hooks/useCart";

const CartSummary = () => {
  const { items, total } = useCart();

  return (
    <div className="border border-gray-200 rounded-lg px-6 py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="font-bold text-gray-600 text-2xl">Order Summary</div>
        <div className="font-normal text-gray-600 text-lg">
          {items.length} items
        </div>
      </div>
      <div className="flex flex-col py-5 gap-6">
        <CartSummaryList games={items} />

        <div className="border w-full border-gray-200" />

        <div className="flex w-full justify-between font-bold text-gray-600 text-xl">
          <div>Order Total</div>
          <div>${total}</div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
