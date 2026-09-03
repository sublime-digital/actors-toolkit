import { createReducer, on } from '@ngrx/store';
import { ActorsActions } from './actors.actions';

export interface ActorsState {
  actors: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: ActorsState = {
  actors: [],
  loading: false,
  error: null
};

export const actorsReducer = createReducer(
  initialState,
  on(ActorsActions.loadActors, (state) => ({ ...state, loading: true })),
  on(ActorsActions.loadActorsSuccess, (state, { actors }) => ({
    ...state,
    loading: false,
    actors
  })),
  on(ActorsActions.loadActorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
