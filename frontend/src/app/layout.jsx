import "../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Oxanium } from "next/font/google";
const oxanium = Oxanium({ subsets: ["latin"] });
import Script from "next/script";
import Auth from "../components/authentication/Auth";
import Notifications from "../components/notification/Notifications";
import { AuthenticationContextProvider } from "../store/authentication/Authentication-context";
import { NotificationContextProvider } from "../store/notification/Notification-context";
import { ThemeContextProvider } from "../store/theme/Theme-context";

if (typeof window !== "undefined") window.history.scrollRestoration = "manual";

export const metadata = {
  title: "Chat Bot",
  description: "Chat Bot",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={oxanium.className}>
        <ThemeContextProvider>
          <NotificationContextProvider>
            <AuthenticationContextProvider>
              <Notifications />
              <Auth />
              {children}
              <Script />
            </AuthenticationContextProvider>
          </NotificationContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
