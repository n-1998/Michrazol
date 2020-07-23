using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
   public class EmailMessage
    {
        //יעד ההודעה
        public string To { get; set; }
        //נושא ההודעה
        public string Subject { get; set; }
        //גוף ההודעה
        public string Message { get; set; }
    }
}

