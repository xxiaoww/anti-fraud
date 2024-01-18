let timer
    // 用户的选择
let option1 = false
    // 对手的选择
let option2 = false
let r = 0
    // 获取当前选择的选项
function choose(rightAnswer, userId) {
    const question = document.querySelectorAll('.questions>div>div');
    console.log(question);
    const questions = document.querySelector('.questions>div');
    console.log(questions);
    questions.style.top = '0px'

    const countdown = document.querySelector('.countdown')
        // 获取每个题所有选项
        // 添加一个定时器
    timer = setInterval(function() {
        const cdown = parseInt(countdown.innerHTML)
        countdown.innerHTML = cdown - 1
        console.log(r)
        if (r <= 5 && countdown.innerHTML === '0') {
            option1 = true
                // 渲染自己的分数
            const myscore = document.querySelector('.user-num')
            const mynum = parseInt(myscore.innerHTML)
            myscore.innerHTML = +mynum + 0
            let userscore = mynum + 0
            console.log(userscore)
            let userSelectedAnswerIndex = null
                //send更新自己的分数
            commitAnswer(userscore, userSelectedAnswerIndex, userId)
            console.log(r)
            r++
            if (r >= 4) {
                clearInterval(timer)
                countdown.display = 'none'
                countdown.innerHTML = 10
            } else {
                questions.style.top = -520 * r + 'px'
                countdown.innerHTML = 10
            }
        }
        if (r >= 5) {
            const userscore = document.querySelector('.user-num').innerHTML
            const opponentscore = document.querySelector('.opponent-num').innerHTML
            const userid = sessionStorage.getItem('userId')
            const opponentid = sessionStorage.getItem('opponentId')
            const win = document.querySelector('.win img')
            if (userscore < opponentscore) {
                win.src = 'images/fail1.png'
                gameover(opponentid)
            } else {
                gameover(userid)
            }
            // 渲染到结算页面
            document.querySelector('.opponentscore').innerHTML = opponentscore
            document.querySelector('.userscore').innerHTML = userscore
                // pk页面隐藏
            const pk = document.querySelector('.fight>div:first-of-type')
            pk.style.display = 'none'
                // 结算页面显示
            const gameoverr = document.querySelector('.gameover')
            gameoverr.style.display = 'block'

            clearInterval(timer)
        }
    }, 1000);
    for (let i = 0; i < question.length; i++) {
        let qAnswer = question[i]
        console.log(qAnswer)
        const options = qAnswer.querySelector('form');

        // 为每个选项添加点击事件处理函数
        // options.forEach(option => {
        //     option.addEventListener('click', select);

        // });
        // 显示点击的
        // 事件委托给form绑定
        qAnswer.addEventListener('click', select)
    }

    function select(event) {
        const target = event.target;
        console.log(target)
            // 检查点击的元素是否为 input 元素
        if (target.tagName === 'LABEL') {
            target.style.backgroundColor = '#718bc0'
                // 取消绑定当前 form 元素的事件委托
            const formElement = target.closest('form');
            formElement.removeEventListener('click', arguments.callee);
        }
        // 获取所选选项的值
        const value = target.querySelector('input')
        const selectedValue = value.value;
        console.log(selectedValue)
        const arraynum = this.getAttribute('data-index')
        console.log(event.target)
        console.log(rightAnswer[r])
        if (selectedValue === rightAnswer[r]) {
            const score = countdown.innerHTML
            console.log(score)
            if (score >= 6) {
                // 渲染自己的分数
                option1 = true
                const myscore = document.querySelector('.user-num')
                const mynum = parseInt(myscore.innerHTML)
                myscore.innerHTML = +mynum + 100
                let userscore = mynum + 100
                console.log(userscore)
                let userSelectedAnswerIndex = selectedValue
                    //send更新自己的分数
                commitAnswer(userscore, userSelectedAnswerIndex, userId)
                    // 更新进度条
                const jindu = document.querySelector('.user-son')
                const height = jindu.offsetHeight
                jindu.style.height = height + 90 + 'px'


            } else if (score > 4 && score < 6) {
                option1 = true
                const myscore = document.querySelector('.user-num')
                const mynum = parseInt(myscore.innerHTML)
                myscore.innerHTML = +mynum + 70
                let userscore = mynum + 70
                console.log(userscore)
                let userSelectedAnswerIndex = selectedValue
                    //send更新自己的分数
                commitAnswer(userscore, userSelectedAnswerIndex, userId)
                    // 更新进度条
                const jindu = document.querySelector('.user-son')
                const height = jindu.offsetHeight
                jindu.style.height = height + 63 + 'px'
            } else if (score > 2 && score < 4) {
                option1 = true
                const myscore = document.querySelector('.user-num')
                const mynum = parseInt(myscore.innerHTML)
                myscore.innerHTML = +mynum + 40
                let userscore = mynum + 40
                console.log(userscore)
                let userSelectedAnswerIndex = selectedValue
                    //send更新自己的分数
                commitAnswer(userscore, userSelectedAnswerIndex, userId)
                    // 更新进度条
                const jindu = document.querySelector('.user-son')
                const height = jindu.offsetHeight
                jindu.style.height = height + 36 + 'px'
            } else {
                option1 = true
                const myscore = document.querySelector('.user-num')
                const mynum = parseInt(myscore.innerHTML)
                myscore.innerHTML = +mynum + 20
                let userscore = mynum + 20
                console.log(userscore)
                let userSelectedAnswerIndex = selectedValue
                    //send更新自己的分数
                commitAnswer(userscore, userSelectedAnswerIndex, userId)
                    // 更新进度条
                const jindu = document.querySelector('.user-son')
                const height = jindu.offsetHeight
                jindu.style.height = height + 18 + 'px'
            }
        } else {
            option1 = true
                // 渲染自己的分数
            const myscore = document.querySelector('.user-num')
            const mynum = parseInt(myscore.innerHTML)
            myscore.innerHTML = +mynum + 0
            let userscore = mynum + 0
            console.log(userscore)
                // 传输索引
            let userSelectedAnswerIndex = selectedValue
                //send更新自己的分数
            commitAnswer(userscore, userSelectedAnswerIndex, userId)
        }
        if (option2 && option1) {
            r++
            questions.style.top = -520 * r + 'px'
            countdown.innerHTML = 10
            option1 = false
            option2 = false
        }
        console.log(this, this.target);
        this.removeEventListener('click', select);
    }
    const myanswer = document.querySelectorAll('label');
    console.log(myanswer)
    for (let i = 0; i < myanswer.length; i++) {
        myanswer[i].addEventListener('click', function() {
            myanswer[i].backgroundColor = '#718bc0'
        })
    }

}


// choose()
let token = `${sessionStorage.getItem('sign1')}`
console.log(token)
axios({
        method: 'GET',
        url: 'http://47.113.231.211:3000/users',
        headers: {
            'token': `${token}`
        }
    })
    .then(res => { // 接口数据
        console.log(res.data);
        let { data } = res.data
        let { user } = data
        // 存储userId到 sessionStorage
        sessionStorage.setItem('userId', user.userId);
    })

.catch(error => { //  处理错误
    console.error(error);
});


// 点击汇总页面的pk,开始链接到websocket
const inner3 = document.querySelector('.panel:nth-of-type(3) .inner')
console.log(inner3)
inner3.addEventListener('click', function() {
        let userId = sessionStorage.getItem('userId')
        console.log(userId)
        connect(userId)
    })
    // 点击开始匹配,进行匹配,并且进入到答题界面
const switchs = document.querySelector('.pk input')
switchs.addEventListener('click', function() {
    // 开始随机匹配
    let userId = sessionStorage.getItem('userId')
    console.log(userId)
    matchUser(userId)
    const fight = document.querySelector('.fight')
    const pk = document.querySelector('.pk')
    let timer = setTimeout(function() {
            pk.style.display = 'none'
            fight.style.display = 'block'
        }, 1000)
        // 渲染自己的信息
    userInfo()
    const questionBox = document.querySelector('.questions>div')
    questionBox.innerHTML = '正在寻找对手...'
        // 倒计时盒子
    const countdown = document.querySelector('.countdown')
    countdown.style.display = 'none'
})

function connect(userId) {
    // userId = $("#userIdInput").val();
    var socketUrl = "ws://47.113.231.211:3000/competition/" + userId;
    console.log(socketUrl);
    socket = new WebSocket(socketUrl);
    // 在此触发OnOpen
    //打开事件
    socket.onopen = function() {
        console.log("websocket 已打开 userId: " + userId);
    };
    // 在此触发OnMessage
    //获得消息事件
    socket.onmessage = function(msg) {
        // 此处编写得到消息之后的具体逻辑
        // 提交每一题之后 需要更新玩家的分数和
        // chatMessage就是真正的类 响应数据
        console.log(msg);
        let chatMessage = msg.data;
        chatMessage = JSON.parse(chatMessage);
        console.log(chatMessage)
        let message = chatMessage.chatMessage
        console.log(message)
        let data = message.data;
        console.log(data)
        let type = message.type;
        console.log(type)
            // 以上均为通用代码
            // 正确答案的数组
        let rightAnswer = []
            // 如果接收到的是匹配时 代表此时已经有用户匹配成功 后端发送题目以及 对应的用户信息
        if (type === "MATCH_USER") {
            let gameMatchInfo = message.data;
            console.log(gameMatchInfo)
                // gameMatchInfo对应chatMessage中的T data
            let questionList = gameMatchInfo.questions;
            console.log(questionList)
                // 获取到所有问题的题目及答案
                // questionList表示此次对战中的题库

            // 记录正确答案
            for (let i = 0; i < questionList.length; i++) {
                rightAnswer.push(questionList[i].rightAnswer)
            }
            console.log(rightAnswer)
            let userId = sessionStorage.getItem('userId')
                // 异步函数
            async function wait(questionList, rightAnswer, userId) {
                // 渲染题目到页面上
                await questionDisplay(questionList)
                choose(rightAnswer, userId)
                displayOver(questionList, rightAnswer)
            }
            // 调用异步函数
            wait(questionList, rightAnswer, userId)
                // 同时需要获取到对面的用户的信息
            let selfInfo = gameMatchInfo.selfInfo;

            // selfInfo是自己的信息
            // selfInfo则代表的是GameMatchInfo中selfInfo的属性
            let selfId = selfInfo.userId;
            if (selfId === userId) {
                selfUsername = gameMatchInfo.selfUsername;
                selfPicAvatar = gameMatchInfo.selfPicAvatar;
                let opponentInfo = gameMatchInfo.opponentInfo;
                // opponentInfo则是对面的信息
                // 获取到对面用户的id 头像 名字
                opponentUserId = opponentInfo.userId;
                opponentUsername = gameMatchInfo.opponentUsername;
                opponentPicAvatar = gameMatchInfo.opponentPicAvatar
                sessionStorage.setItem('opponentId', opponentUserId)
                console.log(opponentUserId)
                console.log(opponentUsername)
                console.log(opponentPicAvatar)

                // 渲染对手的信息
                opponentinfo(opponentPicAvatar, opponentUsername)
            } else {
                opponentUserId = selfId
                opponentUsername = gameMatchInfo.selfUsername;
                opponentPicAvatar = gameMatchInfo.selfPicAvatar;
                sessionStorage.setItem('opponentId', opponentUserId)
                console.log(opponentUserId)
                console.log(opponentUsername)
                console.log(opponentPicAvatar)
                    // 渲染对手的信息
                opponentinfo(opponentPicAvatar, opponentUsername)
            }

        }

        // 根据当前玩家是否提交 如果当前玩家也提交了的话 渲染对面选择
        // 如果当前用户未提交 等待直至提交了 再渲染

        // 如果接收到的是 对战中的信息 代表此时已经对面已经回答 如果答对了需要更新分数信息
        if (type === "PLAY_GAME") {
            let selfId = message.data.userMatchInfo.userId
            if (selfId === userId) {
                // 更新对方的分数
                const opponentScore = document.querySelector('.opponent-num')
                opponentnum = parseInt(opponentScore.innerHTML)
                let score = message.data.userMatchInfo.score
                opponentScore.innerHTML = score
            } else {
                option2 = true
                let opponentId = selfId
                const opponentScore = document.querySelector('.opponent-num')
                opponentnum = parseInt(opponentScore.innerHTML)
                let score = message.data.userMatchInfo.score
                opponentScore.innerHTML = score
                let less = +score - opponentnum
                    // 更新进度条
                const jindu = document.querySelector('.opponent-son')
                const height = jindu.offsetHeight
                if (less === 100)
                    jindu.style.height = height + 90 + 'px';
                else if (less === 70)
                    jindu.style.height = height + 63 + 'px';
                else if (less === 40)
                    jindu.style.height = height + 36 + 'px';
                else if (less === 20)
                    jindu.style.height = height + 18 + 'px';
                if (option2 && option1) {
                    const questions = document.querySelector('.questions>div');
                    const countdown = document.querySelector('.countdown')
                    r++
                    questions.style.top = -520 * r + 'px'
                    countdown.innerHTML = 10
                    option1 = false
                    option2 = false
                }
            }

            // 这个data目前表示的是scoreSelectedInfo的匿名对象
            opponentSelectedAnswerIndex = data.userSelectedAnswerIndex;
            // 更新对面用户的分数
            opponentScore = data.userMatchInfo.score;
            isOpponentSelect = true;
            // 更新完分数了 这时候需要重新渲染出下一题 依次进行循环
        }
        if (type === "GAME_OVER") {
            if (userId === data.receiver) {
                // 渲染结算页面的我的答案
                const userlist = document.querySelectorAll('.user-list li')
                    // 渲染对手的答案
                const opponentlist = document.querySelectorAll('.opponent-list li')
                for (let i = 0; i < userlist.length; i++) {
                    if (data.opponentAnswerSituations.selfAnswerSituations[i] !== rightAnswer[i]) {
                        userlist[i].backgroundColor = 'red'
                    } else {
                        userlist[i].backgroundColor = 'green'
                    }
                    if (data.selfAnswerSituations.selfAnswerSituations[i] !== rightAnswer[i]) {
                        opponentlist[i].backgroundColor = 'red'
                    } else {
                        opponentlist[i].backgroundColor = 'green'
                    }
                    userlist[i].innerHTML = data.opponentAnswerSituations.selfAnswerSituations[i]
                    opponentlist[i].innerHTML = data.selfAnswerSituations.selfAnswerSituations[i]
                }
            } else {
                // 渲染结算页面的我的答案
                const userlist = document.querySelectorAll('.user-list li')
                    // 渲染对手的答案
                const opponentlist = document.querySelectorAll('.opponent-list li')
                for (let i = 0; i < userlist.length; i++) {
                    opponentlist[i].innerHTML = data.opponentAnswerSituations.selfAnswerSituations[i]
                    userlist[i].innerHTML = data.selfAnswerSituations.selfAnswerSituations[i]
                }
            }

        }
        var serverMsg = "收到服务端信息: " + msg.data;
        console.log(serverMsg);

    };
    // 在此触发OnClose
    //关闭事件
    socket.onclose = function() {
        console.log("websocket 已关闭 userId: " + userId);
    };
    // 在此触发OnError
    //发生了错误事件
    socket.onerror = function() {
        console.log("websocket 发生了错误 userId : " + userId);
    }
}
// 渲染问题
function questionDisplay(questionList) {
    // 倒计时盒子
    const countdown = document.querySelector('.countdown')
    countdown.style.display = 'block'
        // 获取放问题的盒子
    const questionBox = document.querySelector('.questions>div')
    questionBox.innerHTML = ''

    let option1 = []
    let option2 = []
    let option3 = []
    let option4 = []
    let option5 = []

    for (let i = 0; i < questionList.length; i++) {
        if (i === 0) {
            let label1 = ` <label>
            <input type="radio" id="option1" data-index="0" name="options" value="${questionList[0].rightAnswer}">${questionList[0].rightAnswer}</label><br>`
            let label2 = ` <label>
            <input type="radio" id="option1" data-index="1"  name="options" value="${questionList[0].wrongAnswer1}">${questionList[0].wrongAnswer1}</label><br>`
            let label3 = ` <label>
            <input type="radio" id="option1" data-index="2"  name="options" value="${questionList[0].wrongAnswer2}">${questionList[0].wrongAnswer2}</label><br>`
            let label4 = ` <label>
            <input type="radio" id="option1" data-index="3"  name="options" value="${questionList[0].wrongAnswer3}">${questionList[0].wrongAnswer3}</label><br>`
            option1.push(label1, label2, label3, label4)
            ShuffleArray(option1)
            let optionhtml = ''
            for (let j = 0; j < option1.length; j++) {
                optionhtml += option1[j]
            }
            console.log(optionhtml)
            questionBox.innerHTML += `<div class="question1">
            <div class="title">${questionList[0].questionMsg}</div>
            <form>
              ${optionhtml}
            </form>
          </div>`;
        } else if (i === 1) {
            let label1 = ` <label>
            <input type="radio" id="option1" data-index="0" name="options" value="${questionList[1].rightAnswer}">${questionList[1].rightAnswer}</label><br>`
            let label2 = ` <label>
            <input type="radio" id="option1" data-index="1"  name="options" value="${questionList[1].wrongAnswer1}">${questionList[1].wrongAnswer1}</label><br>`
            let label3 = ` <label>
            <input type="radio" id="option1" data-index="2"  name="options" value="${questionList[1].wrongAnswer2}">${questionList[1].wrongAnswer2}</label><br>`
            let label4 = ` <label>
            <input type="radio" id="option1" data-index="3"  name="options" value="${questionList[1].wrongAnswer3}">${questionList[1].wrongAnswer3}</label><br>`
            option2.push(label1, label2, label3, label4)
            ShuffleArray(option2)
            let optionhtml = ''
            for (let j = 0; j < option2.length; j++) {
                optionhtml += option2[j]
            }
            questionBox.innerHTML += `<div class="question1">
            <div class="title">${questionList[1].questionMsg}</div>
            <form>
              ${optionhtml}
            </form>
          </div>`;
        } else if (i === 2) {
            let label1 = ` <label>
            <input type="radio" id="option1" data-index="0" name="options" value="${questionList[2].rightAnswer}">${questionList[2].rightAnswer}</label><br>`
            let label2 = ` <label>
            <input type="radio" id="option1" data-index="1"  name="options" value="${questionList[2].wrongAnswer1}">${questionList[2].wrongAnswer1}</label><br>`
            let label3 = ` <label>
            <input type="radio" id="option1" data-index="2"  name="options" value="${questionList[2].wrongAnswer2}">${questionList[2].wrongAnswer2}</label><br>`
            let label4 = ` <label>
            <input type="radio" id="option1" data-index="3"  name="options" value="${questionList[2].wrongAnswer3}">${questionList[2].wrongAnswer3}</label><br>`
            option3.push(label1, label2, label3, label4)
            ShuffleArray(option3)
            let optionhtml = ''
            for (let j = 0; j < option3.length; j++) {
                optionhtml += option3[j]
            }
            questionBox.innerHTML += `<div class="question1">
            <div class="title">${questionList[2].questionMsg}</div>
            <form>
              ${optionhtml}
            </form>
          </div>`;
        } else if (i === 3) {
            let label1 = ` <label>
            <input type="radio" id="option1" data-index="0" name="options" value="${questionList[3].rightAnswer}">${questionList[3].rightAnswer}</label><br>`
            let label2 = ` <label>
            <input type="radio" id="option1" data-index="1"  name="options" value="${questionList[3].wrongAnswer1}">${questionList[3].wrongAnswer1}</label><br>`
            let label3 = ` <label>
            <input type="radio" id="option1" data-index="2"  name="options" value="${questionList[3].wrongAnswer2}">${questionList[3].wrongAnswer2}</label><br>`
            let label4 = ` <label>
            <input type="radio" id="option1" data-index="3"  name="options" value="${questionList[3].wrongAnswer3}">${questionList[3].wrongAnswer3}</label><br>`
            option4.push(label1, label2, label3, label4)
            ShuffleArray(option4)
            let optionhtml = ''
            for (let j = 0; j < option4.length; j++) {
                optionhtml += option4[j]
            }
            questionBox.innerHTML += `<div class="question1">
            <div class="title">${questionList[3].questionMsg}</div>
            <form>
              ${optionhtml}
            </form>
          </div>`;
        } else {
            let label1 = ` <label>
            <input type="radio" id="option1" data-index="0" name="options" value="${questionList[4].rightAnswer}">${questionList[4].rightAnswer}</label><br>`
            let label2 = ` <label>
            <input type="radio" id="option1" data-index="1"  name="options" value="${questionList[4].wrongAnswer1}">${questionList[4].wrongAnswer1}</label><br>`
            let label3 = ` <label>
            <input type="radio" id="option1" data-index="2"  name="options" value="${questionList[4].wrongAnswer2}">${questionList[4].wrongAnswer2}</label><br>`
            let label4 = ` <label>
            <input type="radio" id="option1" data-index="3"  name="options" value="${questionList[4].wrongAnswer3}">${questionList[4].wrongAnswer3}</label><br>`
            option5.push(label1, label2, label3, label4)
            ShuffleArray(option5)
            let optionhtml = ''
            for (let j = 0; j < option5.length; j++) {
                optionhtml += option5[j]
            }
            questionBox.innerHTML += `<div class="question1">
            <div class="title">${questionList[4].questionMsg}</div>
            <form>
              ${optionhtml}
            </form>
          </div>`;
        }
    }
}

// 打乱选项函数
function ShuffleArray(arr) {
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
// 随机匹配
function matchUser(userId) {
    var chatMessage = {};
    var sender = userId;
    var type = "MATCH_USER";
    chatMessage.sender = sender;
    chatMessage.type = type;
    console.log("用户:" + sender + "开始匹配......");
    socket.send(JSON.stringify(chatMessage));
}
// 对手信息的渲染
function opponentinfo(opponentPicAvatar, opponentUsername) {
    // 头像
    const opponentImg = document.querySelector('.opponent-pic img')
    const opimg = document.querySelector('.opponent-img img')
    console.log(opponentImg)
        // username
    const opponentname = document.querySelector('.opponent-name')
    const opusername = document.querySelector('.opponent-username')
    console.log(opponentname)
    opponentImg.src = 'data:image/png;base64,' + `${opponentPicAvatar}`;
    opimg.src = 'data:image/png;base64,' + `${opponentPicAvatar}`;
    opponentname.innerHTML = opponentUsername
    opusername.innerHTML = opponentUsername
}
// 自己信息的渲染
function userInfo() {
    // 头像
    const userImg = document.querySelector('.user-pic img')
    const userimg = document.querySelector('.user-img img')
    const usernnmae = document.querySelector('.user-username')
        // username
    const username = document.querySelector('.user-name')
    userImg.src = 'data:image/png;base64,' + `${sessionStorage.getItem('pic')}`;
    userimg.src = 'data:image/png;base64,' + `${sessionStorage.getItem('pic')}`;
    username.innerHTML = `${sessionStorage.getItem('userid')}`
    usernnmae.innerHTML = `${sessionStorage.getItem('userid')}`
}
// 游戏中
// function userInPlay(){
// 这里的question是对应的问题的编号
function commitAnswer(score, userSelectedAnswerIndex, userId) {
    let chatMessage = {};
    let sender = userId;
    let type = "PLAY_GAME";

    // 如果答对了就更新分数 客户端向服务器发起请求
    // 如果没答对 也发送请求 此时也会执行代码 但是分数不会有变化
    // userScore是玩家的积分 TODO 根据玩家所耗时间来决定积分的加多少
    // 发送玩家的新得分以及自己的选项
    var data = {
        userScore: score,
        userSelectedAnswer: userSelectedAnswerIndex
    }
    chatMessage.sender = sender;
    chatMessage.data = data;
    chatMessage.type = type;
    console.log("用户:" + sender + "更新分数为" + data);
    console.log(chatMessage)
    socket.send(JSON.stringify(chatMessage));
    // 这里标记当前用户已经选择了
    isUserSelect = true;
}
// 按照游戏流程 写完所有的题之后 需要到结算页面
// 游戏结束
// 结束的时候 要告诉服务器谁是获胜者 把获胜者的id传过去吧
function gameover(userId) {
    let chatMessage = {};
    let data = null;

    data = userId;
    var sender = userId;
    var type = "GAME_OVER";
    chatMessage.sender = sender;
    chatMessage.type = type;
    chatMessage.data = data;
    console.log("用户:" + sender + "结束游戏");
    socket.send(JSON.stringify(chatMessage));
    userScore = 0;
    opponentScore = 0;
}

// 结算页面点击第几题显示第几题的题目和答案
const span = document.querySelectorAll('.num-list span')
    // 显示的答案和题目的大盒子
const gametotal = document.querySelectorAll('.game-total')
for (let i = 0; i < span.length; i++) {
    span[i].addEventListener('click', function() {
        for (let j = 0; j < gametotal.length; j++) {
            gametotal[j].style.display = 'none'
        }
        gametotal[i].style.display = 'block'
    })
}
// 渲染结算页面的题目和答案
function displayOver(questionList, rightAnswer) {
    // 获取装问题的盒子
    const timu = document.querySelectorAll('.timu')
        // 获取装答案的盒子
    const daan = document.querySelectorAll('.daan')
    for (let i = 0; i < questionList.length; i++) {
        timu[i].innerHTML = questionList[i].questionMsg
        daan[i].innerHTML += rightAnswer[i]
    }
}
// 点击退出按钮,关闭websocket
const tuichu = document.querySelector('.tuichu')

console.log(tuichu)
tuichu.addEventListener('click', function() {
    let userId = sessionStorage.getItem('userId')
    const bigPk = document.querySelector('.bigPk')
    bigPk.style.display = 'none'
    const wrap = document.getElementById('wrap')
    wrap.style.display = 'block'
        //关闭事件
    socket.close()
    socket.onclose = function() {
        console.log("websocket 已关闭 userId: " + userId);
    };
})
const turnon = document.querySelector('.turn-on')
turnon.addEventListener('click', function() {
    let userId = sessionStorage.getItem('userId')
        //关闭事件
    socket.close()
    socket.onclose = function() {
        console.log("websocket 已关闭 userId: " + userId);
    };
})