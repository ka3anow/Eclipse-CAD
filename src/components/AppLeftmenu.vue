<template>
    <div class="left-block">
        <div class="player-info">
            <div class="status" :class="'duty_'+ policeUserData.onDuty"></div>
            <h5>{{ playerData.name }} {{ playerData.surname }}</h5>
            <h6>{{ getPlayerRank(policeUserData.rank) }} ({{ policeUserData.callsign }})</h6>


        </div>
        
        <div class="list">
            <v-btn v-for="(button, index) in buttons" :key="index"
                variant="text"
                block 
                class="text-white"
                elevation="12"
                @click="changeSubpage(index)"
                :class="{ active: isActive === index  || (index === 2 && isActive === 10) || (index === 3 && isActive === 20) || (index === 4 && isActive === 30)}"
                >
                {{ translate[button] }}
            </v-btn>
        </div>

        <div class="panic-block">
            <div class="duty-block">
                <v-btn v-for="(button, index) in dutyButtons" :key="index+'_duty'"
                    :class="[{ active: isDutyActive === index}, 'duty_' + index]"
                    class="duty"
                    size="x-small"
                    @click="changeDutyStatus(index)"
                >
                    <v-tooltip
                        :class="'duty_tooltip_' + index"
                        activator="parent"
                            location="top"
                        >{{ translate[button] }}
                    </v-tooltip>
                </v-btn>
            </div>

            <button class="panic" size="large" @click="changePanic()" :class="{active: onPanic}">{{translate.buttonPanic}}</button>
        </div>
    </div>

</template>

<script setup lang="ts">

import { useAppStore, useTranslation } from "@/stores/app";
import type { PoliceUserData } from "@/types/types";
import { ref, watch } from "vue";

const store = useAppStore();
const playerData = store.user;
const policeUserData: PoliceUserData = playerData?.police || {rank:0, onDuty: 0, onPanic: false, callsign:"no data"};
const translate: any = useTranslation().translate;

const buttons = ['buttonA', 'buttonB', 'buttonC', 'buttonD', 'buttonE', 'buttonF', 'buttonG', 'buttonH'];
const isActive = ref(store.subpage)

function changeSubpage( number: number ) {
    store.changeSubPage(number);
    isActive.value = store.subpage;
}

watch(() => store.subpage, (newValue) => {
    isActive.value = newValue;
});

const isDutyActive = ref(policeUserData.onDuty)
isDutyActive.value = policeUserData.onDuty;
const dutyButtons = ['buttonOndutyA', 'buttonOndutyB', 'buttonOndutyC', 'buttonOndutyD']
function changeDutyStatus(number: number) {
    store.changeDutyStatus(number)
    isDutyActive.value = policeUserData.onDuty;
}

const onPanic = ref(policeUserData.onPanic);
function changePanic() {
    store.changePanicStatus(onPanic.value ?? true);
    onPanic.value = !onPanic.value;
}

function getPlayerRank(rank: number) {
    const status = translate.rankList.find((item: { id: number; }) => item.id == rank)
    return status ? status.name : translate.textRankNotFound;
}

</script>