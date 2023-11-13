import HomeLayout from '../HomeLayout.vue';
import Home from '../components/HomeView.vue';

const homeRoutes = [{
    path: '/',
    component: HomeLayout,
    children: [{
        path: '',
        component: Home,
        name: 'home'
    }]
}]

export default homeRoutes;