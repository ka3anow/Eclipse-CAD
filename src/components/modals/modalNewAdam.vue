<template>
    <Transition name="list">
        <div v-if="isVisible" class="modal-overlay">
            <div class="modal-content">
                <h3>{{ translate.textCreateNew }}</h3>
                <slot>
                    <v-text-field
                        v-model="adam.name"
                        :label="translate.textAdamName"
                        :rules="nameRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="adam.callsign"
                        :label="translate.textAdamCallsign"
                        :rules="callsingRules"
                        required
                    ></v-text-field>
                </slot>
                <div class="controls">
                    <v-btn density="comfortable" @click="close">{{ translate.textCancel }}</v-btn>
                    <v-btn density="comfortable" color="secondary" @click="confirm">{{translate.textConfirm}}</v-btn>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation, useAppStore } from "@/stores/app";
import type { Patrol } from '@/types/types';
const translate: any = useTranslation().translate
const store = useAppStore();

const props = defineProps({
    title: {
        type: String,
        default: "",
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue', 'confirmed']);
const isVisible = ref(props.modelValue);

let adam = ref({
    name: "",
    callsign: "",
});

const close = () => {
    isVisible.value = false;
    emit('update:modelValue', false);
};

if (props.modelValue !== isVisible.value) {
    isVisible.value = props.modelValue;
}

watch(() => props.modelValue, (newValue) => {
    isVisible.value = newValue;
});


const nameRules: any[] = [
    (value: any) => (value?.length <= 9) || translate.textErrorA,
    (value: any) => (value.length >= 1) || translate.textErrorB,
];

const callsingRules: any[] = [
    (value: any) => (value?.length <= 9) || translate.textErrorC,
    (value: any) => (value.length >= 1) || translate.textErrorD,
];

const validateInputs = () => {
    const nameValidationErrors = nameRules
        .map(rule => rule(adam.value.name))
        .filter(error => error !== true);
    const callsignValidationErrors = callsingRules
        .map(rule => rule(adam.value.callsign))
        .filter(error => error !== true);
    if (nameValidationErrors.length || callsignValidationErrors.length) {
        return false;
    } else {
        return true;
    }
};

const confirm = () => {
    const validationResults = validateInputs();
    if (validationResults) {
        const lastAdamIdIndex = store.patrolList[store.patrolList.length - 1].id;
        let newAdam: Patrol = {
            name: adam.value.name,
            id: lastAdamIdIndex + 1,
            callsign: adam.value.callsign,
            members: []
        }
        store.createNewAdam(newAdam);
        adam.value.name = "";
        adam.value.callsign = "";
        emit('confirmed');
        close();
    }
};

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