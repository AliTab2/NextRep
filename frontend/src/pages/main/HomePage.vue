<template>
  <div>
    <HeroBanner />
    <FeaturedCourses />
    <TrainerBio />
    <AboutBlock />
    <JoinUs />
    <PageFooter />
  </div>
</template>

<script>
import { coursesList, coursesWidgetsList } from '@/utils/base.js'
import HeroBanner from '@/components/homepage/HeroBanner.vue'
import FeaturedCourses from '@/components/homepage/FeaturedCourses.vue'
import TrainerBio from '@/components/homepage/TrainerBio.vue'
import AboutBlock from '@/components/homepage/AboutBlock.vue'
import JoinUs from '@/components/homepage/JoinUs.vue'
import PageFooter from '@/components/homepage/PageFooter.vue'

export default {
  components: {
    HeroBanner,
    FeaturedCourses,
    TrainerBio,
    AboutBlock,
    JoinUs,
    PageFooter,
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
