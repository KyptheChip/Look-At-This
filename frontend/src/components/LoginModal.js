import React, {useState} from "react";
import RegisterModal from "./RegisterModal";

export default function LoginModal(props) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = () => {

  }
  return (
    <>
      <a
        className="md:p-4 py-2 block hover:text-lime-600 text-2xl"
        onClick={() => setShowLoginModal(true)}
      >
        Login
      </a>
      {showLoginModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div
                  className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Login
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowLoginModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form id="loginForm" className="w-full max-w-xs bg-white flex flex-col py-5 px-8" action="">
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Username</label>
                    <input
                      className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                      type="text" placeholder="Username"/>
                      <label className="text-gray-700 font-bold py-2" htmlFor="">Password</label>
                      <input
                        className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                        type="password" placeholder="********"/>
                        <div className="flex justify-between items-center my-4">

                        </div>

                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button onClick={() => setShowLoginModal(false)} form="loginForm" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4">
                    Sign In
                  </button>
                  {/*<button*/}
                  {/*  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
                  {/*  type="button"*/}
                  {/*  onClick={() => setShowModal(false)}*/}
                  {/*>*/}
                  {/*  Close*/}
                  {/*</button>*/}
                  {/*<button*/}
                  {/*  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
                  {/*  type="button"*/}
                  {/*  onClick={() => setShowModal(false)}*/}
                  {/*>*/}
                  {/*  Submit*/}
                  {/*</button>*/}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </>
      ) : null}
    </>
  );
}
