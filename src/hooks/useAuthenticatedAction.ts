import { use } from 'react';
import { useLoginPrompt } from './useLoginPrompt';
import { GlobalContext } from '@/context/GlobalContext';

//*custom hook para manejar acciones autenticadas
export const useAuthenticatedAction = () => {
    const { authStatus } = use(GlobalContext);
    const { showLoginPrompt } = useLoginPrompt();


    const performAuthenticatedAction = (
        actionToPerform: () => void,
        promptMessage: string
    ) => {
        if (authStatus === 'authenticated') {
            actionToPerform();
        } else {
            showLoginPrompt(promptMessage);
        }
    };

    return { performAuthenticatedAction };
};