
import { Link, useLocation } from 'react-router-dom';

export function WelcomePage() {

  const location = useLocation();
  const userName = location.state?.user || 'Usuario'; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-6">
        ¡Hola, <span className="text-blue-400">{userName}</span>!
      </h1>
      
      <p className="text-xl mb-8">
       Se supone que se redireccionara...
      </p>

   
      <Link 
        to="/" 
        className="py-2 px-4 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
      >
        Regresar al Login
      </Link>
    </div>
  );
}