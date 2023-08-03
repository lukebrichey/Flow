import { useOutlet } from 'react-router-dom';
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid';
import LinkButton from '../components/LinkButton';

export default function Home(): JSX.Element {
  const outlet = useOutlet();

  return (
    <div className="min-h-screen w-screen bg-blue-200 pt-10 flex flex-col">
      <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl text-center p-6 mx-auto shadow-lg border-black border">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold italic">Flow</h1>
      </div>
      <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/2 rounded-md text-center p-4 sm:p-8 md:p-12 lg:p-16 mt-20 mx-auto shadow-lg">
        <div className="flex justify-center">{outlet}</div>
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
