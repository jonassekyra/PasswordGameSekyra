import React, { useEffect, useRef } from 'react';

export interface TimeResult {
    tooFast: boolean;
    elapsedTime: number;
}

interface Props {
    password: string;
    onValidation: (result: TimeResult) => void;
}

const PasswordTimeValidator: React.FC<Props> = ({ password, onValidation }) => {
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (startTimeRef.current === 0 || password.length === 0) {
            startTimeRef.current = Date.now();
            onValidation({ tooFast: false, elapsedTime: 0 });
            return;
        }

        const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
        const isBot = password.length > 5 && elapsedSeconds < 1;

        onValidation({
            tooFast: isBot,
            elapsedTime: elapsedSeconds
        });

    }, [password, onValidation]);

    return null;
};

export default PasswordTimeValidator;