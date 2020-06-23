import $ from 'jquery';
import {host} from './apiConfig'
import Reader, { ReaderDefaultValue } from '../interface/Reader'

export const deleteReader = (userId: number, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/readers/" + userId,
        type: "DELETE",
        dataType: 'json',
        contentType: 'application/json',
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("刪除讀者失敗！");
        }
    })
}

export const updateReader = (reader:Reader , success: (respone: any) => void) => {
    $.ajax({
        url: host + "/readers/" + reader.userId,
        type: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            UserId: Number(reader.userId),
            Name: String(reader.name),
            PhoneNumber: String(reader.phoneNumber),
            Email: String(reader.email),
            MaxBorrowNumber: Number(reader.maxBorrowNumber),
        }),
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤！");
        }
    })
}

export const createReader = (reader:Reader , success: (respone: any) => void) => {
    $.ajax({
        url: host + "/readers",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            Account: String(reader.account),
            Password: String(reader.password),
            Name: String(reader.name),
            PhoneNumber: String(reader.phoneNumber),
            Email: String(reader.email),
            MaxBorrowNumber: Number(reader.maxBorrowNumber),
        }),
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤！");
        }
    })
}

export const getReaderById = (token: string, userId: string) => {
    return $.ajax({
        url: host + "/session",
        type: "GET",
        headers: {
            Authorization: 'bearer ' + token,
        }
    }).then((res) => {
        return $.ajax({
            url: `${host}/readers/${userId}`,
            type: "GET",
            dataType: 'json',
        })
    }).catch((err) => {
        console.log(err);
        alert("系統發生錯誤");
    });
};

export const getReadersByToken = (token: string) => {
    return $.ajax({
        url: host + "/session",
        type: "GET",
        headers: {
            Authorization: 'bearer ' + token,
        }
    }).then((res) => {
        return $.ajax({
            url: `${host}/readers`,
            type: "GET",
            dataType: 'json',
        })
    }).catch((err) => {
        console.log(err);
        alert("系統發生錯誤");
    });
};