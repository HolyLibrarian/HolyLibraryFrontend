import React, { useState, useEffect } from 'react';
import { AppBar, Container, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import './App.css';
import LoginPage from './components/loginPage/loginPage'
import RegisterPage from './components/registerPage/registerPage'
import BorrowPage from './components/borrowPage/borrowPage'
import PersonalPage from './components/personalPage/personalPage'
import Navbar from './components/Navbar/navbar'
import { login, checkAuthorizition, register } from './apis/login'
import { borrowCollection, returnCollection } from './apis/borrow'
import BorrowRecord from './interface/BorrowRecord';
import RegisterForm from './interface/RegisterForm';
import $ from 'jquery';

function App() {
  const [isShowLoginPage, setIsShowLoginPage] = useState(true);
  const [isShowRegisterPage, setIsShowRegisterPage] = useState(false);
  const [isShowBorrowPage, setIsShowBorrowPage] = useState(false);
  const [isShowPersonalPage, setIsShowPersonalPage] = useState(false);
  const [isShowManageReaderPage, setIsShowManageReaderPage] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isReader, setIsReader] = useState(false);

  $(function () {
    checkLoginStatue();
    //localStorage.setItem('authority', 'reader');
    //setAuthority();
  });

  function hideAllPage() {
    setIsShowLoginPage(false);
    setIsShowRegisterPage(false);
    setIsShowBorrowPage(false);
  }

  const checkLoginStatue = () => {
    var jwt = localStorage.getItem('jwt');
    if (jwt != null) {
      checkAuthorizition(jwt, (response) => {
        if (response.success) {
          setIsShowLoginPage(false);
          setAuthority();
        } else {
          setIsShowLoginPage(true);
        }
      });
    }
  }

  const loginRequest = (account: string, password: string) => {
    login(account, password, function (response) {
      console.log(response);
      if (response.success) {
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('authority', response.data.iden);
        setIsShowLoginPage(false);
        setAuthority();
      } else {
        alert("帳號或密碼輸入錯誤！登入失敗")
      }
    });
  }

  const registerRequest = (registerForm: RegisterForm) => {
    register(registerForm, (response) => {
      if (response.success) {
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('authority', response.data.authority);
        setIsShowRegisterPage(false);
        setAuthority();
      } else {
        alert("註冊失敗");
      }
    });
  }

  const borrowCollectionRequest = (borrowRecord: BorrowRecord) => {
    borrowCollection(borrowRecord, (response) => {
      if (response.success) {
        alert("借閱館藏成功");
      }else{
        alert("借閱館藏失敗");
      }
    })
  }

  const returnCollectionRequest = (collectionId: string) => {
    returnCollection(collectionId, (response)=>{
      if (response.success) {
        alert("館藏歸還成功");
      }else{
        alert("館藏歸還失敗");
      }
    })
  }

  const changePage = (page: string) => {
    hideAllPage();
    if (page === "BorrowCollectionPage") {
      setIsShowBorrowPage(true);
    } else if (page === "RegisterPage") {
      setIsShowRegisterPage(true);
    } else if (page === "LoginPage") {
      setIsShowLoginPage(true);
    } else if(page === "PersonalPage"){
      setIsShowPersonalPage(true);
    }
  }

  const setAuthority = () => {
    var authority = localStorage.getItem('authority');
    if (authority === "reader") {
      setIsReader(true);
    } else if (authority === "manager") {
      setIsManager(true);
    }
  }

  return (
    <div>
      <Navbar
        isManager={isManager}
        isReader={isReader}
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
          onBorrowSubmit={borrowCollectionRequest}
          onReturnSubmit={returnCollectionRequest}
          isDisplay={isShowBorrowPage}
        />

        <PersonalPage
          isDisplay={isShowPersonalPage}
        />
      </Container>
    </div>
  );
}

export default App;
