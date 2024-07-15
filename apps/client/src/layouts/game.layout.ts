import { Outlet, Section } from "@jay-js/ui";
import Background from "../assets/images/bg-02.jpg";
import { Footer } from "../components/common/Footer";
import { GameTitle } from "../components/common/GameTitle";

export function GameLayout() {
  return Section({
    tag: "section",
    className: "w-full h-full flex justify-between items-center bg-cover bg-center bg-no-repeat flex-col relative overflow-hidden",
    style: {
      backgroundImage: `url('${Background}')`,
      boxShadow: "inset 0 0 50px 80px rgba(0, 0, 0, 0.6)"
    },
    children: [
      GameTitle(),
      Outlet(),
      Footer()
    ]
  })
}
