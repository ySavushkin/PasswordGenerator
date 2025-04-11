import { useState } from 'react';
import { CharOptions } from './CharOptions';
import { CheckboxOption } from './CheckboxOption';
import { charCheckboxConfigs } from './СharCheckboxConfigs';

export const PasswordSettings = () => {
    const [charOptions, setCharOptions] = useState<CharOptions>(CharOptions.None);

    const toggleOption = (option: CharOptions) => {
        setCharOptions(prev => (prev & option) === option ? prev & ~option : prev | option,
        );
        console.log(option);
    };

    const options = charCheckboxConfigs.map(({ label, value }: CheckboxOption) => {
        return (
            <div className="checkbox text-white" key={value}>
                <label>
                    <input
                        type='checkbox'
                        checked={(charOptions & value) === value}
                        onChange={() => toggleOption(value)} />{label}
                </label>
            </div>
        );
    });

    return <> {options}</>;
};
