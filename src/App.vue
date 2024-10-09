<template>
  <router-view> </router-view>
</template>

<script>
import Rain from './components/Rain.vue'
// import sakura from './components/sakura.vue'
export default {
  components: {
    Rain: Rain,
    // sakura: sakura
  },
  mounted() {
  },
  methods: {
    k() {

      const canvas = document.getElementById('canvas1');

      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'green';

      ctx.lineTo(100, 75);
      ctx.lineTo(400, 25);
      ctx.fill();
    },
    gogreen(){
      this.$router.push("/green");
    },
    gopink() {
      this.$router.push("/pink");
    },
    goblue() {
      this.$router.push("/blue");
    },
  }
}

</script>
<style scoped></style>