<template>
  <div class="screenshot">
    <div class="screenshot-brand">
      <div class="screenshot-brand__main">
        <p>NextRep</p>
      </div>
      <div class="screenshot-brand__sub">
        <p>CleverFit-Kurse</p>
      </div>
    </div>
    <div class="screenshot-time">
      <div class="screenshot-time__day">
        <p>{{ day || 'Tag' }}</p>
      </div>
      <div class="screenshot-time__date">
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
  background-color: rgb(225, 0, 0);
  height: 100%;
  max-width: 54rem;
  aspect-ratio: 9/16;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  /* margin: 0 auto; */
}

.screenshot-brand {
  /* background-color: blue; */
  color: white;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.screenshot-brand__main {
  font-size: 1.8rem;
  font-weight: bold;
}

.screenshot-brand__sub {
  font-size: 2rem;
  color: black;
  font-weight: bold;
}

.screenshot-time {
  width: 100%;
  padding: 1rem 1rem 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.screenshot-time__date,
.screenshot-time__day {
  background-color: white;
  color: red;
  font-size: 1.6rem;
  padding: 1rem;
  width: fit-content;
  font-weight: bold;
}

.screenshot-content {
  width: 100%;
  flex: 1;
  padding: 0 4rem;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
