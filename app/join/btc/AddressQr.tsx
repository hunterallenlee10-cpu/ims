import QRCode from "qrcode";

/**
 * QR code for the BTC address, rendered to SVG at build time (no client JS).
 * Encodes a BIP21 "bitcoin:" URI with no amount, so wallets fill in the address and the
 * member enters the amount themselves (the USD price of $199 in BTC changes).
 * Always dark on white with a quiet zone, so it scans in dark mode too.
 */
export async function AddressQr({ address, label }: { address: string; label: string }) {
  const svg = await QRCode.toString(`bitcoin:${address}`, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 4,
    color: { dark: "#000000", light: "#ffffff" },
  });
  return (
    <div
      role="img"
      aria-label={label}
      className="w-[200px] max-w-full bg-white [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
