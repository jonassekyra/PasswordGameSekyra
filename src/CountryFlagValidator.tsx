import React, { useState, useEffect } from 'react';

interface Props {
    password: string;
}

const countries = [ "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"];

const CountryFlagValidator: React.FC<Props> = ({ password }) => {const [selectedCountry, setSelectedCountry] = useState<string>("");

    useEffect(() => {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        setSelectedCountry(randomCountry);
    }, []);

    if (!selectedCountry) return null;

    const isValid = password.toLowerCase().includes(selectedCountry.toLowerCase());

    const flagUrl = `https://flagcdn.com/w80/${selectedCountry.toLowerCase()}.png`;

    return (
        <div className={`mt-4 p-4 rounded-xl border transition-colors duration-300 ${
            isValid
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
        }`}>
            <div className="flex items-center gap-4">
                {/* Vlajka */}
                <div className="shrink-0 w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden shadow-sm flex items-center justify-center">
                    <img
                        src={flagUrl}
                        alt={`Vlajka ${selectedCountry}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Zeměpisná výzva
                    </p>
                    <p className={`text-sm font-medium ${
                        isValid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                        {isValid
                            ? `Výborně! Heslo obsahuje zkratku země: ${selectedCountry}`
                            : `Heslo neobsahuje zkratku země: ${selectedCountry}`}
                    </p>
                </div>

                <div className="text-2xl shrink-0">
                    {isValid ? "✅" : "❌"}
                </div>
            </div>
        </div>
    );
};

export default CountryFlagValidator;