import React, { useMemo } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@components/common/Button';
import { Card } from '@components/common/Card';
import { Input } from '@components/common/Input';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SectionHeader } from '@components/common/SectionHeader';
import { Skeleton } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';
import { useCreateCustomer, useCustomer, useUpdateCustomer } from '@hooks/useCustomers';

const customerFormSchema = z.object({
  shopName: z.string().trim().min(1, 'Shop name is required'),
  ownerName: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .min(1, 'Mobile number is required')
    .refine(
      (value) => /^\d{10,15}$/.test(value.replace(/[\s-]/g, '')),
      'Enter a valid mobile number',
    ),
  address: z.string().trim().optional(),
  area: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

const emptyValues: CustomerFormValues = {
  shopName: '',
  ownerName: '',
  phone: '',
  address: '',
  area: '',
  notes: '',
};

export function CustomerFormScreen() {
  const params = useLocalSearchParams<{ customerId?: string }>();
  const customerId = typeof params.customerId === 'string' ? params.customerId : undefined;
  const isEditing = Boolean(customerId);

  const { data: existingCustomer, isLoading: customerLoading } = useCustomer(customerId);
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer(customerId ?? '');

  const formValues = useMemo<CustomerFormValues>(() => {
    if (!existingCustomer) return emptyValues;
    return {
      shopName: existingCustomer.shopName,
      ownerName: existingCustomer.ownerName ?? '',
      phone: existingCustomer.phone,
      address: existingCustomer.address ?? '',
      area: existingCustomer.area ?? '',
      notes: existingCustomer.notes ?? '',
    };
  }, [existingCustomer]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    values: formValues,
  });

  const isSaving = createCustomer.isPending || updateCustomer.isPending;

  const onSubmit = handleSubmit((values) => {
    const payload = {
      shopName: values.shopName,
      ownerName: values.ownerName || undefined,
      phone: values.phone,
      address: values.address || undefined,
      area: values.area || undefined,
      notes: values.notes || undefined,
    };

    if (isEditing && customerId) {
      updateCustomer.mutate(payload, {
        onSuccess: () => {
          router.replace(`${ROUTES.customerLedger}?customerId=${customerId}` as never);
        },
        onError: (error) =>
          Alert.alert(
            'Could Not Update Customer',
            error instanceof Error ? error.message : 'Please try again.',
          ),
      });
      return;
    }

    createCustomer.mutate(payload, {
      onSuccess: (customer) => {
        router.replace(`${ROUTES.customerLedger}?customerId=${customer.id}` as never);
      },
      onError: (error) =>
        Alert.alert(
          'Could Not Add Customer',
          error instanceof Error ? error.message : 'Please try again.',
        ),
    });
  });

  const showSkeleton = isEditing && customerLoading;

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title={isEditing ? 'Edit Customer' : 'Add Customer'}
        subtitle={isEditing ? 'Update shop details' : 'Add a new shop to your customer list'}
        icon="person-add-outline"
        showBack
      />

      <ScrollView contentContainerClassName="gap-3 p-4" keyboardShouldPersistTaps="handled">
        <Card>
          <SectionHeader icon="storefront-outline" title="Shop Details" />

          {showSkeleton ? (
            <View className="gap-3">
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
            </View>
          ) : (
            <View className="gap-3">
              <Controller
                control={control}
                name="shopName"
                render={({ field }) => (
                  <Input
                    label="Shop Name"
                    required
                    placeholder="Example: Gupta Store"
                    leftIcon="storefront-outline"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.shopName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="ownerName"
                render={({ field }) => (
                  <Input
                    label="Owner Name"
                    placeholder="Optional"
                    leftIcon="person-outline"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Input
                    label="Mobile Number"
                    required
                    placeholder="Example: 9876543210"
                    leftIcon="call-outline"
                    keyboardType="phone-pad"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={errors.phone?.message}
                  />
                )}
              />
            </View>
          )}
        </Card>

        <Card>
          <SectionHeader icon="location-outline" title="Location & Notes" />

          {showSkeleton ? (
            <View className="gap-3">
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
            </View>
          ) : (
            <View className="gap-3">
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <Input
                    label="Address"
                    placeholder="Optional"
                    leftIcon="location-outline"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="area"
                render={({ field }) => (
                  <Input
                    label="Area / Route"
                    placeholder="Optional"
                    leftIcon="map-outline"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="notes"
                render={({ field }) => (
                  <Input
                    label="Notes"
                    placeholder="Optional"
                    leftIcon="create-outline"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>
          )}
        </Card>

        <Button
          label={isEditing ? 'Save Changes' : 'Add Customer'}
          icon="checkmark-circle-outline"
          loading={isSaving}
          onPress={onSubmit}
        />
      </ScrollView>
    </View>
  );
}
