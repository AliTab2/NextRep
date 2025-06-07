<template>
  <SectionView backgroundColor="var(--color-primary-hover)">
    <template #content>
      <h1 class="title">
        Scanne jetzt den QR-Code ein oder klicke auf den Link und werde zum
        <span style="text-decoration: underline">Next-Reper</span>
      </h1>
      <div class="contact-wrapper">
        <div class="contact-left">
          <p class="contact-text">Entweder über den <strong>Link</strong></p>
          <div class="contact-link">
            <font-awesome-icon icon="fa-brands fa-whatsapp" class="contact-icon" />
            <a class="contact-text" :href="whatsappGroupLink">{{ whatsappGroupLink }}</a>
          </div>
        </div>
        <div class="contact-right">
          <p class="contact-text">Oder über den <strong>QR-Code</strong></p>
          <img
            class="contact-qr"
            src="@/assets/imgs/whatsapp_qr.png"
            alt="WhatsApp Groupe QR-Code"
          />
        </div>
      </div>
    </template>
  </SectionView>
</template>

<script>
import SectionView from '@/components/Homepage/SectionView.vue'
// import whatsappQR from '@/assets/imgs/whatsapp_qr.png'

export default {
  components: {
    SectionView,
  },
  data() {
    return {
      whatsappGroupLink: 'https://chat.whatsapp.com/Gc2zcgiX1OMGtqAPvJsJCF',
    }
  },
}
</script>

<style scoped>
.title {
  color: white;
  text-align: center;
  font-weight: bolder;
  margin-bottom: 4rem;
  font-size: 2rem;
}

.contact-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  gap: 2rem;
}
.contact-left {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.contact-right {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
}

.contact-text {
  color: white;
  font-size: 1.2rem;
}

.contact-link {
  background-color: var(--color-primary);
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}
.contact-icon {
  font-size: 2rem;
}

.contact-qr {
  width: 80%;
  max-width: 30rem;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  height: auto;
}

@media (min-width: 576px) {
  .title {
    margin-bottom: 6rem;
    font-size: 2.5rem;
  }
  .contact-text {
    font-size: 1.3rem;
  }
}
@media (min-width: 768px) {
  .title {
    margin-bottom: 8rem;
    font-size: 3rem;
  }
  .contact-box {
    width: calc((100% - 2rem) / 3);
  }
  .contact-text {
    font-size: 1.4rem;
  }
}
@media (min-width: 1024px) {
  .title {
    margin-bottom: 8rem;
    font-size: 4rem;
  }
  .contact-text {
    font-size: 1.5rem;
  }
  .contact-wrapper {
    gap: 0rem;
  }
}
</style>
