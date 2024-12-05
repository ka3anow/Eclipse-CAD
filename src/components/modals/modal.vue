<template>
    <Transition name="list">
        <div v-if="isVisible" class="modal-overlay">
            <div class="modal-content">
                <h3>{{ title }}</h3>
                <slot></slot>
                <div class="controls">
                    <v-btn density="comfortable" @click="close">{{ translate.textCancel }}</v-btn>
                    <v-btn density="comfortable" color="error" @click="confirm">{{translate.textConfirm}}</v-btn>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTranslation } from "@/stores/app";
const translate: any = useTranslation().translate

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

const close = () => {
    isVisible.value = false;
    emit('update:modelValue', false);
};

const confirm = () => {
    emit('confirmed');
    close();
};

if (props.modelValue !== isVisible.value) {
    isVisible.value = props.modelValue;
}

watch(() => props.modelValue, (newValue) => {
    isVisible.value = newValue;
});

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