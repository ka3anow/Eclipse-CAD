<template>
    <div>
        <div class="subpage">
            <div class="d-flex justify-space-between mb-2">
                <span class="text-h4 shadow">{{ translate.buttonManagement }}</span>
                <div class="search">
                    <v-text-field 
                        :label="translate.textManagementSearchLabel"
                        :hint="translate.textManagementSearchHint"
                        color="secondary"
                        v-model="searchQuery"
                        @update:modelValue="changeSearchQuery"
                    ></v-text-field>
                </div>
            </div>
            <div class="description police mb-2">
                <span class="id">{{translate.textManagementId}}</span>
                <span class="name">{{ translate.textManagementName }}</span>
                <span class="phone">{{ translate.textManagementName }}</span>
                <span class="callsign">{{ translate.textManagementCallsign }}</span>
                <span class="rank">{{ translate.textManagementRank }}</span>
                <span class="status">{{ translate.textManagementStatus }}</span>
            </div>
            <div class="list police">
                <div class="item-list" v-ripple :class="'onduty_'+user.police?.onDuty" v-for="(user, index) in filteredUsers" :key="index + '_uuid'" @click="editUserById(user.id)" >
                    <span class="id">{{ user.id }}</span>
                    <span class="name">{{ user.name }} {{ user.surname }}</span>
                    <span class="phone">{{ user.phone }}</span>
                    <span class="callsign">{{ user.police?.callsign }}</span>
                    <span class="rank">
                        {{ getPlayerRank(user.police?.rank!) }}
                    </span>
                    <span class="status">
                        <span :class="'onduty duty_' + user.police?.onDuty"></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore, useTranslation } from "@/stores/app";
import { useCommon } from "@/composables/useCommon";
import type { User } from '@/types/types';

const store = useAppStore();
const { getUserById, editUserById } = useCommon();
const shiftList = ref<User[]>(store.shiftList);
const searchQuery = ref<string>(store.residentSearchQuery);
const translate: any = useTranslation().translate

function changeSearchQuery() {
    store.changeManagementSearchQuery(searchQuery.value);
}

function getPlayerRank(rank: number) {
    const status = translate.rankList.find((item: { id: number; }) => item.id == rank)
    return status ? status.name : translate.textRankNotFound;
}

const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return shiftList.value.filter((user: User) => {
        let mergedString = Object.values(user).join(' ');
        mergedString =  mergedString.toLowerCase() + translate.statusList[user.status].toLowerCase();
        mergedString += user.police?.callsign.toLowerCase();
        return (
            mergedString.includes(query)
        );
    });
});

</script>