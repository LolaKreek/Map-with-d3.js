import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
  
// Here creates a custom element that will display country names on hover
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
<Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

export default LightTooltip;