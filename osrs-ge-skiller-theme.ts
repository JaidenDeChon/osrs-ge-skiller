
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const osrsGeSkillerTheme: CustomThemeConfig = {
    name: 'osrs-ge-skiller-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "var(--color-surface-900)",
		"--theme-font-color-dark": "var(--color-surface-50)",
		"--theme-rounded-base": "2px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-surface-900)",
		"--on-secondary": "var(--color-surface-50)",
		"--on-tertiary": "var(--color-surface-900)",
		"--on-success": "var(--color-surface-900)",
		"--on-warning": "var(--color-surface-900)",
		"--on-error": "255 255 255",
		"--on-surface": "var(--color-primary-50)",
		// =~= Theme Colors  =~=
		// primary | #0FBA81 
		"--color-primary-50": "219 245 236", // #dbf5ec
		"--color-primary-100": "207 241 230", // #cff1e6
		"--color-primary-200": "195 238 224", // #c3eee0
		"--color-primary-300": "159 227 205", // #9fe3cd
		"--color-primary-400": "87 207 167", // #57cfa7
		"--color-primary-500": "15 186 129", // #0FBA81
		"--color-primary-600": "14 167 116", // #0ea774
		"--color-primary-700": "11 140 97", // #0b8c61
		"--color-primary-800": "9 112 77", // #09704d
		"--color-primary-900": "7 91 63", // #075b3f
		// secondary | #4F46E5 
		"--color-secondary-50": "229 227 251", // #e5e3fb
		"--color-secondary-100": "220 218 250", // #dcdafa
		"--color-secondary-200": "211 209 249", // #d3d1f9
		"--color-secondary-300": "185 181 245", // #b9b5f5
		"--color-secondary-400": "132 126 237", // #847eed
		"--color-secondary-500": "79 70 229", // #4F46E5
		"--color-secondary-600": "71 63 206", // #473fce
		"--color-secondary-700": "59 53 172", // #3b35ac
		"--color-secondary-800": "47 42 137", // #2f2a89
		"--color-secondary-900": "39 34 112", // #272270
		// tertiary | #f85100 
		"--color-tertiary-50": "254 229 217", // #fee5d9
		"--color-tertiary-100": "254 220 204", // #fedccc
		"--color-tertiary-200": "253 212 191", // #fdd4bf
		"--color-tertiary-300": "252 185 153", // #fcb999
		"--color-tertiary-400": "250 133 77", // #fa854d
		"--color-tertiary-500": "248 81 0", // #f85100
		"--color-tertiary-600": "223 73 0", // #df4900
		"--color-tertiary-700": "186 61 0", // #ba3d00
		"--color-tertiary-800": "149 49 0", // #953100
		"--color-tertiary-900": "122 40 0", // #7a2800
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "250 234 234", // #FAEAEA
		"--color-error-100": "246 213 213", // #F6D5D5
		"--color-error-200": "237 171 171", // #EDABAB
		"--color-error-300": "226 125 125", // #E27D7D
		"--color-error-400": "217 84 84", // #D95454
		"--color-error-500": "204 45 45", // #CC2D2D
		"--color-error-600": "163 36 36", // #A32424
		"--color-error-700": "121 27 27", // #791B1B
		"--color-error-800": "84 18 18", // #541212
		"--color-error-900": "42 9 9", // #2A0909
		// surface | #001328 
		"--color-surface-50": "217 220 223", // #d9dcdf
		"--color-surface-100": "204 208 212", // #ccd0d4
		"--color-surface-200": "191 196 201", // #bfc4c9
		"--color-surface-300": "153 161 169", // #99a1a9
		"--color-surface-400": "77 90 105", // #4d5a69
		"--color-surface-500": "0 19 40", // #001328
		"--color-surface-600": "0 17 36", // #001124
		"--color-surface-700": "0 14 30", // #000e1e
		"--color-surface-800": "0 11 24", // #000b18
		"--color-surface-900": "0 9 20", // #000914
		
	}
}
