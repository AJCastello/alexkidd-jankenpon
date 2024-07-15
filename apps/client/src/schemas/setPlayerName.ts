import * as yup from "yup";

export const setPlayerNameSchema = yup.object().shape({
  playername: yup.string().min(4).required(),
});