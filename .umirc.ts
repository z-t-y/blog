export default {
  npmClient: "pnpm",
  apiRoute: {
    platform: "vercel",
  },
  routes: [
    { path: "/", component: "index" },
    { path: "/posts/create", component: "posts/create" },
    { path: "/login", component: "login" },
    { path: "/posts/:postId", component: "posts/post" },
    { path: "/about", component: "about" },
  ],
  plugins: [require.resolve("@umijs/plugins/dist/tailwindcss")],
  tailwindcss: {},
};
