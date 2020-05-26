export interface IAction {
  type: string;
  payload: unknown;
}

export type IActionDefinition<T> = {
  TYPE: IActionType<T>;
  __payload: T;
  (payload: T): { type: string; payload: T };
} & (T extends undefined
  ? {
      (): { type: string; payload: undefined };
    }
  : {});

export type IActionType<T> = string & {
  __payload: T;
};

export interface IEmitter {
  emit(action: IAction): void;
  on<T>(type: IActionType<T>, handler: (payload: T) => void): void;
  off<T>(type: IActionType<T>, handler: (payload: T) => void): void;
}

export interface IViewStore<S> {
  readonly state: S;

  getState(): S;
  setState(nextState: S): void;
  subscribe(cb: () => void): () => void;
  flush(): void;
}
