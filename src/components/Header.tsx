import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link href="/" className="text-2xl font-bold">
          Расписание
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/auth/login" className="text-xl font-semibold">
          Логин
        </Link>
        <Link href="/auth/register" className="text-xl font-semibold">
          Регистрация
        </Link>
      </div>
    </header>
  )
}