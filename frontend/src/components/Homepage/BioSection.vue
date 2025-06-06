<template>
  <SectionView backgroundColor="var(--color-primary-hover)">
    <template #content>
      <h1 class="title">Die Köpfe hinter dem Ganzen!</h1>
      <div class="bio-wrapper">
        <div
          class="bio-box"
          v-for="admin in admins"
          :key="admin.name"
          :class="{ 'ali-order': admin.name === 'Ali' }"
        >
          <div class="bio-img-wrapper">
            <img :src="admin.img" class="bio-img" alt="Foto" />
          </div>
          <p class="bio-name bio-text">{{ admin.name }}</p>
          <p class="bio-pos bio-text">{{ admin.pos }}</p>
          <div class="bio-desc-wrapper">
            <p class="bio-desc bio-text">{{ admin.desc }}</p>
          </div>
          <div class="bio-courses" v-if="admin.courses">
            <p class="bio-text">{{ admin.courses }}</p>
          </div>
        </div>
      </div>
    </template>
  </SectionView>
</template>

<script>
import SectionView from '@/components/Homepage/SectionView.vue'
import aliImg from '@/assets/imgs/admins/ali_01.jpg'
import kaiImg from '@/assets/imgs/admins/kai_01.jpg'
import maikImg from '@/assets/imgs/admins/maik_01.jpg'
import avaImg from '@/assets/imgs/admins/ava_01.jpg'
import yvonneImg from '@/assets/imgs/admins/yvonne_02.jpg'
import ventImg from '@/assets/imgs/ventilator/01.jpg'

export default {
  components: {
    SectionView,
  },
  data() {
    return {
      admins: [
        {
          name: 'Yvonne',
          pos: 'Trainerin',
          desc: 'Mit Herz und Körper dabei seit 2013! Hier wird nicht nur die Ausdauer trainiert, sondern auch die Flexibilität - sowohl körperlich als auch mental.',
          img: yvonneImg,
          courses: 'Body Attack | Body Pump | Core | Body Balance | Yoga',
        },
        {
          name: 'Ali',
          pos: 'Kopf hinter NextRep',
          desc: 'Warum Kurse? Weil sie herausfordern, fit halten und den perfekten Ausgleich zum Haupttraining bieten. Und mal ehrlich: Was gibt es Besseres als Ego-Lifting bei fettem Beat? Noch ein Grund? Ich wollte die Kurswelt wirklich verstehen - aus Sicht der Teilnehmer und der Trainer. Beziehungen aufbauen, echtes Feedback spüren und die „Pain Points“ der Leute hautnah erleben. Genau daraus entstand NextRep - als Antwort auf das, was wirklich fehlt.',
          img: aliImg,
        },
        {
          name: 'Ava',
          pos: 'Trainerin',
          desc: 'Seit 2021 im CleverFit-Team, als Studioleiterin bis August 2024. Kursleitung ab Januar 2023 - und ja, ich liebe es, wenn alles perfekt läuft, aber vor allem, wenn es Spaß macht!',
          img: avaImg,
          courses: 'LMI Step | Body Attack | Body Combat',
        },
        {
          name: 'Kai',
          pos: 'Trainer',
          desc: 'Bodypump hat mich seit 2008 in seinen Bann gezogen - und als Trainer habe ich 2014 den Hebel umgelegt. Stark bleiben, immer!',
          img: kaiImg,
          courses: 'Body Pump',
        },
        {
          name: 'Maik',
          pos: 'Trainer',
          desc: 'Von der Matte zum Mikrofon - seit über 10 Jahren am Puls, seit 5 Jahren als Trainer mit vollem Einsatz! Auf in die nächste Runde für starke Muskeln und pure Ausdauer.',
          img: maikImg,
          courses: 'Body Pump | HIIT | Core',
        },
        {
          name: 'Tini',
          pos: 'Trainerin',
          desc: 'Boxen ohne Körperkontakt, aber mit jeder Menge Power - Ausdauer, Koordination und Beweglichkeit für den perfekten Ausgleich für Kopf und Körper. Seit 2012 dabei, seit 2024 selbst Trainerin für BodyCombat.',
          img: ventImg,
          courses: 'Body Combat',
        },
      ],
    }
  },
}
</script>

<style scoped>
.bio-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title {
  color: white;
  text-align: center;
  font-weight: bolder;
  margin-bottom: 4rem;
  font-size: 2rem;
}

.bio-box {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--color-primary-hover);
  color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.25s;
}

.bio-box:hover {
  background-color: var(--color-primary);
}

.bio-img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.bio-img {
  width: clamp(100px, 40%, 170px);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 9999px;
  border: 5px solid white;
}

.bio-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.bio-pos {
  font-weight: 500;
  color: var(--color-accent, #ffe600);
  margin-bottom: 1rem;
}

.bio-desc-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem;
}

.bio-desc {
  font-size: 0.95rem;
  font-style: italic;
  color: #f0f0f0;
  line-height: 1.4;
}

.bio-text {
  color: white;
  font-size: 1.2rem;
}

@media (min-width: 576px) {
  .title {
    margin-bottom: 6rem;
    font-size: 2.5rem;
  }
  .bio-text {
    font-size: 1.3rem;
  }
  .bio-box {
    width: calc(100% / 2);
  }
}
@media (min-width: 768px) {
  .title {
    margin-bottom: 8rem;
    font-size: 3rem;
  }
  .bio-text {
    font-size: 1.4rem;
  }
  .bio-desc-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
@media (min-width: 1024px) {
  .title {
    margin-bottom: 8rem;
    font-size: 4rem;
  }
  .bio-text {
    font-size: 1.5rem;
  }
  .bio-box {
    width: calc((100% - 2rem) / 3);
  }
}

/* Standardmäßig soll Ali zuerst kommen */
.ali-order {
  order: -1;
}

/* Ab mittlerer Größe soll Ali in die Mitte */
@media (min-width: 768px) {
  .ali-order {
    order: 0;
  }
}
</style>
