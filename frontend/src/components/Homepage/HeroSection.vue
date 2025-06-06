<template>
  <section class="hero">
    <swiper-container
      :navigation="true"
      :pagination="true"
      slides-per-view="1"
      effect="slide"
      :autoplay-delay="5000"
      :autoplay-disable-on-interaction="false"
      loop="true"
      class="swiper-hero"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div
          class="hero-slide"
          :style="{
            backgroundImage: `linear-gradient(0deg, rgba(201, 104, 200, 0.6) 50%, rgba(100, 181, 246, 0.7) 100%), url(${slide.image})`,
          }"
        />
      </swiper-slide>
    </swiper-container>

    <div class="hero-overlay-text">
      <SectionView>
        <template #content>
          <Typewriter
            :strings="['Kursplan?', 'Direkt. Klar. Immer da.']"
            :auto-start="true"
            :loop="true"
            :pause-for="3000"
            element="h1"
            class="title"
          />
          <p class="sub-title">Alle Änderungen in Echtzeit - keine Überraschungen mehr!</p>
        </template>
      </SectionView>
    </div>
  </section>
</template>

<script>
import SectionView from '@/components/Homepage/SectionView.vue'
import Typewriter from 'vue-typewriter-effect'

export default {
  components: {
    SectionView,
    Typewriter,
  },
  data() {
    return {
      slides: [
        {
          image: new URL('@/assets/imgs/corner/h_04.jpg', import.meta.url).href,
          // title: 'NextRep',
          // subtitle: 'Wo die nächste Wiederholung auf den nächsten Takt schwebt',
        },
        {
          image: new URL('@/assets/imgs/poster/h_04.jpg', import.meta.url).href,
          // title: 'Push dich weiter',
          // subtitle: 'Trainiere mit Energie und System',
        },
        {
          image: new URL('@/assets/imgs/mirror/h_01.jpg', import.meta.url).href,
          // title: 'Dein Rhythmus',
          // subtitle: 'Smart. Digital. Effektiv.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Swiper füllt alles aus */
.swiper-hero,
.swiper-slide,
.hero-slide {
  width: 100%;
  height: 100%;
}

.hero-slide {
  background-size: cover;
  background-position: center;
}

/* Fixierter Textblock über allem */
.hero-overlay-text {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  pointer-events: none;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
}

/* Text selbst */
.title {
  color: white;
  font-size: 7rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.sub-title {
  color: white;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Responsive Scaling – wie gehabt */
@media (min-width: 576px) {
  .title {
    font-size: 8rem;
  }
  .sub-title {
    font-size: 2.2rem;
  }
}
@media (min-width: 768px) {
  .title {
    font-size: 9rem;
  }
  .sub-title {
    font-size: 2.4rem;
  }
}
@media (min-width: 1024px) {
  .title {
    font-size: 10rem;
  }
  .sub-title {
    font-size: 2.6rem;
  }
}
</style>
