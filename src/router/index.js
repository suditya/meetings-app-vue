import Router from 'vue-router';
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'
import AddMeetings from '@/components/AddMeetings'
import SearchMeetings from '@/components/SearchMeetings'
import CalendarPage from '@/components/CalendarPage'
import TeamsPage from '@/components/TeamsPage'

const router = new Router(
    {
        mode: 'history',
        routes:[
            {
                name: 'login',
                path: '/',
                component: LoginPage
            },
            {
                name: 'registerPage',
                path: '/register',
                component: RegisterPage
            },
            {
                name: 'addMeetings',
                path: '/meetings/add',
                component: AddMeetings
            },
            {
                name: 'searchMeetings',
                path: '/meetings/filter',
                component: SearchMeetings
            },
            {
                name: 'calendar',
                path: '/calendar',
                component: CalendarPage
            },
            {
                name: 'teams',
                path: '/teams',
                component: TeamsPage
            },
        ]
    }
)

export default router