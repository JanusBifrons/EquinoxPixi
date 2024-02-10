'use client'

import { ThemeProvider, createTheme } from "@mui/material";

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
	interface Palette {
		ochre: Palette['primary'];
	}

	interface PaletteOptions {
		ochre?: PaletteOptions['primary'];
	}
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		ochre: true;
	}
}


declare module '@mui/material/ToggleButton' {
	interface ToggleButtonPropsColorOverrides {
		ochre: true;
	}
}

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const theme = createTheme({
		palette: {
			primary: {
				main: 'rgba(0, 0, 255, 255)',
				light: 'rgba(255, 255, 255, 255)',
				//dark: 'rgba(255, 255, 255, 255)',
				contrastText: 'rgba(255, 255, 255, 255)'
			},
			secondary: {
				main: '#FFFFFF'
			},
			ochre: {
				main: '#E3D026',
				light: '#E9DB5D',
				dark: '#A29415',
				contrastText: '#242105',
			},
		},
		components: {
			// MuiToggleButton: {
			// 	styleOverrides: {
			// 		root: ({ ownerState }) => ({
			// 			...(ownerState.color === 'primary' && {
			// 				//backgroundColor: 'rgba(50, 50, 255, 255)',
			// 				//color: '#FFF',
			// 			}),
			// 		}),
			// 	}
			// }
		}
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="flex w-screen h-screen ">
				{children}
			</div>
		</ThemeProvider>

	)
}