//db_info.js 파일은 db접속 정보가 모아져있음(로컬, 실서버, 스테이징, 개발 서버에 정보를 따로 기록)
//모듈로 사용할 수 있도록 exports
module.exports = (function () {
    return {
        local: { //해당 변수안에 배열로 접속 정보를 저장, 접속 정보는 이곳에서만 관리, DB접속 정보가 바뀌면 여기만 수정하면됨
            host:'127.0.0.1', //localhost
            port: 3306,
            user:'root',
            password:'gch17027',
            database:'firstprojectdb'
        },
    }
})();