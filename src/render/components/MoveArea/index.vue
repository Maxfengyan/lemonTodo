<template>
  <div class="moveArea"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.moveArea {
  cursor: move;
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left: 0;
  height: 45px;
  width: calc(100% - 108px);
}
</style>
