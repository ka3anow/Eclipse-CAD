<template>
    <header>
        <div class="logo"></div>
        <span class="text-h4 text-secondary font-weight-medium">{{ translate.cadDescription }}</span>
        <v-btn variant="outlined" class="text-secondary px-14" size="large" elevation="8" @click="exit()">{{ translate.buttonExit }}</v-btn>
    </header>
</template>


<script setup lang="ts">

import { useAppStore, useTranslation } from "@/stores/app"

const exit = () => {
    useAppStore().changePage(0)
}
const translate: any = useTranslation().translate

</script>