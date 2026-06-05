import { useEffect } from 'react';

export interface SequenceResult {
    isValid: boolean;
    sequenceCount: number;
}

interface Props {
    password: string;
    onValidation: (result: SequenceResult) => void;
}

const CharacterSequenceValidator: React.FC<Props> = ({ password, onValidation }) => {
    useEffect(() => {
        let count = 0;

        for (let i = 0; i <= password.length - 4; i++) {
            const part = password.substring(i, i + 4);

            const hasLower = /[a-z]/.test(part);
            const hasUpper = /[A-Z]/.test(part);
            const hasNumber = /[0-9]/.test(part);
            const hasSpecial = /[!@#$%^&*]/.test(part);

            if (hasLower && hasUpper && hasNumber && hasSpecial) {
                count++;
            }
        }

        onValidation({
            isValid: count > 0,
            sequenceCount: count
        });
    }, [password, onValidation]);

    return null;
};

export default CharacterSequenceValidator;