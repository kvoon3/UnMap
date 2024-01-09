<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    onClick?: (e: MouseEvent | TouchEvent) => void
  }>(),
  {
    label: 'Kevin Kwong',
    onClick: () => void 0
  }
)

</script>

<template>
  <div flex="~ center col">
    <div w-8 h-8 bg-red rounded-full flex="~ center" @click="(e) => onClick ? onClick(e) : void 0">
      <button class="w-6 h-6 items-center i-carbon-person color-white rounded-full" />
    </div>
    <div font-bold color-black text-shadow>{{ label }}</div>
  </div>
</template>

