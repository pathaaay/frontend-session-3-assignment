import { NavLink } from "react-router";

const App = () => {
  return (
    <div className="flex items-center justify-center flex-col h-52 gap-5">
      <div className="font-bold text-xl">Home Page</div>
      <NavLink className={"bg-amber-500 rounded-md p-1"} to={"/shop/products"}>
        View All Products
      </NavLink>
      
    </div>
  );
};

export default App;
