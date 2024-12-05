<template>
    <div class="subpage citizen">
        <div class="mb-4 d-flex justify-space-between">
            <v-btn color="secondary" variant="outlined" class="px-10" elevation="6" @click="goBack()">{{ translate.buttonBack }}</v-btn>
            <span class="text-h4 shadow">{{ user.name }} {{ user.surname }}</span>
        </div>
        <v-row class="citizen-card">
            <v-col cols="4">
                <v-avatar
                    rounded="0"
                    size="100%"
                    color="primary"
                    class="pa-4 elevation-6 rounded"
                >
                    <v-img :src="user.picture"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="8">
                <v-card class="pa-4 background" :class="'status'+ user.status" elevation="6">
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textAge }}:</span>
                        <span>{{ user.age }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textSex }}:</span>
                        <span class="sex">{{ user.gender }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textLicense }}:</span>
                        <span :class="'license_'+ user.license">{{ getLicense(user.license) }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textPhone }}:</span>
                        <span>{{ user.phone}}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textId }}:</span>
                        <span>{{ user.id}}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-n3">
                        <span class="font-weight-bold">{{ translate.textStatus }}:</span>
                        <div class="select-status">
                            <v-select
                                density="compact"
                                variant="underlined"
                                :items="statusList"
                                v-model="selectedStatus"
                                @update:model-value="changeUserStatus()"
                            >
                                <template v-slot:item="{ props, item, index }">
                                    <v-list-item v-bind="props" :class="'citizen-color-' + index"></v-list-item>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <span v-if="userVehicleList.length > 0" class="text-h5 py-4 d-block">{{ translate.textCitizenVehicles }}</span>

        <v-row class="vehicle-list pb-4">
            <v-col cols="12">
                <div class="list vehicle">
                    <div class="item-list" :class="'status_'+vehicle.status" v-for="(vehicle, index) in userVehicleList" :key="index + '_uuid'" @click="selectVehicleById(vehicle.id)">
                        <span class="id">{{ vehicle.id }}</span>
                        <span class="name">{{ vehicle.vehicleName }}</span>
                        <span class="plate">{{ vehicle.plate }}</span>
                        <span class="seller" v-if="getUserById(vehicle.seller)">{{ getUserById(vehicle.seller)?.name }} {{ getUserById(vehicle.seller)?.surname }}</span>
                        <span class="seller" v-else>{{ translate.textNotFound }}</span>
                        <span class="status">{{ getVehicleStatus(vehicle.status) }}</span>
                    </div>
                </div>
            </v-col>
        </v-row>

        <span v-if="userWeaponsList.length > 0" class="text-h5 py-4 d-block">{{ translate.textCitizenWeapons }}</span>

        <v-row class="weapons-list">
            <v-col cols="12">
                <div class="list weapons">
                    <div class="item-list" :class="'status_'+weapon.status" v-for="(weapon, index) in userWeaponsList" :key="index + '_uuid'" @click="selectWeaponById(weapon.id)">
                        <span class="id">{{ weapon.id }}</span>
                        <span class="name">{{ weapon.name }}</span>
                        <span class="serial">{{ weapon.serial }}</span>
                        <span class="seller">{{ getOwnerById(weapon.seller) }}</span>
                        <span class="status">{{ getWeaponStatus(weapon.status) }}</span>
                    </div>
                </div>
            </v-col>
        </v-row>

    </div>
</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import type { User, Vehicle, Weapon } from "@/types/types";
import { useCommon } from "@/composables/useCommon"

const store = useAppStore();
const translate: any = useTranslation().translate
const user: User = store.activeUser;
const userVehicleList =  ref<Vehicle[]>([]);
const userWeaponsList = ref<Weapon[]>([]);
const vehiclesList: Vehicle[] = store.vehiclesList;
const statusList = translate.statusList;
const vehStatusList = translate.vehStatusList;
const selectedStatus = ref(getStatus(user.status));
const { selectVehicleById, selectWeaponById, getUserById, getOwnerById } = useCommon();

function goBack() {
    store.changePageToLastpage();
}
function getLicense(license: boolean) {
    return translate.licenseText[license ? 0 : 1];
}
function getStatus(number: number) {
    const status = translate.statusList[number];
    return status ? status : "Status not found";
}

function getVehicleStatus(number: number) {
    const status = translate.vehStatusList[number];
    return status ? status : "Status not found";
}

function getWeaponStatus(number: number) {
    const status = translate.weaponStatusList[number];
    return status ? status : "Status not found";
}

onMounted(() => {
    userVehicleList.value = getVehiclesById(user.id);
    userWeaponsList.value = getWeaponsById(user.id);
});

const getVehiclesById = (ownerId: number): Vehicle[] => {
    return store.vehiclesList.filter(vehicle => vehicle.owner === ownerId);
};

const getWeaponsById = (ownerId: number): Weapon[] => {
    return store.weaponsList.filter(weapon => weapon.owner === ownerId);
};

function changeUserStatus() {
    const selectedIndex = statusList.indexOf(selectedStatus.value);
    store.changeUserStatus(selectedIndex)
}

</script>