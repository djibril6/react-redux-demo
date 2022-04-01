export enum EGender {
  MALE = "male",
  FEMALE = "female",
}
export enum EUserAction {
  SET_USER,
  SET_IS_AUTH,
  SET_TOKEN,
  CLEAR,
}

export interface IUser {
  name: string;
  email: string;
  gender: EGender;
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
