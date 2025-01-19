import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import { Mail, Send, Star, Archive, Trash2, Settings, Menu, Search } from 'lucide-react';

const EmailAccountsView = ({ emailAccounts, status }) => {
    const [editingAccountId, setEditingAccountId] = useState(null);
    const [expandedAccountId, setExpandedAccountId] = useState(null);
    const { data, setData, post, patch, errors, processing, delete: destroy } = useForm({
        email: '',
        password: '',
        imap_host: '',
        imap_port: '',
        encryption: 'ssl',
    });

    const startEditing = (account) => {
        setEditingAccountId(account.id);
        setData({
            email: account.email,
            password: '',
            imap_host: account.imap_host,
            imap_port: account.imap_port,
            encryption: account.encryption,
        });
    };

    const cancelEditing = () => {
        setEditingAccountId(null);
        setData({
            email: '',
            password: '',
            imap_host: '',
            imap_port: '',
            encryption: 'ssl',
        });
    };

    const submitNewAccount = (e) => {
        e.preventDefault();
        post(route('profiles.store'), {
            onSuccess: () => {
                setData({
                    email: '',
                    password: '',
                    imap_host: '',
                    imap_port: '',
                    encryption: 'ssl',
                });
            },
            onError: (error) => {
                console.log('Error:', error);
            }
        });
    };

    const submitUpdateAccount = (e) => {
        e.preventDefault();
        patch(route('email-accounts.update', editingAccountId), {
            ...data,
            onSuccess: () => {
                cancelEditing();
            },
            onError: (error) => {
                console.log('Error:', error);
            }
        });
    };

    const deleteAccount = (accountId) => {
        if (window.confirm('Czy na pewno chcesz usunąć to konto?')) {
            destroy(route('email-accounts.destroy', accountId));
        }
    };

    const toggleExpandAccount = (accountId) => {
        setExpandedAccountId(prevId => (prevId === accountId ? null : accountId)); 
    };

    return (
        <div className="h-screen flex flex-col text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route('poczta.folders')} active={route().current('poczta.folders')}>
                    Poczta
                </NavLink>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="relative">
                <input type="text" placeholder="Szukaj..." className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-gray-200" />
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Dropdown>
                    <Dropdown.Trigger>
                    <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none">
                        <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                    <Dropdown.Link href={route('profile.edit')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Konto
                    </Dropdown.Link>
                    <Dropdown.Link href={route('profiles.email')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Konta e-mail
                    </Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Wyloguj się
                    </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
                </button>
            </div>
            </header>
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-6">Konta Email</h2>

                {/* Formularz dodawania nowego konta */}
                <form onSubmit={submitNewAccount} className="mb-6 space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                            required
                        />
                        {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label htmlFor="imap_host" className="block text-sm font-medium text-gray-700 dark:text-gray-300">IMAP Host</label>
                        <input
                            id="imap_host"
                            type="text"
                            value={data.imap_host}
                            onChange={(e) => setData('imap_host', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                            required
                        />
                        {errors.imap_host && <div className="text-red-600 text-sm mt-1">{errors.imap_host}</div>}
                    </div>

                    <div>
                        <label htmlFor="imap_port" className="block text-sm font-medium text-gray-700 dark:text-gray-300">IMAP Port</label>
                        <input
                            id="imap_port"
                            type="number"
                            value={data.imap_port}
                            onChange={(e) => setData('imap_port', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                            required
                        />
                        {errors.imap_port && <div className="text-red-600 text-sm mt-1">{errors.imap_port}</div>}
                    </div>

                    <div>
                        <label htmlFor="encryption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Encryption</label>
                        <select
                            id="encryption"
                            value={data.encryption}
                            onChange={(e) => setData('encryption', e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                        >
                            <option value="ssl">SSL</option>
                            <option value="tls">TLS</option>
                        </select>
                        {errors.encryption && <div className="text-red-600 text-sm mt-1">{errors.encryption}</div>}
                    </div>

                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600">
                        Dodaj Konto
                    </button>
                </form>

                {/* Lista kont email */}
                {emailAccounts.map((account) => (
                    <div
                        key={account.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4"
                    >
                        <div
                            className="cursor-pointer font-medium text-lg"
                            onClick={() => toggleExpandAccount(account.id)}
                        >
                            {account.email}
                        </div>
                        {expandedAccountId === account.id && (
                            <div className="mt-4">
                                {editingAccountId === account.id ? (
                                    <form onSubmit={submitUpdateAccount} className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                                required
                                            />
                                            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="imap_host" className="block text-sm font-medium text-gray-700 dark:text-gray-300">IMAP Host</label>
                                            <input
                                                id="imap_host"
                                                type="text"
                                                value={data.imap_host}
                                                onChange={(e) => setData('imap_host', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                                required
                                            />
                                            {errors.imap_host && <div className="text-red-600 text-sm mt-1">{errors.imap_host}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="imap_port" className="block text-sm font-medium text-gray-700 dark:text-gray-300">IMAP Port</label>
                                            <input
                                                id="imap_port"
                                                type="number"
                                                value={data.imap_port}
                                                onChange={(e) => setData('imap_port', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                                required
                                            />
                                            {errors.imap_port && <div className="text-red-600 text-sm mt-1">{errors.imap_port}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="encryption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Encryption</label>
                                            <select
                                                id="encryption"
                                                value={data.encryption}
                                                onChange={(e) => setData('encryption', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                                            >
                                                <option value="ssl">SSL</option>
                                                <option value="tls">TLS</option>
                                            </select>
                                            {errors.encryption && <div className="text-red-600 text-sm mt-1">{errors.encryption}</div>}
                                        </div>

                                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600">
                                            Zaktualizuj Konto
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEditing}
                                            className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                        >
                                            Anuluj
                                        </button>
                                    </form>
                                ) : (
                                    <div className="space-x-4">
                                        <button
                                            onClick={() => startEditing(account)}
                                            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600"
                                        >
                                            Edytuj
                                        </button>
                                        <button
                                            onClick={() => deleteAccount(account.id)}
                                            className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600"
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmailAccountsView;
