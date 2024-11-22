<template>
  <div class="navbar" :class="{
    'homepage': $nuxt.$route.path == '/',
    'homepage-hidden': !homeAnimationDone,
    'navbar-hidden': !showNavbar
  }">
    <div class="navbar-content">
      <!-- Logo Section -->
      <div class="index">
        <NuxtLink to="/" class="index-link">
          <div class="index-logo">
            <img src="@/static/icons/logo-thunderstorm-96.svg" alt="Logo" class="logo-image">
          </div>
          
        </NuxtLink> 
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-button"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <!-- Navigation -->
      <div class="links" :class="{ 'is-open': isMobileMenuOpen }">
        <ul>
          <li><NuxtLink to="/about" @click="closeMobileMenu">ABOUT</NuxtLink></li>
          <li>
            <div 
              class="case-studies-wrapper"
              @mouseenter="handleCaseStudiesEnter"
              @mouseleave="handleCaseStudiesLeave"
            >
              <NuxtLink to="/case-studies">
                CASE STUDIES
                <span class="mobile-arrow" :class="{ 'is-open': showMobileSubmenu }">→</span>
              </NuxtLink>
              
              <div 
                class="case-studies-dropdown"
                :class="{ 'active': showCaseStudies }"
              >
                <div class="container">
                  <div class="dropdown-layout">
                    <!-- Left Column -->
                    <div class="dropdown-left">
                      <h2>CASE STUDIES</h2>
                      <div class="quick-links">
                        <NuxtLink 
                          v-for="link in quickLinks" 
                          :key="link.path" 
                          :to="link.path"
                          class="quick-link"
                        >
                          {{ link.title }}
                        </NuxtLink>
                      </div>
                      <NuxtLink to="/case-studies" class="view-all">
                        VIEW ALL CASE STUDIES
                        <span class="icon">→</span>
                      </NuxtLink>
                    </div>

                    <!-- Right Column -->
                    <div class="dropdown-right">
                      <h3>RECENT CASE STUDIES</h3>
                      <div class="recent-studies">
                        <div 
                          v-for="study in recentStudies" 
                          :key="study.id" 
                          class="study-card"
                        >
                          <div class="study-image">
                            <img :src="study.image" :alt="study.title">
                          </div>
                          <div class="study-content">
                            <div class="tag">{{ study.category }}</div>
                            <h4>{{ study.title }}</h4>
                            <div class="meta">
                              {{ study.date }} — {{ study.readTime }}
                            </div>
                            <NuxtLink :to="`/case-studies/${study.slug}`" class="view">
                              VIEW
                              <span class="icon">→</span>
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li><NuxtLink to="/contact" @click="closeMobileMenu">CONTACT</NuxtLink></li>
          <li><NuxtLink to="/moodboard" @click="closeMobileMenu">MOODBOARD</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      showNavbar: true,
      homeAnimationDone: false,
      lastScrollPosition: 0,
      showCaseStudies: false,
      isMobileMenuOpen: false,
      showMobileSubmenu: false,
      dropdownTimeout: null,
      quickLinks: [
        { title: 'DESIGN SYSTEMS', path: '/case-studies/design-systems' },
        { title: 'PRODUCT DESIGN', path: '/case-studies/product-design' },
        { title: 'UX RESEARCH', path: '/case-studies/ux-research' },
        { title: 'BRAND DESIGN', path: '/case-studies/brand-design' }
      ],
      recentStudies: [
        {
          id: 1,
          slug: 'design-system',
          image: "/images/nav.png",
          category: "DESIGN SYSTEM",
          title: "CREATING A SCALABLE DESIGN SYSTEM",
          date: "NOV 12, 2024",
          readTime: "7 MIN READ"
        },
        {
          id: 2,
          slug: 'product-design',
          image: "/images/nav.png",
          category: "PRODUCT DESIGN",
          title: "ENTERPRISE PRODUCT REDESIGN",
          date: "NOV 12, 2024",
          readTime: "7 MIN READ"
        },
        {
          id: 3,
          slug: 'ux-research',
          image: "/images/nav.png",
          category: "UX RESEARCH",
          title: "USER RESEARCH AND INSIGHTS",
          date: "NOV 12, 2024",
          readTime: "7 MIN READ"
        }
      ]
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.handleResize)
    setTimeout(() => {
      this.homeAnimationDone = true
    }, 1000)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.handleResize)
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout)
    }
  },

  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) return
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 16) return
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    },

    handleCaseStudiesEnter() {
      if (window.innerWidth > 768) {
        if (this.dropdownTimeout) {
          clearTimeout(this.dropdownTimeout)
        }
        this.showCaseStudies = true
      }
    },

    handleCaseStudiesLeave() {
      if (window.innerWidth > 768) {
        this.dropdownTimeout = setTimeout(() => {
          this.showCaseStudies = false
        }, 100)
      }
    },

    toggleMobileSubmenu() {
      if (window.innerWidth <= 768) {
        this.showMobileSubmenu = !this.showMobileSubmenu
      }
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false
      this.showMobileSubmenu = false
    },

    handleResize() {
      if (window.innerWidth > 768) {
        this.closeMobileMenu()
      }
    }
  }
}
</script>