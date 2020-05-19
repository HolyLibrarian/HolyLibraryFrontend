import $ from 'jquery';
import BorrowRecord from '../interface/BorrowRecord';
import RegisterForm from '../interface/RegisterForm';

const host = 'http://localhost:5000';

export const login = (account: string, password: string, successPost: (respone: any) => void) => {
    $.ajax({
        url: host + "/session",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            Account: account,
            Password: password
        }),
        success: function (respone) {
            successPost(respone);
        },
        error: function (errormessage) {
            alert("系統發生錯誤");
        }
    });
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