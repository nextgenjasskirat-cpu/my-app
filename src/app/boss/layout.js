import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "@/app/components/extres/scrollToTop";
import { UserProvider } from "@/app/components/extres/userContext"; 
import ProtectedAdminRoute from "@/app/components/extres/protectedAdminRoute"; 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Section",
  description: "Admin Section",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <ProtectedAdminRoute>
            <ScrollToTop />
           
           {children}
          </ProtectedAdminRoute>
        </UserProvider>
      </body>
    </html>
  );
}