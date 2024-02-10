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
				main: '#33658A',
				light: '#2F4858',
				//dark: 'rgba(255, 255, 255, 255)',
				contrastText: '#000'
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
			MuiToggleButton: {
				styleOverrides: {
					"root": {
						backgroundColor: '#86BBD8',
						color: '#000',
						"&.Mui-selected, &.Mui-selected:hover": {
							backgroundColor: '#33658A',
							color: '#FFFFFF'
						},
						":hover": {
							backgroundColor: '#2F4858',
							color: '#FFFFFF'
						}
					}
				}
			}
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