/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/main.scss'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides


const eclipseTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: 'rgba(255, 255, 255, 0)',
    surface: "#192b44",
    primary: '#192b44',
    secondary: '#b2a889',
    error: '#dc3545',
    info: '#3974c8',
    success: '#589b55',
    warning: '#ffc107',
    blueA: '#122034',
    blueB: '#03045e',
    blueC: '#071223',
    active: '#68c5e9',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'eclipseTheme',
    themes: {
      eclipseTheme,
    }
  },
})


