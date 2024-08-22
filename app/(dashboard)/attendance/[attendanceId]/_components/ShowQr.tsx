"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { refreshFormLink } from "../_actions/actions";
import FullScreenQrCode from "./FullScreenQrCode";

export default function ShowQr({
  attendanceId,
  refreshInterval,
}: {
  attendanceId: string;
  refreshInterval: number;
}) {
  const [formLink, setFormLink] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const lastRefreshTime = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();

      // Check if the current time exceeds the last refresh time by the refresh interval
      if (currentTime - lastRefreshTime.current >= refreshInterval * 1000) {
        refreshFormLink(attendanceId).then((res) => {
          if (res.success) {
            console.log("CHANGING FORM LINK --->");
            console.log("http://localhost:3000/mark/" + res.data!);
            setFormLink(res.data!);
            lastRefreshTime.current = currentTime;
          }
        });
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [attendanceId, refreshInterval]);

  return (
    <div className="col-span-1 flex h-full items-center justify-center rounded-md border">
      <Button onClick={() => setIsShowing(true)}>Show QR Code</Button>
      {isShowing && (
        <FullScreenQrCode
          link={"http://localhost:3000/" + formLink}
          setIsShowing={setIsShowing}
        />
      )}
    </div>
  );
}
