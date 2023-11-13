
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const osrsGeSkillerTheme: CustomThemeConfig = {
    name: 'osrs-ge-skiller-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "6px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-surface-800)",
		"--on-secondary": "var(--color-tertiary-50)",
		"--on-tertiary": "var(--color-secondary-900)",
		"--on-success": "var(--color-surface-800)",
		"--on-warning": "var(--color-surface-600)",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #8cb369 
		"--color-primary-50": "238 244 233", // #eef4e9
		"--color-primary-100": "232 240 225", // #e8f0e1
		"--color-primary-200": "226 236 218", // #e2ecda
		"--color-primary-300": "209 225 195", // #d1e1c3
		"--color-primary-400": "175 202 150", // #afca96
		"--color-primary-500": "140 179 105", // #8cb369
		"--color-primary-600": "126 161 95", // #7ea15f
		"--color-primary-700": "105 134 79", // #69864f
		"--color-primary-800": "84 107 63", // #546b3f
		"--color-primary-900": "69 88 51", // #455833
		// secondary | #778da9 
		"--color-secondary-50": "235 238 242", // #ebeef2
		"--color-secondary-100": "228 232 238", // #e4e8ee
		"--color-secondary-200": "221 227 234", // #dde3ea
		"--color-secondary-300": "201 209 221", // #c9d1dd
		"--color-secondary-400": "160 175 195", // #a0afc3
		"--color-secondary-500": "119 141 169", // #778da9
		"--color-secondary-600": "107 127 152", // #6b7f98
		"--color-secondary-700": "89 106 127", // #596a7f
		"--color-secondary-800": "71 85 101", // #475565
		"--color-secondary-900": "58 69 83", // #3a4553
		// tertiary | #e0e1dd 
		"--color-tertiary-50": "250 251 250", // #fafbfa
		"--color-tertiary-100": "249 249 248", // #f9f9f8
		"--color-tertiary-200": "247 248 247", // #f7f8f7
		"--color-tertiary-300": "243 243 241", // #f3f3f1
		"--color-tertiary-400": "233 234 231", // #e9eae7
		"--color-tertiary-500": "224 225 221", // #e0e1dd
		"--color-tertiary-600": "202 203 199", // #cacbc7
		"--color-tertiary-700": "168 169 166", // #a8a9a6
		"--color-tertiary-800": "134 135 133", // #868785
		"--color-tertiary-900": "110 110 108", // #6e6e6c
		// success | #8cb369 
		"--color-success-50": "238 244 233", // #eef4e9
		"--color-success-100": "232 240 225", // #e8f0e1
		"--color-success-200": "226 236 218", // #e2ecda
		"--color-success-300": "209 225 195", // #d1e1c3
		"--color-success-400": "175 202 150", // #afca96
		"--color-success-500": "140 179 105", // #8cb369
		"--color-success-600": "126 161 95", // #7ea15f
		"--color-success-700": "105 134 79", // #69864f
		"--color-success-800": "84 107 63", // #546b3f
		"--color-success-900": "69 88 51", // #455833
		// warning | #f4e285 
		"--color-warning-50": "253 251 237", // #fdfbed
		"--color-warning-100": "253 249 231", // #fdf9e7
		"--color-warning-200": "252 248 225", // #fcf8e1
		"--color-warning-300": "251 243 206", // #fbf3ce
		"--color-warning-400": "247 235 170", // #f7ebaa
		"--color-warning-500": "244 226 133", // #f4e285
		"--color-warning-600": "220 203 120", // #dccb78
		"--color-warning-700": "183 170 100", // #b7aa64
		"--color-warning-800": "146 136 80", // #928850
		"--color-warning-900": "120 111 65", // #786f41
		// error | #bc4b51 
		"--color-error-50": "245 228 229", // #f5e4e5
		"--color-error-100": "242 219 220", // #f2dbdc
		"--color-error-200": "238 210 212", // #eed2d4
		"--color-error-300": "228 183 185", // #e4b7b9
		"--color-error-400": "208 129 133", // #d08185
		"--color-error-500": "188 75 81", // #bc4b51
		"--color-error-600": "169 68 73", // #a94449
		"--color-error-700": "141 56 61", // #8d383d
		"--color-error-800": "113 45 49", // #712d31
		"--color-error-900": "92 37 40", // #5c2528
		// surface | #415a77 
		"--color-surface-50": "227 230 235", // #e3e6eb
		"--color-surface-100": "217 222 228", // #d9dee4
		"--color-surface-200": "208 214 221", // #d0d6dd
		"--color-surface-300": "179 189 201", // #b3bdc9
		"--color-surface-400": "122 140 160", // #7a8ca0
		"--color-surface-500": "65 90 119", // #415a77
		"--color-surface-600": "59 81 107", // #3b516b
		"--color-surface-700": "49 68 89", // #314459
		"--color-surface-800": "39 54 71", // #273647
		"--color-surface-900": "32 44 58", // #202c3a
		
	}
}