import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SidebarProvider } from './Components/context/SidebarContext';
import { FilterProvider } from './Components/context/FilterContext';
import { CartProvider } from './Components/context/CartContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './Components/context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Auth0Provider domain={process.env.REACT_APP_AUTH_DOMAIN}
  clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
  cacheLocation='localstorage'
  authorizationParams={{
    redirect_uri: window.location.origin
  }}>
    <UserProvider>
    <SidebarProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </SidebarProvider>
    </UserProvider>
    </Auth0Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
