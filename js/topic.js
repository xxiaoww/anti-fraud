// 渲染话题
axios({
        method: 'GET',
        url: 'http://47.113.231.211:3000/community/vote/before',

    })
    .then(res => {
        // 接口数据
        console.log(res.data);
        let { data } = res.data;
        console.log(data);


        // 渲染话题
        async function executeFunctions1(data) {
            await displayTopic(data); // 等待第一个函数执行完成
            //基本点击事件
            topicComment()
                // 执行投票
            vote()



        }
        executeFunctions1(data)

    })
    .catch(error => {
        // 处理错误
        console.error(error);
    });
//渲染话题
function displayTopic(data) {
    const Topic = document.querySelector('.Topic')
    console.log(Topic)
    for (let i = data.length - 1; i > 0; i--) {

        let { voteChoice1 } = data[i];
        let { voteChoice2 } = data[i];
        Topic.innerHTML += ` <div class="topic">
        <div class="topic-sum">
            <div class="voteId">${data[i].voteId}</div>
            <div class="top-topic">${data[i].topic}</div>
            <div class="top-main">${data[i].main}</div>
        </div>
        <div class="vote">
            <div class="right" data-msg="${voteChoice1.msg}"><span>${voteChoice1.msg}</span><span class="right-choose">${voteChoice1.approve}</span></div>
            <div class="false" data-msg="${voteChoice1.msg}"><span>${voteChoice2.msg}</span><span class="wrong-choose">${voteChoice2.approve}</span></div>
        </div>
        <div class="vote-result">
        <div>
                            <div class="fa">
                                <div class="father">
                                    <div class="son"></div>
                                </div>
                                <div class="progress">0%</div>
                            </div>
                            <div class="fa">
                                <div class="father">
                                    <div class="son"></div>
                                </div>
                                <div class="progress">0%</div>
                            </div></div>
                        </div>
        <div class="like-com">
           
            <div class="shares2">
                <span class="liuyan2"><img src="images/liuyan.png" ></span><span>
    </span>
            </div>
        </div>
        <div class="comment-dis">展开评论</div>
        <div class="topic-comment">
            <div>

            </div>
        </div>

    </div>`
    }

}
// 渲染评论
function topicComment() {
    Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
    userId = sessionStorage.getItem("userid")
        // 展开评论和收起评论
    const comment_dis = document.querySelectorAll('.comment-dis')
    console.log(comment_dis)
        // 获取话题文章
    const topic_comment = document.querySelectorAll('.topic-comment')
    console.log(topic_comment)
    const topic_comment2 = document.querySelectorAll('.topic-comment>div')

    // 全局变量 c
    let c = 1;
    for (let i = 0; i < comment_dis.length; i++) {
        comment_dis[i].addEventListener('click', function() {
            c++;
            if (c % 2 === 0) {
                topic_comment[i].style.display = 'block'
                comment_dis[i].innerHTML = '收起评论'
                const votdIdCount = document.querySelectorAll('.voteId')
                const voteId = votdIdCount[i].innerHTML
                const top_comment = topic_comment2[i]
                top_comment.innerHTML = ''
                    // 渲染一级评论              
                displayFirst(voteId, top_comment, i);
            } else {
                const top_comment = topic_comment2[i]
                top_comment.innerHTML = ''
                topic_comment[i].style.display = 'none'
                comment_dis[i].innerHTML = '展开评论'
            }
        })
    }
    // 点击评论图标进行一级评论
    const liuyan2 = document.querySelectorAll('.liuyan2')
    console.log(liuyan2)
    const top_publish1 = document.querySelector('.top-publish')
    const topicArtical = document.querySelectorAll('.topic')
    for (let i = 0; i < liuyan2.length; i++) {
        liuyan2[i].addEventListener('click', function() {
            const votdIdCount = document.querySelectorAll('.voteId')
            voteId = votdIdCount[i].innerHTML
                // 发送查看以往投票的请求
            let opinion2 = ''
            firstVoteCommentId = ''
            top_artical = topicArtical[i]
            beforeVote(voteId, opinion2, top_publish1, top_artical)
                // 收起评论按钮


        })
    }
    const top_packup = document.querySelector('.top-packup')
    top_packup.addEventListener('click', function() {
        top_publish1.style.left = '1600px'
        top_publish1.style.visibility = 'hidden'
    })

    const top_dis = document.querySelector('.top-tip div')
    const top_tip = document.querySelector('.top-tip')
    top_dis.addEventListener('click', function() {
        top_tip.style.display = 'none'
    })

}

// 点赞
// function good() {
//     // 点赞大盒子
//     const good = document.querySelectorAll('.likes2')
//         // 话题Id
//     const voteId = document.querySelectorAll('.voteId')
//         // 点赞数量盒子
//     const xihuan2 = document.querySelector('.likes2 span:nth-of-type(2)')
//         // 点赞显示盒子
//     const xihuan3 = document.querySelector('.likes2 span:nth-of-type(1) img')
//     let r = 1
//     for (let i = 0; i < good.length; i++) {
//         good[i].addEventListener('click', function() {
//             r++
//             const count = xihuan2[i].innerHTML
//             if (r % 2 === 0) {
//                 xihuan2[i].innerHTML = count + 1
//                 xihuan3.src = 'images/xin1.png'
//             } else {
//                 xihuan2[i].innerHTML = count - 1
//                 xihuan3.src = 'images/xin2.png'
//             }

//         })
//     }
// }

// 执行投票

function vote() {
    const topicArtical = document.querySelectorAll('.topic')
    const right = document.querySelectorAll('.right')
    const rightCount = document.querySelectorAll('.right span:nth-of-type(2)')
    const wrong = document.querySelectorAll('.false')
    const wrongCount = document.querySelectorAll('.false span:nth-of-type(2)')
    let arr2 = []
    for (let i = 0; i < right.length; i++) {
        arr2.push(i)

        right[i].addEventListener('click', function() {
            let left = 1
            if (arr2.includes(i)) {
                const topic_vote = topicArtical[i]
                const result = topic_vote.querySelector('.vote-result')
                console.log(result)
                result.style.display = 'block'
                const sons = topic_vote.querySelectorAll('.son')
                console.log(sons)
                const input = topic_vote.querySelectorAll('.progress')
                const votdIdCount = document.querySelectorAll('.voteId')
                const voteId = votdIdCount[i].innerHTML

                let str = true
                let righti = right[i]
                let wrongi = wrong[i]
                let wrongCounti = wrongCount[i]
                let rightCounti = rightCount[i]
                voting(str, voteId, righti, wrongi, wrongCounti, rightCounti, sons, left, input)
            }

        })

        wrong[i].addEventListener('click', function() {
            let left = 2
            if (arr2.includes(i)) {
                const topic_vote = topicArtical[i]
                const result = topic_vote.querySelector('.vote-result')
                console.log(result)
                result.style.display = 'block'
                const sons = topic_vote.querySelectorAll('.son')
                console.log(sons)
                const input = topic_vote.querySelectorAll('.progress')
                const votdIdCount = document.querySelectorAll('.voteId')
                const voteId = votdIdCount[i].innerHTML
                let str = false
                let righti = right[i]
                let wrongi = wrong[i]
                let wrongCounti = wrongCount[i]
                let rightCounti = rightCount[i]
                voting(str, voteId, righti, wrongi, wrongCounti, rightCounti, sons, left, input)

            }
        })
    }
}

// 执行投票的请求

async function voting(str, voteId, righti, wrongi, wrongCounti, rightCounti, sons, left, input) {
    let token = `${sessionStorage.getItem('sign1')}`
        // console.log(token)
        // console.log(str)
    voteId = parseInt(voteId)
    console.log(voteId)
    axios({
            method: 'POST',
            url: 'http://47.113.231.211:3000/community/vote',
            headers: {
                'token': `${token}`
            },
            data: {
                voteId: voteId,
                opinion: str
            }
        })
        .then(res => { // 接口数据
            console.log(res.data);
            if (res.data.msg === "已投票过 投票失败") {
                const voted = document.querySelector('.voted')
                voted.style.display = 'block'
                const rightAnswer = righti.getAttribute('data-msg')
                const wrongAnswer = wrongi.getAttribute('data-msg')
                const rCount = rightCounti.innerHTML
                const wCount = wrongCounti.innerHTML
                console.log(rightAnswer, rCount, wCount)
                righti.innerHTML = +rCount + '人' + rightAnswer
                righti.style.backgroundColor = "#b1dbeb"
                wrongi.innerHTML = +wCount + '人' + wrongAnswer
                wrongi.style.backgroundColor = "#b1dbeb"
                let sum = +rCount + (+wCount)
                console.log(sum)
                console.log(sons)
                let do1 = parseInt((+rCount) / sum * 100)
                let do2 = 100 - do1
                console.log(do1, do2)
                    // 创建一个 keyframe 动画规则
                const keyframes1 = `@keyframes myAnimation1 {
    0% {
      width:0%
    }
    100% {
      width:${do1}%
    }
  }`;
                const keyframes2 = `@keyframes myAnimation2 {
    0% {
      width:0%
    }
    100% {
      width:${do2}%
    }
  }`;
                // 创建一个 <style> 元素
                const styleElement = document.createElement('style');

                // 将 keyframe 动画规则添加到 <style> 元素中
                styleElement.innerHTML = ''
                styleElement.innerHTML += keyframes1;
                styleElement.innerHTML += keyframes2;

                // 将 <style> 元素添加到文档的 <head> 元素中
                document.head.appendChild(styleElement);
                sons[0].style.animation = 'myAnimation1 2s';
                sons[1].style.animation = 'myAnimation2 2s';

                sons[0].style.width = `${do1}%`;
                sons[1].style.width = `${do2}%`;
                let timer = setInterval(() => {
                    const son3 = sons[0].style.width

                    input[0].innerHTML = `${son3}`
                }, 10);
                let timer2 = setInterval(() => {
                    const son3 = sons[1].style.width
                        // console.log(son3)
                    input[1].innerHTML = `${son3}`
                }, 10);

                sons[0].style.width = `${do1}%`;
                sons[1].style.width = `${do2}%`;

            } else {
                if (left === 1) {
                    const voted = document.querySelector('.voted')
                    voted.style.display = 'block'
                    const rightAnswer = righti.getAttribute('data-msg')

                    const wrongAnswer = wrongi.getAttribute('data-msg')
                    const rCount = rightCounti.innerHTML
                    const wCount = wrongCounti.innerHTML
                    console.log(rightAnswer, rCount, wCount)
                    righti.innerHTML = +rCount + 1 + '人' + rightAnswer
                    righti.style.backgroundColor = "#b1dbeb"
                    wrongi.innerHTML = +wCount + '人' + wrongAnswer
                    wrongi.style.backgroundColor = "#b1dbeb"
                    let sum = +rCount + (+wCount) + 1
                    console.log(sum)
                    let do1 = parseInt((+rCount + 1) / sum * 100)
                    let do2 = 100 - do1
                    console.log(do1, do2)
                        // 创建一个 keyframe 动画规则
                    const keyframes1 = `@keyframes myAnimation1 {
        0% {
          width:0%
        }
        100% {
          width:${do1}%
        }
      }`;
                    const keyframes2 = `@keyframes myAnimation2 {
        0% {
          width:0%
        }
        100% {
          width:${do2}%
        }
      }`;
                    // 创建一个 <style> 元素
                    const styleElement = document.createElement('style');

                    // 将 keyframe 动画规则添加到 <style> 元素中
                    styleElement.innerHTML = ''
                    styleElement.innerHTML += keyframes1;
                    styleElement.innerHTML += keyframes2;

                    // 将 <style> 元素添加到文档的 <head> 元素中
                    document.head.appendChild(styleElement);
                    sons[0].style.width = `${do1}%`;
                    sons[1].style.width = `${do2}%`;
                    let timer = setInterval(() => {
                        const son3 = sons[0].style.width

                        input[0].innerHTML = `${son3}`
                    }, 10);
                    let timer2 = setInterval(() => {
                        const son3 = sons[1].style.width
                            // console.log(son3)
                        input[1].innerHTML = `${son3}`
                    }, 10);
                    sons[0].style.animation = 'myAnimation1 2s';
                    sons[1].style.animation = 'myAnimation2 2s';



                } else {
                    const topic_vote = topicArtical[i]
                    const result = topic_vote.querySelector('.vote-result')
                    console.log(result)
                    result.style.display = 'block'
                    const sons = topic_vote.querySelectorAll('.son')
                    console.log(sons)
                    const input = topic_vote.querySelectorAll('.progress')
                    const votdIdCount = document.querySelectorAll('.voteId')
                    const voteId = votdIdCount[i].innerHTML
                    let str = false

                    voting(str, voteId)
                    const rightAnswer = righti.getAttribute('data-msg')
                    const wrongAnswer = wrongi.getAttribute('data-msg')
                    const rCount = rightCounti.innerHTML
                    const wCount = wrongCounti.innerHTML
                    righti.innerHTML = +rCount + '人' + rightAnswer

                    righti.style.backgroundColor = "#b1dbeb"
                    wrongi.innerHTML = +wCount + 1 + '人' + wrongAnswer
                    wrongi.style.backgroundColor = "#b1dbeb"
                    let sum = +rCount + (+wCount) + 1
                    console.log(sum)
                    let do1 = parseInt((+rCount) / sum * 100)
                    let do2 = 100 - do1
                    console.log(do1, do2)
                        // 创建一个 keyframe 动画规则
                    const keyframes1 = `@keyframes myAnimation1 {
        0% {
          width:0%
        }
        100% {
          width:${do1}%
        }
      }`;
                    const keyframes2 = `@keyframes myAnimation2 {
        0% {
          width:0%
        }
        100% {
          width:${do2}%
        }
      }`;
                    // 创建一个 <style> 元素
                    const styleElement = document.createElement('style');

                    // 将 keyframe 动画规则添加到 <style> 元素中
                    styleElement.innerHTML = ''
                    styleElement.innerHTML += keyframes1;
                    styleElement.innerHTML += keyframes2;

                    // 将 <style> 元素添加到文档的 <head> 元素中
                    document.head.appendChild(styleElement);


                    sons[0].style.animation = 'myAnimation1 2s';
                    sons[1].style.animation = 'myAnimation2 2s';
                    let timer = setInterval(() => {
                        const son3 = sons[0].style.width

                        input[0].innerHTML = `${son3}`
                    }, 10);
                    let timer2 = setInterval(() => {
                        const son3 = sons[1].style.width
                            // console.log(son3)
                        input[1].innerHTML = `${son3}`
                    }, 10);
                    sons[0].style.width = `${do1}%`;
                    sons[1].style.width = `${do2}%`;
                }
            }
        })

    .catch(error => { //  处理错误
        console.error(error);
    });
}
// 进行一级评论
function firstComment(input, voteId, opinion) {
    let token = `${sessionStorage.getItem('sign1')}`
    axios({
            method: 'POST',
            url: 'http://47.113.231.211:3000/community/vote/comment/write',
            headers: {
                'token': `${token}`
            },
            data: {
                msg: `${input}`,
                voteId: `${voteId}`,
                opinion: opinion
            }
        })
        .then(res => { // 接口数据
            console.log(res.data);
        })
        .catch(error => { //  处理错误
            console.error(error);
        });

}
// 进行二级评论
function secondComment(input, firstVoteCommentId, opinion) {
    console.log(firstVoteCommentId)
    let token = `${sessionStorage.getItem('sign1')}`
    axios({
            method: 'POST',
            url: 'http://47.113.231.211:3000/community/vote/comment/reply',
            headers: {
                'token': `${token}`
            },
            data: {
                msg: `${input}`,
                parentCommentId: 1,
                opinion: opinion,
                firstVoteCommentId: `${firstVoteCommentId}`
            }
        })
        .then(res => { // 接口数据
            console.log(res.data);
        })
        .catch(error => { //  处理错误
            console.error(error);
        });

}
// 渲染一级评论
function displayFirst(voteId, top_comment, p) {
    console.log(top_comment)
    voteId = parseInt(voteId)
    console.log(voteId)
    axios({
            method: 'POST',
            url: 'http://47.113.231.211:3000/community/vote/comment/first',
            data: {
                voteId: voteId,
            }
        })
        .then(res => { // 接口数据
            console.log(res.data);
            let { data } = res.data;
            for (let i = 0; i < data.length; i++) {
                top_comment.innerHTML += ` <div class="total-com">
                <div class="first-com">
                    <div class="user-pic"><img src="data:image/png;base64,${ data[i].pic}" alt=""></div>
                    <div class="user-comment">
                        <div>
                            <div class="user-id">${data[i].username}</div>
                            <div class="opinion">${data[i].opinion}</div>
                            <div class="firstcommentId" >${data[i].voteCommentId}</div>
                            <div class="first-answer" data-comment="${data[i].voteCommentId}">回复</div>
                            <div class="reply">${data[i].reply}</div>
                            
                        </div>
                        <div class="user-concre">${data[i].msg}</div>
                        <div class="check-comment">查看回复</div>
                    </div>
                </div>
                
            </div>`
            }

            // 判断有无二级评论,显示回复
            reply()
                // 显示红蓝方
            opinions()
                // 查看二级评论
            lookAnswer()
                // 发布二级评论
            secondFirst()
        })
        .catch(error => { //  处理错误
            console.error(error);
        });

}
// 渲染二级评论
function displaySecond(firstCommentId, frcomment) {
    firstCommentId = parseInt(firstCommentId)
    axios({
            method: 'POST',
            url: 'http://47.113.231.211:3000/community/vote/comment/second',
            data: {
                firstVoteCommentId: firstCommentId
            }
        })
        .then(res => {
            // 接口数据
            console.log(res.data);
            let { data } = res.data
            for (let i = 0; i < data.length; i++) {
                let div = document.createElement('div')
                div.classList.add('second-com')
                div.innerHTML = `<div class="user-pic"><img src="data:image/png;base64,${ data[i].pic}" alt=""></div>
                <div class="user-comment">
                    <div>
                        <div class="user-id">${data[i].username}</div>
                        <div class="opinion">${data[i].opinion}</div>
                        <div class="secondcommentId">${data[i].secondVoteCommentId}</div>
                      
                       
                    </div>
                    <div class="user-concre">${data[i].msg}</div>
                </div>`
                frcomment.appendChild(div)
                    //     frcomment.innerHTML += `<div class="second-com">
                    //     <div class="user-pic"><img src="data:image/png;base64,${ data[i].pic}" alt=""></div>
                    //     <div class="user-comment">
                    //         <div>
                    //             <div class="user-id">${data[i].username}</div>
                    //             <div class="opinion">${data[i].opinion}</div>
                    //             <div class="secondcommentId">${data[i].secondVoteCommentId}</div>


                //         </div>
                //         <div class="user-concre">${data[i].msg}</div>
                //     </div>
                // </div>`
            }

            const secondDetail = frcomment.querySelectorAll('.second-com')
            console.log(secondDetail)

            console.log(frcomment)


            opinions()
        })
        .catch(error => {
            // 处理错误
            console.error(error);
        });
}
// 获取具体用户的用户名和头像
// function getConcretUser(user_id, detail) {
//     console.log(detail)
//     const concret_id = detail.querySelectorAll('.user-id')
//     const concret_pic = detail.querySelectorAll(' .user-pic img')
//     console.log(concret_pic)
//     console.log(user_id)
//     for (let i = 0; i < user_id.length; i++) {
//         console.log(user_id[i])
//         let user_Id = parseInt(user_id[i].innerHTML)
//         console.log(user_Id)
//         axios({
//                 method: 'POST',
//                 url: 'http://47.113.231.211:3000/users/detail',
//                 data: {
//                     userId: user_Id
//                 }
//             })
//             .then(res => {
//                 // 接口数据
//                 console.log(res.data);
//                 let { data } = res.data
//                 let { user } = data
//                 let { userValue } = data
//                 console.log(user)
//                 console.log(userValue)
//                 let user_name = user.username;
//                 let user_pic = userValue.pic;
//                 concret_pic[i].src = 'data:image/png;base64,' + `${user_pic}`;
//                 concret_id[i].innerHTML = `${user_name}`
//             })
//             .catch(error => {
//                 // 处理错误
//                 console.error(error);
//             });
//     }
// }
// 一级评论的查看回复
// 如果reply不为0的话,查看评论显示,反之隐藏
function reply() {
    const check_comment = document.querySelectorAll('.check-comment')
    console.log(check_comment)
    const replys = document.querySelectorAll('.reply')
    console.log(replys)
    for (let i = 0; i < replys.length; i++) {
        let reply11 = replys[i]
        if (reply11.innerHTML !== '0' && reply11.innerHTML != 'null') {
            console.log(reply11.innerHTML)
            check_comment[i].style.display = 'block'
        } else {
            console.log(reply11.innerHTML)
            check_comment[i].style.display = 'none'
        }
    }
}
// 看用户选择的opinon,如果是true则为蓝方,如果是false则为红方,显示在用户右边的标签
function opinions() {
    const opinions = document.querySelectorAll('.opinion')
    for (let i = 0; i < opinions.length; i++) {
        if (opinions[i].innerHTML === 'false' || opinions[i].innerHTML === '红方') {
            let opinionRed = opinions[i]
            opinionRed.innerHTML = '红方'
            opinions[i].style.borderColor = 'red'
            opinions[i].style.color = 'red'
        } else {
            let opinionRed = opinions[i]
            opinionRed.innerHTML = '蓝方'
        }
    }
}
// 点击查看回复,显示二级评论
function lookAnswer() {

    const check_comment2 = document.querySelectorAll('.check-comment')
    console.log(check_comment2)

    for (let i = 0; i < check_comment2.length; i++) {
        check_comment2[i].addEventListener('click', check_comment)
    }
}

function check_comment() {
    console.log(this)
    if (this.innerHTML === '查看回复') {
        this.innerHTML = '收起回复'
        let frcomment = findParent(this, 'total-com')
        console.log(frcomment)
        const firstCommentId = frcomment.querySelector('.firstcommentId').innerHTML
        console.log(firstCommentId)
            // 二级评论请求并渲染
        displaySecond(firstCommentId, frcomment)
    } else if (this.innerHTML === '收起回复') {
        let frcomment = findParent(this, 'total-com')
        console.log(frcomment)
        const second_comment = frcomment.querySelectorAll('.second-com')
        console.log(secondComment)
    }
}

function findParent(target, key) {
    if (target.parentNode.classList && target.parentNode.classList.contains(key)) {
        return target.parentNode
    } else {
        return findParent(target.parentNode, key)
    }
}
let opinion
let top_artical
let voteId
let top_publish
    // 查看以往投票
function beforeVote(voteId, opinion2, top_publish1, top_artical) {
    voteId = parseInt(voteId)
    console.log(typeof voteId)
    let token = `${sessionStorage.getItem('sign1')}`
    axios({
            method: 'GET',
            url: 'http://47.113.231.211:3000/community/vote/voted',
            headers: {
                token: `${token}`
            }
        })
        .then(res => { // 接口数据
            console.log(res.data);
            let { data } = res.data
            for (let i = 0; i < data.length; i++) {
                console.log(typeof data[i].voteId)
                if (data[i].voteId === voteId) {
                    opinion2 = data[i].opinion
                    console.log(opinion2)
                    break;
                }
            }

            opinion = opinion2
            opinion2 = String(opinion2)
            if (opinion2 != '') {
                console.log(opinion2)
                if (opinion) {
                    opinion2 = '蓝方'
                } else {
                    opinion2 = '红方'
                }
                top_publish1.style.visibility = 'visible'
                top_publish1.style.left = '900px'

                console.log(top_artical)
                top_publish = top_artical.querySelector('.topic-comment>div')
                console.log(top_publish)
                    // 确定评论按钮
                const top_sure = document.querySelector('.top-sure')
                const top_tip = document.querySelector('.top-tip')
                top_sure.addEventListener('click', function() {
                    const input4 = document.querySelector(`.top-input`)
                    const input5 = input4.value
                    if (input5 == '') {
                        console.log('11')
                        top_tip.style.display = 'block'
                    }
                    //  else {
                    //                     top_publish1.style.left = '1600px'
                    //                     top_publish1.style.visibility = 'hidden'
                    //                         // 发送请求
                    //                     firstComment(input5, voteId, opinion)
                    //                         // 渲染一级评论上去
                    //                         // 获取第一个子元素
                    //                     const firstChild = top_publish.firstElementChild
                    //                     const newElement = document.createElement('div')
                    //                     newElement.classList.add('total-com')
                    //                     if (opinion2 === '蓝方') {
                    //                         newElement.innerHTML = `
                    // <div class="first-com">
                    // <div class="user-pic"><img src= ${Pic2.src} alt=""></div>
                    // <div class="user-comment">
                    //     <div>
                    //         <div class="user-id">${userId}</div>
                    //         <div class="opinion">${opinion2}</div>
                    //         <div class="first-answer">回复</div>
                    //     </div>
                    //     <div class="user-concre">${input5}</div>`
                    //                     } else {
                    //                         newElement.innerHTML = `
                    // <div class="first-com">
                    // <div class="user-pic"><img src= ${Pic2.src} alt=""></div>
                    // <div class="user-comment">
                    //     <div>
                    //         <div class="user-id">${userId}</div>
                    //         <div class="opinion1">${opinion2}</div>
                    //         <div class="first-answer">回复</div>
                    //     </div>
                    //     <div class="user-concre">${input5}</div>`
                    //                     }
                    //                     // 在第一个子元素之前插入新元素
                    //                     top_publish.insertBefore(newElement, firstChild);
                    // }

                })
            } else {
                const revote = document.querySelector('.revote')
                revote.style.display = 'block'
            }
        })
        .catch(error => { //  处理错误
            console.error(error);
        });

}
let second
let firstVoteCommentId
    // 点击一级评论的回复,进行二级评论
function secondFirst() {
    const firstAnswer = document.querySelectorAll('.first-answer')
    console.log(firstAnswer)
    for (let i = 0; i < firstAnswer.length; i++) {
        firstAnswer[i].addEventListener('click', function() {

            const total_comment = document.querySelectorAll('.total-com')
            console.log(total_comment)
            second = total_comment[i]
            console.log(second, i)
                // 获取一级评论的id
            firstVoteCommentId = second.querySelector('.firstcommentId').innerHTML
            console.log(typeof firstVoteCommentId)
            firstVoteCommentId = parseInt(firstVoteCommentId)
            console.log(firstVoteCommentId)
                // 获取父类投票
            const parentElement = second.closest('.topic')
            console.log(parentElement)
                // 获取投票voteId
            let voteId = parentElement.querySelector('.voteId').innerHTML
            const top_publish1 = document.querySelector('.top-publish')
            top_publish1.style.visibility = 'visible'
            top_publish1.style.left = '900px'

            // 确定评论按钮
            const top_sure = document.querySelector('.top-sure')
            const top_tip = document.querySelector('.top-tip')

            const input4 = document.querySelector(`.top-input`)
            const input5 = input4.value

            // 发送请求
            voteId = parseInt(voteId)
            console.log(voteId)
            console.log(typeof voteId)
            let opinion2 = ''
            let token = `${sessionStorage.getItem('sign1')}`
            axios({
                    method: 'GET',
                    url: 'http://47.113.231.211:3000/community/vote/voted',
                    headers: {
                        token: `${token}`
                    }
                })
                .then(res => { // 接口数据
                    console.log(res.data);
                    let { data } = res.data
                    for (let i = 0; i < data.length; i++) {
                        console.log(typeof data[i].voteId)
                        console.log(voteId)
                        if (data[i].voteId === voteId) {
                            opinion2 = data[i].opinion
                            console.log(opinion2)
                            break;
                        }
                    }
                    opinion = opinion2
                    console.log(opinion)
                    console.log(opinion2)
                    opinion2 = String(opinion2)
                    if (opinion2 != '') {
                        console.log(opinion2)
                        if (opinion2 === 'true') {
                            opinion2 = '蓝方'
                        } else {
                            opinion2 = '红方'
                        }
                        top_publish1.style.visibility = 'visible'
                        top_publish1.style.left = '900px'
                        console.log(firstVoteCommentId)
                            //                     // 确定评论按钮
                            //                 const top_sure = document.querySelector('.top-sure')
                            //                 const top_tip = document.querySelector('.top-tip')
                            //                 top_sure.addEventListener('click', function() {
                            //                     const input4 = document.querySelector(`.top-input`)
                            //                     const input5 = input4.value
                            //                     if (input5 == '') {
                            //                         console.log('11')
                            //                         top_tip.style.display = 'block'
                            //                     } else {
                            //                         top_publish1.style.left = '1600px'
                            //                         top_publish1.style.visibility = 'hidden'
                            //                         input4.reset()
                            //                             // 发送二级评论请求
                            //                         console.log(firstVoteCommentId)
                            //                         secondComment(input5, firstVoteCommentId, opinion)
                            //                             // 渲染一级评论上去
                            //                             // 获取第一个子元素
                            //                         console.log(second)
                            //                         if (opinion2 === '蓝方') {
                            //                             second.innerHTML += `
                            // <div class="second-com">
                            //         <div class="user-pic"><img src=${Pic2.src} alt=""></div>
                            //         <div class="user-comment">
                            //             <div>
                            //                 <div class="user-id">${userId}</div>
                            //                 <div class="opinion">${opinion2}</div>                       
                            //             </div>
                            //             <div class="user-concre">${input5}</div>
                            //         </div>
                            //     </div>
                            // `
                            //                         } else {
                            //                             second.innerHTML += `
                            //                             <div class="second-com">
                            //                             <div class="user-pic"><img src=${Pic2.src} alt=""></div>
                            //                             <div class="user-comment">
                            //                                 <div>
                            //                                     <div class="user-id">${userId}</div>
                            //                                     <div class="opinion1">${opinion2}</div>                       
                            //                                 </div>
                            //                                 <div class="user-concre">${input5}</div>
                            //                             </div>
                            //                         </div>`
                            //                         }
                            //                     }

                        //                 })
                    } else {
                        const revote = document.querySelector('.revote')
                        revote.style.display = 'block'
                    }
                })
                .catch(error => { //  处理错误
                    console.error(error);
                });



        })
    }
}
// 点击话题和社区和创作切换
const topic_warp = document.querySelectorAll('.topic-wrap label');
console.log(topic_warp)
const communityTopic1 = document.querySelector('.community>div:nth-of-type(2)')
console.log(communityTopic1)
const communityTopic2 = document.querySelector('.community>div:nth-of-type(3)')
const communityTopic3 = document.querySelector('.creative')
console.log(communityTopic2)
for (let i = 0; i < topic_warp.length; i++) {
    topic_warp[i].addEventListener('click', function() {
        for (let j = 0; j < topic_warp.length; j++) {
            topic_warp[j].style.boxShadow = '0px 0px 0px 0px'
        }
        console.log(i)
        if (i === 0) {
            communityTopic2.style.display = 'none';
            communityTopic3.style.display = 'none';

            communityTopic1.style.display = 'block';
            topic_warp[i].style.boxShadow = ' inset 4px 4px 8px #421239, inset -4px -4px 8px white'
        } else if (i === 1) {
            communityTopic1.style.display = 'none';
            communityTopic3.style.display = 'none';

            communityTopic2.style.display = 'block';
            topic_warp[i].style.boxShadow = ' inset 4px 4px 8px #421239, inset -4px -4px 8px white'
        } else {
            communityTopic1.style.display = 'none';
            communityTopic2.style.display = 'none';

            communityTopic3.style.display = 'block';
            topic_warp[i].style.boxShadow = ' inset 4px 4px 8px #421239, inset -4px -4px 8px white'
        }
    })
}
// 确定按钮,提示消失
const revote_sure = document.querySelectorAll('.revote-sure')
const revote = document.querySelector('.revote')
console.log(revote)
const voted = document.querySelector('.voted')
console.log(voted)

for (let i = 0; i < revote_sure.length; i++) {
    revote_sure[i].addEventListener('click', function() {
        if (i === 0) {
            revote.style.display = 'none'
        } else {
            voted.style.display = 'none'
        }
    })
}


// 发表评论
// 确定评论按钮
const top_sure = document.querySelector('.top-sure')
const top_tip = document.querySelector('.top-tip')

top_sure.addEventListener('click', function() {
    const input4 = document.querySelector(`.top-input`)
    const input5 = input4.value
    if (input5 == '') {
        console.log('11')
        top_tip.style.display = 'block'
    } else if (firstVoteCommentId !== '') {
        voteId = ''
        let opinion2
        if (opinion) {
            opinion2 = '蓝方'
        } else {
            opinion2 = '红方'
        }
        const top_publish1 = document.querySelector('.top-publish')
        top_publish1.style.left = '1600px'
        top_publish1.style.visibility = 'hidden'
        input4.value = ''
            // 发送二级评论请求
        console.log(firstVoteCommentId)
        secondComment(input5, firstVoteCommentId, opinion)
            // 渲染一级评论上去
            // 获取第一个子元素
        console.log(second)
        if (opinion2 === '蓝方') {
            second.innerHTML += `
<div class="second-com">
  <div class="user-pic"><img src='data:image/png;base64,${sessionStorage.getItem("pic")}'
             alt=""></div>
  <div class="user-comment">
      <div>
          <div class="user-id">${userId}</div>
          <div class="opinion">${opinion2}</div>                       
      </div>
      <div class="user-concre">${input5}</div>
  </div>
</div>
`
        } else {
            second.innerHTML += `
                      <div class="second-com">
                      <div class="user-pic"><img src='data:image/png;base64,${sessionStorage.getItem("pic")}' alt=""></div>
                      <div class="user-comment">
                          <div>
                              <div class="user-id">${userId}</div>
                              <div class="opinion1">${opinion2}</div>                       
                          </div>
                          <div class="user-concre">${input5}</div>
                      </div>
                  </div>`
        }
    } else {
        let opinion2
        if (opinion) {
            opinion2 = '蓝方'
        } else {
            opinion2 = '红方'
        }
        const top_publish1 = document.querySelector('.top-publish')
        top_publish1.style.left = '1600px'
        top_publish1.style.visibility = 'hidden'
            // 发送请求
        firstComment(input5, voteId, opinion)
            // 渲染一级评论上去
            // 获取第一个子元素
        const firstChild = top_publish.firstElementChild
        const newElement = document.createElement('div')
        newElement.classList.add('total-com')
        if (opinion2 === '蓝方') {
            newElement.innerHTML = `
<div class="first-com">
<div class="user-pic"><img src= 'data:image/png;base64,${sessionStorage.getItem("pic")}' alt=""></div>
<div class="user-comment">
<div>
<div class="user-id">${userId}</div>
<div class="opinion">${opinion2}</div>
<div class="first-answer">回复</div>
</div>
<div class="user-concre">${input5}</div>
<div class="check-comment c-comment">查看回复</div>
`
                // 在第一个子元素之前插入新元素
            top_publish.insertBefore(newElement, firstChild);

        } else {
            newElement.innerHTML = `
<div class="first-com">
<div class="user-pic"><img src= 'data:image/png;base64,${sessionStorage.getItem("pic")}'} alt=""></div>
<div class="user-comment">
<div>
<div class="user-id">${userId}</div>
<div class="opinion1">${opinion2}</div>
<div class="first-answer">回复</div>
</div>
<div class="user-concre">${input5}</div>
<div class="check-comment c-comment"">查看回复</div>`
                // 在第一个子元素之前插入新元素
            top_publish.insertBefore(newElement, firstChild);

        }

        const checkComment = document.querySelectorAll('.check-comment')[0];
        checkComment.addEventListener('click', check_comment)
    }

})