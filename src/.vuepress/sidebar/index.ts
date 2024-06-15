import { sidebar } from "vuepress-theme-hope";
import { MySql } from "./MySql.js";
import { Linux } from "./Linux.js";
import { Redis } from "./Redis.js";


export default sidebar({
    "/DB/MySql/":MySql,
    "/Linux/":Linux,
    "/DB/Redis/":Redis,
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
            children:[]
          },{
            text: "可执行命令",
            prefix: "command/",
            children:["Java-Commond-KeyTool"]
        }
        ]
      }
    ]
});
