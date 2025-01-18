import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from '@/components/dashboard/product/ProductForm';
import '@testing-library/jest-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    products_name: z.string().min(1, { message: "Tidak boleh kosong" }),
    category: z.object({
        categories_id: z.string().min(1, { message: "Kategori produk harus dipilih" }),
        categories_name: z.string().min(1, { message: "Kategori produk harus dipilih" }),
    }),
    stock: z.number().min(1, { message: "Harus lebih dari 0" }),
    product_id: z.string().min(0, { message: "Product Id tidak di temukan" }),
    products_description: z.string().min(1, { message: "Tidak boleh kosong" }),
    price_type: z.enum(["fixed", "wholesale"]),
    fixed_price: z.number().optional(),
    wholesalePrices: z.array(z.object({
        min_quantity: z.number().min(1, { message: "Harus lebih dari 0" }),
        max_quantity: z.number().min(1, { message: "Harus lebih dari 0" }),
        price: z.number().min(1, { message: "harus lebih dari 0" })
    })).optional(),
    product_images: z.array(z.any()).min(1, { message: "Setidaknya ada 1 gambar produk" }),
}).superRefine((data, ctx) => {
    if (data.price_type === 'fixed' && !data.fixed_price) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Harga tetap harus diisi",
            path: ["fixed_price"],
        });
    }
});

const ProductFormWrapper = (props) => {
    const methods = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            products_name: "",
            category: {
                categories_id: "",
                categories_name: "",
            },
            stock: 0,
            products_description: "",
            price_type: "wholesale",
            fixed_price: 0,
            wholesalePrices: [{ min_quantity: 0, max_quantity: 0, price: 0 }],
            product_images: [],
            product_id: "",
        },
    });

    return (
        <FormProvider {...methods}>
            <ProductForm {...props} />
        </FormProvider>
    );
};

describe('ProductForm', () => {
    it('harus menampilkan error ketika form dikirim dengan field kosong', async () => {
        render(<ProductFormWrapper mode="add" onSubmit={jest.fn()} />);

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('Tidak boleh kosong')).toBeInTheDocument();
            expect(screen.getByText('Kategori produk harus dipilih')).toBeInTheDocument();
            expect(screen.getByText('Harus lebih dari 0')).toBeInTheDocument();
            expect(screen.getByText('Setidaknya ada 1 gambar produk')).toBeInTheDocument();
        });
    });

    it('harus mengirim form ketika semua field diisi', async () => {
        const handleSubmit = jest.fn();
        render(<ProductFormWrapper mode="add" onSubmit={handleSubmit} />);

        fireEvent.change(screen.getByLabelText(/Nama Produk/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/Kategori Produk/i), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Deskripsi Produk/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText(/Harga Tetap/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/Product Images/i), { target: { files: [new File(['image'], 'image.png', { type: 'image/png' })] } });

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalled();
        });
    });

    it('should handle API errors gracefully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: 'Failed to add product' }),
            })
        );

        const handleSubmit = jest.fn();
        render(<ProductFormWrapper mode="add" onSubmit={handleSubmit} />);

        fireEvent.change(screen.getByLabelText(/Nama Produk/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/Kategori Produk/i), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText(/Stock/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Deskripsi Produk/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText(/Harga Tetap/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/Product Images/i), { target: { files: [new File(['image'], 'image.png', { type: 'image/png' })] } });

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to add product/i)).toBeInTheDocument();
        });
    });

    it('should display validation errors when form is submitted with empty fields', async () => {
        render(<ProductFormWrapper mode="add" onSubmit={jest.fn()} />);

        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(screen.getByText('Tidak boleh kosong')).toBeInTheDocument();
            expect(screen.getByText('Kategori produk harus dipilih')).toBeInTheDocument();
            expect(screen.getByText('Harus lebih dari 0')).toBeInTheDocument();
            expect(screen.getByText('Setidaknya ada 1 gambar produk')).toBeInTheDocument();
        });
    });

    it('should handle file removal', async () => {
        const handleChange = jest.fn();
        const file = new File(['image'], 'image.png', { type: 'image/png' });
        const fileWithPreview = Object.assign(file, { preview: 'data:image/png;base64,example' });

        render(<ProductFormWrapper mode="add" onSubmit={handleChange} />);

        fireEvent.click(screen.getByText(/×/i));

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith([]);
        });
    });

    it('should handle file removal from storage', async () => {
        const handleChange = jest.fn();
        const fileUrl = 'https://xmlmcdfzbwjljhaebzna.supabase.co/storage/v1/object/public/product_images/image.png';

        render(<ProductFormWrapper mode="edit" onSubmit={handleChange} />);

        fireEvent.click(screen.getByText(/×/i));

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith([]);
            expect(supabase.storage.from().remove).toHaveBeenCalledWith(['image.png']);
        });
    });
});
