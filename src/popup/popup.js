window.onload = async function() {
  // const config = await browser.storage.sync.get()
  // console.log('config', config);
  new Vue({
    el: '#vue',
    data() { return {
      msg: 'WOWWEEEE HEYYOO',
      // config,
    }},
    created() {
      console.log('heyy');
      console.log(this.$el);
    },
    mounted() {
      console.log('heyy');
      console.log(this.$el);
    },
    methods: {

    },
  })
}
