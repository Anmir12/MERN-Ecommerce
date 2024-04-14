import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { Skeltonloader } from "../../../components/loader";
import { useLineQuery } from "../../../redux/api/dashBoardApi";
import { RootState } from "../../../redux/store";
import { getLastMonths } from "../../../utils/features";

const Linecharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isError, isLoading } = useLineQuery(user?._id!);

  if (isError) {
    return <Navigate to={"/admin/dashboard"} />
  }

  const users = data?.charts.users || [];
  const products = data?.charts.products || [];
  const revenue = data?.charts.revenue || [];
  const discount = data?.charts.discount || [];
  const { last12Months } = getLastMonths();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        {isLoading ? (
          <Skeltonloader length={20} />
        ) : (
          <>
            {" "}
            <section>
              <LineChart
                data={users}
                label="Users"
                borderColor="rgb(53, 162, 255)"
                labels={last12Months}
                backgroundColor="rgba(53, 162, 255, 0.5)"
              />
              <h2>Active Users</h2>
            </section>
            <section>
              <LineChart
                data={products}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                labels={last12Months}
                label="Products"
              />
              <h2>Total Products (SKU)</h2>
            </section>
            <section>
              <LineChart
                data={revenue}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenue"
                labels={last12Months}
              />
              <h2>Total Revenue </h2>
            </section>
            <section>
              <LineChart
                data={discount}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discount"
                labels={last12Months}
              />
              <h2>Discount Allotted </h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Linecharts;
