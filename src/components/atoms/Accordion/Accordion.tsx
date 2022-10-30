import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

// @ts-ignore
export const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
	border: `none`,
	borderRadius: '16px',
	opacity: '1',
	width: '100%',
	'.MuiButtonBase-root': {
		borderRadius: '16px',
		width: '100%',
		border: `1px solid ${theme.palette.divider}`,
		boxShadow: '0 15px 35px -20px rgb(0 0 0 / 5%)',
	},
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

export const AccordionSummary = styled((props) => (
	<MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', margin: 'auto 16px' }} />} {...props} />
))(() => ({
	background: '#f4f4f4 !important',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: '47%',
	},
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: '16px',
	boxShadow: '0 15px 35px -20px rgb(0 0 0 / 5%)',
}));
