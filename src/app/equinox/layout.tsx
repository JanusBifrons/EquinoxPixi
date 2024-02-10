'use client'

import { ThemeProvider, createTheme } from "@mui/material";
import variables from '../variables.module.scss';

export default function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const theme = createTheme({
		palette: {
			primary: {
				main: variables.primary,
				light: variables.primaryHover,
				contrastText: variables.contrastText
			},
		},
		components: {
			MuiToggleButton: {
				styleOverrides: {
					"root": {
						backgroundColor: variables.primary,
						color: variables.primaryText,
						":hover": {
							backgroundColor: variables.primaryHover,
							color: variables.contrastTextHover
						},
						"&.Mui-selected": {
							backgroundColor: variables.secondary,
							color: variables.secondaryText
						},
						"&.Mui-selected:hover": {
							backgroundColor: variables.secondaryHover,
							color: variables.secondaryTextHover
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