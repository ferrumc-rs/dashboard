window.tailwind = {
    config: {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Poppins', 'sans-serif'],
                    mono: ['JetBrains Mono', 'monospace'],
                },
                colors: {
                    background: '#0a0a0a',
                    surface: '#171717',
                    border: '#262626',
                    primary: {
                        DEFAULT: '#ea580c',
                        glow: '#f97316'
                    },
                    success: '#10b981',
                    danger: '#ef4444',
                    warning: '#f59e0b'
                }
            }
        }
    }
}