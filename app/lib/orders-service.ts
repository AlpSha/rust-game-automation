export const fetchOrders = async (): Promise<RustOrder[]> => {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3000' : ''
  const response = await fetch(`${baseUrl}/api/orders`, {
    next: { revalidate: 900 }, // Revalidate every 15 minutes
  });

  const data = await response.json();
  return data;
}

const ITEMS_PER_PAGE = 10;

export const fetchFilteredOrders = async ({ itemName, currencyItemName, currentPage }: {
  itemName: string,
  currencyItemName: string,
  currentPage: number,
}): Promise<RustOrder[]> => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const orders = await fetchOrders();
  const itemNameLower = itemName.toLowerCase();
  const currencyItemNameLower = currencyItemName.toLowerCase();
  const filteredOrders = orders.filter(order => {
    return order.item_name.toLowerCase().includes(itemNameLower) &&
      order.currency_item_name.toLowerCase().includes(currencyItemNameLower);
  });
  return filteredOrders.slice(offset, offset + ITEMS_PER_PAGE);
}

export const fetchOrdersPages = async ({ itemName, currencyItemName }: {
  itemName: string,
  currencyItemName: string,
}): Promise<number> => {
  const orders = await fetchOrders();
  const itemNameLower = itemName.toLowerCase();
  const currencyItemNameLower = currencyItemName.toLowerCase();
  const filteredOrders = orders.filter(order => {
    return order.item_name.toLowerCase().includes(itemNameLower) &&
      order.currency_item_name.toLowerCase().includes(currencyItemNameLower);
  });
  return Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
}

export type RustOrder = {
  id: string;
  quantity: number;
  item_name: string;
  currency_item_name: string;
  cost_per_item: number;
  amount_in_stock: number;
  coordinates: {
    x: number;
    y: number;
  };
  marker_name: string;
}
