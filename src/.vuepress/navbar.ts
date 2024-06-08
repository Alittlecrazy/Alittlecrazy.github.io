import { navbar} from "vuepress-theme-hope";

export default navbar([
  "/",
  "/portfolio",
  "/demo/",
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: [{ text: "baz", icon: "ellipsis", link: "baz" }],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: [{ text: "ray", icon: "ellipsis", link: "ray" }],
      },
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
