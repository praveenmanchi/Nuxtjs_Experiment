<template lang="html">
  <div class="slides">
    <div class="slides-view" ref="slidesView">
      <div 
        v-for="slide in slides" 
        :key="slide.id" 
        class="slide" 
        :class="{ prevSlide: slide.id == index - 1, activeSlide: slide.id == index, nextSlide: slide.id == index + 1 }"
        :style="'left: calc(' + ((slide.id + 1) * 40 - 40) + 'px + ' + ((slide.id + 1) * 100 - 100) + '%); transform: translateX(calc(' + (-index * 40) + 'px + ' + (-index * 100) + '%));'"
        ref="slides"
      >
        <div class="reveal-wrapper" ref="clientReveal">
          <p class="project-client caption text-secondary-light">{{ slide.client }}</p>
        </div>

        <div class="project-subwrap">
          <div class="reveal-wrapper" ref="titleReveal">
            <div class="title heading-2 text-primary-light">{{ slide.title }}</div>
          </div>

          <div class="reveal-wrapper" ref="infosReveal">
            <div class="project-infos">
              <div class="properties">
                <div class="property position">
                  <p class="attribute caption text-tertiary-light">Position</p>
                  <p class="value text-secondary-light">{{ slide.position }}</p>
                </div>
                <div class="property expertise">
                  <p class="attribute caption text-tertiary-light">Expertise</p>
                  <p class="value text-secondary-light">{{ slide.expertise }}</p>
                </div>
                <div class="property duration">
                  <p class="attribute caption text-tertiary-light">Duration</p>
                  <p class="value text-secondary-light">{{ slide.duration }} months</p>
                </div>
              </div>
              <div class="project-links" ref="linksReveal">
                <SuperButton v-if="!slide.nda" class="case-study" variant="primary" icon="#arrow-forward-20">Read case study</SuperButton>
                <SuperButton v-if="slide.nda" class="nda" variant="primary locked" icon="#forbidden-20">Work Under NDA</SuperButton>
                <SuperButton v-if="slide.link" class="case-live" variant="secondary light icon-only" icon="#external-link-20"></SuperButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slides-navigator">
      <div class="progress">
        <div class="progress-current" :style="'width: calc(' + (index + 1) / slidesCount * 100 + '%)'"></div>
      </div>
      <div class="current-navs">
        <div class="current caption">
          00<span 
            v-for="slide in slides" 
            :key="slide.id" 
            class="slideNumber caption" 
            :class="{ activeNumber: slide.id == index }" 
            :style="'bottom: calc(' + ((-slide.id + 1) * 50 - 50) + '%); transform: translateY(calc(' + (-index * 50) + '%))'"
          >{{ slide.id + 1 }}</span>
          <span class="total caption"> &nbsp;/ 00{{ slidesCount }}</span>
        </div>
        <div class="navs">
          <button class="next" :disabled="index == slidesCount - 1" @click="next">
            <svg class="icon" aria-hidden="true" focusable="false">
              <use xlink:href="@/static/icons/sprite.svg#arrow-forward-20"></use>
            </svg>
          </button>
          <button class="prev" :disabled="index == 0" @click="previous">
            <svg class="icon" aria-hidden="true" focusable="false">
              <use xlink:href="@/static/icons/sprite.svg#arrow-backward-20"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SuperButton from '../components/SuperButton.vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'ProjectSlider',

  components: {
    SuperButton
  },

  data() {
    return {
      index: 0,
      slides: [
        { id: 0,
          client: 'Abu Dhabi Executive Office',
          title: 'Help designers and developers create consistent experiences and interfaces through meaningful guidelines',
          position: 'Lead Designer',
          expertise: 'Design Systems',
          duration: '6',
          link: '',
          caseStudy: '',
          nda: true
        },
        { id: 1,
          client: 'BNP Paribas',
          title: 'Make the vision of Customer Experience for 2024 real, from user and business insights to a high-fidelity prototype',
          position: 'Product Designer',
          expertise: 'Product Design',
          duration: '4',
          link: '',
          caseStudy: '',
          nda: true
        },
        { id: 2,
          client: 'Indépendants.co',
          title: 'Build a website for the french syndicate defending independent workers, clarifying its goals and views',
          position: 'Designer',
          expertise: 'UX/UI Design',
          duration: '2',
          link: '',
          caseStudy: '',
          nda: false
        },
        { id: 3,
          client: 'BPCE · Banque Populaire',
          title: 'Define the 2021 roadmap for bank advisors support mobile app, then build a high-fidelity prototype',
          position: 'Product Designer',
          expertise: 'Strategic Design',
          duration: '3',
          link: '',
          caseStudy: '',
          nda: true
        }
      ],
      touch: {
        startX: 0,
        endX: 0,
      },
      mouse: {
        mouseIsDown: false,
        startX: 0,
        endX: 0
      },
      threshold: 30,
      timeline: null
    }
  },

  computed: {
    slidesCount() {
      return this.slides.length
    }
  },

  methods: {
    initGSAP() {
      // Initial setup for reveal animations
      gsap.set(this.$refs.slidesView.querySelectorAll('.reveal-wrapper'), {
        overflow: 'hidden'
      })

      // Set initial states for elements
      gsap.set([
        '.project-client',
        '.title',
        '.project-infos',
        '.project-links'
      ], {
        y: 100,
        opacity: 0
      })
    },

    animateSlide() {
      // Kill previous timeline if it exists
      if (this.timeline) {
        this.timeline.kill()
      }

      // Create new timeline
      this.timeline = gsap.timeline({
        defaults: {
          ease: 'power4.out',
          duration: 0.8
        }
      })

      const currentSlide = this.$refs.slides[this.index]
      if (!currentSlide) return

      // Select elements to animate
      const elements = {
        client: currentSlide.querySelector('.project-client'),
        title: currentSlide.querySelector('.title'),
        infos: currentSlide.querySelector('.project-infos'),
        links: currentSlide.querySelector('.project-links')
      }

      // Create staggered animation sequence
      this.timeline
        .to(elements.client, {
          y: 0,
          opacity: 1,
          duration: 0.6
        })
        .to(elements.title, {
          y: 0,
          opacity: 1,
          duration: 0.6
        }, '-=0.4')
        .to(elements.infos, {
          y: 0,
          opacity: 1,
          duration: 0.6
        }, '-=0.4')
        .to(elements.links, {
          y: 0,
          opacity: 1,
          duration: 0.6
        }, '-=0.4')
    },

    goto(dest) {
      this.index = dest
      this.$nextTick(() => {
        this.animateSlide()
      })
    },

    next() {
      if (this.index < this.slidesCount - 1) {
        this.index++
        this.$nextTick(() => {
          this.animateSlide()
        })
      }
    },

    previous() {
      if (this.index > 0) {
        this.index--
        this.$nextTick(() => {
          this.animateSlide()
        })
      }
    },

    // Touch handlers
    touchstart(event) {
      this.touch.startX = event.touches[0].clientX
      this.touch.endX = 0
    },

    touchmove(event) {
      this.touch.endX = event.touches[0].clientX
    },

    touchend() {
      if (this.touch.endX === 0) return false
      if (this.touch.endX < this.touch.startX) {
        if (this.touch.startX - this.touch.endX >= this.threshold) {
          this.next()
        }
      } else {
        if (this.touch.endX - this.touch.startX >= this.threshold) {
          this.previous()
        }
      }
    },

    // Mouse handlers
    mousedown(event) {
      this.mouseIsDown = true
      this.mouse.startX = event.clientX
      this.mouse.endX = 0
    },

    mousemove(event) {
      if (!this.mouseIsDown) return false
      this.mouse.endX = event.clientX
    },

    mouseup() {
      if (this.mouse.endX === 0) return false
      this.mouseIsDown = false
      if (this.mouse.endX < this.mouse.startX) {
        if (this.mouse.startX - this.mouse.endX >= this.threshold) {
          this.next()
        }
      } else {
        if (this.mouse.endX - this.mouse.startX >= this.threshold) {
          this.previous()
        }
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      // Initialize GSAP
      this.initGSAP()
      this.animateSlide()

      // Set up event listeners using refs
      const slidesView = this.$refs.slidesView
      if (slidesView) {
        slidesView.addEventListener('touchstart', this.touchstart)
        slidesView.addEventListener('touchmove', this.touchmove)
        slidesView.addEventListener('touchend', this.touchend)
        slidesView.addEventListener('mousedown', this.mousedown)
        slidesView.addEventListener('mousemove', this.mousemove)
        slidesView.addEventListener('mouseup', this.mouseup)
        slidesView.addEventListener('mouseleave', this.mouseup)
      }
    })
  },

  beforeDestroy() {
    // Cleanup GSAP
    if (this.timeline) {
      this.timeline.kill()
    }

    // Remove event listeners
    const slidesView = this.$refs.slidesView
    if (slidesView) {
      slidesView.removeEventListener('touchstart', this.touchstart)
      slidesView.removeEventListener('touchmove', this.touchmove)
      slidesView.removeEventListener('touchend', this.touchend)
      slidesView.removeEventListener('mousedown', this.mousedown)
      slidesView.removeEventListener('mousemove', this.mousemove)
      slidesView.removeEventListener('mouseup', this.mouseup)
      slidesView.removeEventListener('mouseleave', this.mouseup)
    }
  }
}
</script>


<style lang="sass" scoped>
.slides
  position: relative
  width: 100%
  overflow: hidden

.slides-view
  position: relative
  width: 100%
  cursor: grab
  
  &:active
    cursor: grabbing

.slide
  position: absolute
  width: 100%
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)
  
  &.prevSlide
    pointer-events: none
    
  &.activeSlide
    z-index: 2
    
  &.nextSlide
    pointer-events: none

.reveal-wrapper
  overflow: hidden
  will-change: transform
  transform-style: preserve-3d

.project-client
  margin-bottom: 24px
  will-change: transform, opacity

.project-subwrap
  .title
    margin-bottom: 40px
    will-change: transform, opacity

.project-infos
  display: flex
  flex-direction: column
  gap: 40px
  will-change: transform, opacity

  .properties
    display: grid
    grid-template-columns: repeat(3, 1fr)
    gap: 24px

    .property
      .attribute
        margin-bottom: 8px

.project-links
  display: flex
  gap: 16px
  will-change: transform, opacity

.slides-navigator
  position: relative
  margin-top: 40px

  .progress
    height: 2px
    background: rgba(255, 255, 255, 0.1)
    margin-bottom: 16px
    
    &-current
      height: 100%
      background: white
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1)

  .current-navs
    display: flex
    justify-content: space-between
    align-items: center

    .current
      position: relative
      height: 20px
      overflow: hidden
      
      .slideNumber
        position: absolute
        left: 24px
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)
        
        &.activeNumber
          color: white

    .navs
      display: flex
      gap: 16px

      button
        padding: 8px
        background: none
        border: none
        cursor: pointer
        opacity: 0.5
        transition: opacity 0.3s ease
        
        &:hover
          opacity: 1
          
        &:disabled
          opacity: 0.2
          cursor: not-allowed

        .icon
          width: 20px
          height: 20px
          fill: white
</style>
