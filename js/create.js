/**
 * 该案例演示切换交互模式，在不同模式下实现拖动节点、增加节点、增加边的交互行为。
 */
// 提示框的信息

// 卡牌id
const scriptid = document.querySelector('.scriptid>input');

// 卡牌剧情
const word = document.querySelector('.word>textarea');

// 左节点
const lChoiceMsg = document.querySelector('.left .choiceMsg>textarea');
const lI1 = document.querySelector('.left .influence1');
const lI2 = document.querySelector('.left .influence2');
const lI3 = document.querySelector('.left .influence3');
const lI4 = document.querySelector('.left .influence4');
const lJump = document.querySelector('.left .jump>input');

// 右节点
const rChoiceMsg = document.querySelector('.right .choiceMsg>textarea');
const rI1 = document.querySelector('.right .influence1');
const rI2 = document.querySelector('.right .influence2');
const rI3 = document.querySelector('.right .influence3');
const rI4 = document.querySelector('.right .influence4');
const rJump = document.querySelector('.right .jump>input');

// 标题和背景的设置
const good = document.querySelector('.cont>.good');
const tittle = document.querySelector('.baseIn .tittle textarea');
const back = document.querySelector('.baseIn .back textarea');


let addedCount = 0;

// 临时变量
let temp = -1;
//这是用来记录有多少个指标的
let n = 0;

// 这是用来记录所有生成的指标文本框的
let fields = document.querySelectorAll('#textFields input');

// 改变指标的名字
const i1s = document.querySelectorAll('.i1');
const i2s = document.querySelectorAll('.i2');
const i3s = document.querySelectorAll('.i3');
const i4s = document.querySelectorAll('.i4');

const influence1s = document.querySelectorAll('.influence1');
const influence2s = document.querySelectorAll('.influence2');
const influence3s = document.querySelectorAll('.influence3');
const influence4s = document.querySelectorAll('.influence4');

const cardid = document.querySelector('.fillIn>.cardid');


let scriptNodesArr = [];
let scriptEdgesArr = [];
let tuNodesArr = [];
let poArr = [];
let t = 0;


// 普通结局  >>  结局1和结局2
let setEnd1 = document.querySelector('.end1>.e12');
let setEnd2 = document.querySelector('.end2>.e22');


// 普通结局  >>  指标的前后
let z1 = document.querySelector('.z.z1');
let z2 = document.querySelector('.z.z2');
let z3 = document.querySelector('.z.z3');
let z4 = document.querySelector('.z.z4');

// 这是所有的tr
let bodyListTr = document.querySelectorAll('.bodyList tr');
// 新增一个结局的意思
const newOne = document.querySelector('.wait1>.newOne');
// 这里是哪个表格（bodyList部分）
const bodyListT = document.querySelector('.bodyList tbody');



// 保存节点位置
let savePlace = function () {
    let data = sessionStorage.getItem('savePlace');
    let scriptId = sessionStorage.getItem('scriptId');
    data = JSON.parse(data);
    console.log("即将上传的东西", data);
    // function printPropertyTypes(obj) {
    //     for (const prop in obj) {
    //       if (obj.hasOwnProperty(prop)) {
    //         console.log(`${prop}: ${typeof obj[prop]}`);

    //         if (typeof obj[prop] === 'object') {
    //           printPropertyTypes(obj[prop]); // 递归遍历嵌套对象的属性类型
    //         }
    //       }
    //     }
    //   }
    //   printPropertyTypes(data);
    const url = 'http://47.113.231.211:3000/script/repository/position';
    const headers = {
        'Content-Type': 'application/json',
    };

    const payload = data;

    // 发送 POST 请求
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
};

// 保存节点数据
let saveData = function () {
    let data = sessionStorage.getItem('saveData');
    data = JSON.parse(data);
    // data.scriptId=str(data.scriptId);
    // data.scriptId=str(data.scriptId);
    // data.scriptId=str(data.scriptId);

    const url = 'http://47.113.231.211:3000/script/design/scriptNodes';
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = { "scriptNodes": data };
    // 发送 POST 请求
    console.log("你猜猜我存进去的是什么！！", data);
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
};


let saveNullData = function () {
    let data = sessionStorage.getItem('saveData');
    data = JSON.parse(data);
    // data.scriptId=str(data.scriptId);
    // data.scriptId=str(data.scriptId);
    // data.scriptId=str(data.scriptId);

    const url = 'http://47.113.231.211:3000/script/design/scriptNodes';
    const headers = {
        'Content-Type': 'application/json',
    };
    const payload = { "scriptNodes": data };
    // 发送 POST 请求
    console.log("你猜猜我存进去的是什么！！", data);
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

// 保存基础信息
let saveBase = function () {
    let base = sessionStorage.getItem('saveBase');
    base = JSON.parse(base);
    console.log("获取到的base是", base);
    const url = 'http://47.113.231.211:3000/script/design/scriptMsgWithInfluence';
    const headers = {
        'Content-Type': 'application/json',
        'token': `${sessionStorage.getItem("sign1")}`
    };
    const payload = base;
    console.log("发过去的base:", base);
    // const payload = {
    //     "scriptInfluenceName": {
    //         "influenceNameId": 1,
    //         // 当更新的时候需要传influenceNameId 新建的时候不需要
    //         "influence1Name": "测试1",
    //         "influence2Name": "测试2",
    //         "influence3Name": "测试3",
    //         "influence4Name": "测试4"
    //     },
    //     "scriptMsg": {
    //         "scriptId":1,
    //         // 当更新的时候需要传scriptId 新建的时候不需要
    //         "scriptName": "测试 剧本名",
    //         "scriptStatus": 120,
    //         "scriptBackground": "测试 背景",
    //         "classification": "telFraud"
    //     }
    // };
    // 发送 POST 请求
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
};

// 保存剧本结局信息
let renewNormalEnd = function () {
    let data = sessionStorage.getItem('saveEnd');
    data = JSON.parse(data);
    delete data.scriptEnd;
    delete data.scriptNormalEnd.empty;
    delete data.scriptNormalEnd.scriptId;
    // let data3 = sessionStorage.getItem('normalEndId');
    // data3 = JSON.parse(data3);
    // data.normalEndId

    const url = 'http://47.113.231.211:3000/script/design/scriptNormalEnds';
    const headers = {
        'Content-Type': 'application/json',
        'token': `${sessionStorage.getItem("sign1")}`
    };
    let payload = data;

    console.log("发过去的data:", data);
    // 发送 POST 请求
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

// 保存剧本结局信息
let newSpecialEnd = function () {

    let data = {
        "scriptId": parseInt(sessionStorage.getItem('scriptId')),
        "scriptEnd":
        {
            "endMsg": '',
            "influence1": '',
            "influence2": '',
            "influence3": '',
            "influence4": ''
        }
        ,
    }

    const url = 'http://47.113.231.211:3000/script/design/scriptEnds';
    const headers = {
        'Content-Type': 'application/json',
        'token': `${sessionStorage.getItem("sign1")}`
    };
    const payload = data;


    // 发送 POST 请求
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log("我想要新建立的结局的的id值", data);
            sessionStorage.setItem('newEndId', JSON.stringify(data.data));

            // let end = sessionStorage.getItem('newEndId');
            // let endId = JSON.parse(end);
            let tr = document.createElement('tr');
            tr.setAttribute("data-id", `${parseInt(data.data)}`);
            tr.innerHTML = `
                <!-- 指标1 -->
                <td class="ea e1" style="width: 55px; height: 28px; ">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 指标2 -->
                <td class="ea e2" style="width: 55px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 指标3-->
                <td class="ea e3" style="width: 55px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 指标4-->
                <td class="ea e4" style=" width: 55px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 内容-->
                <td class="ee" style="width: 125px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 删除 -->
                <td class="ea" style=" width: 55px; height: 28px;">
                    <div class="font icon-chahao iconfont a">
                    </div>
                </td>
                `;
            bodyListT.appendChild(tr);
            del(document.querySelectorAll('.font.a'));
        })
        .catch(error => {
            console.error(error);
        });
}

let renewSpecialEnd = function () {

    let data = sessionStorage.getItem('saveEnd');
    data = JSON.parse(data);
    for (let i = 0; i < data.scriptEnd.length; i++) {

        let data1 = {
            scriptId: `${parseInt(data.scriptId)}`,
            scriptEnd: data.scriptEnd[i]
        }
        const url = 'http://47.113.231.211:3000/script/design/scriptEnds';
        const headers = {
            'Content-Type': 'application/json',
            'token': `${sessionStorage.getItem("sign1")}`
        };
        const payload = data1;
        console.log("存进去的数据是data1");
        // 发送 POST 请求
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                console.log("到底怎么样啊", data);
            })
            .catch(error => {
                console.error(error);
            });
    }

}

// 获取结局
const url = 'http://47.113.231.211:3000/script/repository/get';
const headers = {
    'Content-Type': 'application/json',
};

let scriptId1 = sessionStorage.getItem('scriptId');
let data3 = JSON.parse(scriptId1);

const payload = {
    scriptId: parseInt(data3),
}
// 发送 POST 请求
fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
})
    .then(response => response.json())
    .then(data => {
        console.log("为什么失败了啊啊啊", data.data);
        let { scriptEnd, scriptId, scriptNormalEnd } = data.data;
        // 普通结局
        let data3 = sessionStorage.getItem('normalEndId');
        data3 = JSON.parse(data3);
        scriptNormalEnd.normalEndId = data3;
        // 初始化时的结局渲染
        setEnd1.value = data.data.scriptNormalEnd.normalEnd1;
        setEnd2.value = data.data.scriptNormalEnd.normalEnd2;
        z1.querySelector('.pre').value = data.data.scriptNormalEnd.startValue1;
        z1.querySelector('.next').value = data.data.scriptNormalEnd.endValue1;
        z2.querySelector('.pre').value = data.data.scriptNormalEnd.startValue2;
        z2.querySelector('.next').value = data.data.scriptNormalEnd.endValue2;
        z3.querySelector('.pre').value = data.data.scriptNormalEnd.startValue3;
        z3.querySelector('.next').value = data.data.scriptNormalEnd.endValue3;
        z4.querySelector('.pre').value = data.data.scriptNormalEnd.startValue4;
        z4.querySelector('.next').value = data.data.scriptNormalEnd.endValue4;

        if (scriptEnd == null) {
            bodyListT.innerHTML = '';
        } else {
            bodyListT.innerHTML = '';
            // 特殊结局的渲染
            for (let i = 0; i < scriptEnd.length; i++) {
                let tr = document.createElement('tr');
                tr.setAttribute("data-id", `${scriptEnd[i].endId}`);
                tr.innerHTML = `
                <!-- 指标1 -->
                <td class="ea e1" style="width: 55px; height: 28px; ">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 指标2 -->
                <td class="ea e2" style="width: 55px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 指标3-->
                <td class="ea e3" style="width: 55px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 指标4-->
                <td class="ea e4" style=" width: 55px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 内容-->
                <td class="ee" style="width: 125px; height: 28px;">
                    <div>
                        <textarea></textarea>
                    </div>
                </td>
                <!-- 删除 -->
                <td class="ea" style=" width: 55px; height: 28px;">
                    <div class="font icon-chahao iconfont a">
                    </div>
                </td>
                `;
                tr.querySelector('.ea.e1 textarea').value = scriptEnd[i].influence1;
                tr.querySelector('.ea.e2 textarea').value = scriptEnd[i].influence2;
                tr.querySelector('.ea.e3 textarea').value = scriptEnd[i].influence3;
                tr.querySelector('.ea.e4 textarea').value = scriptEnd[i].influence4;
                tr.querySelector('.ee textarea').value = scriptEnd[i].endMsg;
                bodyListT.appendChild(tr);
                del(document.querySelectorAll('.font.a'));
            }
        }
        sessionStorage.setItem('saveEnd', JSON.stringify(data.data));
        // 保存普通结局
        // saveEnd();
    }).catch(error => {
        console.error(error);
    });



G6.registerBehavior('click-add-node', {
    // Set the events and the corresponding responsing function for this behavior
    getEvents() {
        return {
            'canvas:click': 'onClick',
            'node:dblclick': 'onNodeDblClick',
        };
    },

    // Click event
    onClick(ev) {
        const self = this;
        const graph = self.graph;
        let storedData = sessionStorage.getItem('myData');
        let data2 = JSON.parse(storedData);
        // console.log(data2);
        let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
        // 遍历 scriptNodes 数组
        scriptNodesArr = [];
        // 保存节点的id
        for (let i = 0; i < scriptNodes.length; i++) {
            // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
            scriptNodesArr.push(scriptNodes[i].nodeId);
            if (i == scriptNodes.length - 1) {
                addedCount = scriptNodes[i].nodeId + 1;
            }
        }
        for (let m = 0; m < scriptNodesArr.length; m++) {
            t = 0;
            // 观察其是否存在过该节点
            if (parseInt(scriptNodesArr[m]) == addedCount) {
                t = 1;
                // console.log("第", m, "个元素");
                // console.log("它的值为", scriptNodesArr[m]);
                // console.log("它们的关系为：", parseInt(scriptNodesArr[m]) == addedCount);
                break;
            }
        }
        // 若没有则新建
        if (t == 0) {
            const node = graph.addItem('node', {
                x: ev.canvasX,
                y: ev.canvasY,
                id: `${addedCount}`,
                type: 'background-animate',
                size: 25,
                color: '#335159',
            });

            graph.update(node, {
                label: `${addedCount}`,
                labelCfg: {
                    style: {
                        fill: '#000',
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    offset: 10,
                },
            });
            addedCount++;
        }

        const nodeId = addedCount;

        let newScriptNode = {
            "nodeId": parseInt(nodeId) - 1,
            "word": "无",
            "x": ev.canvasX,
            "y": ev.canvasY,
            "scriptId": sessionStorage.getItem('scriptId'),
            "leftChoice": {
                "choiceId": 2 * (parseInt(nodeId) - 1),
                "choiceMsg": "无",
                "influence1": 0,
                "influence2": 0,
                "influence3": 0,
                "influence4": 0,
                "jump": parseInt(nodeId) - 1,
                "scriptId": sessionStorage.getItem('scriptId'),
            },
            "rightChoice": {
                "choiceId": 2 * (parseInt(nodeId) - 1) + 1,
                "choiceMsg": "无",
                "influence1": 0,
                "influence2": 0,
                "influence3": 0,
                "influence4": 0,
                "jump": parseInt(nodeId) - 1,
                "scriptId": sessionStorage.getItem('scriptId'),
            }
        };

        let saveData1 = sessionStorage.getItem('savePlace');
        let data5 = JSON.parse(saveData1);

        let newPlace = {
            "nodeId": parseInt(nodeId) - 1,
            "x": parseInt(ev.canvasX),
            "y": parseInt(ev.canvasY)
        }
        console.log(newPlace);
        data5.scriptNodePositions.push(newPlace);
        sessionStorage.setItem('savePlace', JSON.stringify(data5));
        savePlace();
        let storedData1 = sessionStorage.getItem('saveData');
        let data4 = JSON.parse(storedData1);

        let saveScriptNode = {
            "nodeId": parseInt(nodeId) - 1,
            "word": "无",
            "scriptId": parseInt(sessionStorage.getItem('scriptId')),
            "leftChoice": {
                "choiceId": 2 * (parseInt(nodeId) - 1),
                "choiceMsg": "无",
                "influence1": 0,
                "influence2": 0,
                "influence3": 0,
                "influence4": 0,
                "jump": parseInt(nodeId) - 1,
                "scriptId": parseInt(sessionStorage.getItem('scriptId')),
            },

            "rightChoice": {
                "choiceId": 2 * (parseInt(nodeId) - 1) + 1,
                "choiceMsg": "无",
                "influence1": 0,
                "influence2": 0,
                "influence3": 0,
                "influence4": 0,
                "jump": parseInt(nodeId) - 1,
                "scriptId": parseInt(sessionStorage.getItem('scriptId')),
            }
        }
        data4.push(saveScriptNode);
        scriptNodes.push(newScriptNode);

        sessionStorage.setItem('myData', JSON.stringify(data2));
        console.log(data4);

        sessionStorage.setItem('saveData', JSON.stringify(data4));
        saveData();

        //分割开
        let data1 = sessionStorage.getItem('tuData');
        let data3 = JSON.parse(data1);

        let newNode = {
            id: `${newScriptNode.nodeId}`, label: `${newScriptNode.nodeId}`, x: ev.canvasX, y: ev.canvasY, type: 'background-animate', size: 25, color: '#335159',
        }

        data3.nodes.push(newNode);
        sessionStorage.setItem('tuData', JSON.stringify(data3));

    },

    // Double click event on node
    onNodeDblClick(ev) {
        const self = this;
        const graph = self.graph;
        const node = ev.item;
        const model = node.getModel();
        const nodeBBox = node.getBBox();
        // cardid.innerHTML=`${addedCount}`;
        fillIn.style.transform = 'translateX(0px)';

        let storedData = sessionStorage.getItem('myData');
        let data2 = JSON.parse(storedData);
        // console.log(data2);
        let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
        const nodeId = node.getID();
        // console.log(nodeId);
        // 遍历 scriptNodes 数组
        scriptNodesArr = [];
        for (let i = 0; i < scriptNodes.length; i++) {
            // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
            scriptNodesArr.push(scriptNodes[i].nodeId);
        }
        temp = -1;
        for (let j = 0; j < scriptNodesArr.length; j++) {
            if (nodeId == scriptNodesArr[j]) {
                scriptid.value = nodeId;
                
                // console.log("你猜猜这个大数据的i:", scriptNodes[j].word);
                word.value = scriptNodes[j].word;
                console.log("这个东西到底是什么东西啊啊啊啊啊",scriptNodes[j].leftChoice);
                console.log("这个到底是不是啊",Object.keys(scriptNodes[j].leftChoice).length);
                if (scriptNodes[j].leftChoice !== null && scriptNodes[j].rightChoice !== null && Object.keys(scriptNodes[j].leftChoice).length !== 0 && Object.keys(scriptNodes[j].rightChoice).length !== 0) {
                    lChoiceMsg.value = scriptNodes[j].leftChoice.choiceMsg;
                    console.log("但是我走了这里");
                    lI1.value = scriptNodes[j].leftChoice.influence1;
                    lI2.value = scriptNodes[j].leftChoice.influence2;
                    lI3.value = scriptNodes[j].leftChoice.influence3;
                    lI4.value = scriptNodes[j].leftChoice.influence4;
                    lJump.value = scriptNodes[j].leftChoice.jump;
                    rChoiceMsg.value = scriptNodes[j].rightChoice.choiceMsg;
                    rI1.value = scriptNodes[j].rightChoice.influence1;
                    rI2.value = scriptNodes[j].rightChoice.influence2;
                    rI3.value = scriptNodes[j].rightChoice.influence3;
                    rI4.value = scriptNodes[j].rightChoice.influence4;
                    rJump.value = scriptNodes[j].rightChoice.jump;
                    temp = 1;
                    break;
                } else {
                    lChoiceMsg.value = '结局点';
                    lI1.value = -1;
                    lI2.value = -1;
                    lI3.value = -1;
                    lI4.value = -1;
                    lJump.value = -1;
                    rChoiceMsg.value = '结局点';
                    rI1.value = -1;
                    rI2.value = -1;
                    rI3.value = -1;
                    rI4.value = -1;
                    rJump.value = -1;
                    temp = 1;
                    break;
                }
            }
        }
    }

});

G6.registerNode(
    'background-animate',
    {
        afterDraw(cfg, group) {
            const r = cfg.size / 2;
            const back1 = group.addShape('circle', {
                zIndex: -3,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.6,
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'back1-shape',
            });
            const back2 = group.addShape('circle', {
                zIndex: -2,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.6,
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'back2-shape',
            });
            const back3 = group.addShape('circle', {
                zIndex: -1,
                attrs: {
                    x: 0,
                    y: 0,
                    r,
                    fill: cfg.color,
                    opacity: 0.6,
                },
                // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                name: 'back3-shape',
            });
            group.sort(); // Sort according to the zIndex
            back1.animate(
                {
                    // Magnifying and disappearing
                    r: r + 10,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 0,
                    repeat: true, // repeat
                },
            ); // no delay
            back2.animate(
                {
                    // Magnifying and disappearing
                    r: r + 10,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 1000,
                    repeat: true, // repeat
                },
            ); // 1s delay
            back3.animate(
                {
                    // Magnifying and disappearing
                    r: r + 10,
                    opacity: 0.1,
                },
                {
                    duration: 3000,
                    easing: 'easeCubic',
                    delay: 2000,
                    repeat: true, // repeat
                },
            ); // 3s delay
        },
    },
    'circle',
);



const container = document.getElementById('container');

// 实例化 minimap 插件
// const minimap = new G6.Minimap({
//     size: [200, 200],
//     className: 'minimap',
//     type: 'delegate',
//     viewportStyle: {
//         stroke: '#e2e2e2',
//         lineWidth: 2
//     },
// });


const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    // The sets of behavior modes
    modes: {
        // Defualt mode
        default: ['drag-node', 'click-select', 'drag-node' ,
            {
                type: 'tooltip', // 提示框
                formatText(model) {

                    let storedData = sessionStorage.getItem('myData');
                    let data2 = JSON.parse(storedData);
                    let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
                    const nodeId = parseInt(model.label);

                    scriptNodesArr = [];
                    for (let i = 0; i < scriptNodes.length; i++) {
                        // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
                        scriptNodesArr.push(scriptNodes[i].nodeId);
                    }
                    for (let j = 0; j < scriptNodesArr.length; j++) {
                        if (nodeId == scriptNodesArr[j]) {
                            if (scriptNodes[j].leftChoice == null || scriptNodes[j].rightChoice == null || Object.keys(scriptNodes[j].leftChoice).length == 0 || Object.keys(scriptNodes[j].rightChoice).length == 0) {
                                // 提示框文本内容
                                const text = '结局点：<br/>label: ' + model.label + '<br/> word: ' + scriptNodes[j].word;
                                return text;
                            } else {
                                // 提示框文本内容
                                const text = 'label: ' + model.label + '<br/> word: ' + scriptNodes[j].word + '<br> left:' + scriptNodes[j].leftChoice.jump + '&nbsp;' + scriptNodes[j].leftChoice.choiceMsg + '<br> right:' + scriptNodes[j].rightChoice.jump + '&nbsp;' + scriptNodes[j].rightChoice.choiceMsg;
                                return text;
                            }
                        }
                    }

                },
            },
        ],
        // Adding node mode
        addNode: ['drag-node', 'click-add-node', 'click-select', 'drag-node',
            {
                type: 'tooltip', // 提示框
                formatText(model) {

                    let storedData = sessionStorage.getItem('myData');
                    let data2 = JSON.parse(storedData);
                    let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
                    const nodeId = parseInt(model.label);

                    scriptNodesArr = [];
                    for (let i = 0; i < scriptNodes.length; i++) {
                        // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
                        scriptNodesArr.push(scriptNodes[i].nodeId);
                    }
                    for (let j = 0; j < scriptNodesArr.length; j++) {
                        if (nodeId == scriptNodesArr[j]) {
                            if (scriptNodes[j].leftChoice == null || scriptNodes[j].rightChoice == null || Object.keys(scriptNodes[j].leftChoice).length == 0 || Object.keys(scriptNodes[j].rightChoice).length == 0) {
                                // 提示框文本内容
                                const text = '结局点：<br/>label: ' + model.label + '<br/> word: ' + scriptNodes[j].word;
                                return text;
                            } else {
                                // 提示框文本内容
                                const text = 'label: ' + model.label + '<br/> word: ' + scriptNodes[j].word + '<br> left:' + scriptNodes[j].leftChoice.jump + '&nbsp;' + scriptNodes[j].leftChoice.choiceMsg + '<br> right:' + scriptNodes[j].rightChoice.jump + '&nbsp;' + scriptNodes[j].rightChoice.choiceMsg;
                                return text;
                            }
                        }
                    }

                },
            },
        ],
    },
    // The node styles in different states
    nodeStateStyles: {
        // The node styles in selected state
        // selected: {
        //   stroke: '#666',
        //   lineWidth: 2,
        //   fill: 'steelblue',
        // },
    },
    // plugins: [minimap], // 将 minimap 实例配置到图上
});


let data1 = sessionStorage.getItem('myData');
let data2 = JSON.parse(data1);

let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
if (scriptNodes == null) {
    scriptNodes = [];
}
// console.log("我知道这是什么鬼：", scriptNodes);
scriptNodesArr = [];

for (let i = 0; i < scriptNodes.length; i++) {
    // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
    scriptNodesArr.push(scriptNodes[i].nodeId);
}

// console.log("aaa这是什么鬼啊", scriptNodesArr);


console.log("关于指标：", scriptInfluenceName);

const properties = [];

for (const property in scriptInfluenceName) {
    if (/^influence\d+Name$/.test(property)) {
        properties.push(scriptInfluenceName[property]);
    }
}

console.log("TMD", properties);
const count = properties.filter(item => item !== 'default').length;
// console.log("这个数组的长度为：",count);


document.querySelector(`input[id="${count}"]`).checked = true;

showTextFields(count);

for (let i = 0; i < count; i++) {
    fields[i].value = properties[i];
    console.log(fields[i].value);
}

// 指标个数
let n1 = count;

// 指标是否被选中
let prohibit = function (e) {
    e.disabled = true;
}

let on = function (e) {
    e.disabled = false;
}


// 右边文本框的
if (n1 == 0) {
    for (let i = 0; i < 2; i++) {
        i1s[i].innerHTML = '指标1';
        i2s[i].innerHTML = '指标2';
        i3s[i].innerHTML = '指标3';
        i4s[i].innerHTML = '指标4';
        prohibit(influence1s[i]);
        prohibit(influence2s[i]);
        prohibit(influence3s[i]);
        prohibit(influence4s[i]);
    }
} else if (n1 == 1) {
    for (let i = 0; i < 2; i++) {
        i1s[i].innerHTML = scriptInfluenceName.influence1Name;
        i2s[i].innerHTML = '指标2';
        i3s[i].innerHTML = '指标3';
        i4s[i].innerHTML = '指标4';
        on(influence1s[i]);
        prohibit(influence2s[i]);
        prohibit(influence3s[i]);
        prohibit(influence4s[i]);
    }
} else if (n1 == 2) {
    for (let i = 0; i < 2; i++) {
        i1s[i].innerHTML = scriptInfluenceName.influence1Name;
        i2s[i].innerHTML = scriptInfluenceName.influence2Name;
        i3s[i].innerHTML = '指标3';
        i4s[i].innerHTML = '指标4';
        on(influence1s[i]);
        on(influence2s[i]);
        prohibit(influence3s[i]);
        prohibit(influence4s[i]);
    }
} else if (n1 == 3) {
    for (let i = 0; i < 2; i++) {
        i1s[i].innerHTML = scriptInfluenceName.influence1Name;
        i2s[i].innerHTML = scriptInfluenceName.influence2Name;
        i3s[i].innerHTML = scriptInfluenceName.influence3Name;
        i4s[i].innerHTML = '指标4';
        on(influence1s[i]);
        on(influence2s[i]);
        on(influence3s[i]);
        prohibit(influence4s[i]);
    }
} else if (n1 == 4) {
    for (let i = 0; i < 2; i++) {
        i1s[i].innerHTML = scriptInfluenceName.influence1Name;
        i2s[i].innerHTML = scriptInfluenceName.influence2Name;
        i3s[i].innerHTML = scriptInfluenceName.influence3Name;
        i4s[i].innerHTML = scriptInfluenceName.influence4Name;
        on(influence1s[i]);
        on(influence2s[i]);
        on(influence3s[i]);
        on(influence4s[i]);
    }
}

tittle.value = scriptMsg.scriptName;
back.value = scriptMsg.scriptBackground;

let localData = {
    nodes: [
        //   { id: 'node1', label: 'Node 1', x: 100, y: 100 },
    ],
    edges: []
};

for (let j = 0; j < scriptNodesArr.length; j++) {

    let newNode = {
        id: `${scriptNodes[j].nodeId}`, label: `${scriptNodes[j].nodeId}`, x: scriptNodes[j].x, y: scriptNodes[j].y, type: 'background-animate', size: 25, color: '#335159',
    }
    if (scriptNodes[j].leftChoice !== null && scriptNodes[j].rightChoice !== null) {
        if (scriptNodes[j].nodeId !== scriptNodes[j].leftChoice.jump) {
            let newleftEdges = {
                id: `${'' + scriptNodes[j].nodeId + scriptNodes[j].leftChoice.jump}`, target: `${parseInt(scriptNodes[j].nodeId)}`, source: `${scriptNodes[j].leftChoice.jump}`, color: '#000'
            }
            localData.edges.push(newleftEdges);
        }
        if (scriptNodes[j].nodeId !== scriptNodes[j].rightChoice.jump) {
            let newrightEdges = {
                id: `${'' + scriptNodes[j].nodeId + scriptNodes[j].rightChoice.jump}`, target: `${parseInt(scriptNodes[j].nodeId)}`, source: `${scriptNodes[j].rightChoice.jump}`, color: '#000'
            }
            localData.edges.push(newrightEdges);
        }
    }
    localData.nodes.push(newNode);
}

// console.log(localData);
sessionStorage.setItem('tuData', JSON.stringify(localData));
graph.data(localData);
graph.render();

if (typeof window !== 'undefined')
    window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
    };


// 其他样式
const opened = document.querySelector('.fillIn>.opened');
const closed = document.querySelector('.fillIn>.closed');
const fillIn = document.querySelector('.fillIn');
opened.addEventListener('click', function () {
    fillIn.style.transform = 'translateX(0px)';
})

closed.addEventListener('click', function () {
    fillIn.style.transform = 'translateX(320px)';
})


const base = document.querySelector('.base');
const cont = document.querySelector('.cont');
const closed1 = document.querySelector('.cont>.closed');

base.addEventListener('click', function () {
    cont.style.display = 'block';
})

closed1.addEventListener('click', function () {
    cont.style.display = 'none';
})


graph.on('node:click', (event) => {
    // 判断是否按住了 Shift 键
    if (event.originalEvent.shiftKey) {
        // 获取被点击的节点元素
        const clickedNode = event.item;
        // 获取被点击节点的 id
        const clickedNodeId = clickedNode.getModel().id;

        const url = 'http://47.113.231.211:3000/script/node/del';
        const headers = {
            'Content-Type': 'application/json',
            'token': `${sessionStorage.getItem("sign1")}`
        };
        let a = sessionStorage.getItem('scriptId');
        a = JSON.parse(a);
        const payload = {
            "scriptId": parseInt(a),
            "nodeId": parseInt(clickedNodeId)
        };
        // 发送 POST 请求
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                // 删除的时候，节点汇编，需要处理一下

                console.log(data);
                // 删除节点
                graph.removeItem(clickedNode);
                let data1 = sessionStorage.getItem('tuData');
                let data2 = JSON.parse(data1);
                // console.log("这个data2是：", data2);
                let { edges, nodes } = data2;
                scriptNodesArr = [];
                data2.nodes = nodes.filter(element => element.id !== clickedNodeId);

                data2.edges = edges.filter(element => element.target !== clickedNodeId);
                data2.edges = data2.edges.filter(element => element.source !== clickedNodeId);

                sessionStorage.setItem('tuData', JSON.stringify(data2));

                let data3 = sessionStorage.getItem('myData');
                let data4 = JSON.parse(data3);
                console.log("还没进入这里的时候，data3的值：", data3);
                let { scriptMsg, scriptNodes, scriptInfluenceName } = data4;
                console.log("此时的scriptNodes值为：", scriptNodes);
                data4.scriptNodes = scriptNodes.filter(e => e.nodeId !== parseInt(clickedNodeId));
                console.log("aaaaaaaaa此时的data4的值为：", data4);
                sessionStorage.setItem('myData', JSON.stringify(data4));

                let data7 = JSON.parse(sessionStorage.getItem('savePlace'));
                data7.scriptNodePositions = data7.scriptNodePositions.filter(e => e.nodeId !== parseInt(clickedNodeId));
                sessionStorage.setItem('savePlace', JSON.stringify(data7));
                savePlace();

                let data5 = sessionStorage.getItem('saveData');
                let data6 = JSON.parse(data5);
                data6 = data6.filter(e => e.nodeId !== parseInt(clickedNodeId));
                sessionStorage.setItem('saveData', JSON.stringify(data6));
                saveData();

            })
            .catch(error => {
                console.error(error);
            });
    }
});


const accept = document.querySelector('.accept');

accept.addEventListener('click', function () {
    let storedData = sessionStorage.getItem('myData');
    let data2 = JSON.parse(storedData);
    let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;

    cardId = scriptid.value;
    // console.log("修改前的cardId",cardId);


    // 遍历 scriptNodes 数组
    scriptNodesArr = [];
    for (let i = 0; i < scriptNodes.length; i++) {
        // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
        scriptNodesArr.push(scriptNodes[i].nodeId);
    }

    // console.log("我采集到的数组为：",scriptNodesArr);

    for (let j = 0; j < scriptNodesArr.length; j++) {
        if (parseInt(cardId) == parseInt(scriptNodesArr[j])) {
            temp = j;
            // console.log("匹配到的j为：",j);
            break;
        }
    }

    // scriptNodes[temp].word = word.value;
    if (scriptNodes[temp].leftChoice == null || scriptNodes[temp].rightChoice == null) {
        scriptNodes[temp].word = word.value;
    } else {
        scriptNodes[temp].word = word.value;
        scriptNodes[temp].leftChoice.choiceMsg = lChoiceMsg.value;
        scriptNodes[temp].leftChoice.influence1 = lI1.value;
        scriptNodes[temp].leftChoice.influence2 = lI2.value;
        scriptNodes[temp].leftChoice.influence3 = lI3.value;
        scriptNodes[temp].leftChoice.influence4 = lI4.value;
        scriptNodes[temp].leftChoice.jump = lJump.value;
        scriptNodes[temp].rightChoice.choiceMsg = rChoiceMsg.value;
        scriptNodes[temp].rightChoice.influence1 = rI1.value;
        scriptNodes[temp].rightChoice.influence2 = rI2.value;
        scriptNodes[temp].rightChoice.influence3 = rI3.value;
        scriptNodes[temp].rightChoice.influence4 = rI4.value;
        scriptNodes[temp].rightChoice.jump = rJump.value;
    }


    setTimeout(function () {
        accept.style.backgroundColor = '#fff';
    }, 1000)

    sessionStorage.setItem('myData', JSON.stringify(data2));

    // 复制原对象并将scriptId属性添加到leftChoice和rightChoice中
    console.log("data2的值", data2);
    for (let i = 0; i < data2.scriptNodes.length; i++) {
        data2.scriptNodes[i] = {
            ...data2.scriptNodes[i],
            leftChoice: {
                ...data2.scriptNodes[i].leftChoice,
                scriptId: data2.scriptNodes[i].scriptId
            },
            rightChoice: {
                ...data2.scriptNodes[i].rightChoice,
                scriptId: data2.scriptNodes[i].scriptId
            }
        }
        console.log("好好爱护");
    }
    console.log("之后的", data2.scriptNodes);

    data2.scriptNodes.forEach(obj => {
        delete obj.x;
        delete obj.y;
    });

    sessionStorage.setItem('saveData', JSON.stringify(data2.scriptNodes));
    saveData();

    let data1 = sessionStorage.getItem('tuData');
    let data3 = JSON.parse(data1);
    // console.log(cardId);
    data3.edges = data3.edges.filter(element => element.target !== cardId);
    // data3.edges =data3.edges.filter(element => element.source!== cardId);

    if (cardId !== scriptNodes[temp].leftChoice.jump) {
        let newLeftEdges = {
            id: `${'' + cardId + scriptNodes[temp].leftChoice.jump}`, target: `${parseInt(cardId)}`, source: `${scriptNodes[temp].leftChoice.jump}`, color: '#000',
        }
        data3.edges.push(newLeftEdges);
    }

    if (cardid !== scriptNodes[temp].rightChoice.jump) {

        let newRightEdges = {
            id: `${'' + cardId + scriptNodes[temp].rightChoice.jump}`, target: `${parseInt(cardId)}`, source: `${scriptNodes[temp].rightChoice.jump}`, color: '#000',
        }
        data3.edges.push(newRightEdges);

    }
    sessionStorage.setItem('tuData', JSON.stringify(data3));
    graph.data(data3);
    graph.render();
})

const test = document.querySelector('.test');
test.addEventListener('click', function () {
    window.location.href = "../test.html";
})



good.addEventListener('click', function () {
    let data1 = sessionStorage.getItem('myData');
    let data2 = JSON.parse(data1);
    // console.log(data2);
    let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
    scriptMsg.scriptName = tittle.value;
    scriptMsg.scriptBackground = back.value;
    sessionStorage.setItem('myData', JSON.stringify(data2));
    cont.style.display = 'none';
    // 存储一下
    let data3 = sessionStorage.getItem('saveBase');
    let data4 = JSON.parse(data3);
    data4.scriptMsg.scriptName = tittle.value;
    data4.scriptMsg.scriptBackground = back.value;
    sessionStorage.setItem('saveBase', JSON.stringify(data4));
    saveBase();
})


// 监听节点拖拽事件
graph.on('node:drag', (e) => {
    const { item, x, y } = e;

    const model = item.getModel();


    let storedData = sessionStorage.getItem('myData');
    let data2 = JSON.parse(storedData);

    let storedData1 = sessionStorage.getItem('tuData');
    let data3 = JSON.parse(storedData1);

    let storedData2 = sessionStorage.getItem('savePlace');
    let data4 = JSON.parse(storedData2);

    // console.log("data2的值为：", data2);
    let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
    // console.log("你猜data3的值为", data3);
    let { edges, nodes } = data3;

    let { scriptId, scriptNodePositions } = data4;

    // 遍历 scriptNodes 数组
    scriptNodesArr = [];
    tuNodesArr = [];
    poArr = [];
    for (let i = 0; i < scriptNodes.length; i++) {
        // 获取当前对象的 scriptId 值，并将其存储到 arr 数组中
        scriptNodesArr.push(scriptNodes[i].nodeId);
        tuNodesArr.push(nodes[i].id);
        poArr.push(scriptNodePositions[i].nodeId);
    }

    for (let i = 0; i < scriptNodesArr.length; i++) {
        if (scriptNodesArr[i] == parseInt(model.id)) {
            scriptNodePositions[i].x = parseInt(x);
            scriptNodePositions[i].y = parseInt(y);
            scriptNodes[i].x = parseInt(x);
            scriptNodes[i].y = parseInt(y);
            nodes[i].x = parseInt(x);
            nodes[i].y = parseInt(y);
            sessionStorage.setItem('myData', JSON.stringify(data2));
            data2.scriptNodes.forEach(obj => {
                delete obj.x;
                delete obj.y;
            });
            sessionStorage.setItem('saveData', JSON.stringify(data2.scriptNodes));
            saveData();

            sessionStorage.setItem('savePlace', JSON.stringify(data4));
            savePlace();
            sessionStorage.setItem('tuData', JSON.stringify(data3));
            break;
        }
    }

});

// 指标文本框的展示
function showTextFields(num) {

    let textFieldHtml = '';

    for (let i = 0; i < num; i++) {
        textFieldHtml += '<label style="font-size:12px;">指标 ' + (i + 1) + `:</label><input  style="margin-bottom:5px;" type="text" id="indicator${i + 1}" placeholder="输入指标名称"><br>`;
    }

    document.getElementById('textFields').innerHTML = textFieldHtml;

    n = parseInt(num);

    fields = document.querySelectorAll('#textFields input');
    console.log("这是什么");
    let data1 = sessionStorage.getItem('myData');
    let data2 = JSON.parse(data1);
    console.log("这个171717data2是：", data2);

    let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;

    let properties = [];

    console.log("指标选择这里的显示：", scriptInfluenceName);

    for (const property in scriptInfluenceName) {
        if (/^influence\d+Name$/.test(property)) {
            properties.push(scriptInfluenceName[property]);
        }
    }

    console.log("最终显示为", properties);
    console.log("我也不知道是什么东西", fields);
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = properties[i];
        console.log(fields[i].value);
    }


}


// const fields =document.querySelectorAll('#textFields>input');
// 确认指标


const m = document.querySelector('.in>.m');
m.addEventListener("click", function () {
    let storedData = sessionStorage.getItem('myData');
    let data2 = JSON.parse(storedData);
    let { scriptMsg, scriptNodes, scriptInfluenceName } = data2;
    let data = {};
    let influenceNameId = sessionStorage.getItem('InfluenceName');

    if (n !== 0) {
        for (let j = 1; j < n + 1; j++) {
            data[`influence${j}Name`] = fields[j - 1].value;
            console.log(fields[j - 1].value);
        }
    }

    data2.scriptInfluenceName = { influenceNameId, ...data };

    // 禁用右边的文本框
    if (n == 0) {
        for (let i = 0; i < 2; i++) {
            data2.scriptInfluenceName.influence1Name = 'default';
            data2.scriptInfluenceName.influence2Name = 'default';
            data2.scriptInfluenceName.influence3Name = 'default';
            data2.scriptInfluenceName.influence4Name = 'default';
            i1s[i].innerHTML = '指标1';
            i2s[i].innerHTML = '指标2';
            i3s[i].innerHTML = '指标3';
            i4s[i].innerHTML = '指标4';
            prohibit(influence1s[i]);
            prohibit(influence2s[i]);
            prohibit(influence3s[i]);
            prohibit(influence4s[i]);
        }
    } else if (n == 1) {
        for (let i = 0; i < 2; i++) {
            // data2.scriptInfluenceName.influence1Name='default';
            data2.scriptInfluenceName.influence2Name = 'default';
            data2.scriptInfluenceName.influence3Name = 'default';
            data2.scriptInfluenceName.influence4Name = 'default';
            i1s[i].innerHTML = data.influence1Name;
            i2s[i].innerHTML = '指标2';
            i3s[i].innerHTML = '指标3';
            i4s[i].innerHTML = '指标4';
            on(influence1s[i]);
            prohibit(influence2s[i]);
            prohibit(influence3s[i]);
            prohibit(influence4s[i]);
        }
    } else if (n == 2) {
        for (let i = 0; i < 2; i++) {
            // data2.scriptInfluenceName.influence1Name='default';
            // data2.scriptInfluenceName.influence2Name='default';
            data2.scriptInfluenceName.influence3Name = 'default';
            data2.scriptInfluenceName.influence4Name = 'default';
            i1s[i].innerHTML = data.influence1Name;
            i2s[i].innerHTML = data.influence2Name;
            i3s[i].innerHTML = '指标3';
            i4s[i].innerHTML = '指标4';
            on(influence1s[i]);
            on(influence2s[i]);
            prohibit(influence3s[i]);
            prohibit(influence4s[i]);
        }
    } else if (n == 3) {
        for (let i = 0; i < 2; i++) {
            // data2.scriptInfluenceName.influence1Name='default';
            // data2.scriptInfluenceName.influence2Name='default';
            // data2.scriptInfluenceName.influence3Name='default';
            data2.scriptInfluenceName.influence4Name = 'default';
            i1s[i].innerHTML = data.influence1Name;
            i2s[i].innerHTML = data.influence2Name;
            i3s[i].innerHTML = data.influence3Name;
            i4s[i].innerHTML = '指标4';
            on(influence1s[i]);
            on(influence2s[i]);
            on(influence3s[i]);
            prohibit(influence4s[i]);
        }
    } else if (n == 4) {
        for (let i = 0; i < 2; i++) {
            i1s[i].innerHTML = data.influence1Name;
            i2s[i].innerHTML = data.influence2Name;
            i3s[i].innerHTML = data.influence3Name;
            i4s[i].innerHTML = data.influence4Name;
            on(influence1s[i]);
            on(influence2s[i]);
            on(influence3s[i]);
            on(influence4s[i]);
        }
    }

    sessionStorage.setItem('myData', JSON.stringify(data2));


    let InfluenceName = sessionStorage.getItem('InfluenceName');

    let data3 = JSON.parse(InfluenceName);
    const { scriptStatus, ...newMsg } = data2.scriptMsg;

    let saveBack = {
        scriptInfluenceName: data2.scriptInfluenceName,
        scriptMsg: newMsg,
    };

    saveBack.scriptInfluenceName.influenceNameId = data3;

    console.log("啊啊啊啊，我要疯了", saveBack);

    //保存剧本的指标---用于存储的（参数，已完成）
    sessionStorage.setItem('saveBase', JSON.stringify(saveBack));
    saveBase();

    data2.scriptNodes.forEach(obj => {
        delete obj.x;
        delete obj.y;
    });

    sessionStorage.setItem('saveData', JSON.stringify(data2.scriptNodes));

    saveData();
    index.style.display = 'none';
})





const indexSelect = document.querySelector('.indexSelect');
const index = document.querySelector('.index');
indexSelect.addEventListener('click', function () {
    index.style.display = 'block';
})
const indexClosed = document.querySelector('.index .closed');
indexClosed.addEventListener('click', function () {
    index.style.display = 'none';
})

const create = document.querySelector('#container .create');
create.addEventListener('click', function () {
    window.location = 'draft.html';
})

const baseImg = base.querySelector('.base>img');

base.addEventListener('mouseenter', function () {
    baseImg.setAttribute('src', './images/revolve.gif');
});

base.addEventListener('mouseleave', function () {
    baseImg.setAttribute('src', './images/amplify.gif');
});


const change = document.querySelector('.change');

change.addEventListener('click', function (e) {
    // console.log(change.getAttribute('value'));
    if (change.getAttribute('value') === 'default') {
        change.setAttribute('value', 'addNode');
    } else {
        change.setAttribute('value', 'default');
    }
    change.classList.toggle('act');
    // console.log(change.getAttribute('value'));
    graph.setMode(change.getAttribute('value'));
});


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

let personID = document.querySelector('.personID');

let username = sessionStorage.getItem("userid");
if (username == ' ' || username == null) {
    personID.innerHTML = '未登录';
} else {
    personID.innerHTML = username;
}

let Pic2 = document.querySelector('.personHead>img');
// console.log(sessionStorage.getItem("pic"));
// Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
if (sessionStorage.getItem("pic") != 'null') {
    Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
} else if (sessionStorage.getItem("pic") == null) {
    Pic2.src = 'data:image/png;base64,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';
}


const endBig = document.querySelector('.endBig');
const endOut = document.querySelector('.endOut');
const eX = document.querySelector('.endIn>.closed');
endBig.addEventListener('click', function () {
    endOut.style.display = 'block';
})
eX.addEventListener('click', function () {
    endOut.style.display = 'none';
})


let bodyList = document.querySelector('.bodyList');
bodyList.addEventListener('wheel', function (event) {
    event.stopPropagation();
});


newOne.addEventListener('click', function () {
    newSpecialEnd();
})

// 选择所有具有类名为"a"的元素
let elements = document.querySelectorAll('.font.a');

let del = function (elements) {
    elements.forEach(function (element) {
        // 监听元素的点击事件
        element.addEventListener('click', function () {
            // 获取元素最近的tr祖先元素，并隐藏它
            let tr = element.closest('tr');
            console.log("这个是什么啊", tr);
            console.log("这个id为：：：", tr.getAttribute('data-id'));
            const url = 'http://47.113.231.211:3000/script/repository/end/del';
            const headers = {
                'Content-Type': 'application/json',
            };

            const payload = {
                "endId": parseInt(tr.getAttribute('data-id'))
            };

            // 发送 POST 请求
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    tr.style.display = 'none';
                })
                .catch(error => {
                    console.error(error);
                });
        });
    });
}

let goodOne = document.querySelector('.wait1>.goodOne');
goodOne.addEventListener('click', function () {
    let data = {};
    // 一开始的id
    let scriptId = sessionStorage.getItem('scriptId');
    data.scriptId = parseInt(scriptId);

    // 普通结局
    data.scriptNormalEnd = {};

    let data3 = sessionStorage.getItem('normalEndId');
    data3 = JSON.parse(data3);
    data.scriptNormalEnd.normalEndId = data3;

    data.scriptNormalEnd.normalEnd1 = setEnd1.value;
    data.scriptNormalEnd.normalEnd2 = setEnd2.value;

    data.scriptNormalEnd.startValue1 = parseInt(z1.querySelector('.pre').value);
    data.scriptNormalEnd.endValue1 = parseInt(z1.querySelector('.next').value);


    data.scriptNormalEnd.startValue2 = parseInt(z2.querySelector('.pre').value);
    data.scriptNormalEnd.endValue2 = parseInt(z2.querySelector('.next').value);

    data.scriptNormalEnd.startValue3 = parseInt(z3.querySelector('.pre').value);
    data.scriptNormalEnd.endValue3 = parseInt(z3.querySelector('.next').value);

    data.scriptNormalEnd.startValue4 = parseInt(z4.querySelector('.pre').value);
    data.scriptNormalEnd.endValue4 = parseInt(z4.querySelector('.next').value);

    // 特殊结局
    data.scriptEnd = [];
    let trs = bodyListT.querySelectorAll('tr');

    trs.forEach(function (e) {
        let setAEnd = {}
        setAEnd.endId = parseInt(e.getAttribute('data-id'));
        setAEnd.endMsg = e.querySelector('.ee textarea').value;
        setAEnd.influence1 = parseInt(e.querySelector('.ea.e1 textarea').value);
        setAEnd.influence2 = parseInt(e.querySelector('.ea.e2 textarea').value);
        setAEnd.influence3 = parseInt(e.querySelector('.ea.e3 textarea').value);
        setAEnd.influence4 = parseInt(e.querySelector('.ea.e4 textarea').value);
        data.scriptEnd.push(setAEnd);
    });

    sessionStorage.setItem('saveEnd', JSON.stringify(data));
    console.log("最后需要的数据：", data);
    endOut.style.display = 'none';
    renewNormalEnd();
    renewSpecialEnd();
    // saveSpecialEnd();
    // saveEnd();
})

const onEnd = document.querySelector('.fillIn>.end');
const tip = document.querySelector('.fillIn>.tip');
const tX = document.querySelector('.fillIn>.tip .closed');
const tGood = document.querySelector('.fillIn>.tip .good1')

tX.addEventListener('click', function () {
    tip.style.display = 'none';
})

onEnd.addEventListener('click', function () {
    tip.style.display = 'block';
})


tGood.addEventListener('click', function () {
    let data1 = sessionStorage.getItem('myData');
    data1 = JSON.parse(data1);
    console.log("myData", data1);
    let data2 = sessionStorage.getItem('saveData');
    data2 = JSON.parse(data2);
    console.log("saveData", data2);
    console.log("卡牌id", scriptid.value);
    if (scriptid.value !== '') {
        let arr = [];
        for (let i = 0; i < data1.scriptNodes.length; i++) {
            arr.push(data1.scriptNodes[i].nodeId);
        }
        console.log("这个arr值为：", arr);
        for (let i = 0; i < arr.length; i++) {
            if (scriptid.value == arr[i]) {
                console.log(data1.scriptNodes[i]);
                data1.scriptNodes[i].leftChoice = {};
                data1.scriptNodes[i].rightChoice = {};
                data2[i].leftChoice = {};
                data2[i].rightChoice = {};
            }
        }
    }
    sessionStorage.setItem('saveData', JSON.stringify(data2));
    sessionStorage.setItem('myData', JSON.stringify(data1));
    saveData();
    tip.style.display = 'none';
})