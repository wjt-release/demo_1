import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Address } from '@/types';

interface AddressState {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (address: Omit<Address, 'id'>) => {
        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`,
        };

        if (address.isDefault) {
          const addresses = get().addresses.map(a => ({
            ...a,
            isDefault: false,
          }));
          set({ addresses: [...addresses, newAddress] });
        } else {
          set({ addresses: [...get().addresses, newAddress] });
        }
      },

      updateAddress: (address: Address) => {
        const addresses = get().addresses;
        const index = addresses.findIndex(a => a.id === address.id);

        if (index !== -1) {
          let newAddresses = [...addresses];
          
          if (address.isDefault) {
            newAddresses = newAddresses.map(a => ({
              ...a,
              isDefault: a.id === address.id,
            }));
          }
          
          newAddresses[index] = address;
          set({ addresses: newAddresses });
        }
      },

      deleteAddress: (id: string) => {
        set({
          addresses: get().addresses.filter(a => a.id !== id),
        });
      },

      setDefault: (id: string) => {
        const addresses = get().addresses.map(a => ({
          ...a,
          isDefault: a.id === id,
        }));
        set({ addresses });
      },

      getDefaultAddress: () => {
        return get().addresses.find(a => a.isDefault);
      },
    }),
    {
      name: 'elegance-addresses',
    }
  )
);
