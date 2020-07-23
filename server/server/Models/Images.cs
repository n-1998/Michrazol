using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
   public class Images
    {
        //מזהה תמונה
        public int Id { get; set; }
        //קוד מוצר אליו משוייכת התמונה
        public int ProductId { get; set; }
        //שם התמונה- כפי שנשמרה במערכת
        public string ImgName { get; set; }
        //שם מקורי של התמונה
        public string ImgGuid { get; set; }
    }
}

