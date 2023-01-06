var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();

router.get('/list',function(req,res,next){
    res.redirect('/board/list/1');
});

//게시판 리스트
router.get('/list/:page',function(req,res,next){
    var page=req.params.page; //url변수 ':page'로 맵핑된 page값을 req객체로 가져옴
    var sql="select idx,name,title,date_format(modidate,'%Y-%m-%d %H:%i:%s')modidate,"+ "date_format(regdate,'%Y-%m-%d %H:%i:%s')regdate from board";
    conn.query(sql,function(err,result){
        if(err)console.error("err:"+err);
        res.render('list',{title:'게시판 리스트', rows:result});
    });
});

//글쓰기 기능
router.get('/write',function(req,res,next){
    res.render('write',{title:"게시판 글쓰기"})
})

//글쓰기 db업로드
router.post('/write',function(req,res,next){
    //req객체로 body속성에서 write.ejs의 input name파라미터를 가져옴
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var password = req.body.password;
    var datas = [name,title,content,password]; //해당 SQL문에 컬럼이름으로 가져옴. 모든 데이터를 배열로 묶음
    //insert쿼리문을 작성, '?'매개변수로 배열에 있는 데이터와 순서대로 맵핑되어 입력
    var sql="insert into board(name,title,content,regdate,modidate,password,hit)values(?,?,?,now(),now(),?,0)";
    //query함수로 sql를 실행하고 datas에 변수 내용을 매개변수로 맵핑하여 데이터가 입력
    conn.query(sql,datas,function(err,rows){
        if(err)console.error("err:"+err);
        res.redirect('/board/list');
    })
})

//글상세 페이지
router.get('/read/:idx',function(req,res,next){
    var idx=req.params.idx;
    //쿼리문 작성- 한개의 글만 조회하기 때문에 마지막 idx에 매개변수를 받음
    var sql="select idx,name,title,content,date_format(modidate,'%Y-%m-%d %H:%i:%s')modidate,"+ "date_format(regdate,'%Y-%m-%d %H:%i:%s')regdate,hit from board where idx=?";
    //매개변수에 idx를 전달
    conn.query(sql,[idx],function(err,row)
    {
        if(err)console.error(err);
        res.render('read',{title:"글상세",row:row[0]}); //row[0]에 데이터 랜더링, 한개의 데이터(상세보기-한개글)만 가져오도록 첫번째 행만 요청
    });
});

//글수정 기능
router.post('/update',function(req,res,next){
    console.log(req.body)
    var idx=req.body.idx;
    var name= req.body.name;
    var title= req.body.title;
    var content=req.body.content;
    var password=req.body.password;
    var datas=[name,title,content,idx,password]; //변수로 넘어온 데이터를 배열로 합침
    //쿼리문작성, 글 고유번호와 비밀번호를 조건절로 걸음
    var sql="update board set name=?, title=?, content=?, modidate=now() where idx=? and password=?";
    conn.query(sql,datas,function(err,result){
        if(err) console.error(err);
        if(result.affectedRows==0) //affectedRows- 해당 쿼리로 변경된 수의 행을 불러옴, 0이면 업데이트가 되지 않았으므로 비밀번호가 틀린것
        {
            res.send("<script> alert('패스워드가 일치하지 않습니다');history.back(); </script>");
        }else{
            res.redirect('/board/read/'+idx);
        }

    });
});

//글삭제 기능
router.post('/delete',function(req,res,next){
    var idx=req.body.id;
    var password=req.body.password;
    var datas=[idx,password];
    var sql="delete from board where idx=? and password=?";
    conn.query(sql,datas,function(err,result){
        if(err) console.error(err);
        if(result.affectedRows==0)
        {
            res.send("<script> alert('패스워드가 일치하지 않습니다'); history.back(); </script>");
        }else{
            res.redirect('/board/list/');
        }
    });
});

router.get('/page/:page',function(req,res,next){
    var page = req.params.page;
    var sql = "select idx,name,title,content,date_format(modidate,'%Y-%m-%d %H:%i:%s')modidate,"+ "date_format(regdate,'%Y-%m-%d %H:%i:%s')regdate,hit from board";
    conn.query(sql, function(err,rows){
        if(err) console.error("err:"+err);
        res.render('page',{title:"게시판 리스트", rows:rows, page:page,length:rows.length-1, page_num:10, pass:true});
        //rows: DB 쿼리의 변수를 랜더링, length: 데이터의 전체 길이 랜더링하며 -1한것은 DB는 1부터시작이지만 for은 0부터 시작이기때문
        //page_num: 한 페이지에 보여줄 행의 갯수
        console.log(rows.length-1);
    });
});

module.exports = router;