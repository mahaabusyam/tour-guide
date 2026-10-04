import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
 // base: '/tour-guide/',
  build: {
    rollupOptions: {
      output: {
        // مكتبات كبيرة قليلة التغيّر تُحفظ في ملفات منفصلة فيخزنها المتصفح
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('@mui/icons-material')) return 'mui-icons';
          if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
          if (id.includes('react-router')) return 'router';
          if (id.includes('@reduxjs') || id.includes('react-redux') || id.includes('immer') || id.includes('reselect')) return 'state';
        },
      },
    },
  },
  define: {
  __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
},
})