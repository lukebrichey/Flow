import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';

type PlayPauseButtonProps = {
  isRunning: boolean;
  toggleIsRunning: () => void;
};

const PlayPauseButton = ({ isRunning, toggleIsRunning }: PlayPauseButtonProps): JSX.Element => {
  return (
    <div
      className="bg-slate-400 inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg cursor-pointer"
      onClick={toggleIsRunning}
    >
      {isRunning ? (
        <PauseIcon className="h-6 w-6 text-white" />
      ) : (
        <PlayIcon className="h-6 w-6 text-white" />
      )}
    </div>
  );
};

export default PlayPauseButton;
