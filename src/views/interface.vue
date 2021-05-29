<template>
  <div class="interface-page">
   <div class="container">
<!--     <div style="margin-bottom: 10px;">-->
<!--       Инфо:-->
<!--       <div>  name: {{ name }}</div>-->
<!--       <div>  json: {{ json }}</div>-->
<!--       <div>  res: {{ res }}</div>-->
<!--     </div>-->

     <form class="interface-form">
       <input class="interface-form_elem" type="text" placeholder="названия интерфейса" v-model="name">
       <textarea class="interface-form_elem" placeholder="данные" v-model="json"/>
     </form>
     <div class="interface-result" v-if="res">
       <set-code :code="res"/>
       <pre v-highlightjs="res"  >
         <code class="json"></code></pre>
     </div>

     <button @click.prevent="starting">Сгенерировать интерфейс!</button>
   </div>
   </div>
</template>

<script lang="ts">
import { CreateInterface } from '@/serve/createInterface'
import { defineComponent } from 'vue'
import SetCode from '@/components/setCode.vue'

export default defineComponent({
  name: 'Home',
  components: { SetCode },
  methods: {
    starting () {
      // eslint-disable-next-line no-eval
      // console.log(eval(this.json))
      // eslint-disable-next-line no-eval
      // const createInterface = new CreateInterface(eval(this.json), this.name)
      const createInterface = new CreateInterface(JSON.parse(this.json), this.name)
      this.res = createInterface.start()
    }
  },
  data () {
    return {
      name: '',
      json: '',
      res: null
    }
  }
})
</script>
<style lang="scss">
.interface-form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.interface-result{
  position:  relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.interface-form_elem{
  margin-bottom: 20px;
}
</style>
