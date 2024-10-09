<template>
  <div>

  </div>
</template>
  
<script >
export default
  {
    methods: {
      zhuzi() {
        var time;
        let num = document.addEventListener("mousedown", function (e) {
          let body = document.querySelector("body")
          let heart = document.createElement("span")

          let x = e.screenX;
          let y = e.screenY;

          heart.style.left = (x) + 'px'
          heart.style.top = (y - 100) + 'px'

          console.log(x + " " + y + " " + heart.style.left)
          body.appendChild(heart)

          setTimeout(() => {
            body.removeChild(heart);
          }, 1000)

          heart.style.transform =
            `rotate(${Math.random() * 360}deg)`
          let size = Math.random() * 60

        }
        )
      }
    },
    mounted() {
      this.zhuzi()
    },
    unmounted() {
    }
  }
</script >
  
<style  >
span {
  position: absolute;
  pointer-events: none;
  animation: fade-in-out 1s linear;
  background-size: contain;
}

@keyframes fade-in-out {

  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}


span::before {
  content: "";

  position: absolute;
  background: url(../img/heart.png);
  animation: path 1s linear;
  width: 32px;
  height: 32px;
  background-size: cover;

}

@keyframes path {
  0% {
    transform: translate(0) rotate(0deg);
  }

  100% {
    transform: translate(100px) rotate(360deg);
  }
}
</style>
  
  