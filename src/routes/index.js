import routes from "./routes";
import { createRouter,createWebHistory } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
},);
export default router;
