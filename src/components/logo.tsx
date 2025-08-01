import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-base shadow-md">
          OF
        </div>
        <span className="text-lg font-semibold text-slate-800 dark:text-white">
          Omar Faruk
        </span>
      </div>
    </Link>
  );
}
