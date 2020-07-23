using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public static class UserConvertor
    {
        public static Entities.Users convert(Models.Users user)
        {
            return new Entities.Users() {
                UserId = user.UserId,
                Tz = user.Tz,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Mail = user.Mail,
                Password = user.Password,
                Tel = user.Tel
            };
        }
        public static Models.Users convert(Entities.Users user)
        {
            return new Models.Users() {
                UserId = user.UserId,
                Tz = user.Tz,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Mail = user.Mail,
                Password = user.Password,
                Tel = user.Tel
            };
        }

        public static List<Models.Users> convert(List<Entities.Users> users)
        {
            List<Models.Users> list = new List<Models.Users>();
            foreach (var item in users)
            {
                list.Add(convert(item));
            }
            return list;
        }
        public static List<Entities.Users> convert(List<Models.Users> users)
        {
            List<Entities.Users> list = new List<Entities.Users>();
            foreach (var item in users)
            {
                list.Add(convert(item));
            }
            return list;
        }

    }
}
