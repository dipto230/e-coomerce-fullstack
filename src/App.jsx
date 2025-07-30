import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import { Toaster } from 'sonner'
import Login from './pages/Login';
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionPage from './pages/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'
import CheckOut from './components/Cart/CheckOut'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage'
import AdminLayout from './components/Admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserManagment from './components/Admin/UserManagment'
import AdminProductManagement from './components/Admin/AdminProductManagement'
import EditProductPage from './components/Admin/EditProductPage'

const App = () => {
  return (

    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplat: true  }}>
      <Toaster position='top-right'/>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path='collections/:collection' element={<CollectionPage />}></Route>
          <Route path='products/:id' element={<ProductDetails />} />
          <Route path='checkout' element={<CheckOut />} />
          <Route path='order-confirmation' element={<OrderConfirmationPage />} />
          <Route path='order/:id' element={<OrderDetailsPage />} />
        <Route path="order/:id/my-orders" element={<MyOrdersPage />} />


          
        </Route>
        
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminHomePage />} />
          <Route path='users' element={<UserManagment />} />
          <Route path="products" element={<AdminProductManagement />} />
           <Route path="products/:id/edit" element={<EditProductPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App