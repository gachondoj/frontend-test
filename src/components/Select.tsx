interface SelectProps {
  title: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

const Select = ({ title, value, options, onChange, disabled }: SelectProps) => {
  return (
    <div className="w-full justify-end flex mb-12 gap-5 text-gray-600">
      <div className="font-bold">{title}</div>
      <div>|</div>
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
