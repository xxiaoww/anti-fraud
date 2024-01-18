// 这里是用来存储此时的选择
let temp = 0;


let bodyT = document.querySelector('.list>.bodyL');

let wait = document.querySelector('.choice>.wait');
let no = document.querySelector('.choice>.no');
let ok = document.querySelector('.choice>.ok');


// 获取的是wait的元素，可以进行查看
let see = function (e) {
    e.addEventListener('click', function () {
        let scriptId = e.getAttribute('data-id')
        console.log(scriptId);
        const url3 = 'http://47.113.231.211:3000/script/play';
        const headers3 = {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhMzJkYTM2ZTYxY2I0MjJiOTc3NmY5ODJmNTk5Njg4ZCIsInN1YiI6IjAiLCJpc3MiOiJzZyIsImlhdCI6MTY5NzYzODg1OH0.5-zD7hDvC-iCWyqMyNMlmdF8XTkBx8HvuQ8NtyUD5F8'
        };

        const payload3 = {
            "scriptId": parseInt(scriptId)
        };

        // 发送 POST 请求
        fetch(url3, {
            method: 'POST',
            headers: headers3,
            body: JSON.stringify(payload3)
        })
            .then(response => response.json())
            .then(data3 => {
                sessionStorage.setItem('myData', JSON.stringify(data3.data));
                console.log(data3);
                window.location.href = "test.html"; // 跳转到指定链接
            })
            .catch(error => {
                console.error(error);
            });


    })
}


let good = function (e) {
    e.addEventListener('click', function () {
        let scriptId = e.getAttribute('data-id');
        let commitId = e.querySelector('span').getAttribute('data-id')
        let book = e.getAttribute('book');
        let name = e.getAttribute('name');
        console.log("book的值为：", book);
        console.log("name的值为：", name);
        console.log("scriptId的值为：", scriptId);
        console.log("commitId的值为：", commitId);
        const url3 = 'http://47.113.231.211:3000/admin/script/commit';
        const headers3 = {
            'Content-Type': 'application/json',
        };
        const payload3 = {
            "commitId": parseInt(commitId),
            "scriptId": parseInt(scriptId),
            "commitStatus": 1,
            "commitMsg": `亲爱的${name}：恭喜您，您所设计的剧本《${book}》刚刚通过了审核，您可以前往模拟进行查看喔!`
        };

        // 发送 POST 请求
        fetch(url3, {
            method: 'POST',
            headers: headers3,
            body: JSON.stringify(payload3)
        })
            .then(response => response.json())
            .then(data3 => {
                console.log("返回的data3", data3);
                console.log("审核成功！！！！");
                chu();
            })
            .catch(error => {
                console.error(error);
            });
    })
}

let mX = document.querySelector('.mes>.closed');
let mes = document.querySelector('.mes');

mX.addEventListener('click', function () {
    mes.style.display = 'none';
})

let bad = function (e) {
    e.addEventListener('click', function () {
        let scriptId = e.getAttribute('data-id');
        let commitId = e.querySelector('span').getAttribute('data-id')
        let book = e.getAttribute('book');
        let name = e.getAttribute('name');
        sessionStorage.setItem('badScriptId', parseInt(scriptId));
        sessionStorage.setItem('badCommitId', parseInt(commitId));
        sessionStorage.setItem('badBook', book);
        sessionStorage.setItem('badName', name);
        // 这里的状态是-1
        mes.style.display = 'block';
    })
}


let mGood = document.querySelector('.mes>.good1');
mGood.addEventListener('click', function () {
    let commitId = sessionStorage.getItem("badCommitId");
    let scriptId = sessionStorage.getItem("badScriptId");
    let name = sessionStorage.getItem("badName");
    let book = sessionStorage.getItem("badBook");
    let commitMsg = document.querySelector('.commitMsg>textarea');
    if (commitMsg == '') {
        alert('请填写理由！！');
    } else {
        const url3 = 'http://47.113.231.211:3000/admin/script/commit';
        const headers3 = {
            'Content-Type': 'application/json',
        };
        const payload3 = {
            "commitId": parseInt(commitId),
            "scriptId": parseInt(scriptId),
            "commitStatus": -1,
            "commitMsg": `亲爱的${name}：很抱歉您所设计的剧本《${book}》未能通过审核，退回的理由如下，请您别气馁，再接再厉!理由：${commitMsg.value}`
        };

        // 发送 POST 请求
        fetch(url3, {
            method: 'POST',
            headers: headers3,
            body: JSON.stringify(payload3)
        })
            .then(response => response.json())
            .then(data3 => {
                console.log("返回的data3", data3);
                console.log("审核成功！！！！");
                chu();
            })
            .catch(error => {
                console.error(error);
            });
    }

})



let chu = function () {
    bodyT.innerHTML = '';
    // 初始化渲染
    const url = 'http://47.113.231.211:3000/admin/script/show';
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = {
        "scriptStatus": temp
    };
    // 发送 POST 请求
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let data1 = data.data;
            // console.log(data1);
            for (let i = 0; i < data1.length; i++) {
                // console.log(data1[i]);
                let scriptId = data1[i].scriptId;
                // 获取剧本的作者
                const url = 'http://47.113.231.211:3000/script/producer';
                const headers = {
                    'Content-Type': 'application/json',
                };

                const payload = {
                    "scriptId": scriptId
                };

                // 发送 POST 请求
                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload)
                })
                    .then(response => response.json())
                    .then(data2 => {
                        // 获取详细信息（获取剧本名字和类型）
                        const url3 = 'http://47.113.231.211:3000/script/play';
                        const headers3 = {
                            'Content-Type': 'application/json',
                            'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhMzJkYTM2ZTYxY2I0MjJiOTc3NmY5ODJmNTk5Njg4ZCIsInN1YiI6IjAiLCJpc3MiOiJzZyIsImlhdCI6MTY5NzYzODg1OH0.5-zD7hDvC-iCWyqMyNMlmdF8XTkBx8HvuQ8NtyUD5F8'
                        };

                        const payload3 = {
                            "scriptId": scriptId
                        };

                        // 发送 POST 请求
                        fetch(url3, {
                            method: 'POST',
                            headers: headers3,
                            body: JSON.stringify(payload3)
                        })
                            .then(response => response.json())
                            .then(data3 => {
                                let mp2 = new Map([
                                    ['telFraud', '电话诈骗'],
                                    ['wireFraud', '网络诈骗'],
                                    ['financialFraud', '金融诈骗'],
                                    ['overseasFraud', '境外诈骗'],
                                    ['cult', '邪教诈骗'],
                                    ['pyramidSale', '传销诈骗'],
                                ]);
                                // 获取详细信息（获取剧本名字和类型）
                                console.log("我要疯了啊啊啊啊啊");
                                console.log("aaaaa获取到的剧本详细信息:", data3);
                                let tr = document.createElement('tr');
                                tr.setAttribute('data-id', data1[i].scriptId);
                                tr.innerHTML = `
                        <!-- 编号 -->
                        <td style="width: 120px; height: 28px;">
                            <div>
                                <span>${data1[i].commitId}</span>
                            </div>
                        </td>
                        <!-- 用户名 -->
                        <td style="width: 170px; height: 28px;">
                            <div>
                                <span>${data2.data}</span>
                            </div>
                        </td>
                        <!-- 标题-->
                        <td style="width: 170px; height: 28px;">
                            <div>
                                <span>${data3.data.scriptMsg.scriptName}</span>
                            </div>
                        </td>
                        <!-- 类别-->
                        <td style="width: 170px; height: 28px;">
                            <div>
                                <span>${mp2.get(data3.data.scriptMsg.classification)}</span>
                            </div>
                        </td>
                        <!-- 审核情况-->
                        <td class="see" style="width: 370px; height: 28px;">
                            <div>
                                <div class="wait" data-id=${data1[i].scriptId} >
                                    <span>查看</span>
                                </div>
                                <div class="ok" name=${data2.data} book=${data3.data.scriptMsg.scriptName} data-id=${data1[i].scriptId}>
                                    <span data-id=${data1[i].commitId}>通过</span>
                                </div>
                                <div class="no" name=${data2.data} book=${data3.data.scriptMsg.scriptName} data-id=${data1[i].scriptId}>
                                    <span data-id=${data1[i].commitId}>驳回</span>
                                </div>
                            </div>
                        </td>
                        `;

                                bodyT.appendChild(tr);
                                see(tr.querySelector('.wait'));
                                good(tr.querySelector('.ok'));
                                bad(tr.querySelector('.no'));
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        console.error(error);
                    });

            }
        })
        .catch(error => {
            console.error(error);
        });
}

chu();


// 三个按钮
let cc = document.querySelectorAll('.choice>.c');


wait.addEventListener('click', function () {
    // cc.forEach(function)
    cc.forEach(function (e) {
        e.classList.remove('act');
    });
    wait.classList.add('act');
    temp = 0;
    chu();
})

no.addEventListener('click', function () {
    cc.forEach(function (e) {
        e.classList.remove('act');
    });
    no.classList.add('act');
    temp = -1;
    chu();
})

ok.addEventListener('click', function () {
    cc.forEach(function (e) {
        e.classList.remove('act');
    });
    ok.classList.add('act');
    temp = 1;
    chu();
})



