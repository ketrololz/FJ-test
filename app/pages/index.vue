<script setup lang="ts">
const search = ref("");

const carsStore = useCarsStore();

onMounted(async () => {
  await carsStore.loadCars();
});

const { cars, isLoading } = storeToRefs(carsStore);

const filteredCars = computed(() => {
  if (!cars.value) return [];
  if (!search.value) return cars.value;

  const searchValue = search.value.toLowerCase();

  return cars.value.filter(
    (car) =>
      car.make.toLowerCase().includes(searchValue) ||
      car.model.toLowerCase().includes(searchValue)
  );
});
</script>

<template>
  <div class="flex flex-col gap-10">
    <Header @change="(val) => (search = val)"></Header>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <template v-if="isLoading" v-for="n in 12">
        <USkeleton class="h-50 rounded-xl bg-neutral-200 animate-pulse" />
      </template>
      <template v-for="car in filteredCars">
        <NuxtLink :to="`/cars/${car.modelId}`">
          <CarPreview
            :model="car.model"
            :make="car.make"
            :year="car.year"
            :image-url="car.imageUrl"
          ></CarPreview>
        </NuxtLink>
      </template>
    </div>
    <template v-if="!filteredCars.length && !isLoading">
      <div
        class="text-center w-full h-40 flex justify-center items-center pb-5"
      >
        <span>Ничего не найдено :(</span>
      </div>
    </template>
  </div>
</template>
