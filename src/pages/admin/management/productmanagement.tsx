import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeltonloader } from "../../../components/loader";
import {
  useDeleteProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { RootState, server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductDetailsQuery(params.id!);

  const [nameUpdate, setNameUpdate] = useState<string>("");
  const [priceUpdate, setPriceUpdate] = useState<number>(0);
  const [stockUpdate, setStockUpdate] = useState<number>(0);
  const [categoryUpdate, setCategoryUpdate] = useState<string>("");
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (data) {
      const { name, price, stock, category, photo } = data.product;
      setNameUpdate(name);
      setPriceUpdate(price);
      setStockUpdate(stock);
      setCategoryUpdate(category);
      setPhotoUpdate(`${server}/${photo}`);
    }
  }, [data]);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", nameUpdate);
    formData.set("price", priceUpdate.toString());
    formData.set("stock", stockUpdate.toString());
    formData.set("category", categoryUpdate);
    if (photoFile) formData.set("photo", photoFile);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product?._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product?._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeltonloader length={20} />
        ) : (
          <>
            <section>
              <strong>ID - {data?.product?._id}</strong>
              <img src={photoUpdate} alt="Product" />
              <p>{nameUpdate}</p>
              <span className={stockUpdate > 0 ? "green" : "red"}>
                {stockUpdate === 0 ? "Not Available" : `${stockUpdate} Available`}
              </span>
              <h3>₹{priceUpdate}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>
                {photoUpdate && <img src={photoUpdate} alt="New Image" />}
                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
