import { useAppStore, useTranslation } from "@/stores/app";
import type { Calls, Law, User, Vehicle, Weapon } from "@/types/types";

export function useCommon() {
    const store = useAppStore();
    const userList: User[] = store.residentList;
    const policeList: User[] = store.shiftList;
    const vehiclesList: Vehicle[] = store.vehiclesList;
    const weaponsList: Weapon[] = store.weaponsList;
    const callList: Calls[] = store.policeCalls
    const stateLaws: Law[] = store.stateLaws;
    const translate: any = useTranslation().translate;

    function getOwnerById(id: number) {
        const owner = userList.find((user: User) => user.id == id)
        return owner? `${owner.name} ${owner.surname}` : translate.textNotFound;
    }
    
    function selectUserById(id: number) {
        const foundUser = userList.find((user : User) => user.id == id);
        if (foundUser) {
            store.activeUser = foundUser;
            store.changeSubPage(10);
        }
    }

    function editUserById(id: number) {
        const foundUser = userList.find((user : User) => user.id == id);
        if (foundUser) {
            store.activeUser = foundUser;
            store.changeSubPage(80);
        }
    }

    function selectVehicleById(id: number) {
        const foundVehicle = vehiclesList.find((veh : Vehicle) => veh.id == id);
        if (foundVehicle) {
            store.activeVehicle = foundVehicle;
            store.changeSubPage(20);
        }
    }

    function selectWeaponById(id: number) {
        const foundWeapon = weaponsList.find((weapon: Weapon) => weapon.id == id);
        if (foundWeapon) {
            store.activeWeapon = foundWeapon;
            store.changeSubPage(30);
        }
    }

    function selectCallById(id: number) {
        const foundCall = callList.find((call: Calls) => call.id == id);
        if (foundCall) {
            store.activeCall = foundCall;
            store.changeSubPage(40); 
        }
    }

    const getUserById = (userId: number): User | null => {
        const owner = userList.find((item: User) => item.id == userId)
        return owner || null;
    }

    const getPoliceUserById = (userId: number): User | null => {
        const owner = policeList.find((item: User) => item.id == userId)
        return owner || null;
    }

    const getLawById = (id:number): Law | null  => {
        const law = stateLaws.find((item: Law) => item.id == id)
        return law || null;
    }

    const getWeaponSerial = (serial: string) => {
        return serial? serial: translate.textWeaponUnregistered;
    }

    const convertTime = (date : string) => {
        const newDate = new Date(date);
        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();
        return `${hours}:${minutes}`
    }
    
    const convertDate = (date: string) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        let month = newDate.getMonth();
        month += 1;
        const year = newDate.getFullYear();
        return `${day}.${month}.${year}`
    }

    return {
        getOwnerById,
        getUserById,
        getPoliceUserById,
        selectUserById,
        selectVehicleById,
        selectCallById,
        selectWeaponById,
        convertTime,
        convertDate,
        getLawById,
        getWeaponSerial,
        editUserById
    }
}

