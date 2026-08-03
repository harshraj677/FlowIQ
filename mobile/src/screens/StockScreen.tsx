import React, { useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';

import { StockCard } from '@components/cards/StockCard';
import { BottomSheet } from '@components/common/BottomSheet';
import { Button } from '@components/common/Button';
import { EmptyState } from '@components/common/EmptyState';
import { Input } from '@components/common/Input';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SkeletonCardRow } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';
import { useProducts, useUpdateProduct } from '@hooks/useProducts';
import type { Product } from '@/types';

function EditStockSheet({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [sellingPrice, setSellingPrice] = useState(
    product?.sellingPrice ? String(product.sellingPrice) : '',
  );
  const [lowStockLimit, setLowStockLimit] = useState(product ? String(product.lowStockLimit) : '');
  const updateProduct = useUpdateProduct(product?.id ?? '');

  const handleSave = () => {
    const parsedSellingPrice = sellingPrice ? Number(sellingPrice) : undefined;
    const parsedLowStockLimit = lowStockLimit ? Number(lowStockLimit) : undefined;

    if (sellingPrice && (Number.isNaN(parsedSellingPrice) || (parsedSellingPrice as number) < 0)) {
      Alert.alert('Invalid Selling Price', 'Enter a valid, non-negative selling price.');
      return;
    }
    if (
      lowStockLimit &&
      (Number.isNaN(parsedLowStockLimit) ||
        !Number.isInteger(parsedLowStockLimit) ||
        (parsedLowStockLimit as number) < 0)
    ) {
      Alert.alert('Invalid Low Stock Limit', 'Enter a valid, non-negative whole number.');
      return;
    }

    updateProduct.mutate(
      { sellingPrice: parsedSellingPrice, lowStockLimit: parsedLowStockLimit },
      {
        onSuccess: onClose,
        onError: (error) =>
          Alert.alert(
            'Could Not Update',
            error instanceof Error ? error.message : 'Please try again.',
          ),
      },
    );
  };

  return (
    <BottomSheet
      visible={Boolean(product)}
      onClose={onClose}
      title={product ? `Edit ${product.name}` : undefined}
    >
      <View className="gap-3">
        <Input
          label="Selling Price"
          placeholder="Not fixed"
          prefix="₹"
          keyboardType="decimal-pad"
          value={sellingPrice}
          onChangeText={setSellingPrice}
        />
        <Input
          label="Low Stock Limit"
          placeholder="Example: 20"
          keyboardType="number-pad"
          value={lowStockLimit}
          onChangeText={setLowStockLimit}
        />
        <Button label="Save Changes" onPress={handleSave} loading={updateProduct.isPending} />
      </View>
    </BottomSheet>
  );
}

export function StockScreen() {
  const { data: products, isLoading, isRefetching, refetch } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Stock" subtitle="Manage your inventory" icon="cube-outline" />

      {isLoading ? (
        <View className="gap-3 p-4">
          <SkeletonCardRow />
          <SkeletonCardRow />
          <SkeletonCardRow />
        </View>
      ) : !products || products.length === 0 ? (
        <EmptyState
          emoji="📦"
          title="No Stock Available"
          description="Add your first stock purchase to begin."
          actionLabel="Purchase Stock"
          onAction={() => router.push(ROUTES.purchase as never)}
        />
      ) : (
        <ScrollView
          contentContainerClassName="gap-3 p-4"
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-text-secondary">{products.length} products</Text>
            <Button
              label="Purchase Stock"
              size="sm"
              variant="secondary"
              icon="add"
              onPress={() => router.push(ROUTES.purchase as never)}
            />
          </View>

          {products.map((product) => (
            <StockCard
              key={product.id}
              name={product.name}
              currentStock={product.currentStock}
              purchasePrice={product.purchasePrice}
              sellingPrice={product.sellingPrice}
              stockValue={product.stockValue}
              status={product.status}
              onEdit={() => setEditingProduct(product)}
              onHistory={() =>
                router.push(
                  `${ROUTES.stockHistory}?productId=${product.id}&name=${encodeURIComponent(product.name)}` as never,
                )
              }
            />
          ))}
        </ScrollView>
      )}

      <EditStockSheet
        key={editingProduct?.id ?? 'none'}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
      />
    </View>
  );
}
