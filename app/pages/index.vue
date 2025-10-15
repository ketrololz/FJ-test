<script setup lang="ts">
interface Car {
  id: number;
  make: string;
  model: string;
  year: string;
  modelId: string;
  imageUrl: string;
}

const {
  data: cars,
  error,
  pending,
} = await useFetch<Car[]>("/cars.json", {
  server: false,
});
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <template v-for="car in cars">
        <carPreview
          :model="car.model"
          :make="car.make"
          :year="car.year"
          :image-url="car.imageUrl"
        ></carPreview>
      </template>
    </div>
  </div>
</template>
