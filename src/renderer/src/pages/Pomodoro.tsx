import Timer from '../components/Timer';
import LinkButton from '../components/LinkButton';
import { ArrowSmallLeftIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import { TimerType } from '../types/types';
import { useState } from 'react';

interface PomoButtonsProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

function PomoButtons({ name, isActive, onClick }: PomoButtonsProps): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded-lg font-medium uppercase transition-all hover:cursor-pointer duration-150 ease-in-out ${
        isActive ? 'bg-slate-400 transform translate-y-1' : 'bg-slate-300 shadow-lg'
      }`}
    >
      <h4>{name}</h4>
    </div>
  );
}

export default function Pomodoro(): JSX.Element {
  const [activeButton, setActiveButton] = useState('Pomodoro');
  const [startTime, setStartTime] = useState(30 * 60);

  return (
    <div className="w-3/4">
      <div className="min-w-full mb-2">
        <Cog6ToothIcon className="h-7 w-7 hover:scale-110 hover:cursor-pointer transition-transform text-slate-700 ml-auto" />
      </div>
      <div className="flex justify-around mb-4">
        <PomoButtons
          name="Pomodoro"
          isActive={activeButton === 'Pomodoro'}
          onClick={(): void => {
            setActiveButton('Pomodoro');
            setStartTime(30 * 60);
          }}
        />
        <PomoButtons
          name="Short Break"
          isActive={activeButton === 'Short Break'}
          onClick={(): void => {
            setActiveButton('Short Break');
            setStartTime(5 * 60);
          }}
        />
        <PomoButtons
          name="Long Break"
          isActive={activeButton === 'Long Break'}
          onClick={(): void => {
            setActiveButton('Long Break');
            setStartTime(15 * 60);
          }}
        />
      </div>
      <Timer type={TimerType.POMODORO} time={startTime} />
      <LinkButton
        route="/"
        name="Back to Home"
        icon={<ArrowSmallLeftIcon className="h-6 w-6 hover:scale-150 transition-transform" />}
      />
    </div>
  );
}
