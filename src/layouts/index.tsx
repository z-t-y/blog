import * as React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Mail, GitHub, Twitter } from "@mui/icons-material";
import { Outlet } from "umi";

function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <a aria-label="Andy's Blog" href="/">
          <div className="flex items-center justify-between">
            <img
              src="https://s2.loli.net/2022/05/24/bkCh7mfOwNnAdpK.jpg"
              width="60"
              height="60"
              className="rounded-full mr-3"
            />
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              Andy&apos;s Blog
            </div>
          </div>
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center text-slate-500 text-sm py-10">
      <div className="flex flex-nowrap items-center justify-center space-x-4 w-full">
        <div>
          <a href="mailto:andyforever0108@outlook.com">
            <Mail />
          </a>
        </div>
        <div>
          <a href="https://github.com/z-t-y">
            <GitHub />
          </a>
        </div>
        <div>
          <a href="https://twitter.com/andyzhouty">
            <Twitter />
          </a>
        </div>
      </div>
      <div className="flex flex-nowrap items-center justify-center space-x-2 w-full">
        <div>Andy Zhou</div>
        <div>&middot;</div>
        <div>&#169; 2022-present</div>
        <div>&middot;</div>
        <div>Andy&apos;s Blog</div>
      </div>
      <div className="flex flex-nowrap items-center justify-center">
        Built with umi.js and tailwind
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
