import { useState, useEffect, DragEvent } from "react";
import { useSession } from "next-auth/react";
import { EventActions } from "@aldabil/react-scheduler/types";
import { 
  createBooking, 
  deleteBooking, 
  getAllBookings, 
  updateBooking 
} from "@/lib/actions";
import { ProcessedEvent } from "@/lib/types";
import { bookingToEvent, eventToBooking } from "@/lib/adapters";

export function useBookings() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<ProcessedEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "loading") return;
    loadAllBookings();
  }, [status, session?.user?.id]);

  const loadAllBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const bookings = await getAllBookings();
      const processedEvents = bookings.map(booking => 
        bookingToEvent(booking, session?.user?.id)
      );
      
      setEvents(processedEvents);
      console.log("Загруженные бронирования:", processedEvents);
    } catch (error) {
      setError("Не удалось загрузить бронирования");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event: ProcessedEvent): Promise<ProcessedEvent> => {
    if (!session) {
      throw new Error("Unauthorized");
    }

    const bookingData = eventToBooking(event);
    const result = await createBooking(
      bookingData.title,
      bookingData.start,
      bookingData.end,
      bookingData.subtitle
    );
    
    if (result.success) {
      const newEvent = bookingToEvent(result.booking, session.user?.id);
      setEvents(prev => [...prev, newEvent]);
      setMessage("Вы успешно забронировали комнату");
      return newEvent;
    } else {
      throw new Error("Create failed");
    }
  };

  const handleUpdate = async (event: ProcessedEvent): Promise<ProcessedEvent> => {
    if (!session) {
      throw new Error("Unauthorized");
    }

    const bookingData = eventToBooking(event);
    const result = await updateBooking(
      event.event_id.toString(),
      bookingData.title,
      bookingData.start,
      bookingData.end,
      bookingData.subtitle
    );

    if (result.success) {
      const updatedEvent = bookingToEvent(result.booking, session.user?.id);
      setEvents(prev => 
        prev.map(e => 
          e.event_id === event.event_id ? updatedEvent : e
        )
      );
      setMessage("Вы успешно обновили бронирование");
      return updatedEvent;
    } else {
      throw new Error("Update failed");
    }
  };

  const handleDelete = async (deletedId: string): Promise<void> => {
    if (!session) {
      throw new Error("Unauthorized");
    }

    const result = await deleteBooking(deletedId);
    if (result.success) {
      setEvents(prev => prev.filter(event => 
        event.event_id.toString() !== deletedId
      ));
      setMessage("Бронирование успешно удалено");
    } else {
      throw new Error("Delete failed");
    }
  };

  const onConfirm = async (event: ProcessedEvent, action: EventActions): Promise<ProcessedEvent> => {
    try {
      setError(null);
      setMessage(null);

      switch (action) {
        case "create":
          return await handleCreate(event);
        case "edit":
          return await handleUpdate(event);
        default:
          throw new Error("Unsupported action");
      }
    } catch (error) {
      const errorMessage = `Ошибка при ${action === "create" ? "создании" : "обновлении"} бронирования`;
      setError(errorMessage);
      throw error;
    }
  };

  const onDelete = async (deletedId: string): Promise<void> => {
    try {
      setError(null);
      setMessage(null);
      await handleDelete(deletedId);
    } catch (error) {
      setError("Не удалось удалить бронирование");
      throw error;
    }
  };

  const onEventDrop = async (
    event: DragEvent<HTMLButtonElement>,
    droppedOn: Date,
    updatedEvent: ProcessedEvent,
    originalEvent: ProcessedEvent
  ): Promise<ProcessedEvent> => {
    try {
      setError(null);
      setMessage(null);
      
      console.log("Перетаскивание события:", {
        from: originalEvent.start,
        to: updatedEvent.start,
        eventId: updatedEvent.event_id
      });

      const result = await handleUpdate(updatedEvent);
      setMessage("Событие успешно перемещено");
      return result;
    } catch (error) {
      setError("Ошибка при перемещении события");
      throw error;
    }
  };

  const clearError = () => setError(null);
  const clearMessage = () => setMessage(null);

  return {
    // Состояние
    events,
    error,
    message,
    loading,
    session,
    status,
    
    // Действия
    onConfirm,
    onDelete,
    onEventDrop,
    loadAllBookings,
    clearError,
    clearMessage,
  };
}