import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';

type PlayPauseButtonProps = {
  isRunning: boolean;
  toggleIsRunning: () => void;
};

const PlayPauseButton = ({ isRunning, toggleIsRunning }: PlayPauseButtonProps): JSX.Element => {
  return (
    <div
      className="bg-slate-400 inline-flex items-center justify-center w-1/6 h-10 rounded-full shadow-lg hover:bg-slate-500 hover:scale-110 cursor-pointer"
      onClick={toggleIsRunning}
    >
      {isRunning ? (
        <PauseIcon className="h-7/8 w-1/3 text-white" />
      ) : (
        <PlayIcon className="h-7/8 w-1/3 text-white" />
      )}
    </div>
  );
};

export default PlayPauseButton;
