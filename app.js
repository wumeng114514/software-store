// 复制邮箱到剪贴板（兼容 PC / 手机 / QQ内置浏览器）
function copyEmail(email, btn) {
  const showOk = () => {
    const original = btn.getAttribute("data-label") || btn.textContent;
    btn.setAttribute("data-label", original);
    btn.textContent = "已复制";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 1500);
    showToast();
  };

  // 优先使用现代剪贴板 API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(showOk).catch(() => {
      if (!fallbackCopy(email)) manualCopy(email);
      else showOk();
    });
  } else {
    if (fallbackCopy(email)) showOk();
    else manualCopy(email);
  }
}

// 兼容旧浏览器 / 手机端的复制方案
function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.readOnly = true;
  ta.contentEditable = "true";
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.left = "0";
  ta.style.width = "1px";
  ta.style.height = "1px";
  ta.style.opacity = "0";
  document.body.appendChild(ta);

  let ok = false;
  try {
    // iOS 需要 Range + Selection
    const range = document.createRange();
    range.selectNodeContents(ta);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    ta.setSelectionRange(0, text.length);
    ta.focus();
    ta.select();
    ok = document.execCommand("copy");
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

// 全部失败时弹出手动复制提示
function manualCopy(text) {
  window.prompt("请长按/选中下方文字手动复制：", text);
}

// 顶部提示条
let toastTimer = null;
function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
