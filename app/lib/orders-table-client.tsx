"use client";
import { useState } from "react";
import { MapInfo, RustOrder } from "@/app/lib/orders-service";

export default function OrdersTableClient({ orders, mapInfo }: { orders: RustOrder[], mapInfo: MapInfo }) {
  const [selectedOrder, setSelectedOrder] = useState<RustOrder | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRowClick = (order: RustOrder) => {
    console.log('Row clicked:', order);
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="inline-block min-w-full align-middle">
        <div className="table-wrapper">
          <div className="md:hidden">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="mobile-table-card clickable-row"
                onClick={() => handleRowClick(order)}
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
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Buy Item</th>
              <th scope="col" className="px-3 py-5 font-medium">Quantity</th>
              <th scope="col" className="px-3 py-5 font-medium">Pay With</th>
              <th scope="col" className="px-3 py-5 font-medium">Cost</th>
              <th scope="col" className="px-3 py-5 font-medium">Stock</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="clickable-row"
                onClick={() => handleRowClick(order)}
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p>{order.item_name}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">{order.quantity}</td>
                <td className="whitespace-nowrap px-3 py-3">{order.currency_item_name}</td>
                <td className="whitespace-nowrap px-3 py-3">{order.cost_per_item}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  <p>{order.amount_in_stock}</p>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Popup */}
      {isPopupOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-container">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <p><strong>Item:</strong> {selectedOrder.item_name}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Currency Item:</strong> {selectedOrder.currency_item_name}</p>
            <p><strong>Cost Per Item:</strong> {selectedOrder.cost_per_item}</p>
            <p><strong>Stock:</strong> {selectedOrder.amount_in_stock}</p>
            <p><strong>Shop Name:</strong> {selectedOrder.marker_name}</p>
            <p><strong>Grid:</strong> {getGridName(selectedOrder.coordinates.x, selectedOrder.coordinates.y, mapInfo)}
            </p>
            <button
              onClick={closePopup}
              className={"primary-button"}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Convert a column index (0-based) into Rust-style grid letters:
 *  0 -> A
 *  1 -> B
 *  ...
 *  25 -> Z
 *  26 -> AA
 *  27 -> AB
 *  ...
 */
function colIndexToLetters(colIndex: number): string {
  let letters = "";
  let n = colIndex;

  while (true) {
    // In "base-26" style, but 'A' is digit 0
    const remainder = n % 26;
    letters = String.fromCharCode(remainder + 65) + letters; // 65 -> 'A'
    n = Math.floor(n / 26) - 1;

    if (n < 0) {
      break;
    }
  }

  return letters;
}

/**
 * Given X,Y in [0..totalSize], return the Rust grid label (like "E11").
 *
 * @param x X coordinate
 * @param y Y coordinate
 * @param mapWidth Playable width (e.g. 3250)
 * @param margin Map margin (e.g. 500)
 * @returns Grid label e.g. "E11", "AC23"
 */
function getGridName(
  x: number,
  y: number,
  mapInfo: MapInfo,
): string {
  const cellSize = 150;
  const xOffset = 100;
  const yOffset = 250;
  const mapHeight = mapInfo.height + mapInfo.margin * 2;

  // Figure out which column and row we fall into:
  const colIndex = Math.floor((x + xOffset) / cellSize);  // zero-based
  const rowIndex = Math.floor((mapHeight - y + yOffset) / cellSize);  // zero-based

  // Convert colIndex -> Letters
  const colLetters = colIndexToLetters(colIndex);

  // Combine
  return `${colLetters}${rowIndex}`;
}
