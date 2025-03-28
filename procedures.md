`usp_SignupUser`(
    IN p_firstName VARCHAR(255),
    IN p_lastName VARCHAR(255),
    IN p_hashedPassword VARCHAR(500),
    IN p_profilePicUrl VARCHAR(1000),
    IN p_bannerUrl VARCHAR(1000),
    IN p_timezoneId  INT,
    IN p_isUserConcent BOOLEAN,
    IN p_userStatus VARCHAR(45), -- ENUM('Online', 'Away', 'Offline', 'Busy')
    IN p_roleId INT,
    IN p_primaryPhoneNumber VARCHAR(45),
    IN p_PrimaryEmail VARCHAR(100),
    IN p_secondaryPhoneNumber VARCHAR(45),
    IN p_secondaryEmail VARCHAR(100),
    IN p_googleToken NVARCHAR(255),
    IN p_LinkdenToken NVARCHAR(255),
    OUT p_userId INT -- 0
 
) 
PROCEDURE `usp_SigninUser`(
	IN p_userEmail NVARCHAR(255),
    IN P_phoneNumber NVARCHAR(255),
    IN p_linkdenToken NVARCHAR(255),
    IN p_googleToken NVARCHAR(255),
    IN p_password NVARCHAR(255)
) 


TODO: 

Stripe Flow on front end => User enters payment details using Stripe's CardElement
On submit, the app creates a Stripe payment method
Depending on customer status, it either:
Creates a new subscription (for new users)
Updates payment details (for suspended users)
Shows loader during API calls
Displays success/error toasts
Redirects to signin after successful payment 
Multi-step registration process
Form validation with detailed error handling
Social media integration for faster signup
Address validation using postal codes

=> Signup FLow 
Authentication Flow:
User enters credentials (email/password) or clicks on social login options
On form submission, validation is performed
API call to LOGIN endpoint with credentials

Upon successful authentication:
User token and data are stored 
Company information is retrieved if applicable
Socket connection is established for real-time features
User is redirected based on role and account status 
Google, and LinkedIn authentication
Social tokens are stored in Redux and processed by dedicated handlers 
Based on user role and company status:
Regular users go to user profile
Company employees with suspended accounts see suspension notification
Company admins with suspended accounts go to payment page
Users with ATS access permission go to applicants page 

Timezone detection and storage
Company payment status checks (for suspended accounts) 
After signup flow => Backend => After successful database operation, the function calls createCustomer from paymentController to create a Stripe customer
This establishes the payment relationship for the company
Updates the user record with the Stripe customer ID 
Subscription Creation:
Calculates prorated pricing for the first month based on the current date
Creates a subscription object with:
Multiple subscription items from preset price IDs:
Conference services
Main HRGP subscription
Twilio phone number allocation
SMS service
Trial period (30 days for Active customers, 0 for others)
Billing cycle anchor (determines when regular billing starts)
For specific companies, adds a prorated invoice item for immediate payment
Database Updates:
Updates the company record with the Stripe subscription ID
Saves detailed subscription plan data for each component
Creates usage records for metered subscriptions
Additional Services Setup:
Sends notification email to admin about new trial signup
Creates a Twilio subaccou 
Let me know if you have nay confusion in any of these 