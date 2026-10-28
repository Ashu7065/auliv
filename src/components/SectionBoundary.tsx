import { Component, type ReactNode } from "react";
import { WhatsAppLink } from "@/components/WhatsAppLink";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class SectionBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white px-4 py-16" role="alert">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-lg font-semibold text-navy">This section did not load.</p>
            <p className="mt-2 text-muted">
              Chat with us on WhatsApp and we’ll help you choose a purifier.
            </p>
            <WhatsAppLink message="Hi, I need help choosing an Auliv purifier" className="mt-5" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
