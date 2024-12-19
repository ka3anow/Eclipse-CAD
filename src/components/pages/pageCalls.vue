<template>
    <div class="subpage call">
        <div class="d-flex justify-space-between mb-2">
            <span class="text-h4 shadow">{{ translate.buttonCalls }}</span>
            <div class="search">
                <v-text-field 
                    :label="translate.textCallSearchLabel"
                    :hint="translate.textCallSearchHint"
                    color="secondary"
                    v-model="searchQuery"
                    @update:modelValue="changeSearchQuery"
                ></v-text-field>
            </div>
        </div>
        <div class="list">
            <div class="item-list" v-ripple :class="{active: checkUserInCall(call.units), passive: call.status == 0}" v-for="(call, index) in filteredCalls" :key="index + '_uuid'" @click="selectCallById(call.id)" >
                <v-row>
                    <v-col cols="3" class="d-flex flex-column">
                        <span class="mb-1"><b>{{ convertTime(call.date) }}</b>&nbsp;{{ convertDate(call.date) }}</span>
                        <span :class="`status-`+call.status">{{ getCallStatus(call.status) }}</span>
                    </v-col>
                    <v-col cols="6" class="d-flex flex-column">
                        <span class="mb-1"><b>{{ call.label }}</b></span>
                        <span class="text-truncate">{{ call.description }}</span>
                    </v-col>
                    <v-col cols="3" class="units">
                        <span v-for="(unit) in call.units" class="unit">
                            {{ getPoliceUserById(unit)?.police?.callsign }}
                        </span>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore, useTranslation } from "@/stores/app";
import { useCommon } from "@/composables/useCommon";
import type { Calls } from '@/types/types';


const store = useAppStore();
const playerData = store.user;
const translate: any = useTranslation().translate
const callList = ref<Calls[]>(store.policeCalls);
const searchQuery = ref<string>(store.callSearchQuery);
const { getPoliceUserById, selectCallById, convertTime, convertDate } = useCommon();

function getCallStatus(number: number) {
    const status = translate.callStatusList[number];
    return status ? status : translate.textStatusNotFound;
}

function changeSearchQuery() {
    store.changeCallSearchQuery(searchQuery.value);
}

function checkUserInCall(units: Array<number>) {
    const userId = playerData.id;
    return units.includes(userId);
}

const filteredCalls = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return callList.value.filter((call: Calls) => {
        let mergedString = Object.values(call).join(' ');
        mergedString =  mergedString.toLowerCase();
        if (translate.callStatusList[call.status]) {
            mergedString += translate.callStatusList[call.status].toLowerCase();
        }
        mergedString += convertTime(call.date);
        mergedString += convertDate(call.date);
        return (
            mergedString.includes(query)
        );
    });
});


</script>