"use client";
import React, { useState } from "react";
import AllowResponsesSwitch from "./AllowResponsesSwitch";
import SetQrRefreshingInterval from "./SetQrRefreshingInterval";
import ShowQr from "./ShowQr";

export default function AttendanceSettings({
  attendanceId,
}: {
  attendanceId: string;
}) {
  const [refreshingInterval, setRefreshingInterval] = useState(10);
  return (
    <div className="mt-5 grid w-full grid-cols-1 items-center justify-between gap-4 lg:grid-cols-3">
      <AllowResponsesSwitch />
      <SetQrRefreshingInterval setRefreshingInterval={setRefreshingInterval} />
      <ShowQr
        attendanceId={attendanceId}
        refreshInterval={refreshingInterval}
      />
    </div>
  );
}
