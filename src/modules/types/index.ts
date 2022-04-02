import store from "store";

export enum EGender {
  MALE = "male",
  FEMALE = "female",
}
export enum EUserRole {
  USER = "user",
  ADMIN = "admin",
}
export enum EUserAction {
  SET_USER,
  SET_IS_AUTH,
  SET_TOKEN,
  CLEAR,
}
export enum EUserStatus {
  OPENED = "opened",
  CLOSED = "closed",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  gender: EGender;
  status: boolean;
  role: EUserRole;
}

export type UserState = {
  user: IUser;
  isAuth: boolean;
  token: string;
};

export type TUserAction =
  | { type: EUserAction.SET_USER; payload: IUser }
  | {
      type: EUserAction.SET_IS_AUTH;
      payload: boolean;
    }
  | {
      type: EUserAction.SET_TOKEN;
      payload: string;
    }
  | { type: EUserAction.CLEAR };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
