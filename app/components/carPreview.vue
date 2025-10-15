<script setup lang="ts">
interface Props {
  make: string;
  model: string;
  year: string;
  imageUrl: string;
}

const props = defineProps<Props>();
</script>
<template>
  <div
    class="flex justify-between bg-neutral-100 border border-neutral-300/70 rounded-xl overflow-hidden min-h-50 shadow-sm shadow-neutral-200/35 hover:shadow-md hover:shadow-neutral-200/80 transition-all ease-in-out cursor-pointer hover:scale-101"
  >
    <div class="p-4">
      <h3 class="text-lg font-bold text-default mb-4">{{ make }}</h3>
      <div class="flex flex-col">
        <p class="text-neutral-400">
          Модель:
          <span class="text-sm text-default font-semibold">
            {{ model }}</span
          >
        </p>
        <p class="text-neutral-400">
          Год выпуска:
          <span class="text-sm text-default font-semibold">
            {{ year }}</span
          >
        </p>
      </div>
    </div>
    <NuxtImg
      v-if="imageUrl"
      :src="imageUrl"
      class="h-full w-[50%] object-cover object-center rounded-l-xl"
    >
    </NuxtImg>
  </div>
</template>
