const box = document.querySelector('.box');
const box1 = document.querySelector('.box1');

let loadRegister = document.querySelector('.box .txt1>button');
let loginRegister = document.querySelector('.box1 .txt1>button');

let go = document.querySelector('.box .txt.t1');
let send1 = document.querySelector('.box .txt.t2');
let come = document.querySelector('.box1 .txt');

let Back = document.querySelector('.Back');
// 标记点
let m = 0;

const un = document.querySelector('.box .logup_name')
const pw = document.querySelector('.box .login_box.p1>.logup_pw')
const pw1 = document.querySelector('.box .login_box.p2>.logup_pw')
const pw2 = document.querySelector('.box .login_box.p3>.logup_pw')

const unn = document.querySelector('.box1 .logup_name')
const pww = document.querySelector('.box1 .logup_pw')

let emptyAa = document.querySelector('.emptyA.a');
let Xa = document.querySelector('.emptyA.a>div');

let emptyAc = document.querySelector('.emptyA.c');
let Xc = document.querySelector('.emptyA.c>div');

let emptyAm = document.querySelector('.emptyA.m');
let Xm = document.querySelector('.emptyA.m>div');

let emptyAz = document.querySelector('.emptyA.z');
let Xz = document.querySelector('.emptyA.z>div');

let emptyAy = document.querySelector('.emptyA.y');
let Xy = document.querySelector('.emptyA.y>div');

let emptyAs = document.querySelector('.emptyA.s');
let Xs = document.querySelector('.emptyA.s>div');


let temp1 = null;
let isclick =1;
//发送验证码
send1.addEventListener('click', function () {
  const mailbox = pw1.value;
  if(mailbox == '') {
    emptyAy.style.display = 'block';
    // alert('邮箱不能为空');
  }else{
    function isEmail(inputStr) {
      const pattern = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(inputStr);
    }
    if (!isEmail(mailbox)) {
      alert('请输入正确的邮箱格式');
    }else{
      if(isclick==1){
        axios({
          method: 'POST',
          url: 'http://47.113.231.211:3000/users/sendMsg',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            "email": mailbox,
            "usage": "register"
          }
        })
          .then(res => {
            // 接口数据
            console.log("传过来的对象为：", res.data);
            console.log("验证码为：", res.data.data);
            temp1 = res.data.data;
            isclick=0;
            send1.innerHTML='5min后重新获取';
            send1.style.cursor='default';
            setTimeout(function () {
              isclick=1;
              send1.style.cursor='pointer';
              temp1 = null;
              send1.innerHTML='发送验证码';
            }, 300000);
          })
          .catch(error => {
            // 处理错误
            console.error(error);
          });
      }else{
        alert('请过5分钟后再发送');
      }
    } 
  } 
})

// 注册功能
loadRegister.addEventListener("click", function () {
  const username = un.value;
  const password = pw.value;
  const mailbox = pw1.value;
  const code1 = pw2.value;
  if (username == '') {
    emptyAc.style.display = 'block';
    // alert('姓名不能为空');
  } else if (password == '') {
    emptyAa.style.display = 'block';
    // 密码不能为空
  } else if (mailbox == '') {
    emptyAy.style.display = 'block';
    // alert('邮箱不能为空');
  } else {
    function isEmail(inputStr) {
      const pattern = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
      return pattern.test(inputStr);
    }
    if (!isEmail(mailbox)) {
      alert('请输入正确的邮箱格式');
    } else {
      if (parseInt(code1) == parseInt(temp1)) {
        let data = {
          username: username,
          password: password
        }
        console.log(data);
        axios({
          method: "POST",
          url: 'http://47.113.231.211:3000/users/register',
          data: {
            username: username,
            password: password,
            email: mailbox
          }
        })
          .then(res => {
            console.log("注册：", res.data);
            let {
              code
            } = res.data;
            if (code == 202) {
              console.log("这个是", password);
              alert('用户名重复,请重新填写')
            } else if (code == 201 || code == 200) {
              emptyAz.style.display = 'block';
              Xz.addEventListener('click', function () {
                emptyAz.style.display = 'none';
                console.log("这个是", password);
                box.style.display = 'none';
                box1.style.display = 'block';
                m = m + 90;
                Back.style.transform = `rotate(${m}deg)`;
                unn.value = un.value;
                pww.value = pw.value;
              })
            }
          }
          ).catch(error => {
            console.log(error)
          })
      } else {
        emptyAs.style.display='block';
        // alert('验证码错误');
      }
    }
  }
})

// 登录功能
loginRegister.addEventListener("click", function () {
  const username = unn.value;
  const password = pww.value;
  console.log(username)
  console.log(password)

  axios({
    method: "POST",
    url: 'http://47.113.231.211:3000/users/login',
    data: {
      username: username,
      password: password
    }
  })
    .then(res => {
      console.log("登录：", res.data);
      let {
        code, data
      } = res.data
      // console.log(data);
      if (username == '') {
        // alert('姓名不能为空');
        emptyAc.style.display = 'block';
      } else if (password == '') {
        // alert('密码不能为空');
        emptyAa.style.display = 'block';
      } else {
        if (code == 201) {
          alert('用户名或密码错误')
        } else if (code == 200) {
          // 在第一个页面存储变量
          sessionStorage.setItem("userid", username);
          // sessionStorage.setItem("sign", `${value}`);
          // sessionStorage.setItem("sign",'该用户比较懒，并没有留下什么....')
          // console.log("这个值为：");
          sessionStorage.setItem("sign1", `${data}`);
          emptyAm.style.display = 'block';
          Xm.addEventListener('click', function () {
            window.location.href = "index.html" + '?username=' + username;
          })
        }
      }
    })
  // .catch(error => {
  //   console.log(error)
  // })
})

go.addEventListener('click', function () {
  box.style.display = 'none';
  box1.style.display = 'block';
  m = m + 90;
  Back.style.transform = `rotate(${m}deg)`;
});

come.addEventListener('click', function () {
  box1.style.display = 'none';
  box.style.display = 'block';
  m = m + 90;
  Back.style.transform = `rotate(${m}deg)`;
});


Xa.addEventListener('click', function () {
  emptyAa.style.display = 'none';
})

Xc.addEventListener('click', function () {
  emptyAc.style.display = 'none';
})

Xy.addEventListener('click', function () {
  emptyAy.style.display = 'none';
})

Xs.addEventListener('click',function(){
  emptyAs.style.display='none';
})
