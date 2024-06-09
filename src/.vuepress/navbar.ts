import { navbar} from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "数据库",
    icon: "fa-solid fa-database",
    prefix: "/DB/",
    children: [
      {
        text: "MySql",
        icon: "fa-solid fa-database",
        link: "MySql/"
      }
    ],
  }
]);
