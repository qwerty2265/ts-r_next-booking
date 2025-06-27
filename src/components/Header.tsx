"use client";

import { Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const {data: session} = useSession();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link href="/" className="text-2xl font-bold">
          Расписание
        </Link>
      </div>

      {session ? (
        <div className="flex gap-4 items-center">
          <Typography>
            {`${session.user.name} ${session.user.email}`}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Выйти
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/auth/login" className="text-xl font-medium hover:underline">
            Логин
          </Link>
          <Link href="/auth/register" className="text-xl font-medium hover:underline">
            Регистрация
          </Link>
        </div>
      )}
    </header>
  )
}