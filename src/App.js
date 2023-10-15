import AboutPage from "./Components/Pages/AboutPage";
import CheckoutPage from "./Components/Pages/CheckoutPage";
import ErrorPage from "./Components/Pages/ErrorPage";
import HomePage from "./Components/Pages/HomePage";
// import MainPage from "./Components/Pages/MainPage";
import Products from "./Components/Pages/Products";
import Welcome from "./Components/StarterPage/Welcome";
import SingleProduct from './Components/Pages/SingleProductPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Nav from "./Components/component/Navbar";
import Sidebar from "./Components/component/Sidebar";
import CartPage from "./Components/Pages/CartPage";
import PrivateRoute from "./Components/Pages/PrivateRoute";
import AuthWrapper from "./Components/Pages/AuthWrapper";
function App() {
  return (
    <AuthWrapper>
    <Router>
      {/* <Nav /> */}
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Welcome />}></Route>
        <Route exact path="/About" element={<AboutPage />}></Route>
        <Route exact path="/HomePage" element={<HomePage />}></Route>
        {/* <Route exact path="/mainpage" element={<HomePage />}></Route> */}
        <Route exact path="/Products" element={<Products />} />
        
        <Route exact path="/Checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />

        <Route exact path='/Products/:id' element={<SingleProduct />} />
        <Route exact path='/Cart' element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </AuthWrapper>
  );
}

export default App;
