import './style.css';

type ShipProps = {
  size: number;
  orientation: 'horizontal' | 'vertical';
};

const Ship = ({ orientation, size }: ShipProps) => {
  const shipStyle = {
    width: orientation === 'horizontal' ? `${size * 40}px` : '40px',
    height: orientation === 'vertical' ? `${size * 40}px` : '40px',
  };

  return <div className={`ship ${orientation}`}></div>;
};

export default Ship;
