import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { addToCart, loadProducts, productDetail } from "../feautres/cartSlice";
import { useNavigate } from "react-router";
import AnimatePage from "../animation/AnimatePage";
import SideBar from "./SideBar";
import { selectDarkMode } from "../feautres/themeSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);
  
  const items = useSelector((state) => state.allCart.items);
  const [productFilter, setProductsFilter] = useState(items);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; 

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadProducts()); 
  }, [dispatch]);

  useEffect(() => {
    setProductsFilter(items);

  
    const uniqueCategories = [...new Set(items.map((item) => item.category))];
    setCategories(uniqueCategories);

    console.log(uniqueCategories, 'uniqueCategories')
  }, [items]);

 
  const showProductCard = (item) => {
    dispatch(productDetail(item));
    navigate("/productDetails");
  };


  const setAllCategory = () => {
    setProductsFilter(items);
  };


  const filterP = (cat) => {
    const result = items.filter((item) => item.category === cat);
    setProductsFilter(result);
  };


  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setAllCategory();
    } else {
      filterP(value);
    }
  };


   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = productFilter.slice(indexOfFirstProduct, indexOfLastProduct);
 

  return (
    <>
      <AnimatePage>
        <section className={`${darkMode ? "bg-blue-400 text-white" : "bg-white text-gray-900"}  py-10 text-gray-700 sm:py-16 lg:py-8 font-['Cairo']`}>
          <div className="mx-auto max-w-screen-xl">
            <form className="flex justify-center ml-2">
              <select
                defaultValue={"all"}
                onChange={handleSelectChange}
                className="min-[676px]:hidden bg-gray-50 font-medium border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="all">{t("All Products")}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {t(category)}
                  </option>
                ))}
              </select>
              <div className="relative w-full ml-4 rounded-lg">
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="search"
                  placeholder="Search"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg outline-blue-600 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                />
                <button type="button" className="absolute right-0 top-0 mt-2 mr-4">
                  <BsSearch className="text-blue-400 w-8 h-6" />
                </button>
              </div>
            </form>

            <SideBar categories={categories} filterP={filterP} setAllCategory={setAllCategory} />

            <div className="mt-6 ml-56 max-[676px]:ml-3 grid grid-cols-3 gap-1 md:grid-cols-4 sm:grid-cols-3 sm:gap-1 lg:mt-6 lg:grid-cols-5 lg:gap-1">
              {currentProducts
                .filter((item) =>
                  searchTerm === "" || item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                  <article key={item.id} className="bg-slate-100 p-2 rounded-md w-74 h-92">
                    <div className="aspect-square overflow-hidden">
                      <img
                        onClick={() => showProductCard(item)}
                        className="object-contain group-hover:scale-125 transition-all duration-300 cursor-pointer"
                        src={item.img}
                        alt="product_image"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="cursor-pointer hover:text-blue-500 text-[18px]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold sm:text-sm md:text-base">
                      {t("MAD")} {item.price} 
                        <del className="block text-xs text-blue-400"> {t("MAD")}{item.lastPrice} </del>
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="bg-blue-600 text-white transition hover:bg-blue-700 rounded-md px-2 py-1"
                    >
                      {t("addToCart")}
                    </button>
                    <ToastContainer position={"top-right"} autoClose={1000} />
                  </article>
                ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastProduct >= productFilter.length}
                className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </AnimatePage>
    </>
  );
}



