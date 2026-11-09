"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/utils";

export default function RelativeTime({ date }: { date: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(timeAgo(date));
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return <span>{time || "..."}</span>;
}
