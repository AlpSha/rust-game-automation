import React, { Suspense } from "react";
import { fetchOrdersPages } from "@/app/lib/orders-service";
import OrdersTable from "@/app/lib/table";
import Search from "@/app/lib/search";
import { OrdersTableSkeleton } from "@/app/lib/skeletons";
import Pagination from "@/app/lib/pagination";

export default async function OrdersPage(props: {
  searchParams?: Promise<{
    buy: string;
    sell: string;
    page: number;
  }>
}) {
  const searchParams = await props.searchParams;
  const itemName = searchParams?.buy || '';
  const currencyItemName = searchParams?.sell || '';
  const currentPage = searchParams?.page || 1;
  const totalPages = await fetchOrdersPages({ itemName, currencyItemName });
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={'text-2xl'}>Orders</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search name="buy" placeholder="Search items to buy..."/>
        <Search name="sell" placeholder="Search items to sell..."/>
      </div>
      <Suspense key={itemName + currencyItemName + currentPage} fallback={<OrdersTableSkeleton/>}>
        <OrdersTable currencyItemName={currencyItemName} itemName={itemName} currentPage={currentPage}></OrdersTable>

      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages}/>
      </div>
    </div>
  );
}
