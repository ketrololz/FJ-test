<script setup lang="ts">
interface Props {
  search?: boolean;
}

withDefaults(defineProps<Props>(), {
  search: true,
});

const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

const input = ref("");

watch(input, () => {
  emit("change", input.value);
});
</script>
<template>
  <div
    class="border-b border-neutral-300 py-2 h-14 flex items-center gap-10 justify-between md:justify-start"
  >
    <NuxtLink to="/">
      <span class="text-xl font-bold">CarCatalog</span>
    </NuxtLink>
    <UInput
      v-if="search"
      icon="i-lucide-search"
      color="neutral"
      variant="soft"
      class="outline outline-neutral-300/50 rounded-lg"
      placeholder="Поиск..."
      v-model="input"
    ></UInput>
  </div>
</template>
