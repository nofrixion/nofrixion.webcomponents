import { useRef, useState } from 'react';
import QRCodeComponent from 'react-qr-code';
import { AnimatePresence, motion } from 'framer-motion';

const QRCode = ({ url }: { url: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const largeQrCodeCanvasRef = useRef<HTMLCanvasElement>(null);
  const qrCodeSvgRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = () => {
    const largeQRCodeCanvas = largeQrCodeCanvasRef.current as HTMLCanvasElement;

    // Get the canvas context in 2D
    var ctx = largeQRCodeCanvas.getContext('2d');

    if (ctx) {
      // Get QR code svg generated through QRCodeComponent
      const qrCodeSvg = qrCodeSvgRef.current?.firstChild as HTMLElement;

      // Get the SVG XML code
      const qrCodeSvgXml = new XMLSerializer().serializeToString(qrCodeSvg);

      // Convert the svg to image to be able to draw on canvas
      const img = new Image();
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(qrCodeSvgXml)));

      // Draw the SVG on the canvas when the image is loaded
      img.onload = () => {
        // The downloaded image should have a width of 1024px and height of 1024px
        ctx?.drawImage(img, 0, 0, 1024, 1024);
        const link = document.createElement('a');
        link.download = getQRCodeFileName();
        link.href = largeQRCodeCanvas.toDataURL();
        link.click();
        link.remove();
      };
    }
  };

  const getQRCodeFileName = (): string => {
    const now = new Date();

    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `QR-${day}-${month}-${year}-${hours}${minutes}${seconds}`;
  };

  return (
    <>
      <canvas ref={largeQrCodeCanvasRef} height="1024" width="1024" className="hidden"></canvas>

      <div
        className="w-14 lg:w-20 lg:h-20 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hidden lg:block" ref={qrCodeSvgRef}>
          <QRCodeComponent value={url} className="w-full h-full" />
        </div>

        <div>
          <button
            key="review-pr"
            type="button"
            className="w-full h-10 px-3 whitespace-nowrap flex justify-center items-center rounded-full py-3 text-sm cursor-pointer bg-[#DEE5ED] transition hover:bg-[#BDCCDB]"
            onClick={downloadAsImage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
              <path d="M6.66667 6.66667H4V4H6.66667V6.66667Z" stroke="#454D54" />
              <path d="M12 6.66667H9.33337V4H12V6.66667Z" stroke="#454D54" />
              <path d="M6.66667 12H4V9.33331H6.66667V12Z" stroke="#454D54" />
              <path d="M1.33337 5.99998L1.33337 1.33331L6.00004 1.33331" stroke="#454D54" />
              <path d="M1.33337 10L1.33337 14.6667H6.00004" stroke="#454D54" />
              <path d="M10 1.33331L14.6667 1.33331V5.99998" stroke="#454D54" />
              <path d="M10 14.6667H14.6667V10" stroke="#454D54" />
              <path d="M12.8334 12H9.33337V8.66663" stroke="#454D54" />
              <path d="M11.9973 9.50263V9.16663H12.3333V9.50263H11.9973Z" stroke="#454D54" />
              <path d="M23 13L23 2" stroke="#454D54" stroke-linecap="round" strokeLinejoin="round" />
              <path d="M20 11L23 14L26 11" stroke="#454D54" stroke-linecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-[#CEF5FC] cursor-pointer justify-center items-center"
              onClick={downloadAsImage}
            >
              <div>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_178_1766)">
                    <path d="M8 12.4988V0.498779" stroke="#454D54" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M5.5 9.99878L8 12.4988L10.5 9.99878"
                      stroke="#454D54"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M0.5 15.4988H15.5" stroke="#454D54" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_178_1766">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default QRCode;
