import { NavLink } from "react-router";

const App = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div>Home Page</div>
      <NavLink className={"bg-amber-500 rounded-md p-1"} to={"/shop/products"}>
        View All Products
      </NavLink>
      
    </div>
  );
};

export default App;
