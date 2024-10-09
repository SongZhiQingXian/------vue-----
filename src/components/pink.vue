<template>
  <div id="wrapperp">
    <Flower></Flower>
    <div class="container1">
      <div class="btn"><a href="#" @click="gogreen">松霜绿</a></div>
      <div class="btn"><a href="#" @click="gopink">春梅红</a></div>
      <div class="btn"><a href="#" @click="goblue">鲸鱼灰</a></div>
    </div>
    <div class="secondcontrols">
      <div class="controlspink">
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

          <div class="button_Sound" @mouseenter=" show_Sound1()" @mouseleave=" show_Sound2()">
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
    <canvas id="canvas" width="1200" height="700"></canvas>
  </div>
  <huaRongdao @showChange="showpchanges()" v-if="showp" style="z-index: 2;" />
  <img src="../img/flower.png" class="opengame" @click="opengame" alt="">
</template>
<script >
import Rain from '../components/Rain.vue'
import huaRongdao from './color_huarong_road.vue'
import Flower from '../components/gbflower.vue'
export default {
  components: {
    Rain: Rain,
    huaRongdao: huaRongdao,
    Flower: Flower
  },
  mounted() {
    this.heart()
    this.heart()
    this.heart()
    this.initdraw()
    this.getData()
    this.addsong()
    this.stime = document.getElementById('audios1').currentTime
  },
  data() {
    return {
      showps: false,
      showp: false,
      i: 0,
      singnum: 0,
      totalsing: ["./src/viods/昼夜 - いつも何度でも (与你同在)(钢琴版).mp3", "./src/viods/泠鸢yousa - 勾指起誓.mp3", "./src/viods/DJ OKAWARI - Flower Dance.mp3"],
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

      lrc: [`[00:01.06]《千与千寻》
[00:03.95]纯音乐
[00:6.96]敬请欣赏
`,

  `[00:21.651]你是信的开头诗的内容
  [00:25.151]童话的结尾
  [00:27.151]你是理所当然的奇迹
  [00:30.652]你是月色真美
  [00:32.902]你是圣诞老人送给我
  [00:36.401]好孩子的礼物
  [00:38.400]你是三千美丽世界里
  [00:42.150]我的一瓢水
  [00:44.150]所以让我再靠近一点点
  [00:47.401]因为你太温暖
  [00:49.901]我会再变得坚强一点点
  [00:53.430]因为你太柔软
  [00:55.430]交换无名指金色的契约
  [00:58.930]给彼此岁月
  [01:01.180]说好从今以后都牵着手
  [01:04.681]因为要走很远
  [01:29.178]你是我万水千山的冒险
  [01:32.928]要找的标记点
  [01:35.076]你是我分割人生的线
  [01:38.326]又将它们相连
  [01:40.326]你是前世千次的回眸
  [01:44.325]虔诚牵的手
  [01:46.325]你是其余所有的一切
  [01:49.825]是我的世界
  [01:52.075]所以请你再闪亮一点点
  [01:55.325]尽管我太平凡
  [01:57.576]我会再变得柔软一点点
  [02:01.075]因为你太敏感
  [02:03.324]交换无名指金色的契约
  [02:06.825]给彼此岁月
  [02:09.074]说好从今以后都牵着手
  [02:12.075]不管要走多远
  [02:37.548]所以让我再靠近一点点
  [02:40.298]因为你太温暖
  [02:42.798]我会再变得坚强一点点
  [02:46.297]因为你太柔软
  [02:48.297]交换无名指金色的契约
  [02:52.048]给彼此岁月
  [02:54.297]说好从今以后都牵着手
  [02:57.797]因为要走很远
  },
`,

`[00:04.592]《Flower Dance》
[00:05.102]纯音乐
[00:12.839]敬请欣赏
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
    heart() {
      var time;
      let num = document.addEventListener("mousedown", function (e) {
        let body1 = document.getElementById("wrapperp")
        let heart = document.createElement("span")
        heart.classList.add('span3')

        let x = e.screenX;
        let y = e.screenY;

        heart.style.left = (x) + 'px'
        heart.style.top = (y - 100) + 'px'

        //console.log(x + " " + y + " " + heart.style.left)
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

      canvasCtx.lineWidth = 3;
      canvasCtx.lineJoin = 'round';
      canvasCtx.strokeStyle = 'rgba(226,225,228,0.85)';

      //左边的直线
      canvasCtx.lineWidth = 3;
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, canvas.height / 2);
      canvasCtx.lineTo(canvas.width * 0.282, canvas.height / 2)
      canvasCtx.stroke();
      canvasCtx.closePath();

      //右边的直线
      canvasCtx.beginPath();
      canvasCtx.moveTo(canvas.width * 0.718, canvas.height / 2);
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
      canvasCtx.closePath();

      //爱心裁剪
      // canvasCtx.strokeStyle = 'rgba(238,39,70,0.85)'
      canvasCtx.strokeStyle = 'rgba(226,225,228,0.85)'
      canvasCtx.beginPath();

      canvasCtx.moveTo(canvas.width * 0.5, canvas.height * 0.4);
      canvasCtx.bezierCurveTo(canvas.width * 0.6, canvas.height * 0, canvas.width * 0.95, canvas.height * 0.4, canvas.width * 0.5, canvas.height * 0.93);
      // canvasCtx.moveTo(canvas.width * 0.5, canvas.height * 0.4);
      canvasCtx.bezierCurveTo(canvas.width * 0.05, canvas.height * 0.4, canvas.width * 0.4, canvas.height * 0, canvas.width * 0.5, canvas.height * 0.4);

      canvasCtx.closePath();

      canvasCtx.clip();
      canvasCtx.lineWidth = 6;
      canvasCtx.lineCap = 'round';
      canvasCtx.shadowColor = 'rgb(172,31,24)';
      canvasCtx.shadowBlur = 15;
      canvasCtx.stroke();
    },
    initAudio() {
      const audioElement = document.getElementById('audios1');

      const audioContext = new AudioContext();

      const analyserNode = audioContext.createAnalyser();
      analyserNode.minDecibels = -50;
      analyserNode.maxDecibels = -5;
      analyserNode.smoothingTimeConstant = 1;

      const sourceNode = audioContext.createMediaElementSource(audioElement);
      sourceNode.connect(analyserNode);
      analyserNode.connect(audioContext.destination);

      audioElement.play();

      analyserNode.fftSize = 1024;
      const bufferLength = analyserNode.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      //console.log(bufferLength);
      //console.log(dataArray);

      analyserNode.getByteTimeDomainData(dataArray);

      const canvas = document.getElementById('canvas');
      const canvasCtx = canvas.getContext('2d');

      canvasCtx.beginPath();
      canvasCtx.clearRect(0, 0, canvas.WIDTH, canvas.HEIGHT);

      let counter = 0;
      function draw() {
        if (counter % 8 == 0) {
          //制作canvas动画
          analyserNode.getByteTimeDomainData(dataArray);
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
          //设置样式
          canvasCtx.lineWidth = 3;
          canvasCtx.lineJoin = 'round';
          canvasCtx.strokeStyle = 'rgba(226,225,228,0.85)';

          //计算局部参数
          var sliceWidth = canvas.width * 0.436 / bufferLength;
          var x = canvas.width * 0.283;
          var x_left = canvas.width * 0.1// 0.15

          //左边的直线
          canvasCtx.lineWidth = 3;
          canvasCtx.beginPath();
          canvasCtx.moveTo(0, canvas.height / 2);
          canvasCtx.lineTo(canvas.width * 0.282, canvas.height / 2)
          canvasCtx.stroke();
          canvasCtx.closePath();

          //右边的直线
          canvasCtx.beginPath();
          canvasCtx.moveTo(canvas.width * 0.718, canvas.height / 2);
          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();
          canvasCtx.closePath();

          //爱心裁剪
          // canvasCtx.strokeStyle = 'rgba(238,39,70,0.85)'
          canvasCtx.strokeStyle = 'rgba(226,225,228,0.85)'
          canvasCtx.beginPath();

          canvasCtx.moveTo(canvas.width * 0.5, canvas.height * 0.4);
          canvasCtx.bezierCurveTo(canvas.width * 0.6, canvas.height * 0, canvas.width * 0.95, canvas.height * 0.4, canvas.width * 0.5, canvas.height * 0.93);
          // canvasCtx.moveTo(canvas.width * 0.5, canvas.height * 0.4);
          canvasCtx.bezierCurveTo(canvas.width * 0.05, canvas.height * 0.4, canvas.width * 0.4, canvas.height * 0, canvas.width * 0.5, canvas.height * 0.4);

          canvasCtx.closePath();

          canvasCtx.clip();
          canvasCtx.lineWidth = 6;
          canvasCtx.lineCap = 'round';
          canvasCtx.shadowColor = 'rgb(172,31,24)';
          canvasCtx.shadowBlur = 15;
          canvasCtx.stroke();
          //心电图
          canvasCtx.strokeStyle = 'rgba(226,225,228)'

          canvasCtx.beginPath();
          for (var i = 0; i < bufferLength; i++) {
            dataArray[i] = dataArray[i];
            var v = dataArray[i] / 128.0;
            var y = v * canvas.height / 2;
            if (i <= 0 || i + 1 >= bufferLength) {
              canvasCtx.lineTo(x, canvas.height / 2);
            } else {
              canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          canvasCtx.lineWidth = 3;
          canvasCtx.shadowColor = 'rgb(246,220,206)';
          canvasCtx.shadowBlur = 5;
          canvasCtx.stroke();
          canvasCtx.closePath();

        }
        requestAnimationFrame(draw);
        counter++;
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
      //console.log(curTime + "  k ")

      for (var i = 0; i < this.lrcData.length; i++) {
        //console.log(curTime + "  k " + this.lrcData[i].time + " 1 " + i)
        if (curTime < this.lrcData[i].time) {

          return i - 1;
        }
      }
      // 找遍了都没找到（说明播放到最后一句）
      return this.lrcData.length - 1;
    },
    //歌词切割

    parseLrc() {
      //console.log("g" + this.lrc + " g")
      if (this.lrc[this.singnum]) {
        var lines = this.lrc[this.singnum].split('\n');
        //console.log(lines)
      }
      var result = []; // 歌词对象数组
      for (var i = 0; i < lines.length; i++) {
        var str = lines[i];
        var parts = str.split(']');
        var timeStr = parts[0].substring(3);

        //console.log("g1" + parts + timeStr)
        var obj = {
          time: this.parseTime(timeStr),
          words: parts[1],
        };
        result.push(obj);
      }
      //console.log("g" + result[1].time)
      return result

    },
    //添加歌词
    createLrcElements() {

      //console.log(this.lrcData)
      var frag = document.createDocumentFragment(); // 文档片段
      for (var i = 0; i < this.lrcData.length; i++) {

        var li = document.createElement('li');
        li.textContent = this.lrcData[i].words;
        frag.appendChild(li); // 改动了 dom 树
      }
      this.$nextTick(() => {
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

      var offset = liHeight * index;
      //console.log(containerHeight + " " + liHeight + " " + maxOffset + " " + index)
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
          //console.log();
        var childElement = document.createElement('div');

        //console.log(this.ul)
        document.getElementById('jk').appendChild(childElement);
      });
    },

    timeChange() {
      this.moveSong()
      this.value3 = Math.round(this.$refs.Ref_audio.currentTime / this.$refs.Ref_audio.duration * 100)
      //console.log(this.value3)
      var s = Math.floor(this.$refs.Ref_audio.currentTime % 60);
      var m = Math.floor(this.$refs.Ref_audio.currentTime / 60);
      if (s < 10) {
        this.timebegin = "0" + m + "" + ":0" + s
      } else {
        this.timebegin = "0" + m + "" + ":" + s
      }
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
        this.i++,
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
      //console.log(this.timebegin)
    },
    loadeddata() {
      // 需等音频加载完成，才能获取到音频的时长

      this.mark = this.$refs.Ref_audio.duration;

      var m = Math.floor(this.mark / 60);
      var s = Math.floor(this.mark % 60);
      if (s < 10) {
        this.timeover = "0" + m + "" + ":0" + s
      } else {
        this.timeover = "0" + m + "" + ":" + s
      }
      //console.log(this.timeover + " " + this.mark + " " + m + " " + s)
    },
    sound() {
      let num = this.value4 / 100
      this.$refs.Ref_audio.volume = num
      //console.log(this.$refs.Ref_audio.volume)
    }
  },
}
</script>
<style scoped>
@import url(../assets/contralspink.css);

canvas {
  height: 700px;
  /* width: 90%; */
  left: -10%;
  top: 2%;
  position: absolute;
}
</style>