import App from './Home/App';
import About from './about/about';
import Topic from './topics/topics';
const routes = [
    {
        name: 'Home',
        route: '/',
        componenet: App
    }, {
        name: 'About',
        route: '/about',
        componenet: About
    }, {
        name: 'Topics',
        route: '/topics',
        componenet: Topic
    }
];
export default routes;