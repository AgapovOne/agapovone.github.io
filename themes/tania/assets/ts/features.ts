import ThemeColorScheme from "ts/colorScheme";
import { renderFootnotes } from "ts/footnotes";
// import * as tocbot from "tocbot";

let enableFootnotes = false;
if (document.currentScript) {
  enableFootnotes = document.currentScript.dataset.enableFootnotes == "true";
}

const init = () => {
  new ThemeColorScheme(document.getElementById("dark-mode-button"));
  if (enableFootnotes) {
    renderFootnotes();
  }
  // console.log(tocbot);
};

window.addEventListener("load", () => {
  setTimeout(function () {
    init();
  }, 0);
});
