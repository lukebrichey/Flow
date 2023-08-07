import Timer from '../components/Timer';
import LinkButton from '../components/LinkButton';
import Modal from '../components/Modal';
import { ArrowSmallLeftIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import { TimerType } from '../types/types';
import { useEffect, useState } from 'react';
import { PomoSettings } from '@renderer/components/PomoSettings';
import { getPreferences, IPreference } from '../lib/db';

interface PomoButtonsProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

function PomoButtons({ name, isActive, onClick }: PomoButtonsProps): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={`transition-all hover:cursor-pointer duration-150 ease-in-out ${
        isActive ? 'bg-slate-400 transform translate-y-1' : 'bg-slate-300 shadow-lg'
      } rounded-lg font-medium uppercase sm:p-1 md:p-2 xl:p-3 sm:text-xxs md:text-xs lg:text-sm xl:text-base`}
    >
      <p>{name}</p>
    </div>
  );
}

export default function Pomodoro(): JSX.Element {
  const [activeButton, setActiveButton] = useState('Pomodoro');
  const [preferences, setPreferences] = useState<IPreference>({
    pomodoroLength: 30,
    shortBreakLength: 5,
    longBreakLength: 15
  });
  const [startTime, setStartTime] = useState(preferences.pomodoroLength * 60);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleStartTimeChange(value: number): void {
    if (isNaN(value)) {
      console.error('Attempted to set startTime to NaN');
      return;
    }
    setStartTime(value);
  }

  // Get preferences from db
  useEffect(() => {
    getPreferences().then((preferences) => {
      if (activeButton === 'Pomodoro') {
        setStartTime(preferences.pomodoroLength * 60);
      } else if (activeButton === 'Short Break') {
        setStartTime(preferences.shortBreakLength * 60);
      } else {
        setStartTime(preferences.longBreakLength * 60);
      }
      setPreferences(preferences);
    });
  }, [isModalOpen]);

  return (
    <div className="w-3/4">
      <div className="min-w-full mb-2">
        <Cog6ToothIcon
          className="h-7 w-7 hover:scale-110 hover:cursor-pointer transition-transform text-slate-700 ml-auto"
          onClick={(): void => {
            setIsModalOpen((prev) => !prev);
          }}
        />
      </div>
      <Modal
        title="Pomodoro Settings"
        isOpen={isModalOpen}
        onClose={(): void => {
          setIsModalOpen(false);
        }}
      >
        <PomoSettings
          preferences={{
            pomodoroLength: preferences.pomodoroLength,
            shortBreakLength: preferences.shortBreakLength,
            longBreakLength: preferences.longBreakLength
          }}
          onSave={(): void => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
      <div className="flex justify-around mb-4">
        <PomoButtons
          name="Pomodoro"
          isActive={activeButton === 'Pomodoro'}
          onClick={(): void => {
            setActiveButton('Pomodoro');
            handleStartTimeChange(preferences.pomodoroLength * 60);
          }}
        />
        <PomoButtons
          name="Short Break"
          isActive={activeButton === 'Short Break'}
          onClick={(): void => {
            setActiveButton('Short Break');
            handleStartTimeChange(preferences.shortBreakLength * 60);
          }}
        />
        <PomoButtons
          name="Long Break"
          isActive={activeButton === 'Long Break'}
          onClick={(): void => {
            setActiveButton('Long Break');
            handleStartTimeChange(preferences.longBreakLength * 60);
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
