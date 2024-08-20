import { Input } from "@/components/ui/input";

export default function SetQrRefreshingInterval({
  setRefreshingInterval,
}: {
  setRefreshingInterval: (value: number) => void;
}) {
  return (
    <div className="flex w-full flex-col justify-center gap-1 rounded-md border p-6">
      <p className="text-sm font-medium">QR Will Refresh in Every:</p>
      <Input
        onChange={(e) => setRefreshingInterval(Number(e.target.value))}
        placeholder="Set QR Refreshing Interval (seconds)"
        type="number"
        defaultValue={10}
        max={120}
        min={1}
      />
    </div>
  );
}
