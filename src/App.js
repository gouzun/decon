import { React, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import CreateDefectPage1 from './component/createdefect/createdefectpage1.component';

import NavBar from './navigation/navbar/navbar.component';
import MainMenu from './navigation/mainmenu/mainmenu.component.jsx'
import AddProjectFile from './component/projectfile/addprojectfile.component.jsx';
import ViewDefects from './component/viewdefects/viewdefects.component';

import PdfReport from './component/pdfreport/pdfreport.component';
import SignInForm from './component/sign-in-form/sign-in-form.component';
import SignUpForm from './component/sign-up-form/sign-up-form.component';
import SignOut from './component/signout/signout-component';
import Manual from './component/manual/manual';
import { UserContext } from '../src/context/user.context';
import Content from '../src/component/content/content';
import ContactUs from '../src/component/contactus/contactus.component';
import ContentNavBar from './navigation/navbar/contentnavbar.component';
import PricePage from './component/price/pricepage';

const App = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setCurrentUser(sessionStorage.getItem('user'));
      setLogged(<Routes>
        <Route path='/' element={< NavBar />}>
          <Route index element={<SignInForm />} />
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/menu' element={<MainMenu />} />
          <Route path='/addprojectfile' element={<AddProjectFile />} />
          <Route path='/adddefect' element={<CreateDefectPage1 />} />
          <Route path='/viewdefects' element={<ViewDefects />} />
          <Route path='/pdf' element={<PdfReport />} />
          <Route path='/logout' element={<SignOut />} />
          <Route path='/info' element={<Manual />} />
          <Route path='/pricing' element={<PricePage />} />
        </Route >
      </Routes >);
    }
    else {
      setLogged(<Routes>
        <Route path='/' element={<ContentNavBar />}>
          <Route index element={<Content />} />
          <Route path='/menu' element={<MainMenu />} />
          <Route path='/signin' element={<SignInForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route path='/app' element={<Content />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/pricing' element={<PricePage />} />
        </Route>
      </Routes>);
    }

  }, [currentUser]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // This is required for Chrome
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (<>
    {logged}
  </>

  );
}

export default App;
