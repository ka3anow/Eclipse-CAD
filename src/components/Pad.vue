<template>
    <div class="pad text-white">
        <div class="pad_inner">
            <Transition>
                <div class="page mainpage" v-if="appStore.page == 0">

                    <div class="logo"></div>

                    <div class="text-h3 text-uppercase text-white font-weight-medium">{{ translate.cadName }}</div>

                    <v-btn color="secondary" class="enter text-blueA font-weight-medium" size="x-large" @click="changePage(1)">
                        {{ translate.buttonEnter }}
                    </v-btn>

                    <div class="text-h5 text-uppercase text-white position-absolute bottom-0 mb-4 font-weight-medium">{{ translate.cadSlogan }}</div>
                </div>
            </Transition>

            <Transition>
                <loader v-if="appStore.page == 1" />
            </Transition>

            <Transition>
                <MainPage v-if="appStore.page == 2" />
            </Transition>

        </div>
    </div>
</template>

<script setup lang="ts">

import { useAppStore, useTranslation } from "@/stores/app"
const appStore = useAppStore()
const playerData = appStore.user
function changePage(number: number) {
  appStore.changePage(number);
}
const translate: any = useTranslation().translate
</script>