import { createContext, useContext, useState } from "react";

interface NotificacaoContextType {
    temNotificacao: boolean;
    marcarComoLida: () => void;
}
const NotificacaoContext = createContext<NotificacaoContextType>(
    {} as NotificacaoContextType
);

export function NotificacaoProvider({ children }) {
    const [temNotificacao, setTemNotificacao] = useState(true);
    function marcarComoLida() {
        setTemNotificacao(false);
    }

    return (
        <NotificacaoContext.Provider value={{temNotificacao, marcarComoLida}}>{children}</NotificacaoContext.Provider>
    );
}

export function useNotificacao() {
    return useContext(NotificacaoContext);
}