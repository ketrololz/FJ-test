import type { Car } from "~/types/Car";

export const useCarsStore = defineStore("cars", () => {
  const cars = ref<Car[]>([]);
  const isLoaded = ref(false);
  const isLoading = ref(true);

  async function loadCars() {
    if (isLoaded.value) {
      return;
    }

    try {
      isLoading.value = true;
      const carsData = await $fetch<Car[]>("/cars.json");

      cars.value = carsData;
      isLoaded.value = true;
    } catch (e) {
      console.error("Не удалось загрузить список автомобилей", e);
    } finally {
      isLoading.value = false;
    }
  }

  return { cars, loadCars, isLoading };
});
