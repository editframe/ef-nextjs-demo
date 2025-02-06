import type { Metadata } from "next";
import "./globals.css";
import { initializeDatabase } from '@/app/lib/db';

// Initialize database on app startup
if (process.env.NODE_ENV !== 'test') {
  try {
    initializeDatabase();
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
