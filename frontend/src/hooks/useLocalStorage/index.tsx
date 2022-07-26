import { useReducer } from "react";

export enum LocalStorageOperationType {
  GetItem = 0,
  SetItem,
  RemoveItem,
  Clear,
};

interface LocalStorageAction {
  type: LocalStorageOperationType;
  key?: string;
  value?: string;
};

type LocalStorageState<T> = T;

const reducer = <T,>(state: LocalStorageState<T>, {type, key = "", value = ""}: LocalStorageAction) => {
  switch(type) {
    case LocalStorageOperationType.GetItem:
      if (!key) return state;
      return JSON.parse(window.localStorage.getItem(key) ?? "");
    case LocalStorageOperationType.SetItem:
      if (!key && !value) return state;
      window.localStorage.setItem(key, value);
      return JSON.parse(window.localStorage.getItem(key) ?? "");
    case LocalStorageOperationType.RemoveItem:
      if (!key) return state;
      window.localStorage.removeItem(key);
      return JSON.parse(window.localStorage.getItem(key) ?? "");
    case LocalStorageOperationType.Clear:
      return null;
    default:
      return state;
  }
};

interface LocalStorageOperations {
  GetItem: (key: string) => void; 
  SetItem: (key: string, value: string) => void;
  RemoveItem: (key: string) => void;
  Clear: () => void;
};

interface useLocalStorageReturns<T> {
  state: LocalStorageState<T>;
  operations: LocalStorageOperations;
};

type Reducer<S, A> = (state: S, action: A) => S;

export const useLocalStorage = <T,>(initialState: T): useLocalStorageReturns<T> => {
  const [state, dispatch] = useReducer<Reducer<LocalStorageState<T>, LocalStorageAction>>(reducer, initialState);

  const GetItem = (key: string) => {
    dispatch({type: LocalStorageOperationType.GetItem, key});
  };

  const SetItem = (key: string, value: string) => {
    dispatch({type: LocalStorageOperationType.SetItem, key, value});
  };

  const RemoveItem = (key: string) => {
    dispatch({type: LocalStorageOperationType.RemoveItem, key});
  };

  const Clear = () => {
    dispatch({type: LocalStorageOperationType.Clear});
  };

  return {
    state,
    operations: {
      GetItem,
      SetItem,
      RemoveItem,
      Clear
    }
  };
};
