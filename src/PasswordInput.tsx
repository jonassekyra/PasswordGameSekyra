import React, { useState } from 'react';

interface Props {
    password: string;
    setPassword: (value: string) => void;
}

const PasswordInput: React.FC<Props> = ({ password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-[var(--primary-color)] outline-none transition-all"
                    placeholder="Vložte silné heslo"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 px-3 py-1 text-xs rounded bg-blue-500 text-white font-semibold transition-opacity hover:opacity-90"
                >
                    {showPassword ? "SKRÝT" : "UKÁZAT"}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;