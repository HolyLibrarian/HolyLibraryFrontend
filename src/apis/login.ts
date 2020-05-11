import $ from "jquery"

const host = 'http://localhost:3000';

export const login = (account: string, password: string, success:(respone: any) => void) => {
    $.ajax({
        url: host + "/session",
        type:"POST",
        dataType: 'json',
        data:{
            account:account, 
            password:password
        },
        success: function(respone){
            success(respone);
        }
    })
}