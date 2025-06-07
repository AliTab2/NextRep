<template>
  <SectionView backgroundColor="var(--color-primary)">
    <template #content>
      <h1 class="title">
        Auf <strong style="text-decoration: underline">8 verschiedene</strong> Wege kannst Du den
        nächsten <strong>Rep</strong> treffen!
      </h1>
      <div class="courses-wrapper">
        <div class="course-box" v-for="c in courses" :key="c.label">
          <font-awesome-icon class="icon" :icon="coursesWidgets[c.label].icon"></font-awesome-icon>
          <p>{{ c.label }}</p>
        </div>
      </div>
    </template>
  </SectionView>
</template>

<script>
import SectionView from '@/components/Homepage/SectionView.vue'
import { coursesHomeList, coursesWidgetsList } from '@/utils/base.js'

export default {
  components: {
    SectionView,
  },
  data() {
    return {
      courses: coursesHomeList.map((c) => ({ ...c })),
      coursesWidgets: JSON.parse(JSON.stringify(coursesWidgetsList)),
    }
  },
}
</script>

<style scoped>
.courses-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
}

.title {
  color: white;
  text-align: center;
  font-weight: bolder;
  font-style: italic;

  margin-bottom: 4rem;
  font-size: 2rem;
}

.course-box {
  width: calc((100% - 6rem) / 4);
  aspect-ratio: 1/1;
  background-color: #1a75d1;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: var(--color-primary-hover);
  padding: 1rem;
  gap: 0.5rem;
  text-align: center;
}
.course-box .icon {
  color: var(--color-primary-hover);
  font-size: 2.5rem;
}
.course-box p {
  color: whitesmoke;
  font-weight: bold;
  font-size: 1.2rem;
}

@media (min-width: 576px) {
  .title {
    margin-bottom: 6rem;
    font-size: 2.5rem;
  }
  .course-box .icon {
    font-size: 4.5rem;
  }
  .course-box p {
    font-size: 1.5rem;
  }
}
@media (min-width: 768px) {
  .title {
    margin-bottom: 8rem;
    font-size: 3rem;
  }
  .course-box .icon {
    font-size: 5.5rem;
  }
  .course-box p {
    font-size: 2rem;
  }
}
@media (min-width: 1024px) {
  .title {
    margin-bottom: 8rem;
    font-size: 4rem;
  }
  .course-box .icon {
    font-size: 8rem;
  }
  .course-box p {
    font-size: 3.5rem;
  }
}
</style>
