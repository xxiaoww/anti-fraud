creation()
// 剧本创作的帖子渲染

// let look = document.querySelector('.jump>div.look');
let look1 = function (e) {
    e.addEventListener('click', function () {
        let scriptId = e.getAttribute('data-look');
        console.log(scriptId);
        sessionStorage.setItem('scriptId', scriptId);

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
                console.log("你看看我获取的是什么东西:", data3.data);
                sessionStorage.setItem('myData', JSON.stringify(data3.data));
                window.location.href = "test.html"; // 跳转到指定链接
            })
            .catch(error => {
                console.error(error);
            });
    })
}

let forkGood = document.querySelector('.forkGood');

let fork1 = function (e) {
    e.addEventListener('click', function () {
        forkGood.style.display = 'block';
        let scriptId = e.getAttribute('data-fork');
        console.log(scriptId);
        sessionStorage.setItem('scriptId', scriptId);
        forkGood.style.display = 'block';
    })
}

forkGood.addEventListener('click', function () {
    const url3 = 'http://47.113.231.211:3000/script/repository/fork';
    const headers3 = {
        'Content-Type': 'application/json',
        'token': `${sessionStorage.getItem("sign1")}`
    };

    const payload3 = {
        "scriptId": parseInt(sessionStorage.getItem("scriptId"))
    };

    // 发送 POST 请求
    fetch(url3, {
        method: 'POST',
        headers: headers3,
        body: JSON.stringify(payload3)
    })
        .then(response => response.json())
        .then(data3 => {
            console.log("有没有成功fork:",data3);
            forkGood.style.display = 'none';
        })
        .catch(error => {
            console.error(error);
        });
})

const fX=document.querySelector('.forkGood>.closed');
fX.addEventListener('click',function(){
    forkGood.style.display = 'none';
})


function creation() {
    let token = `${sessionStorage.getItem('sign1')}`
    console.log(token)
    axios({
        method: 'GET',
        url: 'http://47.113.231.211:3000/community/script'
    })
        .then(res => { // 接口数据
            console.log(res.data);
            let { data } = res.data;
            // getValue()
            // articalRender()
            async function executeFunctions(data) {
                await appearArtical(data); // 等待第一个函数执行完成
                // 
                articalRender()
                // 点赞
                like();
                // 由下到上显示文章
                appear()
                const looks = document.querySelectorAll('.look');
                for (let i = 0; i < looks.length; i++) {
                    look1(looks[i]);
                }
                const forks = document.querySelectorAll('.fork');
                for (let i = 0; i < forks.length; i++) {
                    fork1(forks[i]);
                }
            }
            executeFunctions(data)
        })
        .catch(error => { //  处理错误
            console.error(error);
        })

    // 渲染帖子
    function appearArtical(data) {
        const articles = document.querySelector('.creative>div>div')
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== null) {
                // 将时间字符串转换为 Date 对象
                const utcDate = new Date(`${data[i].post.createTime}`);

                // 将 UTC 时间转换为本地时间（北京时间）
                const localDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

                // 将本地时间格式化为字符串
                const formattedDate = localDate.toISOString();

                // console.log(formattedDate); 

                let date = new Date(formattedDate);
                // 获取年份、月份和日期
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                articles.innerHTML += `<div class="artical">
<div class="artical-sum">
    <div class="artical-title">${data[i].post.title}</div>
    <div class="artical-content">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${data[i].post.article}
    </div>
    <div class="ability">
        <div class="like">
            <span class="iconfont icon-xihuan"></span><span>点赞
        </span>
        </div>
        <div class="share">
            <span class="iconfont icon-liuyan "></span><span>评论
        </span>
        </div>
    </div>
</div>
<div class="artical-detail">
    <div>
        <div>
            <div class="return-com">
                <div class="bread"><img src="images/return2.png"></div>
                
            </div>
            <div class="artical-Title">${data[i].post.title}</div>
            <div class="user">
                <div class="userImg"><img src="images/user1.jpg" alt=""></div>
                <div class="username">cheer up</div>
            </div>
            <div class="artical-Content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ${data[i].post.article}
            </div>
            <div class="jump">
            <div class="look" data-look="${data[i].scriptId}">查看</div>
            <div class="fork" data-fork="${data[i].scriptId}">fork</div>
            </div>
            <div>
                <div class="createtime">发表时间:${year}-${month}-${day}</div>
            <div class="abilitys">
                <div class="postId">${data[i].post.postId}</div> <div class="writerId">${data[i].post.writerId}</div>                       <div class="likes">
                                            <span class="xihuan">
                                                <img src="images/xin2.png" alt="">
                                            </span>
                                            <span>${data[i].post.likes}</span>
                                        </div>
                                        <div class="shares">
                                            <span class="liuyan "><img src="images/liuyan.png" ></span><span>${data[i].post.comments}
                                        </span>
                                        </div>
            </div>
            <div class="comments">
                                    </div>
                                    <div class="comment-publish">
                                        <div>
                                            <textarea class="comment-input" placeholder="请输入你的评论"></textarea>
                                            <div class="comment-sure">确定</div>
                                            <div class="comment-packup">收起</div>
                                        </div>
                                    </div>
                                    <div class="comment-tip"><span>你的输入为空哦~</span>
                                    <div>确定</div>
                                </div>
        </div>
    </div>
</div>
</div>`
                console.log("articles的值为", articles);
                // look1(articles.querySelector('.jump>div.look'))
            }
        }

        console.log("articles.length", articles.length);

        // for(let i=0;i<articles.length;i++){

        // look1(articles[i].querySelector('.jump>div.look'));
        // console.log("已经渲染好嘞啊");
        // console.log(articles[i].querySelector('.jump>div.look'));
        // }

        // like()
    }

    function articalRender() {
        // 点击文章大概显示详细信息
        const artical_sum = document.querySelectorAll('.artical-sum')
        console.log(artical_sum)
        const artical_detail = document.querySelectorAll('.artical-detail')
        console.log(artical_detail)
        for (let i = 0; i < artical_sum.length; i++) {
            artical_sum[i].addEventListener('click', function () {
                console.log(i)
                artical_detail[i].style.display = 'block'
                const detail = artical_detail[i]
                const postedId = detail.querySelector(`.postId`).innerHTML
                const writerId = detail.querySelector('.writerId').innerHTML
                console.log(writerId)
                console.log(postedId)
                // DisplayComment(postedId, detail)
                displayWriter(writerId, detail)
            })
        }
        // 点击返回文章回到社区页面
        const return_com = document.querySelectorAll('.return-com')
        console.log(return_com)
        for (let j = 0; j < return_com.length; j++) {
            return_com[j].addEventListener('click', function () {
                console.log(j)
                artical_detail[j].style.display = 'none'
            })
        }
    }
    // 文章作者的渲染
    function displayWriter(writerId, detail) {
        const writerImg = detail.querySelector('.userImg img')
        const writername = detail.querySelector('.username')
        axios({
            method: 'POST',
            url: 'http://47.113.231.211:3000/users/detail',
            data: {
                userId: `${writerId}`
            }
        })
            .then(res => {
                // 接口数据
                console.log(res.data);
                let { data } = res.data
                let { user } = data
                let { userValue } = data
                console.log(user)
                console.log(userValue)
                let user_name = user.username;
                let user_pic = userValue.pic;
                writerImg.src = 'data:image/png;base64,' + `${user_pic}`;
                writername.innerHTML = `${user_name}`
            })
            .catch(error => {
                // 处理错误
                console.error(error);
            });
    }
    // 点赞的函数
    // function like() {
    //     const abilitys = document.querySelectorAll('.abilitys')
    //     console.log(abilitys)
    //     const likes = document.querySelectorAll('.abilitys .likes')
    //     const xihuan = document.querySelectorAll('.xihuan img')
    //     const postid = document.querySelectorAll(` .postId`)
    //     let degree = 1
    //     const xihuanCount = document.querySelectorAll('.likes span:nth-of-type(2) ')
    //     console.log(xihuanCount)
    //     for (let i = 0; i < likes.length; i++) {
    //         likes[i].addEventListener('click', function() {
    //             // const postid = document.querySelector(`.abilitys${i} .postId`)
    //             // console.log(postid)
    //             // console.log(postid.innerHTML)
    //             throttledLike(postid, degree, xihuanCount, xihuan, i); // 将参数传递给节流函数的匿名函数
    //         })
    //     }
    // }
    // // 节流
    // function throttle(func, delay) {
    //     let timerId;

    //     return function(...args) {
    //         if (!timerId) {
    //             timerId = setTimeout(() => {
    //                 func.apply(this, args);
    //                 timerId = null;
    //             }, delay);
    //         }
    //     };
    // }
    // const throttledLike = throttle(function(postid, degree, xihuanCount, xihuan, i) {
    //     const postedId = postid[i].innerHTML
    //     degree++
    //     if (degree % 2 == 0) {
    //         let xCount = xihuanCount[i].innerHTML
    //         console.log(xCount)
    //         xihuanCount[i].innerHTML = parseInt(xCount) + 1
    //         xihuan[i].src = 'images/xin1.png'
    //         axios({
    //                 method: 'POST',
    //                 url: 'http://47.113.231.211:3000/community/like',
    //                 headers: {
    //                     'token': `${token}`
    //                 },
    //                 data: {
    //                     postId: `${postedId}`
    //                 }
    //             })
    //             .then(res => {
    //                 // 接口数据
    //                 console.log(res.data);
    //             })
    //             .catch(error => {
    //                 // 处理错误
    //                 console.error(error);
    //             });
    //     } else {
    //         let xCount = xihuanCount[i].innerHTML
    //         console.log(xCount)
    //         xihuanCount[i].innerHTML = parseInt(xCount) - 1
    //         xihuan[i].src = 'images/xin2.png'
    //     }

    // }, 1000);
    // // 点赞逻辑
    // function likePost(postid, degree, xihuanCount, xihuan) {
    //     const postedId = postid[i].innerHTML
    //     degree++
    //     if (degree % 2 == 0) {
    //         let xCount = xihuanCount[i].innerHTML
    //         console.log(xCount)
    //         xihuanCount[i].innerHTML = parseInt(xCount) + 1
    //         xihuan[i].src = 'images/xin1.png'
    //         axios({
    //                 method: 'POST',
    //                 url: 'http://47.113.231.211:3000/community/like',
    //                 headers: {
    //                     'token': `${token}`
    //                 },
    //                 data: {
    //                     postId: `${postedId}`
    //                 }
    //             })
    //             .then(res => {
    //                 // 接口数据
    //                 console.log(res.data);
    //             })
    //             .catch(error => {
    //                 // 处理错误
    //                 console.error(error);
    //             });
    //     } else {
    //         let xCount = xihuanCount[i].innerHTML
    //         console.log(xCount)
    //         xihuanCount[i].innerHTML = parseInt(xCount) - 1
    //         xihuan[i].src = 'images/xin2.png'
    //     }

    // }
    // 获取每篇文章的具体信息
    // function DisplayComment(postedId, detail) {
    //     axios({
    //             method: 'POST',
    //             url: 'http://47.113.231.211:3000/community/main',
    //             data: {
    //                 postId: `${postedId}`
    //             }
    //         })
    //         .then(res => {
    //             // 接口数据
    //             console.log(res.data);
    //             let { data } = res.data
    //             let { comments } = data
    //             // concretDetail(comments, postedId, detail)
    //         })
    //         .catch(error => {
    //             // 处理错误
    //             console.error(error);
    //         });
    // }
    //     // 渲染评论
    //     function concretDetail(comments, postedId, detail) {
    //         const user_comment = detail.querySelector('.comments')
    //         let user_id = []
    //         console.log(user_comment.length)
    //         for (let j = 0; j < comments.length; j++) {
    //             user_id.push(comments[j].userId)
    //             user_comment.innerHTML += ` <div class="user-com">
    // <div class="user-pic"><img src="data:image/png;base64,${ comments[j].pic}" alt=""></div>
    // <div class="user-comment">
    // <div class="user-id">${comments[j].userName}</div>
    // <div class="user-concre">${comments[j].commentMsg}</div>
    // </div>
    // </div>`
    //         }
    //         console.log(user_id)
    //             // getConcret(user_id,detail)
    //     }
    // 文章由下到上出现
    function appear() {
        const articals = document.querySelector('.artical')
        let timer1 = null
        time(articals, timer1, 1)

    }

    function time(articals, timer1, duration) {

        clearInterval(timer1);
        articals.style.marginTop = '700px'
        timer1 = setInterval(() => {

            let target = 20
            let speed = (target - articals.offsetTop) / 1
            console.log(speed)
            // console.log(articals.offsetTop)
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            if (parseInt(articals.style.marginTop) == target) {
                clearInterval(timer1)
            } else {
                articals.style.marginTop = articals.offsetTop + speed + 'px'
            }
        }, duration)
    }
}





// const url = 'http://47.113.231.211:3000/script/repository/fork';
// const headers = {
//     'Content-Type': 'application/json',
//     'token': `${sessionStorage.getItem("sign1")}`
// };

// look.getAttribute('data-look');

// const payload = {
//     "scriptId": ,
// };

// // 发送 POST 请求
// fetch(url, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(payload)
// })
//     .then(response => response.json())
//     .then(data1 => {

//     })
//     .catch(error => {
//         console.error(error);
//     });