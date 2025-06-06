<template>
  <SectionView backgroundColor="var(--color-primary)">
    <template #content>
      <div class="thanks-wrapper">
        <p class="text">
          Ein besonderes Dankeschön an meinen älteren Bruder Omar, der mir geholfen hat, die Texte
          auf der Homepage zu formulieren, und an meinen kleinen Bruder Moaaz, der die Fotos für die
          Homepage gemacht hat!
        </p>
      </div>
      <ul class="footer-list">
        <li class="footer-item text">
          <router-link to="/legal-notice">Impressum</router-link>
        </li>
        <li class="footer-item text">
          <router-link to="/privacy-policy">Datenschutzerklärung</router-link>
        </li>
      </ul>
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
.text {
  color: white;
  font-size: 1.2rem;
  /* font-style: italic; */
}

.thanks-wrapper {
  background-color: var(--color-primary);
  margin-top: 1rem;
  padding: 1rem;
  border-left: 5px solid var(--color-primary-hover);
}

.footer-list {
  list-style-type: none;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
}

.footer-item a {
  color: white;
}

@media (min-width: 576px) {
  .text {
    font-size: 1.3rem;
  }
}
@media (min-width: 768px) {
  .text {
    font-size: 1.4rem;
  }
}
@media (min-width: 1024px) {
  .text {
    font-size: 1.5rem;
  }
}
</style>
