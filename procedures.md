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