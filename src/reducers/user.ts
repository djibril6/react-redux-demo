import { UserState, TUserAction, EUserAction } from "modules";

const initialState = {} as UserState;

function userReducer(state = initialState, action: TUserAction): UserState {
  switch (action.type) {
    case EUserAction.SET_IS_AUTH:
      return { ...state, isAuth: action.payload };
    case EUserAction.SET_USER:
      return { ...state, user: action.payload };
    case EUserAction.SET_TOKEN:
      return { ...state, token: action.payload };
    case EUserAction.CLEAR:
      return initialState;

    default:
      return state;
  }
}

export default userReducer;
