import { arraySidebar } from "vuepress-theme-hope";

export const Keepalived = arraySidebar([
    {
        text: "Keepalived",
        icon: "fa-solid fa-circle-nodes",
        collapsible: false,
        children: [
            "keepalived","keepalived-mysql"
        ],
    }
]);