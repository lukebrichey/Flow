import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children
}: ModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-slate-400/75 flex">
      <div className="relative p-6 bg-white border border-gray-400 shadow-2xl rounded-md w-full max-w-md m-auto flex-col flex">
        <span className="absolute top-0 right-0 p-4">
          <button onClick={onClose}>
            <svg
              className="h-6 w-6 text-gray-400 cursor-pointer"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                fill="#A0AEC0"
              ></path>
            </svg>
          </button>
        </span>
        <h2 className="text-xl mb-5">{title}</h2>
        {children}
      </div>
    </div>
  );
}
