import { useAppStore, useTranslation } from "@/stores/app";
import type { User, Vehicle, Weapon } from "@/types/types";

export function useCommon() {
    const store = useAppStore();
    const userList: User[] = store.residentList;
    const policeList: User[] = store.shiftList;
    const vehiclesList: Vehicle[] = store.vehiclesList;
    const weaponsList: Weapon[] = store.weaponsList;
    const translate: any = useTranslation().translate;

    function getOwnerById(vehId: number) {
        const owner = userList.find((item: { id: number; }) => item.id == vehId)
        return owner? `${owner.name} ${owner.surname}` : translate.textNotFound;
    }

    
    function selectUserById(id: number) {
        const foundUser = userList.find((user : {id: number}) => user.id == id);
        if (foundUser) {
            store.activeUser = foundUser;
            store.changeSubPage(10);
        }
    }

    function selectVehicleById(id: number) {
        const foundVehicle = vehiclesList.find((veh : {id: number}) => veh.id == id);
        if (foundVehicle) {
            store.activeVehicle = foundVehicle;
            store.changeSubPage(20);
        }
    }

    function selectWeaponById(id: number) {
        const foundWeapon = weaponsList.find((weapon: {id : number}) => weapon.id == id);
        if (foundWeapon) {
            store.activeWeapon = foundWeapon;
            store.changeSubPage(30);
        }
    }

    const getUserById = (userId: number): User | null => {
        const owner = userList.find((item: { id: number; }) => item.id == userId)
        return owner || null;
    }

    const getPoliceUserById = (userId: number): User | null => {
        const owner = policeList.find((item: { id: number; }) => item.id == userId)
        return owner || null;
    }

    return {
        getOwnerById,
        selectUserById,
        selectVehicleById,
        getUserById,
        selectWeaponById,
        getPoliceUserById
    }
}

