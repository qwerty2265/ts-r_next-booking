export interface Booking {
  id: string;
  title: string;
  subtitle?: string;
  start: Date;
  end: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingData {
  title: string;
  subtitle?: string;
  start: Date;
  end: Date;
}

export interface UpdateBookingData {
  title?: string;
  subtitle?: string;
  start?: Date;
  end?: Date;
}