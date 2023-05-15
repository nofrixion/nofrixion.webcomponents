import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import QRCodeComponent from 'react-qr-code';
import { AnimatePresence, motion } from 'framer-motion';

const QRCode = ({ url }: { url: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = () => {
    const element = qrCodeRef.current as HTMLDivElement;

    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'nfPaymentRequest.png';
      link.href = canvas.toDataURL();
      link.click();
      link.remove();
    });
  };

  return (
    <>
      <div
        className="w-20 h-20 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={qrCodeRef}>
          <QRCodeComponent value={url} className="w-20 h-20" />
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-[#CEF5FC] cursor-pointer flex justify-center items-center"
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
