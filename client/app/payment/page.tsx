import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CardInput from "@/components/form/CardInput";

const paymentPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold">
                        Welcome to Your 30-Day Free Trial of HRGP!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-semibold mb-2">Here's how it works:</h2>
                            <ol className="list-decimal list-inside text-sm space-y-2">
                                <li><span className="font-semibold">No Immediate Charges:</span> Enter your credit card details to start your trial. Rest assured, you won't be charged anything today.</li>
                                <li><span className="font-semibold">Explore for 30 Days:</span> You can access our ATS for 30 days. Feel free to explore all the features and functionalities.</li>
                                <li><span className="font-semibold">Optional In-App Services:</span> Our core ATS is free during the trial, but you can opt for additional in-app partner services like personality profiles, chatbots, job boards, and background checks at their respective costs.</li>
                                <li>
                                    Video Calls & Texting (Powered by Twilio):
                                    <ul className="list-disc list-inside pl-4">
                                        <li><span className="font-semibold">Video Interviews:</span> These are available at no extra cost but require Twilio approval, which can take several weeks.</li>
                                        <li><span className="font-semibold">Texting Service:</span> $0.05 per text message - requires Twilio approval</li>
                                        <li><span className="font-semibold">Twilio Setup Fee:</span> A one-time fee of $39 is required to set up Twilio services.</li>
                                    </ul>
                                </li>
                                <li><span className="font-semibold">Cancellation Policy:</span> Our in-app feature lets you easily cancel your trial anytime within 30 days with one click.</li>
                                <li><span className="font-semibold">Subscription Post-Trial:</span> If you don't cancel, you'll be charged $99 on the 31st day. This first charge will be prorated. Subsequent charges will occur on the 1st of each month.</li>
                            </ol>
                        </div>
                        <div>
                            <p className="text-sm mb-3">
                                Your journey towards a more efficient hiring process begins now.
                                <br />
                                If you have any questions or need assistance, our support team is here to help!
                            </p>

                            <div className="flex flex-col space-y-2">
                                <CardInput label="Card Number" placeholder="Card number" />
                                <Button className="w-full">
                                    Start Your Free Trial Now!
                                </Button>
                            </div>

                            <div className="text-xs text-gray-500 mt-4 text-center">
                                <p>© 2008 - 2023 All rights reserved.</p>
                                <p>Guided Hiring® is a registered trademark of Hire and Retain Good People LLC</p>
                                <div className="mt-2 space-x-2">
                                    <a href="#" className="underline">Terms & Conditions</a>
                                    <a href="#" className="underline">Privacy Policy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default paymentPage;