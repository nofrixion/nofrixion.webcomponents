import QRCodeComponent from 'react-qr-code';

const QRCode = ({ url }: { url: string }) => {
  return (
    <div className="w-20 h-20">
      <QRCodeComponent value={url} />
    </div>
  );
};

export default QRCode;
