
import React from 'react'

/**
 * Simple Tailwind button with a few variants used across the app.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'solid', className = '', ...props }) => {
  const base = 'px-4 py-2 rounded-xl text-sm font-medium transition-all'
  const variants = {
    solid: 'bg-thistle-500 hover:bg-thistle-400 text-thistle-100 shadow-lg',
    outline: 'border border-thistle-300/40 hover:bg-white/10 text-thistle-100',
    ghost: 'text-thistle-100 hover:text-white'
  } as const

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
