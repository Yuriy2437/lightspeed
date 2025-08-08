import express from 'express';
import fs from 'fs';

const router = express.Router();
const SETTINGS_PATH = './data/settings.json';

// Получить настройки
router.get('/', async (req, res) => {
  if (!fs.existsSync(SETTINGS_PATH)) {
    fs.writeFileSync(
      SETTINGS_PATH,
      JSON.stringify({
        enabled: true,
        recentCount: 5,
      })
    );
  }
  const data = fs.readFileSync(SETTINGS_PATH, 'utf8');
  res.json(JSON.parse(data));
});

// Сохранить настройки
router.post('/', async (req, res) => {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(req.body));
  res.json({ status: 'ok' });
});

export default router;
