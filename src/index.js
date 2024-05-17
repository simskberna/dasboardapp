import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import UsersPage from './pages/UsersPage';
import OverviewPage from './pages/OverviewPage';
import LayoutPage from './pages/LayoutPage';
import { AuthContextProvider } from './context/AuthContext';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'; 
import { PageTitleProvider } from './context/PageTitleContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChartDataContextProvider } from './context/ChartDataContext';
import { UsersDataContextProvider } from './context/UsersDataContext'; 

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
{
  path:'/',
  element:<LayoutPage/>,
  errorElement: <NotFound/>,
  children:[
    {
      path:'/overview', 
      element:<OverviewPage/>,
      errorElement: <NotFound/>
    },
    {
      path:'/users', 
      element:<UsersPage/>,
      errorElement: <NotFound/>
    }
  ]
},
{
  path:'/login',
  element:<LoginPage/>,
  errorElement: <NotFound/>
},


]);


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider> 
      <ChartDataContextProvider>
      <PageTitleProvider>  
        <RouterProvider router={router} >
          <LayoutPage />
        </RouterProvider> 
      </PageTitleProvider>
      </ChartDataContextProvider> 
    </AuthContextProvider> 
    </QueryClientProvider>
  </React.StrictMode>
);
  
