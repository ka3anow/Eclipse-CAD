<template>
    <div class="subpage callpage">
        <div class="mb-4 d-flex justify-space-between">
            <v-btn color="secondary" variant="outlined" class="px-10" elevation="6" @click="goBack()">{{ translate.buttonBack }}</v-btn>
            <span class="text-h4 shadow">{{ activeCall.label }}</span>
        </div>

        <v-row>
            <v-col cols="12">
                <v-card class="main-card mb-2" elevation="8" :class="`status_` + activeCall.status">
                    {{ activeCall.description }}

                    <v-row class="mt-2">
                        <v-col cols="6" class="d-flex flex-column">
                            <div>
                                {{ translate.textCallCalling }}
                                <span v-if="activeCall.callid != -1" @click="selectUserById(activeCall.callid)" class="active">
                                    {{getUserById(activeCall.callid)?.name}}
                                    {{getUserById(activeCall.callid)?.surname}}
                                </span>
                                <span class="text-secondary" v-else>{{ translate.textCitizen }}</span>
                            </div>
                            <div v-if="activeCall.units.length > 0">
                                <span>{{ translate.textCallScene }}</span>
                                <span class="d-flex align-center align-content-start active" v-for="unit in activeCall.units" @click="selectUserById(getPoliceUserById(unit)?.id || 0)">
                                    {{ getPoliceUserById(unit)?.name }} {{ getPoliceUserById(unit)?.surname }} ({{ getPoliceUserById(unit)?.police?.callsign }})
                                    <span :class="'icon rank-' + getPoliceUserById(unit)?.police?.rank"></span>
                                </span>
                            </div>
                        </v-col>
                        <v-col cols="6" class="d-flex flex-column align-end">
                            <div class="text-right">
                                <span><b>{{ convertTime(activeCall.date) }}</b> {{ convertDate(activeCall.date) }}</span>
                            </div>
                            <div class="select">
                                <v-select
                                    density="compact"
                                    variant="underlined"
                                    :items="statusList"
                                    v-model="selectedStatus"
                                    @update:model-value="changeCallStatus()"
                                >
                                    <template v-slot:item="{ props, item, index }">
                                        <v-list-item v-bind="props" :class="'calls-color-' + index"></v-list-item>
                                    </template>
                                </v-select>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <v-row class="mt-0">
            <v-col>
                <v-btn v-if="checkUserInCall(activeCall.units)" block variant="tonal" @click="store.leavePlayerFromCall(playerData.id, activeCall.id)">{{ translate.textCallLeave }}</v-btn>
                <v-btn v-else block color="secondary" variant="outlined" elevation="6" @click="store.joinPlayerToCall(playerData.id, activeCall.id)">{{ translate.textCallJoin }}</v-btn>
            </v-col>
            <v-col>
                <v-btn block color="secondary" variant="outlined" elevation="6" @click="showCallOnMap()">{{ translate.textCallShowOnMap }}</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import { useCommon } from "@/composables/useCommon"
const { convertTime, convertDate, getUserById, selectUserById, getPoliceUserById } = useCommon();
const store = useAppStore();
const playerData = store.user;
const translate: any = useTranslation().translate
const activeCall = store.activeCall;
const statusList = translate.callStatusList;
const selectedStatus = ref(getStatus(activeCall.status));

function getStatus(number: number) {
    const status = statusList[number];
    return status ? status : "Status not found";
}

function goBack() {
    store.changePageToLastpage();
}

function changeCallStatus() {
    const selectedIndex = statusList.indexOf(selectedStatus.value);
    store.changeCallStatus(selectedIndex)
}

function checkUserInCall(units: Array<number>) {
    const userId = playerData.id;
    return units.includes(userId);
}

function showCallOnMap() {
    //
}

</script>