<template>
    <div class="case-study-page">
      <!-- Hero Section -->
      <div class="hero-section" ref="hero">
        <div class="container">
          <h1 class="display-1" ref="title">{{ caseStudy.title }}</h1>
          <div class="hero-meta">
            <div class="meta-item" v-for="(item, index) in heroMeta" :key="index" ref="metaItems">
              <span class="label">{{ item.label }}</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Introduction -->
      <section class="section introduction" ref="intro">
        <div class="container">
          <h2 class="heading-2">Introduction</h2>
          <p class="body-text">{{ caseStudy.introduction }}</p>
        </div>
      </section>
  
      <!-- Challenges -->
      <section class="section challenges" ref="challenges">
        <div class="container">
          <h2 class="heading-2">Challenges</h2>
          <div class="challenges-grid">
            <div v-for="(challenge, index) in caseStudy.challenges" 
                 :key="index" 
                 class="challenge-card"
                 ref="challengeCards">
              <h3 class="heading-3">{{ challenge.title }}</h3>
              <p class="body-text">{{ challenge.description }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Process Images -->
      <section class="section process" ref="process">
        <div class="container">
          <h2 class="heading-2">Process & Solutions</h2>
          <div class="image-gallery">
            <img v-for="(image, index) in caseStudy.processImages" 
                 :key="index"
                 :src="image.url"
                 :alt="image.alt"
                 class="process-image"
                 ref="processImages" />
          </div>
        </div>
      </section>
  
      <!-- Results -->
      <section class="section results" ref="results">
        <div class="container">
          <h2 class="heading-2">Results & Impact</h2>
          <div class="results-stats">
            <div v-for="(stat, index) in caseStudy.results" 
                 :key="index"
                 class="stat-card"
                 ref="statCards">
              <h3 class="stat-value">{{ stat.value }}</h3>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'
  
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
  }
  
  export default {
    name: 'CaseStudy',
  
    data() {
      return {
        caseStudyData: {
          'audience-platform': {
            title: 'Harness the Potential of Big Data with cutting-edge Ad-Ops Solutions',
            role: 'Head Of Design',
            timeline: '2019 - 2023',
            industry: 'AdTech',
            introduction: 'As the second employee at Audience Platform, I took on the responsibilities of both a product designer and a front-end engineer...',
            challenges: [
              {
                title: 'Complex System Design',
                description: 'One of the main hurdles was transforming a single proof of concept prototype into a cutting-edge product ecosystem...'
              },
              {
                title: 'Brand Evolution',
                description: 'Additionally, I was tasked with redefining the brand vision and product structure...'
              }
            ],
            processImages: [
              {
                url: '/images/case-studies/audience-platform/dashboard.jpg',
                alt: 'Dashboard Interface'
              },
              {
                url: '/images/case-studies/audience-platform/before-after.jpg',
                alt: 'Brand Evolution'
              }
            ],
            results: [
              {
                value: '240%',
                label: 'Revenue Increase'
              },
              {
                value: '2550x',
                label: 'Team Growth'
              }
            ]
          }
          // Add more case studies here
        }
      }
    },
  
    computed: {
      caseStudy() {
        return this.caseStudyData[this.$route.params.id] || {}
      },
      heroMeta() {
        return [
          { label: 'Role', value: this.caseStudy.role },
          { label: 'Timeline', value: this.caseStudy.timeline },
          { label: 'Industry', value: this.caseStudy.industry }
        ]
      }
    },
  
    mounted() {
      this.$nextTick(() => {
        this.initAnimations()
      })
    },
  
    methods: {
      initAnimations() {
        // Hero animations
        gsap.from(this.$refs.title, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power4.out'
        })
  
        gsap.from(this.$refs.metaItems, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3
        })
  
        // Scroll animations
        const sections = [
          this.$refs.intro,
          this.$refs.challenges,
          this.$refs.process,
          this.$refs.results
        ]
  
        sections.forEach(section => {
          gsap.from(section.querySelector('.heading-2'), {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          })
        })
  
        // Challenge cards animation
        if (this.$refs.challengeCards) {
          gsap.from(this.$refs.challengeCards, {
            scrollTrigger: {
              trigger: this.$refs.challenges,
              start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          })
        }
  
        // Process images animation
        if (this.$refs.processImages) {
          gsap.from(this.$refs.processImages, {
            scrollTrigger: {
              trigger: this.$refs.process,
              start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          })
        }
  
        // Stats animation
        if (this.$refs.statCards) {
          gsap.from(this.$refs.statCards, {
            scrollTrigger: {
              trigger: this.$refs.results,
              start: 'top 70%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          })
        }
      }
    }
  }
  </script>
  
  <style lang="sass" scoped>
.case-study-page
  background: #111
  color: #fff

.hero-section
  padding: 120px 0
  background: #000
  
  .container
    max-width: 1200px
    margin: 0 auto
    padding: 0 24px

  .display-1
    margin-bottom: 48px
    opacity: 0
    transform: translateY(30px)
    animation: fadeInUp 0.8s ease forwards

.hero-meta
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
  gap: 32px
  
  .meta-item
    opacity: 0
    transform: translateY(20px)
    animation: fadeInUp 0.8s ease forwards
    animation-delay: 0.2s
    
    .label
      display: block
      font-size: 14px
      text-transform: uppercase
      margin-bottom: 8px
      opacity: 0.6
    
    .value
      font-size: 18px
      font-weight: 500

.section
  padding: 80px 0
  
  .container
    max-width: 1200px
    margin: 0 auto
    padding: 0 24px

  .heading-2
    margin-bottom: 48px
    opacity: 0
    transform: translateY(20px)
    animation: fadeInUp 0.8s ease forwards

.challenges-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  gap: 32px

.process-image
  width: 100%
  height: auto
  margin-bottom: 32px
  border-radius: 8px
  opacity: 0
  transform: translateY(20px)
  animation: fadeInUp 0.8s ease forwards

.results-stats
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
  gap: 32px
  text-align: center
  
  .stat-card
    padding: 32px
    background: rgba(255, 255, 255, 0.05)
    border-radius: 8px
    opacity: 0
    transform: translateY(20px)
    animation: fadeInUp 0.8s ease forwards
    
    .stat-value
      font-size: 48px
      font-weight: 700
      margin-bottom: 8px
      color: #4A90E2
    
    .stat-label
      font-size: 16px
      opacity: 0.8

@keyframes fadeInUp
  from
    opacity: 0
    transform: translateY(20px)
  to
    opacity: 1
    transform: translateY(0)

// Responsive styles
@media (max-width: 768px)
  .hero-section
    padding: 80px 0
    
  .section
    padding: 60px 0
    
  .hero-meta
    grid-template-columns: 1fr
    gap: 24px
</style>