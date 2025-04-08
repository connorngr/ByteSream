import { ChangeEvent } from "react";

interface AuthInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

export default function AuthInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = true,
  autoComplete,
}: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className="text-gray-700 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
