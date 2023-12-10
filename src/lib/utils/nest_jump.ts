import { browser } from '$app/environment';

export function nextJump(id: string): void {
  if (browser) {
    // @ts-expect-error
    const item = document.getElementById(id);
    if (item != undefined || item != null) {
      const class_name = item.className;
      console.debug(class_name);
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      item.focus();
    }
  }
}
