import { Button, Fragment, Img, Loading, Typography } from "@jay-js/ui";
import AlexKidd from "../../assets/images/alexkidd_sprite.webp";

export function SubmitButton() {
  const submit = Button({
    type: "submit",
    ripple: false,
    fullWidth: true,
    size: "btn-lg",
    color: "btn-primary",
    className: "mt-4 start-game",
    children: SubmitButtonContent()
  });

  function setSubmitLoading(loading: boolean = true) {
    submit.innerHTML = "";
    if (loading) {
      submit.appendChild(Loading({ type: "loading-dots" }));
      submit.disabled = true;
      submit.classList.remove("start-game");
      return;
    }
    submit.append(SubmitButtonContent());
    submit.disabled = false;
    submit.classList.add("start-game");
  };

  return {
    setSubmitLoading,
    submit
  };
};

function SubmitButtonContent(){
  return Fragment({
    children: [
      Img({
        src: AlexKidd,
        alt: "Alex Kidd",
        className: "mr-2",
      }),
      "Let's battle!",
      Typography({
        tag: "span",
        className: "shimmer"
      })
    ]
  });
};
