<template>
    <div class="page d-flex justify-center align-center flex-column">
        <span class="text-white text-h5 text-uppercase">{{ translate.loading }}</span>
        
        <div class="loader mt-2">
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
            <div class="line line-4"></div>
            <div class="line line-5"></div>
            <div class="line line-6"></div>
            <div class="line line-7"></div>
            <div class="line line-8"></div>
            <div class="line line-9"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore, useTranslation } from "@/stores/app"
import { onMounted } from "vue";
const appStore = useAppStore()
const translate: any = useTranslation().translate
onMounted(() => {
    appStore.fetchAllData();
    setTimeout(closeLoader, 1000) // типа грузим данные
    
})
const closeLoader = () => {
    appStore.changePage(2)
}

</script>


<style scoped>
.line {
    width: 3px;
    height: 25px;
    background-color: #b2a889;
    margin: 0 6px;
    display: inline-block;
    animation: opacity-1 1s ease-in-out infinite
}

.line-1 {
    animation-delay: .8s
}
.line-2 {
    animation-delay: .6s
}
.line-3 {
    animation-delay: .4s
}
.line-4, .line-6 {
    animation-delay: .2s
}
.line-7 {
    animation-delay: .4s
}
.line-8 {
    animation-delay: .6s
}
.line-9 {
    animation-delay: .8s
}

@keyframes opacity-1 {
    0% {
        opacity: 1
    }

    50% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@keyframes opacity-2-0da753e8 {
    0% {
        opacity: 1;
        height: 15px
    }

    50% {
        opacity: 0;
        height: 12px
    }

    to {
        opacity: 1;
        height: 15px
    }
}
</style>