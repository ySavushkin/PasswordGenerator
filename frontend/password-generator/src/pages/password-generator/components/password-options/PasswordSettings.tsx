import { CharOptions } from './CharOptions';
import { CheckboxOption } from './CheckboxOption';
import { charCheckboxConfigs } from './СharCheckboxConfigs';

interface PasswordSettingsProps {
    flags: number;
    toggleFlag: (option: CharOptions) => void;
}

export const PasswordSettings: React.FC<PasswordSettingsProps> = ({ flags, toggleFlag }) => {
    return (
        <>
            {charCheckboxConfigs.map((config: CheckboxOption) => (
                <div className="checkbox text-white" key={config.value}>
                <label>
                    <input
                        type='checkbox'
                        checked={(flags & config.value) !== 0}
                        onChange={() => toggleFlag(config.value)} />
                        {config.label}
                </label>
            </div>
            ))};
        </>
    );
};
