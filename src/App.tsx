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
import BorrowRecord, { BorrowRecordDefaultValue } from './interface/BorrowRecord';
import RegisterForm from './interface/RegisterForm';
import $ from 'jquery';

function App() {
  const [isManager, setIsManager] = useState(false);
  const [isReader, setIsReader] = useState(false);
  const [currentPage, setCurrentPage] = useState('Login');
  const [rows, setRows] = useState([] as any);

  $(function () {
    //checkLoginStatue();
  });

  const checkLoginStatue = () => {
    var token = localStorage.getItem('token');
    if (token != null) {
      checkAuthorizition(token, (response) => {
        setAuthority();
      });
    }
  }

  const loginRequest = (account: string, password: string) => {
    login(account, password, function (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('authority', response.indentification);
      setCurrentPage("");
      setAuthority();
    });
  }

  const logout = () => {
    localStorage.clear();
    setAuthority();
  }

  const registerRequest = (registerForm: RegisterForm) => {
    register(registerForm, (response) => {
      alert("註冊成功");
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
    if (page === "BorrowCollectionPage") {
      setCurrentPage("Borrow");
    } else if (page === "RegisterPage") {
      setCurrentPage("Register");
    } else if (page === "LoginPage") {
      setCurrentPage("Login");
    } else if (page === "PersonalPage") {
      setCurrentPage("Personal");
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
        {(currentPage === "Login" ?? false) && <LoginPage
          onSubmit={loginRequest}
          isDisplay={true}
          changePage={changePage}
        />}

        {(currentPage === "Register" ?? false) && <RegisterPage
          onSubmit={registerRequest}
          isDisplay={true}
          changePage={changePage}
        />}

        {(currentPage === "Borrow" ?? false) && <BorrowPage
          onBorrowSubmit={borrowCollectionRequest}
          onReturnSubmit={returnCollectionRequest}
          isDisplay={true}
        />}

        {(currentPage === "Personal" ?? false) && <PersonalPage
          isDisplay={true}
          rows={rows}
        />}
      </Container>
    </div>
  );
}

export default App;
