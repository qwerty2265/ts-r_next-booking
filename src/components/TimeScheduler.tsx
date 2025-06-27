"use client";

import { ruTranslation } from "@/locales";
import { Scheduler } from "@aldabil/react-scheduler";
import { ru } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { Alert, Button } from "@mui/material";

export default function TimeScheduler() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center p-4">Загрузка...</div>;
  }

  return (
    <div>
      {!session && (
        <Alert 
          severity="warning" 
          className="mb-4"
        >
          Вы просматриваете в режиме "только для чтения". Войдите для создания бронирований.
        </Alert>
      )}
      
      <Scheduler 
        view="day"
        agenda={false}
        hourFormat="24"
        locale={ru}
        timeZone="Asia/Almaty"
        translations={ruTranslation}
        editable={!!session} 
        deletable={!!session} 
        disableViewer={!session} 
      />
    </div>
  );
}