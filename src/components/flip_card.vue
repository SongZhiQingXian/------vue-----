<script>
export default {
  data() {
    return {
      b: "",
      flag: "",
      card: "", //翻开卡片id号
      C_size: 0, //翻开卡片数量
      score: "0", //分数
      fla: null,
  one : '00', // 时
  two : '00', // 分
  three : '00', // 秒
  abc : 0, // 秒的计数
  cde : 0, // 分的计数
  efg : 0, // 时的计数
  flag2:0,
    };
  },
  props: {
    msg: String
  },
  mounted() {
   
  },
  methods: {
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
    cheak() {
      for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 6; j++) {
          if (this.flag[i][j] != 1) {
            return false;
          }
        }
      }
      return true;
    },
    Init_Value() {
      this.b = new Array();
      this.b[1] = new Array();
      this.b[2] = new Array();
      this.b[3] = new Array();
      this.b[4] = new Array();
      this.flag = new Array();
      this.flag[1] = new Array();
      this.flag[2] = new Array();
      this.flag[3] = new Array();
      this.flag[4] = new Array();
      this.card = new Array();
    },
    re() {
      var zhi = new Array(0, 4, 4, 4, 4, 4, 4, 0);
      this.Init_Value();
      for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 6; j++) {
          this.flag[i][j] = 0;
          document.getElementById(i + "" + j).style.backgroundColor = "#142334";
          while (true) {
            var x = this.getRandom(1, 7);
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
    },
    Flip(a) {
      if(this.flag2==0)
      {
        this.startHandler()
        this.flag2++;
      }
     
      let x = Math.floor(a / 10),
        y = a % 10;
       
      if (this.flag[x][y] == 0) {
        this.card[this.C_size] = a;
        this.C_size = this.C_size + 1;
        if (this.C_size == 1) {
          var col = new Array(
            "#ecf0f1",
            "#ecf0f1",
            "#e74c3c",
            "#27ae60",
            "#3498db",
            "#f1c40f",
            "#e67e22",           
          );

          document.getElementById(x + "" + y).style.backgroundColor =
            col[this.b[x][y]];
        } else {
          let x1 = Math.floor(this.card[0] / 10),
            y1 = this.card[0] % 10;
          let x2 = Math.floor(this.card[1] / 10),
            y2 = this.card[1] % 10;
          if (this.card[0] == this.card[1] || this.b[x1][y1] != this.b[x2][y2]) {
           
            document.getElementById(this.card[0]).style.backgroundColor = "#142334"
           
            document.getElementById(this.card[1]).style.backgroundColor = "#142334"
            
          } else {
            document.getElementById(this.card[0]).style.backgroundColor = "rgb(147,213,220)";
            document.getElementById(this.card[1]).style.backgroundColor = "rgb(147,213,220)";
            this.score++;
            this.flag[x1][y1] = 1;
            this.flag[x2][y2] = 1;
            if (this.cheak()) {

              alert("通关  "+"您的用时为:"+this.one+":"+this.two+":"+this.three);
              this.endHandler()
              this.re();
            }
          }
          this.C_size = 0;
        }
      }
    },
    refresh(){
      this.efg=0
      this.cde=0
      this.abc=0
this.re(),
this.flag2=0,
this.endHandler()
this.one ='00', 
  this.two = '00', 
  this.three = '00'

},
closep(){

this.$emit('showChange',this.showps)
},
    closeWindow(){
     if(confirm("是否退出游戏？"+"  当前得分"+this.score+"当前用时"+this.one+":"+this.two+":"+this.three)){
      window.opener=null;
      window.open('','_self');
      window.close();
     }else{}
    }
  },
  mounted() {
    this.re();
  },
};
</script>

<template>
  
  <div class="Game"> 
    <div class="closep" @click="closep()"></div>
    <div class="Gtime">
      <h1 >{{ one }}:{{ two }}:{{ three }}</h1>
    </div>
    <div class="top"><h1>top</h1><h1>00:00:00</h1></div>
    <div class="refresh" @click="refresh()"><el-ico ><Refresh /></el-ico></div>
    <div class="fcGame">
    
    <div class="card" id="11" @click="Flip(11)"></div>
    <div class="card" id="12" @click="Flip(12)"></div>
    <div class="card" id="13" @click="Flip(13)"></div>
    <div class="card" id="14" @click="Flip(14)"></div>
    <div class="card" id="15" @click="Flip(15)"></div>
    <div class="card" id="16" @click="Flip(16)"></div>
  
  
    <div class="card" id="21" @click="Flip(21)"></div>
    <div class="card" id="22" @click="Flip(22)"></div>
    <div class="card" id="23" @click="Flip(23)"></div>
    <div class="card" id="24" @click="Flip(24)"></div>
    <div class="card" id="25" @click="Flip(25)"></div>
    <div class="card" id="26" @click="Flip(26)"></div>

  
    <div class="card" id="31" @click="Flip(31)"></div>
    <div class="card" id="32" @click="Flip(32)"></div>
    <div class="card" id="33" @click="Flip(33)"></div>
    <div class="card" id="34" @click="Flip(34)"></div>
    <div class="card" id="35" @click="Flip(35)"></div>
    <div class="card" id="36" @click="Flip(36)"></div>
 
  
    <div class="card" id="41" @click="Flip(41)"></div>
    <div class="card" id="42" @click="Flip(42)"></div>
    <div class="card" id="43" @click="Flip(43)"></div>
    <div class="card" id="44" @click="Flip(44)"></div>
    <div class="card" id="45" @click="Flip(45)"></div>
    <div class="card" id="46" @click="Flip(46)"></div>

    
</div>

    
      <!-- <el-button type="primary" @click="startHandler">开始&nbsp;</el-button>
  <el-button type="primary" @click="endHandler">&nbsp;暂停</el-button> -->
    
    </div>
 

   





</template>

<style scoped>  
.closep{
  width: 20px;
  height: 20px;
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  background-color: rgb(46,49,124);
  position: absolute;
  right: 5px;
  top: 5px;
  transition: 0.3s;
}
.closep:hover{
  transform: scale(1.3);
}
.top{
  width: 200px;
  height: 130px;
  background-color:rgb(216,227,231);
  position: absolute;
top: 150px;
  right: 25px;
  border-radius: 10px;
}
.top h1{
  font-size: 40px;
  text-align: center;
  line-height:65px;
  color: rgb(46,49,124);
}
.Gtime{
  width: 200px;
  height: 100px;
  background-color:rgb(216,227,231);
  position: absolute;
top: 25px;
  right: 25px;
  border-radius: 10px;
}
.Gtime h1{
  font-size: 40px;
  text-align: center;
  line-height:100px;
  color: rgb(46,49,124);
}
.Game{
 z-index: 10;
  right:3%;
  width: 750px;
  height: 520px;
  border: rgb(178,187,190) solid 5px;
  border-radius: 10px;
  background-color: rgb(116,120,122);
  position: absolute;
  top:23%;

}
.fcGame {
  width: 430px;
  height: 480px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
 position: absolute;
 top: 15px;
 left: 30px;
 border: rgb(178,187,190) solid 5px;
  justify-content: space-around;
  align-items: center;
  align-content: space-around;
  
  
}
.card {
  border-radius: 10px;


  width: 65px;
  height: 100px;

  
}
.time{
  width: 200px;
  height: 200px;
  right: 10px;
  position: absolute;
}
.refresh{
  width: 200px;
  height: 200px;
  background-color:rgb(216,227,231);
  position: absolute;
  bottom: 20px;
  right: 25px;
  border-radius: 10px;
  color: rgb(46,49,124);
}

</style>
