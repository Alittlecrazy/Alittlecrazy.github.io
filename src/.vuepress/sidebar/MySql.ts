import { arraySidebar } from "vuepress-theme-hope";

export const MySql = arraySidebar([
    {
        text: "集群搭建",
        icon: "fa-solid fa-circle-nodes",
        collapsible: false,
        children: [
            "Mysql-Dual-Machine-Configuration",
        ],
    }
]);