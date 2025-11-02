import GlobalContext from './context/GlobalContext';
import { appRouter } from './routes/app.router';
import { RouterProvider } from 'react-router';
//este archivo tampoco se toca
const EccomerceApp = () => {
  return (
    <GlobalContext>
      <RouterProvider router={appRouter} />
    </GlobalContext>
  );
};

export default EccomerceApp;
