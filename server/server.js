var express = require("express");
var app = express();
var path = require('path')
var img_handler = require("./img_handle.js")
var file_handler = require("./file_handle.js")
var sql_handler = require("./sql_handle")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
// const cors = require('cors')
// var corsOptions = {
//     origin : 'http://localhost:8080',
//     Credentials: true,
//     maxAge:'1728000'
// }
// app.use(cors(corsOptions));
app.use(session({
    secret: '123456789qwe',
    // name:'11,
    cookie: { maxAge: 2 * 3600 * 1000 },
    resave: false,
    saveUninitialized: true
}))


app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.use(cookieParser());

// app.use('/edit/index.html', function (req, res, next) {
//     if (req.session.username) {
//         data.sea(req.session.username).then((info) => {
//             if (info.state == "MATCHED") {
//                 req.session.username = req.session.username;
//                 next();
//             } else {
//                 return res.send('非法用户');
//             }
//         });
//     } else {
//         return res.send('非法请求');
//     }
// });

app.use(express.static(path.join(__dirname, 'public')));

//allow custom header and CORS
app.all('*', function (req, res, next) {
    //当Access-Control-Allow-Credentials设为true时，Access-Control-Allow-Origin不能设置为星号
    res.header('Access-Control-Allow-Origin', 'http://www.stuacm.club');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //将Access-Control-Allow-Credentials设为true
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);    // 让options请求快速返回
    }
    else {
        next();
    }
});

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",'3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     //设为指定的域
//     res.header('Access-Control-Allow-Origin', "http://127.0.0.1:8080");
//     //设置Access-Control-Allow-Credentials为true
//     res.header('Access-Control-Allow-Credentials', true); 
//     next();
// });

var profile = {
    user_img: './url',
    user_nickname: "Luuukas",
    user_signature: "wow!",
    user_codeforces: "Lukas",
    user_sdutacm: "Lukas",
    user_blogs: [{
        name: "baidu",
        url: "https://www.baidu.com/"
    },
    {
        name: "",
        url: "javascript:;"
    },
    {
        name: "",
        url: "javascript:;"
    }],
    mindmap_infos: [
        {
            brief: "hahah",
            name: "mindmap_1",
            id: 1,
            data: [
                [
                    {
                        detail: { left_urls: [], right_urls: [] },
                        isChange: 0,
                        rootQNum: 0,
                        elementName: "ACM",
                        childElements: [
                            {
                                detail: {
                                    left_urls: [{ url: "unknown", name: "unknown" }],
                                    right_urls: [{ url: "unknown", name: "unknown" }]
                                },
                                isChange: 0,
                                rootQNum: 0,
                                elementName: "hahah",
                                childElements: [
                                    {
                                        detail: { left_urls: [], right_urls: [] },
                                        isChange: 0,
                                        rootQNum: 0,
                                        elementName: "fffff",
                                        childElements: [],
                                        permissionValue: 1
                                    },
                                    {
                                        detail: { left_urls: [], right_urls: [] },
                                        isChange: 0,
                                        rootQNum: 0,
                                        elementName: "aaaaaaaaaaa",
                                        childElements: [],
                                        permissionValue: 1
                                    },
                                    {
                                        detail: { left_urls: [], right_urls: [] },
                                        isChange: 0,
                                        rootQNum: 0,
                                        elementName: "dddddddd",
                                        childElements: [],
                                        permissionValue: 1
                                    }
                                ],
                                permissionValue: 1
                            },
                            {
                                detail: { left_urls: [], right_urls: [] },
                                isChange: 0,
                                rootQNum: 0,
                                elementName: "adf sad f",
                                childElements: [],
                                permissionValue: 1
                            }
                        ],
                        permissionValue: 1
                    }
                ]
            ]
        },
        {
            name: "mindmap_2",
            id: 2
        },
        {
            name: "mindmap_3",
            id: 3
        },
        {
            name: "mindmap_4",
            id: 4
        }
    ]
}

var profile2 = {
    user_img: './url',
    user_nickname: "Luuukas",
    user_signature: "wow!",
    user_codeforces: "Lukas",
    user_sdutacm: "Lukas",
    user_blogs: [{
        name: "baidu",
        url: "https://www.baidu.com/"
    },
    {
        name: "",
        url: "javascript:;"
    },
    {
        name: "",
        url: "javascript:;"
    }],
    mindmap_infos: [
        {
            name: "mindmap_1",
            id: 1,
            data: [
                [
                    {
                        detail: { left_urls: [], right_urls: [] },
                        isChange: 0,
                        rootQNum: 0,
                        elementName: "ACM",
                        childElements: [
                            {
                                detail: {
                                    left_urls: [{ url: "unknown", name: "unknown" }],
                                    right_urls: [{ url: "unknown", name: "unknown" }]
                                },
                                isChange: 0,
                                rootQNum: 0,
                                elementName: "hahah",
                                childElements: [
                                    {
                                        detail: { left_urls: [], right_urls: [] },
                                        isChange: 0,
                                        rootQNum: 0,
                                        elementName: "fffff",
                                        childElements: [],
                                        permissionValue: 1
                                    },
                                    {
                                        detail: { left_urls: [], right_urls: [] },
                                        isChange: 0,
                                        rootQNum: 0,
                                        elementName: "aaaaaaaaaaa",
                                        childElements: [],
                                        permissionValue: 1
                                    },
                                    {
                                        detail: { left_urls: [], right_urls: [] },
                                        isChange: 0,
                                        rootQNum: 0,
                                        elementName: "dddddddd",
                                        childElements: [],
                                        permissionValue: 1
                                    }
                                ],
                                permissionValue: 1
                            },
                            {
                                detail: { left_urls: [], right_urls: [] },
                                isChange: 0,
                                rootQNum: 0,
                                elementName: "adf sad f",
                                childElements: [],
                                permissionValue: 1
                            }
                        ],
                        permissionValue: 1
                    }
                ]
            ]
        },
        {
            name: "mindmap_5",
            id: 2
        },
        {
            name: "mindmap_6",
            id: 3
        },
        {
            name: "mindmap_7",
            id: 4
        }
    ]
}

app.post('/getProfile', function (req, res, next) {
    console.log(req.body);
    sql_handler.getProfile(req.body.username).then((info) => {
        console.log(info);
        res.send({
            msg: true,
            profile: info
        });
    })
})

app.post('/postFile', function (req, res, next) {
    file_handler.doAdd(req, res, next);
})

app.post('/upgProfileImg', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        img_handler.doAdd(req, res, next);
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/upgProfile', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.updateProfile(req.body.username, req.body);
        res.send({
            msg: true
        });
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/getMindMapInfos', function (req, res, next) {
    console.log(req.body)
    sql_handler.exp_getMindMapInfos(req.body.username).then((info) => {
        res.send({
            msg: true,
            mindmap_infos: info
        })
    })
})

app.post('/newaMindMap', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.newaMindMap(req.body.username, req.body);
        res.send({
            msg: true
        });
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/delaMindMap', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.delMindMap(req.body.username, req.body.id).then((info) => {
            res.send({
                msg: true
            });
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/upgaMindMap', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.upgaMindMap(req.body.username, req.body.id, req.body.data).then((info) => {
            res.send({
                msg: true
            });
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/newaMission', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.newaMission(req.body.username, req.body).then((info) => {
            res.send({
                msg: true
            });
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

var infos = [
    {
        inner_id: "accordion-inner-123456",
        year: "2019",
        month: "Jun",
        status: "Past",
        missions: [
            {
                id: 1,
                title: "aaaaaa",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Official",
                status: "miss",
                detail: {
                    brief: "wowowowo",
                    left_urls: [{ url: "unknown", name: "unknown" }],
                    right_urls: [
                        {
                            url: "unknown",
                            name: "unknown",
                            status0: "error",
                            status1: "success"
                        }
                    ]
                },
            },
            {
                id: 2,
                title: "aaabbbb",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Personal",
                status: "miss",
            },
            {
                id: 3,
                title: "abbbbca",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Official",
                status: "going",
            },
            {
                id: 4,
                title: "accccccaaa",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Personal",
                status: "miss",
            }
        ]
    },
    {
        inner_id: "accordion-inner-123789",
        year: "2019",
        month: "Seb",
        status: "Past",
        missions: [
            {
                id: 5,
                title: "aaaaaa",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Official",
                status: "miss",
            },
            {
                id: 6,
                title: "aaabbbb",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Personal",
                status: "pass",
            },
            {
                id: 7,
                title: "abbbbca",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Official",
                status: "miss",
            },
            {
                id: 8,
                title: "accccccaaa",
                start_t: "2019-08-29 00:00:00",
                end_t: "2019-09-29 00:00:00",
                belong: "Personal",
                status: "miss",
            }
        ]
    }
]

app.post('/getMissions', function (req, res, next) {
    sql_handler.exp_getMissions(req.body.username).then((info) => {
        console.log(info);
        res.send({
            msg: true,
            infos: info
        });
    })
})

app.post('/login', function (req, res, next) {
    sql_handler.match(req.body.username, req.body.email, req.body.password).then((info) => {
        req.session.username = req.body.username;
        console.log(req.session.username)
        res.send({
            msg: (info.state == "CORRECT")
        });
    });
})

app.post('/logout', function (req, res, next) {
    req.session.destroy();
    res.send({
        msg: true
    })
})

app.post('/isExits', function (req, res, next) {
    sql_handler.isExits(req.body.username).then((info) => {
        res.send({
            msg: (info.state == "EXITS")
        });
    })
})

app.post('/changePW', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.changePassword(req.body.username, req.body.oldpw, req.body.newpw).then((info) => {
            res.send({
                msg: true
            })
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/delPersonalMission', function (req, res, next) {
    if (req.session.username) {
        req.session.username = req.session.username;
        sql_handler.delPersonalMission(req.body.username, req.body.id).then((info) => {
            res.send({
                msg: true
            })
        })
    } else {
        res.send({ msg: false, info: "illegal" });
    }
})

app.post('/enroll', function (req, res, next) {
    console.log(req.body);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~todo: 查询激活码是否存在且有效
    sql_handler.isExits(req.body.username).then((info) => {
        if (info.state == "ISNTEXITS") {
            sql_handler.testCode(req.body.code).then((data) => {
                if (data.state == "CANUSE") {
                    var myDate = new Date();
                    var dt = myDate.toLocaleString();
                    sql_handler.createUser(req.body.username, req.body.password, req.body.email, dt).then((info) => {
                        res.send({
                            msg: true
                        })
                    })
                }else{
                    res.send({
                        msg: false,
                        info: data.state
                    })
                }
            })
        } else {
            res.send({
                msg: false,
                info: info.state
            })
        }
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Address: http://%s:%s", host, port)

})
