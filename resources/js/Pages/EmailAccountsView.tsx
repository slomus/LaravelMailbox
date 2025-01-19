import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const EmailAccountsView = ({ emailAccounts, status }) => {
    const [editingAccountId, setEditingAccountId] = useState(null);

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
        post(route('profiles.store'));
    };

    const submitUpdateAccount = (e) => {
        e.preventDefault();
        console.log(editingAccountId, data);
        console.log('Route:', route('email-accounts.update', editingAccountId));
        patch(route('email-accounts.update', editingAccountId), {
        ...data,
        onSuccess: () => {
            cancelEditing();
            //window.location.reload();
        },
        onError: (error) => {
            console.log('Error:', error);
        }
});
    };


    const deleteAccount = (accountId) => {
        console.log(accountId);
        if (window.confirm('Czy na pewno chcesz usunąć to konto?')) {
            destroy(route('email-accounts.destroy', accountId));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Konta Email</h2>

                {emailAccounts.map((account) => (
                    <div
                        key={account.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '15px',
                            marginBottom: '10px',
                            borderRadius: '4px',
                        }}
                    >
                        {editingAccountId === account.id ? (
                            <form onSubmit={submitUpdateAccount}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="email"
                                        style={{ display: 'block', marginBottom: '5px' }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        required
                                    />
                                    {errors.email && (
                                        <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="imap_host"
                                        style={{ display: 'block', marginBottom: '5px' }}
                                    >
                                        Host IMAP
                                    </label>
                                    <input
                                        id="imap_host"
                                        type="text"
                                        value={data.imap_host}
                                        onChange={(e) => setData('imap_host', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        required
                                    />
                                    {errors.imap_host && (
                                        <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                            {errors.imap_host}
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="imap_port"
                                        style={{ display: 'block', marginBottom: '5px' }}
                                    >
                                        Port IMAP
                                    </label>
                                    <input
                                        id="imap_port"
                                        type="text"
                                        value={data.imap_port}
                                        onChange={(e) => setData('imap_port', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                        required
                                    />
                                    {errors.imap_port && (
                                        <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                            {errors.imap_port}
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label
                                        htmlFor="encryption"
                                        style={{ display: 'block', marginBottom: '5px' }}
                                    >
                                        Szyfrowanie
                                    </label>
                                    <select
                                        id="encryption"
                                        value={data.encryption}
                                        onChange={(e) => setData('encryption', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        <option value="ssl">SSL</option>
                                        <option value="tls">TLS</option>
                                    </select>
                                    {errors.encryption && (
                                        <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                            {errors.encryption}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    style={{
                                        backgroundColor: '#4F46E5',
                                        color: 'white',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginRight: '10px',
                                    }}
                                >
                                    Zapisz
                                </button>

                                <button
                                    onClick={() => deleteAccount(account.id)}
                                    style={{
                                        backgroundColor: '#4F46E5',
                                        color: 'white',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginRight: '10px'
                                    }}
                                >
                                Usuń
                                </button>

                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    style={{
                                        backgroundColor: '#E53E3E',
                                        color: 'white',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Anuluj
                                </button>
                            </form>
                        ) : (
                            <>
                                <h3 style={{ marginBottom: '10px' }}>{account.email}</h3>
                                <p>Host IMAP: {account.imap_host}</p>
                                <p>Port: {account.imap_port}</p>
                                <p>Szyfrowanie: {account.encryption}</p>
                                <button
                                    onClick={() => startEditing(account)}
                                    style={{
                                        backgroundColor: '#4F46E5',
                                        color: 'white',
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Edytuj
                                </button>
                            </>
                        )}
                    </div>
                ))}

                {emailAccounts.length === 0 && <p>Nie masz jeszcze żadnych kont email.</p>}
            </div>

            <div>
                <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Dodaj nowe konto email</h2>

                <form onSubmit={submitNewAccount}>
                <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="email"
                            style={{ display: 'block', marginBottom: '5px' }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                            required
                        />
                        {errors.email && (
                            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="password"
                            style={{ display: 'block', marginBottom: '5px' }}
                        >
                            Hasło
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                            required
                        />
                        {errors.password && (
                            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="imap_host"
                            style={{ display: 'block', marginBottom: '5px' }}
                        >
                            Host IMAP
                        </label>
                        <input
                            id="imap_host"
                            type="text"
                            value={data.imap_host}
                            onChange={e => setData('imap_host', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                            required
                        />
                        {errors.imap_host && (
                            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                {errors.imap_host}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="imap_port"
                            style={{ display: 'block', marginBottom: '5px' }}
                        >
                            Port IMAP
                        </label>
                        <input
                            id="imap_port"
                            type="text"
                            value={data.imap_port}
                            onChange={e => setData('imap_port', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                            required
                        />
                        {errors.imap_port && (
                            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                {errors.imap_port}
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="encryption"
                            style={{ display: 'block', marginBottom: '5px' }}
                        >
                            Szyfrowanie
                        </label>
                        <select
                            id="encryption"
                            value={data.encryption}
                            onChange={e => setData('encryption', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="ssl">SSL</option>
                            <option value="tls">TLS</option>
                        </select>
                        {errors.encryption && (
                            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
                                {errors.encryption}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            backgroundColor: '#4F46E5',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Dodaj konto
                    </button>

                    {status && (
                        <div style={{
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: '#f0f9ff',
                            color: '#0369a1',
                            borderRadius: '4px'
                        }}>
                            {status}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EmailAccountsView;
