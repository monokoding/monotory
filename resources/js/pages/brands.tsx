import { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    SortingState,
} from '@tanstack/react-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Brands',
        href: '/brands',
    },
];

// Data Categories (15 contoh data)
const brands = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Merk ${i + 1}`,
    supplier: `Supplier ${Math.ceil((i + 1) / 5)}`
}));

export default function Brands() {
    const columns = useMemo(
        () => [
            { accessorKey: 'id', header: 'ID' },
            { accessorKey: 'name', header: 'Nama Merk' },
            { accessorKey: 'supplier', header: 'Nama Supplier' },
        ],
        []
    );

    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 }); // 10 row per halaman

    const table = useReactTable({
        data: brands,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Daftar Merk</h1>

                <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
                    <table className="min-w-full bg-white text-left text-sm text-gray-600">
                        <thead className="bg-gray-100 text-gray-900">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="px-4 py-2 border cursor-pointer"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <span className="ml-1">
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b hover:bg-gray-50">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-2 border">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        ⬅️ Sebelumnya
                    </button>
                    <span>
                        Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Selanjutnya ➡️
                    </button>
                </div>

            </div>
        </AppLayout>
    );
}
