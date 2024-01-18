axios({
        method: 'GET',
        url: 'http://47.113.231.211:3000/study',
    })
    .then(res => {
        // 接口数据
        console.log(res.data);
        let { data } = res.data
        rightAnswer(data)

        studyRender(data)
        const submit = document.querySelector('.sub_btn')
        console.log(submit)
        submit.addEventListener('click', submit)
            // submit()
        choose()
        const inputV = document.getElementsByName('ex_q1')
        console.log(inputV)

    })
    .catch(error => {
        // 处理错误
        console.error(error);
    });

// 获取选项的正确答案
function rightAnswer(data) {
    let rightArr = []
    for (let i = 0; i < data.length; i++) {
        let rightAnswers = data[i].rightAnswer
        rightArr.push(rightAnswers)
    }
    return rightArr
}

function studyRender(data) {
    const exam_q = document.querySelector('.exam_qa');
    exam_q.innerHTML = ''

    for (let i = 0; i < data.length; i++) {
        let exam_arr = [data[i].rightAnswer, data[i].wrongAnswer1, data[i].wrongAnswer2, data[i].wrongAnswer3]
        ShuffleArray(exam_arr)
        exam_q.innerHTML += `<form class="info${i+1}">
        <div class="exam_q">
    <div class="exam_text">${i+1}.${data[i].questionMsg}</div>
    <label for="ex${i}_1"><span>A</span><input type="radio" id="ex${i}_1" name="ex_q${i}">${exam_arr[0]}</label>
    <label for="ex${i}_2"><span>B</span><input type="radio" id="ex${i}_2" name="ex_q${i}">${exam_arr[1]}</label>
    <label for="ex${i}_3"><span>C</span><input type="radio" id="ex${i}_3" name="ex_q${i}">${exam_arr[2]}</label>
    <label for="ex${i}_4"><span>D</span><input type="radio" id="ex${i}_4" name="ex_q${i}">${exam_arr[3]}</label>
</div> </form>`

    }
    exam_q.innerHTML += ` <button class="sub_btn">
    提交答案
</button>`
}

function choose() {

    const info1 = document.querySelectorAll('.info1 label')
    console.log(info1)
    const info2 = document.querySelectorAll('.info2 label')
    const info3 = document.querySelectorAll('.info3 label')
    const info4 = document.querySelectorAll('.info4 label')
    const info5 = document.querySelectorAll('.info5 label')
    const info6 = document.querySelectorAll('.info6 label')

    const info7 = document.querySelectorAll('.info7 label')
    const info8 = document.querySelectorAll('.info8 label')
    const info9 = document.querySelectorAll('.info9 label')
    const info10 = document.querySelectorAll('.info10 label')
    for (let i = 0; i < info1.length; i++) {
        info1[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info1  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info2.length; i++) {
        info2[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info2  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info3.length; i++) {
        info3[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info3  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info4.length; i++) {
        info4[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info4  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info5.length; i++) {
        info5[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info5  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info6.length; i++) {
        info6[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info6  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info7.length; i++) {
        info7[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info7  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info8.length; i++) {
        info8[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info8  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info9.length; i++) {
        info9[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info9  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    for (let i = 0; i < info10.length; i++) {
        info10[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info10  span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }
    // info(info1)
    // info(info2)
    // info(info3)
    // info(info4)
    // info(info5)
    // info(info6)
    // info(info7)
    // info(info8)
    // info(info9)
    // info(info10)


}
// 点击选择
function info(info1) {
    for (let i = 0; i < info1.length; i++) {
        info1[i].addEventListener('click', function() {
            const action = document.querySelectorAll(`.info${i+1} span`)
            console.log(action)
            for (let j = 0; j < action.length; j++) {
                action[j].style.backgroundColor = 'transparent'
            }
            action[i].style.backgroundColor = '#769bd3'
        })
    }

}


function ShuffleArray(arr) {
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

function submit() {
    const stu_answer = document.querySelector('.stu_answer');
    const inputElements = stu_answer.querySelector('.info');
    const info = document.querySelector('.info')
    const items = document.querySelectorAll('[name]')
    console.log(items)
        // const submit = document.querySelector('.sub_btn')
    let n = 10
    for (let i = 0; i < n; i++) {
        const inputV = document.getElementsByName(`ex_q${i+1}`)
        console.log(inputV)
        for (let i = 0; i < q1.length; i++) {
            if (inputV[i].checked) {
                an1 = inputV[i].value;
                break;
            }
        }
    }
}
//     submit.addEventListener('submit', function() {
//         // 阻止默认行为不跳转
//         // console.log(111);
//         // e.preventDefault();
//         // 在这里进行表单验证如果不通过直接中断
//         // 获取所有带有name属性的按钮
//         let n = 10
//         for (let i = 0; i < n; i++) {
//             const inputV = document.getElementsByName(`ex_q${i+1} `)
//             console.log(inputV)
//             const inValue = inputV.value
//             console.log(inValue)
//         }
//         // for (let i = 0; i < items.length; i++) {
//         //     if (items[i].value === '') {
//         //         return alert('输入内容不能为空')
//         //     }
//         // }
//     })
// }
// let arr = [1, 2, 3, 4]
// ShuffleArray(arr)
// console.log(arr)