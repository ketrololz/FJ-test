<script setup lang="ts">
interface Car {
  id: number;
  make: string;
  model: string;
  year: string;
  modelId: string;
  imageUrl: string;
}

const search = ref("");

const { data: cars, error } = await useFetch<Car[]>("/cars.json", {
  server: false,
});

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
      <template v-if="!cars && !error" v-for="n in 12">
        <USkeleton class="h-50 rounded-xl bg-neutral-200 animate-pulse" />
      </template>
      <template v-for="car in filteredCars">
        <CarPreview
          :model="car.model"
          :make="car.make"
          :year="car.year"
          :image-url="car.imageUrl"
        ></CarPreview>
      </template>
    </div>
    <template v-if="!filteredCars.length">
      <div class="text-center w-full h-40 flex justify-center items-center pb-5"><span>Ничего не найдено :(</span></div>
    </template>
  </div>
</template>
