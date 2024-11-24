import { createContext, useContext, ReactNode, Context, FC, useSyncExternalStore } from 'react'

type NextStateFunc<T> = (param: T) => T;
type Setter<T> = (param: T | NextStateFunc<T>) => void;
type ProviderFC = FC<{children: ReactNode, options?: MyAtomOptions}>;
type AtomBase = {Provider: ProviderFC}
type Subscribe = (listener: () => void) => () => void;
type AtomStore<T> = {subscribe: Subscribe, getSnapshot: ()=>T, setValue: Setter<T>};
export type MyAtom<T> = AtomBase & {Context: Context<AtomStore<T>>};
export type MyAtomOptions = { async?: boolean, storageKey?: string };

function createAtomStore<T>(value: T, options?: MyAtomOptions): AtomStore<T> {
  let listeners: (() => void)[] = [];
  const subscribe = (listener: () => void) => {
    listeners = [...listeners, listener];
    return () => { listeners = listeners.filter(l => l !== listener); }
  }
  const callListeners = () => listeners.forEach(l => l())
  const callListenersAsync = () => setTimeout(() => listeners.forEach(l => setTimeout(() => l())));
  const save = () => localStorage.setItem(options?.storageKey as string, JSON.stringify(value));
  const load = () => {
    const json = localStorage.getItem(options?.storageKey as string);
    if (json) setValue(JSON.parse(json) as T);
  }
  if (options?.storageKey) setTimeout(() => load());
  const setValue: Setter<T> = (param) => {
    const newValue = typeof param === "function" ? (param as NextStateFunc<T>)(value) : param;
    if (newValue !== value) value = newValue; else return;
    options?.async ? callListenersAsync() : callListeners();
    if (options?.storageKey) setTimeout(() => save());
  }
  return {subscribe, getSnapshot: () => value, setValue};
}

export function createMyAtom<T>(value: T, gOptions?: MyAtomOptions) : MyAtom<T> {
  const Context = createContext<AtomStore<T>>(createAtomStore(value, gOptions));
  const Provider = ({children, options}: {children: ReactNode, options?: MyAtomOptions}) =>
    <Context.Provider value={createAtomStore(value, options || gOptions)}>
      {children}
    </Context.Provider>;
  return {Context, Provider};
}

export function useMyAtom<T>(atom: MyAtom<T>): [T, Setter<T>] {
  const atomStore = useContext(atom.Context);
  const value = useSyncExternalStore(atomStore.subscribe, atomStore.getSnapshot);
  return [value, atomStore.setValue];
}

export function MyProvider({atoms, children, options}:
    {atoms: (AtomBase | [AtomBase, MyAtomOptions])[], children: ReactNode, options?: MyAtomOptions}) {
  if (atoms.length === 0) return <>{children}</>;
  const [firstAtom, ...restAtoms] = atoms;
  if (Array.isArray(firstAtom)) {
    const [atom, options] = firstAtom;
    return <atom.Provider options={options}>
             <MyProvider atoms={restAtoms}>{children}</MyProvider>
           </atom.Provider>
  } else
    return <firstAtom.Provider options={options}>
             <MyProvider atoms={restAtoms}>{children}</MyProvider>
           </firstAtom.Provider>
}

/////////// reducer atom
type Reducer<S, A> = (state: S, a:A) => S;
type Dispatch<A> = (action: A) => void;
export type ReducerAtom<S, A> = MyAtom<S> & {reducer: Reducer<S, A>};

export function createMyReducerAtom<S, A>(state: S, reducer: Reducer<S, A>,
    options?: MyAtomOptions) : ReducerAtom<S, A> {
  return {...createMyAtom(state, options), reducer};
}

export function useMyReducerAtom<S, A>(atom: ReducerAtom<S, A>): [S, Dispatch<A>] {
  const atomStore = useContext(atom.Context);
  const state = useSyncExternalStore(atomStore.subscribe, atomStore.getSnapshot);
  const dispatch = (action: A) => atomStore.setValue(atom.reducer(state, action));
  return [state, dispatch];
}
