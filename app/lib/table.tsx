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
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{order.item_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{order.quantity}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {order.currency_item_name}
                    </p>
                    <p>{order.cost_per_item}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Buy Item Name
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Quantity
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Sell Item Name
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Quantity
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Stock
              </th>
            </tr>
            </thead>
            <tbody className="bg-white">
            {orders?.map((order) => (
              <tr
                key={order.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
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
