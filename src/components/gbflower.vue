<template>

<div class="rcontainer"  style="width: 100%; height: 1500px; position: absolute; top: 0; left: 0; " id="gbig" ></div>

</template>
    
<script>

export default
{
   mounted(){
    this.kk()
   },
   methods:
   {
    kk(){
      let stop, staticx // eslint-disable-line no-unused-vars
const img = new Image()
img.src = 'src/img/skula.png'

function Sakura(x, y, s, r, fn) {
  this.x = x
  this.y = y
  this.s = s
  this.r = r
  this.fn = fn
}

Sakura.prototype.draw = function (cxt) {
  cxt.save()
  // 这个数值是花瓣大小,电脑端网页 40 效果最好
  const xc = 25 * this.s
  cxt.translate(this.x, this.y)
  cxt.rotate(this.r)
  cxt.drawImage(img, 0, 0, xc, xc)
  cxt.restore()
}

Sakura.prototype.update = function () {
  this.x = this.fn.x(this.x, this.y)
  this.y = this.fn.y(this.y, this.y)
  this.r = this.fn.r(this.r)
  if (this.x > window.innerWidth ||
    this.x < 0 ||
    this.y > window.innerHeight ||
    this.y < 0
  ) {
    this.r = getRandom('fnr')
    if (Math.random() > 0.4) {
      this.x = getRandom('x')
      this.y = 0
      this.s = getRandom('s')
      this.r = getRandom('r')
    } else {
      this.x = window.innerWidth
      this.y = getRandom('y')
      this.s = getRandom('s')
      this.r = getRandom('r')
    }
  }
}

// let SakuraList
const SakuraList = function () {
  this.list = []
}
SakuraList.prototype.push = function (sakura) {
  this.list.push(sakura)
}
SakuraList.prototype.update = function () {
  let i = 0; const len = this.list.length
  for (; i < len; i++) {
    this.list[i].update()
  }
}
SakuraList.prototype.draw = function (cxt) {
  let i = 0; const len = this.list.length
  for (; i < len; i++) {
    this.list[i].draw(cxt)
  }
}
SakuraList.prototype.get = function (i) {
  return this.list[i]
}
SakuraList.prototype.size = function () {
  return this.list.length
}

function getRandom(option) {
  let ret, random
  switch (option) {
    case 'x':
      ret = Math.random() * window.innerWidth
      break
    case 'y':
      ret = Math.random() * window.innerHeight
      break
    case 's':
      ret = Math.random()
      break
    case 'r':
      ret = Math.random() * 6
      break
    case 'fnx':
      random = -0.5 + Math.random()
      ret = function (x) {
        return x + 0.5 * random - 1.7
      }
      break
    case 'fny':
      random = 1.5 + Math.random() * 0.7
      ret = function (x, y) {
        return y + random
      }
      break
    case 'fnr':
      random = Math.random() * 0.03
      ret = function (r) {
        return r + random
      }
      break
  }
  return ret
}

 function flowerDrops() {
  const requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame
  const canvas = document.createElement('canvas')
  // const cxt
  staticx = true
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none; z-index: 3;')
  canvas.setAttribute('id', 'canvas_sakura')
  document.getElementById('gbig').appendChild(canvas)
  const cxt = canvas.getContext('2d')
  const sakuraList = new SakuraList()
  for (let i = 0; i < 50; i++) {
    // let sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR
    const randomX = getRandom('x')
    const randomY = getRandom('y')
    const randomR = getRandom('r')
    const randomS = getRandom('s')
    const randomFnx = getRandom('fnx')
    const randomFny = getRandom('fny')
    const randomFnR = getRandom('fnr')
    const sakura = new Sakura(randomX, randomY, randomS, randomR, {
      x: randomFnx,
      y: randomFny,
      r: randomFnR
    })
    sakura.draw(cxt)
    sakuraList.push(sakura)
  }
  stop = requestAnimationFrame(function reverse() {
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    sakuraList.update()
    sakuraList.draw(cxt)
    stop = requestAnimationFrame(reverse)
  })
}

window.onresize = function () {
  const canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

img.onload = function () {
  flowerDrops()
}
 function stopp() {
  if (staticx) {
    const child = document.getElementById('canvas_sakura')
    child.parentNode.removeChild(child)
    window.cancelAnimationFrame(stop)
    staticx = false
  } else {
    flowerDrops()
  }
}

    }
   }
}


</script>
    
<style scoped></style>
    