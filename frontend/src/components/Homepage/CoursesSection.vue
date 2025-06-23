<template>
  <SectionView backgroundColor="#fff">
    <template #content>
      <h1 class="title">
        Auf <strong style="text-decoration: underline">8 verschiedene</strong> Wege könnt ihr den
        nächsten <strong>Rep</strong> treffen!
      </h1>
      <div class="courses-wrapper">
        <div class="course-box" v-for="c in courses" :key="c.label">
          <div class="course-box__icon">
            <font-awesome-icon
              class="icon"
              :icon="coursesWidgets[c.value].icon"
            ></font-awesome-icon>
          </div>
          <div class="course-box__text">
            <p>{{ c.label }}</p>
          </div>
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
  color: #000;
  text-align: center;
  font-weight: bolder;
  font-style: italic;
  margin-bottom: 4rem;
  font-size: 2rem;
}

.course-box {
  width: calc((100% - 2rem) / 2);
  aspect-ratio: 1/1;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  color: var(--color-primary-hover);
  display: flex;
  flex-direction: column;
}

.course-box__icon {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #db1200;
  font-size: 5rem;
}

.course-box__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #000;
  font-weight: bold;
  font-size: 1.7rem;
  text-align: center;
}
.course-box p {
  text-align: center;
}

@media (min-width: 576px) {
  .title {
    margin-bottom: 6rem;
    font-size: 2.5rem;
  }
  .course-box {
    width: calc((100% - 6rem) / 4);
  }
  .course-box__icon {
    font-size: 4rem;
  }
  .course-box__text {
    font-size: 1.5rem;
  }
}
@media (min-width: 768px) {
  .title {
    margin-bottom: 8rem;
    font-size: 3rem;
  }
  .course-box__icon {
    font-size: 5rem;
  }
  .course-box__text {
    font-size: 1.7rem;
  }
}
@media (min-width: 1024px) {
  .title {
    margin-bottom: 8rem;
    font-size: 4rem;
  }
  .course-box__icon {
    font-size: 6rem;
  }
  .course-box__text {
    font-size: 2rem;
  }
}
@media (min-width: 1280px) {
  .title {
    margin-bottom: 8rem;
    font-size: 4rem;
  }
  .course-box__icon {
    font-size: 8rem;
  }
  .course-box__text {
    font-size: 3.5rem;
  }
}
</style>
