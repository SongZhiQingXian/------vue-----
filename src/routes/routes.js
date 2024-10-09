import green from '../components/green.vue'
import Rain from '../components/Rain.vue'
import blue from '../components/blue.vue'
import pink from '../components/pink.vue'

const routes = [
    {
        path: "/",
        redirect: "/green"
        //默认页
    },

    {
        path: '/green',
        component: green
    },
    {
        path: '/Rain',
        component: Rain,
    },
    {
        path: '/blue',
        component: blue
    }, {
        path: '/pink',
        component: pink
    }
];
export default routes;