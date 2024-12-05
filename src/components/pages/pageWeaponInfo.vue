<template>
    <div class="subpage">
        <div class="mb-4 d-flex justify-space-between">
            <v-btn color="secondary" variant="outlined" class="px-10" elevation="6" @click="goBack()">{{ translate.buttonBack }}</v-btn>
            <span class="text-h4 shadow">{{ weapon.name }}</span>
        </div>
        <v-row class="weapon-card">
            <v-col cols="4">
                <v-avatar
                    rounded="0"
                    size="100%"
                    color="primary"
                    class="pa-4 elevation-6 rounded"
                >
                    <v-img :src="weapon.image" ></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="8">
                <v-card class="pa-4 background" :class="'status'+ weapon.status" elevation="6">
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textWeaponName }}:</span>
                        <span>{{ weapon.name }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textWeaponId }}:</span>
                        <span>{{ weapon.id }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textWeaponSerial }}:</span>
                        <span v-if="weapon.serial">{{ weapon.serial}}</span>
                        <span v-else class="error">{{ translate.textWeaponUnregistered }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textWeaponOwner }}:</span>
                        <span class="active" v-if="getUserById(weapon.owner) !== null" @click="selectUserById(weapon.owner)">{{ getUserById(weapon.owner)?.name }} {{ getUserById(weapon.owner)?.surname }}</span>
                        <span v-else>{{ translate.textNotFound }}</span>
                    </div>
                    <div class="d-flex justify-space-between mb-3">
                        <span class="font-weight-bold">{{ translate.textWeaponSeller }}:</span>
                        <span class="active" v-if="getUserById(weapon.seller) !== null" @click="selectUserById(weapon.seller)">{{ getUserById(weapon.seller)?.name }} {{ getUserById(weapon.seller)?.surname }}</span>
                        <span v-else>{{ translate.textNotFound }}</span>
                    </div>

                    <div class="d-flex justify-space-between mb-n3">
                        <span class="font-weight-bold">{{ translate.textWeaponStatus }}:</span>
                        <div class="select-status">
                            <v-select
                                density="compact"
                                variant="underlined"
                                :items="statusList"
                                v-model="selectedStatus"
                                @update:model-value="changeWeaponStatus()"
                            >
                                <template v-slot:item="{ props, item, index }">
                                    <v-list-item v-bind="props" :class="'weapon-color-' + index"></v-list-item>
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
import type { Weapon } from "@/types/types";
import { useCommon } from "@/composables/useCommon"
import { tr } from "vuetify/locale";

const store = useAppStore();
const translate: any = useTranslation().translate
const weapon: Weapon = store.activeWeapon;
const statusList = translate.weaponStatusList;
const selectedStatus = ref(getStatus(weapon.status));
const {getUserById, selectUserById} = useCommon();

function goBack() {
    store.changePageToLastpage();
}

function getStatus(number: number) {
    const status = translate.weaponStatusList[number];
    return status ? status : translate.textStatusNotFound;
}

function changeWeaponStatus() {
    const selectedIndex = statusList.indexOf(selectedStatus.value);
    store.changeWeaponStatus(selectedIndex)
}

</script>