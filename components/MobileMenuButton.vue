<template>
    <button 
      class="mobile-menu-button"
      :class="{ 'is-open': isOpen }" 
      @click="$emit('click')"
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </template>
  
  <script>
  export default {
    name: 'MobileMenuButton',
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    }
  }
  </script>
  
  <style lang="sass" scoped>
  .mobile-menu-button
    display: none
    padding: $space-xs
    background: none
    border: none
    cursor: pointer
    
    +adapt-reverse($bkp-tablet)
      display: block
      position: relative
      width: 24px
      height: 24px
      
    span
      display: block
      position: absolute
      width: 24px
      height: 2px
      background: white
      transition: all $time-quick $speed-emphasized
      
      &:first-child
        top: 6px
      
      &:nth-child(2)
        top: 11px
      
      &:last-child
        top: 16px
    
    &.is-open
      span
        &:first-child
          top: 11px
          transform: rotate(45deg)
        
        &:nth-child(2)
          opacity: 0
        
        &:last-child
          top: 11px
          transform: rotate(-45deg)
  </style>