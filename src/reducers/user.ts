import { setToLocalStorage } from "modules/localStorage";
import { UserState, TUserAction, EUserAction } from "modules/types";

const initialState = { token: "1234" } as UserState;

function userReducer(state = initialState, action: TUserAction): UserState {
  switch (action.type) {
    case EUserAction.SET_IS_AUTH:
      return { ...state, isAuth: action.payload };
    case EUserAction.SET_USER:
      return { ...state, user: action.payload };
    case EUserAction.SET_TOKEN:
      setToLocalStorage({ token: action.payload });
      return { ...state, token: action.payload };
    case EUserAction.CLEAR:
      return initialState;

    default:
      return state;
  }
}

export default userReducer;
