const inner = document.querySelectorAll('.inner')
console.log(inner)
const thumb_before = document.querySelectorAll('.thumb-none')

console.log(thumb_before)
    // 移入鼠标使外侧盒子收起
    // 移出鼠标使外侧盒子出现
for (let i = 0; i < inner.length; i++) {
    inner[i].addEventListener('mouseenter', function() {

        thumb_before[i].style.left = "0%"
        thumb_before[i].style.top = "13%"

    })
    inner[i].addEventListener('mouseleave', function() {
        if (i === 1) {
            thumb_before[i].style.left = "-5%"
            thumb_before[i].style.top = "18%"
        } else {
            thumb_before[i].style.left = "5%"
            thumb_before[i].style.top = "18%"
        }
    })
}
// 使鼠标样式改变,跟随鼠标一起动并替换
let cursor = document.getElementById("cursor");
let cards = document.getElementsByClassName("inner");
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("mousemove", function(event) {
        cursor.classList.add("active");
    });
    cards[i].addEventListener("mouseover", function(event) {
        cursor.classList.add("active");
    });

    cards[i].addEventListener("mouseout", function(event) {
        cursor.classList.remove("active");
    });

}
gsap.set("#cursor", {
    xPercent: -50,
    yPercent: -50
});
// 对象保存了光标的位置，初始位置为窗口宽度的一半和窗口高度的一半
const pos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
// 对象保存了鼠标的位置，初始位置与 pos 对象相同。
const mouse = {
    x: pos.x,
    y: pos.y
};
// 变量定义了光标移动的速度，取值范围为 0 到 1。
const speed = 0.35;
// ，使用 gsap.quickSetter() 方法创建了 xSet 和 ySet 两个快速设置器，用于更新光标元素的水平和垂直位置。
const xSet = gsap.quickSetter(cursor, "x", "px");
const ySet = gsap.quickSetter(cursor, "y", "px");
// 通过监听窗口的 mousemove 事件，更新 mouse 对象的 x 和 y 属性为鼠标的当前位置。
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
// 使用 gsap.ticker.add() 方法创建一个动画循环，在每一帧更新光标的位置。dt 变量通过 gsap.ticker.deltaRatio() 计算得到，用于根据设定的速度对光标的位置进行平滑过渡。然后，根据 mouse 对象的位置和 pos 对象的位置计算出新的光标位置，并使用 xSet 和 ySet 更新光标元素的位置。
gsap.ticker.add(() => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
});
// 拆分字符和css联用
Splitting();

// Full page scroll progress
const body = document.querySelector('body')
gsap.to("body", {
    scrollTrigger: {
        // 触发的元素
        trigger: "body",
        // 页面顶部下方的100%
        start: "top 100%",
        // 结束位置滑到页面中心
        end: "50% 50%",
        scrub: 0,
        onUpdate: (self) => {
            body.style.setProperty("--progress", self.progress);
        }
    }
});

// Pull out the preloader
// 监听页面加载
document.addEventListener("DOMContentLoaded", function() {
    body.classList.add("loaded");
});
// 点击游戏进入相应的界面
function jump() {
    const bignav = document.querySelector('.bignav');
    const panel = document.querySelectorAll('.inner')
    const wrap = document.getElementById('wrap')
    const find = document.querySelector('.find')
    const pk = document.querySelector('.pk')
    const turn = document.querySelector('.turn')
    const turn_on = document.querySelector('.turn-on')
    const jiguan = document.querySelectorAll('.jiguan')
    const first_find = document.querySelector('.first-gk')
    const second_find = document.querySelector('.second-gk')
    const third_find = document.querySelector('.third-gk')
    const guanka = document.querySelector('.guanka')
    const cursor = document.getElementById('cursor')

    turn_on.addEventListener("click", function() {
        wrap.style.display = 'block'
        pk.style.display = 'none'
        bignav.style.backgroundColor = '#fff'
        cursor.style.display = 'none'
    })
    turn.addEventListener("click", function() {
        wrap.style.display = 'block'
        find.style.display = 'none'
        bignav.style.backgroundColor = '#a0af9c'
        cursor.style.display = 'block'

    })
    for (let i = 0; i < panel.length; i++) {
        panel[i].addEventListener('click', function() {
            if (i === 1) {
                wrap.style.display = 'none'
                find.style.display = 'block'
                bignav.style.backgroundColor = 'white'
                find.style.cursor = 'default'
                cursor.style.display = 'none'
            } else if (i === 2) {
                wrap.style.display = 'none'
                pk.style.display = 'block'
                pk.style.cursor = 'default'
                cursor.style.display = 'none'
                bignav.style.backgroundColor = '#728cc0'
            } else {
                window.location = 'mStart.html';
            }
        })
    }
    for (let i = 0; i < jiguan.length; i++) {
        jiguan[i].addEventListener('click', function() {
            if (i === 1) {
                guanka.style.display = 'none'
                first_find.style.display = 'block'
                    // 倒计时

                // 开启定时器开始游戏
                timer1 = setInterval(function() {
                        let daojishi = first_find.querySelector('.first-gk .daojishi')
                            // console.log(daojishi)
                        let daojishi2 = parseInt(daojishi.innerHTML)
                            // console.log(daojishi2)
                        let dao = +daojishi2 - 1 + 's'
                        daojishi.innerHTML = dao
                            // 诈骗因子
                        const redbox = document.querySelectorAll('.first-bg>div:first-of-type>div')
                            // console.log(redbox)
                        let str = 0
                        for (let i = 0; i < redbox.length; i++) {
                            // 获取元素的样式对象
                            let styles = window.getComputedStyle(redbox[i]);

                            // 获取元素的边框样式
                            let borderStyle = styles.getPropertyValue("top");
                            // console.log(borderStyle)
                            // 判断边框样式是否包含红色边框
                            if (borderStyle === '530px') {
                                str += 1
                            }
                        }
                        // 如果为0则清除定时器
                    }, 1000)
                    // 第一个找茬

                first(timer1, first_find, guanka, bignav)
            } else if (i === 0) {
                guanka.style.display = 'none'
                second_find.style.display = 'block'
                    // 倒计时

                // 开启定时器开始游戏
                let timer1 = setInterval(function() {
                        let daojishi = second_find.querySelector('.daojishi')
                            // console.log(daojishi)
                        let daojishi2 = parseInt(daojishi.innerHTML)
                            // console.log(daojishi2)
                        let dao = +daojishi2 - 1 + 's'
                        daojishi.innerHTML = dao
                            // 诈骗因子
                        const redbox = document.querySelectorAll('.second-bg>div:first-of-type>div')
                            // console.log(redbox)
                        let str = 0
                        for (let i = 0; i < redbox.length; i++) {
                            // 获取元素的样式对象
                            let styles = window.getComputedStyle(redbox[i]);

                            // 获取元素的边框样式
                            let borderStyle = styles.getPropertyValue("top");
                            // console.log(borderStyle)
                            // 判断边框样式是否包含红色边框
                            if (borderStyle === '530px') {
                                str += 1
                            }
                        }
                        // 如果为0则清除定时器
                    }, 1000)
                    // 第一个找茬

                second(timer1, second_find, guanka, bignav)
            } else if (i === 2) {
                guanka.style.display = 'none'
                third_find.style.display = 'block'
                    // 倒计时

                // 开启定时器开始游戏
                let timer1 = setInterval(function() {
                        let daojishi = third_find.querySelector('.third-bg .daojishi')
                            // console.log(daojishi)
                        let daojishi2 = parseInt(daojishi.innerHTML)
                            // console.log(daojishi2)
                        let dao = +daojishi2 - 1 + 's'
                        daojishi.innerHTML = dao
                            // 诈骗因子
                        const redbox = document.querySelectorAll('.third-bg>div:first-of-type>div')
                            // console.log(redbox)
                        let str = 0
                        for (let i = 0; i < redbox.length; i++) {
                            // 获取元素的样式对象
                            let styles = window.getComputedStyle(redbox[i]);

                            // 获取元素的边框样式
                            let borderStyle = styles.getPropertyValue("top");
                            // console.log(borderStyle)
                            // 判断边框样式是否包含红色边框
                            if (borderStyle === '530px') {
                                str += 1
                            }
                        }
                        // 如果为0则清除定时器
                    }, 1000)
                    // 第一个找茬

                third(timer1, third_find, guanka, bignav)
            }
        })
    }
}
jump()


let Pic3 = document.querySelector('.personHead>img');
// console.log(sessionStorage.getItem("pic"));
// Pic2.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
if (sessionStorage.getItem("pic") != 'null') {
    Pic3.src = 'data:image/png;base64,' + `${sessionStorage.getItem("pic")}`;
} else if (sessionStorage.getItem("pic") == null) {
    Pic3.src = 'data:image/png;base64,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';
}

let personID = document.querySelector('.personID');

let username = sessionStorage.getItem("userid");
if (username == ' ' || username == null) {
    personID.innerHTML = '未登录';
} else {
    personID.innerHTML = username;
}
let timer2; // 在循环外部声明 timer2 变量
let timer1

function first(timer1, first_find, guanka, bignav) {
    // 六个诈骗因子所放盒子的left定位
    let arr1 = [308, 440, 565, 695, 824, 954]
    const redbox = document.querySelectorAll('.first-bg>div:first-of-type>div')
    const tips = document.querySelectorAll('.first-tip>div')
    const tips_close = document.querySelectorAll('.first-tip>div>div')
    const first_5 = document.querySelector('.first-5')
    const first_6 = document.querySelector('.first-6')
    let tip = [0, 1, 2, 3, 4, 5]

    for (let i = 0; i < redbox.length; i++) {
        redbox[i].addEventListener('click', function() {
                let fruad = redbox[i]
                fruad.style.transition = 'transform 0.3s ease';
                // fruad.style.transform = 'scale(69px, 63px)';
                fruad.style.width = '69px'
                fruad.style.height = '63px'
                fruad.style.transition = 'all 1s ease';
                fruad.style.top = '530px'
                fruad.style.left = arr1[0] + 'px'
                arr1.shift()
                    // 显示对应的提示
                setTimeout(function() { tips[i].style.display = 'block' }, 400)
                for (let j = 0; j < tip.length; j++) {
                    if (tip[j] === i) {
                        tip.splice(j, 1)
                    }
                }
                // console.log(tip)
                clearInterval(timer1)
            })
            //点击提示显示提示信息
        const find_tip = document.querySelector('.find-tip')
        find_tip.addEventListener('click', function() {

            tips[`${tip[0]}`].style.display = 'block'
        })

        // 查看具体的诈骗因子信息
        redbox[i].addEventListener('mouseenter', function() {

            if (i === 4) {
                first_5.style.transition = 'all 0.5s;'
                first_5.style.display = 'block'
            } else if (i === 5) {
                first_6.style.transition = 'all 0.5s;'
                first_6.style.display = 'block'
            }
        })
        redbox[i].addEventListener('mouseleave', function() {
            if (i === 4) {
                first_5.style.transition = 'all 0.5s;'
                first_5.style.display = 'none'
            } else if (i === 5) {
                first_6.style.transition = 'all 0.5s;'

                first_6.style.display = 'none'
            }
        })

    }
    // 关闭提示信息

    for (let i = 0; i < redbox.length; i++) {

        tips_close[i].addEventListener('click', function() {
            clearInterval(timer2)
            tips[i].style.display = 'none'
            timer2 = setInterval(function() {
                let daojishi = first_find.querySelector('.daojishi')

                let daojishi2 = parseInt(daojishi.innerHTML)

                let dao = +daojishi2 - 1 + 's'
                daojishi.innerHTML = dao
                    // 诈骗因子
                const redbox = document.querySelectorAll('.first-bg>div:first-of-type>div')

                let str = 0
                for (let i = 0; i < redbox.length; i++) {
                    // 获取元素的样式对象
                    let styles = window.getComputedStyle(redbox[i]);

                    // 获取元素的边框样式
                    let borderStyle = styles.getPropertyValue("top");
                    // 判断边框样式是否包含红色边框
                    if (borderStyle === '530px') {
                        str += 1
                    }
                }

                if (str === 6) {
                    console.log("你通关了!!!")
                    clearInterval(timer2)
                    const tongguan = document.querySelector('.tongguan')
                    tongguan.style.display = 'block'
                }
                let daojishi3 = first_find.querySelector('.daojishi').innerHTML
                    // 如果为0则清除定时器
                if (daojishi3 === '0s') {
                    clearInterval(timer2)
                }
            }, 1000)
        })
        redbox[i].addEventListener('click', function() {
            clearInterval(timer2)
        })
    }
    close1(guanka, first_find, bignav)

}
// 点击第一个找茬页面的返回键
function close1(guanka, first_find, bignav) {
    clearInterval(timer2)
    const turn1 = document.querySelector('.first-gk .turn1')
    turn1.addEventListener("click", function() {
        guanka.style.display = 'block'
        first_find.style.display = 'none'
        bignav.style.backgroundColor = '#fff'
            // 重置
        const redbox = document.querySelectorAll('.first-bg>div:first-of-type>div')
        for (let i = 0; i < redbox.length; i++) {
            redbox[i].style.cssText = ""; // 将行内样式重置为空字符串
            redbox[i].classList.add(`first-gk${i+1}`)
        }
        clearInterval(timer2)
        let daojishi3 = first_find.querySelector('.daojishi')
        daojishi3.innerHTML = '90s'
    })
}

function second(timer1, first_find, guanka, bignav) {
    // 六个诈骗因子所放盒子的left定位
    let arr1 = [318, 450, 575, 705, 834, 964]

    const redbox = document.querySelectorAll('.second-bg>div:first-of-type>div')
    const tips = document.querySelectorAll('.second-tip>div')
    const tips_close = document.querySelectorAll('.second-tip>div>div')
        // const first_5 = document.querySelector('.first-5')
        // const first_6 = document.querySelector('.first-6')
    let tip = [0, 1, 2, 3, 4, 5]

    for (let i = 0; i < redbox.length; i++) {
        redbox[i].addEventListener('click', function() {
                let fruad = redbox[i]
                fruad.style.transition = 'transform 0.3s ease';
                // fruad.style.transform = 'scale(69px, 63px)';
                fruad.style.width = '50px'
                fruad.style.height = '45px'
                fruad.style.transition = 'all 1s ease';
                fruad.style.top = '540px'
                fruad.style.left = arr1[0] + 'px'
                arr1.shift()
                    // 显示对应的提示
                setTimeout(function() { tips[i].style.display = 'block' }, 400)
                for (let j = 0; j < tip.length; j++) {
                    if (tip[j] === i) {
                        tip.splice(j, 1)
                    }
                }
                // console.log(tip)
                clearInterval(timer1)
            })
            //点击提示显示提示信息
        const find_tip = document.querySelector('.second-gk .find-tip')
        find_tip.addEventListener('click', function() {

            tips[`${tip[0]}`].style.display = 'block'
        })
    }
    // 关闭提示信息

    for (let i = 0; i < redbox.length; i++) {

        tips_close[i].addEventListener('click', function() {
            clearInterval(timer2)
            tips[i].style.display = 'none'
            timer2 = setInterval(function() {
                let daojishi = first_find.querySelector('.daojishi')

                let daojishi2 = parseInt(daojishi.innerHTML)

                let dao = +daojishi2 - 1 + 's'
                daojishi.innerHTML = dao
                    // 诈骗因子
                const redbox = document.querySelectorAll('.second-bg>div:first-of-type>div')

                let str = 0
                for (let i = 0; i < redbox.length; i++) {
                    // 获取元素的样式对象
                    let styles = window.getComputedStyle(redbox[i]);

                    // 获取元素的边框样式
                    let borderStyle = styles.getPropertyValue("top");
                    // 判断边框样式是否包含红色边框
                    if (borderStyle === '540px') {
                        str += 1
                    }
                }

                if (str === 6) {
                    console.log("你通关了!!!")
                    clearInterval(timer2)
                    const tongguan = document.querySelector('.tongguan')
                    tongguan.style.display = 'block'
                }
                let daojishi3 = first_find.querySelector('.daojishi').innerHTML
                    // 如果为0则清除定时器
                if (daojishi3 === '0s') {
                    clearInterval(timer2)
                }
            }, 1000)
        })
        redbox[i].addEventListener('click', function() {
            clearInterval(timer2)
        })
    }
    close2(guanka, first_find, bignav)
}

function close2(guanka, first_find, bignav) {
    clearInterval(timer2)
    const turn1 = document.querySelector('.second-gk .turn2')
    turn1.addEventListener("click", function() {
        guanka.style.display = 'block'
        first_find.style.display = 'none'
        bignav.style.backgroundColor = '#fff'
            // 重置
        const redbox = document.querySelectorAll('.second-bg>div:first-of-type>div')
        for (let i = 0; i < redbox.length; i++) {
            redbox[i].style.cssText = ""; // 将行内样式重置为空字符串
            redbox[i].classList.add(`second-gk${i+1}`)
        }
        clearInterval(timer2)
        let daojishi3 = first_find.querySelector('.second-bg .daojishi')
        daojishi3.innerHTML = '90s'
    })
}

function third(timer1, first_find, guanka, bignav) {
    // 六个诈骗因子所放盒子的left定位
    let arr1 = [318, 450, 575, 705, 834, 964]

    const redbox = document.querySelectorAll('.third-bg>div:first-of-type>div')
    const tips = document.querySelectorAll('.third-tip>div')
    const tips_close = document.querySelectorAll('.third-tip>div>div')
    const third_3 = document.querySelector('.third-3')
    const third_6 = document.querySelector('.third-6')
    let tip = [0, 1, 2, 3, 4, 5]

    for (let i = 0; i < redbox.length; i++) {
        redbox[i].addEventListener('click', function() {
                let fruad = redbox[i]
                fruad.style.transition = 'transform 0.3s ease';
                // fruad.style.transform = 'scale(69px, 63px)';
                fruad.style.width = '50px'
                fruad.style.height = '45px'
                fruad.style.transition = 'all 1s ease';
                fruad.style.top = '540px'
                fruad.style.left = arr1[0] + 'px'
                arr1.shift()
                    // 显示对应的提示
                setTimeout(function() { tips[i].style.display = 'block' }, 400)
                for (let j = 0; j < tip.length; j++) {
                    if (tip[j] === i) {
                        tip.splice(j, 1)
                    }
                }
                // console.log(tip)
                clearInterval(timer1)
            })
            //点击提示显示提示信息
        const find_tip = document.querySelector('.third-gk .find-tip')
        find_tip.addEventListener('click', function() {

                tips[`${tip[0]}`].style.display = 'block'
            })
            // 查看具体的诈骗因子信息
        redbox[i].addEventListener('mouseenter', function() {

            if (i === 2) {
                third_3.style.transition = 'all 0.5s;'
                third_3.style.display = 'block'
            } else if (i === 5) {
                third_6.style.transition = 'all 0.5s;'
                third_6.style.display = 'block'
            }
        })
        redbox[i].addEventListener('mouseleave', function() {
            if (i === 5) {
                third_6.style.transition = 'all 0.5s;'
                third_6.style.display = 'none'
            } else if (i === 2) {
                third_3.style.transition = 'all 0.5s;'

                third_3.style.display = 'none'
            }
        })
    }
    // 关闭提示信息

    for (let i = 0; i < redbox.length; i++) {

        tips_close[i].addEventListener('click', function() {
            clearInterval(timer2)
            tips[i].style.display = 'none'
            timer2 = setInterval(function() {
                let daojishi = first_find.querySelector('.daojishi')

                let daojishi2 = parseInt(daojishi.innerHTML)

                let dao = +daojishi2 - 1 + 's'
                daojishi.innerHTML = dao
                    // 诈骗因子
                const redbox = document.querySelectorAll('.third-bg>div:first-of-type>div')

                let str = 0
                for (let i = 0; i < redbox.length; i++) {
                    // 获取元素的样式对象
                    let styles = window.getComputedStyle(redbox[i]);

                    // 获取元素的边框样式
                    let borderStyle = styles.getPropertyValue("top");
                    // 判断边框样式是否包含红色边框
                    if (borderStyle === '540px') {
                        str += 1
                    }
                }

                if (str === 6) {
                    console.log("你通关了!!!")
                    clearInterval(timer2)
                    const tongguan = document.querySelector('.tongguan')
                    tongguan.style.display = 'block'
                }
                let daojishi3 = first_find.querySelector('.daojishi').innerHTML
                    // 如果为0则清除定时器
                if (daojishi3 === '0s') {
                    clearInterval(timer2)
                }
            }, 1000)
        })
        redbox[i].addEventListener('click', function() {
            clearInterval(timer2)
        })
    }
    close3(guanka, first_find, bignav)
}

function close3(guanka, first_find, bignav) {
    clearInterval(timer2)
    const turn1 = document.querySelector('.third-gk .turn3')
    turn1.addEventListener("click", function() {
        guanka.style.display = 'block'
        first_find.style.display = 'none'
        bignav.style.backgroundColor = '#fff'
            // 重置
        const redbox = document.querySelectorAll('.third-bg>div:first-of-type>div')
        for (let i = 0; i < redbox.length; i++) {
            redbox[i].style.cssText = ""; // 将行内样式重置为空字符串
            redbox[i].classList.add(`third-gk${i+1}`)
        }
        clearInterval(timer2)
        let daojishi3 = first_find.querySelector('.third-bg .daojishi')
        daojishi3.innerHTML = '90s'
    })
}
const hide = document.querySelector('.hide')
const tips = document.querySelectorAll('.first-tip>div>div,.second-tip>div>div,.third-tip>div>div')
console.log(tips)

const find_tip = document.querySelectorAll('.find-tip')
console.log(find_tip)
for (let i = 0; i < find_tip.length; i++) {
    find_tip[i].addEventListener('click', function() {
        hide.style.display = 'block'
    })
}
for (let i = 0; i < tips.length; i++) {
    tips[i].addEventListener('click', function() {
        hide.style.display = 'none'
    })
}
const gk = document.querySelectorAll('.first-bg>div:first-of-type>div,.second-bg>div:first-of-type>div,.third-bg>div:first-of-type>div')
for (let i = 0; i < gk.length; i++) {
    gk[i].addEventListener('click', function() {
        hide.style.display = 'block'
    })
}
const tongsure = document.querySelector('.tong-sure')
const tongguan = document.querySelector('.tongguan')
const allgk = document.querySelectorAll('.first-gk, .second-gk, .third-gk')
const guanka = document.querySelector('.guanka')
tongsure.addEventListener('click', function() {
    tongguan.style.display = 'none'
    for (let i = 0; i < allgk.length; i++) {
        allgk[i].style.display = 'none'
    }
    guanka.style.display = 'block'
})