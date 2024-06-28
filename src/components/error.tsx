import React, { Component, ErrorInfo, ReactNode } from "react";
import Logo from "../assets/logo.svg";
import { pb } from "../pb";
import Warning from "../assets/warning.svg";

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show error message
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("I RECEIVED THE ERROR HAHAHAH");
    console.error(error, errorInfo);
    this.setState({ errorInfo });

    pb.collection("crash_logs").create({
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack,
      },
      errorDetails: {
        componentStack: errorInfo.componentStack,
        digest: errorInfo.digest,
      },
      authRecord: pb.authStore?.model?.id ?? null,
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <main
          className="grid place-items-center p-4 w-full h-full bg-secondary"
          style={
            {
              "--brand-theme": "var(--brand-negative)",
              "--brand-theme-shade": "var(--brand-negative-shade)",
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col gap-4 p-8 max-w-screen-sm rounded-xl bg-primary">
            <div className="flex gap-4">
              <img className="h-12" src={Logo} alt="Logo der LO" />
              <div>
                <p className="text-xl">BZWU Lernendenorganisation</p>
                <p className="opacity-50">Informationsportal</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-brand-theme-shade text-brand-theme">
              <img src={Warning} alt="" className="w-8" />
              Es ist leider ein schwerwiegender Fehler aufgetreten. Dieser
              Fehler wurde aufgezeichnt wird vom LO-Team analysiert.
            </div>
          </div>
        </main>
      );
    }

    // Render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
