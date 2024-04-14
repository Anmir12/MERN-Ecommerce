import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useGetAllProductsQuery } from "../../redux/api/productApi";
import { RootState, server } from "../../redux/store";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useDispatch, useSelector } from "react-redux";
import { Skeltonloader } from "../../components/loader";
import { refetchProduct } from "../../redux/reducers/cartReducer";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isRefetch } = useSelector((state: RootState) => state.cartReducer);
  const { isLoading, isError, error, data } = useGetAllProductsQuery(
    user?._id!
  );
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (isError) {
      const err = (error as CustomError).data.message;
      toast.error(err);
    }
  }, [isError, error]);
 
  useEffect(() => {
    if (isRefetch) {
      dispatch(refetchProduct(false));
    }
  }, [isRefetch, dispatch]);

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeltonloader length={20} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;