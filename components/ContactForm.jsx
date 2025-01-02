import { useState, useRef, useEffect } from "react";

const ContractForm = function(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [services, setServices] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [emailError, setEmailError] = useState("");
    const emailInputRef = useRef(null);

    const classes = props.additionalClasses + " " + "z-[1000]";

    useEffect(() => {
        if (isOpen && emailInputRef.current) {
            emailInputRef.current.focus();
        }

        // Prevent scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                                multi_select: [{ name: services }]
                            }
                        }
                    }
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setEmail("");
                setServices("");
                setTimeout(() => {
                    setIsOpen(false);
                    setSubmitStatus(null);
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
    };

    return (
        <div className={classes}>
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-[#5209B2] text-white text-xl rounded-full px-8 py-3 font-bold hover:bg-[#4207A0] transition-colors"
            >
                Get in touch
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full transform transition-all duration-300 ease-out scale-100 opacity-100 animate-slideIn relative">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">Let&apos;s connect</h2>
                            <p className="text-sm text-gray-600 mt-1">A member of our team will be in contact within 24 hours</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    ref={emailInputRef}
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (emailError) setEmailError("");
                                    }}
                                    className={`w-full p-2 border rounded ${emailError ? 'border-red-500' : ''}`}
                                    required
                                />
                                {emailError && (
                                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Services Interested In</label>
                                <textarea
                                    value={services}
                                    onChange={(e) => setServices(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#5209B2] text-white py-2 rounded hover:bg-[#4207A0] transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-green-600 text-center mt-2">Thanks! We will be contact shortly.</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-600 text-center mt-2">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContractForm;