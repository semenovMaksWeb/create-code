<template>
  <div class="interface-page">
   <div>
     Инфо:
     <div>  name: {{ name }}</div>
     <div>  name: {{ json }}</div>
     <div>  name: {{ res }}</div>
   </div>
    <input type="text" placeholder="name" v-model="name">
    <textarea placeholder="json or array" v-model="json"></textarea>
    <div>Результат: </div>
    <pre>
      {{ res }}
    </pre>
    <button @click.prevent="starting">Получить!</button>
  </div>
</template>

<script lang="ts">
import { start } from '@/lib/create/interface.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  methods: {
    starting () {
      this.res = start(JSON.parse(this.json), this.name)
    }
  },
  data () {
    return {
      name: '',
      json: '',
      res: {}
    }
  }
})
</script>
<style lang="scss"></style>
