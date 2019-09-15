var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chong516',
    database: 'stuacm'
});

function newaMission(username, new_mission) {
    var promise = new Promise(function (resolve, reject) {
        let addSql = 'INSERT INTO missions_' + username + '(name,brief,belong,start_t,end_t,details,status) VALUES(?,?,?,?,?,?,?)';
        let addSqlParams = [new_mission.nam_name, new_mission.nam_brief, "Official", new_mission.nam_timespan.substr(0, 19), new_mission.nam_timespan.substr(22, 19), JSON.stringify(new_mission.detail),"unknown"];
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                reject();
            } else {
                resolve();
            }
        });
    })
    return promise;
}

function addToEveryBody(new_mission){
    let promise = new Promise(function (resolve, reject) {
        let sql = 'SELECT * FROM user';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
            } else {
                for (var i = 0; i < result.length; i++) {    // 逐个用户处理
                    let username = result[i].username;
                    newaMission(username,new_mission).then((done)=>{
                        console.log("user: "+username+" added");
                    })
                }
            }
        })
    })
    return promise;
}

var new_mission = {
    nam_name : "nam_name",
    nam_brief : "nam_brief",
    nam_timespan : "2019-08-29 00:00:00 - 2019-08-29 00:00:00",
    detail: {
        left_urls: [
            { 
                url: "unknown", 
                name: "unknown" 
            }
        ],
        right_urls: [
            {
                url: "unknown",
                name: "unknown"
            }
        ]
    },
}

addToEveryBody(new_mission);