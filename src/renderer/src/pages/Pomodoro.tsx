import Timer from '../components/Timer';
import LinkButton from '../components/LinkButton';
import PomoButtons from '../components/PomoButtons';
import Modal from '../components/Modal';
import { ArrowSmallLeftIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import { TimerType } from '../types/types';
import { useEffect, useState, useReducer } from 'react';
import { PomoSettings } from '@renderer/components/PomoSettings';
import { getPreferences, IPreference } from '../lib/db';

interface PomodoroState {
  pomodoroCount: number;
  activeButton: string;
  startTime: number;
}

const initialState: PomodoroState = {
  pomodoroCount: 0,
  activeButton: 'Pomodoro',
  startTime: 30 * 60
};

// Using a reducer to handle state changes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state: PomodoroState, action: any): PomodoroState {
  switch (action.type) {
    case 'increment':
      if (state.pomodoroCount + 1 === 4) {
        return {
          ...state,
          pomodoroCount: 0,
          activeButton: 'Long Break',
          startTime: action.preferences.longBreakLength * 60
        };
      } else {
        return {
          ...state,
          pomodoroCount: state.pomodoroCount + 1,
          activeButton: 'Short Break',
          startTime: action.preferences.shortBreakLength * 60
        };
      }
    case 'pomodoro':
      return {
        ...state,
        activeButton: 'Pomodoro',
        startTime: action.preferences.pomodoroLength * 60
      };
    case 'shortBreak':
      return {
        ...state,
        activeButton: 'Short Break',
        startTime: action.preferences.shortBreakLength * 60
      };
    case 'longBreak':
      return {
        ...state,
        activeButton: 'Long Break',
        startTime: action.preferences.longBreakLength * 60
      };
    case 'initialPreferences':
      return {
        ...state,
        startTime: action.preferences.pomodoroLength * 60
      };
    case 'updatePreferences':
      return {
        ...state,
        activeButton: 'Pomodoro',
        startTime: action.preferences.pomodoroLength * 60
      };
    default:
      return state;
  }
}

export default function Pomodoro(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [preferences, setPreferences] = useState<IPreference>({
    pomodoroLength: 30,
    shortBreakLength: 5,
    longBreakLength: 15
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get preferences from db
  useEffect(() => {
    getPreferences().then((prefs) => {
      setPreferences(prefs);
      dispatch({ type: 'initialPreferences', preferences: prefs });
    });
  }, []);

  if (!preferences) {
    return <div>Loading...</div>;
  }

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
          onSave={(updatedPreferences): void => {
            setIsModalOpen(false);
            setPreferences(updatedPreferences);
            dispatch({ type: 'updatePreferences', preferences: updatedPreferences });
          }}
        />
      </Modal>
      <div className="flex justify-around mb-4">
        <PomoButtons
          name="Pomodoro"
          isActive={state.activeButton === 'Pomodoro'}
          onClick={(): void => {
            dispatch({ type: 'pomodoro', preferences });
          }}
        />
        <PomoButtons
          name="Short Break"
          isActive={state.activeButton === 'Short Break'}
          onClick={(): void => {
            dispatch({ type: 'shortBreak', preferences });
          }}
        />
        <PomoButtons
          name="Long Break"
          isActive={state.activeButton === 'Long Break'}
          onClick={(): void => {
            dispatch({ type: 'longBreak', preferences });
          }}
        />
      </div>
      <Timer
        type={TimerType.POMODORO}
        time={state.startTime}
        activeButton={state.activeButton}
        onZero={(): number => {
          // We automatically start pomodoro after break
          if (state.activeButton === 'Pomodoro') {
            dispatch({ type: 'increment', preferences });
          } else if (state.activeButton === 'Short Break') {
            dispatch({ type: 'pomodoro', preferences });
          } else if (state.activeButton === 'Long Break') {
            dispatch({ type: 'pomodoro', preferences });
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
