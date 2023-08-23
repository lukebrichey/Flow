interface ProgressBarProps {
  value: number;
  max: number;
}

export default function ProgressBar({ value, max }: ProgressBarProps): JSX.Element {
  if (value < 0 || max < 0) {
    throw new Error('Invalid value or max for progress bar');
  }

  if (value > max) {
    value = max;
  }

  return (
    <div className="bg-white rounded-full w-5/6 mx-auto h-6 border border-slate-500 shadow-md">
      <div
        className="bg-green-500 rounded-full h-full transition-all duration-500 ease-in-out"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}
