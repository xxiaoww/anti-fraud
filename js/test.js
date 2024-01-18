let personID = document.querySelector('.personID');

let username = sessionStorage.getItem("userid");
if (username == ' ' || username == null) {
    personID.innerHTML = '未登录';
    console.log('你好啊');
} else {
    personID.innerHTML = username;
    console.log('我不好');
}


let card1 = document.querySelector('.card');
let card2cont = document.querySelector('.card>.content');
let content = document.querySelector('.content');
let frontSpan = document.querySelector('.front>span');
let backSpan = document.querySelector('.back>span');
let storyFront = document.querySelector('.storyFront span');
let storyBack = document.querySelector('.cardInterface>.txt .ts1');

let S1 = document.querySelector('.cardS.s1');
let S2 = document.querySelector('.cardS.s2');
let S3 = document.querySelector('.cardS.s3');
let S4 = document.querySelector('.cardS.s4');



let i1 = document.querySelector('.cardS.s1>.i');
let i2 = document.querySelector('.cardS.s2>.i');
let i3 = document.querySelector('.cardS.s3>.i');
let i4 = document.querySelector('.cardS.s4>.i');

let s1 = document.querySelector('.cardS.s1>.s');
let s2 = document.querySelector('.cardS.s2>.s');
let s3 = document.querySelector('.cardS.s3>.s');
let s4 = document.querySelector('.cardS.s4>.s');

let end = document.querySelector('.end');
let endTxt = document.querySelector('.cardInterface .endTxt>.t');

let endI1 = document.querySelector('.endIndex>.i1');
let endI2 = document.querySelector('.endIndex>.i2');
let endI3 = document.querySelector('.endIndex>.i3');
let endI4 = document.querySelector('.endIndex>.i4');

let transition = document.querySelector('.cardInterface>.transition')

// 获取结算界面的继续按钮和两把刷子
let carde1 = document.querySelector('.cardc>.carde1');
let carde2 = document.querySelector('.cardc>.carde2');
let carde = document.querySelector('.cardc>.e');


// 接收剧情
let scriptId = 0;//存入剧情的编号-----暂时还用不到
let cardId = 0;//存入当前卡牌的编号
let temp = 0;//临时变量

//五个指标
let influence1 = parseInt(50);
let influence2 = parseInt(50);
let influence3 = parseInt(50);
let influence4 = parseInt(50);

let normalEnd = '';
let specialEnd = '';
let liIndex = 0;

let scriptNodesArr = [];

let m = 0;
// 这是第几个剧本的意思
let params = new URLSearchParams(window.location.search);
liIndex = params.get('index');
liIndex = parseInt(liIndex);

// 属性的大盒子
let statsOut = document.querySelector('.statsOut');
let data1 = sessionStorage.getItem('myData');
let data = JSON.parse(data1);
let num = 0;
console.log(data);
// console.log(scriptNodesArr);
let { scriptInfluenceName, scriptMsg, scriptNodes } = data;


console.log("啊啊啊这个指标为：", scriptInfluenceName);
// console.log(Object.keys(scriptInfluenceName).length);

const properties = [];

for (const property in scriptInfluenceName) {
    if (/^influence\d+Name$/.test(property)) {
        properties.push(scriptInfluenceName[property]);
    }
}
console.log("TMD", properties);
const count = properties.filter(item => item !== 'default').length;
num = count;

if (num == 0) {
    // statsOut.style.display = 'none';
    statsOut.style.opacity = '0';
} else if (num == 1) {
    statsOut.style.display = 'block';
    s1.innerHTML = `${scriptInfluenceName.influence1Name}`;
    S2.style.display = 'none';
    S3.style.display = 'none';
    S4.style.display = 'none';
} else if (num == 2) {
    statsOut.style.display = 'block';
    s1.innerHTML = `${scriptInfluenceName.influence1Name}`;
    s2.innerHTML = `${scriptInfluenceName.influence2Name}`;
    S2.style.display = 'flex';
    S3.style.display = 'none';
    S4.style.display = 'none';
} else if (num == 3) {
    statsOut.style.display = 'block';
    s1.innerHTML = `${scriptInfluenceName.influence1Name}`;
    s2.innerHTML = `${scriptInfluenceName.influence2Name}`;
    s3.innerHTML = `${scriptInfluenceName.influence3Name}`;
    S2.style.display = 'flex';
    S3.style.display = 'flex';
    S4.style.display = 'none';
} else if (num == 4) {
    statsOut.style.display = 'block';
    s1.innerHTML = `${scriptInfluenceName.influence1Name}`
    s2.innerHTML = `${scriptInfluenceName.influence2Name}`
    s3.innerHTML = `${scriptInfluenceName.influence3Name}`
    s4.innerHTML = `${scriptInfluenceName.influence4Name}`
    S2.style.display = 'flex';
    S3.style.display = 'flex';
    S4.style.display = 'flex';
}


s1.innerHTML = `${scriptInfluenceName.influence1Name}`
s2.innerHTML = `${scriptInfluenceName.influence2Name}`
s3.innerHTML = `${scriptInfluenceName.influence3Name}`
s4.innerHTML = `${scriptInfluenceName.influence4Name}`

endI1.querySelector('.name').innerHTML = `${scriptInfluenceName.influence1Name}`;
endI2.querySelector('.name').innerHTML = `${scriptInfluenceName.influence2Name}`;
endI3.querySelector('.name').innerHTML = `${scriptInfluenceName.influence3Name}`;
endI4.querySelector('.name').innerHTML = `${scriptInfluenceName.influence4Name}`;




storyBack.innerHTML = `${scriptMsg.scriptBackground}`;
// 遍历 scriptNodes 数组
for (let i = 0; i < scriptNodes.length; i++) {
    // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
    scriptNodesArr.push(scriptNodes[i].scriptId);
}
console.log(scriptNodesArr);




let simulate = (t) => {

    console.log("这里有个数组", scriptNodes);
    scriptNodesArr = [];
    for (let j = 0; j < scriptNodes.length; j++) {
        scriptNodesArr.push(scriptNodes[j].nodeId);
    }

    for (let i = 0; i < scriptNodesArr.length; i++) {
        if (t == scriptNodesArr[i]) {
            cardId = i;
        }
    }
    console.log("这里的card的id为", cardId);
    console.log("你是否来到这里");
    if (t == 0) {
        cardId = 0;
    }

    console.log(cardId);
    console.log(scriptNodes[cardId].word);

    setTimeout(function () {
        storyFront.innerHTML = `${scriptNodes[cardId].word}`;
    }, 500);

};


window.addEventListener('mousemove', function (event) {
    let card1Rect = card1.getBoundingClientRect();
    let mouseX = event.clientX;
    if (mouseX >= card1Rect.left && mouseX <= card1Rect.right ) {
        // 鼠标在盒子范围内，盒子保持原样
        card1.style.transform = 'none';
        card1.style.left = '717px';
        card1.style.top = '500px';
        frontSpan.innerHTML = '请你做出选择！';
    } else {
        // 鼠标不在盒子范围内，通过判断鼠标在盒子的左侧还是右侧来倾斜盒子
        if (mouseX < card1Rect.left) {
            // 鼠标在盒子左侧，盒子向左倾斜
            card1.style.transform = 'rotate(-10deg)';
            card1.style.left = '680px';
            card1.style.top = '480px';
            if (scriptNodes[cardId].leftChoice != null && Object.keys(scriptNodes[cardId].leftChoice).length !== 0) {
                frontSpan.innerHTML = `${scriptNodes[cardId].leftChoice.choiceMsg}`;
                temp = `${scriptNodes[cardId].leftChoice.jump}`;
            } else {
                frontSpan.innerHTML = '您的审判结果是~';
            }
            // console.log(temp);
        } else {
            // 鼠标在盒子右侧，盒子向右倾斜
            card1.style.transform = 'rotate(10deg)';
            card1.style.left = '780px';
            card1.style.top = '480px';
            if (scriptNodes[cardId].leftChoice != null && Object.keys(scriptNodes[cardId].leftChoice).length !== 0) {
                frontSpan.innerHTML = `${scriptNodes[cardId].rightChoice.choiceMsg}`;
                temp = `${scriptNodes[cardId].rightChoice.jump}`;
            } else {
                frontSpan.innerHTML = '您的审判结果是~';
            }
        }
        card1.style.top = '500px';
    }
});

// // 监听点击事件
window.addEventListener('click', function (event) {
    let card1Rect = card1.getBoundingClientRect();
    let mouseX = event.clientX;
    if (mouseX <= card1Rect.left) {
        card1.style.transform = 'none';
        card1.style.left = '712px';
        card1.style.top = '500px';
        card1.style.opacity = '1';
        content.classList.add('active');
        setTimeout(function () {
            content.classList.remove('active');
        }, 500);
        if (scriptNodes[cardId].leftChoice != null && Object.keys(scriptNodes[cardId].leftChoice).length !== 0) {
            influence1 += parseInt(scriptNodes[cardId].leftChoice.influence1);
            i1.style.setProperty('--gradient-start', `${influence1}`);
            i1.style.setProperty('--gradient-stop', `${100 - influence1}`);

            influence2 += parseInt(scriptNodes[cardId].leftChoice.influence2);
            i2.style.setProperty('--gradient-start', `${influence2}`);
            i2.style.setProperty('--gradient-stop', `${100 - influence2}`);

            influence3 += parseInt(scriptNodes[cardId].leftChoice.influence3);
            i3.style.setProperty('--gradient-start', `${influence3}`);
            i3.style.setProperty('--gradient-stop', `${100 - influence3}`);

            influence4 += parseInt(scriptNodes[cardId].leftChoice.influence4);
            i4.style.setProperty('--gradient-start', `${influence4}`);
            i4.style.setProperty('--gradient-stop', `${100 - influence4}`);
            console.log("temp的值为：", temp);
            simulate(temp);
            // if(!t) return; 
            console.log(`来过第${m}次`, influence1);
            console.log("这是干嘛的");
            console.log("此时它的值为",Object.keys(scriptNodes[j].leftChoice).length);
            m++;
        } else {
            console.log("你要干嘛");
            const url = 'http://47.113.231.211:3000/script/play/end';
            const headers = {
                'Content-Type': 'application/json',
            };
            let a = {
                "scriptId": parseInt(sessionStorage.getItem('scriptId')),
                "influence1": parseInt(influence1),
                "influence2": parseInt(influence2),
                "influence3": parseInt(influence3),
                "influence4": parseInt(influence4)
            };
            console.log("a的值为：",a);
            const payload = a;
            // 发送 POST 请求
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("最终的结局", data);
                    // storyFront.innerHTML = `${normalEnd}`;
                    endTxt.innerHTML = `${normalEnd}`;
                    // end.style.display='block';
                    bigCard.style.display = 'none';
                    card.style.display = 'none';
                    transition.style.display = 'block'
                    transition.style.transform = 'scaleX(-1) translateX(-650px)';
                    setTimeout(function () {
                        end.style.display = 'block';
                        transition.style.display = 'none';
                    }, 1000)
                    endI1.querySelector('.grade').innerHTML = `${influence1}`;
                    endI2.querySelector('.grade').innerHTML = `${influence2}`;
                    endI3.querySelector('.grade').innerHTML = `${influence3}`;
                    endI4.querySelector('.grade').innerHTML = `${influence4}`;
                })
                .catch(error => {
                    console.error(error);
                });

        }
    } else if (mouseX >= card1Rect.right) {
        card1.style.transform = 'none';
        card1.style.left = '712px';
        card1.style.top = '500px';
        card1.style.opacity = '1';
        content.classList.add('active');
        setTimeout(function () {
            content.classList.remove('active');
        }, 500);
        if (scriptNodes[cardId].leftChoice != null && Object.keys(scriptNodes[cardId].leftChoice).length !== 0) {
            influence1 += parseInt(scriptNodes[cardId].rightChoice.influence1);
            i1.style.setProperty('--gradient-start', `${influence1}`);
            i1.style.setProperty('--gradient-stop', `${100 - influence1}`);

            influence2 += parseInt(scriptNodes[cardId].rightChoice.influence2);
            i2.style.setProperty('--gradient-start', `${influence2}`);
            i2.style.setProperty('--gradient-stop', `${100 - influence2}`);

            influence3 += parseInt(scriptNodes[cardId].rightChoice.influence3);
            i3.style.setProperty('--gradient-start', `${influence3}`);
            i3.style.setProperty('--gradient-stop', `${100 - influence3}`);

            influence4 += parseInt(scriptNodes[cardId].rightChoice.influence4);
            i4.style.setProperty('--gradient-start', `${influence4}`);
            i4.style.setProperty('--gradient-stop', `${100 - influence4}`);
            simulate(temp);
            // if(!t) return; 
            console.log(`来过第${m}次`, influence1);
            m++;
            console.log("来过这里");
            // console.log(temp);
        } else {
            const url = 'http://47.113.231.211:3000/script/play/end';
            const headers = {
                'Content-Type': 'application/json',
            };
            let a = {
                "scriptId": parseInt(sessionStorage.getItem('scriptId')),
                "influence1": parseInt(influence1),
                "influence2": parseInt(influence2),
                "influence3": parseInt(influence3),
                "influence4": parseInt(influence4)
            };
            const payload = a;
            console.log("a的值为：",a);
            // 发送 POST 请求
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("最终的结局", data);
                    // storyFront.innerHTML = `${normalEnd}`;
                    endTxt.innerHTML = `${data.data}`;
                    // end.style.display='block';
                    bigCard.style.display = 'none';
                    card.style.display = 'none';
                    transition.style.display = 'block'
                    transition.style.transform = 'scaleX(-1) translateX(-650px)';
                    setTimeout(function () {
                        end.style.display = 'block';
                        transition.style.display = 'none';
                    }, 1000)
                    endI1.querySelector('.grade').innerHTML = `${influence1}`;
                    endI2.querySelector('.grade').innerHTML = `${influence2}`;
                    endI3.querySelector('.grade').innerHTML = `${influence3}`;
                    endI4.querySelector('.grade').innerHTML = `${influence4}`;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
});


let bigCard = document.querySelector('.cardInterface>.bigCard');
let card = document.querySelector('.cardInterface>.card');
let txt = document.querySelector('.cardInterface>.txt');
let cl = document.querySelector('.cardInterface>.cl');
let st = document.querySelector('.cardInterface>.st');
let sT = document.querySelector('.cardInterface>.stittle');
let sTspan = document.querySelector('.cardInterface>.stittle span');
sTspan.innerHTML = `${scriptMsg.scriptName}`;
// setTimeout(function() {
//     bigCard.style.display='block';
//     card.style.display='block';
//     txt.style.display='none';
//     cl.style.display='none';
//   }, 5000); // 延时2秒（2000毫秒）

st.addEventListener('click', function (e) {
    e.stopPropagation();
    bigCard.style.display = 'block';
    card.style.display = 'block';
    txt.style.display = 'none';
    cl.style.display = 'none';
    st.style.display = 'none';
    sT.style.display = 'none';
    simulate(0);
});

carde.addEventListener('click', function () {
    carde1.style.transform = 'translateX(100px)';
    carde2.style.transform = 'translateX(-100px)';
    setTimeout(function () {
        window.location.href = 'simulate.html' + '?index=' + liIndex;
    }, 1000)
})

let back = document.querySelector('.cardInterface>.Back');
back.addEventListener('click', function (e) {
    e.stopPropagation();
    history.back();
    // window.location.href = "create.html"; // 跳转到指定链接
})


let Pic2 = document.querySelector('.personHead>img');
// console.log(sessionStorage.getItem("pic"));
// Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
if (sessionStorage.getItem("pic") != 'null') {
    Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
} else if (sessionStorage.getItem("pic") == null) {
    Pic2.src = 'data:image/png;base64,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';
}

let navPresonA = document.querySelector('.navPreson>a');
// navPresonA.preventDefault();
navPresonA.addEventListener('click', function (e) {
    e.preventDefault();
    if (personID.textContent == '未登录') {
        window.location.href = "login1.html";
    } else {
        window.location.href = "center.html";
        // console.log(window.location.href);
    }
})

