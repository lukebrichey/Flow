import Timer from '../components/Timer';
import LinkButton from '../components/LinkButton';
import PomoButtons from '../components/PomoButtons';
import Modal from '../components/Modal';
import { ArrowSmallLeftIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import { TimerType } from '../types/types';
import { useEffect, useState } from 'react';
import { PomoSettings } from '@renderer/components/PomoSettings';
import { getPreferences, IPreference } from '../lib/db';

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
      <Timer
        type={TimerType.POMODORO}
        time={startTime}
        onZero={(): number => {
          if (activeButton === 'Pomodoro') {
            setActiveButton('Short Break');
            return preferences.shortBreakLength * 60;
          } else if (activeButton === 'Short Break') {
            setActiveButton('Pomodoro');
            return preferences.pomodoroLength * 60;
          } else if (activeButton === 'Long Break') {
            setActiveButton('Pomodoro');
            return preferences.pomodoroLength * 60;
          }
          return 0;
        }}
      />
      <LinkButton
        route="/"
        name="Back to Home"
        icon={<ArrowSmallLeftIcon className="h-6 w-6 hover:scale-150 transition-transform" />}
      />
    </div>
  );
}
