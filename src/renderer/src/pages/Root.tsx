import { useOutletContext, useOutlet, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowSmallRightIcon, Cog6ToothIcon } from '@heroicons/react/20/solid';
import LinkButton from '../components/LinkButton';
import FocusGoal from '../components/FocusGoal';
import Modal from '../components/Modal';
import Settings from '../components/Settings';
import { getFocusGoal, getFocusTime, updateFocusGoal } from '../lib/db';

export default function Home(): JSX.Element {
  const outlet = useOutlet();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [focusTime, setFocusTime] = useState<number>(0);
  const [focusGoal, setFocusGoal] = useState<number>(0);

  // Fetch current focus goal and focus time from the database
  useEffect(() => {
    getFocusGoal().then((goal) => setFocusGoal(goal));
    getFocusTime().then((time) => setFocusTime(time));
  }, []);

  return (
    <div className="min-h-screen w-screen bg-blue-200 pt-10 flex flex-col">
      <div className="grid items-center grid-cols-3 w-full mx-auto">
        <div className="col-start-2 col-end-3 flex justify-center">
          <div className="bg-white rounded-xl text-center p-7 shadow-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold italic">Flow</h1>
          </div>
        </div>
        <div className="flex ml-24">
          <Cog6ToothIcon
            className="h-7 w-7 hover:scale-110 hover:cursor-pointer transition-transform text-slate-700"
            onClick={(): void => {
              setSettingsOpen((prev) => !prev);
            }}
          />
        </div>
      </div>

      <Modal
        title="Focus Goal Settings"
        isOpen={settingsOpen}
        onClose={(): void => {
          setSettingsOpen(false);
        }}
      >
        <Settings
          focusGoal={focusGoal}
          setFocusGoal={setFocusGoal}
          onSave={(updatedFocusGoal): void => {
            setSettingsOpen(false);
            updateFocusGoal(updatedFocusGoal);
            setFocusGoal(updatedFocusGoal);
          }}
        />
      </Modal>
      <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/2 rounded-md text-center p-4 sm:p-8 md:p-12 lg:p-16 mt-20 mx-auto shadow-lg mb-auto">
        <div className="flex justify-center">
          <Outlet context={[focusTime, setFocusTime]} />
        </div>
        {!outlet && (
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl pb-4">
              How would you like to work today?
            </h3>
            <div className="flex justify-around items-center mt-5">
              <div className="w-1/2 max-w-md">
                <LinkButton
                  route="focus"
                  name="Focus Timer"
                  icon={<ArrowSmallRightIcon className="h-8 w-8" />}
                />
              </div>
              <div className="w-1/2 max-w-md">
                <LinkButton
                  route="pomo"
                  name="Pomodoro"
                  icon={<ArrowSmallRightIcon className="h-8 w-8" />}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <FocusGoal focusTime={focusTime} focusGoal={focusGoal} />
      <div className="text-center pb-4 text-lg mt-auto">
        Made by{' '}
        <a
          href="https://lukebrichey.xyz"
          target="_blank"
          rel="noreferrer"
          className="underline text-blue-500 hover:text-blue-700 transition-colors"
        >
          Luke Richey
        </a>
      </div>
    </div>
  );
}

export function useFocusTime(): number {
  return useOutletContext<number>()[0];
}

export function useSetFocusTime(): React.Dispatch<React.SetStateAction<number>> {
  return useOutletContext<number>()[1];
}
