import { Component, type ErrorInfo, type ReactNode } from 'react';
import { s } from '@/lib/style';

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Top-level error boundary — a runtime error in any screen shows a recoverable fallback instead of
 * a blank white app. In production this is where you'd forward `error` to Sentry/telemetry.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Hook for real observability (Sentry.captureException, etc.).
    console.error('Rasa screen error:', error, info.componentStack);
  }

  handleReset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div style={s('flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 28px;gap:14px')}>
          <div style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22")}>Something went wrong</div>
          <div style={s("font:500 13px 'Inter';color:#6F6A7D;line-height:1.5;max-width:280px")}>
            An unexpected error occurred. You can try again — your cart and progress are kept.
          </div>
          <button
            type="button"
            onClick={this.handleReset}
            style={s("background:var(--p,#7D1535);color:#fff;border:none;border-radius:14px;padding:12px 22px;font:700 13px 'Inter';cursor:pointer")}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
