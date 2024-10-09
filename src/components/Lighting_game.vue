<script>
export default {
  data() {
    return {
      top:0,
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

    };
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
    getRandom(min,max){
    var num=Math.random();
    num=num*(max-min)+min;
    num=Math.floor(num);
    return num;
},
re(){
    this.ans=new Array();
    this.ans[1]=new Array();
    this.ans[2]=new Array();
    this.ans[3]=new Array();
    this.ans[4]=new Array();
    this.ans[5]=new Array();
    for(var i=1;i<=5;i++){
        for(var j=1;j<=5;j++){ 
            document.getElementById(i+""+j).style.backgroundColor="#1a3b32";
            this.ans[i][j]=0;
        }
    }
},
closep(){

this.$emit('showChange',this.showps)
},
refresh(){
this.re()
this.step=0;
},
cheak(){
    for(var i=1;i<=5;i++){
        for(var j=1;j<=5;j++){
            if(this.ans[i][j]!=1){
                return false;
            }
        }
    }
    return true;
},
Change(a){
    var col=new Array("#1a3b32","#869d9d");
    var x=Math.floor(a/10),y=a%10;
    this.ans[x][y]++;
    this.ans[x][y]%=2;
    this.step++;
    document.getElementById(x+""+y).style.backgroundColor=col[this.ans[x][y]];
    if(x-1>0){
        this.ans[x-1][y]++;
        this.ans[x-1][y]%=2;
        document.getElementById((x-1)*10+(y)%10+"").style.backgroundColor=col[this.ans[x-1][y]];
    }
    if(x+1<6){
        this.ans[x+1][y]++;
        this.ans[x+1][y]%=2;
        document.getElementById((x+1)*10+(y)%10+"").style.backgroundColor=col[this.ans[x+1][y]];
    }
    if(y-1>0){
        this.ans[x][y-1]++;
        this.ans[x][y-1]%=2;
        document.getElementById((x)*10+(y-1)%10+"").style.backgroundColor=col[this.ans[x][y-1]];
    }
    if(y+1<6){
        this.ans[x][y+1]++;
        this.ans[x][y+1]%=2;
        document.getElementById((x)*10+(y+1)%10+"").style.backgroundColor=col[this.ans[x][y+1]];
    }
    if(this.cheak()){
      if(this.top>this.step||this.top==0)
      {this.top=this.step;//6.25

      }
        alert("恭喜通关："+"您的一共用了"+this.step+"步");
        alert("您的最短步数用了"+this.top+"步");
        this.step=0;
        this.re();
    }
},
closeWindow(){
     if
     (confirm("是否退出游戏？"+"当前用时"+this.one+":"+this.two+":"+this.three)){
     
      window.opener=null;
      window.open('','_self');

      window.close();
     }else{}
    }
  },

  mounted() {
    this.re();
  }
};
</script>

<template>
    <div id="boxLight">
      <div class="closep" @click="closep()"></div>
      <div class="top"><h1 >top：{{ this.top }}</h1></div>
      <div class="counter"><h1 >步数：{{ this.step }}</h1>  </div>
      <div class="refresh" @click="refresh()"><el-ico ><Refresh /></el-ico></div>
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
.closep:hover{
  transform: scale(1.3);
}
.closep{
  width: 20px;
  height: 20px;
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  background-color: #010101;
  position: absolute;
  right: 5px;
  top: 5px;
  transition: 0.3s;
}
.top{
  width: 250px;
  height: 100px;
  background-color:rgb(198, 223, 200);
  position: absolute;
top: 180px;
  right: 25px;
  border-radius: 10px;
}
.top h1{
  font-size: 50px;
  text-align: center;
  line-height:100px;
}
.refresh{
  width: 250px;
  height: 250px;
  background-color:rgb(198, 223, 200);;
  position: absolute;
  bottom: 40px;
  right: 25px;
  border-radius: 10px;
  color: rgb(32, 127, 76);
}
.counter{
  width: 250px;
  height: 100px;
  background-color:rgb(198, 223, 200);;
  position: absolute;
top: 35px;
  right: 25px;
  border-radius: 10px;
}
.counter h1{
  font-size: 50px;
  text-align: center;
  line-height:100px;
  color: rgb(32, 127, 76);
}
#boxLight {
 
  position: absolute;
  top: 25%;
  left: 25%;
  
   
  width: 800px;
  height: 489px;
   border-radius: 10px;
  background: rgb(49, 74, 67);
  
border: rgb(37, 61, 36) solid 5px;
  
}

.big {
  border: rgb(37, 61, 36) solid 5px;
  position:absolute;
  left: 30px;
  top: 35px;
  border-radius: 20px;
  background-color: rgb(198, 223, 200);
width: 412px;
height: 425px;
   display: flex;
  flex-wrap: wrap;

 
}

.big tr{
  height: 80px;
padding: 0px;
}
.big td {

  border-radius: 50%;
  width: 80px;
  height: 80px;
}

</style>