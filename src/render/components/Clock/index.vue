<template>
  <div class="clock" ref="clock">
    <div class="hour">
      <div class="hr" id="hr" style="transform: rotateZ(331deg)"></div>
    </div>

    <div class="min">
      <div class="mn" id="mn" style="transform: rotateZ(12deg)"></div>
    </div>

    <div class="sec">
      <div class="sc" id="sc" style="transform: rotateZ(96deg)"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    this.handelHeight();
    this.initClock();
  },
  methods: {
    // 初始化钟
    initClock() {
      const deg = 6;
      const hr = document.querySelector("#hr");
      const mn = document.querySelector("#mn");
      const sc = document.querySelector("#sc");

      setInterval(() => {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;

        hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        mn.style.transform = `rotateZ(${mm}deg)`;
        sc.style.transform = `rotateZ(${ss}deg)`;
      });
    },
    // 重置clock高
    $_resizeHandler() {
      if (!document.hidden) {
        this.handelHeight();
      }
    },
    handelHeight() {
      this.$refs.clock.style.height = this.$refs.clock.offsetWidth + "px";
    },
  },
};
</script>

<style scoped>
.clock {
  display: flex;
  width: 90%;
  /* height: 350px; */
  justify-content: center;
  align-items: center;
  background: url(../../assets/clock-sam.png);
  background-size: cover;
  border: 4px solid #191919;
  border-radius: 50%;
  box-shadow: -4px -4px 10px rgba(67, 67, 67, 0.5),
    inset 4px 4px 10px rgba(0, 0, 0, 0.5),
    inset -4px -4px 10px rgba(67, 67, 67, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.3);
}

.clock:before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: #747474;
  border-radius: 50%;
  z-index: 999;
}

.clock .hour,
.clock .min,
.clock .sec {
  position: absolute;
}

.clock .hour,
.hr {
  width: 160px;
  height: 160px;
}

.clock .min,
.mn {
  width: 190px;
  height: 190px;
}

.clock .sec,
.sc {
  width: 230px;
  height: 230px;
}

.hr,
.mn,
.sc {
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  position: absolute;
  border-radius: 50%;
}

.hr:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 80px;
  background: #ffb510;
  z-index: 9;
  border-radius: 6px 6px 0 0;
}

.mn:before {
  content: "";
  position: absolute;
  width: 4px;
  height: 90px;
  background: #8b8b8b;
  z-index: 10;
  border-radius: 6px 6px 0 0;
}

.sc:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 150px;
  background: #e5e5e5;
  z-index: 11;
  border-radius: 6px 6px 0 0;
}
</style>
