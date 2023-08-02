import Timer from '../components/Timer';
import Button from '../components/Button';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import { TimerType } from '../types/types';

export default function Focus(): JSX.Element {
  return (
    <div className="w-2/3">
      <Timer type={TimerType.FOCUS} />
      <Button
        route="/"
        name="Back to Home"
        icon={<ArrowSmallLeftIcon className="h-6 w-6 hover:scale-150 transition-transform" />}
      />
    </div>
  );
}
