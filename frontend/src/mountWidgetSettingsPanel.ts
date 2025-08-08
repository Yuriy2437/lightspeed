import { createApp, h, ref } from 'vue';
import WidgetSettingsPanel from './components/WidgetSettingsPanel.vue';

let settingsApp: any = null;
let container: HTMLElement | null = null;

export function showSettingsPanel() {
  if (container) return; // уже открыто
  container = document.createElement('div');
  document.body.appendChild(container);

  const visible = ref(true);

  settingsApp = createApp({
    setup() {
      return () =>
        h(WidgetSettingsPanel, {
          visible: visible.value,
          onClose: () => {
            visible.value = false;
            // Даем время анимации 180 мс
            setTimeout(() => {
              if (settingsApp) settingsApp.unmount();
              if (container) container.remove();
              settingsApp = null;
              container = null;
            }, 180);
          },
        });
    },
  });

  settingsApp.mount(container);
}
