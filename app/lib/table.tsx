import { fetchFilteredOrders } from "@/app/lib/orders-service";

export default async function OrdersTable({
  itemName,
  currencyItemName,
  currentPage,
}: {
  itemName: string;
  currencyItemName: string;
  currentPage: number;
}) {
  const orders = await fetchFilteredOrders({ itemName, currencyItemName, currentPage });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="table-wrapper">
          <div className="md:hidden">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="mobile-table-card"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{order.item_name} x {order.quantity}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="info-text">Buy Item</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{order.currency_item_name} x {order.cost_per_item}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="info-text">Cost</p>
                    </div>
                  </div>
                </div>
                <div className="justify-self-end">
                  <p>
                    Stock: {order.amount_in_stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <table>
            <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Buy Item
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Quantity
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Pay With
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Cost
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Stock
              </th>
            </tr>
            </thead>
            <tbody>
            {orders?.map((order) => (
              <tr
                key={order.id}
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{order.item_name}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {order.quantity}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {order.currency_item_name}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {order.cost_per_item}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <p>{order.amount_in_stock}</p>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
