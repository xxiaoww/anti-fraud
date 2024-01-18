const answers = document.querySelector('.q_answer')
const expassword = document.querySelector('.exclusive_pw')
    // 一开始渲染页面
axios({
        method: 'GET',
        url: 'http://47.113.231.211:3000/password',
        //  url: 'http://47.113.231.211:3000/password',
    })
    .then(res => {
        // 接口数据
        console.log(res.data);
        let { data } = res.data

        problemRnder(data)

        btn1()

    })
    .catch(error => {
        // 处理错误

        console.error(error);
    });
// 点击下一页重新出题和翻转
const nextpage = document.querySelector('.nextpage')
console.log(nextpage)
    // 添加翻页事件，重新加载题目
let i = 0
nextpage.addEventListener('click', function() {
    const page = document.querySelectorAll('.page')
        // page[i].style.display = 'block'
        // page[i].style.zIndex = 2
    page[i].style.transform = 'rotateY(-170deg)'
    const answers = document.querySelector('.q_answer')
    const expassword = document.querySelector('.exclusive_pw')
    answers.innerHTML = ''
    expassword.innerHTML = ''
    i++
    axios({
            method: 'GET',
            // url: 'http://47.113.231.211:3000/password',
            url: 'http://47.113.231.211:3000/password',
        })
        .then(res => {
            // 接口数据
            console.log(res.data);
            let { data } = res.data

            problemRnder(data)
            btn1()
        })
        .catch(error => {
            // 处理错误
            console.error(error);
        });

})

// 点击生成按钮获取表单的值
function btn1() {
    const btn = document.querySelector('.pw_btn')
    btn.addEventListener('click', function() {
        const q1 = document.getElementsByName('question1');
        console.log(q1);
        let an1;
        for (let i = 0; i < q1.length; i++) {
            if (q1[i].checked) {
                an1 = q1[i].value;
                break;
            }
        }
        const q2 = document.getElementsByName('question2');
        let an2;
        for (let i = 0; i < q2.length; i++) {
            if (q2[i].checked) {
                an2 = q2[i].value;
                break;
            }
        }
        const q3 = document.getElementsByName('question3');
        let an3;
        for (let i = 0; i < q3.length; i++) {
            if (q3[i].checked) {
                an3 = q3[i].value;
                break;
            }
        }
        const q4 = document.getElementsByName('question4');
        let an4;
        for (let i = 0; i < q4.length; i++) {
            if (q4[i].checked) {
                an4 = q4[i].value;
                break;
            }
        }
        const q5 = document.getElementsByName('question5');
        let an5;
        for (let i = 0; i < q5.length; i++) {
            if (q5[i].checked) {
                an5 = q5[i].value;
                break;
            }
        }
        console.log(an1, an2, an3, an4, an5)
        let Answer = [an1, an2, an3, an4, an5]
            // 将表单的值传给后端翻译
        axios({
                method: "POST",
                // url: 'http://47.113.231.211:3000/password',
                url: 'http://47.113.231.211:3000/password',
                data: {
                    Answer
                }
            })
            .then(res => {
                console.log(res)
                let { data } = res
                conservesion(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    })
}
// 渲染的函数
function problemRnder(data) {
    const answers = document.querySelector('.q_answer')
    const expassword = document.querySelector('.exclusive_pw')
    answers.innerHTML = `<div class="pw_title">回答以下五道题后即可生成专属密码</div>
    <div class="pw_q">
        <div class="pw_q1">
            <div class="que1">1.${data[0].passwordQuestion}</div>
            <div class="answer1"><label for="q1_c1"><input id="q1_c1" type="radio" checked name="question1" value="${data[0].choice1}">${data[0].choice1}</label><label for="q1_c2"><input type="radio" id="q1_c2"name="question1" value="${data[0].choice2}">${data[0].choice2}</label><label for="q1_c3"><input type="radio" id="q1_c3"name="question1" value="${data[0].choice3}">${data[0].choice3}</label>
                <label for="q1_c4"><input type="radio" id="q1_c4"name="question1" value="${data[0].choice4}">${data[0].choice4}</label>
            </div>
        </div>
        <div class="pw_q2">
            <div class="que2">2.${data[1].passwordQuestion}</div>
            <div class="answer2"><label for="q2_c1"><input type="radio" id="q2_c1" 
            checked name="question2" value="${data[1].choice1}">${data[1].choice1}</label><label for="q2_c2"><input type="radio" id="q2_c2"  name="question2" value="${data[1].choice2}">${data[1].choice2}</label><label for="q2_c3"><input type="radio" id="q2_c3" name="question2" value="${data[1].choice3}">${data[1].choice3}</label>
                <label for="q2_c4"><input type="radio" id="q2_c4" name="question2" value="${data[1].choice4}">${data[1].choice4}</label>
            </div>
        </div>
        <div class="pw_q3">
            <div class="que3">3.${data[2].passwordQuestion}</div>
            <div class="answer3"><label for="q3_c1"><input type="radio" id="q3_c1" checked name="question3" value="${data[2].choice1}">${data[2].choice1}</label><label for="q3_c2"><input type="radio" id="q3_c2"  name="question3" value="${data[2].choice2}">${data[2].choice2}</label><label for="q3_c3"><input type="radio" id="q3_c3"  name="question3" value="${data[2].choice3}">${data[2].choice3}</label>
                <label for="q3_c4"><input type="radio" id="q3_c4"  name="question3" value="${data[2].choice4}">${data[2].choice4}</label>
            </div>
        </div>
        <div class="pw_q4">
            <div class="que4">4.${data[3].passwordQuestion}</div>
            <div class="answer4"><label  for="q4_c1"><input type="radio" id="q4_c1" checked  name="question4" value="${data[3].choice1}">${data[3].choice1}</label><label for="q4_c2"><input type="radio"  id="q4_c2" name="question4" value="${data[3].choice2}">${data[3].choice2}</label><label for="q4_c3"><input type="radio"  id="q4_c3" name="question4" value="${data[3].choice3}">${data[3].choice3}</label>
                <label for="q4_c4"><input type="radio"  id="q4_c4" name="question4" value="${data[3].choice4}">${data[3].choice4}</label>
            </div>
        </div>
        <div class="pw_q5">
            <div class="que5">5.${data[4].passwordQuestion}</div>
            <div class="answer5"><label for="q5_c1"><input type="radio" id="q5_c1" checked name="question5" value="${data[4].choice1}">${data[4].choice1}</label><label for="q5_c2"><input type="radio" id="q5_c2"  name="question5" value="${data[4].choice2}">${data[4].choice2}</label><label for="q5_c3"><input type="radio" id="q5_c3"  name="question5" value="${data[4].choice3}">${data[4].choice3}</label>
                <label for="q5_c4"><input type="radio" id="q5_c4"  name="question5" value="${data[4].choice4}">${data[4].choice4}</label>
            </div>
        </div>
        <button class="pw_btn">开始生成
        </button>
    </div>`
    expassword.innerHTML = `  <div class="product_pw">为您生成的专属密码为：</div>
    <div class="pw_result"></div>
    <div class="unsatisfy">
        <div class="pw_again">不满意？重新再次生成...</div><span></span>
       
    </div>
   `
}
// 生成字符串密码
function conservesion(data) {
    let pwArr = ['!', '?', '.', '@', '#', '$', '%', '&', '*', ',']
    let graph1 = punctuation(pwArr)
    let graph2 = punctuation(pwArr)
    let graph3 = punctuation(pwArr)
    let graph4 = punctuation(pwArr)
    data = data.split(',')
    let choice1 = choose(data)
    let choice2 = choose(data)
    let choice3 = choose(data)
    let choice4 = choose(data)
    const pwarr1 = [...graph1, ...choice1]
    const pwarr2 = [...graph2, ...choice2]
    const pwarr3 = [...graph3, ...choice3]
    const pwarr4 = [...graph4, ...choice4]
    shuffleArray(pwarr1)
    shuffleArray(pwarr2)
    shuffleArray(pwarr3)
    shuffleArray(pwarr4)
    console.log(pwarr1)
    let pwarrstr1 = pwarr1.join('')
    let pwarrstr2 = pwarr2.join('')
    let pwarrstr3 = pwarr3.join('')
    let pwarrstr4 = pwarr4.join('')
    console.log(pwarrstr1)
    const pw_result = document.querySelector('.pw_result')
    pw_result.innerHTML = ` <div class="choice1">密码一：</br> ${pwarrstr1}</div>
    <div class="choice2">密码二：</br> ${pwarrstr2}</div>
    <div class="choice3">密码三：</br> ${pwarrstr3}</div>
    <div class="choice4">密码四：</br> ${pwarrstr4}</div>`
}
// 随机打乱数组顺序
function shuffleArray(arr) {
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
// 随机抽取两个答案（不可重复）
function choose(array) {
    let randomIndex1 = Math.floor(Math.random() * array.length);

    let randomIndex2;
    do {
        randomIndex2 = Math.floor(Math.random() * array.length);
    } while (randomIndex2 === randomIndex1);
    return [array[randomIndex1], array[randomIndex2]];

}
// 随机抽取两个符号（可重复）
function punctuation(array) {
    const index1 = Math.floor(Math.random() * array.length);
    const index2 = Math.floor(Math.random() * array.length);
    return [array[index1], array[index2]]
}