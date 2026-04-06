import { Component } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            We apologize for the inconvenience. The application encountered an unexpected error.
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg text-left mb-6 overflow-auto max-h-32">
                            <code className="text-xs text-red-600 font-mono">
                                {this.state.error && this.state.error.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mb-3"
                        >
                            Reload Page
                        </button>
                        <Link
                            to="/"
                            className="block w-full text-gray-600 font-medium hover:text-gray-900 transition"
                            onClick={() => this.setState({ hasError: false })}
                        >
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
