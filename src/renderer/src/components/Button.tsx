import { Link } from 'react-router-dom';

interface ButtonProps {
  route: string;
  name: string;
}

export default function Button({ route, name }: ButtonProps): JSX.Element {
  return (
    <Link
      to={route}
      className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
    >
      {name}
    </Link>
  );
}
