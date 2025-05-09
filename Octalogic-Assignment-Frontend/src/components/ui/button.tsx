// components/ui/button.tsx

import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost'
}

import React from 'react';

export const Button = ({ className, variant = 'default', ...props }: ButtonProps) => {
    const base = 'px-4 py-2 rounded-2xl text-white font-medium transition'
    const variants = {
        default: 'bg-blue-600 hover:bg-blue-700',
        outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
    }

    return (
        <button
            className={clsx(base, variants[variant], className)}
            {...props}
        />
    )
}
