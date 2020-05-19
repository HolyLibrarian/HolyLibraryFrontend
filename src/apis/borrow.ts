import $ from 'jquery';
import BorrowRecord from '../interface/BorrowRecord';

const host = 'http://localhost:5000';

export const borrowCollection = (borrowRecord: BorrowRecord, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/borrowRecords",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            UserId: Number(borrowRecord.userId),
            CollectionId: Number(borrowRecord.collectionId),
            ExpireDays: 7
        }), 
        success: function (respone) {
            success(respone);
        },
        error: function (respone) {
            alert("借閱失敗");
        }
    })
}

export const searchBorrowRecords = (collectionId: string, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/borrowRecords?collectionId=" + collectionId,
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("系統發生錯誤");
        }
    })
}

export const returnCollection = (borrowRecordId: number, success: (respone: any) => void) => {
    $.ajax({
        url: host + "/borrowRecords/" + borrowRecordId + "/isReturned",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        success: function (respone) {
            success(respone);
        },
        error: function () {
            alert("歸還失敗");
        }
    })
}

export const getBorrowRecordsByToken = (token: string) => {
    return $.ajax({
        url: host + "/session",
        type: "GET",
        headers: {
            Authorization: 'bearer ' + token,
        }
    }).then((res) => {
        return $.ajax({
            url: `${host}/borrowRecords?userId=${res.id}`,
            type: "GET",
            dataType: 'json',
        })
    }).catch((err) => {
        console.log(err);
        alert("系統發生錯誤");
    });
};
