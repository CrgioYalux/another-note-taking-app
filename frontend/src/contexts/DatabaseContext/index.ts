import { createContext } from "react";

export interface DatabaseContext<S, O> {
    state: S,
    operation: O
}; 

export const createDatabaseContext = <S, O>(initialValue: DatabaseContext<S, O>): React.Context<DatabaseContext<S, O>> => {
    const DatabaseContext = createContext<DatabaseContext<S, O>>(initialValue);
    return DatabaseContext;
}
