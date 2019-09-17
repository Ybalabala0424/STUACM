var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chong516',
    database: 'stuacm'
});

function addCode(code){
    var promise = new Promise(function (resolve, reject) {
        let res = {};
        let addSql = 'INSERT INTO codes(value,isused) VALUES(?,?)';
        let addSqlParams = [code,0];
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                res.state = 'ERROR';
                res.detail = err;
                reject(res)
            }else{
                res.state = 'OK',
                resolve(res);
            }
        });
    })
    return promise;
}

function addCodes(codes){
    for(var i=0;i<codes.length;i++){
        let code = codes[i];
        addCode(code).then((info)=>{
            console.log("added "+code);
        })
    }
}

var codes = [
    "123456789",
    "456454545",
    "asd948dfs"
]

addCodes(codes);
