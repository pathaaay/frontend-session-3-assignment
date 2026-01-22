import { Outlet, useNavigate, useParams } from "react-router";
import { fetchProductById } from "../queries/product";

const SingleProductLayout = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  if (!productId) {
    navigate("/");
    return;
  }

  const { data, isFetching, error } = fetchProductById(productId);

  return (
    <div className="">
      <Outlet context={{ data, isFetching, error }} />
    </div>
  );
};

export default SingleProductLayout;
