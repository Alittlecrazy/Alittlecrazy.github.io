import { sidebar } from "vuepress-theme-hope";
import { MySql } from "./MySql.js";
import { Keepalived } from "./Keepalived.js";
import { Redis } from "./Redis.js";
import { Framework } from "./Framework.js";


export default sidebar({
    "/DB/MySql/":MySql,
    "/Linux/keepalived/":Keepalived,
    "/DB/Redis/":Redis,
    "/Framework/":Framework,
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
         },{
            text: "Java 8",
            prefix: "Java8/",
            collapsible: true,
            children:["Java8-new-features-interface",
                    "Java8-new-features-lambda",
                    "Java8-new-features-FunctionalInterface",
                    "Java8-new-features-method-ref",
                    "Java8-new-features-stream",
                    "Java8-new-features-collect",
                    "Java8-new-features-Optional"]
        }
        ]
      }
    ]
});
