<template>
  <Lizhi></Lizhi>
  <div id="wrapperb">
    <div class="container1">
      <div class="btn"><a @click="gogreen">松霜绿</a></div>
      <div class="btn"><a @click="gopink">春梅红</a></div>
      <div class="btn"><a @click="goblue">鲸鱼灰</a></div>
    </div>
    <div class="firstcontrolsblue">
      <div class="controlsblue">
        <audio :src="totalsing[this.singnum]" ref="Ref_audio" @loadeddata="loadeddata()" @timeupdate="timeChange()"
          id="audios1"></audio>
        <div class="slider_c">
          <div class="slider_c1">{{ timebegin }} </div>
          <el-slider v-model="value3" :show-tooltip="false" @input="change()" class="slider_c2" />
          <div class="slider_c3">{{ timeover }} </div>
        </div>
        <div class="control_s">
          <el-icon @click="load()" class="button_load">
            <Refresh />
          </el-icon>
          <el-icon @click="changesing(-1)" class="move_back">
            <CaretLeft />
          </el-icon>
          <el-icon v-show="show" class="button_sc" @click="pause()">
            <VideoPause />
          </el-icon>
          <el-icon v-show="!show" class="button_sc" @click="play()">
            <VideoPlay />
          </el-icon>
          <el-icon @click="changesing(1)" class="move_next">
            <CaretRight />
          </el-icon>
          <div class="button_Sound" @mouseenter="show_Sound1()" @mouseleave="show_Sound2()">
            <el-icon v-show="shows" class="button_Sound1">
              <Microphone />
            </el-icon>
            <el-icon v-show="!shows" class="button_Sound1">
              <Mute />
            </el-icon>
            <el-slider class="button_Sound2" v-if="showSound" v-model="value4" :show-tooltip="false" height="70px"
              @input="sound()" size="small" />
          </div>
        </div>
      </div>
    </div>
    <div class="containerblue" id="con">
      <ul class="lrc-list" id="jk"></ul>
    </div>
    <canvas id="canvas" width="700" height="700"></canvas>
  </div>
  <img src="../img/switchb.png" class="opengame" @click="opengame()" alt="" style="z-index:5">
  <fCard @showChange="showpchanges()" v-if="showp" style="z-index:5" />
</template>
  
<script>
import Lizhi from '../components/lizhi.vue'
import fCard from '../components/flip_card.vue'
export default {
  components: {
    Lizhi: Lizhi,
    fCard: fCard
  },
  mounted() {
    this.initdraw()
    this.getData()
    this.addsong()
    this.shangDing()
    this.shangDing()
    this.stime = document.getElementById('audios1').currentTime
  },
 
  data() {
    return {
      flagb:0,
      showps: true,
      showp: false,
      i: 0,
      singnum: 0,
      totalsing: ["./src/viods/Troye Sivan - YOUTH.mp3", "./src/viods/白鲨JAWS - Dive Back In Time.mp3", "./src/viods/告五人 - 带我去找夜生活.mp3"],
      show: false,
      shows: true,
      onPause: true,
      mark: 0,
      audioElement: new Audio(),
      timeover: "00:00",
      timebegin: "00:00",
      value3: 0,
      value4: 30,
      showSound: false,
      stime: null,

      lrc: [` [00:00.00]What if, what if we run away?
 [00:02.93]What if, what if we left today?
 [00:05.19]What if we said goodbye to safe and sound?
 [00:10.62]what if, what if we're hard to find?
 [00:13.15]What if, what if we lost our minds?
 [00:16.00]What if we let them fall behind and they're never found?
 [00:20.97]And when the lights start flashing like a photobooth
 [00:26.37]And the stars exploding, we’ll be fireproof
 [00:32.05]My youth, my youth is yours
 [00:34.82]Trippin' on skies, sippin' waterfalls
 [00:37.36]My youth, my youth is yours
 [00:39.92]Run away now and forevermore
 [00:42.48]My youth, my youth is yours
 [00:45.06]A truth so loud you can't ignore
 [00:47.59]My youth, my youth, my youth
 [00:51.62]My youth is yours
 [01:03.32]What if, what if we start to drive?\n[01:05.59]What if, what if we close our eyes?
 [01:08.18]What if we're speeding through red lights into paradise?
 [01:13.46]Cause we've no time for getting old
 [01:16.14]Mortal body; timeless souls
 [01:18.75]Cross your fingers, here we go
 [01:23.89]And when the lights start flashing like a photobooth
 [01:29.18]And the stars exploding, we’ll be fireproof
 [01:34.91]My youth, my youth is yours
 [01:37.65]Trippin' on skies, sippin' waterfalls
 [01:40.36]My youth, my youth is yours
 [01:42.91]Run away now and forevermore
 [01:45.24]My youth, my youth is yours
 [01:47.80]A truth so loud you can't ignore
 [01:50.41]My youth, my youth, my youth
 [01:54.78]My youth is yours
 [02:05.13]My youth is yours
 [02:17.10]My youth, my youth is yours
 [02:19.56]Trippin' on skies, sippin' waterfalls
 [02:21.87]My youth, my youth is yours
 [02:24.86]Run away now and forevermore
 [02:27.26]My youth, my youth is yours
 [02:29.81]A truth so loud you can’t ignore
 [02:32.45]My youth, my youth, my youth
 [02:36.36]My youth is yours\n[02:46.99]My youth is yours\n[02:57.71]My youth is yours`

        ,

  `[00:00.735]It didn’t take too long to realize
  [00:03.279]Something has changed in the back of my mind
  [00:05.988]Your eyes\n[00:07.384]There ain’t nowhere left to hide behind
  [00:09.744]Time no longer flew like it was
  [00:11.836]When the flash froze everything before
  [00:14.927]Without you
  [00:16.174]I don’t know if I could take this road
  [00:19.497]Chase you to the end of the world
  [00:21.724]Just to say your name once more
  [00:24.001]If I had only got it right before
  [00:32.080]Every minute that I dialed back in time
  [00:34.525]Every single existence rewinds
  [00:36.601]Something secretive hidden inside
  [00:38.812]Your mind
  [00:41.073]All the heartaches and the smiles never faded
  [00:43.467]I know you’ll be by my side when we make it
  [00:46.542]Come back from the dive back in time
  [00:49.803]Dive dive...
  [00:52.939]Dive back in time
  [00:54.668]Dive dive...
  [00:57.377]Dive back in time dive back in time
  [01:07.066]Here’s to all the mistakes I never made
  [01:09.876]All the twists and turns I’m always late (to)
  [01:12.6]My fate
  [01:14.045]If it ain’t for your misguided taste
  [01:16.438]I’d turn out so ordinary
  [01:18.665]Fabulously un-addictively bore out my own brain
  [01:23.120]Hey, out out of my way
  [01:25.438]Every minute that I dialed back in time
  [01:27.792]Every single existence rewinds
  [01:29.870]Something secretive hidden inside
  [01:31.980]Your mind
  [01:34.358]All the heartaches and the smiles never faded
  [01:36.735]I know you’ll be by my side when we make it
  [01:39.494]Come back from the dive back in time
  [01:43.756]Dive dive...
  [01:46.232]Dive back in time
  [01:48.343]Dive dive...
  [01:50.721]Dive back in time
  [02:00.826]Well don’t you feel sorry
  [02:02.837]I’ll love where I’m going now
  [02:05.581]Cause I’m about to lose my\n[02:07.626]Cause I’m about to lose my
  [02:09.985]Cause I’m about to lose my mind
  [02:12.429]Every minute that I dialed back in time
  [02:14.424]Every single existence rewinds
  [02:16.454]Something secretive hidden inside
  [02:18.562]Your mind
  [02:21.039]All the heartaches and the smiles never faded
  [02:23.334]I know you’ll be by my side when we make it
  [02:26.310]Come back from the dive back in time
  [02:30.256]Dive dive...
  [02:32.967]Dive back in time
  [02:35.092]Dive dive...
  [02:37.403]Dive back in time\n

  `,
  
  `[00:18.23]
  [00:46.82]形同虚设的时间
  [00:50.32]在你眼里成为了无限
  [00:54.19]青春充满了不眠
  [00:57.71]是为了追寻更多的明天
  [01:13.32]
  [01:16.91]好似无尽的灯街
  [01:20.29]从不分你我照亮在心间
  [01:24.03]夜已承载心无眠
  [01:27.79]再巨大的伤悲皆已成灰
  [01:35.52]
  [01:45.98]如果你还没有睡
  [01:49.44]如果我还不停追
  [01:53.15]如果清醒是种罪
  [01:56.93]就把誓言带走 换承诺不回
  [02:01.31]如果你就是一切
  [02:04.35]如果我就是绝对
  [02:08.12]如果清醒是种罪
  [02:12.12]就让爱去蔓延 成全每个夜
  [02:18.38]
  [02:46.25]时过境迁的伤悲
  [02:49.46]搭配快乐的宣泄
  [02:53.19]如果清醒是种罪
  [02:56.83]你会不会怨怼 将就的明天
  [03:01.40]如果你就是一切
  [03:04.52]如果我就是绝对
  [03:08.29]如果清醒是种罪
  [03:11.97]就让爱去蔓延 成全每个夜
  [03:18.28]
  [03:31.45]记住激情的滋味
  [03:34.49]记住流泪的画面
  [03:38.23]如果清醒是种罪
  [03:41.98]就拿偏执的一切
  [03:44.50]放弃无聊的称谓
  [03:46.55]如果你真是一切
  [03:49.43]如同我真是绝对
  [03:53.09]如果夜留下暧昧
  [03:57.46]让你我不再挂念
  [03:59.42]最后成全每个谁
  [04:14.24]
`],
      lrcData: [{}],
      gg: null,
      it: document.getElementById("ll"),

      audio: document.querySelector('audio'),
      ul: document.getElementById('jk'),
      container: document.querySelector('.container'),

      audio_Url: null,
    }
  },
  watch: {
    stime: function () {
      //console.log(document.getElementById('audios1').currentTime)

    },
    singnum() {

      this.play()
    },
    value4() {
      //console.log(this.value4)
      if (this.value4 == 0) {
        this.shows = false
      } else {
        this.shows = true
      }
    },
    value3() {
      //console.log(this.value3)
    }
  },
  methods: {
    gogreen() {
      this.$router.push("/green");
    },
    gopink() {
      this.$router.push("/pink");
    },
    goblue() {
      this.$router.push("/blue");
    },
    
    shangDing() {
      var time;
      let num = document.addEventListener("mousedown", function (e) {
        let body1 = document.getElementById("wrapperb")
        let heart = document.createElement("span")
        heart.classList.add('span2')

        let x = e.screenX;
        let y = e.screenY;

        heart.style.left = (x) + 'px'
        heart.style.top = (y - 100) + 'px'

        // //console.log(x + " " + y + " " + heart.style.left)
        body1.appendChild(heart)

        setTimeout(() => {

          body1.removeChild(heart);
        }, 1000)

        heart.style.transform =
          `rotate(${Math.random() * 360}deg)`
      }
      )
    },
    opengame() {
      this.showp = true;
    },
    showpchanges(val) {
      this.showp = val

    },
    initdraw() {
      const canvas = document.getElementById('canvas');
      const canvasCtx = canvas.getContext('2d');

      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = canvas.height / 8;
      var sliceAngle = (Math.PI / 2) / 512;//一个bufferlength周期是90°

      var x_position, y_position;

      canvasCtx.shadowColor = 'rgba(70,180,255,1)';
      canvasCtx.shadowBlur = 30;

      var j = 32;

      for (var i = 0; i < 512; i++) {
        if (j == 32 || i == 512 - 1 && i != 0) {
          var angle = 2 * Math.PI - sliceAngle * i;
          var x = centerX + radius * Math.cos(angle);
          var y = centerY + radius * Math.sin(angle);

          //外圆
          canvasCtx.beginPath();
          var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
          var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
          canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'rgb(241,240,237)';
          canvasCtx.fill();
          canvasCtx.closePath();

          //内圆
          canvasCtx.beginPath();
          canvasCtx.moveTo(x, y);
          canvasCtx.arc(x, y, 3, 0, 2 * Math.PI);

          canvasCtx.fill();
          canvasCtx.closePath();
          j--;
        }
        else if (j == 1) {
          j = 32;
        }
        else {
          j--;
        }
      }

      var j = 32;

      for (var i = 0; i < 512; i++) {
        if (j == 32 || i == 512 - 1 && i != 0) {
          var angle = Math.PI + sliceAngle * i;
          var x = centerX + radius * Math.cos(angle);
          var y = centerY + radius * Math.sin(angle);

          canvasCtx.beginPath();
          var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
          var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
          canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'rgb(241,240,237)';
          canvasCtx.fill();
          canvasCtx.closePath();

          canvasCtx.beginPath();
          canvasCtx.moveTo(x, y);
          canvasCtx.arc(x, y, 3, 0, 2 * Math.PI);

          canvasCtx.fill();
          canvasCtx.closePath();
          j--;
        }
        else if (j == 1) {
          j = 32;
        }
        else {
          j--;
        }
      }

      var j = 32;

      for (var i = 0; i < 512; i++) {
        if (j == 32 || i == 512 - 1 && i != 0) {
          var angle = sliceAngle * i;
          var x = centerX + radius * Math.cos(angle);
          var y = centerY + radius * Math.sin(angle);

          canvasCtx.beginPath();
          var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
          var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
          canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'rgb(241,240,237)';
          canvasCtx.fill();
          canvasCtx.closePath();

          canvasCtx.beginPath();
          canvasCtx.moveTo(x, y);
          canvasCtx.arc(x, y, 3, 0, 2 * Math.PI);

          canvasCtx.fill();
          canvasCtx.closePath();
          j--;
        }
        else if (j == 1) {
          j = 32;
        }
        else {
          j--;
        }
      }

      var j = 32;

      for (var i = 0; i < 512; i++) {
        if (j == 32 || i == 512 - 1 && i != 0) {
          var angle = Math.PI - sliceAngle * i;
          var x = centerX + radius * Math.cos(angle);
          var y = centerY + radius * Math.sin(angle);

          canvasCtx.beginPath();
          var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
          var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
          canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
          canvasCtx.fillStyle = 'rgb(241,240,237)';
          canvasCtx.fill();
          canvasCtx.closePath();

          canvasCtx.beginPath();
          canvasCtx.moveTo(x, y);
          canvasCtx.arc(x, y, 3, 0, 2 * Math.PI);

          canvasCtx.fill();
          canvasCtx.closePath();
          j--;
        }
        else if (j == 1) {
          j = 32;
        }
        else {
          j--;
        }
      }


    },

    initAudio() {

      const audioElement = document.getElementById('audios1')

      //console.log(audioElement)

      const audioContext = new window.AudioContext();

      const analyserNode = audioContext.createAnalyser();

      const sourceNode = audioContext.createMediaElementSource(audioElement);
      sourceNode.connect(analyserNode);
      analyserNode.connect(audioContext.destination);

      analyserNode.smoothingTimeConstant = 0.5;
      analyserNode.fftSize = 1024;
      const bufferLength = analyserNode.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);

      analyserNode.getByteTimeDomainData(dataArray);

      const canvas = document.getElementById('canvas');
      const canvasCtx = canvas.getContext('2d');


      let counter = 0;
      function draw() {
        if (counter % 2 === 0) {
          analyserNode.getByteTimeDomainData(dataArray);
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

          var centerX = canvas.width / 2;
          var centerY = canvas.height / 2;
          var radius = canvas.height / 8;
          var sliceAngle = (Math.PI / 2) / bufferLength;//一个bufferlength周期是90°

          canvasCtx.beginPath();
          //360°--270°
          canvasCtx.beginPath();
          var j = 48;
          for (var i = 0; i < bufferLength; i++) {
            if (j == 48 || i == bufferLength - 1 && i != 0) {
              //处理音频数据并且计算局部坐标与角度
              var v = dataArray[i] / 96.0;
              var angle = 2 * Math.PI - sliceAngle * i;
              var x = centerX + radius * Math.cos(angle);
              var y = centerY + radius * Math.sin(angle);

              //外圆
              canvasCtx.beginPath();
              var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
              var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
              canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
              canvasCtx.fillStyle = 'rgb(241,240,237)';
              canvasCtx.fill();
              canvasCtx.closePath();

              //内圆
              canvasCtx.beginPath();
              var x_move = centerX + (radius + v * radius) * Math.cos(angle);
              var y_move = centerY + (radius + v * radius) * Math.sin(angle);
              canvasCtx.moveTo(x, y);
              canvasCtx.lineTo(x_move, y_move);

              //设置样式
              canvasCtx.lineWidth = 5;
              canvasCtx.lineJoin = 'round';
              canvasCtx.shadowColor = 'rgba(70,180,255,1)';
              canvasCtx.shadowBlur = 30;
              var grd = canvasCtx.createLinearGradient(x, y, x_move, y_move);
              grd.addColorStop(0, 'rgb(255,255,255)');
              grd.addColorStop(0.45, 'rgb(255,255,255)');
              grd.addColorStop(1, 'rgba(103,235,253,0.8)');
              canvasCtx.strokeStyle = grd;

              //进行画
              canvasCtx.stroke();
              canvasCtx.closePath();
              j--;
            }
            else if (j == 1) {
              j = 48;
            }
            else {
              j--;
            }
          }
          // canvasCtx.stroke();
          canvasCtx.strokeStyle = 'rgb(241,240,237)';
          canvasCtx.closePath();

          //180°--270°
          canvasCtx.beginPath();
          var j = 48;
          for (var i = 0; i < bufferLength; i++) {
            if (j == 48) {
              //处理音频数据并且计算局部坐标与角度
              var v = dataArray[i] / 96.0 * 0.618;
              var angle = Math.PI + sliceAngle * i;
              var x = centerX + radius * Math.cos(angle);
              var y = centerY + radius * Math.sin(angle);

              //外圆
              canvasCtx.beginPath();
              var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
              var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
              canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
              canvasCtx.fillStyle = 'rgb(241,240,237)';
              canvasCtx.fill();
              canvasCtx.closePath();

              //内圆
              canvasCtx.beginPath();
              var x_move = centerX + (radius + v * radius) * Math.cos(angle);
              var y_move = centerY + (radius + v * radius) * Math.sin(angle);
              canvasCtx.moveTo(x, y);
              canvasCtx.lineTo(x_move, y_move);

              //设置样式
              canvasCtx.lineWidth = 5;
              canvasCtx.lineJoin = 'round';
              canvasCtx.shadowColor = 'rgba(70,180,255,1)';
              canvasCtx.shadowBlur = 30;
              var grd = canvasCtx.createLinearGradient(x, y, x_move, y_move);
              grd.addColorStop(0, 'rgb(255,255,255)');
              grd.addColorStop(0.45, 'rgb(255,255,255)');
              grd.addColorStop(1, 'rgba(103,235,253,0.8)');
              canvasCtx.strokeStyle = grd;

              //进行画
              canvasCtx.stroke();
              canvasCtx.closePath();
              j--;
            }
            else if (j == 1) {
              j = 48;
            }
            else {
              j--;
            }
          }
          canvasCtx.closePath();

          //0°--90°
          canvasCtx.beginPath();
          var j = 48;
          for (var i = 0; i < bufferLength; i++) {
            if (j == 48 || i == bufferLength - 1) {
              //处理音频数据并且计算局部坐标与角度
              var v = dataArray[i] / 96.0 * 0.618;
              var angle = sliceAngle * i
              var x = centerX + radius * Math.cos(angle);
              var y = centerY + radius * Math.sin(angle);

              //外圆
              canvasCtx.beginPath();
              var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
              var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
              canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
              canvasCtx.fillStyle = 'rgb(241,240,237)';
              canvasCtx.fill();
              canvasCtx.closePath();

              //内圆
              canvasCtx.beginPath();
              var x_move = centerX + (radius + v * radius) * Math.cos(angle);
              var y_move = centerY + (radius + v * radius) * Math.sin(angle);
              canvasCtx.moveTo(x, y);
              canvasCtx.lineTo(x_move, y_move);

              //设置样式
              canvasCtx.lineWidth = 5;
              canvasCtx.lineJoin = 'round';
              canvasCtx.shadowColor = 'rgba(70,180,255,1)';
              canvasCtx.shadowBlur = 30;
              var grd = canvasCtx.createLinearGradient(x, y, x_move, y_move);
              grd.addColorStop(0, 'rgb(255,255,255)');
              grd.addColorStop(0.45, 'rgb(255,255,255)');
              grd.addColorStop(1, 'rgba(103,235,253,0.8)');
              canvasCtx.strokeStyle = grd;

              //进行画
              canvasCtx.stroke();
              canvasCtx.closePath();
              j--;
            }
            else if (j == 1) {
              j = 48;
            }
            else {
              j--;
            }
          }
          canvasCtx.stroke();
          canvasCtx.closePath();

          //180°--90°
          canvasCtx.beginPath();
          var j = 48;
          for (var i = 0; i < bufferLength; i++) {
            if (j == 48 && i != 0) {
              //处理音频数据并且计算局部坐标与角度
              var v = dataArray[i] / 96.0;
              var angle = Math.PI - sliceAngle * i
              var x = centerX + radius * Math.cos(angle);
              var y = centerY + radius * Math.sin(angle);

              //外圆
              canvasCtx.beginPath();
              var x_position = centerX + (radius + 2 * radius) * Math.cos(angle);
              var y_position = centerY + (radius + 2 * radius) * Math.sin(angle);
              canvasCtx.arc(x_position, y_position, 5, 0, 2 * Math.PI);
              canvasCtx.fillStyle = 'rgb(241,240,237)';
              canvasCtx.fill();
              canvasCtx.closePath();

              //内圆
              canvasCtx.beginPath();
              var x_move = centerX + (radius + v * radius) * Math.cos(angle);
              var y_move = centerY + (radius + v * radius) * Math.sin(angle);
              canvasCtx.moveTo(x, y);
              canvasCtx.lineTo(x_move, y_move);

              //设置样式
              canvasCtx.lineWidth = 5;
              canvasCtx.lineJoin = 'round';
              canvasCtx.shadowColor = 'rgba(70,180,255,1)';
              canvasCtx.shadowBlur = 30;
              var grd = canvasCtx.createLinearGradient(x, y, x_move, y_move);
              grd.addColorStop(0, 'rgb(255,255,255)');
              grd.addColorStop(0.45, 'rgb(255,255,255)');
              grd.addColorStop(1, 'rgba(103,235,253,0.8)');
              canvasCtx.strokeStyle = grd;

              //进行画
              canvasCtx.stroke();
              canvasCtx.closePath();
              j--;
            }
            else if (j == 1) {
              j = 48;
            }
            else {
              j--;
            }
          }
          canvasCtx.translate(centerX, centerY);
          canvasCtx.rotate(Math.PI / 720);
          canvasCtx.translate(-centerX, -centerY);
          canvasCtx.stroke();
          canvasCtx.closePath();
        }
        counter++;
        //定义动画
        requestAnimationFrame(draw);

      };

      draw();
    },


    getData() {
      this.lrcData = this.parseLrc()
      this.createLrcElements()
    },

    findIndex() {
      // 播放器当前时间
      var curTime = document.getElementById('audios1').currentTime;
      // //console.log(curTime + "  k ")

      for (var i = 0; i < this.lrcData.length; i++) {
        ////console.log(curTime + "  k " + this.lrcData[i].time + " 1 " + i)
        if (curTime < this.lrcData[i].time) {

          return i - 1;
        }
      }
      // 找遍了都没找到（说明播放到最后一句）
      return this.lrcData.length - 1;
    },
    //歌词切割
    parseLrc() {
      ////console.log("g" + this.lrc + " g")
      if (this.lrc[this.singnum]) {
        var lines = this.lrc[this.singnum].split('\n');
       // //console.log(lines)
      }

      var result = []; // 歌词对象数组
      for (var i = 0; i < lines.length; i++) {
        var str = lines[i];
        var parts = str.split(']');
        var timeStr = parts[0].substring(3);

        ////console.log("g1" + parts + timeStr)
        var obj = {
          time: this.parseTime(timeStr),
          words: parts[1],
        };
        result.push(obj);
      }
      ////console.log("g" + result[1].time)
      return result

    },

    //添加歌词
    createLrcElements() {

      ////console.log(this.lrcData)
      var frag = document.createDocumentFragment(); // 文档片段
      for (var i = 0; i < this.lrcData.length; i++) {

        var li = document.createElement('li');

        li.textContent = this.lrcData[i].words;

        frag.appendChild(li); // 改动了 dom 树
      }
      this.$nextTick(() => {
        // //console.log( this.ul);
        document.getElementById('jk').appendChild(frag);
      });

    },
    parseTime(timeStr) {
      var parts = timeStr.split(':');
      return +parts[0] * 60 + +parts[1];
    },
    moveSong() {
      var containerHeight = document.getElementById('con').clientHeight;
      // 每个 li 的高度
      var liHeight = document.getElementById('jk').children[1].clientHeight;
      // 最大偏移量
      var maxOffset = document.getElementById('jk').clientHeight - containerHeight / 2;

      var index = this.findIndex();

      var offset = liHeight * index-2;
      ////console.log(containerHeight + " " + liHeight + " " + maxOffset + " " + index)
      if (offset < 0) {
        offset = 0;
      }
      if (offset > maxOffset) {
        offset = maxOffset;
      }
      document.getElementById('jk').style.transform = `translateY(-${offset}px)`;
      // 去掉之前的 active 样式
      var li = document.getElementById('jk').querySelector('.active');
      if (li) {
        li.classList.remove('active');
      }

      li = document.getElementById('jk');

      if (li && index >= 0) {

        li.children[index].classList.add('active');
      }
    },

    addsong() {

      this.$nextTick(() => {
        this.doms = document.getElementById('jk');
          ////console.log();
        var childElement = document.createElement('div');

        ////console.log(this.ul)
        document.getElementById('jk').appendChild(childElement);
      });
    },

    timeChange() {
      this.moveSong()
      this.value3 = Math.round(this.$refs.Ref_audio.currentTime / this.$refs.Ref_audio.duration * 100)
      ////console.log(this.value3)
      var s = Math.floor(this.$refs.Ref_audio.currentTime % 60);
      var m = Math.floor(this.$refs.Ref_audio.currentTime / 60);
      if (s < 10) {
        this.timebegin = "0" + m + "" + ":0" + s
      } else {
        this.timebegin = "0" + m + "" + ":" + s
      }
      //  //console.log(this.timebegin)
    },
    changesing(index) {
      for (var i = 0; i <= this.lrcData.length; i++) {
        document.getElementById('jk').removeChild(document.getElementById('jk').firstChild)
      }
      if (this.singnum == 0 && index == -1) {
        this.singnum = this.totalsing.length - 1;
      }
      else if (this.singnum == this.totalsing.length - 1 && index == 1) {
        this.singnum = 0;
      }
      else {
        this.singnum += index;
      }
      this.show = true

      this.getData()
      this.addsong()
      this.value3 = 0
    },

    show_Sound1() {
      this.showSound = true
    },
    show_Sound2() {
      this.showSound = false
    },
    load() {
      this.$refs.Ref_audio.load()
      this.$refs.Ref_audio.play()

    },
    play() {
      if (this.i == 0) {
        this.i++
        this.initAudio()
      }

      this.$refs.Ref_audio.play()
      this.show = !this.show
    },
    pause() {

      this.show = !this.show
      this.$refs.Ref_audio.pause()
    },
    move(val) {
      this.$refs.Ref_audio.currentTime += val;
      this.$refs.Ref_audio.play();
    },
    change() {
      let num = this.value3 / 100
      this.$refs.Ref_audio.currentTime = this.$refs.Ref_audio.duration * num;

      var s = Math.floor(this.mark % 60);
      var m = Math.floor(this.mark / 60);
      if (s < 10) {
        this.timebegin = "0" + m + "" + ":0" + s
      } else {
        this.timebegin = "0" + m + "" + ":" + s
      }
      ////console.log(this.timebegin)
    },
    loadeddata() {
      // 需等音频加载完成，才能获取到音频的时长
      // this.initAudio()
      this.mark = this.$refs.Ref_audio.duration;

      var m = Math.floor(this.mark / 60);
      var s = Math.floor(this.mark % 60);
      if (s < 10) {
        this.timeover = "0" + m + "" + ":0" + s
      } else {
        this.timeover = "0" + m + "" + ":" + s
      }
      ////console.log(this.timeover + " " + this.mark + " " + m + " " + s)

    },

    sound() {
      let num = this.value4 / 100
      this.$refs.Ref_audio.volume = num
      ////console.log(this.$refs.Ref_audio.volume)
    },
  }
}

</script>

<style scoped>
@import url(../assets/contralsblue.css);

canvas {
  width: 700px;
  height: 700px;
  left: 5%;
  top: 7.5%;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
}
</style>