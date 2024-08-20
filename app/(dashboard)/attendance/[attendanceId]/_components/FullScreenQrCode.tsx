import React from "react";
import QRCode from "react-qr-code";
export default function FullScreenQrCode({
  link,
  setIsShowing,
}: {
  link: string;
  setIsShowing: Function;
}) {
  return (
    <div
      onClick={() => setIsShowing(false)}
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/70"
    >
      <QRCode
        value={link}
        size={2440}
        className="max-h-[80%] w-fit max-w-[80%]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
