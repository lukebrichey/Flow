interface ProgressBarProps {
  value: number;
  max: number;
}

export default function ProgressBar({ value, max }: ProgressBarProps): JSX.Element {
  return (
    <div className="bg-white rounded-full w-2/3 mx-auto mt-5 h-5">
      <div
        className="bg-green-500 rounded-full h-full transition-all duration-500 ease-in-out max-w-max"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}
