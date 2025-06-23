<template>
  <div>
    <HeroSection />
    <CoursesSection />
    <BioSection />
    <AboutSection />
    <ContactSection />
    <EndSection />
  </div>
</template>

<script>
import { coursesList, coursesWidgetsList } from '@/utils/base.js'
import HeroSection from '@/components/Homepage/HeroSection.vue'
import CoursesSection from '@/components/Homepage/CoursesSection.vue'
import BioSection from '@/components/Homepage/BioSection.vue'
import AboutSection from '@/components/Homepage/AboutSection.vue'
import ContactSection from '@/components/Homepage/ContactSection.vue'
import EndSection from '@/components/Homepage/EndSection.vue'

export default {
  components: {
    HeroSection,
    CoursesSection,
    BioSection,
    AboutSection,
    ContactSection,
    EndSection,
    // SectionView
  },
  data() {
    return {
      courses: coursesList.map((c) => ({ ...c })),
      coursesWidgets: JSON.parse(JSON.stringify(coursesWidgetsList)),
    }
  },
}
</script>

<style scoped></style>
