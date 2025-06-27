import { Booking, CreateBookingData, ProcessedEvent } from "../types";

export function eventToBooking(event: ProcessedEvent): CreateBookingData {
  return {
    title: event.title,
    subtitle: event.subtitle || "",
    start: event.start,
    end: event.end,
  }
}

export function bookingToEvent(booking: Booking, currentUserId?: string): ProcessedEvent {
  const isOwner = !!(currentUserId && booking.user.id === currentUserId);

  return {
    event_id: booking.id,
    title: booking.title,
    subtitle: booking.subtitle || "",
    start: booking.start,
    end: booking.end,
    disabled: false,
    color: isOwner ? "#4CAF50" : "#9e9e9e",
    textColor: "#FFFFFF",
    editable: isOwner,
    deletable: isOwner,
    draggable: isOwner,
    allDay: false,
  };
}