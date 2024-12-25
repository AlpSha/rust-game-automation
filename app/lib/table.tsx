import { fetchFilteredOrders, fetchMapInfo } from "@/app/lib/orders-service";
import OrdersTableClient from "@/app/lib/orders-table-client";

export default async function OrdersTable({
  itemName,
  currencyItemName,
  currentPage,
}: {
  itemName: string;
  currencyItemName: string;
  currentPage: number;
}) {
  // Fetch them in parallel
  const [orders, mapInfo] = await Promise.all([
    fetchFilteredOrders({ itemName, currencyItemName, currentPage }),
    fetchMapInfo(),
  ]);

  return (
    <div className="mt-6 flow-root">
      <OrdersTableClient orders={orders} mapInfo={mapInfo}/>
    </div>
  );
}
