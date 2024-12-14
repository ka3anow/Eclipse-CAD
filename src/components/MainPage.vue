<template>
    <div class="page ">
        <app-header></app-header>
        <div class="content">
            <app-leftmenu />
            <div class="right-block">
                <transition name="list">
                    <page-mainpanel v-if="store.subpage == 0" />
                </transition>
                <transition name="list">
                    <page-calls v-if="store.subpage == 1" />
                </transition>

                <transition name="list">
                    <page-residentbase v-if="store.subpage == 2" />
                </transition>

                <transition name="list">
                    <page-vehicle-database v-if="store.subpage == 3" />
                </transition>

                <transition name="list">
                    <page-weapons-database v-if="store.subpage == 4" />
                </transition>

                <transition name="list">
                    <page-tickets v-if="store.subpage == 5" />
                </transition>

                <transition name="list">
                    <page-laws v-if="store.subpage == 6" />
                </transition>

                <transition name="list">
                    <page-ten-codes v-if="store.subpage == 7" />
                </transition>

                <transition name="list">
                    <page-management v-if="store.subpage == 8" />
                </transition>



                <transition name="list">
                    <page-resident-info v-if="store.subpage == 10" />
                </transition>

                <transition name="list">
                    <page-vehicle-info v-if="store.subpage == 20" />
                </transition>

                <transition name="list">
                    <page-weapon-info v-if="store.subpage == 30" />
                </transition>
                
                <transition name="list">
                    <page-call-info v-if="store.subpage == 40" />
                </transition>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
const store = useAppStore();

</script>