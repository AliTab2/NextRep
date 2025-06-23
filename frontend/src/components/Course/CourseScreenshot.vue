<template>
  <div class="screenshot">
    <div class="screenshot-header">
      <div class="screenshot-brand">
        <p>NextRep</p>
      </div>
      <div class="screenshot-day">
        <p>{{ day || 'Tag' }}</p>
      </div>
      <div class="screenshot-date">
        <p>{{ date || 'Datum' }}</p>
      </div>
    </div>
    <div class="screenshot-content"></div>
  </div>
</template>

<script>
export default {
  props: {
    day: String,
    date: String,
  },
}
</script>

<style scoped>
.screenshot {
  height: 100%;
  max-width: 54rem;
  aspect-ratio: 9/16;
  display: flex;
  flex-direction: column;
  background-image: url('@/assets/imgs/extras/flyer-bg.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  background-color: #e10000;
}

.screenshot-header {
  margin-top: 3rem;
  /* height: 15rem; */
  height: 10rem;
  width: 100%;
  padding-left: 3rem;
  /* font-size: 3rem; */
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  font-weight: bold;
  color: black;
  line-height: normal;
}

.screenshot-brand {
  color: #db1200;
  font-size: 2.5rem;
}

.screenshot-content {
  width: 100%;
  flex: 1;
  padding: 0 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

@media (min-width: 400px) {
  .screenshot {
    background-size: cover;
  }
}

@media (min-width: 470px) {
  .screenshot-header {
    font-size: 3rem;
    height: 15rem;
  }
  .screenshot-brand {
    font-size: 3.5rem;
  }
}
</style>
