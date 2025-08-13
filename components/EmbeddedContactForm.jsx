import { useState, useRef, useEffect } from "react";

const EmbeddedContactForm = function(props) {
    const [email, setEmail] = useState("");
    const [services, setServices] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [emailError, setEmailError] = useState("");
    const emailInputRef = useRef(null);

    const additionalClasses = props.additionalClasses || "";

    // Removed auto-focus to prevent page from jumping to form on load

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/post-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        properties: {
                            'Email': { email },
                            'Services interested in': {
                                multi_select: [{ name: services || 'Community WiFi Network' }]
                            }
                        }
                    }
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setEmail("");
                setServices("");
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
    };

    return (
        <div className={`bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto ${additionalClasses}`}>
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Join the Community WiFi Network</h2>
                <p className="text-gray-600">Fill out the form below and we&apos;ll get in touch within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-semibold mb-3">Email Address</label>
                    <input
                        ref={emailInputRef}
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError("");
                        }}
                        className={`w-full p-4 border-2 rounded-lg text-lg ${emailError ? 'border-red-500' : 'border-gray-300'} focus:border-[#5209B2] focus:outline-none transition-colors`}
                        placeholder="your@email.com"
                        required
                    />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-2">{emailError}</p>
                    )}
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-semibold mb-3">Tell us about your business</label>
                    <textarea
                        value={services}
                        onChange={(e) => setServices(e.target.value)}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-[#5209B2] focus:outline-none transition-colors"
                        rows="4"
                        placeholder="What type of business do you have? Where are you located on Long Island? Any specific questions about the WiFi network?"
                        required
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#5209B2] text-white text-xl py-4 rounded-lg hover:bg-[#4207A0] transition-colors disabled:opacity-50 font-bold"
                >
                    {isSubmitting ? 'Submitting...' : 'Join the Network'}
                </button>
                
                {submitStatus === 'success' && (
                    <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                        <p className="font-semibold">Thank you for your interest!</p>
                        <p>We&apos;ll contact you within 24 hours to discuss how you can join our community WiFi network.</p>
                    </div>
                )}
                
                {submitStatus === 'error' && (
                    <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                        <p>Something went wrong. Please try again or contact us directly.</p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default EmbeddedContactForm;