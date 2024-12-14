<template>
    <div>
        <div class="subpage">
            <span class="text-h4 shadow d-block mb-3">{{ translate.buttonMainPanel }}</span>

            <span class="text-h5 d-block shadow mb-3" >{{ translate.pageAShiftWorkers }}</span>
            <v-row>
                <v-col cols="12">
                    <v-card class="main-card" elevation="8">
                        <div class="shift-list">
                            <div class="shift-item active" v-for="user in filteredShiftList" :key="user.id + 'sw'" @click="selectUserById(user.id)">
                                <span v-if="user.police.onPanic == false" :class="'onduty duty_'+ user.police.onDuty"></span>
                                <span v-else class="onduty panic"></span>

                                <span class="text">{{ user.name }} {{ user.surname }} ({{ user.police.callsign }})</span>
                                <span :class="'icon rank-' + user.police.rank"></span>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <span class="text-h5 d-block shadow mb-3" >{{ translate.pageAPatrolOfficers }}</span>
            <v-row>
                <v-col cols="12">
                    <v-card class="main-card" elevation="8">
                        <div class="item adam-list d-flex position-relative" v-for="(team, index) in patrolList" :key="'adam-'+ index" >
                            {{team.name}} ({{ team.callsign }}):
                            <div class="member" v-for="user in team.members">&nbsp;{{ getPoliceUserById(user)?.name }}&nbsp;{{ getPoliceUserById(user)?.surname }}&nbsp;({{ getPoliceUserById(user)?.police?.callsign }})</div>
                            <v-btn @click="joinPlayerToAdam(user.id, team.id)" v-if="!isUserInAdam(team.members)" color="secondary" size="x-small" class="ml-2">{{ translate.textJoin }}</v-btn>
                            <v-btn @click="leavePlayerFromAdam(user.id, team.id)" v-else color="secondary" size="x-small" class="ml-2">{{translate.textLeave}}</v-btn>
                            <div class="flex-grow-1"></div>
                            <v-btn @click="removeAdamById(team.id)" v-if="team.members.length == 0" color="error" size="x-small" class="ml-2 right-0">{{ translate.textDelete }}</v-btn>
                        </div>
                        <div class="control mt-2">
                            <v-btn size="small" class="float-right" color="secondary" @click="showModalNewAdam = true">{{ translate.textCreateNew }}</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6">
                    <span class="text-h5 d-block shadow mb-3" >{{ translate.pageAWanted }}</span>
                    <v-card class="main-card" elevation="8">
                        <div class="item d-flex justify-space-between mb-1 active" v-for="(user, index) in filteredUsers" :key="'wntd' + index" @click="selectUserById(user.id)">
                            <span>{{ user.name }} {{ user.surname }}</span>
                            <span>{{ user.phone }}</span>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <span class="text-h5 d-block shadow mb-3" >{{ translate.pageAWantedVehicle }}</span>
                    <v-card class="main-card" elevation="8">
                        <div class="item d-flex justify-space-between mb-1 active" v-for="(vehicle, index) in filteredVehicles" :key="'wntd' + index" @click="selectVehicleById(vehicle.id)">
                            <span>{{ vehicle.vehicleName }}</span>
                            <span>{{ vehicle.plate }}</span>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <ModalWindow
            :title="translate.textAreYouSure"
            v-model="showModal"
            @confirmed="handleConfirm">
        </ModalWindow>

        <ModalNewAdam
            v-model="showModalNewAdam">
        </ModalNewAdam>
        
    </div>
</template>

<script setup lang="ts">
import { useCommon } from "@/composables/useCommon";
import { useAppStore, useTranslation } from "@/stores/app";
import ModalWindow from '@/components/modals/modal.vue';
import ModalNewAdam from '@/components/modals/modalNewAdam.vue';

const store = useAppStore();
const user = store.user;
const translate: any = useTranslation().translate
const shiftList: any = ref(store.shiftList);
const patrolList: any = ref(store.patrolList);
const residentList: any = ref(store.residentList);
const vehiclesList: any = ref(store.vehiclesList);
const { selectUserById, selectVehicleById, getPoliceUserById } = useCommon();

const filteredUsers = computed(() => {
    return residentList.value.filter((user: { status: number; }) => user.status === 2);
});

const filteredVehicles = computed(() => {
    return vehiclesList.value.filter((user: { status: number; }) => user.status === 2);
});

const filteredShiftList = computed(() => {
    return shiftList.value.filter((user: { police: { onDuty: number; }; }) => user.police.onDuty != 3);
});

function isUserInAdam(member: number[]) {
    return true ? member.includes(user.id) : false
}

function joinPlayerToAdam(playerId: number, adamId: number) {
    store.joinPlayerToAdamById(playerId, adamId);
}

function leavePlayerFromAdam(playerId: number, adamId: number) {
    store.leavePlayerFromAdamById(playerId, adamId);
}

const showModal = ref(false);
let activeAdam = -1;
function removeAdamById(adamId: number) {
    showModal.value = true;
    activeAdam = adamId;
}
const handleConfirm = () => {
    if (activeAdam != -1)
    store.removeAdamById(activeAdam);
};

const showModalNewAdam = ref(false);

</script>