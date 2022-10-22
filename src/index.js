import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { GeneralProvider } from './context/generalcontext.component';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';

// import { render } from 'react-dom';
//for react18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </GeneralProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// const root = document.getElementById('root'); // <- This is the //correct method call for React version 17

// render(

//   <React.StrictMode>
//     <BrowserRouter>
//       <GeneralProvider>
//         <App />
//       </GeneralProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   root
// );

serviceWorkerRegistration.unregister();
reportWebVitals();
