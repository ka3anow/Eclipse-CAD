<template>
    <div class="subpage">
        <div class="d-flex justify-space-between mb-2">
            <span class="text-h4 shadow">{{ translate.buttonCodes }}</span>
            <div class="search">
                <v-text-field
                    :label="translate.textTenCodesSearchLabel"
                    :hint="translate.textTenCodesSearchHint"
                    color="secondary"
                    v-model="searchQuery"
                    @update:modelValue="changeSearchQuery"
                ></v-text-field>
            </div>
        </div>
        <div class="list">
            <div class="item-list-code" v-for="item in filteredCodes">
                <span>{{ item.code }}</span> — {{ item.description }}
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useAppStore, useTranslation } from "@/stores/app";
import type { Codes } from "@/types/types";
const store = useAppStore();
const translate: any = useTranslation().translate;
const tenCodes = ref<Codes[]>(store.tenCodes);
const searchQuery = ref<string>(store.tenCodesSearchQuery)

function changeSearchQuery() {
    store.changeCodesSearchQuery(searchQuery.value);
}

const filteredCodes = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return tenCodes.value.filter((code: Codes) => {
        let mergedString = Object.values(code).join(' ').toLowerCase();
        return (
            mergedString.includes(query)
        );
    });
});
</script>