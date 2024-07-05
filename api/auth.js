export const uri = "https://catoff.azurewebsites.net/api";

export const REGISTER = `${uri}/user/register`;
export const LOGIN = `${uri}/user/login`;
export const USERBYID = `${uri}/user/userById`;
export const GAMEJOIN = `${uri}/user/gameJoin`;
export const UPDATESCORE = `${uri}/user/updateScore`;
export const GET_GAME_DETAILS = (title)=>`${uri}/user/gameDetails/${title}`;
