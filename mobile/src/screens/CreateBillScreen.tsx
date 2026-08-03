import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@components/common/Button';
import { Card } from '@components/common/Card';
import { Checkbox } from '@components/common/Checkbox';
import { DateField } from '@components/common/DateField';
import { Divider } from '@components/common/Divider';
import { Dropdown } from '@components/common/Dropdown';
import { EmptyState } from '@components/common/EmptyState';
import { Input } from '@components/common/Input';
import { QuantityStepper } from '@components/common/QuantityStepper';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SectionHeader } from '@components/common/SectionHeader';
import { SegmentedToggle } from '@components/common/SegmentedToggle';
import { Skeleton } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';
import { useCustomer, useCustomers } from '@hooks/useCustomers';
import { useCreateInvoice } from '@hooks/useInvoices';
import { useProducts } from '@hooks/useProducts';
import { colors } from '@theme/colors';
import { formatCurrency } from '@utils/format';

const invoiceItemFormSchema = z.object({
  productId: z.string().min(1, 'Select a product'),
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value > 0, 'Quantity must be greater than 0'),
  sellingPrice: z
    .string()
    .min(1, 'Selling price is required')
    .transform((value) => Number(value))
    .refine((value) => value > 0, 'Selling price must be greater than 0'),
});

const billFormSchema = z
  .object({
    customerId: z.string().min(1, 'Please select a customer'),
    invoiceDate: z.date(),
    items: z.array(invoiceItemFormSchema).min(1, 'Add at least one product'),
    transportExpense: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : 0))
      .refine((value) => value >= 0, 'Transport expense cannot be negative'),
    remarks: z.string().optional(),
    paymentMode: z.enum(['CASH', 'UPI']),
    amountReceived: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : 0))
      .refine((value) => value >= 0, 'Amount received cannot be negative'),
  })
  .refine((data) => new Set(data.items.map((item) => item.productId)).size === data.items.length, {
    message: 'Each product can only be added once per bill',
    path: ['items'],
  });

type BillFormInput = z.input<typeof billFormSchema>;
type BillFormOutput = z.output<typeof billFormSchema>;

const emptyItem = { productId: '', quantity: '1', sellingPrice: '' };

const defaultValues: BillFormInput = {
  customerId: '',
  invoiceDate: new Date(),
  items: [emptyItem],
  transportExpense: '',
  remarks: '',
  paymentMode: 'CASH',
  amountReceived: '',
};

export function CreateBillScreen() {
  const { data: customersResult, isLoading: customersLoading } = useCustomers({}, 1, 200);
  const { data: products, isLoading: productsLoading } = useProducts();
  const createInvoice = useCreateInvoice();
  const [saleType, setSaleType] = useState<'CASH_SALE' | 'CREDIT_SALE' | null>(null);
  const [saveCustomerPrices, setSaveCustomerPrices] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BillFormInput, unknown, BillFormOutput>({
    resolver: zodResolver(billFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const customerId = watch('customerId');
  const items = watch('items');
  const { data: selectedCustomer } = useCustomer(customerId || undefined);

  const customerOptions = useMemo(
    () => (customersResult?.customers ?? []).map((c) => ({ label: c.shopName, value: c.id })),
    [customersResult],
  );
  const productOptions = useMemo(
    () => (products ?? []).map((p) => ({ label: p.name, value: p.id })),
    [products],
  );

  const customerPriceMap = useMemo(() => {
    const map = new Map<string, number>();
    selectedCustomer?.productPrices.forEach((entry) => map.set(entry.product, entry.price));
    return map;
  }, [selectedCustomer]);

  const productMap = useMemo(() => new Map((products ?? []).map((p) => [p.id, p])), [products]);

  const totalQuantity = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const grandTotal = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.sellingPrice) || 0),
    0,
  );
  const amountReceivedNum = Number(watch('amountReceived')) || 0;
  const balance = amountReceivedNum - grandTotal;

  const applySaleType = (type: 'CASH_SALE' | 'CREDIT_SALE') => {
    setSaleType(type);
    setValue('amountReceived', type === 'CASH_SALE' ? String(grandTotal) : '0');
  };

  const onSubmit = handleSubmit((values) => {
    for (const item of values.items) {
      const product = productMap.get(item.productId);
      if (product && item.quantity > product.currentStock) {
        Alert.alert(
          'Not Enough Stock',
          `${product.name} has only ${product.currentStock} pcs available.`,
        );
        return;
      }
    }

    createInvoice.mutate(
      {
        customerId: values.customerId,
        invoiceDate: values.invoiceDate.toISOString(),
        items: values.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
        })),
        transportExpense: values.transportExpense,
        remarks: values.remarks || undefined,
        paymentMode: values.paymentMode,
        amountReceived: values.amountReceived,
        saveCustomerPrices,
      },
      {
        onSuccess: (result) => {
          Alert.alert(
            'Bill Generated',
            `Invoice ${result.invoice.invoiceNumber} has been created.`,
            [{ text: 'OK', onPress: () => router.push(ROUTES.bills as never) }],
          );
          reset(defaultValues);
          setSaleType(null);
        },
        onError: (error) =>
          Alert.alert(
            'Could Not Generate Bill',
            error instanceof Error ? error.message : 'Please try again.',
          ),
      },
    );
  });

  const optionsLoading = customersLoading || productsLoading;

  if (!optionsLoading && customerOptions.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <ScreenHeader
          title="Create New Bill"
          subtitle="Generate invoice for customer"
          icon="document-text-outline"
        />
        <EmptyState
          emoji="🧾"
          title="Add Your First Customer"
          description="You need at least one customer to create a bill."
          actionLabel="Add Customer"
          onAction={() => router.push(ROUTES.customerForm as never)}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Create New Bill"
        subtitle="Generate invoice for customer"
        icon="document-text-outline"
        rightSlot={
          <Button
            label="History"
            size="sm"
            variant="ghost"
            icon="time-outline"
            onPress={() => router.push(ROUTES.bills as never)}
          />
        }
      />

      <ScrollView contentContainerClassName="gap-3 p-4" keyboardShouldPersistTaps="handled">
        <Card>
          <SectionHeader icon="person-outline" title="Customer & Bill Details" />
          {optionsLoading ? (
            <Skeleton height={48} />
          ) : (
            <View className="gap-3">
              <Controller
                control={control}
                name="customerId"
                render={({ field }) => (
                  <Dropdown
                    label="Customer"
                    required
                    placeholder="Select customer"
                    leftIcon="person-outline"
                    options={customerOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.customerId?.message}
                  />
                )}
              />

              {selectedCustomer && (
                <View className="flex-row items-center gap-3 rounded-[10px] bg-background px-3 py-2.5">
                  {selectedCustomer.address && (
                    <View className="flex-1 flex-row items-center gap-1">
                      <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                      <Text className="text-xs text-text-secondary" numberOfLines={1}>
                        {selectedCustomer.address}
                      </Text>
                    </View>
                  )}
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="call-outline" size={14} color={colors.textSecondary} />
                    <Text className="text-xs text-text-secondary">{selectedCustomer.phone}</Text>
                  </View>
                </View>
              )}

              <Controller
                control={control}
                name="invoiceDate"
                render={({ field }) => (
                  <DateField
                    label="Bill Date"
                    required
                    value={field.value}
                    onChange={field.onChange}
                    maximumDate={new Date()}
                  />
                )}
              />
            </View>
          )}
        </Card>

        <Card>
          <SectionHeader
            icon="cube-outline"
            title="Products & Items"
            rightSlot={
              <Button
                label="Add Item"
                size="sm"
                variant="secondary"
                icon="add"
                onPress={() => append(emptyItem)}
                disabled={fields.length >= productOptions.length}
              />
            }
          />

          {optionsLoading ? (
            <Skeleton height={48} />
          ) : (
            <View className="gap-3">
              {fields.map((field, index) => {
                const usedElsewhere = new Set(
                  items.filter((_, i) => i !== index).map((item) => item.productId),
                );
                const lineProductOptions = productOptions.filter(
                  (option) => !usedElsewhere.has(option.value),
                );
                const lineErrors = errors.items?.[index];

                return (
                  <View key={field.id}>
                    {index > 0 && <Divider className="mb-3" />}
                    <View className="gap-3">
                      <View className="flex-row items-center gap-2">
                        <View className="flex-1">
                          <Controller
                            control={control}
                            name={`items.${index}.productId`}
                            render={({ field: productField }) => (
                              <Dropdown
                                label={`Product ${index + 1}`}
                                required
                                placeholder="Select product"
                                leftIcon="water-outline"
                                options={lineProductOptions}
                                value={productField.value}
                                onChange={(value) => {
                                  productField.onChange(value);
                                  const rememberedPrice = customerPriceMap.get(value);
                                  if (rememberedPrice !== undefined) {
                                    setValue(
                                      `items.${index}.sellingPrice`,
                                      String(rememberedPrice),
                                    );
                                  }
                                }}
                                error={lineErrors?.productId?.message}
                              />
                            )}
                          />
                        </View>
                        {fields.length > 1 && (
                          <Button
                            icon="trash-outline"
                            variant="ghost"
                            size="sm"
                            label=""
                            onPress={() => remove(index)}
                            className="mt-6 w-10"
                          />
                        )}
                      </View>

                      <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-text-secondary">Quantity</Text>
                        <Controller
                          control={control}
                          name={`items.${index}.quantity`}
                          render={({ field: qtyField }) => (
                            <QuantityStepper
                              value={Number(qtyField.value) || 1}
                              min={1}
                              onIncrement={() =>
                                qtyField.onChange(String((Number(qtyField.value) || 1) + 1))
                              }
                              onDecrement={() =>
                                qtyField.onChange(
                                  String(Math.max(1, (Number(qtyField.value) || 1) - 1)),
                                )
                              }
                            />
                          )}
                        />
                      </View>

                      <Controller
                        control={control}
                        name={`items.${index}.sellingPrice`}
                        render={({ field: priceField }) => (
                          <Input
                            label="Selling Price Per Piece"
                            required
                            placeholder="Example: 150"
                            prefix="₹"
                            keyboardType="decimal-pad"
                            value={priceField.value}
                            onChangeText={priceField.onChange}
                            error={lineErrors?.sellingPrice?.message}
                          />
                        )}
                      />

                      <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-text-secondary">Amount</Text>
                        <Text className="text-base font-bold text-text-primary">
                          {formatCurrency(
                            (Number(items[index]?.quantity) || 0) *
                              (Number(items[index]?.sellingPrice) || 0),
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
              {typeof errors.items?.message === 'string' && (
                <Text className="text-xs text-danger">{errors.items.message}</Text>
              )}
            </View>
          )}
        </Card>

        <Card>
          <SectionHeader icon="receipt-outline" title="Bill Summary" />
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-text-secondary">Total Items</Text>
              <Text className="text-sm font-semibold text-text-primary">{items.length}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-text-secondary">Total Quantity</Text>
              <Text className="text-sm font-semibold text-text-primary">{totalQuantity}</Text>
            </View>
            <Divider className="my-1" />
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-bold text-text-primary">Grand Total</Text>
              <Text className="text-xl font-bold text-primary">{formatCurrency(grandTotal)}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <SectionHeader icon="car-outline" title="Transport (Optional)" />
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
                helperText="Paid by you — recorded as an expense, not added to this bill."
              />
            )}
          />
        </Card>

        <Card>
          <SectionHeader icon="card-outline" title="Payment" />
          <View className="gap-3">
            <SegmentedToggle
              options={[
                { label: 'Cash Sale', value: 'CASH_SALE', icon: 'checkmark-circle-outline' },
                { label: 'Credit Sale', value: 'CREDIT_SALE', icon: 'time-outline' },
              ]}
              value={saleType ?? ''}
              onChange={(value) => applySaleType(value as 'CASH_SALE' | 'CREDIT_SALE')}
            />

            <Controller
              control={control}
              name="paymentMode"
              render={({ field }) => (
                <SegmentedToggle
                  options={[
                    { label: 'Cash', value: 'CASH', icon: 'cash-outline' },
                    { label: 'UPI', value: 'UPI', icon: 'phone-portrait-outline' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="amountReceived"
              render={({ field }) => (
                <Input
                  label="Amount Received"
                  placeholder="0"
                  prefix="₹"
                  keyboardType="decimal-pad"
                  value={field.value}
                  onChangeText={field.onChange}
                  error={errors.amountReceived?.message}
                />
              )}
            />

            <View
              className="rounded-[10px] px-3 py-2.5"
              style={{ backgroundColor: balance >= 0 ? '#DCFCE7' : '#FEF3C7' }}
            >
              <Text
                className="text-center text-sm font-bold"
                style={{ color: balance >= 0 ? colors.success : colors.warning }}
              >
                {balance >= 0
                  ? `Change: ${formatCurrency(balance)}`
                  : `Outstanding After Bill: ${formatCurrency(-balance)}`}
              </Text>
            </View>
          </View>
        </Card>

        <Card>
          <Checkbox
            label="Save these prices for this customer"
            helperText="These rates will be used automatically next time you bill them."
            checked={saveCustomerPrices}
            onChange={setSaveCustomerPrices}
          />
        </Card>

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

        <Button
          label="Generate Bill"
          icon="document-text-outline"
          loading={createInvoice.isPending}
          onPress={onSubmit}
        />
      </ScrollView>
    </View>
  );
}
