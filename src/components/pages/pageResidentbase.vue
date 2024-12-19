<template>
    <div class="subpage">
        <div class="d-flex justify-space-between mb-2">
            <span class="text-h4 shadow">{{ translate.buttonResidents }}</span>
            <div class="search">
                <v-text-field 
                    :label="translate.textCitizenSearchLabel"
                    :hint="translate.textCitizenSearchHint"
                    color="secondary"
                    v-model="searchQuery"
                    @update:modelValue="changeSearchQuery"
                ></v-text-field>
            </div>
        </div>
        <div class="description mb-2">
            <span class="id">{{ translate.textId }}</span>
            <span class="name">{{ translate.textName }}</span>
            <span class="phone">{{ translate.textPhone }}</span>
            <span class="age">{{ translate.textAge }}</span>
            <span class="status">{{ translate.textStatus }}</span>
        </div>
        <div class="list">
            <div class="item-list" v-ripple :class="'status_'+user.status" v-for="(user, index) in filteredUsers" :key="index + '_uuid'" @click="selectUserById(user.id)" >
                <span class="id">{{ user.id }}</span>
                <span class="name">{{ user.name }} {{ user.surname }}</span>
                <span class="phone">{{ user.phone }}</span>
                <span class="age">{{ user.age }}</span>
                <span class="status">{{ getStatus(user.status) }}</span>
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
const translate: any = useTranslation().translate
const residentList = ref<User[]>(store.residentList);
const searchQuery = ref<string>(store.residentSearchQuery);
const { selectUserById } = useCommon();

function getStatus(number: number) {
    const status = translate.statusList[number];
    if (number != 1) {
        return status ? status : translate.textStatusNotFound;
    }
}

function changeSearchQuery() {
    store.changeResidentSearchQuery(searchQuery.value);
}

const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return residentList.value.filter((user: User) => {
        let mergedString = Object.values(user).join(' ');
        mergedString =  mergedString.toLowerCase() + translate.statusList[user.status].toLowerCase();
        return (
            mergedString.includes(query)
        );
    });
});

</script>