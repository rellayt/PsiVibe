import { ReactElement, SyntheticEvent } from 'react';
import { Wrapper } from './Tabs.styles';
import { Tabs as MuiTabs } from '@mui/material';
import { Tab } from '../../atoms/Tab/Tab';
import { useRouter } from '../../../hooks/useRouter';
import * as React from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';

interface TabsProps {
	activeTab: string;
}

const Tabs = ({ activeTab }: TabsProps): ReactElement => {
	const router = useRouter();

	const { width } = useWindowSize();

	const handleClick = (ev: SyntheticEvent, newValue: string): void => {
		router.replace(newValue);
	};

	return (
		<Wrapper>
			<MuiTabs value={activeTab} onChange={handleClick} orientation={width && width < 768 ? 'vertical' : 'horizontal'}>
				<Tab value={'personal-data'} label={'Dane personalne'} />
				<Tab value={'address'} label={'Adres'} />
				<Tab value={'password'} label={'Zmiana hasła'} />
				<Tab value={'avatar'} label={'Zdjęcie'} />
			</MuiTabs>
		</Wrapper>
	);
};

export default Tabs;
