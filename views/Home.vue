<template>
  <div class="home">
    <img @click="showHelloWorld" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld class="about" v-if="test" :msg="msg"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data () {
    return {
      test: true,
      msg: 'VVVVV',
    };
  },

  methods: {
    showHelloWorld () {
      this.test = true
    },
  },
};
</script>
