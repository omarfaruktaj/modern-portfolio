import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-100 dark:bg-neutral-900">
      <div className="flex flex-col items-center max-w-md">
        <FaExclamationTriangle className="h-16 w-16 text-neutral-500 dark:text-neutral-400 mb-6" />

        <h1 className="text-6xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          Page not found
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
}
