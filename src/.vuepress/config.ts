import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Code wins arguments",
  description: "代码胜于雄辩",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
