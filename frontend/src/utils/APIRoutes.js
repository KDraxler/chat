import config from "../config/Config";

const host = `http://${config.URL}:${config.PORT}`;

export const RegisterRoute = `${host}/api/auth/register`
export const LoginRoute = `${host}/api/auth/login`
export const AvatarRoute = `${host}/api/auth/avatar`
export const allUsersRoute = `${host}/api/auth/allusers`

