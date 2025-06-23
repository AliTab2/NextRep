<template>
  <SectionView backgroundColor="#fff">
    <template #content>
      <h1 class="title">
        Wie ist <strong style="text-decoration: underline">NextRep</strong> entstanden?
      </h1>
      <SectionView backgroundColor="#000">
        <template #content>
          <p class="about-text">
            Ich habe diese Webseite für euch entwickelt, um euch das Leben leichter zu machen!🎉
            Früher gab's bei Kursänderungen immer das Chaos - WhatsApp, Instagram oder Nachrichten,
            die übersehen wurden… Ihr kennt das!
          </p>
          <div class="about-features">
            <p class="about-text about-features-title">
              Jetzt ist Schluss damit. Hier bekommt ihr
              <strong style="text-decoration: underline">alle</strong> Infos schnell und direkt an
              einem Ort:
            </p>
            <ul class="about-list">
              <li class="about-listitem">
                <p class="about-text">
                  <strong>Kursänderungen sofort sehen</strong> - Keine WhatsApp-Nachrichten mehr
                  verpassen!
                </p>
              </li>
              <li class="about-listitem">
                <p class="about-text">
                  <strong>Echtzeit-Updates</strong> - Wenn sich was ändert, seid ihr sofort
                  informiert.
                </p>
              </li>
              <li class="about-listitem">
                <p class="about-text">
                  <strong>Nie wieder durcheinander</strong> - Alle Infos immer griffbereit, ohne
                  ständiges Suchen.
                </p>
              </li>
            </ul>
          </div>
          <p class="about-text about-text-bottom">
            Kurz gesagt: <strong style="text-decoration: underline">Weniger</strong> Stress,
            <strong style="text-decoration: underline">mehr</strong>
            Training!💪
          </p>
        </template>
      </SectionView>
    </template>
  </SectionView>
</template>

<script>
import SectionView from '@/components/Homepage/SectionView.vue'

export default {
  components: {
    SectionView,
  },
}
</script>

<style scoped>
.title {
  color: #db1200;
  text-align: center;
  font-weight: bolder;
  /* font-style: italic; */

  margin-bottom: 4rem;
  font-size: 2rem;
}

.about-text {
  color: #fff;
  font-size: 1.2rem;
  font-style: italic;
}

.about-features {
  /* background-color: red; */
  margin-top: 2rem;
}

.about-features .about-text {
  font-style: normal;
  color: #db1200;
}

.about-features .about-features-title {
  color: #fff;
}

.about-list {
  list-style-type: none;
}
.about-listitem {
  background-color: #fff;
  margin-top: 1rem;
  padding: 1rem;
  border-left: 5px solid #db1200;
}

.about-text-bottom {
  margin-top: 1rem;
}
@media (min-width: 576px) {
  .title {
    margin-bottom: 6rem;
    font-size: 2.5rem;
  }
  .about-text {
    font-size: 1.3rem;
  }
  .about-listitem {
    margin-top: 1.5rem;
    padding: 1.5rem;
  }
  .about-text-bottom {
    margin-top: 1.5rem;
  }
}
@media (min-width: 768px) {
  .title {
    margin-bottom: 8rem;
    font-size: 3rem;
  }
  .about-text {
    font-size: 1.4rem;
  }
  .about-listitem {
    margin-top: 2rem;
    padding: 2rem;
  }
  .about-text-bottom {
    margin-top: 2rem;
  }
}
@media (min-width: 1024px) {
  .title {
    margin-bottom: 8rem;
    font-size: 4rem;
  }
  .about-text {
    font-size: 1.5rem;
  }
  .about-listitem {
    margin-top: 2.5rem;
    padding: 2.5rem;
  }
  .about-text-bottom {
    margin-top: 2.5rem;
  }
}
</style>
