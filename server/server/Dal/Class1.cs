using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Models;

namespace Dal
{
    public class Class1
    {
        public Models.Users getUserByTzAndEmail(string tz, string email)
        {
            using (var context = new MichrazolEntities())
            {
                int c = 5;
                // Perform data access using the context 
            }

            var u = Connect.DB.Users.FirstOrDefault(x => x.Tz == tz && x.Mail == email);
            if (u == null)
                return null;
            Models.Users user =ConvertFromEntitiesToModels.GetUsers(u);
            return user;
        }                                                               
    }
}
