interface PomoButtonsProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function PomoButtons({ name, isActive, onClick }: PomoButtonsProps): JSX.Element {
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
