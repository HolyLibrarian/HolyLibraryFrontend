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
        }
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