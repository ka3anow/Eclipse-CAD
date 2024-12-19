<template>
    <Transition name="list">
        <div v-if="isVisible" class="modal-overlay">

            <div class="modal-full">
                <div class="mb-4 d-flex justify-space-between">
                    <span class="text-h4 shadow">{{ translate.textTicketNew }}</span>
                    <v-btn color="secondary" variant="outlined" class="px-10" elevation="6" @click="close()">{{ translate.textTicketCancel }}</v-btn>
                </div>

                <h5 class="text-h5">{{ translate.textTicketOfficer }}: {{ getUserById(policeUser.id)?.name }} {{ getUserById(policeUser.id)?.surname }}</h5>
                <h5 class="text-h5">{{ translate.textTicketPerpetrator }}: {{ getUserById(activeUser.id)?.name }} {{ getUserById(activeUser.id)?.surname }}</h5>
                <h5 class="text-h5">{{ translate.textTicketDate }}: {{ getCurrentDate() }}</h5>
                <h5 class="text-h5">{{ translate.textTicketLaw }}: <span v-if="activeLawId != -1">{{ getLawById(activeLawId)?.name }}</span><span v-else>{{ translate.textTicketNone }}</span></h5>

                <div class="law-list">
                    <div :class="{active: activeLawId == law.id}" class="law-item" v-for="law in lawList" v-ripple @click="selectActiveLawId(law.id)">
                        <span class="number">{{ law.number }}</span>
                        <span class="name">{{ law.name }}</span>
                        <span class="period">{{ law.period }}{{ translate.textPeriodUnit }}</span>
                        <span class="penalty">{{ law.penalty }}{{ translate.textPeriodPenalty }}</span>
                    </div>
                </div>

                <div class="text-right">
                    <v-btn :disabled="activeLawId == -1" density="comfortable" color="secondary" size="x-large" @click="confirm">{{translate.textConfirm}}</v-btn>
                </div>
                
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation, useAppStore } from "@/stores/app";
import type { Law, Ticket, User } from '@/types/types';
import { useCommon } from "@/composables/useCommon"
const translate: any = useTranslation().translate
const store = useAppStore();
const { getUserById, convertTime, convertDate, getLawById} = useCommon();
const policeUser: User = store.user;
const activeUser: User = store.activeUser;
const lawList: Law[] = store.stateLaws;

const emit = defineEmits(['update:modelValue', 'confirmed']);
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});
const isVisible = ref(false);

if (props.modelValue !== isVisible.value) {
    isVisible.value = props.modelValue;
}

watch(() => props.modelValue, (newValue) => {
    isVisible.value = newValue;
});

const close = () => {
    emit('update:modelValue', false);
};

const date = new Date;
const getCurrentDate = () => {
    return convertTime(date.toString()) + ` ` + convertDate(date.toString())
}
const activeLawId = ref(-1);

const confirm = () => {
    if (activeLawId.value == -1) return
    const lastTicketIdIndex = store.ticketList[store.ticketList.length - 1].id;
    let newTicket: Ticket = {
        id: lastTicketIdIndex + 1,
        owner: activeUser.id,
        author: policeUser.id, 
        lawId: activeLawId.value,
        status: 0,
        date: date.toString(),
    }
    activeLawId.value = -1;
    store.createNewTicket(newTicket);
    emit('confirmed');
    close();
};

function selectActiveLawId(id: number) {
    if (activeLawId.value == id) {
        activeLawId.value = -1;
    } else {
        activeLawId.value = id;
    }

}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        close();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>