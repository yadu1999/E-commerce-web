
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  getCartTotal,
  removeFromCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  clearCart,  // Assuming you have this action to clear the cart
} from "../feautres/cartSlice.js";
import axios from "axios";
import AnimatePage from "../animation/AnimatePage.jsx";
import "./css_files/test.css";

const Confirmation = () => {
  const { t } = useTranslation();
  const { cart, totalQuantity, totalPrice } = useSelector((state) => state.allCart);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the order data
    const orderData = {
      name,
      phone,
      address,
      city,
      cart,
      totalPrice,
    };

    try {
      const response = await axios.post("http://localhost:4050/api/submit-order", orderData);

      if (response.status === 200) {
        toast.success("Your order has been placed successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Clear cart and reset form fields after successful order
        dispatch(clearCart());
        setName("");
        setPhone("");
        setAddress("");
        setCity("");

        // Redirect to a success page or any other page after the order is placed
        navigate("/");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("There was an issue placing your order. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <AnimatePage>
      <div className="container p-4 font-['Cairo']">
        <div className="mt-1 ml-4 absolute" onClick={() => navigate("/card")}>
          <BsArrowLeft
            size={25}
            className="cursor-pointer hover:text-tb font-semibold"
          />
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-2">
            <h4 className="d-flex justify-content-between align-items-center mb-2 sm:mt-8 ">
              <span className="text-muted max-[667px]:ml-14 ">{t("orders")}</span>
              <span className="badge badge-secondary badge-pill">
                {cart.length}
              </span>
            </h4>
            {cart?.map((item) => (
              <div className="border w-full rounded mt-2 flex p-4 justify-between items-center flex-wrap">
                <img src={item.img} className="w-12" alt="product_photo" />
                <div className="w-2/3">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-red-600 text-xs">
                    Sold by <b>Joey Khan</b>
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-medium">
                    <sup className="text-sm text-blue-400"> {t("MAD")} </sup>
                    {item.price}
                  </h4>
                </div>
                <div className="w-full flex justify-between mt-2">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-700 hover:bg-red-100 px-2"
                  >
                    {t("delete")}
                  </button>

                  <div className="container1 block uppercase tracking-wide text-gray-700 ">
                    <button
                      className="button"
                      onClick={() => dispatch(decreaseItemQuantity(item.id))}
                    >
                      -
                    </button>
                    <div className="count">{item.quantity}</div>
                    <button
                      className="button"
                      onClick={() => dispatch(increaseItemQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <hr />
            <div className="bg-white rounded shadow p-2 w-full">
              <div class="flex justify-between mt-1">
                <p className="text-sm text-gray-800 font-semibold ">{t("totlalQ")}</p>
                <p className="text-sm text-gray-800 font-semibold ">{totalQuantity}</p>
              </div>
              <div class="flex justify-between mt-1">
                <p className="text-sm text-gray-800 font-semibold">{t("total")}</p>
                <p className="text-sm text-gray-800 font-semibold">{totalPrice} {t("MAD")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-8 order-md-1">
            <h4 className="mb- mt-2">{t("fill")}</h4>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate="">
              <div className="mb-3 text-left">
                <label htmlFor="fullName" className="text-left">{t("name")}</label>
                <div className="input-group mt-2">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder={t("name")}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="phone">{t("phone")}</label>
                <input
                  type="tel"
                  className="form-control mt-2"
                  id="phone"
                  placeholder="+212 6 45 78 956"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="address">{t("adress")}</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="address"
                  placeholder={t("adress")}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3 text-left">
                <label htmlFor="city">{t("city")}</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="city"
                  placeholder={t("city")}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <hr className="mb-4" />
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-blue-600"
              >
                {t("confirmation")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default Confirmation;
































// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BsArrowLeft } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   getCartTotal,
//   removeFromCart,
//   decreaseItemQuantity,
//   increaseItemQuantity,
// } from "../feautres/cartSlice.js";
// import axios from "axios";
// import AnimatePage from "../animation/AnimatePage.jsx";
// import "./css_files/test.css";

// const Confirmation = () => {
//   const { t } = useTranslation();
//   const { cart, totalQuantity, totalPrice } = useSelector((state) => state.allCart);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCartTotal());
//   }, [cart, dispatch]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Prepare the order data
//     const orderData = {
//       name,
//       phone,
//       address,
//       city,
//       cart,
//       totalPrice,
//     };

//     try {
//       const response = await axios.post("http://localhost:4050/api/submit-order", orderData);

//       console.log(response, 'oppo')
//       if (response.status === 200) {
//       toast.success("Your order has been placed successfully");
//       console.log(response.status, 'oppo25558')

//         // Redirect to success page after order is placed
//         // navigate("/order-success");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("There was an issue placing your order. Please try again.");
//     }
//   };

//   return (
//     <AnimatePage>
//       <div className="container p-4 font-['Cairo']">
//         <div className="mt-1 ml-4 absolute" onClick={() => navigate("/card")}>
//           <BsArrowLeft
//             size={25}
//             className="cursor-pointer hover:text-tb font-semibold"
//           />
//         </div>
//         <div className="row">
//           <div className="col-md-4 order-md-2 mb-2">
//             <h4 className="d-flex justify-content-between align-items-center mb-2 sm:mt-8 ">
//               <span className="text-muted max-[667px]:ml-14 ">{t("orders")}</span>
//               <span className="badge badge-secondary badge-pill">
//                 {cart.length}
//               </span>
//             </h4>
//             {cart?.map((item) => (
//               <div className="border w-full rounded mt-2 flex p-4 justify-between items-center flex-wrap">
//                 <img src={item.img} className="w-12" alt="product_photo" />
//                 <div className="w-2/3">
//                   <h3 className="text-lg font-medium">{item.title}</h3>
//                   <p className="text-red-600 text-xs">
//                     Sold by <b>Joey Khan</b>
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-2xl font-medium">
//                     <sup className="text-sm text-blue-400"> {t("MAD")} </sup>
//                     {item.price}
//                   </h4>
//                 </div>
//                 <div className="w-full flex justify-between mt-2">
//                   <button
//                     onClick={() => dispatch(removeFromCart(item.id))}
//                     className="text-red-700 hover:bg-red-100 px-2"
//                   >
//                     {t("delete")}
//                   </button>

//                   <div className="container1 block uppercase tracking-wide text-gray-700 ">
//                     <button
//                       className="button"
//                       onClick={() => dispatch(decreaseItemQuantity(item.id))}
//                     >
//                       -
//                     </button>
//                     <div className="count">{item.quantity}</div>
//                     <button
//                       className="button"
//                       onClick={() => dispatch(increaseItemQuantity(item.id))}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <hr />
//             <div className="bg-white rounded shadow p-2 w-full">
//               <div class="flex justify-between mt-1">
//                 <p className="text-sm text-gray-800 font-semibold ">{t("totlalQ")}</p>
//                 <p className="text-sm text-gray-800 font-semibold ">{totalQuantity}</p>
//               </div>
//               <div class="flex justify-between mt-1">
//                 <p className="text-sm text-gray-800 font-semibold">{t("total")}</p>
//                 <p className="text-sm text-gray-800 font-semibold">{totalPrice} {t("MAD")}</p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-8 order-md-1">
//             <h4 className="mb- mt-2">{t("fill")}</h4>
//             <form onSubmit={handleSubmit} className="needs-validation" noValidate="">
//               <div className="mb-3 text-left">
//                 <label htmlFor="fullName" className="text-left">{t("name")}</label>
//                 <div className="input-group mt-2">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="fullName"
//                     placeholder={t("name")}
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="mb-3 text-left">
//                 <label htmlFor="phone">{t("phone")}</label>
//                 <input
//                   type="tel"
//                   className="form-control mt-2"
//                   id="phone"
//                   placeholder="+212 6 45 78 956"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3 text-left">
//                 <label htmlFor="address">{t("adress")}</label>
//                 <input
//                   type="text"
//                   className="form-control mt-2"
//                   id="address"
//                   placeholder={t("adress")}
//                   required
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3 text-left">
//                 <label htmlFor="city">{t("city")}</label>
//                 <input
//                   type="text"
//                   className="form-control mt-2"
//                   id="city"
//                   placeholder={t("city")}
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//               </div>
//               <hr className="mb-4" />
//               <button
//                 type="submit"
//                 className="group inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-blue-600"
//               >
//                 {t("confirmation")}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </AnimatePage>
//   );
// };

// export default Confirmation;













// import React from "react";
// import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { BsArrowLeft } from "react-icons/bs";
// import { useEffect } from "react";
// import {
//   getCartTotal,
//   removeFromCart,
//   decreaseItemQuantity,
//   increaseItemQuantity,
// } from "../feautres/cartSlice.js";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import AnimatePage from "../animation/AnimatePage.jsx";
// import "./css_files/test.css";

// const Confirmation = () => {
//   const { t } = useTranslation();
//   const { cart, totalQuantity, totalPrice } = useSelector(
//     (state) => state.allCart
//   );
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getCartTotal());
//   }, [cart, dispatch]);
//   return (
//     <AnimatePage>
//       <div className="container p-4 font-['Cairo']">
//         <div className="mt-1 ml-4 absolute" onClick={() => navigate("/card")}>
//           <BsArrowLeft
//             size={25}
//             className="cursor-pointer hover:text-tb font-semibold"
//           />
//         </div>
//         <div className="row">
//           <div className="col-md-4 order-md-2 mb-2">
//             <h4 className="d-flex justify-content-between align-items-center mb-2 sm:mt-8 ">
//               <span className="text-muted max-[667px]:ml-14 ">{t("orders")}</span>
//               <span className="badge badge-secondary badge-pill">
//                 {cart.length}
//               </span>
//             </h4>
//             {cart?.map((item) => (
//               <div className="border w-full rounded mt-2 flex p-4 justify-between items-center flex-wrap">
//                 <img src={item.img} className="w-12" alt="product_photo" />
//                 <div className="w-2/3">
//                   <h3 className="text-lg font-medium">{item.title}</h3>
//                   <p className="text-red-600 text-xs">
//                     Sold by <b>Joey Khan</b>
//                   </p>
//                 </div>
//                 <div>
//                   <h4 className="text-2xl font-medium">
//                     <sup className="text-sm text-blue-400"> {t("MAD")} </sup>
//                     {item.price}
//                   </h4>
//                 </div>
//                 <div className="w-full flex justify-between mt-2">
//                   <button
//                     onClick={() => dispatch(removeFromCart(item.id))}
//                     className="text-red-700 hover:bg-red-100 px-2"
//                   >
//                     {t("delete")}
//                   </button>

//                   <div className="container1 block uppercase tracking-wide text-gray-700 ">
//                     <button
//                       className="button"
//                       onClick={() => dispatch(decreaseItemQuantity(item.id))}
//                     >
//                       -
//                     </button>
//                     <div className="count">{item.quantity}</div>
//                     <button
//                       className="button"
//                       onClick={() => dispatch(increaseItemQuantity(item.id))}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <hr />
//             <div className="bg-white rounded shadow p-2 w-full">
//               <div class="flex justify-between mt-1">
//                 <p className="text-sm text-gray-800 font-semibold ">
//                   {t("totlalQ")}
//                 </p>
//                 <p className="text-sm text-gray-800 font-semibold ">
//                   {totalQuantity}
//                 </p>
//               </div>
//               <div class="flex justify-between mt-1">
//                 <p className="text-sm text-gray-800 font-semibold">
//                   {t("total")}
//                 </p>
//                 <p className="text-sm text-gray-800 font-semibold">
//                   {totalPrice} {t("MAD")}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-8 order-md-1">
//             <h4 className="mb- mt-2">{t("fill")}</h4>
//             <form className="needs-validation" noValidate="">
//               <div className="mb-3 text-left">
//                 <label htmlFor="fullName" className="text-left">
//                   {t("name")}
//                 </label>
//                 <div className="input-group mt-2">
//                   <input
//                     type="name"
//                     className="form-control "
//                     id="fullName"
//                     placeholder={t("name")}
//                     required=""
//                   />
//                   <div className="invalid-feedback">
//                     {" "}
//                     Your name is required.{" "}
//                   </div>
//                 </div>
//               </div>
//               <div className="mb-3 text-left">
//                 <label htmlFor="email">{t("phone")} </label>
//                 <input
//                   type="tel"
//                   className="form-control mt-2"
//                   id="phone"
//                   placeholder="+212 6 45 78 956"
//                 />
//                 <div className="invalid-feedback">
//                   {" "}
//                   Please enter a valid phone number{" "}
//                 </div>
//               </div>
//               <div className="mb-3 text-left">
//                 <label htmlFor="address">{t("adress")}</label>
//                 <input
//                   type="text"
//                   className="form-control mt-2"
//                   id="address"
//                   placeholder={t("adress")}
//                   required=""
//                 />
//                 <div className="invalid-feedback">
//                   {" "}
//                   Please enter your shipping address.{" "}
//                 </div>
//               </div>
//               <div className="mb-3 text-left">
//                 <label htmlFor="address2">{t("city")}</label>
//                 <input
//                   type="text"
//                   className="form-control mt-2"
//                   id="city"
//                   placeholder={t("city")}
//                 />
//               </div>

//               <hr className="mb-4" />
//               <button
//                 onClick={() => navigate("/confirmation")}
//                 type="button"
//                 className="group inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-blue-600"
//               >
//                 {t("confirmation")}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                   />
//                 </svg>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </AnimatePage>
//   );
// };

// export default Confirmation;
