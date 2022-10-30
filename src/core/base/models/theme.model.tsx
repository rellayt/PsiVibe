import { DictionaryByKey } from '../types/dictionary-by-key.type';
import { boxShadows, colors, fontSizes } from 'assets/styles/theme';

export interface StyleClosetTheme {
	colors: DictionaryByKey<typeof colors>;
	fontSizes: DictionaryByKey<typeof fontSizes>;
	boxShadows: DictionaryByKey<typeof boxShadows>;
	navbarHeight: string;
}
