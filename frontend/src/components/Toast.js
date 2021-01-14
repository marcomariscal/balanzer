import React from "react";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const { errors, successMsg, message } = useSelector((st) => st.general);
  const toastyMessage = () =>
    toast(<Alert messages={message} />, { toastId: "1" });
  const toastyError = () =>
    toast.error(<Alert messages={errors} />, { toastId: "2" });
  const toastySuccess = () =>
    toast.success(
      <Alert
        messages={successMsg.length === 1 ? [...successMsg] : successMsg}
      />,

      { toastId: "3" }
    );

  if (errors && errors.length) {
    toastyError();
  } else if (successMsg) {
    toastySuccess();
  } else if (message) {
    toastyMessage();
  }

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
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
