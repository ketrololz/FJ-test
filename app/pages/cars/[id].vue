<script setup lang="ts">
import type { Car } from "~/types/Car";

const router = useRouter();
const route = useRoute();
const carsStore = useCarsStore();
const { cars } = storeToRefs(carsStore);

const isLoading = ref(false);
const car = ref<Car>();
const selectedCar = ref(null);

async function loadDetails(id: string) {
  try {
    isLoading.value = true;
    const data = await $fetch(`/api/cars/${id}`);
    selectedCar.value = data[0];
  } catch (e) {
    console.error("Не удалось загрузить список автомобилей", e);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await carsStore.loadCars();

  const value = cars.value.find((car) => car.modelId === route.params.id);

  if (!value) {
    router.push("/404");
    return;
  }

  car.value = value;
  await loadDetails(car.value!.modelId);
});
</script>

<template>
  <div class="flex flex-col gap-10">
    <Header :search="false"></Header>
    <div class="flex flex-col gap-4 md:flex-row">
      <template v-if="isLoading">
        <USkeleton
          class="h-50 w-full rounded-xl bg-neutral-200 animate-pulse"
        />
        <USkeleton
          class="h-80 w-full rounded-xl bg-neutral-200 animate-pulse"
        />
      </template>
      <template v-if="car && selectedCar">
        <div
          class="p-4 w-full h-full flex flex-col bg-neutral-100 border border-neutral-300/70 rounded-xl overflow-hidden min-h-50 shadow-sm shadow-neutral-200/35"
        >
          <h3 class="text-lg font-bold text-default mb-4">
            {{ car.make }}
          </h3>
          <div class="flex flex-col">
            <p class="text-neutral-400">
              Модель:
              <span class="text-sm text-default font-semibold">
                {{ car.model }}
              </span>
            </p>
            <p class="text-neutral-400">
              Год выпуска:
              <span class="text-sm text-default font-semibold">
                {{ car.year }}
              </span>
            </p>
            <p class="text-neutral-400" v-if="selectedCar['make_country']">
              Страна:
              <span class="text-sm text-default font-semibold">
                {{ selectedCar["make_country"] }}
              </span>
            </p>
            <p class="text-neutral-400" v-if="selectedCar['model_engine_l']">
              Объём двигателя:
              <span class="text-sm text-default font-semibold">
                {{ selectedCar["model_engine_l"] }} л
              </span>
            </p>
            <p
              class="text-neutral-400"
              v-if="selectedCar['model_engine_power_hp']"
            >
              Мощность двигателя:
              <span class="text-sm text-default font-semibold">
                {{ selectedCar["model_engine_power_hp"] }} л/c
              </span>
            </p>
            <p class="text-neutral-400" v-if="selectedCar['model_doors']">
              Кол-во дверей:
              <span class="text-sm text-default font-semibold">
                {{ selectedCar["model_doors"] }}
              </span>
            </p>
          </div>
        </div>
        <NuxtImg
          v-if="car.imageUrl"
          :src="car.imageUrl"
          class="h-full w-full md:w-[50%] max-h-100 object-cover object-center rounded-xl"
        ></NuxtImg>
      </template>
    </div>
  </div>
</template>
