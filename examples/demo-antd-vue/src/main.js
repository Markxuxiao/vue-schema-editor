import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import {
  Button,
  Card,
  Input,
  Select,
  SelectOption,
} from 'ant-design-vue'

const app = createApp(App)
app.component('AButton', Button)
app.component('ACard', Card)
app.component('AInput', Input)
app.component('ASelect', Select)
app.component('ASelectOption', SelectOption)
app.mount('#app')
