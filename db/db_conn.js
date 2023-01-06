//db의 연결을 관리
//db접속 정보를 이용해 호출시에 db에 접속할 수 있도록 함
var mysql = require('mysql'); //mysql 인스턴스를 가져옴
var config = require('./db_info').local; // db접속 정보를 가져옴

//mysql에 접속
module.exports=function(){
    return{
        init:function(){
            return mysql.createConnection({
                host:config.host,
                port: config.port,
                user: config.user,
                password:config.password,
                database: config.database
            })
    }
    }
};