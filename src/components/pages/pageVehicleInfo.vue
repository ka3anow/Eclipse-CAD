<template>
    <div class="subpage">
        <div class="mb-4 d-flex justify-space-between">
            <v-btn color="secondary" variant="outlined" class="px-10" elevation="6" @click="goBack()">{{ translate.buttonBack }}</v-btn>
            <span class="text-h4 shadow">{{ vehicle.vehicleManufacturer }} {{ vehicle.vehicleName }}</span>
        </div>
        <v-row class="vehicle-card">
            <v-col cols="4">
                <v-avatar
                    rounded="0"
                    size="100%"
                    color="primary"
                    class="pa-4 elevation-6 rounded"
                >
                    <v-img :src="`/vehicles/` + vehicle.vehicleImage.toLowerCase() + '.png'"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="8">
                <v-card class="pa-4 background" :class="'status'+ vehicle.status" elevation="6">
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textVehManufacturer }}:</span>
                        <span>{{ vehicle.vehicleManufacturer }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textVehId }}:</span>
                        <span>{{ vehicle.id }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textVehColor }}:</span>
                        <div class="veh-color" :style="'background-color:' + vehicle.color"></div>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textVehOwner }}:</span>
                        <span class="active" v-if="getUserById(vehicle.owner) !== null" @click="selectUserById(vehicle.owner)">{{ getUserById(vehicle.owner)?.name }} {{ getUserById(vehicle.owner)?.surname }}</span>
                        <span v-else>{{ translate.textNotFound }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textVehVendor }}:</span>
                        <span class="active" v-if="getUserById(vehicle.seller) !== null" @click="selectUserById(vehicle.seller)">{{ getUserById(vehicle.seller)?.name}} {{ getUserById(vehicle.seller)?.surname}}</span>
                        <span v-else>{{ translate.textNotFound }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textVehVendorPhone }}:</span>
                        <span v-if="getUserById(vehicle.seller) !== null">{{ getUserById(vehicle.seller)?.phone}}</span>
                        <span v-else>{{ translate.textNotFound }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-n3">
                        <span class="font-weight-bold">{{ translate.textStatus }}:</span>
                        <div class="select-status">
                            <v-select
                                density="compact"
                                variant="underlined"
                                :items="statusList"
                                v-model="selectedStatus"
                                @update:model-value="changeVehicleStatus()"
                            >
                                <template v-slot:item="{ props, item, index }">
                                    <v-list-item v-bind="props" :class="'vehicle-color-' + index"></v-list-item>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import { VehicleType, type Vehicle } from "@/types/types";
import { useCommon } from "@/composables/useCommon";
const store = useAppStore();
const translate: any = useTranslation().translate
const statusList = translate.vehStatusList;
const vehicle: Vehicle = store.activeVehicle;
const selectedStatus = ref(getStatus(vehicle.status));
const { selectUserById, getUserById } = useCommon();

function goBack() {
    store.changePageToLastpage();
}

function getStatus(number: number) {
    const status = statusList[number];
    return status ? status : "Status not found";
}

const getVehType = (number: VehicleType): string => {
    if (number == VehicleType.VEHICLE_TYPE_NONE) {
        return "Error"
    }
    return translate.vehTypes[number];
}

function changeVehicleStatus() {
    const selectedIndex = statusList.indexOf(selectedStatus.value);
    store.changeVehicleStatus(selectedIndex)
}

</script>