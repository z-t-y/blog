import React from "react";
import "./about.css";

export default function About() {
  document.title = "关于 | Andy";
  return (
    <>
      <div className="pb-4 border-b-2 border-slate-300">
        <h1 className="text-5xl font-bold">关于</h1>
      </div>
      <div className="w-full p-4" id="content">
        <p>
          我是周天佑，英文名 Andy Zhou，一个即将进入杨浦高级中学的魔都学生。
        </p>
        <p>
          我热爱编程与开源事业，在中大型项目（&ge;1000行）使用过的编程语言及框架/库如下：
        </p>
        <ul>
          <li>
            Python
            <ul>
              <li>
                Flask
                <ul>
                  <li>APIFlask</li>
                </ul>
              </li>
              <li>SQLAlchemy</li>
            </ul>
          </li>
          <li>
            JavaScript &amp; TypeScript
            <ul>
              <li>React</li>
              <li>Umi.js</li>
            </ul>
          </li>
          <li>
            CSS（如果能算编程语言的话）
            <ul>
              <li>TailwindCSS</li>
            </ul>
          </li>
          <li>
            Golang
            <ul>
              <li>Gorm</li>
              <li>Gin</li>
              <li>Fibre</li>
            </ul>
          </li>
        </ul>
        <p>
          其中，我的主编程语言是 Python，并使用 APIFlask、SQLAlchemy 以及一系列
          Flask 社区的扩展编写了 一个类Django的框架
          <a href="https://github.com/z-t-y/Djask">Djask</a>， 欢迎大家来
          Star、提 Issue 以及 PR。
        </p>

        <p>此外，我还在学习 Rust 编程语言。</p>

        <p>我的开发环境如下：</p>
        <ul>
          <li>系统：Windows 11 + Archlinux WSL2</li>
          <li>终端：Windows Terminal</li>
          <li>
            IDE &amp; 编辑器：
            <ul>
              <li>
                Visual Studio Code
                <ul>
                  <li>主题：GitHub Dark</li>
                </ul>
              </li>
              <li>
                NeoVim
                <ul>
                  <li>主题：One Dark</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            Python相关：
            <ul>
              <li>多解释器版本管理器：pyenv</li>
              <li>包管理器 &amp; 构建器：PDM</li>
            </ul>
          </li>
          <li>
            Node相关：
            <ul>
              <li>
                Node版本管理器：<a href="https://github.com/tj/n">n</a>
              </li>
              <li>包管理器：PNPM</li>
            </ul>
          </li>
          <li>字体：Jetbrains Mono Nerd Font</li>
        </ul>
      </div>
    </>
  );
}
