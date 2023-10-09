import './style.css';

type ShipProps = {
  size: number;
  orientation: 'horizontal' | 'vertical';
};

const Ship = ({ orientation }: ShipProps) => {
  return <div className={`ship ${orientation}`}></div>;
};

export default Ship;
