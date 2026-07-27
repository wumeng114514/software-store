// 复制邮箱到剪贴板
function copyEmail(email, btn) {
  const showOk = () => {
    // 按钮反馈
    const original = btn.textContent;
    btn.textContent = "已复制";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 1500);
    // 顶部提示
    showToast();
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(showOk).catch(() => fallbackCopy(email, showOk));
  } else {
    fallbackCopy(email, showOk);
  }
}

// 兼容旧浏览器/非HTTPS的复制方案
function fallbackCopy(text, onSuccess) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand("copy");
    onSuccess();
  } catch (e) {
    alert("复制失败，请手动复制：" + text);
  }
  document.body.removeChild(textarea);
}

// 显示复制成功提示
let toastTimer = null;
function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
