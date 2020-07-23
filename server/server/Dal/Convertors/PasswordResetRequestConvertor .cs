using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Convertors
{
    public class PasswordResetRequestConvertor
    {
        public static Entities.PasswordResetRequest convert(Models.PasswordresetRequest Request)
        {
            return new Entities.PasswordResetRequest() { Id = Request.Id, UserId = Request.UserId, Created = Request.Created };
        }

        public static Models.PasswordresetRequest convert(Entities.PasswordResetRequest Request)
        {
            return new Models.PasswordresetRequest() { Id = Request.Id, UserId = Request.UserId, Created = Request.Created };
        }

        public static List<Entities.PasswordResetRequest> convert(List<Models.PasswordresetRequest> RequestList)
        {
            List<Entities.PasswordResetRequest> a = new List<Entities.PasswordResetRequest>();
            foreach (var item in RequestList)
            {
                a.Add(convert(item));
            }
            return a;
        }
        public static List<Models.PasswordresetRequest> convert(List<Entities.PasswordResetRequest> RequestList)
        {
            List<Models.PasswordresetRequest> a = new List<Models.PasswordresetRequest>();
            foreach (var item in RequestList)
            {
                a.Add(convert(item));
            }
            return a;
        }
    }
}
