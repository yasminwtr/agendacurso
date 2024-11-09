import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }) {
    return (
        <NextUIProvider locale="pt-BR">
            {children}
        </NextUIProvider>
    )
}