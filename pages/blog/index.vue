<template lang="html">
    <div class="blog-page">
      <section class="blog">
        <div class="container">
          <div class="blog-intro">
            <h1 class="blog-intro-title heading-1 text-primary-dark">Blogs</h1>
            <p class="blog-intro-desc body text-quaternary-dark">
              Find here my thoughts about design operations and bridges between design and code. Also kind of a public reflection journal.
            </p>
          </div>
  
          <div class="blog-list">
            <article v-for="blog in blogs" :key="blog.fields.slug" class="blog-item">
              <div class="blog-meta">
                <p class="blog-date caption text-tertiary-dark">{{ getHumanDate(blog.fields.publishDate) }}</p>
              </div>
              <h2 class="blog-title heading-2 text-secondary-dark">
                <nuxt-link :to="'/blog/' + blog.fields.slug">
                  {{ blog.fields.title }}
                  <svg class="icon" aria-hidden="true" focusable="false">
                    <use xlink:href="@/static/icons/sprite.svg#arrow-forward-20"></use>
                  </svg>
                </nuxt-link>
              </h2>
              <p v-if="blog.fields.excerpt" class="blog-excerpt body text-quaternary-dark">
                {{ blog.fields.excerpt }}
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  import gsap from 'gsap'
  import ScrollTrigger from 'gsap/ScrollTrigger'
  
  export default {
    name: 'BlogIndex',
  
    data() {
      return {
        blogs: [
          {
            fields: {
              title: "How the Internet Archive's",
              slug: "internet-archive-library",
              publishDate: "2024-03-15",
              excerpt: "People need to anticipate the revolution that's coming in how humans and AI will think's coming in how humans"
            }
          },
          {
            fields: {
              title: "The West needs more water. This Nobel winner may have the answer",
              slug: "west-water-solution",
              publishDate: "2024-03-10",
              excerpt: "A breakthrough in water purification could help address growing shortages"
            }
          }
        ]
      }
    },
  
    head() {
      return {
        title: 'Praveen Manchi — Blog',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Find my thoughts about design operations and bridges between design and code.'
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: 'Praveen Manchi — Blog',
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: 'Find my thoughts about design operations and bridges between design and code.',
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: 'https://ycsfwdainpwgmgsjqppv.supabase.co/storage/v1/object/public/OG-images/home-og.png',
          },
          {
            hid: 'og:url',
            name: 'og:url',
            content: 'https://praveenmanchi.art/blog/',
          },
        ]
      }
    },
  
    methods: {
      getHumanDate(date) {
        return moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY')
      },
  
      initAnimations() {
        gsap.registerPlugin(ScrollTrigger)
  
        const tl = gsap.timeline()
        
        // Intro animations
        tl.from('.blog-intro-title', {
          y: 30,
          opacity: 0,
          duration: 0.6
        }).from('.blog-intro-desc', {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, '-=0.3')
  
        // Blog items stagger animation
        gsap.from('.blog-item', {
          scrollTrigger: {
            trigger: '.blog-list',
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2
        })
      }
    },
  
    mounted() {
      this.$nextTick(() => {
        this.initAnimations()
      })
    }
  }
  </script>