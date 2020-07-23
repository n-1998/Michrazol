using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Users
    {
        //קוד משתמש
        public int UserId { get; set; }
        //תעודת זהות
        public string Tz { get; set; }
        //שם פרטי
        public string FirstName { get; set; }
        //שם משפחה
        public string LastName { get; set; }
        //כתובת דואר אלקטרוני
        public string Mail { get; set; }
        //כתובת דואר אלקטרוני
        public string Tel { get; set; }
        //סיסמה לכניסה לאתר
        public string Password { get; set; }
    }
}
