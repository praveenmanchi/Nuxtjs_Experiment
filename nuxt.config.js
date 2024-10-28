export default {
  target: 'static',
  
  modern: true,

  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Praveen Manchi, Product Designer',
    link: [
      {
        rel: 'shortcut icon',
        href: 'https://yannglt.com/images/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: 'https://yannglt.com/images/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        href: 'https://yannglt.com/images/icon.png',
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content: 'Personal space of Praveen Manchi, a designer thinking, creating and breaking interfaces, products and systems with a focus on design operations'
      },
      {
        name: 'og:description',
        content: 'Personal space of Praveen Manchi, a designer thinking, creating and breaking interfaces, products and systems with a focus on design operations',
      },
      {
        name: 'twitter:description',
        content: 'Personal space of Praveen Manchi, a designer thinking, creating and breaking interfaces, products and systems with a focus on design operations',
      },
      {
        name: 'twitter:site',
        content: '@yannglt',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    script: [
      { 
        src: 'https://unpkg.com/splitting/dist/splitting.min.js',
        defer: true
      }
    ]
  },

  css: [
    { src: '@/assets/sass/app.sass', lang: 'sass' }
  ],

  plugins: [
    { src: '~plugins/vue-gtag.js', mode: 'client' },
    { src: '~/plugins/vee-validate.js' },
    { src: '~/plugins/clipboard.js', mode: 'client' }
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap'
  ],

  buildModules: [
    '@nuxtjs/style-resources'
  ],

  sitemap: {
    hostname: 'https://yannglt.com',
    gzip: true,
    routes: [
      '/',
      '/about',
      '/about/moodboard',
      'notes',
      'contact'
    ]
  },

  markdownit: {
    injected: true,
    breaks: true,
    html: true
  },

  generate: {
    dir: '.output/public',
    fallback: '404.html'
  },

  build: {
    transpile: [
      'vee-validate/dist/rules',
      'vue-clipboard2',
      'gsap'
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}