import { defineStore } from 'pinia';
import type { AppState, User, Vehicle, Law, Codes, Weapon, Patrol } from '@/types/types';
import { ref } from "vue"
import axios from 'axios';

const translation = ref({});
const response = await fetch('/translate.json');
if (!response.ok) {
    throw new Error('Failed to load translation file');
}
translation.value = await response.json();

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        data: "someData",
        user: {
            name: 'Jessie',
            surname: 'Pinkman',
            age: 30,
            id: 90,
            gender: true,
            phone: '555-5561',
            picture: '',
            balance: 500,
            status: 0,
            license: true,
            police: {
                rank: 4,
                onDuty: 0,
                callsign: 'L-01',
                onPanic: false,
            },
        },
        count: 0,
        page: 0,
        subpage: 0,
        lastSubPage: [],

        shiftList: [] as User[],
        patrolList: [] as Patrol[],

        activeUser: {} as User,
        activeVehicle: {} as Vehicle,
        activeWeapon: {} as Weapon,
        residentList: [] as User[],
        vehiclesList: [] as Vehicle[],
        weaponsList: [] as Weapon[],
        stateLaws: [] as Law[],
        tenCodes: [] as Codes[],
        residentSearchQuery: "",
        vehicleSearchQuery: "",
        weaponSearchQuery: "",
        lawSearchQuery: "",
        tenCodesSearchQuery: "",
        loading: true,
        error: ""
    }),
    actions: {
        setUser(name: string, age: number) {
            this.user.name = name;
            this.user.age = age;
        },
        addCount() {
            this.count += 1;
        },
        changePage(page: number) {
            this.page = page;
        },
        changeSubPage(subpage: number) {
            this.lastSubPage.push(this.subpage);
            if (this.lastSubPage.length >= 10) {
                this.lastSubPage.shift();
            }
            if (subpage != this.subpage) {
                this.subpage = subpage;
            }
        },
        changePageToLastpage() {
            const lastPage = this.lastSubPage.pop();
            if (lastPage !== undefined) {
                this.subpage = lastPage;
            }
        },
        changeDutyStatus(status: number) {
            if (this.user.police) {
                this.user.police.onDuty = status;

                // test
                const player: any = this.shiftList.find(user => user.id == this.user.id);
                if (player) {
                    player.police.onDuty = status;
                }
            }
        },
        changePanicStatus(status: boolean) {
            if (this.user.police) {
                this.user.police.onPanic = status;

                const player: any = this.shiftList.find(user => user.id == this.user.id);
                if (player) {
                    player.police.onPanic = !this.user.police.onPanic;
                }
            }
        },
        leavePlayerFromAllAdams(playerId: number) {
            this.patrolList.forEach(element => {
                const index = element.members.indexOf(playerId);
                if (index != -1) {
                    element.members.splice(index, 1);
                }
            });
        },
        joinPlayerToAdamById(playerId: number, adamId: number) {
            this.leavePlayerFromAllAdams(playerId);
            const Adam: any = this.patrolList.find(item => item.id === adamId);
            Adam.members.push(playerId);
        },
        leavePlayerFromAdamById(playerId: number, adamId: number) {
            const Adam: any = this.patrolList.find(item => item.id === adamId);
            const index = Adam?.members.indexOf(playerId);
            if (index != -1) {
                Adam.members.splice(index, 1);
            } else {
                console.log('error, player not found in Adam')
            }
        },
        removeAdamById(adamId: number) {
            const index: any = this.patrolList.findIndex(item => item.id === adamId);
            this.patrolList.splice(index, 1);
        },
        createNewAdam(adam: Patrol) {
            this.patrolList.push(adam);
        },
        changeUserStatus(status: number) {
            this.activeUser.status = status;
        },
        changeVehicleStatus(status: number) {
            this.activeVehicle.status = status;
        },
        changeWeaponStatus(status: number) {
            this.activeWeapon.status = status;
        },
        changeResidentSearchQuery(query: string) {
            this.residentSearchQuery = query;
        },
        changeVehicleSearchQuery(query: string) {
            this.vehicleSearchQuery = query;
        },
        changeWeaponSearchQuery(query: string) {
            this.weaponSearchQuery = query;
        },
        changeLawSearchQuery(query: string) {
            this.lawSearchQuery = query;
        },
        changeCodesSearchQuery(query: string) {
            this.tenCodesSearchQuery = query;
        },
        async fetchAllData() {
            this.loading = true;
            this.error = null;
            try {
                const [usersResponse, vehiclesResponse, weaponsResponse, lawsResponse, tenCodesResponse, shiftListResponse, patrolListResponse] = await Promise.all([
                    axios.get('/citizenList.json'),
                    axios.get('/carList.json'),
                    axios.get('/weaponList.json'),
                    axios.get('/stateLaws.json'),
                    axios.get('/tenCodes.json'),
                    axios.get('/shiftList.json'),
                    axios.get('/patrolList.json')
                ]);

                this.residentList = usersResponse.data.results;
                this.vehiclesList = vehiclesResponse.data.results;
                this.weaponsList = weaponsResponse.data.results;
                this.stateLaws = lawsResponse.data;
                this.tenCodes = tenCodesResponse.data;
                this.shiftList = shiftListResponse.data;
                this.patrolList = patrolListResponse.data;

            } catch (err) {
                this.error = err;
                this.page = 0;
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        
    },
});

export const useTranslation = defineStore('translation', {
    state: () => {
        return {
            translate: translation
        }
    }
});
