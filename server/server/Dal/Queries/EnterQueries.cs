using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Models;

namespace Dal
{
    public static class EnterQueries
    {
        public static Models.Users getUserByTzAndEmail(string password, string email)
        {
            var u = Connect.DB.Users.FirstOrDefault(x => x.Password == password && x.Mail == email);
            if (u == null)
                return null;
            Models.Users user = Convertors.UserConvertor.convert(u);
            return user;
        }
        public static Models.Users getUserByEmail(string email)
        {
            var u = Connect.DB.Users.FirstOrDefault(x => x.Mail == email);
            if (u == null)
                return null;
            Models.Users user = Convertors.UserConvertor.convert(u);
            return user;
        }
        public static int addUser(Models.Users newUser)
        {
            try
            {
                Connect.DB.Users.Add(Convertors.UserConvertor.convert(newUser));
                Connect.DB.SaveChanges();
                return getUserByTzAndEmail(newUser.Password, newUser.Mail).UserId;
            }
            catch (Exception)
            {
                return 0;
            }

        }

        public static bool chechExistEmail(string mail)
        {
            if (Connect.DB.Users.FirstOrDefault(x => x.Mail == mail) != null)
                return true;
            return false;
        }

        public static PasswordresetRequest addPasswordResetRequest(PasswordresetRequest passwordReset)
        {
            Connect.DB.PasswordResetRequest.Add(Convertors.PasswordResetRequestConvertor.convert(passwordReset));
            Connect.DB.SaveChanges();
            return Convertors.PasswordResetRequestConvertor.convert(Connect.DB.PasswordResetRequest.AsEnumerable().LastOrDefault());
        }

        public static bool isEffectiveResetPassword(int resetId)
        {
            var reset = Connect.DB.PasswordResetRequest.FirstOrDefault(x => x.Id == resetId);
            if (reset == null)//אם לא קיים איפוס סיסמה כזה מוחזר שלילי
                return false;
            int result = DateTime.Compare(reset.Created.AddDays(1), DateTime.Now);
            if (result < 0)
                return false;
            return true;
        }

        public static PasswordresetRequest getPasswordresetRequestById(int id)
        {
            return Convertors.PasswordResetRequestConvertor.convert(Connect.DB.PasswordResetRequest.FirstOrDefault(x => x.Id == id));
        }

        public static void deletePasswordresetRequest(PasswordresetRequest p)
        {
            Connect.DB.PasswordResetRequest.Remove(Connect.DB.PasswordResetRequest.FirstOrDefault(x => x.Id == p.Id));
            Connect.DB.SaveChanges();
        }

        public static Models.Users getUserById(int userId)
        {
            return Convertors.UserConvertor.convert(Connect.DB.Users.FirstOrDefault(x => x.UserId == userId));
        }

        public static bool updateUserDetails(Models.Users user)
        {
            try
            {
                var u = Connect.DB.Users.FirstOrDefault(x => x.UserId == user.UserId);
                u.Tz = user.Tz;
                u.FirstName = user.FirstName;
                u.LastName = user.LastName;
                u.Mail = user.Mail;
                u.Password = user.Password;
                u.Tel = user.Tel;
                Connect.DB.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
