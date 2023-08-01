import Timer from '../components/Timer';
import Button from '../components/Button';

export default function Focus(): JSX.Element {
  return (
    <div>
      <Timer />
      <Button route="/" name="Back to Home" />
    </div>
  );
}
