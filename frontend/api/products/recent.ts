export default function handler(req: any, res: any) {
  const mockProducts = [
    {
      id: '1',
      name: 'Apple',
      sku: 'A001',
      price: 3.54,
      currency: 'USD',
      imageUrl:
        'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=80&q=80',
    },
    {
      id: '2',
      name: 'Orange',
      sku: 'O222',
      price: 1.6,
      currency: 'USD',
      imageUrl:
        'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=80&q=80',
    },
    {
      id: '3',
      name: 'Peach',
      sku: 'P333',
      price: 2.13,
      currency: 'USD',
      imageUrl:
        'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=80&q=80',
    },
    {
      id: '4',
      name: 'Bananas',
      sku: 'B444',
      price: 1.99,
      currency: 'USD',
      imageUrl:
        'https://images.unsplash.com/photo-1574226516831-e1dff420e37d?auto=format&fit=crop&w=80&q=80',
    },
    {
      id: '5',
      name: 'Avocado',
      sku: 'A055',
      price: 2.4,
      currency: 'USD',
      imageUrl:
        'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=80&q=80',
    },
  ];

  // Просто по limit режем результат
  const limit = Number(req.query.limit) || 5;
  res.status(200).json({ items: mockProducts.slice(0, limit) });
}
