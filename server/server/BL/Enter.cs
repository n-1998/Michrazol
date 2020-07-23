using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Dal.Queries;
using Models;

namespace BL
{
    public class Enter
    {
        /// <summary>
        /// login to the site- gets mail and password and returns the user
        /// </summary>
        /// <param name="password"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        public static Users login(string password, string email)
        {
            return EnterQueries.getUserByTzAndEmail(encryptpass(password), email);
        }
        /// <summary>
        /// register- gets user details and adds him to users list
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static int register(Users user)
        {
            user.Password = encryptpass(user.Password);
            return EnterQueries.addUser(user);
        }

        public static string encryptpass(string password)
        {
            string msg = "";
            byte[] encode = new byte[password.Length];
            encode = Encoding.UTF8.GetBytes(password);
            msg = Convert.ToBase64String(encode);
            return msg;
        }

        /// <summary>
        /// Sends password to the email of a user who has forggot his password
        /// </summary>
        /// <param name="email"></param>
        public static void forggotPassword(string email)
        {
            if (!checkExistEmail(email))
                return;
            //TODO: ליצור html לשליחה
            Models.Users user = EnterQueries.getUserByEmail(email);
            PasswordresetRequest passwordReset = new PasswordresetRequest()
            {
                UserId = user.UserId,
                Created = DateTime.Now
            };
            passwordReset = EnterQueries.addPasswordResetRequest(passwordReset);
            string body="";
//            body= @"<!DOCTYPE html>
//<html>
//<head>
//    <meta charset=""utf-8"" />
//    <title></title>
//    <style>
//        * {
//            font-family: segoe ui;
//            padding:3vh;
//        }

//        #logo {
//            height: 20vh;
//            display: block;
//            margin-left: auto;
//            margin-right: auto;
//            /*float: left;
//            display: inline-block;*/
//        }

//        h1 {
//            /*display: inline-block;
//            width: 100%;
//            text-align: center;*/
//            background-color: #ff0078;
//            color: white;
//        }

//        header {
//        }

//        footer {
//            background-color: #ffbb00;
//        }
//        div {
//            background-color: white;
//        }
//    </style>
//</head>
//<body dir=""rtl"">
//    <header>

//        <img src=""cid:http://localhost:52339/Images/Untitled-1.png"" id=""logo"" />
//        <h1>איפוס סיסמה</h1>

//    </header>       
//    <div>
//        <h3>שלום נחמה,</h3>
//        <p>על מנת לאפס את סיסמתך אנא   <a href=""http://localhost:4200/app/resetPassword/" + passwordReset.Id.ToString();
//            body += @"> לחץ כאן</a></p>

//        <p>שים לב!<br />על מנת לשמור על המידע שלך הקישור תקף ליום אחד בלבד.</p>
//        <p>תודה שהנך משתמשים במכרזול,</p>
//        <h3>צוות מכרזול</h3>
//    </div>
//    <footer><p>לכניסה לאתר   <a href=""http://localhost:4200/app/resetPassword/"">לחץ כאן</a></p></footer>
//</body>
//</html>
//";
            const string newline = ("<br/>");
            body += "<h1 style='color: #00989d;'>שלום " + user.FirstName + "</h1>";
            body += " על מנת לאפס את סיסמתך  ";
            body += "<a href=" + "http://localhost:4200/app/resetPassword/" + passwordReset.Id.ToString() + ">לחץ כאן</a>";
            body += newline;
            body += "<h3>שים לב!</h3>";
            body += " על מנת לשמור על המידע שלך הקישור תקף ליום אחד בלבד.";
            body += newline;
            body += "תודה שהנכם משתמשים במכרזול,";
            body += newline;
            body += "<h2 style='color: #00989d;'>צוות מכרזול</h2>";
            EmailMessage emailMessage = new EmailMessage() { Subject = "איפוס סיסמה עבור מכרזול", Message = body, To = user.Mail };
            SendEmail.Send(emailMessage);

        }

        public static bool updateUserDetails(Users user)
        {
            try
            {
                user.Password = encryptpass(user.Password);
                Dal.EnterQueries.updateUserDetails(user);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public static Users getUserById(Users user)
        {
            return Dal.EnterQueries.getUserById(user.UserId);
        }

        public static bool isEffectiveResetPassword(int resetId)
        {
            return EnterQueries.isEffectiveResetPassword(resetId);
        }

        public static bool resetPassword(Users passwordRequset)
        {
            try
            {
                PasswordresetRequest p = new PasswordresetRequest();
                p.Id = passwordRequset.UserId;
                p = EnterQueries.getPasswordresetRequestById(p.Id);
                var user = SaleQueries.getUserById(p.UserId);
                user.Password = encryptpass(passwordRequset.Password);
                SaleQueries.updateUserDetails(user);
                EnterQueries.deletePasswordresetRequest(p);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// on register check that a user does not exist on the system
        /// </summary>
        /// <param name="mail"></param>
        /// <returns></returns>
        public static bool checkExistEmail(string mail)
        {
            return EnterQueries.chechExistEmail(mail);
        }
    }
}

