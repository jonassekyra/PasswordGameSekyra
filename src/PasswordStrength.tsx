import React from 'react';

interface Props {
    password: string;
    strengthLabel: string;
}

const PasswordStrength: React.FC<Props> = ({ password, strengthLabel }) => {
    const criteria = [
        { label: "Minimálně 8 znaků", met: password.length >= 8 },
        { label: "Velké písmeno", met: /[A-Z]/.test(password) },
        { label: "Číslo", met: /[0-9]/.test(password) },
        { label: "Speciální znak (!@#$%^&*)", met: /[!@#$%^&*]/.test(password) },
    ];

    const getStyles = () => {
        switch (strengthLabel) {
            case "Silné": return { color: "text-green-600", bg: "bg-green-500", width: "100%" };
            case "Střední": return { color: "text-yellow-500", bg: "bg-yellow-400", width: "66%" };
            case "Slabé": return { color: "text-red-500", bg: "bg-red-500", width: "33%" };
            default: return { color: "text-gray-400", bg: "bg-gray-200 dark:bg-gray-700", width: "0%" };
        }
    };

    const styles = getStyles();

    return (
        <div className="mt-8 w-full">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Zabezpečení
                </span>
                <span className={`text-sm font-black uppercase tracking-widest ${styles.color}`}>
                    {strengthLabel}
                </span>
            </div>

            <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6 shadow-inner">
                <div
                    className={`h-full ${styles.bg} transition-all duration-500 ease-out`}
                    style={{ width: styles.width }}
                />
            </div>

            <ul className="flex flex-col gap-3" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {criteria.map((c, i) => (
                    <li
                        key={i}
                        className={`flex items-center p-3 rounded-xl border transition-all duration-300 ${
                            c.met
                                ? 'bg-green-50/50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                                : 'bg-gray-50/50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
                        }`}
                    >
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-600 mr-3 text-lg leading-none">
                            {c.met ? "✅" : "❌"}
                        </div>

                        <span className={`text-sm font-semibold ${
                            c.met ? 'text-green-800 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                            {c.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PasswordStrength;