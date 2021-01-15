import React from "react";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const { message } = useSelector((st) => st.general);
  const toastyMessage = () => {
    if (message.type === "error") {
      toast.error(<Alert message={message.text} />, { toastId: 1 });
    } else if (message.type === "success") {
      toast.success(<Alert message={message.text} />, {
        toastId: 2,
      });
    } else {
      toast(<Alert message={message.text} />, { toastId: 3 });
    }
  };

  message && toastyMessage();

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Toast;
