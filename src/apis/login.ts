import $ from 'jquery';
import BorrowRecord from '../interface/BorrowRecord';
import RegisterForm from '../interface/RegisterForm';

const host = 'http://localhost:55047';

export const login = (account: string, password: string, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/session",
        type: "POST",
        dataType: 'json',
        data: {
            account: account,
            password: password
        },
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤");
        }
    })
}

export const checkAuthorizition = (Jwt: string, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/session",
        type: "Get",
        dataType: 'json',
        data: {
            hearder: {
                Authorizition: 'bearer ' + Jwt,
            }
        },
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤");
        }
    })
}

export const register = (registerForm: RegisterForm, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/users",
        type: "Post",
        dataType: 'json',
        data: {
            Account: registerForm.account,
            Password: registerForm.password,
            Email: registerForm.email,
            Name: registerForm.name,
            PhoneNumber: registerForm.phone,
            MaxBorrowNumber: 5
        },
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤");
        }
    })
}