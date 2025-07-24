import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './screen/Home';

import Form from "./screen/Form";
import Signup from "./screen/Signup";
import { CartProvider } from "./components/CartProvider";
import { ToastContainer } from "react-toastify";
import Dashboard from "../src/admin/Dashboard"
import "react-toastify/dist/ReactToastify.css";
import AdminLoginForm from "./admin/components/AdminLoginForm";
import AdminSignupForm from "./admin/components/AdminSignupForm";
function App() {

  return (
    <CartProvider>
      <Router>
        <div>
          <ToastContainer position="top-center" hideProgressBar autoClose={5000} />
          <Routes>
            <Route exact path="/Home" element={<Home />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/Login" element={<Form></Form>}></Route>
            <Route exact path="/Signup" element={<Signup></Signup>}></Route>

            {/* Admin Routes */}
            <Route exact path="/Admin" element={<Dashboard></Dashboard>}></Route>
            <Route exact path="/Admin/Login" element={<AdminLoginForm/>}></Route>
            <Route exact path="/Admin/Signup" element={<AdminSignupForm/>}></Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
