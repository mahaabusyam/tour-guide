import { Component } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <Box role="alert" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: '#F6F8FB', p: 3 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <ErrorOutlineIcon sx={{ fontSize: 56, color: '#E04B4B', mb: 1 }} />
          <Typography variant="h1" sx={{ fontSize: 26, mb: 1 }}>
            Something went wrong
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            An unexpected error stopped this page. You can try again or go back to the home page.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={this.reset}>
              Try again
            </Button>
            <Button variant="outlined" onClick={() => window.location.assign(import.meta.env.BASE_URL)}>
              Back to home
            </Button>
          </Box>

          {/* في وضع التطوير فقط: نص الخطأ ظاهر على الشاشة */}
          {import.meta.env.DEV && (
            <Box
              component="pre"
              sx={{
                mt: 4,
                p: 2,
                textAlign: 'left',
                direction: 'ltr',
                bgcolor: '#fff3f3',
                color: '#b71c1c',
                fontSize: 12,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                borderRadius: 1,
              }}
            >
              {String(error?.stack ?? error)}
            </Box>
          )}
        </Container>
      </Box>
    );
  }
}

export default ErrorBoundary;