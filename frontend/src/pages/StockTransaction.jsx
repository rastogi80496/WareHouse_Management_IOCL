import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FormattedTime from "../lib/FormattedTime ";
import Stocktanscationgraph from "../lib/Stocktanscationgraph";
import {
  createStockTransaction,
  getAllStockTransactions,
  searchstockdata,
} from "../features/stocktransactionSlice";
import { gettingallSupplier } from "../features/SupplierSlice";
import { gettingallproducts } from "../features/productSlice";
import toast from "react-hot-toast";

function StockTransaction() {
  const dispatch = useDispatch();

  const { getallStocks, iscreatedStocks, searchdata } = useSelector(
    (state) => state.stocktransaction
  );
  const { getallSupplier } = useSelector((state) => state.supplier);
  const { getallproduct } = useSelector((state) => state.product);

  const [query, setquery] = useState("");
  const [product, setproduct] = useState("");
  const [type, settype] = useState("Stock-in");
  const [quantity, setquantity] = useState("");
  const [supplier, setsupplier] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    dispatch(gettingallproducts());
    dispatch(gettingallSupplier());
    dispatch(getAllStockTransactions());
  }, [dispatch]);

  /* ================= SEARCH ================= */
  useEffect(() => {
    if (query.trim() !== "") {
      const timer = setTimeout(() => {
        dispatch(searchstockdata(query));
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch(getAllStockTransactions());
    }
  }, [query, dispatch]);

  /* ================= SUBMIT ================= */
  const submitstocktranscation = (e) => {
    e.preventDefault();

    const data = {
      product,
      type,
      quantity,
      supplier,
    };

    dispatch(createStockTransaction(data))
      .unwrap()
      .then(() => {
        toast.success("Stock added successfully");
        dispatch(getAllStockTransactions());
        setproduct("");
        settype("Stock-in");
        setquantity("");
        setsupplier("");
        setIsFormVisible(false);
      })
      .catch(() => {
        toast.error("Failed to add stock");
      });
  };

  const displaystock =
    query.trim() !== "" ? searchdata : getallStocks;

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />

      <Stocktanscationgraph className="mt-10" />

      <div className="mt-12 ml-5">
        {/* SEARCH + ADD */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="w-full md:w-96 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your Stock"
          />

          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-blue-800 text-white w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" />
            Add Stock
          </button>
        </div>

        {/* ================= FORM ================= */}
        {isFormVisible && (
          <div className="absolute top-10 right-0 h-svh bg-base-100 p-6 border-2 border-gray-300 rounded-lg shadow-md">
            <div className="text-right">
              <MdKeyboardDoubleArrowLeft
                onClick={() => setIsFormVisible(false)}
                className="cursor-pointer text-2xl"
              />
            </div>

            <h1 className="text-xl font-semibold mb-4">
              Add Product
            </h1>

            <form onSubmit={submitstocktranscation}>
              <div className="mb-4">
                <label>Product</label>
                <select
                  value={product}
                  onChange={(e) => setproduct(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="">Select a product</option>
                  {getallproduct?.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label>Type</label>
                <select
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="Stock-in">Stock-in</option>
                  <option value="Stock-out">Stock-out</option>
                </select>
              </div>

              <div className="mb-4">
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                />
              </div>

              <div className="mb-4">
                <label>Supplier</label>
                <select
                  value={supplier}
                  onChange={(e) => setsupplier(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                >
                  <option value="">Select a Supplier</option>
                  {getallSupplier?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg mt-4"
              >
                {iscreatedStocks ? "Adding..." : "Add Stock"}
              </button>
            </form>
          </div>
        )}

        {/* ================= TABLE ================= */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Stock Transaction List
          </h2>

          <table className="min-w-full bg-base-100 border mb-24">
            <thead>
              <tr>
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Date</th>
                <th className="border px-3 py-2">Product</th>
                <th className="border px-3 py-2">Type</th>
                <th className="border px-3 py-2">Quantity</th>
                <th className="border px-3 py-2">Supplier</th>
              </tr>
            </thead>

            <tbody>
              {displaystock?.length > 0 ? (
                displaystock.map((s, i) => (
                  <tr key={s._id}>
                    <td className="border px-3 py-2">{i + 1}</td>
                    <td className="border px-3 py-2">
                      <FormattedTime timestamp={s.transactionDate} />
                    </td>
                    <td className="border px-3 py-2">
                      {s.product?.name || "-"}
                    </td>
                    <td className="border px-3 py-2">{s.type}</td>
                    <td className="border px-3 py-2">{s.quantity}</td>
                    <td className="border px-3 py-2">
                      {s.supplier?.name || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No stock transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StockTransaction;