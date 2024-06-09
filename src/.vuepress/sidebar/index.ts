import { sidebar } from "vuepress-theme-hope";
import { MySql } from "./MySql.js";

export default sidebar({
  "/DB/MySql/":MySql,
  "/": [
    "",
    {
      text: "Java",
      icon: "fa-brands fa-java",
      prefix: "Java/",
      collapsible: true,
      children: [{
          text: "基础",
          prefix: "basis/",
          icon: "basic",
          children:[]
        }
      ]
    }
  ]
});
