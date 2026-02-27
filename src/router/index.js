import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChatterBlast from '../views/ChatterBlast.vue'
import DreamWeaver from '../views/DreamWeaver.vue'
import MindReader from '../views/MindReader.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/chatterblast', name: 'ChatterBlast', component: ChatterBlast },
  { path: '/dreamweaver', name: 'DreamWeaver', component: DreamWeaver },
  { path: '/mindreader', name: 'MindReader', component: MindReader }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
