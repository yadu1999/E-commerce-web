import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {  useDispatch } from "react-redux";
import "./css_files/showProduct.css";
import AnimatePage from "../animation/AnimatePage";
import {
  // selectUserEmail,
  // selectUserName,
  // selectUserPic,
  setActiveState,
} from "../feautres/userSlice";
import { auth } from "../firebase/firebaseConfig";
import {GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const userName = useSelector(selectUserName);
  // const userEmail = useSelector(selectUserEmail);
  // const pic = useSelector(selectUserPic);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate(); 


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  


  const handelSignInGoogle = async () => {
    const provider = new GoogleAuthProvider(); 

    try {
      setDisable(true);

      const data = await signInWithPopup(auth, provider); 

      dispatch(
        setActiveState({
          userName: data.user.displayName?.split(" ")[0] || "User",
          userEmail: data.user.email,
          pic: data.user.photoURL,
        })
      );
      navigate("/");
      console.log("User signed in successfully:", data.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);

     
      if (error.code === "auth/popup-closed-by-user") {
        setDisable(false);
        alert("You closed the sign-in popup. Please try again.");
      } else if (error.code === "auth/cancelled-popup-request") {
        setDisable(false);
        alert("Multiple popups opened. Please try again.");
      } else {
        setDisable(false);
        alert("Sign-in failed. Please check your connection and try again.");
      }
    } finally {
      setDisable(false); 
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Both fields are required.");
      return;
    }

    setErrorMessage("");
    
    localStorage.setItem("name", email.split('@')[0].split('.')[0]);
        localStorage.setItem("email", email);
        localStorage.setItem("photo", email.split('@')[0].split('.')[0]);

    navigate("/");
  };


  return (
    <section className=" bg-gray-100 bg-gradient-to-br font-['Cairo']">
      <AnimatePage>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-white">
                {t("signIn")}
              </h1>
              <div className="grid space-y-4 p-4">
                <button disabled={disable} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div
                    onClick={handelSignInGoogle}
                    
                    className="relative flex items-center space-x-4 justify-center"
                  >
                  

                    <span  className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      {t("withGoogle")}
                    </span>
                  </div>
                </button>

              </div>
              <hr className="border-t mx-2 border-grey-light" />
              <p className="text-[34px] font-bolder text-gray-800">
                {t("login")}
              </p>
              <form onClick={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white align-start"
                  >
                    {t("yourEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                 
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                   {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        {t("remember")}
                      </label>
                    </div>
                  </div>
                  {/* <a
                    href="/"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {t("forget")}
                  </a> */}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-blue-400 to-sky-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                >
                  {t("login")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </AnimatePage>
    </section>
  );
};

export default Login;
