import { arraySidebar } from "vuepress-theme-hope";

export const Redis = arraySidebar([
    {
        text: "基础",
        icon: "fa-solid fa-registered",
        collapsible: false,
        children: [
            "redis-install",
        ],
    }
]);