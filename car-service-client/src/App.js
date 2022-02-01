import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/configureStore';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import SignIn from './components/Sign/SignIn/SignIn'
import SignUp from './components/Sign/SignUp/SignUp'
import About from '../src/components/Header/links/About'
import Contacts from '../src/components/Header/links/Contacts'
import Faq from '../src/components/Header/links/Faq'
import Reviews from '../src/components/Header/links/Reviews'
import CarServicePage from './components/Carts/Cart/carServicePage';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/review' element={<Reviews />} />
          <Route path='/card/:id' element={<CarServicePage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
