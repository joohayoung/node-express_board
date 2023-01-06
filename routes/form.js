//express 인스턴스를 사용하겠다. require로 원하는 인스턴스를 받아 사용할 수 있음
var express = require('express');
var router = express.Router(); //express프레임워크 라우터를 사용하기 위해 변수를 선언

//router은 URI 요청에 응담하는 방식, res.render는 view파일을 랜더링 할 수 있음
router.get('/', function(req,res,next){
    res.render('form',{name:'hayoung', blog:'naver.com',homepage:'hacoder'});
}); //{ : }는 ejs템플릿으로 보내줄 변수를 선언하고 데이터를 담음

//form의 method를 post로 전송하므로 post로 받아야함, 같은 루트로 접근된다고 하더라도 post인지 get인지에 따라 달라짐
//자동으로 받아온 폼의 데이터를 Json형식으로 변경
router.post('/',function(req,res,next){
    res.json(req.body);
});

//module.exports는 global전역으로 해당 라우터를 사용하게 해줌
module.exports=router;