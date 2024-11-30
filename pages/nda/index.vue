<template>
  <div id="moodboard">
    <section class="moodboardPlayground">
      <div class="background-svg"></div>
      <div class="content-wrapper">
        <div class="container">
          <div class="playground-instructions">
            <div class="human-intro">
              <p class="intro-subtitle caption">sharing is definitely  <span class="line-breaker"><br /></span>not caring</p>
              <h2 class="human-intro-title heading-1 text-primary-dark">Disclaimer & Note</h2>
              <p class="desc body text-quaternary-dark" style="text-align: center;">The UI screens you are about to view are the exclusive property of the respective companies involved in this work. These designs represent the hard work and creativity of mine and are protected under intellectual property laws. Any misuse, unauthorized reproduction, or replication is strictly prohibited. </p> 
              <p class="desc body text-quaternary-dark">Please! Any violations will be met with legal action faster than you can say, "I didn’t mean to!" We trust you’ll respect the efforts of all parties involved and help ME keep this work secure, because in this case, sharing is definitely not caring.</p>         
            </div>
            <div class="playground-commands" style="display: flex; justify-content: center; align-items: center; gap: 20px; margin: 20px auto;">
              <picture>
                <source type="image/jpeg" srcset="@/static/icons/note.svg">
                <img src="@/static/icons/note.svg" alt="">
              </picture>
              <picture>
                <source type="image/jpeg" srcset="@/static/icons/note2.svg">
                <img src="@/static/icons/note2.svg" alt="">
              </picture>
            </div>
            
          </div>
          
          <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; margin: 20px 0; gap: 20px;">
            <div>
                <p class="desc body text-quaternary-dark" style="text-align: center;">Enter Super key shared with you</p>
            </div>
            <div style="display: flex; justify-content: center; gap: 20px;">
              <input 
                v-model="superKey" 
                type="text" 
                placeholder="super Key"
                class="super-key-input"
                style="padding: 10px; border-radius: 4px; border: 1px solid #ccc;"
              >
              <SuperButton 
                @click="validateKey" 
                class="contact" 
                variant="primary dark" 
                icon="#arrow-20"
              >Proceed</SuperButton>
            </div>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  
  <script>
    import SuperButton from '@/components/SuperButton.vue'
    import Inspiration from '@/components/Inspiration.vue'
  
    export default {
      data: function () {
        return {
          inspirationsImages: [ ],
          maxZIndex: 0,
          superKey: '',
          errorMessage: ''
        }
      },
  
      head() {
        return {
          title: 'Praveen Manchi — Moodboard',
          meta: [
            {
              hid: 'og:title',
              name: 'og:title',
              content: 'Praveen Manchi — Moodboard',
            },
            {
              hid: 'twitter:title',
              name: 'twitter:title',
              content: 'Praveen Manchi — Moodboard',
            },
            {
              hid: 'og:image',
              name: 'og:image',
              content: 'https://ycsfwdainpwgmgsjqppv.supabase.co/storage/v1/object/public/OG-images/home-og.png',
            },
            {
              hid: 'twitter:image',
              name: 'twitter:image',
              content: 'https://ycsfwdainpwgmgsjqppv.supabase.co/storage/v1/object/public/OG-images/home-og.png',
            },
            {
              hid: 'og:url',
              name: 'og:url',
              content: 'https://praveenmanchi.art/moodboard/',
            },
          ]
        }
      },
  
      methods: {
        importAll(r) {
          r.keys().forEach(key => (this.inspirationsImages.push({ pathLong: r(key) })))
        },
  
        resetInspirations: function() {
          this.$refs.inspiration.forEach((inspiration) => {
            inspiration.setPosition()
          })
        },
  
        incrementZIndex: function(target) {
          this.maxZIndex++
          target.style.zIndex = this.maxZIndex
        },
  
        validateKey() {
          // Debug logs
          console.log('Validate key clicked');
          console.log('Entered key:', this.superKey);
          console.log('Valid key:', this.$config.validKey);

          if (!this.superKey || this.superKey.trim() === '') {
            this.errorMessage = 'Please enter an access code.';
            return;
          }

          try {
            if (this.superKey === this.$config.validKey) {
              console.log('Valid key entered, attempting navigation...');
              this.$router.push('/nda/moodboard');
            } else {
              console.log('Invalid key entered');
              this.errorMessage = 'Invalid access code. Please try again.';
              this.superKey = '';
            }
          } catch (error) {
            console.error('Navigation error:', error);
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      },
  
      mounted() {
        // Debug log to check if config is loaded
        console.log('Config loaded:', this.$config);
        console.log('Valid key from config:', this.$config.validKey);
        this.importAll(require.context('@/static/images/moodboard/', true, /\.(png|jpg)$/))
      },
  
      components: {
        SuperButton,
        Inspiration
      }
    }
  
  </script>

  <style scoped>
    .moodboardPlayground {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 2rem;
    }

    .background-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 4rem);
      height: 100%;
      background-image: url('/icons/background.svg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.7;
      z-index: 0;
    }

    .content-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .super-key-input {
      min-width: 250px;
      font-size: 16px;
    }

    .super-key-input:focus {
      outline: none;
      border-color: #ffffff;
    }

    .error-message {
      color: #ff4444;
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
    }
  </style>