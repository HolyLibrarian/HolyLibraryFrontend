import $ from 'jquery';
import BorrowRecord from '../interface/BorrowRecord';

const host = 'http://localhost:55047';

export const borrowCollection = (borrowRecord: BorrowRecord, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/borrowRecord",
        type: "POST",
        dataType: 'json',
        data: {
            userId: borrowRecord.userId,
            collectionId: borrowRecord.collectionId
        },
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤");
        }
    })
}

export const returnCollection = (collectionId: string, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/borrowRecord",
        type: "PUT",
        dataType: 'json',
        data: {
            collectionId: collectionId
        },
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤");
        }
    })
}