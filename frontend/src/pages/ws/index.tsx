import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const mainSquareRef = useRef<HTMLDivElement>(null);
  const otherSquareRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const browserId = searchParams.get("id");

  if (!browserId) return <h1>Browser ID not found</h1>;
  const ws = new WebSocket(`ws://127.0.0.1:9090/?id=${browserId}`);

  ws.onopen = function () {
    console.log("Connected to the server");
    setInterval(() => sendSquareDetails(ws), 100);
  };

  ws.onmessage = function (event) {
    if (event.data instanceof Blob) {
      const reader = new FileReader();
      reader.onload = function () {
        recreateOtherSquare(JSON.parse(reader.result as string));
      };
      reader.readAsText(event.data);
    } else {
      recreateOtherSquare(JSON.parse(event.data));
    }
  };

  ws.onerror = function (error) {
    console.log("WebSocket Error: " + error);
  };

  const sendSquareDetails = (ws: any) => {
    if (!mainSquareRef.current) return;
    const rect = mainSquareRef.current.getBoundingClientRect();
    const details = {
      id: browserId,
      width: rect.width,
      height: rect.height,
      x: window.screenX + rect.left,
      y: window.screenY + rect.top,
    };
    ws.send(JSON.stringify(details));
  };

  const recreateOtherSquare = (details: any) => {
    if (otherSquareRef.current) {
      otherSquareRef.current.style.width = `${details.width}px`;
      otherSquareRef.current.style.height = `${details.height}px`;
      otherSquareRef.current.style.position = "fixed";
      otherSquareRef.current.style.left = `${details.x - window.screenX}px`;
      otherSquareRef.current.style.top = `${details.y - window.screenY}px`;
    }
  };

  // Stop ws connection when the page is closed
  window.onbeforeunload = () => {
    const details = {
      id: browserId,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
    ws.send(JSON.stringify(details));
    ws.close();
  };

  return (
    <>
      <Head>
        <title>Box overlay</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.main} ${inter.className} ${
          styles[`theme-${browserId}`]
        }`}
      >
        <div
          ref={mainSquareRef}
          className={`${styles.square} ${styles["square-1"]}`}
        ></div>
        <div
          ref={otherSquareRef}
          className={`${styles["other-square"]} ${styles["square-2"]}`}
        ></div>
      </main>
    </>
  );
}
