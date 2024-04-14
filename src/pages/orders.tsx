import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Skeltonloader } from "../components/loader";
import { useMyOrdersQuery } from "../redux/api/ordersApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};
const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },

  {
    Header: "Status",
    accessor: "status",
  },

  {
    Header: "Action",
    accessor: "action",
  },
];
const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, error, data } = useMyOrdersQuery(user?._id!);

  if (isError) {
    const err = (error as CustomError).data.message;
    toast.error(err);
  }
  const [rows, setRows] = useState<DataType[]>([]);
  
  useEffect(() => {
    if (data)
    setRows(
  data.orders.map((i) => ({
    _id: i._id,
    amount: i.total,
    discount: i.discount,
    quantity: i.orderItems?.length || 0,
    status: (
      <span
      className={
        i.status === "Processing"
        ? "red"
        : i.status === "Shipped"
        ? "green"
        : "purple"
      }
      >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
        );
      }, [data]);
      
      // console.log(data);

      const Table = TableHOC<DataType>(
        column,
        rows,
        "dashboard-product-box",
        "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeltonloader length={20} /> : Table}
    </div>
  );
};

export default Orders;
