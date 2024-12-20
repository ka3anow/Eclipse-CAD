<template>
    <div class="subpage management">
        <div class="mb-4 d-flex justify-space-between">
            <v-btn color="secondary" variant="outlined" class="px-10" elevation="6" @click="goBack()">{{ translate.buttonBack }}</v-btn>
            <span class="text-h4 shadow">{{ getPlayerRank(policeData.rank) }} {{ user.name }} {{ user.surname }}</span>
        </div>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    v-model="newCallsign"
                    :label="translate.textManagementCallsign"
                ></v-text-field>
            </v-col>
            <v-col cols="6 mt-2">
                <v-select
                    variant="underlined"
                    :items="statusList"
                    :item-props="itemProps"
                    v-model="selectedRank"
                    :hint="translate.textManagementRank"
                    persistent-hint
                >
                </v-select>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-end">
            <v-btn color="secondary px-9" size="x-large" @click="saveChanges()">Save</v-btn>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { useCommon } from "@/composables/useCommon";
import { useAppStore, useTranslation } from "@/stores/app";
import type { PoliceUserData, User } from "@/types/types";

const store = useAppStore();
const user: User = store.activeUser;
const translate: any = useTranslation().translate
const { getPoliceUserById } = useCommon();
const defaultPoliceData = {rank:0, onDuty: 0, onPanic: false, callsign:"no data"}
const policeData: PoliceUserData = getPoliceUserById(user.id)?.police || defaultPoliceData;

const newCallsign = ref(policeData.callsign);
const selectedRank = ref(getPlayerStatus(policeData.rank));
const statusList = translate.rankList;

function goBack() {
    store.changePageToLastpage();
}

function getPlayerRank(rank: number) {
    if (rank == -1) return translate.textRankNotFound;
    const status = translate.rankList.find((item: { id: number; }) => item.id == rank);
    return status ? status.name : translate.textRankNotFound;
}

function getPlayerStatus(rank: number) {
    if (rank == -1) return translate.textRankNotFound;
    const status = translate.rankList.find((item: { id: number; }) => item.id == rank);
    return status ? status : "none"
}

function itemProps(item: any) {
    return {
        title: item.name
    }
}

function saveChanges() {
    store.changeActivePlayersRank(selectedRank.value.id);
    store.changeActivePlayersCallsign(newCallsign.value);
    store.changeSubPage(8);
}

</script>