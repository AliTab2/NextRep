<template>
  <SectionWrapper backgroundColor="#fff">
    <template #content>
      <h1 class="title">Das NextRep-Team!</h1>
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
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '@/components/homepage/SectionWrapper.vue'
import aliImg from '@/assets/imgs/admins/ali.png'
import kaiImg from '@/assets/imgs/admins/kai.png'
import maikImg from '@/assets/imgs/admins/maik.png'
import avaImg from '@/assets/imgs/admins/eva.png'
import yvonneImg from '@/assets/imgs/admins/yvonne.png'
import tiniImg from '@/assets/imgs/admins/tini.png'
import omarImg from '@/assets/imgs/admins/omar.png'

export default {
  components: {
    SectionWrapper,
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
          name: 'Tini',
          pos: 'Trainerin',
          desc: 'Boxen ohne Körperkontakt, aber mit jeder Menge Power - Ausdauer, Koordination und Beweglichkeit für den perfekten Ausgleich für Kopf und Körper. Seit 2012 dabei, seit 2024 selbst Trainerin für BodyCombat.',
          img: tiniImg,
          courses: 'Body Combat',
        },
        {
          name: 'Maik',
          pos: 'Trainer',
          desc: 'Von der Matte zum Mikrofon - seit über 10 Jahren am Puls, seit 5 Jahren als Trainer mit vollem Einsatz! Auf in die nächste Runde für starke Muskeln und pure Ausdauer.',
          img: maikImg,
          courses: 'Body Pump | HIIT | Core | Strength meets HIIT',
        },
        {
          name: 'Omar',
          pos: 'Trainer',
          desc: 'Mit langjähriger Erfahrung und internationaler Anerkennung meiner Trainingsmethoden in der Selbstverteidigung, als Ehrendozent der Martial Arts Association International (MAA-I) verfüge ich über Abschlüsse als Wing Chun-Trainer. Zusätzliche Qualifikationen, sind Schwarzgurt der World Profi Kick Boxing Association (WPKA). Zudem bin ich Gründer des A.R.S. Systems (All-round-Self Défense).',
          img: omarImg,
          courses:
            'MAA-I | Wing Chun Martial Arts | Chi Sao Kuen Lehrgang (5) | M.A.R.S. | Black belt by World Profi | Founder of the A.R.S. | Instructor für Anti-Amok, Anti-Terror und Anti-Panik',
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
  color: #db1200;
  text-align: center;
  font-weight: bolder;
  margin-bottom: 4rem;
  font-size: 2rem;
}

.bio-box {
  width: 100%;
  aspect-ratio: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #000;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.25s;
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
  color: #fff;
}

.bio-pos {
  font-weight: 500;
  color: red;
  margin-bottom: 1rem;
}

.bio-desc-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 1rem;
}

.bio-desc {
  font-size: 0.95rem;
  font-style: italic;
  color: #888;
  line-height: 1.4;
}

.bio-text {
  font-size: 1.2rem;
}

.bio-courses {
  background-color: #000;
  border-radius: 1rem;
  padding: 1rem;
}
.bio-courses > p {
  color: #fff;
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
    width: calc((100% - 1rem) / 2);
    aspect-ratio: 1 / 2.2;
  }
}
@media (min-width: 768px) {
  .title {
    margin-bottom: 8rem;
    font-size: 3rem;
  }
  .bio-box {
    aspect-ratio: 1 / 1.75;
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
    aspect-ratio: 1 / 2.3;
  }
}

@media (min-width: 1280px) {
  .bio-box {
    aspect-ratio: 1/1.75;
  }
}

.ali-order {
  order: -1;
}

@media (min-width: 1024px) {
  .ali-order {
    order: 0;
  }
}
</style>
