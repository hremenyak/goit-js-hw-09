!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};t.startBtn.addEventListener("click",(function(){t.startBtn.setAttribute("disabled",""),t.stopBtn.removeAttribute("disabled"),e=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.stopBtn.setAttribute("disabled",""),t.startBtn.removeAttribute("disabled"),clearInterval(e)}));var e=null}();
//# sourceMappingURL=01-color-switcher.6275052e.js.map