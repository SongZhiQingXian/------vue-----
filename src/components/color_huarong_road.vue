<script>
export default {

data(){
  return{
    showps:false,
    step:0,
    b:'',
    jie:'',
    ans:'',
    fla: null,
  one : '00', // 时
  two : '00', // 分
  three : '00', // 秒
  abc : 0, // 秒的计数
  cde : 0, // 分的计数
  efg : 0, // 时的计数
  
  }
},


  mounted() {
   
  },

methods: {
  closep(){

this.$emit('showChange',this.showps)
},

  startHandler(){
  this.fla = setInterval(()=>{
   if(this.three === 60 || this.three === '60'){
    this.three = '00';
    this.abc = 0;
    if(this.two === 60 || this.two === '60'){
     this.two = '00';
     this.cde = 0;
     if(this.efg+1 <= 9){
      this.efg++;
      this.one = '0' + this.efg;
     }else{
      this.efg++;
      this.one = this.efg;
     }
    }else{
     if(this.cde+1 <= 9){
      this.cde++;
      this.two = '0' + this.cde;
     }else{
      this.cde++;
      this.two = this.cde;
     }
    }
   }else{
    if(this.abc+1 <= 9){
     this.abc++;
     this.three = '0' + this.abc;
    }else{
     this.abc++;
     this.three=this.abc;
    }
   }
   
  },1000)
 },
 // 暂停计时
 endHandler(){
  this.fla = clearInterval(this.fla)
 },




  getRandom(min, max) {
    var num = Math.random();
    num = num * (max - min) + min;
    num = Math.floor(num);
    return num;
  },
  Init_Value() {
    
    this.b = new Array();
    this.b[1] = new Array();
    this.b[2] = new Array();
    this.b[3] = new Array();
    this.b[4] = new Array();
    this.b[5] = new Array();
  },
  re(flag) {
    this.step=0;
    var zhi = new Array(1, 4, 4, 4, 4, 4, 4, 0);
    this.Init_Value();
    for (var i = 1; i <= 5; i++) {
      for (var j = 1; j <= 5; j++) {
        while (true) {
          var x = this.getRandom(0, 7);
          if (zhi[x] > 0) {
            this.b[i][j] = x;
            zhi[x]--;
            break;
          } else {
            continue;
          }
        }
      }
    }
    if (flag == 0) {
      this.jie = new Array();
      this.jie[1] = new Array();
      this.jie[2] = new Array();
      this.jie[3] = new Array();
      this.jie[4] = new Array();
      this.jie[5] = new Array();
      for (var i = 1; i <= 5; i++) {
        for (var j = 1; j <= 5; j++) {
          this.jie[i][j] = this.b[i][j];
        }
      }
      for (var i = 11; i <= 15; i++) {
        for (var j = 1; j <= 5; j++) {
          var col = new Array(
            "#ecf0f1",
            "#e74c3c",
            "#27ae60",
            "#3498db",
            "#f1c40f",
            "#e67e22",
            "#2c3e50"
          );
          document.getElementById(i + "" + j).style.backgroundColor =
            col[this.b[i - 10][j]];
        }
      }
    } else {
      this.ans = new Array();
      this.ans[1] = new Array();
      this.ans[2] = new Array();
      this.ans[3] = new Array();
      this.ans[4] = new Array();
      this.ans[5] = new Array();
      for (var i = 1; i <= 5; i++) {
        for (var j = 1; j <= 5; j++) {
          var col = new Array(
            "#ecf0f1",
            "#e74c3c",
            "#27ae60",
            "#3498db",
            "#f1c40f",
            "#e67e22",
            "#2c3e50"
          );
          document.getElementById(i + "" + j).style.backgroundColor =col[this.b[i][j]];
          this.ans[i][j] = this.b[i][j];
        }
      }
    }
  },
  cheak() {
    for (var i = 1; i <= 5; i++) {
      for (var j = 1; j <= 5; j++) {
        if (this.ans[i][j] != this.jie[i][j]) {
          return false;
        }
      }
    }
    return true;
  },
  Change(a) {
    
    var x = Math.floor(a / 10),
      y = a % 10;
    if (x - 1 > 0 && this.ans[x - 1][y] == 0) {
      this.step++;
      document.getElementById(
        (x - 1) * 10 + (y % 10) + ""
      ).style.backgroundColor = document.getElementById(
        a + ""
      ).style.backgroundColor;
      document.getElementById(a + "").style.backgroundColor = "#ecf0f1";
      var t = this.ans[x][y];
      this.ans[x][y] = this.ans[x - 1][y];
      this.ans[x - 1][y] = t;
    } else if (x + 1 < 6 && this.ans[x + 1][y] == 0) {
      this.step++;
      document.getElementById(
        (x + 1) * 10 + (y % 10) + ""
      ).style.backgroundColor = document.getElementById(
        a + ""
      ).style.backgroundColor;
      document.getElementById(a + "").style.backgroundColor = "#ecf0f1";
      var t = this.ans[x][y];
      this.ans[x][y] = this.ans[x + 1][y];
      this.ans[x + 1][y] = t;
    } else if (y - 1 > 0 && this.ans[x][y - 1] == 0) {
      this.step++;
      document.getElementById(
        x * 10 + ((y - 1) % 10) + ""
      ).style.backgroundColor = document.getElementById(
        a + ""
      ).style.backgroundColor;
      document.getElementById(a + "").style.backgroundColor = "#ecf0f1";
      var t = this.ans[x][y];
      this.ans[x][y] = this.ans[x][y - 1];
      this.ans[x][y - 1] = t;
    } else if (y + 1 < 6 && this.ans[x][y + 1] == 0) {
      this.step++;
      document.getElementById(
        x * 10 + ((y + 1) % 10) + ""
      ).style.backgroundColor = document.getElementById(
        a + ""
      ).style.backgroundColor;
      document.getElementById(a + "").style.backgroundColor = "#ecf0f1";
      var t = this.ans[x][y];
      this.ans[x][y] = this.ans[x][y + 1];
      this.ans[x][y + 1] = t;
    }
    if (this.cheak()) {
     
      alert("通关 "+"您的步数为:"+this.step);
      this.re(0);
    }
  },
   


  closeWindow(){
     if
     (confirm("是否退出游戏？"+"当前用时"+this.one+":"+this.two+":"+this.three)){
     
      window.opener=null;
      window.open('','_self');

      window.close();
     }else{}
    },
    close(){

      this.showi=false;
    }
},
mounted() {
  this.re(0);
  this.re(1);
},
};
</script>
<!-- onload="start()" -->
<template >
  <div   id="box">
    <div class="closep" @click="closep()"></div>
     
    <table class="big">
      <tr>
        <td id="11" @click="Change(11)"></td>
        <td id="12" @click="Change(12)"></td>
        <td id="13" @click="Change(13)"></td>
        <td id="14" @click="Change(14)"></td>
        <td id="15" @click="Change(15)"></td>
      </tr>
      <tr>
        <td id="21" @click="Change(21)"></td>
        <td id="22" @click="Change(22)"></td>
        <td id="23" @click="Change(23)"></td>
        <td id="24" @click="Change(24)"></td>
        <td id="25" @click="Change(25)"></td>
      </tr>
      <tr>
        <td id="31" @click="Change(31)"></td>
        <td id="32" @click="Change(32)"></td>
        <td id="33" @click="Change(33)"></td>
        <td id="34" @click="Change(34)"></td>
        <td id="35" @click="Change(35)"></td>
      </tr>
      <tr>
        <td id="41" @click="Change(41)"></td>
        <td id="42" @click="Change(42)"></td>
        <td id="43" @click="Change(43)"></td>
        <td id="44" @click="Change(44)"></td>
        <td id="45" @click="Change(45)"></td>
      </tr>
      <tr>
        <td id="51" @click="Change(51)"></td>
        <td id="52" @click="Change(52)"></td>
        <td id="53" @click="Change(53)"></td>
        <td id="54" @click="Change(54)"></td>
        <td id="55" @click="Change(55)"></td>
      </tr>
    </table>

    <table class="small">
      <tr>
        <td id="111"></td>
        <td id="112"></td>
        <td id="113"></td>
        <td id="114"></td>
        <td id="115"></td>
      </tr>
      <tr>
        <td id="121"></td>
        <td id="122"></td>
        <td id="123"></td>
        <td id="124"></td>
        <td id="125"></td>
      </tr>
      <tr>
        <td id="131"></td>
        <td id="132"></td>
        <td id="133"></td>
        <td id="134"></td>
        <td id="135"></td>
      </tr>
      <tr>
        <td id="141"></td>
        <td id="142"></td>
        <td id="143"></td>
        <td id="144"></td>
        <td id="145"></td>
      </tr>
      <tr>
        <td id="151"></td>
        <td id="152"></td>
        <td id="153"></td>
        <td id="154"></td>
        <td id="155"></td>
      </tr>
    </table>
    
    <div class="counter"><h1 >步数：{{ this.step }}</h1>  </div>
  </div>
  <!-- <div class="jifen">
    <div class="header">
      <h3 class="fenshu">当前用时:{{ one }}:{{ two }}:{{ three }}</h3>
     
  
    </div>
    <div class="foor">
      <el-button type="primary" @click="startHandler">开始&nbsp;</el-button>
  <el-button type="primary" @click="endHandler">&nbsp;暂停</el-button>
    </div>

    <span class="bgc" @click="closeWindow()"></span>
    
  </div> -->
</template>

<style scoped>
.closep{
  width: 20px;
  height: 20px;
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  background-color: rgb(222, 28, 49);
  position: absolute;
  right: 5px;
  top: 5px;
  transition: 0.3s;
}
.closep:hover{
  transform: scale(1.3);
}
.counter{
  width: 250px;
  height: 200px;
  background-color: rgb(241, 196, 205);
  position: absolute;
bottom: 40px;
  right: 5px;
 
  border-radius: 10px;
}
.counter h1{

  font-size: 50px;
  text-align: center;
  line-height:180px;
  color: rgb(222, 28, 49);
}
#box {
  border: rgb(240,55,82) solid 4px;
  background-color:rgb(238, 166, 183);
   top:23%;
     right:10px;
   border-radius: 10px;
  width: 740px;
  position: absolute;
  height: 516px;
  right: 3%;
}
.big {
  position: absolute;
  left: 0;
top: 0;
 width: 481px;
 height: 481px;
  border:  rgb(240,55,82) solid 0 0px 0 0;
 border-radius: 10px;
}
table{
  margin: 0;
}

.big td{
  border-radius: 10px;
  width: 100px;
  height: 100px;
  background-color: #fff;
}

.small {
  border: rgb(240,55,82) solid 4px;
  position: absolute;
  right: 40px;
  top: -4px;
  height: 180px;
  width: 180px;
  border-radius: 10px;

}

.small td{
  
  border-radius: 5px;
  background-color: #fff;
  width: 36px;
  height: 36px;
}

button {
  display: inline-block;
  width: 100px;
  height: 30px;
  cursor: pointer;
}

.kong {
  height: 14px;
  background: #ffffff;
}

.btn {
  text-align: center;

  height: 50px;
  background: #ffffff;
}
.jifen{
  width: 200px;
  height: 300px;
  border: 3px solid skyblue;
  border-radius: 25px;
  /* background-color: green; */
  position: relative;
  top: 200px;
  left: 200px;
  overflow: hidden;
}
.jifen::after{
  position: absolute;
  content: '\2716';
  right: .7rem;
  top: .7rem;
  font-size: 1.2rem;
  line-height: 1;
  pointer-events: none;
}


.bgc{
  position: absolute;
  width: 6rem;
  height: 6rem;
  background: #ddd;
  border-radius: 50% ;
  right: -3rem;
  top: -3rem;
  cursor: pointer;
  transition: .2s;
}
.bgc:hover{
  right: -2.8rem;
  top: -2.8rem;

}
.header{
  position: relative;
  width: 200px;
  height: 50px;
  background-color:  grey;
  top: 50px;
}
.fenshu{
  position: relative;
  top: 10px;
  color: #ccc;
}
.foor{
  position: relative;
  width: 200px;
  height: 50px;
  background-color:  grey;
  top: 100px;
}

</style>
