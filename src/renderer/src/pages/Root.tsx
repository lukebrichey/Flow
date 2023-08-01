import { useOutlet } from 'react-router-dom';
import Button from '../components/Button';

export default function Home(): JSX.Element {
  const outlet = useOutlet();

  return (
    <div className="h-screen w-screen bg-blue-200 pt-10 flex flex-col justify-between">
      <div>
        <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl text-center p-6 mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold italic">Flow</h1>
          <h4 className="text-xl sm:text-2xl font-mono pt-2">Do your best work</h4>
        </div>
        <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md text-center p-4 sm:p-8 md:p-12 lg:p-16 my-10 mx-auto">
          <div>{outlet}</div>
          {!outlet && (
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl pb-4">
                How would you like to work today?
              </h3>
              <div className="grid">
                <Button route="focus" name="Focus Timer" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-center pb-4 text-lg">
        Made by{' '}
        <a
          href="https://lukebrichey.xyz"
          target="_blank"
          rel="noreferrer"
          className="underline text-blue-500"
        >
          Luke Richey
        </a>
      </div>
    </div>
  );
}
