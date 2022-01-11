import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-Sign-up/sign-in-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore'


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubsribeFromAuth = null

  componentDidMount() {
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth)

        onSnapshot(userRef, (snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }else{
      this.setState({currentUser: userAuth})};
    })
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
  }

  render () {
  return (
    <div className="App">
      <Header currentUser={this.state.currentUser} />
      <Routes>
        <Route path='/' element = {<HomePage />} />  
        <Route path='/shop' element = {<ShopPage />} /> 
        <Route path='/signin' element = {<SignInAndSignUpPage />} /> 
      </Routes> 
    </div>
  )
}
};

export default App;
