<template>
    <div class="subpage">
        <div class="d-flex justify-space-between mb-2">
            <span class="text-h4 shadow">{{ translate.buttonLaws }}</span>
            <div class="search">
                <v-text-field
                    :label="translate.textLawSearchLabel"
                    :hint="translate.textLawSearchHint"
                    color="secondary"
                    v-model="searchQuery"
                    @update:modelValue="changeSearchQuery"
                ></v-text-field>
            </div>
        </div>
        <div class="description laws mb-2">
            <span class="numb">{{ translate.textLawNumber }}</span>
            <span class="name">{{ translate.textLawName }}</span>
            <span class="period">{{ translate.textPeriod }}</span>
            <span class="penalty">{{ translate.textPenalty }}</span>
        </div>
        <div class="list">
            <div class="item-list-code mb-1" v-for="(item, index) in filteredLaws" :key="index + 'law'">
                <span class="numb">{{ item.number }}</span>
                <span class="name">{{ item.name }}</span>
                <span class="period">{{ item.period }}{{ translate.textPeriodUnit }}</span>
                <span class="penalty">{{ item.penalty }}{{ translate.textPeriodPenalty }}</span>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import type { Law } from "@/types/types";
const store = useAppStore();
const translate: any = useTranslation().translate;
const stateLaws = ref<Law[]>(store.stateLaws);
const searchQuery = ref<string>(store.lawSearchQuery)

function changeSearchQuery() {
    store.changeLawSearchQuery(searchQuery.value);
}

const filteredLaws = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return stateLaws.value.filter((law: Law) => {
        let mergedString = Object.values(law).join(' ').toLowerCase();
        return (
            mergedString.includes(query)
        );
    });
});

</script>