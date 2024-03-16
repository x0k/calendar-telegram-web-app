export function useButton(el: HTMLElement, onClick: () => Promise<unknown>) {
  const handleClick = async () => {
    const originalHtml = el.innerHTML;
    let loaderShowed = false;
    const timeoutId = setTimeout(() => {
      loaderShowed = true;
      el.innerHTML = `<svg class="animate-spin mx-auto h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`;
    }, 100);
    try {
      await onClick();
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      if (loaderShowed) {
        el.innerHTML = originalHtml;
      } else {
        clearTimeout(timeoutId);
      }
    }
  };
  el.addEventListener("click", handleClick);
  return () => el.removeEventListener("click", handleClick);
}
