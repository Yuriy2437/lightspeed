export function injectRecentProductsBelowCheckout(
  mountWidgetCallback: () => void
) {
  if (typeof window === 'undefined') return;
  (window as any).Ecwid = (window as any).Ecwid || {};
  (window as any).Ecwid.OnPageLoaded = (window as any).Ecwid.OnPageLoaded || {};
  if (!(window as any).Ecwid.OnPageLoaded.add) {
    (window as any).Ecwid.OnPageLoaded.add = function (f: any) {
      document.addEventListener('ecwidOnPageLoaded', function (e: any) {
        f(e.detail.page);
      });
    };
  }
  (window as any).Ecwid.OnPageLoaded.add(function (page: any) {
    if (page.type === 'CHECKOUT_CART' || page.type === 'CART') {
      // ВАЖНО: ровно этот класс (двойное подчеркивание), по DevTools
      const sidebar = document.querySelector('.ec-cart__body');
      if (sidebar) {
        let old = document.getElementById('recent-products-panel-widget');
        if (old) old.remove();
        const target = document.createElement('div');
        target.id = 'recent-products-panel-widget';
        sidebar.appendChild(target); // Всегда в конец правой колонки
        mountWidgetCallback();
      }
    } else {
      let old = document.getElementById('recent-products-panel-widget');
      if (old) old.remove();
    }
  });
}
