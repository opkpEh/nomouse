document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (["1","2","3","4","5"].includes(key)) {
    const index = parseInt(key) - 1; // convert to 0-based index

    const results = Array.from(document.querySelectorAll("a h3"))
      .map(h3 => h3.closest("a"))
      .filter(a => a && a.href);

    const target = results[index];

    if (target) {
      chrome.runtime.sendMessage({
        action: "open_url",
        url: target.href
      });
    }
  }

  if (key === "j") {
    window.scrollBy({
      top: 400,
      behavior: "smooth"
    });
  }

  if (key === "k") {
    window.scrollBy({
      top: -400,
      behavior: "smooth"
    });
  }

  if (key === "e") {
    chrome.runtime.sendMessage({ action: "prev_tab" });
  }

  if (key === "i") {
    chrome.runtime.sendMessage({ action: "next_tab" });
  }
});
