"use client";

import { ruTranslation } from "@/locales";
import { Scheduler } from "@aldabil/react-scheduler";
import { ru } from "date-fns/locale";
import { Alert, Typography } from "@mui/material";
import { useBookings } from "@/hooks/useBookings";

export default function TimeScheduler() {
  const {
    events,
    error,
    message,
    loading,
    session,
    status,
    onConfirm,
    onDelete,
    onEventDrop,
    clearError,
    clearMessage,
  } = useBookings();

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Typography>Загрузка...</Typography>
      </div>
    );
  }

  return (
    <div>
      {!session && (
        <Alert severity="warning" className="mb-4">
          Вы просматриваете в режиме "только для чтения". Войдите для создания бронирований.
        </Alert>
      )}

      {error && (
        <Alert 
          severity="error" 
          className="mb-4"
          onClose={clearError}
        >
          {error}
        </Alert>
      )}

      {message && (
        <Alert 
          severity="success" 
          className="mb-4"
          onClose={clearMessage}
        >
          {message}
        </Alert>
      )}
      
      <Scheduler 
        view="day"
        agenda={false}
        hourFormat="24"
        locale={ru}
        events={events}
        timeZone="Asia/Almaty"
        translations={ruTranslation}
        editable={!!session} 
        deletable={!!session} 
        disableViewer={false} 
        draggable={!!session}
        onDelete={onDelete}
        onConfirm={onConfirm}
        onEventDrop={onEventDrop}
      />
    </div>
  );
}