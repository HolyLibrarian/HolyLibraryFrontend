import React, { useState, useEffect } from 'react';
import { AppBar, Container, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import './App.css';
import LoginPage from './components/loginPage/loginPage'
import RegisterPage from './components/registerPage/registerPage'
import BorrowPage from './components/borrowPage/borrowPage'
import Navbar from './components/Navbar/navbar'
import { login, checkAuthorizition } from './apis/login'
import BorrowRecord from './interface/BorrowRecord';
import RegisterForm from './interface/RegisterForm';
import $ from 'jquery';


function App() {
  const [isShowLoginPage, setIsShowLoginPage] = useState(true);
  const [isShowRegisterPage, setIsShowRegisterPage] = useState(false);
  const [isShowBorrowPage, setIsShowBorrowPage] = useState(false);
  const [isManager, SetIsManager] = useState(false);

  $(function(){
    checkLoginStatue();
  });

  function hideAllPage(){
    setIsShowLoginPage(false);
    setIsShowRegisterPage(false);
    setIsShowBorrowPage(false);
  }

  const checkLoginStatue = () =>{
    var jwt = localStorage.getItem('jwt');
    if(jwt != null){
      checkAuthorizition(jwt, (response) => {
        if(response.success){
          setIsShowLoginPage(false);
          setAuthority();
        }else{
          setIsShowLoginPage(true);
        }
      });
    }
  }

  const loginRequest = (account: string, password: string) => {
    login(account, password, function (response) {
      if (response.success) {
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('authority', response.data.authority);
        setIsShowLoginPage(false);
        setAuthority();
      } else {
        alert("帳號或密碼輸入錯誤！登入失敗")
      }
    });
  }

  const registerRequest = (registerForm: RegisterForm) =>{

  }

  const borrowCollection = (borrowRecord: BorrowRecord) => {
    
  } 

  const changePage = (page:string) =>{
    hideAllPage();
    if(page === "BorrowCollectionPage"){
      setIsShowBorrowPage(true);
    }else if(page === "RegisterPage"){
      setIsShowRegisterPage(true);
    }else if(page === "LoginPage"){
      setIsShowLoginPage(true);
    }
  }

  const setAuthority = () => {
    var authority = localStorage.getItem('authority');
    if(authority === "reader"){
      SetIsManager(false);
    }else if(authority === "manager"){
      SetIsManager(true);
    }
  }

  return (
    <div>
      <Navbar
        isManager={isManager}
        changePage={changePage} 
      />
      <Container>
        <LoginPage
          onSubmit={loginRequest}
          isDisplay={isShowLoginPage}
          changePage={changePage}
        />

        <RegisterPage
          onSubmit={registerRequest}
          isDisplay={isShowRegisterPage}
          changePage={changePage}
        />

        <BorrowPage
          onSubmit={borrowCollection}
          isDisplay={isShowBorrowPage}
        />
      </Container>
    </div>
  );
}

export default App;
