<template>
    <div class="subpage">
        <div class="d-flex justify-space-between mb-2">
            <span class="text-h4 shadow">{{ translate.buttonVehicles }}</span>
            <div class="search">
                <v-text-field
                    :label="translate.textVehSearchLabel"
                    :hint="translate.textVehSearchHint"
                    color="secondary"
                    v-model="searchQuery"
                    @update:modelValue="changeSearchQuery"
                ></v-text-field>
            </div>
        </div>
        <div class="description vehicle mb-2">
            <span class="id">{{ translate.textVehId }}</span>
            <span class="name">{{ translate.textVehName }}</span>
            <span class="plate">{{ translate.textVehPlate }}</span>
            <span class="owner">{{ translate.textVehOwner }}</span>
            <span class="status">{{ translate.textVehStatus }}</span>
        </div>
        <div class="list vehicle">
            <div class="item-list" v-ripple :class="'status_'+vehicle.status" v-for="(vehicle, index) in filteredVehicles" :key="index + '_uuid'" @click="selectVehicleById(vehicle.id)" >
                <span class="id">{{ vehicle.id }}</span>
                <span class="name">{{ vehicle.vehicleName }}</span>
                <span class="plate">{{ vehicle.plate }}</span>
                <span class="owner">{{ getOwnerById(vehicle.owner) }}</span>
                <span class="status">{{ getStatus(vehicle.status) }}</span>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import { useCommon } from "@/composables/useCommon";
import type { Vehicle } from "@/types/types";

const store = useAppStore();
const translate: any = useTranslation().translate
const vehiclesList = ref<Vehicle[]>(store.vehiclesList);
const {selectVehicleById} = useCommon();
const searchQuery = ref(store.vehicleSearchQuery)
const { getOwnerById } = useCommon();

function getStatus(number: number) {
    const status = translate.vehStatusList[number];
    if (number != 1) {
        return status ? status : translate.textStatusNotFound;
    }
}

function changeSearchQuery() {
    store.changeVehicleSearchQuery(searchQuery.value);
}

const filteredVehicles = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return vehiclesList.value.filter((vehicle: Vehicle) => {
        let mergedString = Object.values(vehicle).join(' ');
        mergedString =  mergedString.toLowerCase() + translate.vehStatusList[vehicle.status].toLowerCase();
        mergedString += getOwnerById(vehicle.owner).toLowerCase();
        return (
            mergedString.includes(query)
        );
    });
});

</script>