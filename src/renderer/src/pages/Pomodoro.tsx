import Button from '../components/Button';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';

export default function Pomodoro(): JSX.Element {
  return (
    <div>
      <h1>Pomodoro</h1>
      <Button route="/" name="Back to Home" icon={<ArrowSmallLeftIcon className="h-6 w-6" />} />
    </div>
  );
}
