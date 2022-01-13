import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

export default function RegisterModal(props) {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const [user, setUser] = useState(
    {
      id: 0,
      email: "",
      username: "",
      password: "",
      roles: []
    }
  )

  const handleChange = event => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
    console.log(user)
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    )
      .then(response => response.json
      )
      .then(() => console.log("creat"))
      .then(() => setShowRegisterModal(false))
      .catch(function(){})
  }
  return (
    <>
      <button
        className="md:p-4 py-2 block hover:text-lime-600 text-2xl"
        onClick={() => {
          setShowRegisterModal(true)
        }}
      >
        Register
      </button>
      {showRegisterModal ? (
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
                    Register
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowRegisterModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit} id="registerForm" name="registerForm" className="w-full max-w-xs bg-white flex flex-col py-5 px-8" action="">
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Email</label>
                    <input
                      value={user.email}
                      onChange={handleChange}
                      className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                      name="email"
                      type="text" placeholder="Email"/>
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Username</label>
                    <input
                      value={user.username}
                      onChange={handleChange}
                      className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
                      name="username"
                      type="text" placeholder="Username"/>
                    <label className="text-gray-700 font-bold py-2" htmlFor="">Password</label>
                    <input
                      value={user.password}
                      onChange={handleChange}
                      className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
                      name="password"
                      type="password" placeholder="********"/>
                    <div className="flex justify-between items-center my-4">

                    </div>

                  </form>
                </div>
                {/*footer*/}
                <div
                  className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button onClick={() => {
                    // setShowRegisterModal(false)
                  }} form="registerForm" type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4">
                    Submit
                  </button>
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
