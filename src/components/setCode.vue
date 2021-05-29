<template>
  <button class="set-code" v-clipboard:success="onCopy"  v-clipboard:copy="code">Сохранить Код</button>
</template>

<script lang="ts">
export default {
  name: 'setCode',
  props: { code: { type: String } },
  methods: {
    onCopy ():void {
      alert('удачно скопировалось')
    }
  }
}
</script>

<style lang="scss">
.set-code{
  cursor: pointer;
  position: absolute;
  background: transparent;
  border: 0;
  right: 0;
  top: 0;
}
</style>
