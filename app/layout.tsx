import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <main
            style={{
              width: "100%",
              maxWidth: "1500px",
              flex: 1,
              background: "#fff",
              // padding: "80px",
            }}
            className={styles.main}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
