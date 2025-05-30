"use client";
import CartSummary from "@/components/CartSummary";
import Link from "@/components/Link";
import CartList from "@/components/CartList";
import Button from "@/components/Button";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
  const { items, removeItem } = useCart();

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 py-8 px-6 md:py-12 md:px-32">
      <div className="w-full flex items-start">
        <Link href="/">
          <div className="flex gap-2">
            <i className="ri-arrow-left-line" />
            <div>Back to Catalog</div>
          </div>
        </Link>
      </div>

      {items.length > 0 ? (
        <>
          <div className="flex flex-col gap-3 w-full items-start justify-start ">
            <div className="font-bold text-primary-600 text-4xl">Your Cart</div>
            <div className="text-primary-600 text-2xl font-normal">
              {items.length} {items.length > 1 ? "items" : "item"}
            </div>
          </div>
          <div className="w-full flex gap-20 flex-col md:flex-row">
            <CartList cart={items} removeFromCart={removeItem} />
            <div className="w-full flex flex-col gap-8">
              <CartSummary />
              <Button onClick={() => {}} variant="gray">
                Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center h-full">
          <div className="flex flex-col items-center">
            NO ITEMS ON CART
            <Link href="/">GO BACK</Link>
          </div>
        </div>
      )}
    </main>
  );
}
