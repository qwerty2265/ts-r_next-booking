export interface Booking {
  id: string;
  title: string;
  subtitle?: string;
  start: Date;
  end: Date;
  user: {
    id: string;
    name: string;
    email: string;
  }
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingData {
  title: string;
  subtitle: string;
  start: Date;
  end: Date;
}

export interface UpdateBookingData {
  title?: string;
  subtitle?: string;
  start?: Date;
  end?: Date;
}

export type ProcessedEvent = {
  event_id: number | string;
  title: string;
  subtitle?: string;
  start: Date;
  end: Date;
  disabled?: boolean;
  color?: string;
  textColor?: string;
  editable?: boolean;
  deletable?: boolean;
  draggable?: boolean;
  allDay?: boolean;
};