import { Box, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import { headingSx } from './footerStyles';
import Reveal from '../../common/Reveal';

const Label = ({ color, size = 7, italic = false, children }) => (
  <Typography
    component="span"
    sx={{
      fontSize: size,
      fontWeight: 800,
      color,
      fontStyle: italic ? 'italic' : 'normal',
      lineHeight: 1,
      letterSpacing: -0.2,
    }}
  >
    {children}
  </Typography>
);

const Circles = ({ left, right }) => (
  <Box sx={{ display: 'flex' }}>
    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: left }} />
    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: right, ml: '-4px', opacity: 0.92 }} />
  </Box>
);

const PAYMENTS = [
  { id: 'mastercard', name: 'Mastercard', content: <Circles left="#EB001B" right="#F79E1B" /> },
  { id: 'bitpay', name: 'BitPay', bg: '#1F3A93', content: <Label color="#fff">bitpay</Label> },
  { id: 'visa', name: 'Visa', content: <Label color="#1A1F71" size={9} italic>VISA</Label> },
  { id: 'amex', name: 'American Express', bg: '#2E77BC', content: <Label color="#fff" size={4.5}>AMERICAN EXPRESS</Label> },
  { id: 'discover', name: 'Discover', content: <Label color="#F58220" size={5}>DISCOVER</Label> },
  { id: 'sofort', name: 'Sofort', content: <Label color="#EF7F1A" size={6} italic>SOFORT</Label> },
  { id: 'gpay', name: 'Google Pay', content: <Label color="#5F6368" size={7}>G Pay</Label> },
  {
    id: 'applepay',
    name: 'Apple Pay',
    content: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AppleIcon sx={{ fontSize: 9, color: '#111' }} />
        <Label color="#111" size={7}>Pay</Label>
      </Box>
    ),
  },
  {
    id: 'paypal',
    name: 'PayPal',
    content: (
      <Label color="#003087" size={6.5} italic>
        Pay<span style={{ color: '#009CDE' }}>Pal</span>
      </Label>
    ),
  },
  { id: 'maestro', name: 'Maestro', content: <Circles left="#0099DF" right="#E4002B" /> },
];

const PaymentMethods = () => (
  <Box>
    <Typography sx={headingSx}>Payment methods possible</Typography>

    <Box
      sx={{
        mt: 1.8,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 29px)',
        gap: '5px',
      }}
    >
      {PAYMENTS.map((payment, index) => (
        <Reveal key={payment.id} delay={0.3 + index * 0.05} duration={0.5}>
          <Box
            role="img"
            aria-label={payment.name}
            title={payment.name}
            sx={{
              width: 29,
              height: 19,
              borderRadius: '3px',
              bgcolor: payment.bg || '#fff',
              display: 'grid',
              placeItems: 'center',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px) scale(1.15)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.35)',
              },
            }}
          >
            {payment.content}
          </Box>
        </Reveal>
      ))}
    </Box>
  </Box>
);

export default PaymentMethods;