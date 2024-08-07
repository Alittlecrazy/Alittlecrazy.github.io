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
      },
      {
        text: "Redis",
        icon: "fa-solid fa-registered",
        link: "Redis/"
      }
    ],
  },
  {
    text: "Linux",
    icon: "fa-brands fa-linux",
    prefix: "/Linux/",
    children: [
      {
        text: "Keepalived",
        icon: "fa-solid fa-bars",
        link: "keepalived/"
      }
    ],
  },{
    text: "框架",
    icon: "fa-solid fa-crop-simple",
    prefix: "/Framework/",
    children: [
      {
        text: "MybatisPlus",
        link: "MybatisPlus/"
      }
    ],
  }
]);
