<template>
    <div>
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

            <span v-if="filteredVehicles.length > 0" class="text-h5 py-4 d-block">{{ translate.textCitizenVehicles }}</span>

            <v-row class="vehicle-list pb-4">
                <v-col cols="12">
                    <div class="list vehicle">
                        <div class="item-list" v-ripple :class="'status_'+vehicle.status" v-for="(vehicle, index) in filteredVehicles" :key="index + '_uuid'" @click="selectVehicleById(vehicle.id)">
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

            <span v-if="filteredWeapons.length > 0" class="text-h5 py-4 d-block">{{ translate.textCitizenWeapons }}</span>

            <v-row class="weapons-list pb-4">
                <v-col cols="12">
                    <div class="list weapons">
                        <div class="item-list" v-ripple :class="'status_'+weapon.status" v-for="(weapon, index) in filteredWeapons" :key="index + '_uuid'" @click="selectWeaponById(weapon.id)">
                            <span class="id">{{ weapon.id }}</span>
                            <span class="name">{{ weapon.name }}</span>
                            <span class="serial" :class="{unregistered: !weapon.serial}">{{ getWeaponSerial(weapon.serial) }}</span>
                            <span class="seller">{{ getOwnerById(weapon.seller) }}</span>
                            <span class="status">{{ getWeaponStatus(weapon.status) }}</span>
                        </div>
                    </div>
                </v-col>
            </v-row>

            <span v-if="filteredTickets.length > 0" class="text-h5 py-4 d-block">{{ translate.textCitizenTickets }}</span>

            <v-row class="ticket-list" v-if="filteredTickets.length > 0">
                <v-col cols="12" class="pb-0">
                    <div class="description">
                        <span class="date">{{ translate.textTicketsDate }}</span>
                        <span class="number">{{ translate.textTicketsNumb }}</span>
                        <span class="author">{{ translate.textTicketsAuthor }}</span>
                        <span class="name">{{ translate.textTicketsName }}</span>
                        <span class="status">{{ translate.textTicketsStatus }}</span>
                        <span class="buttons">{{ translate.textTicketsControls }}</span>
                    </div>
                </v-col>
                <v-col cols="12">
                    <div class="list tickets">
                        <div class="item-ticket" :class="`status_`+ ticket.status" v-for="(ticket, index) in filteredTickets" :key="index+`ticket`">
                            <span class="date">{{ convertTime(ticket.date) }}</span>
                            <span class="number">{{ getLawById(ticket.lawId)?.number }}</span>
                            <span class="author">{{ getOwnerById(ticket.author) }}</span>
                            <span class="name">{{ getLawById(ticket.lawId)?.name }}</span>
                            <span class="status">{{ getTicketStatus(ticket.status) }}</span>
                            <span class="buttons" v-if="ticket.author == policeUser.id || policeUserData.rank >= 15">
                                <v-btn size="x-small" color="secondary" @click="showDeleteModal(ticket.id)">{{ translate.textDelete }}</v-btn>
                            </span>
                        </div>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="text-right">
                    <v-btn color="secondary" @click="showModalNewTicket = true">{{ translate.textTicketNew }}</v-btn>
                </v-col>
            </v-row>
        </div>

        <ModalWindow
            :title="translate.textAreYouSure"
            v-model="showModal"
            @confirmed="handleConfirm">
        </ModalWindow>

        <ModalNewTicket
            v-model="showModalNewTicket">
        </ModalNewTicket>


    </div>
</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import type { PoliceUserData, Ticket, User, Vehicle, Weapon } from "@/types/types";
import { useCommon } from "@/composables/useCommon"
import ModalWindow from '@/components/modals/modal.vue';
import ModalNewTicket from '@/components/modals/modalNewTicket.vue';

const store = useAppStore();
const translate: any = useTranslation().translate
const user: User = store.activeUser;
const policeUser: User = store.user;
const defaultPoliceData = {rank:0, onDuty: 0, onPanic: false, callsign:"no data"}
const policeUserData: PoliceUserData = policeUser?.police || defaultPoliceData;
const userVehicleList = ref<Vehicle[]>(store.vehiclesList);
const userWeaponsList = ref<Weapon[]>(store.weaponsList);
const userTicketList = ref<Ticket[]>(store.ticketList);
const statusList = translate.statusList;
const vehStatusList = translate.vehStatusList;
const selectedStatus = ref(getStatus(user.status));
const { selectVehicleById, selectWeaponById, getUserById, getOwnerById, convertTime, convertDate, getLawById, getWeaponSerial } = useCommon();

function goBack() {
    store.changePageToLastpage();
}
function getLicense(license: boolean) {
    return translate.licenseText[license ? 0 : 1];
}
function getStatus(number: number) {
    const status = translate.statusList[number];
    return status ? status : translate.textStatusNotFound;
}

function getTicketStatus(number :number) {
    const status = translate.ticketStatusList[number];
    return status ? status : translate.textStatusNotFound;
}

function getVehicleStatus(number: number) {
    const status = translate.vehStatusList[number];
    return status ? status : translate.textStatusNotFound;
}

function getWeaponStatus(number: number) {
    const status = translate.weaponStatusList[number];
    return status ? status : translate.textStatusNotFound;
}

const filteredVehicles = computed(() => {
    return userVehicleList.value.filter((vehicle: Vehicle) => vehicle.owner === user.id);
});

const filteredWeapons = computed(() => {
    return userWeaponsList.value.filter((weapon: Weapon) => weapon.owner === user.id);
});

const filteredTickets = computed(() => {
    return userTicketList.value.filter((ticket: Ticket) => ticket.owner === user.id);
});

function changeUserStatus() {
    const selectedIndex = statusList.indexOf(selectedStatus.value);
    store.changeUserStatus(selectedIndex)
}

const showModal = ref(false);
let activeTicket = -1;

const showDeleteModal = (id: number) => {
    activeTicket = id;
    showModal.value = true;
}

const handleConfirm = () => {
    if (activeTicket != -1)
    store.removeTicketById(activeTicket);
};

const showModalNewTicket = ref(false);

</script>