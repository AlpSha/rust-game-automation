import '@/app/ui/global.css'
import { Suspense } from "react";
import OrdersPage from "@/app/lib/orders-page";

export default async function Home(props: { searchParams?: Promise<{ buy: string; sell: string; page: number }> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersPage searchParams={props.searchParams}></OrdersPage>
    </Suspense>
  );
}
