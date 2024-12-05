<template>
    <div class="subpage">
        <div class="d-flex justify-space-between mb-2">
            <span class="text-h4 shadow">{{ translate.buttonE }}</span>
            <div class="search">
                <v-text-field
                    :label="translate.textWeaponSearchLabel"
                    :hint="translate.textWeaponSearchHint"
                    color="secondary"
                    v-model="searchQuery"
                    @update:modelValue="changeSearchQuery"
                ></v-text-field>
            </div>
        </div>
        <div class="description weapon mb-2">
            <span class="id">{{ translate.textWeaponId }}</span>
            <span class="owner">{{ translate.textWeaponOwner }}</span>
            <span class="name">{{ translate.textWeaponName }}</span>
            <span class="serial">{{ translate.textWeaponSerial }}</span>
            <span class="status">{{ translate.textWeaponStatus }}</span>
        </div>
        <div class="list weapon">
            <div class="item-list weapon" :class="'status_'+weapon.status" v-for="(weapon, index) in filteredWeapons" :key="index + '_uuid'" @click="selectWeaponById(weapon.id)" >
                <span class="id">{{ weapon.id }}</span>
                <span class="owner">{{ getOwnerById(weapon.owner) }}</span>
                <span class="name">{{ weapon.name }}</span>
                <span class="serial" v-if="weapon.serial">{{ weapon.serial}}</span>
                <span class="serial error" v-else>{{ translate.textWeaponUnregistered }}</span>
                <span class="status">{{ getStatus(weapon.status) }}</span>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import { useCommon } from "@/composables/useCommon"
import type { Weapon } from "@/types/types";
const store = useAppStore();
const translate: any = useTranslation().translate
const weaponList: any = ref(store.weaponsList);
const { getOwnerById, selectWeaponById } = useCommon();
const searchQuery = ref(store.weaponSearchQuery)

function getStatus(number: number) {
    const status = translate.weaponStatusList[number];
    if (number != 1) {
        return status ? status : translate.textStatusNotFound;
    }
}

function changeSearchQuery() {
    store.changeWeaponSearchQuery(searchQuery.value);
}

const filteredWeapons = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return weaponList.value.filter((weapon: Weapon) => {
        let mergedString = Object.values(weapon).join(' ');
        mergedString = mergedString.toLowerCase() + translate.statusList[weapon.status].toLowerCase();
        mergedString += getOwnerById(weapon.owner).toLowerCase();
        if (weapon.serial == '') mergedString+= translate.textWeaponUnregistered.toLowerCase();
        return (
            mergedString.includes(query)
        );
    });
});

</script>