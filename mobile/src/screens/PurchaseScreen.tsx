import React, { useEffect, useMemo } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@components/common/Button';
import { Card } from '@components/common/Card';
import { DateField } from '@components/common/DateField';
import { Dropdown } from '@components/common/Dropdown';
import { Input } from '@components/common/Input';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SectionHeader } from '@components/common/SectionHeader';
import { Skeleton } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';
import { useCreatePurchase } from '@hooks/usePurchases';
import { useProducts } from '@hooks/useProducts';
import { useSuppliers } from '@hooks/useSuppliers';
import { formatCurrency } from '@utils/format';

const purchaseFormSchema = z.object({
  supplierId: z.string().min(1, 'Please select a supplier'),
  purchaseDate: z.date(),
  invoiceNumber: z.string().optional(),
  productId: z.string().min(1, 'Please select a product'),
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .transform((value) => Number(value))
    .refine(
      (value) => Number.isInteger(value) && value > 0,
      'Quantity must be a whole number greater than 0',
    ),
  purchasePrice: z
    .string()
    .min(1, 'Purchase price is required')
    .transform((value) => Number(value))
    .refine((value) => value > 0, 'Purchase price must be greater than 0'),
  transportExpense: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 0))
    .refine((value) => value >= 0, 'Transport expense cannot be negative'),
  remarks: z.string().optional(),
});

type PurchaseFormInput = z.input<typeof purchaseFormSchema>;
type PurchaseFormOutput = z.output<typeof purchaseFormSchema>;

const emptyFormValues: PurchaseFormInput = {
  supplierId: '',
  purchaseDate: new Date(),
  invoiceNumber: '',
  productId: '',
  quantity: '',
  purchasePrice: '',
  transportExpense: '',
  remarks: '',
};

export function PurchaseScreen() {
  const { data: suppliers, isLoading: suppliersLoading } = useSuppliers();
  const { data: products, isLoading: productsLoading } = useProducts();
  const createPurchase = useCreatePurchase();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PurchaseFormInput, unknown, PurchaseFormOutput>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: emptyFormValues,
  });

  useEffect(() => {
    const defaultSupplier = suppliers?.find((supplier) => supplier.isDefault);
    if (defaultSupplier) {
      reset((current) => ({ ...current, supplierId: current.supplierId || defaultSupplier.id }));
    }
  }, [suppliers, reset]);

  const supplierOptions = useMemo(
    () => (suppliers ?? []).map((supplier) => ({ label: supplier.name, value: supplier.id })),
    [suppliers],
  );
  const productOptions = useMemo(
    () => (products ?? []).map((product) => ({ label: product.name, value: product.id })),
    [products],
  );

  const quantity = Number(watch('quantity')) || 0;
  const purchasePrice = Number(watch('purchasePrice')) || 0;
  const totalAmount = quantity * purchasePrice;

  const onSubmit = handleSubmit((values) => {
    createPurchase.mutate(
      {
        supplierId: values.supplierId,
        purchaseDate: values.purchaseDate.toISOString(),
        invoiceNumber: values.invoiceNumber || undefined,
        productId: values.productId,
        quantity: values.quantity,
        purchasePrice: values.purchasePrice,
        transportExpense: values.transportExpense,
        remarks: values.remarks || undefined,
      },
      {
        onSuccess: () => {
          Alert.alert('Purchase Saved', 'Stock has been updated successfully.', [
            { text: 'OK', onPress: () => router.push(ROUTES.stock as never) },
          ]);
          reset({ ...emptyFormValues, supplierId: values.supplierId });
        },
        onError: (error) => {
          Alert.alert(
            'Could Not Save Purchase',
            error instanceof Error ? error.message : 'Please try again.',
          );
        },
      },
    );
  });

  const optionsLoading = suppliersLoading || productsLoading;

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Purchase Stock"
        subtitle="Add stock from your suppliers"
        icon="cart-outline"
        showBack
      />

      <ScrollView contentContainerClassName="gap-3 p-4" keyboardShouldPersistTaps="handled">
        <Card>
          <SectionHeader icon="business-outline" title="Purchase Details" />

          {optionsLoading ? (
            <View className="gap-3">
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
            </View>
          ) : (
            <View className="gap-3">
              <Controller
                control={control}
                name="supplierId"
                render={({ field }) => (
                  <Dropdown
                    label="Supplier"
                    required
                    placeholder="Select supplier"
                    leftIcon="business-outline"
                    options={supplierOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.supplierId?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="purchaseDate"
                render={({ field }) => (
                  <DateField
                    label="Purchase Date"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    maximumDate={new Date()}
                  />
                )}
              />

              <Controller
                control={control}
                name="invoiceNumber"
                render={({ field }) => (
                  <Input
                    label="Invoice Number"
                    placeholder="Optional"
                    leftIcon="receipt-outline"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>
          )}
        </Card>

        <Card>
          <SectionHeader icon="cube-outline" title="Product & Quantity" />

          {optionsLoading ? (
            <View className="gap-3">
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
            </View>
          ) : (
            <View className="gap-3">
              <Controller
                control={control}
                name="productId"
                render={({ field }) => (
                  <Dropdown
                    label="Product"
                    required
                    placeholder="Select product"
                    leftIcon="water-outline"
                    options={productOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.productId?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                  <Input
                    label="Quantity"
                    required
                    placeholder="Example: 100"
                    leftIcon="cube-outline"
                    keyboardType="number-pad"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.quantity?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="purchasePrice"
                render={({ field }) => (
                  <Input
                    label="Purchase Price Per Piece"
                    required
                    placeholder="Example: 120"
                    prefix="₹"
                    keyboardType="decimal-pad"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.purchasePrice?.message}
                  />
                )}
              />
            </View>
          )}
        </Card>

        <Card>
          <SectionHeader icon="car-outline" title="Transport & Remarks" />
          <View className="gap-3">
            <Controller
              control={control}
              name="transportExpense"
              render={({ field }) => (
                <Input
                  label="Transport Expense"
                  placeholder="Optional"
                  prefix="₹"
                  keyboardType="decimal-pad"
                  value={field.value}
                  onChangeText={field.onChange}
                  error={errors.transportExpense?.message}
                  helperText="Paid by you — recorded separately, not added to customer bills."
                />
              )}
            />

            <Controller
              control={control}
              name="remarks"
              render={({ field }) => (
                <Input
                  label="Remarks"
                  placeholder="Optional note"
                  leftIcon="create-outline"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </View>
        </Card>

        <Card>
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-text-primary">Total Amount</Text>
            <Text className="text-xl font-bold text-primary">{formatCurrency(totalAmount)}</Text>
          </View>
        </Card>

        <Button
          label="Save Purchase"
          icon="save-outline"
          loading={createPurchase.isPending}
          onPress={onSubmit}
        />
      </ScrollView>
    </View>
  );
}
