import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function Sort(order) {
    if (order.order === "DESC") {
        return <ArrowCircleUpIcon />
    } else {
        return <ArrowCircleDownIcon />
    }
}