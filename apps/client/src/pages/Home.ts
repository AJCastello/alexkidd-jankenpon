import { Form, TextInput, Typography, useRef } from "@jay-js/ui";

// components
import { useForm, yupResolver } from "../lib/useForm";
import { setPlayerNameSchema } from "../schemas/setPlayerName";
import { matchContext } from "../contexts/match/match.context";
import { sleepNavigate } from "../utils/sleep";
import { IPlayernameFormValues } from "../types";
import { outTransition } from "../utils/transitions";
import { SubmitButton } from "../components/common/SubmitButton";
import { ANIMATE } from "../constants";

export function Home() {
  const battleForm = useRef<HTMLFormElement>();
  const { submit, setSubmitLoading } = SubmitButton();

  const { formState, onSubmit, register } = useForm<IPlayernameFormValues>({
    defaultValues: {
      playername: ""
    },
    resolver: yupResolver(setPlayerNameSchema)
  });

  function handleSubmit(ev: Event, { playername }: IPlayernameFormValues) {
    ev.preventDefault();
    setSubmitLoading();
    matchContext.actions
      .onConnect(playername, () => {
        outTransition(battleForm.current);
        sleepNavigate("/find-match");
      });
  }

  return Form({
    ref: battleForm,
    onsubmit: onSubmit(handleSubmit),
    className: `w-full max-w-screen-sm m-auto backdrop-blur-md bg-base-100/70 rounded-lg p-16 flex flex-col shadow-xl ${ANIMATE.JELLY_BOUNCE_IN_RIGHT_FADE_IN}`,
    children: [
      TextInput({
        color: "input-primary",
        inputSize: "input-lg",
        className: "w-full",
        placeholder: "Input your player name",
        helpers: [
          Typography({
            className: "text-sm text-error font-bold",
            children: formState.errors("playername")
          })
        ],
        ...register("playername")
      }),
      submit
    ]
  })
}