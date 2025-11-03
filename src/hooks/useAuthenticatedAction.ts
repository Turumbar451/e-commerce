import { useContext } from 'react';
import { useLoginPrompt } from './useLoginPrompt';
import { GlobalContextValue } from '@/context/GlobalContext';

//*custom hook para manejar acciones autenticadas
export const useAuthenticatedAction = () => {
    const { authStatus } = useContext(GlobalContextValue);
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