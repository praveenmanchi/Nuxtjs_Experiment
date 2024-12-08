<template>
    <div class="moodboard">
      <section class="moodboard-playground">
        <div class="content-wrapper">
          <div class="container">
            <!-- Disclaimer Section -->
            <div class="playground-instructions centered-content">
              <div class="human-intro">
                <p class="intro-subtitle caption text-center">
                  sharing is definitely
                  <span class="line-breaker"><br /></span>
                  not caring
                </p>
                
                <h2 class="human-intro-title heading-1 text-primary-dark text-center">
                  Disclaimer & Note
                </h2>
                
                <p class="desc body text-quaternary-dark text-center">
                  The UI screens you are about to view are the exclusive property of the respective 
                  companies involved in this work. These designs represent the hard work and creativity 
                  of mine and are protected under intellectual property laws. Any misuse, unauthorized 
                  reproduction, or replication is strictly prohibited.
                </p>
                
                <p class="desc body text-quaternary-dark text-center">
                  Any violations will be met with legal action faster than you can say, "I didn't mean to!" 
                  We trust you'll respect the efforts of all parties involved and help ME keep this work 
                  secure, because in this case, sharing is definitely not caring.
                </p>
              </div>
  
              <!-- Icons Section -->
              <div class="playground-commands">
                <picture class="icon-wrapper">
                  <source type="image/jpeg" srcset="@/static/icons/note.svg">
                  <img src="@/static/icons/note.svg" alt="Note icon">
                </picture>
                <picture class="icon-wrapper">
                  <source type="image/jpeg" srcset="@/static/icons/note2.svg">
                  <img src="@/static/icons/note2.svg" alt="Secondary note icon">
                </picture>
              </div>
            </div>
            
            <!-- Key Validation Section -->
            <div class="key-validation-container centered-content">
              <p class="desc body text-quaternary-dark text-center">
                Enter Super key shared with you
              </p>
              
              <div class="key-input-wrapper">
                <input 
                  v-model="superKey" 
                  type="text" 
                  placeholder="Enter super key"
                  class="super-key-input"
                  v-on:keydown="validateKey()"
                  v-on:keyup="validateKey()"
                  v-on:change="validateKey()"
                 
                >
                <!-- <SuperButton 
                  @click="validateKey" 
                  class="validate-button" 
                  variant="primary dark"
                  :disabled="isLoading"
                  
                >
                  {{ isLoading ? 'Validating...' : 'Proceed' }}
                </SuperButton> -->
                
              </div>
              
              <p v-if="errorMessage" class="error-message text-center">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  // Script remains unchanged
  import SuperButton from '@/components/SuperButton.vue'

  export default {
    name: 'NDAValidation',
    
    components: {
      SuperButton
    },
    
    data() {
      return {
        superKey: '',
        errorMessage: '',
        isLoading: false
      }
    },
  
    methods: {
      async validateKey() {

        if (!this.superKey?.trim()) {
          this.errorMessage = 'Please enter an access code'
          return
        }
  
        try {
          this.isLoading = true
          this.errorMessage = ''
          
          // const validKey = this.$config.validKey
          const validKey = 'MANCHI007'
          console.log('validatekey',validKey,this.superKey);
          
          if (this.superKey === validKey) {
            localStorage.setItem('ndaValidated', 'true')
            await this.$router.push('/nda/protectedpage')
          } else {
            this.errorMessage = 'Invalid access code. Please try again.'
            this.superKey = ''
          }
        } catch (error) {
          console.error('Validation error:', error)
          this.errorMessage = 'An error occurred. Please try again.'
        } finally {
          this.isLoading = false
        }
      },
    }
  }
 
  </script>
  
  <style lang="sass" scoped>
  // Layout
  .moodboard-playground
    width: 100%
    // min-height: 170vh
    display: flex
    justify-content: center
    align-items: center

  
  .content-wrapper
    width: 100%
    max-width: 1325px
    margin: 0 auto
    padding: 6px // Reduced padding
  
  .centered-content
    display: flex
    flex-direction: column
    align-items: center
    text-align: center
    // margin: 0 auto
    // max-width: 800px
  
  // Playground Instructions
  .playground-commands
    display: flex
    justify-content: center
    align-items: center
    gap: 6px // Reduced gap
    margin: 6px auto // Reduced margin
  
  .icon-wrapper
    display: flex
    justify-content: center
    align-items: center
    
    img
      max-width: 100%
      height: auto
  
  // Key Validation
  .key-validation-container
    margin: 6px auto // Reduced margin
    display: flex
    flex-direction: column
    align-items: center
    gap: 6px // Reduced gap
  
  .key-input-wrapper
    display: flex
    gap: 6px // Reduced gap
    align-items: center
    justify-content: center
  
  .super-key-input
    min-width: 280px
    padding: 6px // Reduced padding
    border: 1px solid rgba(255, 255, 255, 0.1)
    border-radius: 4px
    background: #020202
    color: #fff
    font-size: 16px
    text-align: center
    
    &:focus
      outline: none
      border-color: rgba(255, 255, 255, 0.3)
  
  // Typography
  .text-center
    text-align: center
  
  .error-message
    color: #ff4444
    font-size: 14px
    margin: 6px 0 // Reduced margin
  
  // Spacing
  .human-intro
    margin-bottom: 6px // Reduced margin
  
  .desc
    margin: 6px 0 // Reduced margin
  
  .intro-subtitle
    margin-bottom: 6px // Reduced margin
  
  .human-intro-title
    margin: 6px 0 // Reduced margin
  </style>