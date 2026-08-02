import { createContext, useContext, useState } from "react";

interface NotificacaoContextType {
    temNotificacao: boolean;
    marcarComoLida: () => void;
    novaNotificacao: () => void;
}

const NotificacaoContext = createContext<NotificacaoContextType>(
    {} as NotificacaoContextType
);

export function NotificacaoProvider({ children }) {
    const [temNotificacao, setTemNotificacao] = useState(false);
    function marcarComoLida() {
        setTemNotificacao(false);
    }
    function novaNotificacao() {
        setTemNotificacao(true);
    }
    
    return (
        <NotificacaoContext.Provider value={{temNotificacao, marcarComoLida, novaNotificacao}}>{children}</NotificacaoContext.Provider>
    );
}

export function useNotificacao() {
    return useContext(NotificacaoContext);
}