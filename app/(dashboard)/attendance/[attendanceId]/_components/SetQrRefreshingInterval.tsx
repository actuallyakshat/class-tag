import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function SetQrRefreshingInterval({
  setRefreshingInterval,
}: {
  setRefreshingInterval: (value: number) => void;
}) {
  const [refreshInterval, setRefreshInterval] = useState<number>(10);

  useEffect(() => {
    const savedInterval = localStorage.getItem("qrRefreshInterval");
    if (savedInterval) {
      const parsedInterval = Number(savedInterval);
      setRefreshInterval(parsedInterval);
      setRefreshingInterval(parsedInterval);
    }
  }, [setRefreshingInterval]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRefreshInterval(value);
    setRefreshingInterval(value);
    localStorage.setItem("qrRefreshInterval", value.toString());
  };

  return (
    <div className="flex w-full flex-col justify-center gap-1 rounded-md border p-6">
      <p className="text-sm font-medium">QR Will Refresh in Every:</p>
      <Input
        value={refreshInterval}
        onChange={handleIntervalChange}
        placeholder="Set QR Refreshing Interval (seconds)"
        type="number"
        max={3000}
        min={5}
      />
    </div>
  );
}
