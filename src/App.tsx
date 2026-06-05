import React, { useState, useEffect } from 'react';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import CharacterSequenceValidator from './CharacterSequenceValidator';
import PasswordTimeValidator from './PasswordTimeValidator';
import type { SequenceResult } from './CharacterSequenceValidator';
import type { TimeResult } from './PasswordTimeValidator';
import CountryFlagValidator from './CountryFlagValidator';

const App: React.FC = () => {
    const [password, setPassword] = useState("");

    const [seqData, setSeqData] = useState<SequenceResult>({ isValid: false, sequenceCount: 0 });
    const [timeData, setTimeData] = useState<TimeResult>({ tooFast: false, elapsedTime: 0 });

    const evaluatePassword = (pass: string): string => {
        if (!pass) return "Nezadáno";
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[!@#$%^&*]/.test(pass)) score++;

        if (score <= 1) return "Slabé";
        if (score <= 3) return "Střední";
        return "Silné";
    };

    const passwordStrength = evaluatePassword(password);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                const action = Math.random() < 0.5 ? 'add' : 'remove';

                if (action === 'add') {
                    console.log("Sabotáž: Přidáno emoji 😜");
                    return prevPassword + "😜";
                } else {
                    // Kontrola délky musí být až tady!
                    if (prevPassword.length === 0) return prevPassword;

                    console.log("Sabotáž: Odstraněn náhodný znak");
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 10000);

        return () => clearInterval(sabotageInterval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8">
                    <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Password Guardian
                    </h1>

                    <PasswordInput setPassword={setPassword} password={password} />
                    <CountryFlagValidator password={password} />
                    <CharacterSequenceValidator password={password} onValidation={setSeqData} />
                    <PasswordTimeValidator password={password} onValidation={setTimeData} />

                    <PasswordStrength password={password} strengthLabel={passwordStrength} />

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sekvence (mix):</span>
                            <span className={`text-sm font-bold ${seqData.isValid ? 'text-green-500' : 'text-gray-400'}`}>
                                {seqData.isValid ? `AKTIVNÍ (${seqData.sequenceCount}x)` : 'CHYBÍ'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Čas zadávání:</span>
                            <span className={`text-sm font-bold ${timeData.tooFast ? 'text-red-500' : 'text-blue-500'}`}>
                                {timeData.tooFast ? 'BOT DETEKCOVÁN' : `${timeData.elapsedTime.toFixed(1)} s`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;