import React, {useState} from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function ModalWrapper() {

  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState("login");


  return (
    <>
      <a
        className="md:p-4 py-2 block hover:text-lime-600 text-2xl"
        onClick={() => setShowModal(true)}
      >
        Authenticate
      </a>
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            </div>
            {modalContent === "login" ? (<LoginModal modalContent={[modalContent, setModalContent]}/>)
              : modalContent === "register" ? (<RegisterModal modalContent={[modalContent, setModalContent]}/>) : ""}
          </div>
        </div>
      </>
    </>
  );
}