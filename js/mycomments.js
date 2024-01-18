function commentDisplay() {
    let commentUrl = 'http://47.113.231.211:3000/users/comment';
    //获取我的评论按钮
    const myshare = document.querySelector('.centerShare')
    const second_com = document.querySelector('.second-com')
    const change = document.querySelector('.centerIn>div:nth-of-type(2)')
    console.log(change)
    myshare.addEventListener('click', function() {
            second_com.style.display = 'block'
            change.style.display = 'none'
            mylike(commentUrl)
        })
        // 我的点赞/评论请求渲染
    let token = `${sessionStorage.getItem('sign1')}`
    console.log(token)
    let userName = `${sessionStorage.getItem('userid')}`
    console.log(userName)

    function mylike(url) {
        axios({
                method: 'GET',
                url: `${url}`,
                headers: {
                    'token': `${token}`
                }
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

                    // 由下到上显示文章
                    appear()
                        //     // 发表评论
                        // comment()
                        //     // 点赞
                        // like();

                }
                executeFunctions(data)

            })
            .catch(error => { //  处理错误
                console.error(error);
            });
    }
    // 渲染帖子
    function appearArtical(data) {
        const articles = document.querySelector('.second-com>.community>div:nth-of-type(2)>div:first-of-type>div')
        for (let i = 0; i < data.length; i++) {
            articles.innerHTML += `     <div class="artical">
            <div class="user-com">
            <div class="dis-id">${data[i].postId}</div>
            <div class="user-pic"><img src="${'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`}"></div>
            <div class="user-comment">
            <div class="user-id">${userName}</div>
            <div class="user-concre">${data[i].commentMsg}</div>
            </div>
          </div>

<div class="artical-detail">
    </div>
</div>`
        }
        // like()
    }
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
    // 漫画匀速播放
    const cartoon = document.querySelector('.second-com .cartoons>div');
    console.log(cartoon.style.marginTop);
    cartoon.style.marginTop = '0px';
    let timer = setInterval(function() {
        cartoon.style.transition = '3s'
        let speed = -30;
        // console.log(parseInt(cartoon.style.marginTop));
        if (parseInt(cartoon.style.marginTop) <= -6900) {

            cartoon.style.transition = '0s'
            cartoon.style.marginTop = '0px';
        }
        cartoon.style.marginTop = (parseInt(cartoon.style.marginTop) + speed) + 'px';
    }, 500);

    // 鼠标移入停止定时器
    cartoon.addEventListener('mouseenter', function() {
        clearInterval(timer);
    });

    // 鼠标移出恢复定时器
    cartoon.addEventListener('mouseleave', function() {
        console.log('11');
        timer = setInterval(function() {
            cartoon.style.transition = '2s'
            let speed = -30;
            // console.log(parseInt(cartoon.style.marginTop));
            if (parseInt(cartoon.style.marginTop) <= -6900) {
                // console.log(1);
                cartoon.style.transition = '0s'
                cartoon.style.marginTop = '0px';
            }
            cartoon.style.marginTop = (parseInt(cartoon.style.marginTop) + speed) + 'px';
        }, 500);
    });


    // 获取表单值并渲染到页面上
    const posted_submit = document.querySelector('.posted-submit')
        // 点击提示的确定使提示盒子关闭
    const title_nones = document.querySelectorAll('.title-none')
    const title_b = document.querySelectorAll('.title-b')
    for (let i = 0; i < title_b.length; i++) {
        title_b[i].addEventListener('click', function() {
            title_nones[i].style.display = 'none'
        })
    }

    function articalRender() {  
        // 点击文章大概显示详细信息
        const artical_sum = document.querySelectorAll('.second-com .artical>.user-com')
        console.log(artical_sum)
        const artical_detail = document.querySelectorAll('.second-com .artical-detail')
        console.log(artical_detail)
        for (let i = 0; i < artical_sum.length; i++) {
            artical_sum[i].addEventListener('click', function() {
                const disPost = artical_sum[i]
                const postedId= disPost.querySelector('.dis-id').innerHTML
                console.log(postedId)
                console.log(i)
                artical_detail[i].style.display = 'block'
                const detail = artical_detail[i]
                // const postedId = detail.querySelector(`.postId`).innerHTML
              
                // console.log(writerId)
                // console.log(postedId)
                DisplayComment(postedId, detail)
             
                
            })
        }
        // // 点击返回文章回到社区页面
        // const return_com = document.querySelectorAll('.return-com')
        // console.log(return_com)
        // for (let j = 0; j < return_com.length; j++) {
        //     return_com[j].addEventListener('click', function() {
        //         console.log(j)
        //         artical_detail[j].style.display = 'none'
        //     })
        // }
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
    function like() {
        const abilitys = document.querySelectorAll('.abilitys')
        console.log(abilitys)
        const likes = document.querySelectorAll('.abilitys .likes')
        const xihuan = document.querySelectorAll('.xihuan img')
        const postid = document.querySelectorAll(` .postId`)
        let degree = 1
        const xihuanCount = document.querySelectorAll('.likes span:nth-of-type(2) ')
        console.log(xihuanCount)
        for (let i = 0; i < likes.length; i++) {
            likes[i].addEventListener('click', function() {
                // const postid = document.querySelector(`.abilitys${i} .postId`)
                // console.log(postid)
                // console.log(postid.innerHTML)
                const postedId = postid[i].innerHTML
                degree++
                if (degree % 2 == 0) {
                    let xCount = xihuanCount[i].innerHTML
                    console.log(xCount)
                    xihuanCount[i].innerHTML = parseInt(xCount) + 1
                    xihuan[i].src = 'images/xin1.png'
                    axios({
                            method: 'POST',
                            url: 'http://47.113.231.211:3000/community/like',
                            headers: {
                                'token': `${token}`
                            },
                            data: {
                                postId: `${postedId}`
                            }
                        })
                        .then(res => {
                            // 接口数据
                            console.log(res.data);
                        })
                        .catch(error => {
                            // 处理错误
                            console.error(error);
                        });
                } else {
                    let xCount = xihuanCount[i].innerHTML
                    console.log(xCount)
                    xihuanCount[i].innerHTML = parseInt(xCount) - 1
                    xihuan[i].src = 'images/xin2.png'
                }

            })
        }
    }
    // 发表评论渲染并且传接口
    function comment() {
        const comments = document.querySelectorAll('.shares')
        console.log(comments)
        const comment_box = document.querySelectorAll('.comment-publish')
        console.log(comment_box)
        const comment_packup = document.querySelectorAll('.comment-packup')
        const user_comment = document.querySelectorAll('.comments')
        const comment_sure = document.querySelectorAll('.comment-sure')
        const postid = document.querySelectorAll(`.postId`)
        console.log(comment_sure)
        console.log(user_comment)
            // 点击评论按钮出现评论
        for (let i = 0; i < comments.length; i++) {
            comments[i].addEventListener('click', function() {
                comment_box[i].style.right = '-300px'
                comment_box[i].style.visibility = 'visible'
            })
        }
        // 点击收起评论框
        for (let i = 0; i < comment_packup.length; i++) {
            comment_packup[i].addEventListener('click', function() {
                comment_box[i].style.right = '-900px'
                comment_box[i].style.visibility = 'hidden'
            })
        }
        const comment_tip = document.querySelectorAll('.comment-tip')
        const com_sure = document.querySelectorAll('.comment-tip div')
        for (let j = 0; j < comment_sure.length; j++) {

            comment_sure[j].addEventListener('click', function() {

                        const postedId = postid[j].innerHTML
                        console.log(postedId)
                            // 获取表单的值
                        const input3 = document.querySelectorAll(`.comment-input`)
                        const input4 = input3[j].value
                        if (input4 == '') {
                            console.log('11')
                            comment_tip[j].style.display = 'block'
                        } else {
                            input3[j].value = ""
                            comment_box[j].style.right = '-900px'
                            comment_box[j].style.visibility = 'hidden'
                            user_comment[j].innerHTML += ` <div class="user-com">
            <div class="user-pic"><img src=${'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`} alt=""></div>
            <div class="user-comment">
                <div class="user-id">${username}</div>
                <div class="user-concre">${input4}</div>
            </div>
        </div>`
        console.log(token)
        axios({
                method: 'POST',
                url: 'http://47.113.231.211:3000/community/comment',
                headers: {
                    'token': `${token}`
                },
                data: {
                    commentMsg: `${input4}`,
                    postId: `${postedId}`
                }
            })
            .then(res => {
                // 接口数据
                console.log(res.data);
            })
            .catch(error => {
                // 处理错误
                console.error(error);
            });
        // 获取评论的数量
        const commentCount = document.querySelectorAll('.shares span:nth-of-type(2)')
        const cCount = commentCount[j].innerHTML
        commentCount[j].innerHTML = parseInt(cCount) + 1
                    }
      
        })
        com_sure[j].addEventListener('click',function(){
            comment_tip[j].style.display ='none'
        })
    }
}
// 获取每篇文章的具体信息
function DisplayComment(postedId,detail){
    axios({
        method: 'POST',
        url: 'http://47.113.231.211:3000/community/main',
        data: {
        postId:`${postedId}`
        }
        })
        .then(res => {
        // 接口数据
        console.log(res.data);
        let {data} = res.data
        let {post} = data
        let {comments} = data
        concretDetail(comments,postedId,detail,post)
        })
        .catch(error => {
        // 处理错误
        console.error(error);
        });
}
// 渲染评论
function concretDetail(comments,postedId,detail,post) {
   
    let user_id = []
    detail.innerHTML = `<div>
    <div>
        <div class="return-com">
            <div class="bread"><img src="images/return2.png"></div>
            
        </div>
        <div class="artical-Title">${post.title}</div>
        <div class="user">
            <div class="userImg"><img src="images/user1.jpg" alt=""></div>
            <div class="username">cheer up</div>
        </div>
        <div class="artical-Content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        ${post.article}
        </div>
        <div class="abilitys">
            <div class="postId">${post.postId}</div> <div class="writerId">${post.writerId}</div>                       <div class="likes">
                                        <span class="xihuan">
                                            <img src="images/xin2.png" alt="">
                                        </span>
                                        <span>${post.likes}</span>
                                    </div>
                                    <div class="shares">
                                        <span class="liuyan "><img src="images/liuyan.png" ></span><span>${post.comments}
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
</div>`
const user_comment = detail.querySelector('.comments')
    console.log(user_comment)
     // 点击返回文章回到社区页面
     const return_com = detail.querySelector('.return-com')
     console.log(return_com)
     
     return_com.addEventListener('click', function() {
           
             detail.style.display = 'none'
         })
     
    for(let j = 0;j < comments.length;j++){
        user_id.push(comments[j].userId)
        
    user_comment.innerHTML += ` <div class="user-com">
<div class="user-pic"><img src=images/chu.png alt=""></div>
<div class="user-comment">
<div class="user-id">${comments[j].userId}</div>
<div class="user-concre">${comments[j].commentMsg}</div>
</div>
</div>`
}
console.log(user_id)
getConcret(user_id,detail)
const writerId = detail.querySelector('.writerId').innerHTML
console.log(writerId)
displayWriter(writerId, detail)
like()
comment()
}
// 获取具体用户的用户名和头像
function getConcret(user_id,detail){
const concret_id = detail.querySelectorAll('.user-id')
const concret_pic = detail.querySelectorAll('.user-pic img')
console.log(user_id)
for(let i = 0; i < user_id.length;i++){
    console.log(user_id[i])
    axios({
       method: 'POST',
       url: 'http://47.113.231.211:3000/users/detail',
       data: {
     userId:`${user_id[i]}`
       }
        })
        .then(res => {
       // 接口数据
       console.log(res.data);
       let {data}=res.data
       let {user}=data
       let {userValue}=data
       console.log(user)
       console.log(userValue)
       let user_name = user.username;
            let user_pic = userValue.pic;
            concret_pic[i].src = 'data:image/png;base64,' + `${user_pic}`;
            concret_id[i].innerHTML = `${user_name}`
        })
        .catch(error => {
       // 处理错误
       console.error(error);
        });
}
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


let Pic2=document.querySelector('.personHead>img');
// Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
if(sessionStorage.getItem("pic")!='null'){
    Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
}else{
    // console.log(111);
    Pic2.src ='data:image/png;base64,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';
}
// console.log(sessionStorage.getItem("pic"));
// Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;


// const nav1 = document.querySelector('.nav');
// const detailBox = document.querySelector('.artical-detail');
//   detailBox.addEventListener('scroll', function() {
//     if (detailBox.scrollTop >= 10) {
//         nav1.style.backgroundColor = '#fff';
//     } else {
//         nav1.style.backgroundColor = 'transparent'; // 或者指定其他颜色
//     }
// });


// 获取返回按钮
const return_change = document.querySelectorAll('.return-change');
for (let i = 0; i < return_change.length; i++) {
    return_change[i].addEventListener('click', function(){
        if(i==0){
            first_com.style.display = 'none';
            change.style.display = 'block';
        }else{
            second_com.style.display = 'none';
            change.style.display = 'block';
        }
    })
}
}
commentDisplay()