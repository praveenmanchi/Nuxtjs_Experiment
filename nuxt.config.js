export default {
  target: 'static',
  
  ssr: true,

  modern: true,

  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Praveen Manchi, Product Designer',
    link: [
      {
        rel: 'shortcut icon',
        href: '/images/favicon.ico',  // Updated to relative path
      },
      {
        rel: 'apple-touch-icon',
        href: '/images/apple-touch-icon.png',  // Updated to relative path
      },
      {
        rel: 'icon',
        href: '/images/icon.png',  // Updated to relative path
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Personal space of Praveen Manchi, a designer thinking, creating and breaking interfaces, products and systems with a focus on design operations'
      },
      {
        hid: 'og:description',
        property: 'og:description',  // Changed name to property for OG tags
        content: 'Personal space of Praveen Manchi, a designer thinking, creating and breaking interfaces, products and systems with a focus on design operations',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Praveen Manchi, Product Designer'
      },
      {
        hid: 'twitter:description',
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
    hostname: 'https://praveenmanchi.art',
    gzip: true,
    routes: [
      '/',
      '/about',
      '/about/moodboard',
      '/notes',
      '/contact',
      '/blog'
    ]
  },

  markdownit: {
    injected: true,
    breaks: true,
    html: true
  },

  generate: {
    dir: '.output/public',
    fallback: true,  // Changed from '404.html' to true
    fallback: {
      static: true,
      statusCode: 404,
      path: '/404.html'
    }
  },

  build: {
    transpile: [
      'vee-validate/dist/rules',
      'vue-clipboard2',
      'gsap'
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        maxSize: 244000
      }
    },
    extractCSS: true,
    optimizeCSS: true,
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
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
      } else {
        config.devtool = 'hidden-source-map'
      }
    }
  },

  // Added for better error handling
  hooks: {
    'generate:done': (context) => {
      context.nuxt.hook('generate:errorHandled', (_error) => {
        return false
      })
    }
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  styleResources: {
    sass: [
      '@/assets/sass/base/_variables.sass',
      '@/assets/sass/base/_mixins.sass'
    ]
  },

  // Added for better performance
  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    },
    compressor: {
      level: 9
    }
  },

  // Added for proper server config
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  },

  publicRuntimeConfig: {
    validKey: process.env.NUXT_PUBLIC_VALID_KEY
  },
  router: {
    middleware: ['nda-auth']
  }
}