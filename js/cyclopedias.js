let personID = document.querySelector('.personID');

let username = sessionStorage.getItem("userid");
if (username == ' ' || username == null) {
    personID.innerHTML = '未登录';
    console.log('你好啊');
} else {
    personID.innerHTML = username;
    console.log('我不好');
}

// 百叶窗
const fraud_type = document.querySelectorAll('.fraud-type');
const fraud = document.querySelector('.fraud');

const li = document.querySelectorAll('.type-nav li')
for (let i = 0; i < fraud_type.length; i++) {
    fraud.style.gridTemplateColumns = ' 1fr 1fr 1fr 3fr 1fr 1fr';

    fraud_type[i].addEventListener('click', function() {

        const wrap_label = document.querySelectorAll('.wrap label');
        for (let j = 0; j < wrap_label.length; j++) {
            wrap_label[j].style.boxShadow = 'inset 0px 0px 0px #022612, inset 0px 0px 0px white';
        }
        wrap_label[0].style.boxShadow = 'inset 4px 4px 8px #422612, inset -4px -4px 8px white';

        if (i === 0) {
            fraud.style.gridTemplateColumns = ' 3fr 1fr 1fr 1fr 1fr 1fr';
        }
        if (i === 1) {
            fraud.style.gridTemplateColumns = ' 1fr 3fr 1fr 1fr 1fr 1fr';
        }
        if (i === 2) {
            fraud.style.gridTemplateColumns = ' 1fr 1fr 3fr 1fr 1fr 1fr';
        }
        if (i === 3) {
            fraud.style.gridTemplateColumns = ' 1fr 1fr 1fr 3fr 1fr 1fr';
        }
        if (i === 4) {
            fraud.style.gridTemplateColumns = ' 1fr 1fr 1fr 1fr 3fr 1fr';
        }
        if (i === 5) {
            fraud.style.gridTemplateColumns = ' 1fr 1fr 1fr 1fr 1fr 3fr';
        }
    })
}
// 获取不同类型的大盒子
for (let i = 0; i < fraud_type.length; i++) {
    fraud_type[i].addEventListener('click', function() {
        const bigBox = document.querySelectorAll('.context>div>div')
        const bigBoxs = document.querySelectorAll('.context>div>div>div')
        for (let j = 0; j < li.length; j++) {
            li[j].style.boxShadow = '0px 0px'

        }

        li[i].style.boxShadow = 'inset 4px 4px 8px #422612, inset -4px -4px 8px white '


        // console.log(bigBox)
        for (let j = 0; j < fraud_type.length; j++) {
            console.log('1')
            bigBox[j].style.display = 'none'
            bigBoxs[j].style.left = '0px'
        }
        // console.log(i)
        // bigBox[i].style.left = '0px'
        bigBox[i].style.display = 'block'
        get()
        newsDetail()
    })
}


function newsDetail() {
    const news_breif = document.querySelectorAll('.new-breif')
    const news_detail = document.querySelectorAll('.news-detail')
        // console.log(news_detail)
        // console.log(news_breif)
    for (let k = 0; k < news_breif.length; k++) {
        news_breif[k].addEventListener('click', function() {
            // console.log(k)
            news_detail[k].style.display = 'block'
        })
    }
    const return_news = document.querySelectorAll('.return-news')
        // console.log(return_news)
    for (let k = 0; k < news_breif.length; k++) {
        return_news[k].addEventListener('click', function() {

            news_detail[k].style.display = 'none'
        })
    }
}
// const news = document.querySelectorAll('.news>div')
// console.log(news)
// const detail = document.querySelector('.news-detail')
//     // 注意到时候要换成对应的news-return
// const return_news = document.querySelectorAll('.return-news')
// console.log(return_news)
// console.log(detail)
// for (let i = 0; i < news.length; i++) {
//     news[i].addEventListener('click', function() {

//         detail.style.display = 'block'
//     })
// }
// for (let i = 0; i < return_news.length; i++) {
//     return_news[i].addEventListener('click', function() {
//         console.log('11')
//         console.log(detail)


//         detail.style.display = 'none !important'

//     })
// }

// 点击返回按钮时恢复之前的状态
// for (let i = 0; i < return_news.length; i++) {
//     return_news[i].addEventListener('click', function() {
//         console.log('11');
//         console.log(detail);
//         restorePageState();
//     });
// }
let str1 = 'telFraud'
let str2 = 'wireFraud'
let str3 = 'financialFraud'
let str4 = 'overseasFraud'
let str5 = 'pyramidSale'
let str6 = 'cult'
let str = ['telFraud', 'wireFraud', 'financialFraud', 'overseasFraud', 'pyramidSale', 'cult']
context(str1, 1)
context(str2, 2)
context(str3, 3)
context(str4, 4)
context(str5, 5)
context(str6, 6)


// get()

//  
// 新闻和学习板块显示
function get() {
    const parentContext = document.querySelector('.context>div')
        // console.log(parentContext)
    const childContexts = document.querySelectorAll('.context>div>div')
        // for (let j = 0; j < childContexts.length; j++) {
        //     childContexts[j].style.left = '0px'
        // }
        // console.log(childContexts)
    for (let index = 0; index < childContexts.length; index++) {
        let childContext = childContexts[index]
        let childStyle = getComputedStyle(childContext)
        if (childStyle.display !== 'none') {
            // console.log(index)
            let p = index + 1;
            slide(p)
                // console.log(childStyle.display)
                // const dd = document.querySelector(`.together${index+1}`)
                // console.log(dd)
                // const news = document.querySelectorAll(`.together${index+1} .news>div`)
                // console.log(news)
                // const detail = document.querySelectorAll(`.together${index+1} .news-detail`)
                // 注意到时候要换成对应的news-return
                // const return_news = document.querySelectorAll(`.together${index+1} .return-news`)
                // console.log(return_news)
                // console.log(detail)
                // for (let i = 0; i < news.length; i++) {
                //     news[i].addEventListener('click', function() {

            //         detail.style.display = 'block'
            //     })
            // }


            // // 点击返回按钮时恢复之前的状态
            // for (let i = 0; i < return_news.length; i++) {
            //     return_news[i].addEventListener('click', function() {
            //         console.log('11');
            //         console.log(detail);
            //         restorePageState();
            //     });
            // }
        }

    }
}
// axios请求
function context(str, number) {

    axios({
            method: 'POST',
            url: 'http://47.113.231.211:3000/wikipedia',
            // Headers: {
            //     'Accept': '*/*',
            //     'Content-Type': 'application/json'
            // },
            data: {
                classification: str
            }
        })
        .then(res => {
            // 接口数据
            console.log(res.data);
            let { data } = res.data;
            let { question } = data
            let { news } = data
            // console.log(news)


            newsRender(news, number)
            studyRender(question, number)
            choose(number)
            get()
            newsDetail()
            const submit = document.querySelector(`.together${number} .submit`)

            submit.addEventListener('click', function() {
                    getAnswer(question, number)
                })
                // const submit_btn = document.querySelector('.sub_btn')
                // submit_btn.addEventListener('click', function() {
                //     getAnswer(question)
                // })
                // btn()
                //     // 点击换一题重新加载页面
            let str = ['telFraud', 'wireFraud', 'financialFraud', 'overseasFraud', 'pyramidSale', 'cult']
            const refresh = document.querySelectorAll(` .refresh`)
            console.log(refresh)
            for (let i = 0; i < refresh.length; i++) {
                refresh[i].addEventListener('click', function() {
                    console.log('11')
                    context(str[number - 1], number)
                })
            }


        })
        .catch(error => {
            // 处理错误
            console.error(error);
        });


}
// 渲染新闻
function newsRender(data, number) {
    const together1 = document.querySelector(`.together${number}`)
    const news = document.querySelector(`.together${number} .news`)
    for (let i = 0; i < data.length; i++) {
        {
            news.innerHTML += ` <div class="news-${i+1}">
            <div class="new-breif">
                <div class="news-pic"><img src="${data[i].pic}" alt=""></div>
                <div class="title">${data[i].title}</div>
                <div class="news-text">${data[i].main}</div>
            </div>
            <div class="news-detail">
                <div>
                    <div>
                        <div class="return-news"><div class="bread"><img src="images/bread.gif"></div><div class="return"><img src="images/return.png"></div></div>
                        <div class="Title">${data[i].title}</div>
                        <div class="news-picture"><img src="${data[i].pic}" alt=""></div>
                        <div class="news-Text">${data[i].main}</div>
                    </div>
                </div>
            </div>

        </div>`
        }
    }
}
// 渲染题目
function studyRender(data, number) {
    const together1 = document.querySelector(`.together${number}`)
    const exam_q = document.querySelector(`.together${number} .exam_q`);
    exam_q.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        let exam_arr = [data[i].rightAnswer, data[i].wrongAnswer1, data[i].wrongAnswer2, data[i].wrongAnswer3]
        ShuffleArray(exam_arr)
        exam_q.innerHTML += `<form class="info${i+1}">
        
    <div class="exam_text">${i+1}.${data[i].questionMsg}</div>
    <label "><span>A</span><input type="radio" id="ex${i}_1" name="ex_q${i}" value="${exam_arr[0]}">${exam_arr[0]}</label>
    <label "><span>B</span><input type="radio" id="ex${i}_2" name="ex_q${i}" value="${exam_arr[1]}">${exam_arr[1]}</label>
    <label "><span>C</span><input type="radio" id="ex${i}_3" name="ex_q${i}" value="${exam_arr[2]}">${exam_arr[2]}</label>
    <label "><span>D</span><input type="radio" id="ex${i}_4" name="ex_q${i}" value="${exam_arr[3]}">${exam_arr[3]}</label>
 </form> `
    }
    exam_q.innerHTML += `<div class="refresh">刷新</div>`

}

// 选择题目
function choose(number) {
    const formData = document.querySelector(`.together${number}`)
    const info1 = document.querySelectorAll(`.together${number} .info1 label`)
        // console.log(info1)
    const info2 = document.querySelectorAll(`.together${number} .info2 label`)
    const info3 = document.querySelectorAll(`.together${number} .info3 label`)
    const info4 = document.querySelectorAll(`.together${number} .info4 label`)

    for (let i = 0; i < info1.length; i++) {
        info1[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.together${number} .info1  span`)

            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#f4a000'
        })
    }
    for (let i = 0; i < info2.length; i++) {
        info2[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.together${number} .info2  span`)

            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#f4a000'
        })
    }
    for (let i = 0; i < info3.length; i++) {
        info3[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.together${number} .info3  span`)

            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#f4a000'
        })
    }
    for (let i = 0; i < info4.length; i++) {
        info4[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.together${number} .info4  span`)

            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#f4a000'
        })
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
// 点击提示的确定收回
const lab_b = document.querySelector('.lab-b')
lab_b.addEventListener('click', function() {
    const labtip = document.querySelector('.labtip')
    labtip.style.display = 'none'
})

function getAnswer(data, number) {
    // 获取表单的值
    choose(number)
    let yourAnswer = []
    let n = 4;
    const inputV = document.querySelector(`.together${number}`)
    console.log(inputV)
        // 判断每个单选题是否被全部选中，如果没有被全部选中，则弹出浮窗
    let allSelected = true; // 标记是否全部被选中
    for (let i = 1; i <= n; i++) {
        const exam_q = document.querySelector(`.together${number} .study .exam_q`)
        const info = exam_q.querySelector(`.info${i}`);
        const inputArr = info.querySelectorAll('label input');

        let selected = false; // 单个单选框是否被选中

        for (let j = 0; j < inputArr.length; j++) {
            if (inputArr[j].checked) {
                selected = true;
                break; // 如果有一个被选中，则跳出内层循环
            }
        }
        if (!selected) {
            allSelected = false;
        }
    }
    console.log(allSelected)
    if (allSelected) {
        for (let i = 0; i < n; i++) {

            let yourAnswer = []
            let n = 4;
            const exam_q = document.querySelector(`.together${number} .study .exam_q`)
            console.log(exam_q)
            for (let i = 1; i <= n; i++) {
                const info = exam_q.querySelector(`.info${i}`)
                const inputArr = info.querySelectorAll('label input')
                const spanArr = info.querySelectorAll('label span')
                for (let i = 0; i < inputArr.length; i++) {
                    if (inputArr[i].checked) {
                        spanArr[i].style.backgroundColor = 'red'
                    }
                }
            }
        }
        let rightArr = []
        let k = 0
        for (let k = 0; k < data.length; k++) {
            let rightAnswers = data[k].rightAnswer
                // console.log(typeof rightAnswers)
            rightArr.push(rightAnswers.toString())
        }
        console.log(rightArr)
        const info1 = document.querySelectorAll('.info1 input')
            // console.log(info1)
        const info2 = document.querySelectorAll('.info2 input')
        const info3 = document.querySelectorAll('.info3 input')
        const info4 = document.querySelectorAll('.info4 input')
            // console.log(rightArr)
        for (let j = 0; j < info1.length; j++) {
            if (info1[j].value === rightArr[0]) {
                const action = document.querySelectorAll(`.info1  span`)

                action[j].style.backgroundColor = 'green'
            }
        }
        for (let j = 0; j < info2.length; j++) {
            if (info2[j].value === rightArr[1]) {
                const action = document.querySelectorAll(`.info2  span`)

                action[j].style.backgroundColor = 'green'
            }
        }
        for (let j = 0; j < info3.length; j++) {
            if (info3[j].value === rightArr[2]) {
                const action = document.querySelectorAll(`.info3  span`)

                action[j].style.backgroundColor = 'green'
            }
        }
        for (let j = 0; j < info4.length; j++) {
            if (info4[j].value === rightArr[3]) {
                const action = document.querySelectorAll(`.info4  span`)

                action[j].style.backgroundColor = 'green'
            }
        }
        const spans = inputV.querySelectorAll(`span`)
        console.log(spans)
        let count = 0
        for (let j = 0; j < spans.length; j++) {
            // 获取计算后的样式属性
            let spanStyle = spans[j].style.backgroundColor;

            if (spanStyle === "red") {
                count += 1;
            }
            console.log(count)
        }
        console.log(count)
        const finishtip = document.querySelector('.finishtip')
        const range = document.querySelector('.range')
        const recommend = document.querySelector('.recommend')
        if (count === 0) {
            range.innerHTML = '你的正确率为100%！'
            recommend.innerHTML = '完全正确！可以选择你感兴趣的剧本进行模拟啦~'
            finishtip.style.display = 'block'
        } else if (count === 1) {
            range.innerHTML = '你的正确率为75%！'
            recommend.innerHTML = '做得还不错！可以选择你感兴趣的剧本进行模拟啦~'
            finishtip.style.display = 'block'
        } else if (count === 3) {
            range.innerHTML = '你的正确率为25%！'
            recommend.innerHTML = '你的正确率有点低哦！快去模拟此类型的诈骗剧本吧~'
            finishtip.style.display = 'block'
        } else if (count === 2) {
            range.innerHTML = '你的正确率为50%！'
            recommend.innerHTML = '你的正确率有一般哦！快去模拟此类型的诈骗剧本吧~'
            finishtip.style.display = 'block'
        } else {
            range.innerHTML = '你的正确率为0%！'
            recommend.innerHTML = '你很有可能会被骗哦！快去模拟此类型的诈骗剧本吧~'
            finishtip.style.display = 'block'
        }
        const finishtip_b = document.querySelector('.finish-b')
        finishtip_b.addEventListener('click', () => {
            finishtip.style.display = 'none'
        })
    } else {
        const labtips = document.querySelector('.labtip')
        labtips.style.display = 'block'
    }

}



// 获取正确答案的值


// 对比答案的不一，说明对错
// let wrongArray = []
// let rightArray = []
// for (let i = 0; i < rightArr.length; i++) {

//     if (yourAnswer[i] === rightArr[i]) {
//         rightArray.push(`${i+1}`)
//             // console.log(`${i+1}做对了`)
//     } else {
//         // console.log(`${i+1}做错了`)
//         wrongArray.push(`${i+1}`)
//     }






// for (let i = 0; i < 4; i++) {
//     const inputV = document.getElementsByName(`ex_q${i}`)
//     console.log(inputV)
//     for (let i = 0; i < inputV.length; i++) {
//         if (inputV[i].checked) {
//             const action = document.querySelectorAll(`.info${i+1}  span`)

//             action[i].style.backgroundColor = 'red'
//             break;
//         }
//     }
// }


// displayRight(info1)
// displayRight(info2)
// displayRight(info3)
// displayRight(info4)

// 按钮切换
const wrap_input = document.querySelectorAll('.wrap input')
    // console.log(wrap_input)
    // for (let i = 0; i < wrap_input.length; i++) {
    //     const wrap_label = document.querySelectorAll('.wrap label')
    //     console.log(wrap_label)
    //     wrap_input[i].addEventListener('click', function() {
    //         const wrap_label = document.querySelectorAll('.wrap label')
    //         console.log(wrap_label)
    //         for (let j = 0; j < wrap_label.length; j++) {
    //             wrap_label[j].style.boxShadow = 'inset 0px 0px 0px #022612, inset 0px 0px 0px white;'
    //         }
    //         wrap_label[i].style.boxShadow = 'inset 4px 4px 8px #422612, inset -4px -4px 8px white;'
    //     })
    // }
function slide(p) {
    let y = 0;
    for (let i = 0; i < wrap_input.length; i++) {

        const wrap_label = document.querySelectorAll('.wrap label');
        wrap_label[0].addEventListener('click', function(index) {

            for (let j = 0; j < wrap_label.length; j++) {
                wrap_label[j].style.boxShadow = 'inset 0px 0px 0px #022612, inset 0px 0px 0px white';
            }
            wrap_label[0].style.boxShadow = 'inset 4px 4px 8px #422612, inset -4px -4px 8px white';
            y = 1
            tabDisplay(y, p);

            // console.log(y, p)
        });
        wrap_label[1].addEventListener('click', function(index) {

            for (let j = 0; j < wrap_label.length; j++) {
                wrap_label[j].style.boxShadow = 'inset 0px 0px 0px #022612, inset 0px 0px 0px white';
            }
            wrap_label[1].style.boxShadow = 'inset 4px 4px 8px #422612, inset -4px -4px 8px white';
            y = 2
            tabDisplay(y, p);

            // console.log(y, p)
        });

    }
}

function tabDisplay(y, p) {
    const together = document.querySelector(`.together${p}>div`)
    if (y % 2 == 0) {
        together.style.left = '-1200px'
    } else {
        together.style.left = '0px'
    }
}
// get()
// 点击换题按钮时重新执行 context 函数
function bindRefreshEvent() {
    const refreshButtons = document.querySelectorAll('.refresh');
    refreshButtons.forEach((button) => {
        const togetherIndex = button.getAttribute('data-together-index');
        button.addEventListener('click', function() {
            const str = ['telFraud', 'wireFraud', 'financialFraud', 'overseasFraud', 'pyramidSale', 'cult'];
            context(str[togetherIndex - 1], togetherIndex);
        });
    });
}

// 在页面加载完成后执行事件绑定
document.addEventListener('DOMContentLoaded', function() {
    bindRefreshEvent();
});

let navPresonA = document.querySelector('.navPreson>a');
// navPresonA.preventDefault();
navPresonA.addEventListener('click', function(e) {
    e.preventDefault();
    if (personID.textContent == '未登录') {
        window.location.href = "login1.html";
    } else {
        window.location.href = "center.html";
        // console.log(window.location.href);
    }
})



let Pic2 = document.querySelector('.personHead>img');
// console.log(sessionStorage.getItem("pic"));
// Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
if (sessionStorage.getItem("pic") != 'null') {
    Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
} else if (sessionStorage.getItem("pic") == null) {
    Pic2.src = 'data:image/png;base64,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';
}



const nav = document.querySelector('.bignav');
// 获取滚动条滚动到的位置
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    // const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    // 根据需要修改阈值
    const threshold = 200;
    if (scrollPosition >= threshold) {
        nav.style.backgroundColor = '#fff';
    } else {
        nav.style.backgroundColor = 'transparent'; // 或者指定其他颜色
    }
});


// 点击箭头往下滑动
const turndown = document.querySelector('.cy-down')
console.log(turndown)
const twochoose = document.querySelector('.twochoose')
console.log(twochoose)
turndown.addEventListener('click', function() {
        window.scrollTo({
            top: twochoose.offsetTop - '50',
            behavior: 'smooth'
        })
    })
    // 检查是否存在滚动或点击事件的标志
let hasScrollOrClick = false;

// 监听滚动事件
window.addEventListener('scroll', function() {
    hasScrollOrClick = true;
});

// 监听点击事件
for (let i = 0; i < fraud_type.length; i++) {
    fraud_type[i].addEventListener('click', function() {
        hasScrollOrClick = true;
    });
}

// 设置定时器，在没有滚动或点击事件的情况下执行自动滚动
setTimeout(function() {
    if (!hasScrollOrClick) {
        window.scrollTo({
            top: twochoose.offsetTop - '50',
            behavior: 'smooth'
        })
    }
}, 2000); // 在2秒后触发定时器，请根据需要进行调整
// 点击对应导航栏显示对应新闻和做题的盒子
function typeChoose() {
    const li = document.querySelectorAll('.type-nav li')
    for (let i = 0; i < li.length; i++) {

        const together = document.querySelectorAll('.context>div:nth-of-type(2)>div')
        console.log(together)
            // li[i].addEventListener('mouseenter', function() {

        //     li[i].style.boxShadow = 'inset 4px 4px 8px #422612, inset -4px -4px 8px white'
        // })
        // li[i].addEventListener('mouseleave', function() {

        //     li[i].style.boxShadow = '0px 0px'
        // })
        li[i].addEventListener('click', function() {
            for (let j = 0; j < li.length; j++) {
                li[j].style.boxShadow = '0px 0px'
                together[j].style.display = 'none'
            }

            li[i].style.boxShadow = 'inset 4px 4px 8px #422612, inset -4px -4px 8px white '

            together[i].style.display = 'block'

            if (i === 0) {
                fraud.style.gridTemplateColumns = ' 3fr 1fr 1fr 1fr 1fr 1fr';
            }
            if (i === 1) {
                fraud.style.gridTemplateColumns = ' 1fr 3fr 1fr 1fr 1fr 1fr';
            }
            if (i === 2) {
                fraud.style.gridTemplateColumns = ' 1fr 1fr 3fr 1fr 1fr 1fr';
            }
            if (i === 3) {
                fraud.style.gridTemplateColumns = ' 1fr 1fr 1fr 3fr 1fr 1fr';
            }
            if (i === 4) {
                fraud.style.gridTemplateColumns = ' 1fr 1fr 1fr 1fr 3fr 1fr';
            }
            if (i === 5) {
                fraud.style.gridTemplateColumns = ' 1fr 1fr 1fr 1fr 1fr 3fr';
            }
        })

    }
}
typeChoose()