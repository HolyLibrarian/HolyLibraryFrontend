import React, { useState, useEffect } from 'react';
import { AppBar, Container, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import './App.css';
import LoginPage from './components/loginPage/loginPage'
import RegisterPage from './components/registerPage/registerPage'
import BorrowPage from './components/borrowPage/borrowPage'
import PersonalPage from './components/personalPage/personalPage'
import Navbar from './components/Navbar/navbar'
import { login, checkAuthorizition, register } from './apis/login'
import { borrowCollection, returnCollection, searchBorrowRecords, getBorrowRecordsByToken } from './apis/borrow'
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
  const [rows, setRows] = useState([] as any);

  $(function () {
    //checkLoginStatue();
  });

  function hideAllPage() {
    setIsShowLoginPage(false);
    setIsShowRegisterPage(false);
    setIsShowBorrowPage(false);
    setIsShowPersonalPage(false);
  }

  const checkLoginStatue = () => {
    var token = localStorage.getItem('token');
    if (token != null) {
      checkAuthorizition(token, (response) => {
        setIsShowLoginPage(false);
        setAuthority();
      });
    }
  }

  const loginRequest = (account: string, password: string) => {
    login(account, password, function (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('authority', response.indentification);
      setIsShowLoginPage(false);
      setAuthority();
    });
  }

  const logout = () => {
    localStorage.clear();
    hideAllPage();
    setIsShowLoginPage(true);
    setAuthority();
  }

  const registerRequest = (registerForm: RegisterForm) => {
    register(registerForm, (response) => {
      alert("註冊成功");
      hideAllPage();
      setIsShowLoginPage(true);
    });
  }

  const borrowCollectionRequest = (borrowRecord: BorrowRecord) => {
    borrowCollection(borrowRecord, (response) => {
      alert("借閱館藏成功");
    })
  }

  const returnCollectionRequest = (collectionId: string) => {
    let borrowRecordId = 0;
    searchBorrowRecords(collectionId, (response) => {
      response.forEach((element: { isReturned: boolean; id: number; }) => {
        if (!element.isReturned) {
          borrowRecordId = element.id;
          returnCollection(borrowRecordId, (response) => {
            alert("館藏歸還成功");
          })
        }
      });
    });
  }

  const getBorrowRecords = async () => {
    var token = localStorage.getItem('token');
    if (token == null) {
      return [];
    }
    const borrowRecords = await getBorrowRecordsByToken(token) as any;

    return borrowRecords.map((borrowRecord: any) => ({
      name: borrowRecord.collection.name,
      author: borrowRecord.collection.author,
      publisher: borrowRecord.collection.publisher,
      createTime: borrowRecord.createTime,
      expireTime: borrowRecord.expireTime,
      isReturned: borrowRecord.isReturned,
    }));
  };

  const changePage = (page: string) => {
    hideAllPage();
    if (page === "BorrowCollectionPage") {
      setIsShowBorrowPage(true);
    } else if (page === "RegisterPage") {
      setIsShowRegisterPage(true);
    } else if (page === "LoginPage") {
      setIsShowLoginPage(true);
    } else if (page === "PersonalPage") {
      setIsShowPersonalPage(true);
      (async function () {
        setRows(await getBorrowRecords());
      })();
    }
  }

  const setAuthority = () => {
    var authority = localStorage.getItem('authority');
    if (authority === "Reader") {
      setIsReader(true);
    } else if (authority === "Manager") {
      setIsManager(true);
    } else {
      setIsReader(false);
      setIsManager(false);
    }
  }

  return (
    <div>
      <Navbar
        isManager={isManager}
        isReader={isReader}
        changePage={changePage}
        logout={logout}
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
          rows={rows}
        />
      </Container>
    </div>
  );
}

export default App;
