// store/index.js

export const state = () => ({
  notes: null
})

export const mutations = {
  updatePosts: (state, notes) => {
    state.notes = notes
  }
}

export const actions = {
  async getPosts({ commit }) {
    try {
      // Using static data instead of Contentful
      const notes = [
        {
          sys: {
            id: '1'
          },
          fields: {
            title: 'Example Note 1',
            slug: 'example-note-1',
            publishDate: '2024-10-28',
            content: 'This is example content for note 1',
            description: 'Example description 1',
            category: 'Design'
          }
        },
        {
          sys: {
            id: '2'
          },
          fields: {
            title: 'Example Note 2',
            slug: 'example-note-2',
            publishDate: '2024-10-27',
            content: 'This is example content for note 2',
            description: 'Example description 2',
            category: 'Development'
          }
        }
        // Add more static notes as needed
      ]

      commit('updatePosts', notes)
      
    } catch (err) {
      console.error(err)
    }
  }
}