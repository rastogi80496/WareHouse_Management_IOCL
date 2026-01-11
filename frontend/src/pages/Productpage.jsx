import React, { useEffect, useState } from "react";
import TopNavbar from "../Components/TopNavbar";
import { IoMdAdd } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import FormattedTime from "../lib/FormattedTime ";
import {
  Addproduct,
  gettingallproducts,
  Searchproduct,
  Removeproduct,
  EditProduct,
} from "../features/productSlice";
import { gettingallCategory } from "../features/categorySlice";
import toast from "react-hot-toast";

function Productpage() {
  const { getallproduct, editedProduct, isproductadd, searchdata } = useSelector(
    (state) => state.product
  );
  const { getallCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [query, setquery] = useState("");
  const [name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Desciption, setDesciption] = useState("");
  const [dateAdded, setDateAdded] = useState(new Date().toISOString().split('T')[0]); // Initialize with current date
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(gettingallproducts());
    dispatch(gettingallCategory());
  }, [dispatch, editedProduct, isproductadd]);

  useEffect(() => {
    if (query.trim() !== "") {
      const repeatTimeout = setTimeout(() => {
        dispatch(Searchproduct(query));
      }, 500);
      return () => clearTimeout(repeatTimeout);
    } else {
      dispatch(gettingallproducts());
    }
  }, [query, dispatch]);

  const handleremove = async (productId) => {
    dispatch(Removeproduct(productId))
      .unwrap()
      .then(() => {
        toast.success("Product removed successfully");
      })
      .catch((error) => {
        toast.error(error || "Failed to remove product");
      });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    if (!selectedProduct) return;

    const updatedData = {
      name,
      Category,
      Price,
      quantity,
      Desciption,
      dateAdded: selectedProduct.dateAdded || new Date().toISOString() 
    };

    dispatch(EditProduct({ id: selectedProduct._id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully");
        setIsFormVisible(false);
        setSelectedProduct(null);
        resetForm();
      })
      .catch(() => {
        toast.error("Failed to update product");
      });
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    const productData = { 
      name, 
      Desciption, 
      Category, 
      Price, 
      quantity,
      dateAdded: new Date(dateAdded).toISOString() 
    };

    dispatch(Addproduct(productData))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully");
        resetForm();
      })
      .catch(() => {
        toast.error("Product add unsuccessful");
      });
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setDesciption("");
   
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setCategory(product.Category?._id || "");
    setPrice(product.Price);
    setQuantity(product.quantity);
    setDesciption(product.Desciption);
  
   
    setIsFormVisible(true);
  };

  const displayProducts = query.trim() !== "" ? searchdata : getallproduct;

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />

      <div className="mt-4 lg:mt-10 flex flex-col sm:flex-row gap-4 px-4 lg:px-10">
        <div className="bg-blue-950 w-full sm:w-56 rounded-xl p-4 sm:p-0 sm:h-24 flex flex-col justify-center items-center sm:items-start sm:ml-10">
          <h1 className="text-white text-sm sm:text-base font-bold sm:ml-12 sm:pt-5">Total Product</h1>
          <p className="text-white font-bold text-xl sm:pt-2 sm:ml-24">{getallproduct?.length || "0"}</p>
        </div>
        <div className="bg-blue-950 w-full sm:w-56 rounded-xl p-4 sm:p-0 sm:h-24 flex flex-col justify-center items-center sm:items-start sm:ml-10">
          <h1 className="text-white text-sm sm:text-base font-bold sm:ml-12 sm:pt-5">Total store value</h1>
          <p className="text-white font-bold text-xl sm:pt-2 sm:ml-24">$
            {getallproduct?.reduce((totalAmount, product) => {
              return totalAmount + product.Price;
            }, 0) || "0"}
          </p>
        </div>
        <div className="bg-blue-950 w-full sm:w-56 rounded-xl p-4 sm:p-0 sm:h-24 flex flex-col justify-center items-center sm:items-start sm:ml-10">
          <h1 className="text-white text-sm sm:text-base font-bold sm:ml-12 sm:pt-5">Total Category</h1>
          <p className="text-white font-bold text-xl sm:pt-2 sm:ml-24">{getallCategory?.length || "0"}</p>
        </div>
      </div>

      <div className="mt-6 lg:mt-12 px-4 lg:px-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className="flex-1 h-12 pl-4 pr-12 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your product"
          />
          <button
            onClick={() => {
              setIsFormVisible(true);
              setSelectedProduct(null);
            }}
            className="bg-blue-800 text-white w-full sm:w-40 h-12 rounded-lg flex items-center justify-center"
          >
            <IoMdAdd className="text-xl mr-2" /> <span className="sm:inline">Add Product</span>
          </button>
        </div>

        {isFormVisible && (
          <div className="fixed lg:absolute inset-0 lg:top-16 lg:right-0 lg:inset-auto bg-gray-100 lg:h-svh z-50 p-4 lg:p-6 border-2 border-gray-300 rounded-lg shadow-md transition-transform transform overflow-y-auto">
            <div className="text-right mb-4">
              <MdKeyboardDoubleArrowLeft
                onClick={() => setIsFormVisible(false)}
                className="cursor-pointer text-2xl inline-block"
              />
            </div>

            <h1 className="text-xl font-semibold mb-4">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </h1>

            <form onSubmit={selectedProduct ? handleEditSubmit : submitProduct}>
              <div className="mb-4">
                <label>Name</label>
                <input
                  value={name}
                  placeholder="Enter product name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label>Category</label>
                <select
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                >
                  <option value="">Select a category</option>
                  {getallCategory?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label>Description</label>
                <input
                  value={Desciption}
                  placeholder="Enter product description"
                  onChange={(e) => setDesciption(e.target.value)}
                  type="text"
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                  min="0"
                />
              </div>

              <div className="mb-4">
                <label>Quantity</label>
                <input
                  type="number"
                  placeholder="Enter product quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-10 px-2 border-2 rounded-lg mt-2"
                  required
                  min="0"
                />
              </div>

              

              <button
                type="submit"
                className="bg-blue-800 text-white w-full h-12 rounded-lg hover:bg-blue-700 mt-4"
              >
                {selectedProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-base-100 border mb-24 border-gray-200 rounded-lg shadow-md text-sm sm:text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold">#</th>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold">Name</th>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold hidden sm:table-cell">Category</th>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold hidden md:table-cell">Description</th>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold">Qty</th>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold">Price</th>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold hidden lg:table-cell">Date</th>
                  <th className="px-2 sm:px-3 py-2 border text-xs sm:text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(displayProducts) &&
                displayProducts.length > 0 ? (
                  displayProducts.map((product, index) => {
                    // Format the date for display
                    const formattedDate = product.dateAdded 
                      ? new Date(product.dateAdded).toLocaleDateString() 
                      : 'N/A';
                    
                    return (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-3 py-2 border">{index+1}</td>
                        <td className="px-2 sm:px-3 py-2 border font-medium">{product.name}</td>
                        <td className="px-2 sm:px-3 py-2 border hidden sm:table-cell">
                          {product.Category?.name || "No Category"}
                        </td>
                        <td className="px-2 sm:px-3 py-2 border hidden md:table-cell truncate max-w-xs">
                          {product.Desciption}
                        </td>
                        <td className="px-2 sm:px-3 py-2 border">{product.quantity}</td>
                        <td className="px-2 sm:px-3 py-2 border">${product.Price}</td>
                        <td className="px-2 sm:px-3 py-2 border hidden lg:table-cell"><FormattedTime timestamp={product?.createdAt} /></td>
                        <td className="px-2 lg:px-4 py-2 border">
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <button
                              onClick={() => handleremove(product._id)}
                              className="h-10 w-full sm:w-24 bg-red-500 hover:bg-red-700 rounded-md text-white text-sm"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleEditClick(product)}
                              className="h-10 w-full sm:w-24 bg-green-500 hover:bg-green-700 rounded-md text-white text-sm"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productpage;