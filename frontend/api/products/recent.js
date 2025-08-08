export default function handler(req, res) {
  const mockProducts = [
    {
      id: '1',
      name: 'Apple',
      sku: 'A001',
      price: 3.54,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '2',
      name: 'Orange',
      sku: 'O222',
      price: 1.6,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '3',
      name: 'Peach',
      sku: 'P333',
      price: 2.13,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '4',
      name: 'Banana',
      sku: 'B444',
      price: 1.99,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '5',
      name: 'Avocado',
      sku: 'A055',
      price: 2.4,
      currency: 'USD',
      imageUrl: '',
    },
  ];
  const limit = Number(req.query.limit) || 5;
  res.status(200).json({ items: mockProducts.slice(0, limit) });
}
