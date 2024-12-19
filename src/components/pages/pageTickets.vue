<template>
    <div>
        <div class="subpage">
            <div class="d-flex justify-space-between mb-2">
                <span class="text-h4 shadow">{{ translate.buttonTickets }}</span>
                <div class="search">
                    <v-text-field
                        :label="translate.textTicketsSearchLabel"
                        :hint="translate.textTicketsSearchHint"
                        color="secondary"
                        v-model="searchQuery"
                        @update:modelValue="changeSearchQuery"
                    ></v-text-field>
                </div>
            </div>
            <v-row class="ticket-list">
                <v-col cols="12" class="pb-0">
                    <div class="description">
                        <span class="date">{{ translate.textTicketsDate }}</span>
                        <span class="number">{{ translate.textTicketsNumb }}</span>
                        <span class="author">{{ translate.textTicketsOwner }}</span>
                        <span class="name">{{ translate.textTicketsName }}</span>
                        <span class="status">{{ translate.textTicketsStatus }}</span>
                        <span class="buttons">{{ translate.textTicketsControls }}</span>
                    </div>
                </v-col>
                <v-col cols="12" class="list tickets">
                    <div class="item-ticket" :class="`status_`+ ticket.status" v-for="(ticket, index) in filteredTickets" :key="index+`ticket`">
                        <span class="date">{{ convertTime(ticket.date) }}</span>
                        <span class="number">{{ getLawById(ticket.lawId)?.number }}</span>
                        <span class="author">{{ getOwnerById(ticket.owner) }}</span>
                        <span class="name">{{ getLawById(ticket.lawId)?.name }}</span>
                        <span class="status">{{ getTicketStatus(ticket.status) }}</span>
                        <span class="buttons" v-if="ticket.author == user.id || policeUserData.rank >= 15">
                            <v-btn size="x-small" color="secondary" @click="showDeleteModal(ticket.id)">{{ translate.textDelete }}</v-btn>
                        </span>
                    </div>
                </v-col>
            </v-row>
            
        </div>

        <ModalWindow
            :title="translate.textAreYouSure"
            v-model="showModal"
            @confirmed="handleConfirm">
        </ModalWindow>
    </div>
</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import type { PoliceUserData, Ticket } from "@/types/types";
import ModalWindow from '@/components/modals/modal.vue';
import { useCommon } from "@/composables/useCommon"
const { getOwnerById, convertTime, convertDate, getLawById} = useCommon();
const store = useAppStore();
const translate: any = useTranslation().translate
const user = store.user;
const policeDefaultUserData = {rank:0, onDuty: 0, onPanic: false, callsign:"no data"}
const policeUserData: PoliceUserData = user?.police || policeDefaultUserData;
const ticketList = ref<Ticket[]>(store.ticketList);
const searchQuery = ref<string>(store.ticketSearchQuery)

function getTicketStatus(number :number) {
    const status = translate.ticketStatusList[number];
    return status ? status : translate.textStatusNotFound;
}

function changeSearchQuery() {
    store.changeTicketSearchQuery(searchQuery.value);
}

const filteredTickets = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return ticketList.value.filter((ticket: Ticket) => {
        let mergedString = Object.values(ticket).join(' ').toLowerCase();
        if (translate.ticketStatusList[ticket.status]) {
            mergedString += translate.ticketStatusList[ticket.status].toLowerCase();
        }
        mergedString += convertTime(ticket.date);
        mergedString += convertDate(ticket.date);
        mergedString += getOwnerById(ticket.owner).toLowerCase();

        const law = getLawById(ticket.lawId);
        if (law) {
            mergedString += law.name.toLowerCase();
            mergedString += law.number.toLowerCase();
        }
        return (
            mergedString.includes(query)
        );
    });
});


const showModal = ref(false);
let activeTicket = -1;

const showDeleteModal = (id:number) => {
    activeTicket = id;
    showModal.value = true;
}

const handleConfirm = () => {
    if (activeTicket != -1)
    store.removeTicketById(activeTicket);
};

</script>