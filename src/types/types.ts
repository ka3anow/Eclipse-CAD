
export interface AppState {
    data: string;
    playerid: number,
    user: User;
    count: number;
    page: number;
    subpage: number;
    lastSubPage: Array<number>,
    shiftList: Array<User>,
    patrolList: Array<Patrol>,
    residentList: Array<User>,
    vehiclesList: Array<Vehicle>,
    weaponsList: Array<Weapon>
    stateLaws: Array<Law>,
    tenCodes: Array<Codes>,
    policeCalls: Array<Calls>,
    ticketList: Array<Ticket>,
    loading: boolean,
    error: any,
    activeCall: Calls,
    activeUser: User,
    activeVehicle: Vehicle,
    activeWeapon: Weapon,
    callSearchQuery: string,
    residentSearchQuery: string,
    vehicleSearchQuery: string,
    weaponSearchQuery: string,
    ticketSearchQuery: string,
    lawSearchQuery: string,
    tenCodesSearchQuery: string,
    managementSearchQuery: string
}

export interface User {
    license: boolean;
    name: string;
    age: number;
    surname: string;
    id: number,
    gender: boolean,
    phone: string,
    balance: number,
    picture?: string,
    status: number,
    police?: PoliceUserData
}

export interface PoliceUserData {
    rank: number,
    onDuty: number,
    onPanic: boolean,
    callsign: string
}

export interface Vehicle {
    vehicleName: string,
    id: number,
    color: string,
    owner: number,
    seller: number,
    status: number,
    plate: string,
    type: number,
    vehicleType?: VehicleType,
    vehicleClass: string,
    vehicleManufacturer: string,
    vehicleImage: string,
}

export enum VehicleType
{
	VEHICLE_TYPE_NONE = -1,
	VEHICLE_TYPE_CAR = 0,
	VEHICLE_TYPE_PLANE = 1,
	VEHICLE_TYPE_TRAILER = 2,
	VEHICLE_TYPE_QUADBIKE = 3,
	VEHICLE_TYPE_DRAFT = 4,
	VEHICLE_TYPE_SUBMARINECAR = 5,
	VEHICLE_TYPE_AMPHIBIOUS_AUTOMOBILE = 6,
	VEHICLE_TYPE_AMPHIBIOUS_QUADBIKE = 7,
	VEHICLE_TYPE_HELI = 8,
	VEHICLE_TYPE_BLIMP = 9,
	VEHICLE_TYPE_AUTOGYRO = 10,
	VEHICLE_TYPE_BIKE = 11,
	VEHICLE_TYPE_BICYCLE = 12,
	VEHICLE_TYPE_BOAT = 13,
	VEHICLE_TYPE_TRAIN = 14,
	VEHICLE_TYPE_SUBMARINE = 15,
};

export interface Law {
    name: string,
    number: string,
    description: string,
    penalty: number,
    period: number,
    id: number
}

export interface Codes {
    code: string,
    description: string
}

export interface Weapon {
    name: string,
    serial: string,
    id: number,
    owner: number,
    seller: number,
    status: number,
    image: string
}

export interface Patrol {
    name: string,
    id: number,
    callsign: string,
    members: Array<number>,
}

export interface Calls {
    id: number,
    label: string,
    description: string,
    callid: number,
    units: Array<number>,
    status: number,
    date: string
}

export interface Ticket {
    id: number,
    owner: number,
    author: number,
    lawId: number,
    status: number,
    date: string,
}