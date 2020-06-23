import $ from 'jquery';
import {host} from './apiConfig'
import Collection, { CollectionDefaultValue } from '../interface/Collection'

export const deleteCollection = (collectionId: number, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/collections/" + collectionId,
        type: "DELETE",
        dataType: 'json',
        contentType: 'application/json',
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("刪除館藏失敗！");
        }
    })
}

export const updateCollection = (collection:Collection , success: (respone: any) => void) => {
    $.ajax({
        url: host + "/collections/" + collection.collectionId,
        type: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            CollectionId: Number(collection.collectionId),
            Name: String(collection.name),
            Publisher: String(collection.publisher),
            Author: String(collection.author),
            Isbn: String(collection.isbn),
            Location: String(collection.location),
            Price: Number(collection.price),
        }),
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤！");
        }
    })
}

export const createCollection = (collection:Collection , success: (respone: any) => void) => {
    $.ajax({
        url: host + "/collections",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            CollectionId: Number(collection.collectionId),
            Name: String(collection.name),
            Publisher: String(collection.publisher),
            Author: String(collection.author),
            Isbn: String(collection.isbn),
            Location: String(collection.location),
            Price: Number(collection.price),
        }),
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤！");
        }
    })
}

export const getCollectionById = (token: string, collectionId: string) => {
    return $.ajax({
        url: host + "/session",
        type: "GET",
        headers: {
            Authorization: 'bearer ' + token,
        }
    }).then((res) => {
        return $.ajax({
            url: `${host}/collections/${collectionId}`,
            type: "GET",
            dataType: 'json',
        })
    }).catch((err) => {
        console.log(err);
        alert("系統發生錯誤");
    });
};

export const getCollectionsByToken = (token: string) => {
    return $.ajax({
        url: host + "/session",
        type: "GET",
        headers: {
            Authorization: 'bearer ' + token,
        },
    }).then((res) => {
        return $.ajax({
            url: `${host}/collections`,
            type: "GET",
            dataType: 'json',
        })
    }).catch((err) => {
        console.log(err);
        alert("系統發生錯誤");
    });
};

export const getCollectionsByName = (token: string, name: string) => {
    return $.ajax({
        url: host + "/session",
        type: "GET",
        headers: {
            Authorization: 'bearer ' + token,
        }
    }).then((res) => {
        return $.ajax({
            url: `${host}/collections?name=${name}`,
            type: "GET",
            dataType: 'json',
        })
    }).catch((err) => {
        console.log(err);
        alert("系統發生錯誤");
    });
};

export const reserveCollection = (collectionId: number, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/reservations",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            UserId: Number(localStorage.getItem('loginUserId')),
            CollectionId: collectionId,
            ExpireDays: 7
        }),
        success: function (respone) {
            success(respone);
        },
        error: function (respone) {
            if (respone.status === 403) {
                alert("此書籍尚未有人借閱，可直接借閱");
            } else if (respone.status === 404){
                alert("已預訂！");
            } else {
                alert("系統發生錯誤");
            }
        }
    })
}

export const getReserveRecordsByToken = (token: string) => {
    return $.ajax({
        url: host + "/session",
        type: "GET",
        headers: {
            Authorization: 'bearer ' + token,
        }
    }).then((res) => {
        return $.ajax({
            url: `${host}/reservations?userId=${localStorage.getItem('loginUserId')}`,
            type: "GET",
            dataType: 'json'
        })
    }).catch((err) => {
        console.log(err);
        alert("系統發生錯誤");
    });
}

export const cancelReserve = (reserveId: number, success: (respone: any) => void) => {
    $.ajax({
        url: host + `/reservations/${reserveId}/isCanceled`,
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (respone) {
            success(respone);
        },
        error: function (respone) {
            alert("系統發生錯誤");
        }
    })
}
