"use client";

import { useEffect, useState } from "react";

export default function CurrentDateTime() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    // Format date only on the client side to avoid hydration issues
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    setDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

    // Optional: Update the time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <span>{dateTime}</span>;
}
