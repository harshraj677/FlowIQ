import { Supplier } from '@models/Supplier';

export const supplierRepository = {
  findAll: () => Supplier.find().sort({ isDefault: -1, name: 1 }),

  findById: (id: string) => Supplier.findById(id),

  findByName: (name: string) => Supplier.findOne({ name: new RegExp(`^${name}$`, 'i') }),

  createIfMissing: (name: string, isDefault = false) =>
    Supplier.findOneAndUpdate(
      { name: new RegExp(`^${name}$`, 'i') },
      { $setOnInsert: { name, isDefault } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    ),

  findOrCreateByName: async (name: string) => {
    const existing = await supplierRepository.findByName(name);
    if (existing) return existing;
    return Supplier.create({ name });
  },
};
