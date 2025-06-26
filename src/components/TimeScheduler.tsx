"use client";
import { ruTranslation } from "@/locales";
import { Scheduler } from "@aldabil/react-scheduler";
import { ru } from "date-fns/locale";

export default function TimeScheduler() {
  return (
    <div>
      <Scheduler 
        view="day"
        agenda={false}
        hourFormat="24"
        locale={ru}
        timeZone="Asia/Almaty"
        translations={ruTranslation}
      />
    </div>
  )
}