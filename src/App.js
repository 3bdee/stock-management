import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import UsersList from "./pages/Users/UsersList";
import UsersOrder from "./pages/Users/UsersOrder";
import ProviderOrders from "./pages/Provider/ProviderOrders";
import ProviderList from "./pages/Provider/ProviderList";
import Analytics from "./pages/Analytics/Analytics";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/Signup/Signup";
import AddCommandCli from "./Components/AddCommandCli/AddCommandCli";
import Product from "./pages/Product/Product";
import Client from "./pages/Client/Client";
import AddProduct from "./pages/Product/AddProduct";
import CommandTable from "./Components/CommandTable/CommandTable";
import AddCommandPro from "./Components/addCommandPro/addCommandPro";
import ClientsCommands from "./pages/Client/ClientsCommands";
import ShowCategorie from "./Components/ShowCategorie/ShowCategorie";
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/Login" />;
  };
  console.log(currentUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route
              path="Dashboard"
              element={
                <RequiredAuth>
                  <Dashboard />
                </RequiredAuth>
              }
            />
            <Route path="Login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="Users">
              <Route
                index
                element={
                  <RequiredAuth>
                    <UsersList />
                  </RequiredAuth>
                }
              />
            </Route>
            <Route
              path="UsersList"
              element={
                <RequiredAuth>
                  <UsersList />
                </RequiredAuth>
              }
            />
            <Route
              path="CommandClient"
              element={
                <RequiredAuth>
                  <CommandTable />
                </RequiredAuth>
              }
            />
            <Route
              path="Client"
              element={
                <RequiredAuth>
                  <Client />
                </RequiredAuth>
              }
            >
              <Route
                path="addCommand"
                element={
                  <RequiredAuth>
                    <ClientsCommands />
                  </RequiredAuth>
                }
              />
            </Route>
            <Route path="Provider">
              <Route
                index
                element={
                  <RequiredAuth>
                    <ProviderList />
                  </RequiredAuth>
                }
              />
              <Route
                path="providerOrders"
                element={
                  <RequiredAuth>
                    <ProviderOrders />
                  </RequiredAuth>
                }
              />
            </Route>
            <Route
              path="Product"
              element={
                <RequiredAuth>
                  <Product />
                </RequiredAuth>
              }
            />
            <Route
              path="AddProduct"
              element={
                <RequiredAuth>
                  <AddProduct />
                </RequiredAuth>
              }
            />
            <Route
              path="Analytics"
              element={
                <RequiredAuth>
                  <Analytics />
                </RequiredAuth>
              }
            />
            <Route
              path="ProviderOrders/:ids"
              element={
                <RequiredAuth>
                  <AddCommandPro />
                </RequiredAuth>
              }
            />
            <Route
              path="Product/:ids"
              element={
                <RequiredAuth>
                  <ShowCategorie />
                </RequiredAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
