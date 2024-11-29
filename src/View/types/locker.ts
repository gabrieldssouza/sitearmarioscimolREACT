export type LockerStatus = 'available' | 'occupied' | 'expiring' | 'overdue';

export interface LockerInfo {
  id: string;
  number: number;
  building: string;
  floor: string;
  status: LockerStatus;
  student?: {
    name: string;
    class: string;
    phone: string;
    email: string;
  };
  rentalPeriod?: {
    start: string;
    end: string;
  };
}

export interface Building {
  id: string;
  name: string;
  floors: string[];
}

