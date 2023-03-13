import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Frontend-Mentor_todo-app-react',
  plugins: [react()],
})
