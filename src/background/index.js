chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "open_url") {
    chrome.tabs.create({ url: msg.url });
    return;
  }

  if (msg.action === "prev_tab" || msg.action === "next_tab") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        const current = activeTabs[0];
        const currentIndex = current.index;

        let newIndex =
          msg.action === "next_tab"
            ? (currentIndex + 1) % tabs.length
            : (currentIndex - 1 + tabs.length) % tabs.length;

        chrome.tabs.update(tabs[newIndex].id, { active: true });
      });
    });
  }
});
