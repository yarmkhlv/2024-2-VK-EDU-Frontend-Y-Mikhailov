export default {
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        chat: './chat.html',
      },
    },
  },
};
