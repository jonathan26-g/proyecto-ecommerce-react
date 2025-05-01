import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import NavbarC from "./components/navbar/NavbarC";
import FooterC from "./components/footer/FooterC";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import RegisterPage from "./pages/RegisterPage";

import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminCreateUpdateProduct from "./pages/AdminCreateUpdateProduct";
import UserCartPage from "./pages/UserCartPage";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import ErrorPage from "./pages/ErrorPage"; 
import './App.css';

import UserFavoritos from "./pages/UserFavoritos";







function App() {
  return (
    <Router>
      <div className="app-container">
        <NavbarC />

        <div className="main-content">
          <Routes>
            
            <Route path="/AdminPage" element={
              <PrivateRoute rol="admin">
                <AdminPage />
              </PrivateRoute>
            } />

            <Route path="/AdminPage/user" element={
              <PrivateRoute rol="admin">
                <AdminUsersPage />
              </PrivateRoute>
            } />

            <Route path="/AdminPage/Products" element={
              <PrivateRoute rol="admin">
                <AdminProductsPage />
              </PrivateRoute>
            } />

            <Route path="/AdminCreateUpdateProduct" element={
              <PrivateRoute rol="admin">
                <AdminCreateUpdateProduct />
              </PrivateRoute>
            } />

            <Route path="/UserPage" element={
              <PrivateRoute rol="usuario">
                <UserPage />
              </PrivateRoute>
            } />

            <Route path="/UserCartPage" element={
              <PrivateRoute rol="usuario">
                <UserCartPage />
              </PrivateRoute>
            } />

            
            <Route path="/" element={<HomePage />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/registerPage" element={<RegisterPage />} />
            <Route path="/ProductDetail/:id" element={<ProductDetail />} />
            <Route path="*" element={<ErrorPage />} /> 

            <Route path="/UserFavoritos" element={<UserFavoritos />} />


 
          </Routes>
        </div>

        <FooterC />
      </div>
    </Router>
  );
}

export default App;
