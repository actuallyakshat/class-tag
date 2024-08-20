"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      refreshFormLink(attendanceId).then((res) => {
        if (res.success) {
          setFormLink(res.data!);
        }
      });
    }, refreshInterval * 1000);
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
