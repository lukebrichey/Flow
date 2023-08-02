import { Link } from 'react-router-dom';

type ButtonProps = {
  route: string;
  name: string;
  icon?: JSX.Element;
};

export default function Button({ route, name, icon }: ButtonProps): JSX.Element {
  return (
    <Link
      to={route}
      className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center  text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
    >
      {icon ? (
        <span className="flex items-center">
          {icon} <span className="ml-2">{name}</span>
        </span>
      ) : (
        name
      )}
    </Link>
  );
}
