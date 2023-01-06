//해당 파일은 db 연결을 확인하는 코드
var express = require('express');
var router = express.Router();
//mysql인스턴스를 가져와 사용하기 위한 준비
var mysql = require('mysql');

//데이터베이스의 접속 정보
router.get('/',function(req, res,next){
    var connection = mysql.createConnection({
        host:'127.0.0.1',
        port: 3306,
        user:'root',
        password:'gch17027',
        database:'firstprojectdb'
    });

    //커넥션 정보를 이용해 해당 데이터베이스에 접속 시도,
    //접속에 대한 오류 발생시 err이라는 변수에 오류 정보가 담겨짐

    connection.connect(function(err){
        if(err){
            res.render('mysql',{connect:'연결실패', err:err});
            console.error(err);
            throw err;
        }else{
            res.render('mysql', {connect:'연결성공',err:'없음'});
        }
    });
    connection.end();
});

module.exports = router;