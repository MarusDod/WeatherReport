import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyToast: React.FC = () => createPortal(
    (<ToastContainer
        autoClose={4000}
        closeButton={true}
        position={'top-center'}
        newestOnTop={true}
        hideProgressBar={true}
        limit={3} />),
    document.getElementById('toast-root')!
)

export default MyToast