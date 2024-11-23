<template lang="html">
  <div class="footer" style="border-top: 1px solid hsl(216, 47%, 13%)">
    <div class="container" style="display: flex; flex-direction: column">
      <div class="footer-links" style="display: flex; flex-direction: row; justify-content: space-between;">
        <div class="footer-copyright">
          <p class="footer-copyrightTitle">PRAVEEN MANCHI</p>
          <p class="footer-copyrightDesc">The rights reservation for this project is currently pending.</p>
          <!-- <div class="footer-copyrightLogo">
            <span>PM</span>
          </div> -->
        </div>
        <div class="footer-explore">
          <p class="footer-exploreTitle">IN THIS SPACE</p>
          <ul class="footer-exploreLinks">
            <li><nuxt-link to="/works">Discover my work</nuxt-link></li>
            <li><nuxt-link to="/process">Learn about my process</nuxt-link></li>
            <li><nuxt-link to="/about">Know more about me</nuxt-link></li>
            <li><nuxt-link to="/notes">Read my notes</nuxt-link></li>
            <li><nuxt-link to="/contact">Get in touch</nuxt-link></li>
          </ul>
        </div>
        <div class="footer-follow">
          <p class="footer-followTitle">FOLLOW MY WORK</p>
          <ul class="footer-followLinks">
            <li><a href="https://twitter.com/yannglt" target="_blank">Thoughts on Twitter</a></li>
            <li><a href="https://dribbble.com/yannglt" target="_blank">WIPs on Dribbble</a></li>
          </ul>
          <div class="footer-social">
      <p class="footer-socialTitle">OTHER INTERNET SAPCE</p>
      <div class="footer-socialIcons">
        <a href="#" target="_blank" class="social-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <use xlink:href="@/static/icons/figma.svg#icon"></use>
          </svg>
        </a>
        <a href="#" target="_blank" class="social-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <use xlink:href="@/static/icons/Github.svg#icon"></use>
          </svg>
        </a>
        <a href="#" target="_blank" class="social-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <use xlink:href="@/static/icons/layers.svg#icon"></use>
          </svg>
        </a>
        <a href="#" target="_blank" class="social-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <use xlink:href="@/static/icons/readme.svg#icon"></use>
          </svg>
        </a>
        <a href="#" target="_blank" class="social-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <use xlink:href="@/static/icons/twitter.svg#icon"></use>
          </svg>
        </a>
      </div>
    </div>
        </div>
      </div>
      <div class="footer-bottom" style="display: flex; flex-direction: row; justify-content: space-between; border: 0px">
        <p>© 2024 Praveen Manchi · <nuxt-link to="/changelog">Changelog</nuxt-link></p>
        <div class="footer-colorbar"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>