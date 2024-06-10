import { arraySidebar } from "vuepress-theme-hope";

export const Linux = arraySidebar([
    {
        text: "Keepalived",
        icon: "fa-solid fa-circle-nodes",
        collapsible: true,
        prefix:"keepalived",
        children: [
            "keepalived","keepalived-mysql"
        ],
    }
]);