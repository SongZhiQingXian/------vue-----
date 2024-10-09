<template>
  <div id="wrapperg">
    <Rain></Rain>
    <div class="container1">
      <div class="btn"><a href="#" @click="gogreen">松霜绿</a></div>
      <div class="btn"><a href="#" @click="gopink">春梅红</a></div>
      <div class="btn"><a href="#" @click="goblue">鲸鱼灰</a></div>
    </div>
    <div class="firstcontrols">
      <div class="controls">
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

    <div class="container" id="con">
      <ul class="lrc-list" id="jk"></ul>
    </div>
    <canvas id="canvas" width="1000" height="700" class=" .canvas1"></canvas>
  </div>

  <Lighting @showChange="showpchanges()" v-if="showp" style="z-index: 2;" />
  <img class="imgg" @click="opengame" src="../img/漩涡1.png" alt="">
</template>
  
<script>
import Rain from '../components/Rain.vue'
import Lighting from '../components/Lighting_game.vue'
export default {
  components: {
    Rain: Rain,

    Lighting: Lighting
  },
  mounted() {
    this.zhuzi()
    this.zhuzi()
    this.zhuzi()

    this.getData()
    this.initdraw()
    this.addsong()
    this.stime = document.getElementById('audios1').currentTime
  },
  data() {
    return {
      showps: false,
      showp: false,
      i: 0,
      singnum: 0,
      totalsing: ["./src/viods/Winky诗 - 松烟入墨.mp3", "./src/viods/司南 - 烟雨行舟 (Single Version).mp3", "./src/viods/弦子 - 醉清风 (2005版).mp3"],
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

      lrc: [` [00:36.790]折一枝寒山凝碧    
 [00:40.320]上有白雪堆积   
 [00:44.660]数不出青针瘦密   
 [00:48.500]云海苍茫万里   
 [00:53.210]燃一缕苍炱升起   
 [00:56.800]松香久散不去   
 [01:01.300]心思如余烬收集   
 [01:05.190]研磨得如此细腻   
 [01:13.040]   
 [01:17.730]总有一砚风雨   
 [01:22.030]流连过峰石贫瘠   
 [01:26.330]夫曰曲水流觞，已为陈迹.    
 [01:31.080]以千古而序   
 [01:33.500]   
 [01:34.720]总有一纸淋漓   
 [01:38.610]恣意如虬根百曲   
 [01:42.860]所谓老树迎客，林海奔啼   
 [01:48.070]分明是墨乡故里   
 [01:55.310]   
 [02:24.170]拨一炉枯炭未熄   
 [02:27.820]琥珀剔透欲滴   
 [02:32.160]避不开春潮带雨   
 [02:36.050]老街晒薪临溪   
 [02:39.640]   
 [02:41.300]投一把丁香碎粒   
 [02:45.240]捣作丹青浓郁   
 [02:49.640]光阴被冻入胶泥   
 [02:54.290]玲珑似一方印玺   
 [03:01.570]总有一砚风雨   
 [03:06.130]流连过峰石贫瘠   
 [03:10.370]夫曰曲水流觞，已为陈迹   
 [03:15.060]以千古而序   
 [03:17.440]   
 [03:18.450]总有一纸淋漓   
 [03:22.490]恣意如虬根百曲   
 [03:27.190]所谓老树迎客，林海奔啼   
 [03:32.350]分明是墨乡故里   
 [03:38.340]   
 [03:43.460]听说一点如漆   
 [03:47.590]是游龙灵眸初启   
 [03:51.940]几欲腾空破壁，扶摇而去   
 [03:56.750]将天地洞悉   
 [03:59.020]   
 [04:00.980]听说一行绝句   
 [04:05.320]残艳似故人手笔   
 [04:09.670]或于牌楼村驿，藤黄扇底   
 [04:14.880]恍然道:原来是你`
 
 ,

` [00:38.07]烟雨入江南
 [00:40.33]山水如墨染
 [00:43.02]宛若丹青未干
 [00:44.93]提笔然 点欲穿
 [00:48.59]行舟临秀川
 [00:50.89]画鹢推清澜
 [00:54.06]缱绻怡然
 [00:58.96]天色沉靛蓝
 [01:01.64]波光似锦缎
 [01:04.31]缀着零星白帆
 [01:06.79]诗情满 千卷难
 [01:09.79]渔舟齐桅杆
 [01:12.36]鸳鸯凭舷栏
 [01:15.37]琴瑟相伴
 [01:21.05]一叶轻船
 [01:23.41]一双桨悠懒
 [01:26.28]一绵江风微拂素罗衫
 [01:31.95]渔火点点聚散
 [01:34.38]欸乃声声浅淡
 [01:37.14]天近晚
 [01:38.74]炊烟袅飘沿斑
 [01:42.41]一叶轻船
 [01:44.73]一双人倚揽
 [01:47.70]一曲烟雨行舟太缓慢
 [01:53.16]执手相看
 [01:55.59]把酒当歌言欢
 [01:58.73]红尘路漫漫
 [02:02.05]愿今生与你共览
 [02:51.49]暮霭渐褪暗
 [02:53.70]胭脂余味淡
 [02:56.30]我支着竹绢伞
 [02:58.75]你闲摆花团扇
 [03:01.82]浪儿晃曳慢
 [03:04.30]夜垂云流缓
 [03:07.54]且吟且谈
 [03:13.08]一叶轻船
 [03:15.52]一双桨悠懒
 [03:18.40]一绵江风微拂素罗衫
 [03:23.88]渔火点点聚散
 [03:26.38]欸乃声声浅淡
 [03:29.10]天近晚
 [03:30.79]炊烟袅飘沿斑
 [03:34.57]一叶轻船
 [03:36.78]一双人倚揽
 [03:39.69]一雨烟雨行舟太缓慢
 [03:45.01]执手相看
 [03:47.48]把酒当歌言欢
 [03:50.72]红尘路漫漫
 [03:54.18]欲今生与你共览
 [03:57.64]一叶轻船
 [03:58.32]一双月对半
 [04:01.13]一帘清梦幽幽醉阑珊
 [04:06.21]移舟靠岸
 [04:09.10]案前惟剩空盏
 [04:12.14]莫怨良辰短
 [04:15.47]曲终了韵意未完`
, 

` [00:30.748]月色正朦胧
 [00:37.241]与清风把酒相送
 [00:43.254]太多的诗颂
 [00:49.511]醉生梦死也空
 [00:55.957]和你醉后缠绵
 [00:59.318]你曾记得
 [01:02.680]乱了分寸的心动
 [01:07.341]怎么只有这首歌
 [01:10.736]会让你轻声合
 [01:13.074]醉清风
 [01:21.223]梦境的虚有
 [01:27.740]琴声一曲相送
 [01:34.489]还有没有情浓
 [01:40.748]风花雪月颜容
 [01:47.054]和你醉后缠绵
 [01:50.971]你曾记得
 [01:54.076]乱了分寸的心动
 [01:58.510]蝴蝶去向无影踪
 [02:01.890]举杯消愁意正浓
 [02:04.779]无人宠
 [02:12.511]是我想得太多
 [02:19.036]犹如飞蛾扑火那么冲动
 [02:23.926]最后
 [02:26.020]还有一盏烛火
 [02:29.381]燃尽我
 [02:32.237]曲终人散
 [02:34.323]谁无过错
 [02:36.674]我看破
 [02:41.333]月色正朦胧与清风把酒相送
 [02:44.124]太多的诗颂醉生梦死也空
 [02:48.013]和你醉后缠绵
 [02:50.094]你曾记得
 [02:54.021]梦境的虚有琴声一曲相送
 [02:57.171]还有没有情浓风花雪月颜容
 [03:00.278]和你醉后缠绵
 [03:02.073]你曾记得
 [03:10.603]梦境的虚有
 [03:16.548]琴声一曲相送
 [03:23.044]还有没有情浓
 [03:29.338]风花雪月颜容
 [03:35.875]和你醉后缠绵
 [03:38.504]你曾记得
 [03:42.688]乱了分寸的心动
 [03:47.402]蝴蝶去向无影踪
 [03:51.059]举杯消愁意正浓
 [03:53.404]无人宠
 [04:01.511]是我想得太多
 [04:07.999]犹如飞蛾扑火那么冲动
 [04:12.718]最后
 [04:14.993]还有一盏烛火
 [04:18.376]燃尽我
 [04:20.433]曲终人散
 [04:23.052]谁无过错
 [04:25.392]我看破
 [04:31.098]是我想得太多 啊..
 [04:36.546]犹如飞蛾扑火那么冲动
 [04:43.049]最后
 [04:44.369]还有一盏烛火
 [04:47.496]燃尽我
 [04:49.316]曲终人散
 [04:51.647]谁无过错
 [04:54.501]我看破
  },
`],
      lrcData: [{}],
      gg: null,
      it: document.getElementById("ll"),

      audio: document.querySelector('audio'),
      ul: document.getElementById('jk'),
      container: document.querySelector('.container'),

      audio_Url: null,
    }
  }, watch: {

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
    opengame() {
      this.showp = true;
    },
    showpchanges(val) {
      this.showp = val
    },
    // 点击效果
    zhuzi() {
      var time;
      let num = document.addEventListener("mousedown", function (e) {
        let body = document.getElementById("wrapperg")
        let heart = document.createElement("span")
        heart.classList.add('span1')

        let x = e.screenX;
        let y = e.screenY;

        heart.style.left = (x) + 'px'
        heart.style.top = (y - 100) + 'px'

        //console.log(x + " " + y + " " + heart.style.left)
        body.appendChild(heart)

        setTimeout(() => {
          body.removeChild(heart);
        }, 1000)

        heart.style.transform =
          `rotate(${Math.random() * 360}deg)`
      }
      )
    },
    initdraw() {
      const canvas = document.getElementById('canvas');
      const canvasCtx = canvas.getContext('2d');

      canvasCtx.beginPath();
      canvasCtx.moveTo(0, 0);
      canvasCtx.lineTo(canvas.width, 0);

      canvasCtx.lineWidth = 4;
      canvasCtx.strokeStyle = 'rgb(241,240,237)';
      canvasCtx.stroke();
      canvasCtx.closePath();

      canvasCtx.beginPath();
      canvasCtx.moveTo(0, canvas.height);
      canvasCtx.lineTo(canvas.width, canvas.height);

      canvasCtx.lineWidth = 4;
      canvasCtx.strokeStyle = 'rgb(241,240,237)';
      canvasCtx.stroke();
      canvasCtx.closePath();
    },

    initAudio() {
      const audioElement = document.getElementById('audios1')
      //console.log(audioElement)

      const audioContext = new AudioContext();

      const analyserNode = audioContext.createAnalyser();

      const sourceNode = audioContext.createMediaElementSource(audioElement);
      sourceNode.connect(analyserNode);
      analyserNode.connect(audioContext.destination);

      analyserNode.fftSize = 1024;
      const bufferLength = analyserNode.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      //console.log(bufferLength);
      //console.log(dataArray);

      analyserNode.getByteTimeDomainData(dataArray);

      const canvas = document.getElementById('canvas');
      const canvasCtx = canvas.getContext('2d');
      function draw() {
        requestAnimationFrame(draw);//制作动画
        analyserNode.getByteFrequencyData(dataArray);//每次都要获取当前时刻的音频数据

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        var barWidth = (canvas.width / bufferLength) * 0.75;//矩形的宽
        canvasCtx.shadowColor = 'rgba(131,203,172,1)';//阴影
        canvasCtx.shadowBlur = 5;//阴影大小
        var barHeight;//矩形的长
        var x = 0;//canvas上的x轴坐标
        var x_right = canvas.width;

        canvasCtx.beginPath();
        canvasCtx.moveTo(0, 0);
        canvasCtx.lineTo(canvas.width, 0);

        canvasCtx.lineWidth = 4;
        canvasCtx.strokeStyle = 'rgb(241,240,237)';
        canvasCtx.stroke();
        canvasCtx.closePath();


        canvasCtx.beginPath();
        canvasCtx.moveTo(0, canvas.height);
        canvasCtx.lineTo(canvas.width, canvas.height);

        canvasCtx.lineWidth = 4;
        canvasCtx.strokeStyle = 'rgb(241,240,237)';
        canvasCtx.stroke();
        canvasCtx.closePath();

        for (var i = 0; i < bufferLength; i++) {//循环一个bufferLength周期
          barHeight = dataArray[i] * 1.618 * 3;//把音频数据映射到矩形的高度
          barHeight = barHeight / 1.612 / 1.2 / 5;
          canvasCtx.fillStyle = 'rgb(241,240,237)';//设置矩形的填充颜色
          canvasCtx.fillRect(x, 0, barWidth, barHeight);//填充矩形
          //下方
          canvasCtx.fillRect(x_right, canvas.height - barHeight, barWidth, barHeight);//填充矩形

          x += barWidth + 9; //矩形之间的间隔
          x_right = x_right - barWidth - 9;
        }

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
        var pp = document.createElement('p');


        pp.textContent = this.lrcData[i].words;

        li.appendChild(pp);
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

      li = document.getElementById('jk').children[index];

      if (li) {

        li.children[0].classList.add('active');
      }
    }
    ,
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
@import url(../assets/contrals.css);


canvas {
  width: 100%;
  height: 500px;
  top: 180px;
  position: absolute;
}
</style>